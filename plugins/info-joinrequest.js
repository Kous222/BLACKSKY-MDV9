let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, text = '' }) => {
  let sender = m.sender;
  let senderNumber = sender.split('@')[0];
  let isOwner = global.owner?.includes?.(senderNumber);

  if (!isOwner) {
    return m.reply('❌ Nur der globale Owner darf diesen Befehl verwenden.');
  }

  let [actionRaw, indexRaw] = text.trim().split(/\s+/);
  let action = (actionRaw || 'list').toLowerCase();
  let index = parseInt(indexRaw) - 1;

  if (action === 'list') {
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
    return m.reply(`❗ Ungültiger Index. Beispiel: .joinrequest accept 1`);
  }

  const { link, sender: requester } = joinRequests[index];
  const groupCode = link.split('/').pop();

  if (action === 'accept') {
    joinRequests.splice(index, 1);

    try {
      const groupId = await conn.groupAcceptInvite(groupCode);
      await new Promise(r => setTimeout(r, 2000));

      let groupPic = await conn.profilePictureUrl(groupId, 'image').catch(() => null);

      let welcomeText =
        `🎉 *Hey Leute, ich bin jetzt am Start!* 🎉\n\n` +
        `👋 Hallo zusammen! Ich bin euer neuer WhatsApp-Bot und freue mich mega, Teil dieser Gruppe zu sein.\n` +
        `Mit mir gibt’s jede Menge coole Spiele, nützliche Tools und spannende Features – für Spaß und Action rund um die Uhr!\n\n` +
        `⚡ Die Person, die mich eingeladen hat, @${senderNumber}, ist natürlich auch direkt in der Gruppe mit dabei und wird hiermit markiert!\n\n` +
        `⚡ Egal ob Quiz, Emojirätsel oder praktische Befehle – ich bin ready!\n` +
        `Lasst uns zusammen die Gruppe rocken!\n\n` +
        `Falls ihr Fragen habt, einfach melden – ich bin hier, um zu helfen!\n\n` +
        `*Euer Blacksky Bot 🤖🌌*`;

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

  return m.reply(`❗ Unbekannter Befehl. Verwende:\n- .joinrequest accept <Nummer>\n- .joinrequest decline <Nummer>\n- .joinrequest clear`);
};

handler.help = ['joinrequest [accept|decline|clear] <Nummer>'];
handler.tags = ['owner'];
handler.command = /^joinrequest$/i;
handler.rowner = true;

module.exports = handler;
