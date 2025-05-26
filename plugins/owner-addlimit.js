/**
 * Skript von Reelly XD
 * YT:
 * IG:
 * Skript kaufen?
 * WA: +62 857-0436-85323
 * TELE: t.me/rely_xd
 * GitHub: github.com/ReellyXD
 */

const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Bitte gib die Anzahl an Limits an, die du einem Nutzer hinzufügen möchtest.\nBeispiel: *.addlimit @user 10*';
  }

  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) {
    throw 'Bitte markiere den Nutzer, dem du Limits hinzufügen möchtest.\nBeispiel: *.addlimit @user 10*';
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'Die Anzahl der Limits muss eine gültige Zahl sein.\nBeispiel: *.addlimit @user 10*';
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

  conn.reply(m.chat, `Erfolgreich *${pointsToAdd}* Limit zu @${mentionedJid.split('@')[0]} hinzugefügt.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addlimit @user <Anzahl>'];
handler.tags = ['xp'];
handler.command = /^addlimit$/i;
handler.owner = true;

module.exports = handler;
