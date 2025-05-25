const { createHash } = require('crypto')

// Regex to capture: Name.Age
// Name = any text except dot, Age = number after dot
let Reg = /^([^.\s]+)\.([0-9]{1,3})$/i

let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]

  if (user.registered === true) {
    throw `❌ Du bist bereits registriert.\nMöchtest du dich abmelden und neu registrieren? Verwende: *${usedPrefix}unreg <Seriennummer>*`
  }

  if (!text || !Reg.test(text.trim())) {
    throw `❌ Falsches Format!\nVerwende: *${usedPrefix}reg Name.Alter*\nBeispiel: *${usedPrefix}reg Martin.20*`
  }

  let [, name, ageStr] = text.trim().match(Reg)

  if (!name) throw '❌ Der Name darf nicht leer sein.'

  let age = parseInt(ageStr)
  if (isNaN(age)) throw '❌ Das Alter muss eine Zahl sein.'
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

handler.help = ['reg <Name.Alter>', 'register <Name.Alter>']
handler.tags = ['xp']
handler.command = /^reg(ister)?$/i

module.exports = handler
