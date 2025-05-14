const { getUserRank } = require('../lib/rank'); // Nutzt Atlas-Ranking-System

let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const allowedRanks = ['owner', 'teamleiter', 'manager'];
  const senderRank = await getUserRank(m.sender);

  const isAuthorized = allowedRanks.includes(senderRank) || global.owner?.includes(m.sender.split('@')[0]);

  if (!isAuthorized) {
    return m.reply('❌ Du hast keine Berechtigung, diesen Befehl zu nutzen.');
  }

  const action = (args[0] || '').toLowerCase();
  const index = parseInt(args[1]) - 1;

  if (!action) {
    if (!joinRequests.length) throw '📭 Keine offenen Beitrittsanfragen.';

    let list = joinRequests.map((req, i) =>
      `*${i + 1}.* 👤 @${req.sender.split('@')[0]}\n🔗 ${req.link}`
    ).join('\n\n');

    return conn.sendMessage(m.chat, {
      text: `📬 *Offene Beitrittsanfragen:*\n\n${list}`,
      mentions: joinRequests.map(req => req.sender)
    });
  }

  if (action === 'clear') {
    joinRequests.length = 0;
    return m.reply('✅ Alle Beitrittsanfragen wurden gelöscht.');
  }

  if (isNaN(index) || index < 0 || index >= joinRequests.length)
    throw `❗ Ungültiger Index. Benutze z. B. \`${usedPrefix + command} accept 1\``;

  const { link, sender } = joinRequests[index];
  const groupCode = link.split('/').pop();

  if (action === 'accept') {
    joinRequests.splice(index, 1);

    const groupId = await conn.groupAcceptInvite(groupCode);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const groupProfilePic = await conn.profilePictureUrl(groupId, 'image').catch(_ => null);

    const welcomeMessage = `🌟🎉 *Hurra!* 🎉🌟\n\n` +
      `❤️ Ein Admin (@${m.sender.split('@')[0]}) hat mich in eure Gruppe eingeladen!\n` +
      `🤖 Ich bin da für Spaß, Games und Ordnung!\n\n` +
      `✨ Viel Freude miteinander! ✨`;

    if (groupProfilePic) {
      await conn.sendMessage(groupId, {
        image: { url: groupProfilePic },
        caption: welcomeMessage,
        mentions: [m.sender]
      });
    } else {
      await conn.sendMessage(groupId, {
        text: welcomeMessage,
        mentions: [m.sender]
      });
    }

    return m.reply(`✅ Anfrage von @${sender.split('@')[0]} wurde akzeptiert. Bot ist der Gruppe beigetreten.`, null, {
      mentions: [sender]
    });
  }

  if (action === 'decline') {
    joinRequests.splice(index, 1);
    return m.reply(`❌ Anfrage von @${sender.split('@')[0]} wurde abgelehnt.`, null, {
      mentions: [sender]
    });
  }

  throw `❗ Unbekannter Befehl. Verwende:\n- \`${usedPrefix + command} accept <Nummer>\`\n- \`${usedPrefix + command} decline <Nummer>\`\n- \`${usedPrefix + command} clear\``;
};

handler.help = ['joinrequests', 'joinrequests accept <Nummer>', 'joinrequests decline <Nummer>', 'joinrequests clear'];
handler.tags = ['admin'];
handler.command = ['joinrequests'];

module.exports = handler;
