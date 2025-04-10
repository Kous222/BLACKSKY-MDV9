let handler = async (m, { text, usedPrefix }) => {
    let falsch = `Wähle eine der verfügbaren Optionen\n\nschere, papier, stein\n\n${usedPrefix}suit schere\n${usedPrefix}ssp stein\n${usedPrefix}schere-stein-papier papier\n\nBitte mit Leerzeichen!`
    if (!text) throw falsch
    var astro = Math.random()

    if (astro < 0.34) {
        astro = 'stein'
    } else if (astro > 0.34 && astro < 0.67) {
        astro = 'schere'
    } else {
        astro = 'papier'
    }

    // Regeln bestimmen
    if (text == astro) {
        m.reply(`Unentschieden!\nDu: ${text}\nBot: ${astro}`)
    } else if (text == 'stein') {
        if (astro == 'schere') {
            global.db.data.users[m.sender].Münzen += 1000
            m.reply(`Du gewinnst! +1000 Münzen\nDu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`Du verlierst!\nDu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'schere') {
        if (astro == 'papier') {
            global.db.data.users[m.sender].Münzen += 1000
            m.reply(`Du gewinnst! +1000 Münzen\nDu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`Du verlierst!\nDu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'papier') {
        if (astro == 'stein') {
            global.db.data.users[m.sender].Münzen += 1000
            m.reply(`Du gewinnst! +1000 Münzen\nDu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`Du verlierst!\nDu: ${text}\nBot: ${astro}`)
        }
    } else {
        throw falsch
    }
}
handler.help = ['suit', 'schere-stein-papier', 'ssp']
handler.tags = ['spiel']
handler.command = /^(suit|schere-stein-papier|ssp)$/i

module.exports = handler
