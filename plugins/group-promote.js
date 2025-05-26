
let handler = async (m, { teks, conn, isOwner, isAdmin, args, command }) => {
    if (m.isBaileys) return;
    if (!(isAdmin || isOwner)) {
        global.dfail('Admin', m, conn);
        throw false;
    }

    let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";

    // Check if the message is quoted
    if (m.quoted) {
        if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
        let usr = m.quoted.sender;
        try {
            let result = await conn.groupParticipantsUpdate(m.chat, [usr], "promote");
            if (result) m.reply(`✅ Nutzer @${usr.split('@')[0]} wurde erfolgreich befördert!`, null, { mentions: [usr] });
        } catch (error) {
            m.reply(`❌ Fehler beim Befördern von @${usr.split('@')[0]}: ${error.message}`);
        }
        return;
    }

    if (!m.mentionedJid[0]) throw `⚠️ Bitte markiere den Nutzer, den du befördern möchtest.`;

    let users = m.mentionedJid.filter(
        (u) => !(u == ownerGroup || u.includes(conn.user.jid))
    );

    for (let user of users) {
        if (user.endsWith("@s.whatsapp.net")) {
            try {
                await conn.groupParticipantsUpdate(m.chat, [user], "promote");
                m.reply(`✅ Nutzer @${user.split('@')[0]} wurde erfolgreich befördert!`, null, { mentions: [user] });
            } catch (error) {
                m.reply(`❌ Fehler beim Befördern von @${user.split('@')[0]}: ${error.message}`);
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
handler.fail = null;

module.exports = handler;
