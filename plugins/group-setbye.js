let handler = async (m, { conn, text, isROwner, isOwner, isAdmin }) => {
  // Check if the user is an Admin or the owner
  if (!(isAdmin || isOwner)) {
    throw 'Du bist kein Admin oder Besitzer!';
  }

  if (text) {
    // Set the custom "bye" message based on role
    if (isROwner) global.conn.bye = text;
    else if (isOwner) conn.bye = text;

    // Store the custom "bye" message in the database for the specific chat
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
