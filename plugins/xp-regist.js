const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]

  // Check if the user is already registered
  if (user.registered === true) {
    throw `❌ Du bist bereits registriert.\nMöchtest du dich abmelden und neu registrieren? Verwende: *${usedPrefix}unreg <Seriennummer>*`
  }

  // Check if the text matches the required format
  if (!Reg.test(text)) {
    throw `❌ Falsches Format!\nVerwende: *${usedPrefix}register Name.Alter.Wohnort*\nBeispiel: *${usedPrefix}register Martin.20.Berlin*`
  }

  let [_, name, splitter, ageAndLocation] = text.match(Reg)

  if (!name) throw '❌ Der Name darf nicht leer sein.'
  if (!ageAndLocation) throw '❌ Alter und Wohnort müssen angegeben werden.'

  // Split the age and location
  let [age, location] = ageAndLocation.split('.')

  if (!age) throw '❌ Das Alter darf nicht leer sein.'
  if (!location) throw '❌ Der Wohnort darf nicht leer sein.'

  age = parseInt(age)
  if (age > 120) throw '❌ Das Alter ist zu hoch, bist du ein Vampir? 🧛‍♂️'
  if (age < 5) throw '❌ Du bist zu jung, um diesen Bot zu verwenden!'

  // Store the user data
  user.name = name.trim()
  user.age = age
  user.location = location.trim()
  user.regTime = +new Date()
  user.registered = true

  let sn = createHash('md5').update(m.sender).digest('hex')

  m.reply(`
✅ *Registrierung erfolgreich!*

╭─「 Benutzerinformationen 」
│ 👤 Name: ${name}
│ 🎂 Alter: ${age} Jahre
│ 📍 Wohnort: ${location}
╰────

🆔 Seriennummer: 
${sn}
`.trim())
}

handler.help = ['liste', 'reg', 'register'].map(v => v + ' <Name.Alter.Wohnort>')
handler.tags = ['xp']
handler.command = /^(liste|reg(ister)?)$/i

module.exports = handler
