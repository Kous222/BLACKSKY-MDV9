let handler = async (m, { conn }) => {
  if (!m.isGroup) {
    return m.reply('❗ Dieser Befehl kann nur in Gruppen verwendet werden.');
  }

  // Initialisiere globale Nachrichtenstatistiken, falls noch nicht existierend
  global.userMessageStats = global.userMessageStats || {};

  const groupMetadata = await conn.groupMetadata(m.chat);
  const members = groupMetadata.participants;

  let groupStats = [];

  for (const member of members) {
    const id = member.id;
    const messages = global.userMessageStats[id]?.messages || 0;
    groupStats.push({ id, messages });
  }

  // Sortiere nach Anzahl der Nachrichten (absteigend) und nehme die Top 10
  groupStats = groupStats.sort((a, b) => b.messages - a.messages).slice(0, 10);

  if (groupStats.length === 0) {
    return m.reply('📭 Es gibt noch keine Aktivitätsdaten für diese Gruppe.');
  }

  const rankList = groupStats.map((user, index) => {
    const mention = '@' + user.id.split('@')[0];
    return `*${index + 1}.* ${mention} – *${user.messages}* Nachrichten`;
  }).join('\n\n');

  await conn.sendMessage(m.chat, {
    text: `🏆 *Top Aktive Mitglieder in dieser Gruppe:*\n\n${rankList}`,
    mentions: groupStats.map(u => u.id)
  });
};

// BEFORE Hook: zählt jede Nachricht automatisch
async function before(m) {
  if (!m.isGroup) return;

  global.userMessageStats = global.userMessageStats || {};

  const id = m.sender;

  if (!global.userMessageStats[id]) {
    global.userMessageStats[id] = { messages: 0 };
  }

  global.userMessageStats[id].messages++;
}

// Plugin-Einstellungen
handler.command = ['topactive', 'aktiv', 'activeusers'];
handler.help = ['topactive', 'aktiv', 'activeusers'];
handler.tags = ['group'];
handler.group = true;
handler.admin = false;
handler.before = before;

module.exports = handler;
