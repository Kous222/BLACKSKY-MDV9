let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, text }) => {
  const sender = m.sender;
  const senderNum = sender.split('@')[0];
  const isOwner = global.owner?.some(id => id.includes(senderNum));
  if (!isOwner) return m.reply('❌ Nur globale Owner dürfen das verwenden.');

  let [action, indexRaw] = text.trim().split(/\s+/);
  let index = parseInt(indexRaw) - 1;

  if (!action || action === 'list') {
    if (!joinRequests.length) return m.reply('📭 Keine offenen Anfragen.');
    let list = joinRequests.map((req, i) =>
      `*${i + 1}.* 👤 @${req.sender.split('@')[0]}\n🔗 ${req.link}`
    ).join('\n\n');
    return conn.sendMessage(m.chat, {
      text: `📬 *Offene Anfragen:*\n\n${list}`,
      mentions: joinRequests.map(req => req.sender)
    });
  }

  if (action === 'clear') {
    joinRequests.length = 0;
    return m.reply('✅ Alle Anfragen wurden gelöscht.');
  }

  if (isNaN(index) || index < 0 || index >= joinRequests.length)
    return m.reply(`❗ Ungültiger Index. Beispiel: .joinrequests accept 1`);

  let { link, sender: requester } = joinRequests[index];
  let code = link.split('/').pop();

  if (action === 'accept') {
    joinRequests.splice(index, 1);
    try {
      const groupId = await conn.groupAcceptInvite(code);

      // Nachricht mit Owner-Nummer
      const ownerNumber = global.owner && global.owner.length ? global.owner[0] : 'Owner unbekannt';
      const welcomeText = `❤️ Hallo Ich bin BLACKSKY BOT der Owner (${ownerNumber}) hat mich in eure Gruppe geschickt. Vielen Dank für die Einladung und ich hoffe ihr werdet Spaß mit mir haben ❤️`;

      await conn.sendMessage(groupId, {
        text: welcomeText
      });

      return m.reply(`✅ Anfrage von @${requester.split('@')[0]} akzeptiert.`, null, {
        mentions: [requester]
      });
    } catch (e) {
      return m.reply(`❌ Fehler beim Beitritt: ${e.message}`);
    }
  }

  if (action === 'decline') {
    joinRequests.splice(index, 1);
    return m.reply(`❌ Anfrage von @${requester.split('@')[0]} abgelehnt.`, null, {
      mentions: [requester]
    });
  }

  return m.reply(`❗ Unbekannter Befehl. Verwende:\n.joinrequests [accept|decline|clear] <Nummer>`);
};

handler.help = ['joinrequests [accept|decline|clear] <Nummer>'];
handler.tags = ['owner'];
handler.command = /^joinrequests$/i;

module.exports = handler;
