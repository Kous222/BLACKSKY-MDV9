
const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Bitte geben Sie die Münzanzahl an, die Sie einem Benutzer hinzufügen möchten. Beispiel: .addMünzen @user 10';
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
    throw 'Bitte markieren Sie den Benutzer, dem Münzen hinzugefügt werden sollen. Beispiel: .addMünzen @user 10';
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'Die eingegebene Münzanzahl muss eine Zahl sein. Beispiel: .addMünzen @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      Münzen: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].Münzen += pointsToAdd;

  conn.reply(m.chat, `Erfolgreich ${pointsToAdd} Münzen für @${mentionedJid.split('@')[0]} hinzugefügt.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addMünzen @user <Anzahl Münzen>'];
handler.tags = ['xp'];
handler.command = /^addMünzen$/i;
handler.owner = true;

module.exports = handler;
