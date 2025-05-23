let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Wer hat den Befehl ausgeführt?
  let who = m.quoted 
    ? m.quoted.sender 
    : m.mentionedJid && m.mentionedJid.length 
    ? m.mentionedJid[0] 
    : m.fromMe 
    ? conn.user.jid 
    : m.sender;

  // Nutzer in Datenbank prüfen
  if (!(who in global.db.data.users)) {
    throw '✳️ Der Nutzer ist nicht in meiner Datenbank.';
  }

  // Text prüfen
  if (!text) {
    throw `Bitte gib ein Anliegen an. Beispiel:\n${usedPrefix + command} Ich brauche Hilfe beim Spielstart.`;
  }

  // Zufällige Support-ID generieren
  const supportId = Math.floor(Math.random() * 100000);

  // Nachricht an den Nutzer
  await conn.reply(m.chat,  
`┌───⊷ Support-Anfrage ⊶
▢ 📌 Name: @${who.split('@')[0]}
▢ 🆔 Support-ID: ${supportId}
▢ 📝 Anfrage: ${text}
▢ 🔧 Status: Deine Anfrage wurde registriert. Wir melden uns bald!

Antworten findest du in:
❏ INFO FAQ: https://chat.whatsapp.com/LiESc5gBSCTG79iHL3uAUA
❏ FUN FAQ: https://chat.whatsapp.com/FCH7wgEzDj7KRPdSK4ehQ3
└──────────────`,
    m, { mentions: [who] });

  // Nachricht an die Support-Gruppe
  const supportGroupId = '120363399996195320@g.us'; // <- Hier echte Gruppen-JID eintragen

  await conn.sendMessage(supportGroupId, {
    text: `📥 *Neue Support-Anfrage*

👤 *Von:* @${who.split('@')[0]}
🆔 *Support-ID:* ${supportId}
📝 *Anliegen:* ${text}`,
    mentions: [who]
  });
};

handler.help = ['support'];
handler.tags = ['support'];
handler.command = ['support'];
handler.rpg = true;

module.exports = handler;
