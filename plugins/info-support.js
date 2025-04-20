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

    // Array von Gruppen-IDs, an die die Anfrage gesendet werden soll
    const supportGroupIds = [
        'https://chat.whatsapp.com/FxyDG0AkovbBXc47OBSk9Q', // Beispiel 1
        'https://chat.whatsapp.com/LiESc5gBSCTG79iHL3uAUA', // Beispiel 2
        'https://chat.whatsapp.com/AnotherGroupID2', // Beispiel 3
    ];

    // Stelle sicher, dass der Bot verbunden ist und die Verbindung stabil ist
    if (!conn.user || !conn.user.jid) {
        console.error('❌ Fehler: Die Verbindung des Bots ist nicht richtig initialisiert.');
        return;
    }

    // Überprüfen, ob alle Gruppen-IDs korrekt sind
    for (let groupId of supportGroupIds) {
        if (!groupId || !groupId.includes('@g.us')) {
            console.error('❌ Fehler: Ungültige Gruppen-ID für den Support.');
            return;
        }
    }

    // Wenn der Befehl aus einer Gruppe kam, benachrichtige alle Gruppen über die Anfrage
    try {
        // Benutzeranfrage extrahieren
        let supportMessage = m.text.replace(`${usedPrefix}support`, '').trim();
        
        if (supportMessage) {
            // Sende die Support-Nachricht an jede Gruppe in der Liste
            for (let groupId of supportGroupIds) {
                await conn.sendMessage(groupId, {
                    text: `🔧 Neue Support-Anfrage von ${who.split('@')[0]} (${who})\n🆔 Support-ID: ${supportId}\n📌 Anfrage: ${supportMessage}`
                });
            }
        } else {
            console.error('❌ Fehler: Keine Nachricht nach .support-Befehl.');
        }
    } catch (err) {
        console.error('❌ Fehler beim Senden der Nachricht an die Support-Gruppen:', err);
    }
}

handler.help = ['support'];
handler.tags = ['support'];
handler.command = ['support']; // Der Befehl, der das Skript aktiviert
handler.rpg = false;
module.exports = handler;
