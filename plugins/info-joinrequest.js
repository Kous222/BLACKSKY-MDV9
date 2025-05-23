const { getUserRank } = require('../lib/rank'); // Falls nicht vorhanden: ersetze durch manuelle Rangprüfung

let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, text, command }) => {
  // ---- Ränge prüfen ----
  let sender = m.sender;
  let senderNumber = sender.split('@')[0];
  let senderRank = (await getUserRank?.(sender)) || 'member';
  let allowedRanks = ['owner', 'teamleiter', 'manager'];
  let isOwner = global.owner?.includes?.(senderNumber);

  if (!allowedRanks.includes(senderRank) && !isOwner) {
    return m.reply('❌ Du hast keine Berechtigung, diesen Befehl zu nutzen.');
  }

  // ---- Eingabe analysieren ----
  let [actionRaw, indexRaw] = text.trim().split(/\s+/);
  let action = (actionRaw || '').toLowerCase();
  let index = parseInt(indexRaw) - 1;

  if (!action || action === 'list') {
    if (!joinRequests.length) {
      return m.reply('📭 Es gibt derzeit keine offenen Beitrittsanfragen.');
    }

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

  if (isNaN(index) || index < 0 || index >= joinRequests.length) {
    return m.reply(`❗ Ungültiger Index. Beispiel: .joinrequests accept 1`);
  }

  const { link, sender: requester } = joinRequests[index];
  const groupCode = link.split('/').pop();

  if (action === 'accept') {
    joinRequests.splice(index, 1);

    try {
      const groupId = await conn.groupAcceptInvite(groupCode);
      await new Promise(r => setTimeout(r, 2000));

      let groupPic = await conn.profilePictureUrl(groupId, 'image').catch(() => null);
      let welcomeText = `🎉 *Ich wurde in die Gruppe eingeladen!*\n\n` +
        `❤️ Eingeladen von: @${senderNumber}\n` +
        `🤖 Bereit für Games, Tools & Spaß!`;

      await conn.sendMessage(groupId, groupPic ? {
        image: { url: groupPic },
        caption: welcomeText,
        mentions: [sender]
      } : {
        text: welcomeText,
        mentions: [sender]
      });

      return m.reply(`✅ Anfrage von @${requester.split('@')[0]} wurde akzeptiert. Bot ist der Gruppe beigetreten.`, null, {
        mentions: [requester]
      });

    } catch (e) {
      return m.reply(`❌ Fehler beim Beitritt zur Gruppe: ${e.message}`);
    }
  }

  if (action === 'decline') {
    joinRequests.splice(index, 1);
    return m.reply(`❌ Anfrage von @${requester.split('@')[0]} wurde abgelehnt.`, null, {
      mentions: [requester]
    });
  }

  return m.reply(`❗ Unbekannter Befehl. Verwende:\n- .joinrequests accept <Nummer>\n- .joinrequests decline <Nummer>\n- .joinrequests clear`);
};

handler.help = ['joinrequests [accept|decline|clear] <Nummer>'];
handler.tags = ['admin'];
handler.command = /^joinrequests$/i;
handler.rowner = true;

module.exports = handler;
