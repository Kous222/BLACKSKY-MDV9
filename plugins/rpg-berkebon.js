const timeout = 1800000
let handler = async (m, { conn, usedPrefix, text }) => {
    let apelu = global.db.data.users[m.sender].bibitapel
    let angguru = global.db.data.users[m.sender].bibitanggur
    let manggau = global.db.data.users[m.sender].bibitmangga
    let pisangu = global.db.data.users[m.sender].bibitpisang
    let jeruku = global.db.data.users[m.sender].bibitjeruk
    let time = global.db.data.users[m.sender].lastberkebon + timeout

    if (apelu == 0 || angguru == 0 || manggau == 0 || pisangu == 0 || jeruku == 0) {
        return conn.reply(m.chat, `*Stelle sicher, dass du von jeder Saat etwas hast!*\n*Benötigt: Apfel-, Mango-, Orangen-, Bananen- und Traubensamen*\n\nBeispiel:\n${usedPrefix}shop buy bibitmangga 500\n\n*Verfügbare Samen:*\nbibitmangga\nbibitanggur\nbibitpisang\nbibitjeruk\nbibitapel`, m)
    }

    if (new Date - global.db.data.users[m.sender].lastberkebon < timeout) {
        return conn.reply(m.chat, `Du hast bereits gepflanzt!\nBitte warte auf deine Ernte.\nVerbleibende Zeit: ${msToTime(time - new Date())}`, m)
    }

    if (manggau > 499) {
        if (apelu > 499) {
            if (pisangu > 499) {
                if (jeruku > 499) {
                    if (angguru > 499) {
                        let pisangpoin = `${Math.floor(Math.random() * 500)}`
                        let anggurpoin = `${Math.floor(Math.random() * 500)}`
                        let manggapoin = `${Math.floor(Math.random() * 500)}`
                        let jerukpoin = `${Math.floor(Math.random() * 500)}`
                        let apelpoin = `${Math.floor(Math.random() * 500)}`

                        global.db.data.users[m.sender].pisang += pisangpoin * 1
                        global.db.data.users[m.sender].anggur += anggurpoin * 1
                        global.db.data.users[m.sender].mangga += manggapoin * 1
                        global.db.data.users[m.sender].jeruk += jerukpoin * 1
                        global.db.data.users[m.sender].apel += apelpoin * 1
                        global.db.data.users[m.sender].tiketcoin += 1

                        global.db.data.users[m.sender].bibitpisang -= 500
                        global.db.data.users[m.sender].bibitanggur -= 500
                        global.db.data.users[m.sender].bibitmangga -= 500
                        global.db.data.users[m.sender].bibitjeruk -= 500
                        global.db.data.users[m.sender].bibitapel -= 500
                        global.db.data.users[m.sender].lastberkebon = new Date * 1

                        conn.reply(m.chat, `Glückwunsch! Du hast erhalten:\n+${pisangpoin} Bananen\n+${manggapoin} Mangos\n+${anggurpoin} Trauben\n+${jerukpoin} Orangen\n+${apelpoin} Äpfel\n+1 Ticketcoin`, m)

                        setTimeout(() => {
                            conn.reply(m.chat, `Zeit zum erneuten Gärtnern!`, m)
                        }, timeout)
                    } else m.reply(`Du benötigst mindestens *500* Traubensamen, um zu pflanzen.`)
                } else conn.reply(m.chat, `Du benötigst mindestens *500* Orangensamen, um zu pflanzen.`, m)
            } else conn.reply(m.chat, `Du benötigst mindestens *500* Bananensamen, um zu pflanzen.`, m)
        } else conn.reply(m.chat, `Du benötigst mindestens *500* Apfelsamen, um zu pflanzen.`, m)
    } else conn.reply(m.chat, `Du benötigst mindestens *500* Mangosamen, um zu pflanzen.`, m)
}

handler.help = ['berkebon']
handler.tags = ['rpg']
handler.command = /^(berkebon)/i
handler.Besitzer = false
handler.mods = false
handler.Premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.rpg = true
handler.limit = true
handler.exp = 0
handler.Münzen = 0

module.exports = handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return hours + " Stunden " + minutes + " Minuten " + seconds + " Sekunden"
}
