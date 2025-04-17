const vorgestellt = {};
const codes = {};

let handler = async (m, { conn, command, participants, isAdmin, isGroup }) => {
    if (!isGroup) throw 'Dieser Befehl funktioniert nur in Gruppen.';

    const groupId = m.chat;

    // Vorstellung starten
    if (command === 'vorstellung') {
        if (!isAdmin) throw 'Nur Admins dürfen diesen Befehl nutzen.';

        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        codes[groupId] = code;
        vorgestellt[groupId] = [];

        const mentions = participants.map(p => p.id);
        await conn.sendMessage(groupId, {
            text: `*Vorstellung gestartet!*\n\nBitte stelle dich wie folgt vor:\n\n*${code}*\nName: Max\nAlter: 16\nWohnort/Bundesland: Bayern\n\nNur wer alle Angaben **und** den Code korrekt schreibt, wird als vorgestellt markiert.`,
            mentions
        });
    }

    // Nutzer stellt sich vor
    if (codes[groupId]) {
        const code = codes[groupId];
        const msg = m.text?.trim();

        if (msg && msg.includes(code)) {
            const nameMatch = msg.match(/Name\s*[:\-]\s*(.+)/i);
            const alterMatch = msg.match(/Alter\s*[:\-]\s*(\d+)/i);
            const ortMatch = msg.match(/(Wohnort|Bundesland)\s*[:\-]\s*(.+)/i);

            if (nameMatch && alterMatch && ortMatch) {
                if (!vorgestellt[groupId].includes(m.sender)) {
                    vorgestellt[groupId].push(m.sender);
                    await conn.sendMessage(groupId, {
                        text: `✅ *Vorstellung abgeschlossen:* @${m.sender.split('@')[0]}`,
                        mentions: [m.sender]
                    });
                } else {
                    m.reply('Du hast dich bereits vorgestellt.');
                }
            } else {
                m.reply(`❌ Bitte stelle sicher, dass du folgende Angaben machst:\n- Name\n- Alter\n- Wohnort oder Bundesland\nUnd verwende den Code: *${code}*`);
            }
        }
    }

    // Admin kann sehen, wer sich nicht vorgestellt hat
    if (command === 'nichtvorgestellt') {
        if (!isAdmin) throw 'Nur Admins dürfen diesen Befehl nutzen.';

        const alle = participants.map(p => p.id);
        const nicht = alle.filter(u => !vorgestellt[groupId]?.includes(u) && u !== conn.user.jid);

        if (nicht.length === 0) return m.reply('✅ *Alle Mitglieder haben sich vorgestellt!*');

        const liste = nicht.map(u => `@${u.split('@')[0]}`).join('\n');
        await conn.sendMessage(groupId, {
            text: `*Noch nicht vorgestellt:*\n${liste}`,
            mentions: nicht
        });
    }
};

handler.help = ['vorstellung', 'nichtvorgestellt'];
handler.tags = ['group'];
handler.command = /^(vorstellung|nichtvorgestellt)$/i;
handler.group = true;

module.exports = handler;
