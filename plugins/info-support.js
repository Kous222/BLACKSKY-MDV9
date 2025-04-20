let handler = async (m, { conn, usedPrefix, command }) => {
  const supportGroupLink = 'https://chat.whatsapp.com/FxyDG0AkovbBXc47OBSk9Q';
  
  let capt = `📢 *Support-Gruppe* 📢\n\n`
  capt += `Falls du Hilfe benötigst oder Fragen hast, kannst du unserer Support-Gruppe beitreten.\n`
  capt += `👉 *Klicke hier, um der Support-Gruppe beizutreten:* ${supportGroupLink}\n`
  capt += `Wir helfen dir gerne weiter!`

  await conn.reply(m.chat, capt, m);
}

handler.help = ['support', 'hilfe'];
handler.tags = ['info'];
handler.command = /^(support|hilfe)$/i;
handler.group = false;

module.exports = handler;
