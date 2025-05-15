const { getUserRank } = require('../lib/rank'); // Nutzt Atlas-Ranking-System

let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, text }) => {
  const allowedRanks = ['owner', 'teamleiter', 'manager'];
  const senderRank = await getUserRank(m.sender);

  const isAuthorized = allowedRanks.includes(senderRank) || global.owner?.includes(m.sender.split('@')[0]);

  if (!isAuthorized) {
    return m.reply('❌ Du hast keine Berechtigung, diesen Befehl zu nutzen.');
  }

  let [actionRaw, indexRaw] = text.trim().split(/\s+/);
  const action = (actionRaw || '').toLowerCase();
  const index = parseInt(indexRaw) - 1;

  if (!action || action === 'list') {
    if (!joinRequests.length) return m.reply('📭 Keine offenen Beitrittsanfragen.');

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
    return m.reply(`❗ Ungültiger Index. Beispiel: .joinrequests accept 1`);

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

  throw `❗ Unbekannter Befehl. Verwende:\n- .joinrequests accept <Nummer>\n- .joinrequests decline <Nummer>\n- .joinrequests clear`;
};

handler.help = ['joinrequests [accept|decline|clear] <Nummer>'];
handler.tags = ['admin'];
handler.command = /^joinrequests(?:\s+(accept|decline|clear)?(?:\s+\d+)?)?$/i;

module.exports = handler;
