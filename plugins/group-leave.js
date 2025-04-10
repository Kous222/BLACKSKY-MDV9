let handler = async (m, { conn, args, command }) => {
  let group = m.chat
  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
  
  if (!m.isGroup) return m.reply("Dieser Befehl funktioniert nur in Gruppen!"); // Check if it's a group
  if (m.sender !== ownerGroup) return m.reply("Nur der Gruppenadministrator kann mich aus der Gruppe werfen.");
  
  try {
    await m.reply('Bot wird die Gruppe verlassen... Bitte warten.', m.chat)
    await sleep(1000)
    await conn.groupLeave(group)
    m.reply('Bot hat die Gruppe verlassen.', m.chat)
  } catch (e) {
    m.reply('Es gab ein Problem beim Verlassen der Gruppe. try Sie es später noch einmal.', m.chat)
    console.error(e); // Logging errors for debugging
  }
}

handler.command = handler.help = ['out', 'leavegc']
handler.tags = ['group']

handler.owner = true

module.exports = handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
