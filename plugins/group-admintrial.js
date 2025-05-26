let schedule = require('node-schedule');

let handler = async (m, { conn, args, command, participants }) => {
    if (!m.isGroup) throw '❌ Dieser Befehl funktioniert nur in Gruppen!';

    let target = m.mentionedJid ? m.mentionedJid[0] : args[0];
    if (!target) throw '❗ Bitte markiere einen Nutzer oder gib die Zielnummer ein!';
    let time = args[1];
    if (!time) throw '⏰ Bitte gib die Zeit an (z. B. 10s, 5m, 2h, 1d, oder 2024-12-31 23:59:59)!';

    let executeTime;
    if (/^\d+[smhd]$/.test(time)) {
        let value = parseInt(time);
        let unit = time.slice(-1);
        let multiplier = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
        executeTime = new Date(Date.now() + value * multiplier[unit]);
    } else if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(time)) {
        executeTime = new Date(time);
        if (isNaN(executeTime)) throw '⏰ Ungültiges Zeitformat!';
    } else {
        throw '⏳ Zeitformat ungültig! Nutze z. B. 10s, 5m, 2h, 1d oder 2024-12-31 23:59:59.';
    }

    let targetName = participants.find(p => p.id === target)?.id || target;
    let action, timerName;

    if (command === 'jadiadmin' || command === 'zumadmin') {
        await conn.groupParticipantsUpdate(m.chat, [target], 'promote');
        action = 'promote';
        timerName = 'unadmin';
    } else if (command === 'unadmin' || command === 'entferneadmin') {
        await conn.groupParticipantsUpdate(m.chat, [target], 'demote');
        action = 'demote';
        timerName = 'jadiadmin';
    } else if (command === 'kick' || command === 'entfernen') {
        await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
        action = 'kick';
    } else {
        throw '❌ Befehl nicht erkannt!';
    }

    const fancyMessage = `
🎉 *Aktion erfolgreich ausgeführt!* 🎉
👤 Ziel: @${target.split('@')[0]}
🕒 Geplante Dauer: ${time}
📅 Automatische Ausführung am: ${executeTime.toLocaleString()}

Bleib dran, ich kümmere mich darum! 😉
`.trim();

    m.reply(fancyMessage, null, { mentions: [target] });

    if (command !== 'kick' && command !== 'entfernen') {
        schedule.scheduleJob(executeTime, async () => {
            if (timerName === 'unadmin') {
                await conn.groupParticipantsUpdate(m.chat, [target], 'demote');
                conn.reply(m.chat, `🚨 *Update!* @${target.split('@')[0]} wurde automatisch *degradiert* (Zeit abgelaufen).`, null, { mentions: [target] });
            } else if (timerName === 'jadiadmin') {
                await conn.groupParticipantsUpdate(m.chat, [target], 'promote');
                conn.reply(m.chat, `🔥 *Update!* @${target.split('@')[0]} wurde automatisch wieder *zum Admin befördert* (Zeit abgelaufen).`, null, { mentions: [target] });
            }
        });
    }
};

handler.help = ['zumadmin @user <Zeit>', 'entferneadmin @user <Zeit>', 'entfernen @user <Zeit>'];
handler.command = /^(jadiadmin|unadmin|kick2|zumadmin|entferneadmin|entfernen)$/i;
handler.tags = ['group'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;
