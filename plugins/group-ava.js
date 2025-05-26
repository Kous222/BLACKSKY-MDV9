
const fetch = require('node-fetch');

let handler = async (m, { conn, command }) => {
  try {
    let who;
    if (m.isGroup) {
      who = m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted && m.quoted.sender
          ? m.quoted.sender
          : m.sender;
    } else {
      who = m.quoted && m.quoted.sender ? m.quoted.sender : m.sender;
    }

    let pp = await conn.profilePictureUrl(who, 'image')
      .catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');

    let buffer = await (await fetch(pp)).buffer();

    await conn.sendFile(
      m.chat,
      pp,
      'avatar.jpg',
      `🖼️ Hier ist das Profilbild von @${who.split('@')[0]}`,
      m,
      { mentions: [who], jpegThumbnail: buffer }
    );

  } catch (error) {
    console.error(error);
    let fallbackPp = await conn.profilePictureUrl(m.sender, 'image')
      .catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');

    let buffer = await (await fetch(fallbackPp)).buffer();

    await conn.sendFile(
      m.chat,
      fallbackPp,
      'avatar.jpg',
      `⚠️ Konnte das Profilbild des angegebenen Nutzers nicht abrufen.\nHier ist dein eigenes Bild, @${m.sender.split('@')[0]}.`,
      m,
      { mentions: [m.sender], jpegThumbnail: buffer }
    );
  }
};

handler.help = ['avatar <@tag/reply>'];
handler.tags = ['group'];
handler.command = /^(avatar|ava)$/i;
handler.group = true;

module.exports = handler;
