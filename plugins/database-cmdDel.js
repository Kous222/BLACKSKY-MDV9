let handler = async (m, { conn, usedPrefix, text, command }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `Nein gibt hash`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw 'du nicht memiliki izin für menglöschen Befehl Sticker dies'
    delete sticker[hash]
    m.reply(`erfolgreich!`)
}


handler.help = ['cmd'].map(v => 'del' + v + ' <teks>')
handler.tags = ['database', 'Premium']
handler.command = ['delcmd']
handler.Premium = true
module.exports = handler