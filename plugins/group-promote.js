let handler = async (m, { teks, conn, isOwner, isAdmin, args, command }) => {
    if (m.isBaileys) return;
    
    // If user is not admin or owner, throw an error
    if (!(isAdmin || isOwner)) {
        global.dfail('Admin', m, conn);
        throw false;
    }

    let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";

    // If the bot is an admin and the owner is not an admin, the owner can promote themselves
    if (!isAdmin && isOwner && conn.user.jid === m.chat.split`-`[0]) {
        try {
            // Promote the owner
            await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
            return m.reply(`Erfolgreich befördert! Du bist nun Administrator, @${m.sender.split('@')[0]}!`, null, { mentions: [m.sender] });
        } catch (error) {
            m.reply(`Fehler beim Befördern von @${m.sender.split('@')[0]}: ${error.message}`);
        }
    }

    // Check if the message is quoted
    if (m.quoted) {
        if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
        let usr = m.quoted.sender;
        try {
            let nenen = await conn.groupParticipantsUpdate(m.chat, [usr], "promote");
            if (nenen) m.reply(`Erfolgreich ${command} @${usr.split('@')[0]}!`, null, { mentions: [usr] });
        } catch (error) {
            m.reply(`Fehler beim Befördern von @${usr.split('@')[0]}: ${error.message}`);
        }
        return;
    }

    // If no mention, show an error
    if (!m.mentionedJid[0]) throw `Bitte tagge den Nutzer, den du befördern möchtest.`;

    let users = m.mentionedJid.filter(
        (u) => !(u == ownerGroup || u.includes(conn.user.jid))
    );

    for (let user of users) {
        if (user.endsWith("@s.whatsapp.net")) {
            try {
                await conn.groupParticipantsUpdate(m.chat, [user], "promote");
                m.reply(`Erfolgreich ${command} @${user.split('@')[0]}!`, null, { mentions: [user] });
            } catch (error) {
                m.reply(`Fehler beim Befördern von @${user.split('@')[0]}: ${error.message}`);
            }
        }
    }
};

handler.help = ['promote @user', 'befördern @user', 'hochstufen @user', 'Admin @user'];
handler.tags = ['group', 'owner'];
handler.command = /^(promo?te|befördern|hochstufen|Admin|\^)$/i;

handler.group = true;
handler.botAdmin = true;
handler.admin = true;

module.exports = handler;
