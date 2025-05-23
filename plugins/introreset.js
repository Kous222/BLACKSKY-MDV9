let handler = async (m, { isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply('❌ Dieser Befehl funktioniert nur in Gruppen.');
    if (!isAdmin && !isOwner) return m.reply('❌ Nur Admins dürfen diesen Befehl nutzen.');

    const groupId = m.chat

    // Lösche den aktiven Vorstellungscode
    if (global.db.data.introCodes && global.db.data.introCodes[groupId]) {
        delete global.db.data.introCodes[groupId]
    }

    // Entferne vorgestellte Nutzer aus der DB
    if (global.db.data.vorgestellteUser && global.db.data.vorgestellteUser[groupId]) {
        delete global.db.data.vorgestellteUser[groupId]
    }

    // Optional: Intro-Daten aus user-Daten entfernen
    let participants = (await conn.groupMetadata(groupId)).participants.map(p => p.id)
    for (let id of participants) {
        if (global.db.data.users[id]) {
            delete global.db.data.users[id].intro
            delete global.db.data.users[id].introDone
        }
    }

    return m.reply('✅ Die Vorstellungsrunde wurde erfolgreich zurückgesetzt.')
}

handler.help = ['introreset']
handler.tags = ['group']
handler.command = /^introreset$/i
handler.group = true
handler.botAdmin = true

module.exports = handler
