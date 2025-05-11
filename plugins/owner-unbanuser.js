const User = require('../lib/User'); // passe den Pfad ggf. an

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`✳️ Benutze: ${usedPrefix + command} @user oder user ID`);
  
  let mention = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null) || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  
  if (!mention) return m.reply(`✳️ Bitte gib einen gültigen Benutzer an`);

  let user = await User.findOne({ jid: mention });
  if (!user) {
    return m.reply(`⚠️ Dieser Benutzer ist nicht in der Datenbank.`);
  }

  if (!user.banned && (!user.bannedTime || user.bannedTime <= 0)) {
    return m.reply(`✳️ Dieser Benutzer ist nicht gebannt.`);
  }

  user.banned = false;
  user.bannedTime = 0;
  await user.save();

  await m.reply(`✅ *Unban erfolgreich*\n\n• *Benutzer:* @${mention.split('@')[0]}\n• *Status:* Entbannt`, null, { mentions: [mention] });
  await conn.sendMessage(mention, {
    text: `✅ *Du wurdest entbannt*\n\nDu kannst nun wieder Bot-Befehle verwenden.`
  });

  console.log(`Unban executed - User: ${mention}`);
};

handler.help = ['unban @user'];
handler.tags = ['owner'];
handler.command = /^unban$/i;
handler.owner = true;

module.exports = handler;
