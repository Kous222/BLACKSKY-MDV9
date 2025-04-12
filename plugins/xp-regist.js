const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]

  if (user.registered === true) {
    throw `❌ Du bist bereits registriert.\nMöchtest du dich abmelden und neu registrieren? Verwende: *${usedPrefix}unreg <Seriennummer>*`
  }

  if (!Reg.test(text)) {
    throw `❌ Falsches Format!\nVerwende: *${usedPrefix}liste Name.Alter*\nBeispiel: *${usedPrefix}liste Martin.20*`
  }

  let [_, name, splitter, age] = text.match(Reg)

  if (!name) throw '❌ Der Name darf nicht leer sein.'
  if (!age) throw '❌ Das Alter darf nicht leer sein.'

  age = parseInt(age)
  if (age > 120) throw '❌ Das Alter ist zu hoch, bist du ein Vampir? 🧛‍♂️'
  if (age < 5) throw '❌ Du bist zu jung, um diesen Bot zu verwenden!'

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true

  let sn = createHash('md5').update(m.sender).digest('hex')

  m.reply(`
✅ *Registrierung erfolgreich!*

╭─「 Benutzerinformationen 」
│ 👤 Name: ${name}
│ 🎂 Alter: ${age} Jahre
╰────

🆔 Seriennummer: 
${sn}
`.trim())
}

handler.help = ['liste', 'reg', 'register'].map(v => v + ' <Name.Alter>')
handler.tags = ['xp']
handler.command = /^(liste|reg(ister)?)$/i

module.exports = handler
