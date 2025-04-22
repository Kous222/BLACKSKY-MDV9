let handler = async (m, { conn }) => {
  const userId = m.sender;
  const userName = m.pushName || 'Unbekannt';
  
  if (!global.db.data.users[userId]) {
    return m.reply('❌ Du hast noch kein Bankkonto. Erstelle zuerst ein Konto mit .createaccount');
  }

  const balance = global.db.data.users[userId].balance;
  m.reply(`💰 *Kontostand von ${userName}:* ${balance}€`);
};

handler.command = ['balance'];
handler.help = ['balance'];
handler.tags = ['bank'];

module.exports = handler;
ser.exp}_
▢ *GELD* : _Gesamt ${user.Münzen}_
└──────────────

*HINWEIS :* 
Du kannst 💎 Diamanten mit dem Befehl kaufen
❏ *${usedPrefix}buydm <Anzahl dm>* / *${usedPrefix}kaufedia <Anzahl>*
❏ *${usedPrefix}buyalldm* / *${usedPrefix}kaufalledia*`, m, { mentions: [who] })
}
handler.help = ['balance', 'kontostand', 'guthaben']
handler.tags = ['econ']
handler.command = ['bal', 'balance', 'kontostand', 'guthaben'] 
handler.rpg = true
module.exports = handler;
