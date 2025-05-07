function parseIntroInput(text) {
    let parts = text.trim().split(/\s+/)
    let name = '', alter = '', ort = '', code = ''

    for (let part of parts) {
        if (/^\d{1,2}$/.test(part)) {
            alter = part
        } else if (/^[A-Z0-9]{6,}$/.test(part)) {
            code = part.toUpperCase()
        } else if (!name) {
            name = part
        } else {
            ort += (ort ? ' ' : '') + part
        }
    }

    return { name, alter, ort, code }
}

let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply('❌ Dieser Befehl funktioniert nur in Gruppen.')

    const groupId = m.chat

    // Initialisiere Datenbankstruktur (global.db.data muss bereits vorhanden sein!)
    if (!global.db.data.introCodes) global.db.data.introCodes = {}
    if (!global.db.data.vorgestellteUser) global.db.data.vorgestellteUser = {}

    // introcode setzen
    if (command === 'introcode') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen den Vorstellungsprozess starten.')
        const code = Math.random().toString(36).substring(2, 8).toUpperCase()

        global.db.data.introCodes[groupId] = code
        global.db.data.vorgestellteUser[groupId] = {}

        const participants = (await conn.groupMetadata(groupId)).participants.map(u => u.id)
        const tagList = participants.map(p => '@' + p.split('@')[0]).join(' ')

        return m.reply(
            `📢 *Vorstellungsrunde gestartet!*\n\n` +
            `Verwende den Code: *${code}*\n` +
            `Beispiel: .vorstellen Max 16 Berlin ${code}\n\n` +
            `${tagList}`,
            null,
            { mentions: participants }
        )
    }

    // vorstellen
    if (command === 'vorstellen') {
        const currentCode = global.db.data.introCodes[groupId]
        if (!currentCode) return m.reply('❌ Es wurde noch kein Vorstellungscode festgelegt.')
        if (!text) return m.reply('Bitte sende deine Daten wie z. B.: .vorstellen Max 16 Berlin ABC123')

        let { name, alter, ort, code } = parseIntroInput(text)

        if (code !== currentCode) return m.reply('❌ Falscher oder fehlender Code.')
        if (!name || !alter || !ort) {
            return m.reply('❌ Bitte gib Name, Alter und Wohnort an.')
        }

        if (!global.db.data.vorgestellteUser[groupId]) {
            global.db.data.vorgestellteUser[groupId] = {}
        }

        if (global.db.data.vorgestellteUser[groupId][m.sender]) {
            return m.reply('❌ Du hast dich bereits vorgestellt.')
        }

        global.db.data.vorgestellteUser[groupId][m.sender] = {
            name,
            alter,
            ort
        }

        return m.reply(`✅ *Vorstellung erfolgreich!*\n\n*Name:* ${name}\n*Alter:* ${alter}\n*Wohnort:* ${ort}`)
    }

    // checkintro
    if (command === 'checkintro') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.')

        let vorgestellte = global.db.data.vorgestellteUser[groupId] || {}
        let participants = (await conn.groupMetadata(groupId)).participants.map(p => p.id)
        let nichtVorgestellt = participants.filter(p => !vorgestellte[p] && !p.endsWith(conn.user.jid))

        if (nichtVorgestellt.length === 0) return m.reply('✅ Alle Mitglieder haben sich vorgestellt!')

        let list = nichtVorgestellt.map(p => '• @' + p.split('@')[0]).join('\n')
        return m.reply(`*Noch nicht vorgestellt:*\n\n${list}`, null, { mentions: nichtVorgestellt })
    }

    // introlist
    if (command === 'introlist') {
        if (!isAdmin && !isOwner) return m.reply('Nur Admins dürfen diesen Befehl nutzen.')

        let vorgestellte = global.db.data.vorgestellteUser[groupId] || {}
        let list = Object.entries(vorgestellte).map(([id, data]) =>
            `• @${id.split('@')[0]} - *Name:* ${data.name}, *Alter:* ${data.alter}, *Wohnort:* ${data.ort}`
        ).join('\n')

        if (!list) return m.reply('❌ Es hat sich noch niemand vorgestellt.')

        return m.reply(`*Bereits vorgestellte Mitglieder:*\n\n${list}`, null, {
            mentions: Object.keys(vorgestellte)
        })
    }
}

handler.help = ['introcode', 'vorstellen <Name Alter Ort Code>', 'checkintro', 'introlist']
handler.tags = ['group']
handler.command = /^introcode$|^vorstellen$|^checkintro$|^introlist$/i
handler.group = true
handler.botAdmin = true

module.exports = handler
