
let handler = async (m, { conn, text, groupMetadata }) => {
    await conn.sendPresenceUpdate('composing', m.chat)
    var lama = 86400000 * 7 // 7 Tage
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    const milliseconds = new Date(now).getTime();

    let member = groupMetadata.participants.map(v => v.id)
    let nachricht = text ? text : "⚠️ *Hey Leute!*\n\nBitte bleibt aktiv, denn inaktive Mitglieder könnten aus der Gruppe entfernt werden.\nLasst uns zusammenleben und den Chat lebendig halten!"

    var sum = member.length
    var total = 0
    var sider = []

    for (let i = 0; i < sum; i++) {
        let users = m.isGroup ? groupMetadata.participants.find(u => u.id == member[i]) : {}
        if ((typeof global.db.data.users[member[i]] == 'undefined' || milliseconds - global.db.data.users[member[i]].lastseen > lama) && !users.isAdmin && !users.isSuperAdmin) {
            if (typeof global.db.data.users[member[i]] !== 'undefined') {
                if (global.db.data.users[member[i]].banned == true) {
                    total++
                    sider.push(member[i])
                }
            } else {
                total++
                sider.push(member[i])
            }
        }
    }

    if (total == 0) {
        return conn.reply(m.chat, `✅ *Alle Mitglieder sind aktiv!*\nHier gibt es aktuell keine inaktiven Mitglieder. Weiter so!`, m)
    }

    let inactiveList = sider.map(v => ` ○ @${v.replace(/@.+/, '')} (${global.db.data.users[v]?.lastseen ? msToDate(milliseconds - global.db.data.users[v].lastseen) : 'Keine Aktivität'})`).join('\n')

    conn.reply(m.chat, `📢 *Inaktive Mitglieder-Check für ${await conn.getName(m.chat)}*\n\n📊 *${total}/${sum} Mitglieder* sind aktuell als inaktiv markiert.\n\n🌟 Gründe für Inaktivität:\n1️⃣ Nicht aktiv seit mehr als 7 Tagen\n2️⃣ Neu beigetreten aber noch nie etwas geschrieben\n\n💬 _"${nachricht}"_\n\n👥 *Liste der inaktiven Mitglieder:*\n${inactiveList}`, m, {
        contextInfo: {
            mentionedJid: sider
        }
    })
}
handler.help = ['gcsider', 'inaktivemitglieder']
handler.tags = ['group']
handler.command = /^(gcsider|inaktivemitglieder)$/i
handler.group = true
handler.botAdmin = true

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function msToDate(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    if (d == 0 && h == 0 && m == 0) {
        return "Gerade eben"
    } else {
        return `${d}T ${h}Std`
    }
}
