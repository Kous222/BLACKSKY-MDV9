let handler = async (m, { conn, text, isROwner, isOwner, isAdmin }) => {
  // Überprüfen, ob der Benutzer ein Admin oder Besitzer ist
  if (!(isAdmin || isOwner)) {
    throw 'Du bist kein Admin oder Besitzer!';
  }

  if (text) {
    // Setze die benutzerdefinierte "Tschüss"-Nachricht basierend auf der Rolle
    if (isROwner) global.conn.bye = text;
    else if (isOwner) conn.bye = text;

    // Speichern der benutzerdefinierten "Tschüss"-Nachricht in der Datenbank für den spezifischen Chat
    global.db.data.chats[m.chat].sBye = text;
    m.reply(`„Tschüss“-Nachricht erfolgreich festgelegt! ${text}`);
  } else {
    throw 'Wo ist der Text? Bitte gib die „Tschüss“-Nachricht ein!';
  }
}

handler.help = ['setbye <text>']
handler.tags = ['Besitzer', 'Gruppe']

handler.command = /^setbye$/i

handler.botAdmin = true

module.exports = handler
