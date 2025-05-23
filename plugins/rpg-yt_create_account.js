// Handler function
let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender];

    try {
        if (command === 'youtubekonto' || command === 'ytkonto') {
            if (args.length === 0) {
                return m.reply("Bitte gib den Namen deines YouTube-Kontos ein.\nBeispiel: .youtubekonto Mahiru");
            }

            // Alle Argumente zu einem String (YouTube-Kontoname) zusammenfügen
            let youtubeAccountName = args.join(' ');

            // YouTube-Kontonamen für den Benutzer festlegen
            user.youtube_account = youtubeAccountName;
            m.reply(`Dein YouTube-Konto wurde erfolgreich erstellt/bearbeitet\nKanal: ${youtubeAccountName}`);
        } else if (command === 'kontoentfernen' || command === 'kontolöschen') {
            // Prüfen, ob der Benutzer ein YouTube-Konto hat
            if (!user.youtube_account) {
                return m.reply("Du hast noch kein YouTube-Konto.");
            }

            // YouTube-Konto des Benutzers löschen
            delete user.youtube_account;
            m.reply("Dein YouTube-Konto wurde aus unserem System gelöscht.");
        } else if (/live/i.test(command) && args[0] === 'youtuber') {
            // Prüfen, ob der Benutzer ein YouTube-Konto hat
            if (!user.youtube_account) {
                return m.reply("Erstelle zuerst ein Konto\nTippe: .youtubekonto");
            }

            // Bestehender Code für den Befehl 'live youtuber'
            // ...
        } else {
            return await m.reply("Befehl nicht erkannt.\n*.ytprofil*\n> Um dein YouTube-Konto zu überprüfen\n*.ytlive [Livestream-Titel]*\n> Um eine Livestream-Aktivität zu starten.");
        }
    } catch (err) {
        m.reply("Fehler\n\n\n" + err.stack);
    }
};

// Metadata
handler.help = ['youtubekonto', 'ytkonto', 'kontoentfernen', 'kontolöschen']; // Hilfebefehle hinzufügen
handler.tags = ['rpg'];
handler.command = /^(youtubekonto|ytkonto|kontoentfernen|kontolöschen)$/i; // Befehle einschließen
handler.register = true;
handler.group = true;
handler.rpg = true;
module.exports = handler;