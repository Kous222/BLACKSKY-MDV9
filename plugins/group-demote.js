let handler = async (m, { teks, conn, isOwner, isAdmin, args, command }) => {
    if (m.isBaileys) return;
    if (!(isAdmin || isOwner)) {
      global.dfail('Admin', m, conn);
      throw false;
  }

  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";

  if (m.quoted) {
      if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
      let usr = m.quoted.sender;
      await conn.groupParticipantsUpdate(m.chat, [usr], "demote");
      m.reply(`Erfolgreich @${usr.split('@')[0]} degradiert!`, null, { mentions: [usr] });
      return;
  }

  if (!m.mentionedJid[0]) throw `Tagge jemanden, dessen Position du senken möchtest!`;

  let users = m.mentionedJid.filter(
      (u) => !(u == ownerGroup || u.includes(conn.user.jid))
  );

  for (let user of users) {
      if (user.endsWith("@s.whatsapp.net")) {
          await conn.groupParticipantsUpdate(m.chat, [user], "demote");
          m.reply(`Erfolgreich ${command} @${user.split('@')[0]}!`, null, { mentions: [user] });
      }
  }
};

handler.help = ['demote @user', 'herabstufen @user', 'degradieren @user'];
handler.tags = ['group', 'owner'];
handler.command = /^(demo?te|herabstufen|degradieren|\↓)$/i;

handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;

module.exports = handler;