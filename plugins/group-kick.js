let handler = async (m, { teks, conn, isOwner, isAdmin, args }) => {
  if (m.isBaileys) return;
  if (!(isAdmin || isOwner)) {
    global.dfail('Admin', m, conn);
    throw false;
  }
  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
  
  if (m.quoted) {
    if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
    let usr = m.quoted.sender;
    try {
      await conn.groupParticipantsUpdate(m.chat, [usr], "remove");
      m.reply(`👢 Boom! @${usr.split('@')[0]} wurde erfolgreich rausgeschmissen!`, null, { mentions: [usr] });
    } catch (e) {
      m.reply(`⚠️ Ups, konnte @${usr.split('@')[0]} nicht entfernen: ${e.message}`);
    }
    return;
  }

  if (!m.mentionedJid[0]) throw `🤔 Hey, markier doch bitte jemanden, den du rausschmeißen willst!`;

  let users = m.mentionedJid.filter(
    (u) => !(u == ownerGroup || u.includes(conn.user.jid))
  );

  for (let user of users) {
    if (user.endsWith("@s.whatsapp.net")) {
      try {
        await conn.groupParticipantsUpdate(m.chat, [user], "remove");
        m.reply(`👢 Boom! @${user.split('@')[0]} wurde erfolgreich rausgeschmissen!`, null, { mentions: [user] });
      } catch (e) {
        m.reply(`⚠️ Ups, konnte @${user.split('@')[0]} nicht entfernen: ${e.message}`);
      }
    }
  }
};

handler.help = ['kick @user', 'entfernen @user', 'raus @user'];
handler.tags = ['group'];
handler.command = /^(kic?k|remove|entfernen|raus|\-)$/i;

handler.group = true;
handler.botAdmin = true;

module.exports = handler;
