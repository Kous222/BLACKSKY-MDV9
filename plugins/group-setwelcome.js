let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('Willkommensnachricht erfolgreich festgelegt\n@user (Erwähnung)\n@subject (Gruppenname)\n@desc (Gruppenbeschreibung)')
  } else throw '_Bitte gib einen Text ein!_\n\nVerwende folgendes Schlüsselwort\nDer Bot wird automatisch den *Nutzernamen, Gruppennamen & die Gruppenbeschreibung* verwenden\n\n@user (Erwähnung/Text)\n@subject (Gruppenname)\n@desc (Gruppenbeschreibung)'
}

handler.help = ['setwelcome <text>']
handler.tags = ['owner', 'group']
handler.command = /^setwelcome$/i

module.exports = handler
