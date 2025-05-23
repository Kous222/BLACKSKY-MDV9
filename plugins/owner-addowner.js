let handler = async (m, { conn, text }) => {
    // Überprüfen, wer der Benutzer ist
    let wer;
    if (m.isGroup) wer = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    else wer = m.chat;

    // Überprüfen, ob der Benutzer markiert wurde
    if (!wer) throw '❗ Bitte markiere jemanden!';

    // Überprüfen, ob der Benutzer bereits Owner ist
    if (global.owner.includes(wer.split`@`[0])) {
        throw '❗ Diese Person ist bereits als Owner eingetragen!';
    }

    // Benutzer zur Ownerliste hinzufügen
    global.owner.push(wer.split`@`[0]);

    // Sicherstellen, dass die Datenbank initialisiert wurde
    if (!global.db.data) throw '📂 Die Datenbank wurde nicht initialisiert!';
    if (!global.db.data.users[wer]) global.db.data.users[wer] = { owner: true };

    // Benutzer in der Datenbank als Owner markieren
    global.db.data.users[wer].owner = true;

    // Bestätigungsnachricht senden
    conn.reply(m.chat, `✅ *@${wer.split`@`[0]}* wurde erfolgreich als Owner hinzugefügt!`, m, {
        contextInfo: {
            mentionedJid: [wer],
        },
    });
};

handler.help = ['addowner [@nutzer]'];
handler.tags = ['eigentümer'];
handler.command = /^(add|hinzufügen|\+)owner$/i;

handler.owner = true;

module.exports = handler;
