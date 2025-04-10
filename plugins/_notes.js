let handler = async(m, {conn, command, usedPrefix, text}) => {
  let fail = 'Falsches Format, Beispiel: ' +usedPrefix+command+ ' Bot|1. Kochen'
  global.db.data.users[m.sender].notes = global.db.data.users[m.sender].notes || []
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].notes // backward compatibility
  let notes = global.db.data.users[m.sender].notes
  let split = text.split('|')
  let title = split[0]
  let isi = split[1]
  if (notes.includes(title)) return m.reply('Titel nicht verfügbar!\n\nGrund: Bereits verwendet')
  if (!title || !isi) return m.reply(fail)
  let note = {
    'title': title,
    'isi': isi
  }
  global.db.data.users[m.sender].notes.push(note)
  conn.reply(m.chat, `Notiz erfolgreich erstellt!\nUm die Notiz anzusehen, tippe: ${usedPrefix}notizansehen`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.help = ['notizerstellen <titel|inhalt>', 'notizneu <titel|inhalt>']
handler.tags = ['internet']
handler.command = /^(notizerstellen|notizneu)$/i

module.exports = handler
