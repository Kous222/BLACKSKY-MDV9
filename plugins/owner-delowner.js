let handler = async (m, { conn, text }) => {
    // Überprüfen, wer der Benutzer ist
    let wer;
    if (m.isGroup) wer = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    else wer = m.chat;

    // Überprüfen, ob der Benutzer markiert wurde
    if (!wer) throw '❗ Bitte markiere jemanden!';

    // Überprüfen, ob der Benutzer ein Owner ist
    if (!global.owner.includes(wer.split`@`[0])) {
        throw '❗ Diese Person ist kein Owner!';
    }

    // Entfernen des Benutzers aus der Ownerliste
    let index = global.owner.indexOf(wer.split`@`[0]);
    global.owner.splice(index, 1);

    // Sicherstellen, dass die Datenbank initialisiert wurde
    if (!global.db.data) throw '📂 Die Datenbank wurde nicht initialisiert!';
    if (!global.db.data.users[wer]) global.db.data.users[wer] = { owner: false };

    // In der Datenbank als Nicht-Owner markieren
    global.db.data.users[wer].owner = false;

    // Bestätigungsnachricht senden
    conn.reply(m.chat, `❌ *@${wer.split`@`[0]}* wurde erfolgreich als Owner entfernt!`, m, {
        contextInfo: {
            mentionedJid: [wer],
        },
    });
};

handler.help = ['delowner [@nutzer]'];
handler.tags = ['eigentümer'];
handler.command = /^(del|löschen|-)owner$/i;

handler.owner = true;

module.exports = handler;
