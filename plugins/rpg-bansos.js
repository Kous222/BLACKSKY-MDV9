let handler = async (m, { conn, command }) => {
    let user = global.db.data.users[m.sender]
    let zufallIch = Math.floor(Math.random() * 150)
    let zufallDu = Math.floor(Math.random() * 75) // damit die Chance auf Gefasstwerden höher ist
    let vergangeneZeit = (new Date - user.letzteBansos)
    let verbleibendeZeit = (3600000 - vergangeneZeit) 
    let timer = uhrzeitString(verbleibendeZeit)
    
    if (user.Münzen < 5000000) return m.reply(`Du brauchst mindestens 5 Millionen Münzen, um diesen Befehl zu benutzen.`)

    if (new Date - user.letzteBansos > 300000) {
        if (zufallIch > zufallDu) {
            conn.sendFile(m.chat, 'https://telegra.ph/file/afcf9a7f4e713591080b5.jpg', 'korruption.jpg', 
            `Du wurdest erwischt, nachdem du Bansos-Gelder veruntreut hast🕴️💰.\nDu musst eine Strafe von 5 Millionen Münzen zahlen💵.`, m)
            user.Münzen -= 5000000
            user.letzteBansos = new Date * 1
        } else if (zufallIch < zufallDu) {
            user.Münzen += 5000000
            conn.sendFile(m.chat, 'https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg', 'korruption.jpg', 
            `Du hast erfolgreich Bansos-Gelder veruntreut🕴️💰 und erhältst 5 Millionen Münzen💵.`, m)
            user.letzteBansos = new Date * 1
        } else {
            m.reply(`Du konntest dich erfolgreich *davonschleichen🏃* und wurdest nicht gefasst.`)
            user.letzteBansos = new Date * 1
        }
    } else m.reply(`Bitte warte ${timer}, bevor du den Befehl *${command}* erneut nutzt.`)
}

handler.help = ['korruption']
handler.tags = ['rpg']
handler.command = /^(bansos|korruption)$/i
handler.register = true
handler.group = true
handler.rpg = true

module.exports = handler

function uhrzeitString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
