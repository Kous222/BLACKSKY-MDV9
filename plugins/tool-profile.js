let PhoneNumber = require('awesome-phonenumber');
let levelSystem = require('../lib/levelling');
const { createHash } = require('crypto');

let handler = async (m, { conn, text, usedPrefix }) => {
  let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
  let user = global.db.data.users[who];
  if (!user) throw 'Nutzer nicht gefunden.';

  let { level, exp, role, name, age, money } = user;
  let { min, xp, max } = levelSystem.xpBereich(level, global.multiplier);

  let fortschritt = exp - min;
  let nochXP = max - exp;
  let sn = createHash('md5').update(who).digest('hex');
  let phone = PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international');

  let msg = `
┌── ⬩ *PROFIL*
│ • Name: ${conn.getName(who)} (${name})
│ • Alter: ${age || 'nicht gesetzt'}
│ • Rolle: ${role}
│ • Telefonnummer: ${phone}
│ • Seriennummer: ${sn}
│ • Level: ${level}
│ • XP: ${fortschritt}/${xp} ${nochXP <= 0 ? '(Level-up bereit!)' : `(${nochXP} XP bis zum nächsten Level)`}
│ • Geld: ${money} Münzen
└────────────
`.trim();

  conn.sendMessage(m.chat, { text: msg, mentions: [who] }, { quoted: m });
};

handler.help = ['profile [@user]'];
handler.tags = ['xp'];
handler.command = /^profile$/i;
handler.group = true;
handler.register = false;
handler.limit = false;

module.exports = handler;
