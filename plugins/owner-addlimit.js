 /* 
Script By Reelly XD
  � YT: 
  � IG: 
Buy Script? 
  � WA: +62 857-0436-85323
  � TELE: t.me/rely_xd
  � Github: github.com/ReellyXD
*/


const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Anmeldenkan Anzahl limit das/der/die ingin ditambahkan auf Nutzer. Beispiel: .addlimit @user 10';
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
    throw 'Tag Nutzer das/der/die ingin ditambahkan limitnya. Beispiel: .addlimit @user 10';
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'anzahl limit das/der/die dieingeben müssen berupa angka. Beispiel: .addlimit @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      limit: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].limit += pointsToAdd;

  conn.reply(m.chat, `erfolgreich hinzufügen ${pointsToAdd} limit für @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addlimit @user <Anzahl limit>'];
handler.tags = ['xp'];
handler.command = /^addlimit$/i;
handler.owner = true;

module.exports = handler;
