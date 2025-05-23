let handler = async(m, {conn, command, usedPrefix, text}) => {
  global.db.data.users[m.sender].notes = global.db.data.users[m.sender].notes || []
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].notes // backward compatibility
  let i = 0
  if (global.db.data.users[m.sender].notes.length == 0) return m.reply('Du hast noch keine Notizen erstellt!')
  let txt = '🗒️ Notizen-Register 🗒️\n\n'
  for (let nt in global.db.data.users[m.sender].notes) {
    i += 1
    txt += '[' + i + ']. ' + global.db.data.users[m.sender].notes[nt].title + '\n'
  }
  txt += `\nVerwendung: ${usedPrefix}notizansehen 1\nNotiz löschen: ${usedPrefix}notizlöschen 1`
  if (text.length == 0) return m.reply(txt)
  let notes = global.db.data.users[m.sender].notes
  let split = text.split('|')
  if (notes.length == 0) return m.reply('Du hast noch keine Notizen erstellt!')
  let n = Number(split[0]) - 1

  let isi = global.db.data.users[m.sender].notes[n] != undefined ? global.db.data.users[m.sender].notes[n].isi : 'Notiz nicht gefunden!'
conn.reply(m.chat, `${isi}`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.help = ['notizansehen <nummer>', 'notizeinsehen <nummer>']
handler.tags = ['internet']
handler.command = /^(notizansehen|notizeinsehen)$/i

module.exports = handler
