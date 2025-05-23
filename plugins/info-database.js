let handler = async (m) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    m.Antworten(`*Aktuelle Datenbankgröße: ${totalreg} Nutzer*`)
}
handler.help = ['database', 'user', 'datenbank', 'nutzer']
handler.tags = ['info']
handler.command = /^(database|jumlahdatabase|user|datenbank|nutzer)$/i
module.exports = handler
