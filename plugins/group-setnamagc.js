let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args.length) {
        return m.reply(`Wie soll der Gruppenname lauten? Beispiel: *${usedPrefix + command}* Freundesgruppe Ngawi`);
    }

    try {
        await conn.groupUpdateSubject(m.chat, args.join(" "));
        m.reply('Gruppenname erfolgreich geändert!');
    } catch (err) {
        m.reply('Gruppenname konnte nicht geändert werden. Stelle sicher, dass der Bot Admin-Rechte hat.');
        console.error(err);
    }
};

handler.help = ['setgruppenname'];
handler.tags = ['gruppe'];
handler.command = /^(setnamagc|setgruppenname)$/i;
handler.owner = false;
handler.mods = false;
handler.Premium = false;
handler.group = true; 
handler.private = false;
handler.register = false;
handler.admin = true; 
handler.botAdmin = true; 

module.exports = handler;
