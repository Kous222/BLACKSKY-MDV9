let handler = async (m, { conn, usedPrefix, command }) => {
    let _uptime = process.uptime() * 1000
    let tio = clockString(_uptime)
    let time = require('moment-timezone').tz('Europe/Berlin').format('HH:mm:ss')

    var ct = `
*───「 LAUFZEIT Bot 」───*

Laufzeit : ${tio}
    `
    conn.reply(m.chat, ct, m) // Use conn.reply instead of m.Antworten
}

handler.help = ['runtime', 'laufzeit']
handler.tags = ['info']
handler.command = /^(uptime|runtime|laufzeit)$/i

module.exports = handler

function clockString(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Tag(e) " + hours + " Stunde(n) " + minutes + " Minute(n) " + sec + " Sekunde(n) ";
}
