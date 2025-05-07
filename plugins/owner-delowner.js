let handler = async (m, { conn, text }) => {
    // Überprüfen, wer der Benutzer ist
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    else who = m.chat;

    // Überprüfen, ob der Benutzer markiert wurde
    if (!who) throw '❗ Bitte markiere jemanden!';

    // Überprüfen, ob der Benutzer Owner ist
    if (!global.owner.includes(who.split`@`[0])) {
        throw '❗ Er/Sie ist kein Owner!';
    }

    // Entfernen des Benutzers aus den Owners
    let index = global.owner.indexOf(who.split`@`[0]);
    global.owner.splice(index, 1);

    // Sicherstellen, dass die Datenbank initialisiert wurde
    if (!global.db.data) throw '📂 Datenbank nicht initialisiert!';
    if (!global.db.data.users[who]) global.db.data.users[who] = { owner: false };

    // Speichern der Änderungen in der Datenbank
    global.db.data.users[who].owner = false;

    // Bestätigung an den Benutzer senden
    conn.reply(m.chat, `❌ *@${who.split`@`[0]}* ist jetzt kein Owner mehr!`, m, {
        contextInfo: {
            mentionedJid: [who],
        },
    });
};

handler.help = ['delowner [@user]'];
handler.tags = ['owner'];
handler.command = /^(del|löschen|-)owner$/i;

handler.owner = true;

module.exports = handler;
