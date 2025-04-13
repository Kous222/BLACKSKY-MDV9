let handler = async (m, { conn, isOwner, isAdmin, command }) => {
    if (m.isBaileys) return;

    // Check if the sender is the bot owner and if the bot is already an admin
    if (!isOwner) {
        return m.reply('❌ *Nur der Besitzer des Bots kann sich selbst befördern!*');
    }

    if (isAdmin) {
        return m.reply('✅ Du bist bereits ein Administrator in dieser Gruppe!');
    }

    let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";

    // Check if the bot is an admin and if the command is not quoted
    if (conn.user.jid !== ownerGroup && m.quoted) {
        let usr = m.quoted.sender;
        try {
            let nenen = await conn.groupParticipantsUpdate(m.chat, [usr], "promote");
            if (nenen) m.reply(`Erfolgreich befördert @${usr.split('@')[0]}!`, null, { mentions: [usr] });
        } catch (error) {
            m.reply(`Fehler beim Befördern von @${usr.split('@')[0]}: ${error.message}`);
        }
    } else if (!m.mentionedJid[0]) {
        return m.reply('❌ *Du musst einen Benutzer taggen oder den Bot als Administrator befördern.*');
    } else {
        let users = m.mentionedJid.filter(
            (u) => !(u == ownerGroup || u.includes(conn.user.jid))
        );

        for (let user of users) {
            if (user.endsWith("@s.whatsapp.net")) {
                try {
                    await conn.groupParticipantsUpdate(m.chat, [user], "promote");
                    m.reply(`Erfolgreich @${user.split('@')[0]} befördert!`, null, { mentions: [user] });
                } catch (error) {
                    m.reply(`Fehler beim Befördern von @${user.split('@')[0]}: ${error.message}`);
                }
            }
        }
    }
};

handler.help = ['promote @user', 'befördern @user', 'hochstufen @user', 'admin @user'];
handler.tags = ['group', 'owner'];
handler.command = /^(promo?te|befördern|hochstufen|admin)$/i;

handler.group = true;
handler.botAdmin = true;
handler.admin = true;

module.exports = handler;
