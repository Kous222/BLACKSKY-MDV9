const schedule = require('node-schedule');

global.userMessageStats = global.userMessageStats || {};

let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❗ Dieser Befehl funktioniert nur in Gruppen.');

  const groupMetadata = await conn.groupMetadata(m.chat);
  const admins = groupMetadata.participants
    .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
    .map(p => p.id);

  if (!admins.includes(m.sender)) {
    return m.reply('❗ Nur Admins dürfen diesen Befehl benutzen.');
  }

  await sendTop3(conn, m.chat);
};

handler.command = ['gratuliere', 'gratulieren', 'topgratz'];
handler.help = ['gratuliere', 'gratulieren', 'topgratz'];
handler.tags = ['group'];
handler.group = true;
handler.admin = true;

module.exports = handler;

// Funktion: Top 3 senden
async function sendTop3(conn, chatId) {
  const groupMetadata = await conn.groupMetadata(chatId);
  const members = groupMetadata.participants;

  let groupStats = [];

  for (const member of members) {
    const id = member.id;
    const messages = global.userMessageStats[id]?.messages || 0;
    groupStats.push({ id, messages });
  }

  groupStats = groupStats.sort((a, b) => b.messages - a.messages).slice(0, 3);

  if (groupStats.length === 0 || groupStats[0].messages === 0) {
    await conn.sendMessage(chatId, { text: '📭 Heute gab es keine Aktivitäten für eine Rangliste.' });
    return;
  }

  const congratulationsText = `
🏆 *Tages-Rangliste – Aktivste Nutzer:*

🥇 1. @${groupStats[0].id.split('@')[0]} – *${groupStats[0].messages} Nachrichten*
🥈 2. @${groupStats[1]?.id.split('@')[0] || 'Niemand'} – *${groupStats[1]?.messages || 0} Nachrichten*
🥉 3. @${groupStats[2]?.id.split('@')[0] || 'Niemand'} – *${groupStats[2]?.messages || 0} Nachrichten*

Weiter so! ❤️
`.trim();

  await conn.sendMessage(chatId, {
    text: congratulationsText,
    mentions: groupStats.map(u => u.id)
  });
}

// Zeitsteuerung: jeden Tag automatisch
async function autoDailyTasks(conn) {
  const groups = Object.keys(conn.chats).filter(v => v.endsWith('@g.us'));

  for (const groupId of groups) {
    try {
      await sendTop3(conn, groupId);
    } catch (e) {
      console.log('Fehler beim Senden der Auto-Gratulation:', e);
    }
  }

  // Nach Gratulation Zähler zurücksetzen
  global.userMessageStats = {};
}

// Täglicher Job: Gratulieren und Reset (23:59 Uhr)
schedule.scheduleJob('59 23 * * *', () => {
  console.log('[AutoGratz] Gratulation und Reset gestartet!');
  if (global.conn) autoDailyTasks(global.conn);
});
