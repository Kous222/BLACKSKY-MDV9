const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Anmeldenkan Anzahl xp das/der/die ingin ditambahkan auf Nutzer. Beispiel: .addxp @user 10';
  }
    
 	conn.chatRead(m.chat)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) {
    throw 'Tag Nutzer das/der/die ingin ditambahkan xpnya Beispiel: .addxp @user 10';
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'anzahl xp das/der/die dieingeben müssen berupa angka. Beispiel: .addxp @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].exp += pointsToAdd;

  conn.reply(m.chat, `erfolgreich hinzufügen ${pointsToAdd}exp für @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addxp @user <Anzahl xp>'];
handler.tags = ['xp'];
handler.command = /^addxp$/i;
handler.owner = true;

module.exports = handler;