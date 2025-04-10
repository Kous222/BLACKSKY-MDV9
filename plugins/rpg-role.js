//hapis skibidi
let { getRoleByLevel, updateRole } = require('../lib/role')

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  
  // Use level for role determination
  user.role = getRoleByLevel(user.level || 0)
  
  await conn.reply(m.chat, "du ist: " + user.role, m)
}
handler.help = ['role']
handler.tags = ['info']
handler.command = /^(role|levelrole)$/i
handler.register = true
handler.rpg = true
module.exports = handler