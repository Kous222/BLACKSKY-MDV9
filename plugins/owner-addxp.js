let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Bitte gib die Anzahl der XP an, die einem Nutzer hinzugefügt werden soll.\nBeispiel: *.addxp @user 10*';
  }

  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  let userMention = text.split(' ')[0].replace(/[@+]/g, '');
  let mentionedJid = userMention.includes('@s.whatsapp.net') ? userMention : userMention + '@s.whatsapp.net';

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'Die XP-Anzahl muss eine gültige Zahl sein.\nBeispiel: *.addxp @user 10*';
  }

  let users = global.db.data.users;

  // Ensure the user exists in the database
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      exp: 0,  // Initialize XP if it doesn't exist
      lastclaim: 0
    };
  }

  // Add the XP
  users[mentionedJid].exp += pointsToAdd;

  // Make sure the updated XP is saved
  global.db.data.users = users;

  // Send feedback to the user
  conn.reply(m.chat, `✅ Erfolgreich *${pointsToAdd}* XP hinzugefügt für @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addxp @user <Anzahl>'];
handler.tags = ['xp'];
handler.command = /^addxp$/i;
handler.owner = true;

module.exports = handler;
