let handler = async (m, { conn, isOwner, command }) => {
    if (!m.isGroup) return m.reply('❌ Dieser Befehl funktioniert nur in Gruppen.');

    // Überprüfen, ob der Bot Admin ist
    const groupMetadata = await conn.groupMetadata(m.chat);
    const botJid = conn.user.jid;
    const botIsAdmin = groupMetadata.participants.some(p => p.id === botJid && p.admin);

    if (!botIsAdmin) {
        return m.reply('❌ Ich bin kein Admin in dieser Gruppe. Bitte mache mich zuerst zum Admin.');
    }

    if (!isOwner) {
        return m.reply('❌ Nur der Besitzer des Bots darf diesen Befehl verwenden.');
    }

    const senderId = m.sender;

    try {
        await conn.groupParticipantsUpdate(m.chat, [senderId], "promote");
        m.reply(`✅ Du wurdest erfolgreich zum *Admin* dieser Gruppe befördert!`);
    } catch (err) {
        m.reply(`❌ Fehler beim Befördern: ${err.message}`);
    }
};

handler.help = ['promoteme'];
handler.tags = ['group', 'owner'];
handler.command = /^promoteme$/i;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;
