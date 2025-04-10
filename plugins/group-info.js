let handler = async (m, { conn, participants, groupMetadata, text }) => {

    const getGroupAdmins = (participants) => {
        admins = []
        for (let i of participants) {
            i.isAdmin ? admins.push(i.jid) : ''
        }
        return admins
    }

    let pp = 'https://telegra.ph/file/3c1ea5866a11088685413.jpg'
    try {
        pp = await conn.getProfilePicture(m.chat)
    } catch (e) {
    } finally {
        let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, expired, descUpdate, Sticker } = global.db.data.chats[m.chat]
        const groupAdmins = getGroupAdmins(participants)
        let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n')

        if (text) return m.reply(msToDate(expired - new Date() * 1))

        let caption = `*Gruppeninformationen*\n
*id:* 
${groupMetadata.id}
*name:* 
${groupMetadata.subject}
*Beschreibung:* 
${groupMetadata.desc}
*Gesamtmitglieder:*
${participants.length} Mitglieder
*Gruppenersteller:* 
@${m.chat.split`-`[0]}
*Gruppenadmins:*
${listAdmin}
*Bot-Einstellungen:*
${antiLink ? '✅' : '❌'} Anti-Link
${global.db.data.chats[m.chat].delete ? '❌' : '✅'} Anti-Delete
${isBanned ? '✅' : '❌'} Gebannt
${descUpdate ? '✅' : '❌'} Beschreibung
${detect ? '✅' : '❌'} Erkennung
${Sticker ? '✅' : '❌'} Sticker
${welcome ? '✅' : '❌'} Willkommensnachricht
*Bot-Nachrichteneinstellungen:*
Willkommen: ${sWelcome}
Abschied: ${sBye}
Beförderung: ${sPromote}
Herabstufung: ${sDemote}
*Verbleibende Zeit:*
${msToDate(expired - new Date() * 1)}
`.trim()
        let mentionedJid = groupAdmins.concat([`${m.chat.split`-`[0]}@s.whatsapp.net`])
        conn.sendFile(m.key.remoteJid, pp, 'pp.jpg', caption, m, 0, { contextInfo: { mentionedJid } })
    }
}
handler.help = ['infogruppe']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

module.exports = handler

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " Tage " + hours + " Stunden " + minutes + " Minuten";
    // +minutes+":"+sec;
}
