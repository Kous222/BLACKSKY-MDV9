let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, args, usedPrefix, command }) => {
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

  if (action === 'accept') {
    joinRequests.splice(index, 1);
    await conn.groupAcceptInvite(link.split('/').pop());

    const ownerProfilePic = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null);

    const welcomeMessage = `🌟🎉 *Hurra!* 🎉🌟\n\n` +
      `❤️ Der Owner (@${m.sender.split('@')[0]}) hat mich in eure Gruppe geschickt!\n` +
      `🤖 Ich bin hier, um Spaß und Ordnung zu bringen!\n\n` +
      `🔔 *Owner wird bald nachkommen.*\n` +
      `💬 Nutzt mich gerne für Spiele, Infos und vieles mehr!\n\n` +
      `✨ Viel Spaß zusammen! ✨`;

    if (ownerProfilePic) {
      await conn.sendMessage(m.chat, {
        image: { url: ownerProfilePic },
        caption: welcomeMessage,
        mentions: [m.sender]
      });
    } else {
      await conn.sendMessage(m.chat, {
        text: welcomeMessage,
        mentions: [m.sender]
      });
    }

    return m.reply(`✅ Anfrage von @${sender.split('@')[0]} wurde **akzeptiert** und der Bot ist der Gruppe beigetreten.`, null, {
      mentions: [sender]
    });
  }

  if (action === 'decline') {
    joinRequests.splice(index, 1);
    return m.reply(`❌ Anfrage von @${sender.split('@')[0]} wurde **abgelehnt** und gelöscht.`, null, {
      mentions: [sender]
    });
  }

  throw `❗ Unbekannter Befehl. Verwende:\n- \`${usedPrefix + command} accept <Nummer>\`\n- \`${usedPrefix + command} decline <Nummer>\`\n- \`${usedPrefix + command} clear\``;
};

handler.help = ['joinrequests', 'joinrequests accept <Nummer>', 'joinrequests decline <Nummer>', 'joinrequests clear'];
handler.tags = ['owner'];
handler.command = ['joinrequests'];
handler.rowner = true;

module.exports = handler;
