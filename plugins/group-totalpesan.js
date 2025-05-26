let handler = async (m, { conn }) => {
  let user = global.db.data.chats[m.chat].memgc || {};
  let memgc = Object.keys(user).filter(v => v !== conn.user.jid).sort((a, b) => user[b].chat - user[a].chat);

  let chatToday = 0;
  let chatTotal = 0;
  for (let uid of memgc) {
    chatToday += user[uid].chat || 0;
    chatTotal += user[uid].chatTotal || 0;
  }

  let head = `📊 *Chat Statistik für heute und insgesamt*\n\n` +
             `🗓️ Heute gesamt: *${formatNumber(chatToday)}*\n` +
             `📈 Insgesamt: *${formatNumber(chatTotal)}*\n\n`;

  let caption = '';
  let maxDisplay = 20;
  let nomor = 1;

  for (let i = 0; i < memgc.length && nomor <= maxDisplay; i++) {
    let uid = memgc[i];
    if (user[uid]) {
      let name = await conn.getName(uid);
      caption += `*${nomor++}. ${name}*\n`;
      caption += ` 💬 Heute: ${formatNumber(user[uid].chat)}\n`;
      caption += ` 🕰️ Insgesamt: ${formatNumber(user[uid].chatTotal)}\n`;
      caption += ` ⏳ Letzter Chat: ${timeAgo(user[uid].lastseen)}\n\n`;
    }
  }

  if (memgc.length > maxDisplay) {
    caption += `...und noch ${memgc.length - maxDisplay} weitere Mitglieder\n`;
  }

  await m.reply(head + caption.trim());
};

handler.help = ['totalchatgc'];
handler.tags = ['group'];
handler.command = /^(totalchatgc)$/i;
handler.admin = true;
handler.group = true;

module.exports = handler;

function formatNumber(number) {
  return Number(number).toLocaleString('de-DE'); // z.B. 1.000 statt 1000
}

function timeAgo(timestamp) {
  if (!timestamp) return 'Unbekannt';
  let diff = Date.now() - timestamp;
  if (diff < 60000) return 'Vor ein paar Sekunden';
  if (diff < 3600000) return `Vor ${Math.floor(diff / 60000)} Minuten`;
  if (diff < 86400000) return `Vor ${Math.floor(diff / 3600000)} Stunden`;
  return `Vor ${Math.floor(diff / 86400000)} Tagen`;
}
