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
  txt += `\nVerwendung: ${usedPrefix}notizlöschen 1`
  if (text.length == 0) return m.reply(txt)
  let notes = global.db.data.users[m.sender].notes
  let split = text.split('|')
  if (notes.length == 0) return m.reply('Du hast noch keine Notizen erstellt!')
  let n = Number(split[0]) - 1
  if (notes[n] == undefined) return m.reply('Notiz nicht gefunden!')
  let tmp = []

  for (let nt in notes) {
    if(nt != n) {
      tmp.push(notes[nt])
    } else {
      continue
    }
  }

  let old = global.db.data.users[m.sender].notes
  global.db.data.users[m.sender].notes = tmp
  global.db.data.users[m.sender].catatan = tmp // keep backward compatibility

conn.reply(m.chat, `Notiz erfolgreich gelöscht!`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.help = ['notizlöschen <nummer>', 'notizentfernen <nummer>']
handler.tags = ['internet']
handler.command = /^(notizlöschen|notizentfernen)$/i

module.exports = handler
