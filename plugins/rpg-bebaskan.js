let handler = async (m, { conn, text }) => {
    if (!text) throw '• *Beispiel :* .bebaskan 62×××'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag Person die/der/das möchte dibebaskan von penjara'
    
    let users = global.db.data.users
    
    // Mengecek pekerjaan Nutzer die/der/das meminta für membebaskan
    if (users[m.sender].job !== 'polisi') throw 'Sie muss werden polisi für durchführen tindakan dies.'
    
    users[who].jail = false
    conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key }})
}
handler.help = ['bebaskan']
handler.tags = ['rpg']
handler.command = /^bebaskan$/i
handler.Besitzer = false
handler.admin = false
handler.rpg = true

module.exports = handler