let handler = async (m, { conn, text, isROwner, isOwner }) => {
  // Check if text is provided
  if (text) {
    // Set custom welcome message for the group
    if (isROwner) global.conn.welcome = text;
    else if (isOwner) conn.welcome = text;

    // Save the welcome message for the group in the database
    global.db.data.chats[m.chat].sWelcome = text;

    // Send confirmation to the user
    m.reply(`Willkommensnachricht erfolgreich festgelegt! ✨\nVerwendbare Platzhalter:\n- @user (for den Nutzer)\n- @subject (Gruppenname)\n- @desc (Gruppenbeschreibung)`);
  } else {
    // If no text is provided, ask for it
    throw 'Bitte gib eine Willkommensnachricht ein!';
  }
};

handler.help = ['setwelcome <text>'];
handler.tags = ['owner', 'group'];
handler.command = /^setwelcome$/i;
handler.botAdmin = true;  // Ensure the bot is an Admin in the group

module.exports = handler;
