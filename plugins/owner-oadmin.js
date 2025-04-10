let handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) throw 'Nggk'
  if (isAdmin) throw 'Obwohl bereits Admin'
  await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
}
handler.command = /^Admin.$/i
handler.rowner = true
handler.botAdmin = true
module.exports = handler
