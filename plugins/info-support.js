let handler = async (m, { conn, usedPrefix }) => {
    
    // Bestimmen des Absenders, der den Befehl ausgeführt hat
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    
    // Prüfen, ob der Nutzer in der Datenbank existiert
    let user = global.db.data.users[who];
    if (!(who in global.db.data.users)) throw `✳️ Der Nutzer ist nicht in meiner Datenbank.`;
    
    // Generiere eine zufällige Support-ID
    const supportId = Math.floor(Math.random() * 100000); // Zufällige Support-ID
    
    // Antwort an den Nutzer, dass der Support-Antrag registriert wurde
    conn.reply(m.chat, `
┌───⊷ *Support-Anfrage* ⊶
▢ *📌Name* : _@${who.split('@')[0]}_
▢ *🆔Support ID* : _${supportId}_
▢ *🔧Support-Ticket* : Deine Anfrage wurde registriert und wir werden uns so schnell wie möglich darum kümmern.

*HINWEIS:*
Deine Antwort findest du hier:
❏ *INFO FAQ* : https://chat.whatsapp.com/LiESc5gBSCTG79iHL3uAUA
❏ *FUN FAQ* : https://chat.whatsapp.com/FCH7wgEzDj7KRPdSK4ehQ3
└──────────────
`, m, { mentions: [who] });

    // Nachricht an die Support-Gruppe senden
    const supportGroupId = m.chat; // Die Gruppen-ID, in der der Befehl ausgeführt wurde

    // Wenn der Befehl aus einer Gruppe kam, benachrichtige die Gruppe über die Anfrage
    if (supportGroupId.includes('@g.us')) {
        await conn.sendMessage(supportGroupId, {
            text: `🔧 Neue Support-Anfrage von ${who.split('@')[0]} (${who})\n🆔 Support-ID: ${supportId}\n📌 Anfrage: Der Nutzer möchte Unterstützung bei seinem Anliegen.`
        });
    } else {
        console.log('Die Anfrage kam nicht aus einer Gruppe.');
    }
}

handler.help = ['support'];
handler.tags = ['support'];
handler.command = ['support']; // Der Befehl, der das Skript aktiviert
handler.rpg = true;
module.exports = handler;
