let handler = async (m, { conn, text }) => {
    // Überprüfen, wer der Benutzer ist
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    else who = m.chat;

    // Überprüfen, ob der Benutzer markiert wurde
    if (!who) throw '❗ Bitte markiere jemanden!';

    // Überprüfen, ob der Benutzer bereits Owner ist
    if (global.owner.includes(who.split`@`[0])) {
        throw '❗ Er/Sie ist bereits Owner!';
    }

    // Hinzufügen des Benutzers zu den Ownern
    global.owner.push(who.split`@`[0]);

    // Sicherstellen, dass die Datenbank initialisiert wurde
    if (!global.db.data) throw '📂 Datenbank nicht initialisiert!';
    if (!global.db.data.users[who]) global.db.data.users[who] = { owner: true };

    // Speichern der Änderungen in der Datenbank
    global.db.data.users[who].owner = true;

    // Bestätigung an den Benutzer senden
    conn.reply(m.chat, `✅ *@${who.split`@`[0]}* ist jetzt Owner!`, m, {
        contextInfo: {
            mentionedJid: [who],
        },
    });
};

handler.help = ['addowner [@user]'];
handler.tags = ['owner'];
handler.command = /^(add|hinzufügen|\+)owner$/i;

handler.owner = true;

module.exports = handler;
