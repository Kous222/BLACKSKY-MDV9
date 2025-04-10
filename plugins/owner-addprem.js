const { MessageType } = require('@adiwajshing/baileys').default;

let handler = async (m, { conn, text, usedPrefix }) => {
  function no(number){
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }

  var hl = [];
  hl[0] = text.split('|')[0];
  hl[0] = no(hl[0]) + "@s.whatsapp.net";
  hl[1] = text.split('|')[1];
  
  if (!text) {
    return conn.reply(m.chat, `*『 FEHLGESCHLAGEN 』*\n\n• ${usedPrefix}prem @tag/nummer|tage\n*Beispiel:* ${usedPrefix}prem 6285764068784|60`, m);
  }
  
  if (typeof db.data.users[hl[0]] === 'undefined') throw 'Benutzer ist noch nicht in der Datenbank angemeldet';
  
  var jumlahTage = 86400000 * hl[1];
  var now = new Date() * 1;
  
  db.data.users[hl[0]].Premium = true;
  
  if (now < db.data.users[hl[0]].premiumTime) {
    db.data.users[hl[0]].premiumTime += jumlahTage;
  } else {
    db.data.users[hl[0]].premiumTime = now + jumlahTage;
  }
  
  conn.reply(m.chat, `*『 ERFOLGREICH 』*\n\nPremium-Zugang für *@${hl[0].split('@')[0]}* wurde erfolgreich für *${hl[1]} Tage* hinzugefügt.`, m, { contextInfo: { mentionedJid: [hl[0]] } });
  conn.reply(hl[0], `*『 PREMIUM INFO 』*\n\nDu hast Premium-Zugang für *${hl[1]} Tage* erhalten.`, m, { contextInfo: { mentionedJid: [hl[0]] } });
};

handler.help = ['addprem *@tag|tage*', 'prem *@tag|tage*'];
handler.tags = ['besitzer'];
handler.command = /^(addprem|prem)$/i;
handler.owner = true;
handler.fail = null;

module.exports = handler;


// hapis skibidiiii