
let handler = async (m, { conn, args, command }) => {
  let group = m.chat
  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
  
  if (!m.isGroup) return m.reply("❌ Dieser Befehl funktioniert nur in Gruppen!");
  if (m.sender !== ownerGroup) return m.reply("⚠️ Nur der Gruppenadministrator kann mich aus der Gruppe entfernen.");
  
  try {
    await m.reply('🚪 Der Bot verlässt jetzt die Gruppe. Vielen Dank für die Zusammenarbeit! Ich stehe jederzeit zur Verfügung, falls ich wieder eingeladen werde.', m.chat)
    await sleep(1000)
    await conn.groupLeave(group)
  } catch (e) {
    m.reply('❗ Es gab ein Problem beim Verlassen der Gruppe. Bitte versuche es später noch einmal.', m.chat)
    console.error(e); // Fehlerausgabe für Debugging
  }
}

handler.command = handler.help = ['out', 'leavegc']
handler.tags = ['group']

handler.owner = true

module.exports = handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
