let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let sub = args[0];

  // Wenn kein Subbefehl angegeben ist (also einfach .joinrequests)
  if (!sub) {
    if (!joinRequests.length) throw '📭 Keine offenen Beitrittsanfragen.';

    let list = joinRequests.map((req, i) => 
      `*${i + 1}.* 👤 @${req.sender.split('@')[0]}\n🔗 ${req.link}`
    ).join('\n\n');

    return conn.sendMessage(m.chat, {
      text: `📬 *Offene Beitrittsanfragen:*\n\n${list}`,
      mentions: joinRequests.map(req => req.sender)
    });
  }

  if (sub === 'clear') {
    joinRequests.length = 0;
    return m.reply('✅ Alle Beitrittsanfragen wurden gelöscht.');
  }

  // Anfrage annehmen (by index)
  let index = parseInt(sub) - 1;
  if (isNaN(index) || index < 0 || index >= joinRequests.length)
    throw `❗ Ungültiger Index. Gib z. B. ein: \`${usedPrefix + command} 1\``;

  let { link, sender } = joinRequests[index];
  joinRequests.splice(index, 1);

  await conn.groupAcceptInvite(link.split('/').pop());
  await m.reply(`✅ Anfrage von @${sender.split('@')[0]} wurde akzeptiert und der Bot ist der Gruppe beigetreten.`, null, {
    mentions: [sender]
  });
};

handler.help = ['joinrequests', 'joinrequests <Zahl>', 'joinrequests clear'];
handler.tags = ['owner'];
handler.command = ['joinrequests'];
handler.rowner = true;

module.exports = handler;
