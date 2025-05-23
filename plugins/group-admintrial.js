/*
*<>BEFÖRDERE ZU ADMIN & ENTFERNE VON ADMIN FUNKTIONEN MIT ZEITSTEUERUNG:
Bei Ablauf der Zeit wird der zum Admin beförderte Nutzer automatisch degradiert,
und umgekehrt wird der degradierte Nutzer automatisch wieder zum Admin befördert, 
entsprechend der angegebenen Zeit!<>*
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
ENTFERNEN DES WM FÜHRT ZU RESSOURCENVERLUST
*WENN DU DIESE FUNKTION KONVERTIERST, BITTE ENTFERNE NICHT DAS WASSERZEICHEN!*
"Ich verspreche, dieses WM nicht zu löschen"
DONNERSTAG, 28. NOVEMBER 2024 09:35
*/
let schedule = require ('node-schedule')
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
let handler = async (m, { conn, args, command, participants }) => {
    if (!m.isGroup) throw 'Dieser Befehl kann nur in Gruppen verwendet werden!';

    //wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    let target = m.mentionedJid ? m.mentionedJid[0] : args[0];
    if (!target) throw 'Markiere einen Nutzer oder gib die Zielnummer ein!';
    let time = args[1];
    if (!time) throw 'Gib die Zeit im richtigen Format an! (Beispiel: 10s, 5m, 2h, 1d, oder 2024-12-31 23:59:59)';

    //wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    let executeTime;
    if (/^\d+[smhd]$/.test(time)) {
        
        let value = parseInt(time);
        let unit = time.slice(-1);
        let multiplier = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
        executeTime = new Date(Date.now() + value * multiplier[unit]);
    } else if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(time)) {
        
        executeTime = new Date(time);
        if (isNaN(executeTime)) throw 'Zeitformat ungültig!';
    } else {
        throw 'Zeitformat ungültig! Verwende ein Format wie 10s, 5m, 2h, 1d, oder 2024-12-31 23:59:59';
    }
   //wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    let targetName = participants.find(p => p.id === target)?.id || target;
    let action;
    let timerName;

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
        throw 'Befehl nicht erkannt!';
    }

    m.reply(`Befehl "${command}" erfolgreich ausgeführt. Ziel: @${target.split('@')[0]}\nDauer: ${time}.\nDer Befehl wird am ${executeTime.toLocaleString()} ausgeführt.`, null, {
        mentions: [target],
    });

    //wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    if (command !== 'kick' && command !== 'entfernen') {
        schedule.scheduleJob(executeTime, async () => {
            if (timerName === 'unadmin') {
                await conn.groupParticipantsUpdate(m.chat, [target], 'demote');
                m.reply(`Ziel @${target.split('@')[0]} wurde degradiert, da die Zeit abgelaufen ist.`, null, { mentions: [target] });
            } else if (timerName === 'jadiadmin') {
                await conn.groupParticipantsUpdate(m.chat, [target], 'promote');
                m.reply(`Ziel @${target.split('@')[0]} wurde wieder zum Admin befördert, da die Zeit abgelaufen ist.`, null, { mentions: [target] });
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
/*
*<>BEFÖRDERE ZU ADMIN & ENTFERNE VON ADMIN FUNKTIONEN MIT ZEITSTEUERUNG:
Bei Ablauf der Zeit wird der zum Admin beförderte Nutzer automatisch degradiert,
und umgekehrt wird der degradierte Nutzer automatisch wieder zum Admin befördert, 
entsprechend der angegebenen Zeit!<>*
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
ENTFERNEN DES WM FÜHRT ZU RESSOURCENVERLUST
*WENN DU DIESE FUNKTION KONVERTIERST, BITTE ENTFERNE NICHT DAS WASSERZEICHEN!*
"Ich verspreche, dieses WM nicht zu löschen"
DONNERSTAG, 28. NOVEMBER 2024 09:35
*/