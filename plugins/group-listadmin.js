let handler = async (m, { conn }) => {
    if (!m.isGroup) {
        return await conn.reply(m.chat, 'Dieser Befehl funktioniert nur in Gruppen.', m)
    }

    let groupMetadata = await conn.groupMetadata(m.chat)
    let gruppeName = groupMetadata.subject
    let participants = groupMetadata.participants

    // Debug-Ausgabe aller Teilnehmer-Objekte (wichtig zum Prüfen der Struktur)
    console.log('Teilnehmer:', participants)

    // Versuche Admins zu finden mit verschiedenen Varianten:
    let admins = participants.filter(p => {
        // Variationen, je nach Struktur
        return (
            p.isAdmin === true ||
            p.isSuperAdmin === true ||
            p.admin === "admin" ||
            p.admin === "superadmin" ||
            p.role === "admin" ||
            p.role === "superadmin"
        )
    }).map(p => p.id)

    let totalAdmins = admins.length

    let txt = `📋 *Admins der Gruppe:* _${gruppeName}_\n`
    txt += `👥 *Anzahl der Admins:* ${totalAdmins}\n\n`

    if (totalAdmins > 0) {
        txt += `🔹 *Liste der Admins:*\n`
        for (let admin of admins) {
            txt += `• @${admin.split('@')[0]}\n`
        }
    } else {
        txt += `❗ *Keine Admins gefunden.*`
    }

    await conn.reply(m.chat, txt, m, { mentions: admins })
}

handler.help = ['listadmin']
handler.tags = ['group']
handler.command = /^(adminlist|listadmin)$/i
handler.group = true
handler.register = false

module.exports = handler
