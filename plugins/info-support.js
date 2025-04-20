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

    // Support-Gruppe (statische Gruppen-ID, die für alle Support-Anfragen verwendet wird)
    const supportGroupId = 'https://chat.whatsapp.com/FxyDG0AkovbBXc47OBSk9Q'; // Die Support-Gruppe, an die die Anfrage gesendet wird

    // Stelle sicher, dass der Bot verbunden ist und die Verbindung stabil ist
    if (!conn.user || !conn.user.jid) {
        console.error('❌ Fehler: Die Verbindung des Bots ist nicht richtig initialisiert.');
        return;
    }

    // Überprüfen, ob die Support-Gruppe existiert
    if (!supportGroupId || !supportGroupId.includes('@g.us')) {
        console.error('❌ Fehler: Ungültige Gruppen-ID für den Support.');
        return;
    }

    // Wenn der Befehl aus einer Gruppe kam, benachrichtige die Support-Gruppe über die Anfrage
    try {
        await conn.sendMessage(supportGroupId, {
            text: `🔧 Neue Support-Anfrage von ${who.split('@')[0]} (${who})\n🆔 Support-ID: ${supportId}\n📌 Anfrage: Der Nutzer möchte Unterstützung bei seinem Anliegen.`
        });
    } catch (err) {
        console.error('❌ Fehler beim Senden der Nachricht an die Support-Gruppe:', err);
    }
}

handler.help = ['support'];
handler.tags = ['support'];
handler.command = ['support']; // Der Befehl, der das Skript aktiviert
handler.rpg = false;
module.exports = handler;
