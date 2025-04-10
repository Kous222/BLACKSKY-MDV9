//import db from '../lib/database.js'

const {createHash}  = require ('crypto');
let handler = async function (m, { conn, args, command, usedPrefix}) {
  if (!args[0]) throw `✳️ *Anmeldenkan nomor unentschieden*\ncontoh! ${usedPrefix + command} nomorseri\n\nNomor unentschieden kann in ansehen in\n\n*${usedPrefix}nomorseri*`
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw '⚠️ *Nomor unentschieden salah*'
  user.registered = false
  m.reply(`✅ Success`)
}
handler.help = ['unreg <Nomor Unentschieden>'] 
handler.tags = ['rg']

handler.command = ['unreg'] 
handler.register = true

module.exports = handler