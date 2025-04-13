let handler = async (m, { conn, text, isROwner, isOwner, command, usedPrefix }) => {
  if (/@user/i.test(text)) {
    if (isROwner && /global/i.test(command)) global.conn.bye = text
    else if (isOwner && /global/i.test(command)) conn.bye = text
    else global.db.data.chats[m.chat].sBye = text
    m.reply('Verabschiedungsnachricht erfolgreich festgelegt!\nHinweis:\n@user = (Erwähnung/Tag)')
  } else throw `_Bitte gib einen Text ein!_\n\nVerwende folgendes Schlüsselwort\nDer Bot wird *den Nutzernamen automatisch verwenden*\n\n@user (Erwähnung/Tag)\n\nBeispiel:\n${usedPrefix + command} Auf Wiedersehen @user`
}

handler.help = ['setbye', 'setbyeglobal'].map(v => v + ' <text>')
handler.tags = ['group']
handler.admin = true
handler.command = /^setbye(global)?$/i

module.exports = handler
