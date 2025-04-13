let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    const JAIL_TIME = 60 * 60 * 1000; // 1 Stunde
    let who = (m.mentionedJid && m.mentionedJid[0])
        ? m.mentionedJid[0]
        : args[0]
            ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '') + '@s.whatsapp.net')
            : '';
    const user = global.db.data.users[who];
    const usar = global.db.data.users[m.sender];

    if (usar.job?.toLowerCase() !== 'polizist') {
        return m.reply(`❌ *Nur Polizisten dürfen Personen verhaften!*\n\nDu bist aktuell als *${usar.job || 'kein Beruf'}* registriert.\n\nNutze den Befehl *.job polizist* um als Ordnungshüter zu arbeiten.`);
    }

    if (!who) return m.reply('*Markiere das Ziel oder gib die Nummer ein*');
    if (!user) return m.reply(`*Nutzer ${who} existiert nicht in der Datenbank*`);

    user.jail = true;
    user.perkerjaandua = Date.now() + JAIL_TIME;

    // Belohnung
    usar.exp = (usar.exp || 0) + 100;
    usar.level = (usar.level || 0) + 1;
    usar.money = (usar.money || 0) + 250;

    setTimeout(() => {
        conn.reply(who, `*Du wurdest ins Gefängnis gebracht von ${usar.name}!*`, m);
    }, 5000);

    conn.reply(
        m.chat,
        `✅ *@${(who || '').replace(/@s\.whatsapp\.net/g, '')} wurde verhaftet!*\n\n👮 *Polizist:* ${usar.name}\n🎖️ +1 Level\n💰 +250 Geld\n🧠 +100 XP\n\nGute Arbeit, weiter so!`,
        m,
        { mentions: [who] }
    );
};

handler.help = ['gefängnis', 'jail', 'prison'];
handler.tags = ['rpg'];
handler.command = /^(gefängnis|jail|prison)$/i;
handler.register = true;
handler.rpg = true;

module.exports = handler;
