const { MessageType } = require('@adiwajshing/baileys').default;

let handler = async (m, { conn, text, usedPrefix }) => {
  function no(number){
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }
  
  if (!text) {
    return conn.reply(m.chat, `*『 F E H L E R 』*\n\n${usedPrefix}unprem @tag/Nummer\n\n*Beispiel:* ${usedPrefix}unprem 6285764068784`, m);
  }

  text = no(text) + "@s.whatsapp.net";
  global.db.data.users[text].Premium = false;
  global.db.data.users[text].premiumTime = 0;
  
  conn.reply(m.chat, `*Premium-Zugang für @${text.split('@')[0]} erfolgreich entfernt.*`, m, { contextInfo: { mentionedJid: [text] } });
};

handler.help = ['unprem'];
handler.tags = ['besitzer'];
handler.command = /^(unprem|delprem)$/i;
handler.owner = true;
handler.fail = null;

module.exports = handler;

// hapis skibidi