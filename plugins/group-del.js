let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (!m.quoted) return m.reply('Antwort auf eine Nachricht, die du löschen möchtest.');
    if (!isAdmin) return m.reply('Nur Admins dürfen Nachrichten löschen.');
    if (!isBotAdmin) return m.reply('Ich brauche Adminrechte, um Nachrichten zu löschen.');

    try {
        await conn.sendMessage(m.chat, { delete: m.quoted.key });
    } catch (e) {
        m.reply('Fehler beim Löschen der Nachricht.');
        console.error(e);
    }
};

handler.help = ['del'];
handler.tags = ['admin'];
handler.command = /^del$/i;
handler.group = true;

module.exports = handler;