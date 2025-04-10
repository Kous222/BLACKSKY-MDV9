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
    await conn.groupParticipantsUpdate(m.chat, [usr], "remove"); 
    return;
  }

  if (!m.mentionedJid[0]) throw `Bitte markiere den Nutzer, den du aus der Gruppe entfernen möchtest.`;

  let users = m.mentionedJid.filter(
    (u) => !(u == ownerGroup || u.includes(conn.user.jid))
  );

  for (let user of users) {
    if (user.endsWith("@s.whatsapp.net"))
      await conn.groupParticipantsUpdate(m.chat, [user], "remove");
  }
};

handler.help = ['kick @user', 'entfernen @user', 'raus @user'];
handler.tags = ['group'];
handler.command = /^(kic?k|remove|entfernen|raus|\-)$/i;

handler.group = true;
handler.botAdmin = true;

module.exports = handler;
