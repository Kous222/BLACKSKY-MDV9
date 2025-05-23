async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys || !(m.mtype === "documentMessage") || !global.db.data.chats[m.chat]?.antifile) return;
    if (isAdmin || !isBotAdmin) {
        // Wenn Absender Admin ist oder Bot nicht Admin ist, nichts unternehmen
      } else {

    const user = global.db.data.users[m.sender];
    user.banned = false;
    const warningMessage = '⚠️ *Datei erkannt!* ⚠️\nDu hast eine Datei gesendet. Sei vorsichtig beim Herunterladen von Dateien, sie könnten Viren enthalten oder für Phishing verwendet werden.';
    await m.reply(warningMessage);

    const deleteMessage = {
        delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant
        }
    };
    await this.sendMessage(m.chat, deleteMessage);
      }
}

module.exports = { before };