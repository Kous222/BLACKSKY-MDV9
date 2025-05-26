let handler = async (m, { conn, participants, isBotAdmin, isAdmin }) => {
    if (!m.isGroup) throw '🚨 *Dieser Befehl funktioniert nur in Gruppen!*';
    if (!isAdmin) throw '🚨 *Nur Gruppen-Admins dürfen diesen Befehl ausführen!*';
    if (!isBotAdmin) throw '🚨 *Ich bin kein Admin! Bitte gib mir Admin-Rechte.*';

    let kicked = [];
    let failed = [];

    for (const user of participants) {
        const jid = user.id;
        if (jid === m.sender || jid === conn.user.jid || user.admin) continue;

        try {
            await conn.groupParticipantsUpdate(m.chat, [jid], 'remove');
            kicked.push(jid);
        } catch (e) {
            failed.push(jid);
        }
    }

    let summary = `
🔥 *KICK-ALL Ergebnisse* 🔥

👤 *Mitglieder gescannt:* ${participants.length}
✅ *Erfolgreich entfernt:* ${kicked.length}
❌ *Fehlgeschlagen:* ${failed.length}

${kicked.length ? '🚀 Erfolgreich gekickt:\n' + kicked.map(j => `- @${j.split('@')[0]}`).join('\n') : ''}
${failed.length ? '\n⚠️ Konnte nicht gekickt werden:\n' + failed.map(j => `- @${j.split('@')[0]}`).join('\n') : ''}

💬 *Aktion durchgeführt von:* @${m.sender.split('@')[0]}
🛡️ *Status:* Kick-All abgeschlossen!
`.trim();

    m.reply(summary, null, { mentions: [...kicked, ...failed, m.sender] });
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = /^kickall$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;