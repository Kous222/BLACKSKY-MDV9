const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Sie bereits registriert\nMau liste wiederholen? ${usedPrefix}unreg <SN|UNENTSCHIEDENAL NUMBER>`
  if (!Reg.test(text)) throw `Format salah\n*${usedPrefix}liste name.umur*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Name nicht darf kosong (Alphanumeric)'
  if (!age) throw 'Umur nicht darf kosong (Angka)'
  age = parseInt(age)
  if (age > 120) throw 'Umur zu sehr tua 😂'
  if (age < 5) throw 'Bayi kann ngetik sesuai format bjir ._.'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
register erfolgreich!

╭─「 Info 」
│ Name: ${name}
│ Umur: ${age} Jahr 
╰────
Serial Number: 
${sn}
`.trim())
}
handler.help = ['liste', 'reg', 'register'].map(v => v + ' <name>.<umur>')
handler.tags = ['xp']

handler.command = /^(liste|reg(ister)?)$/i

module.exports = handler
