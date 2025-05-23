let moment = require('moment-timezone');
let schedule = require('node-schedule');

const timeZone = 'Europe/Berlin';

let handler = async (m, { conn, command, args, isOwner, isAdmin }) => {
    let chat = global.db.data.chats[m.chat];
    if (!m.isGroup) throw 'Dieser Befehl kann nur in einer Gruppe benutzt werden!';
    if (!(isAdmin || isOwner)) throw 'Dieser Befehl kann nur vom Gruppenadmin benutzt werden!';

    if (command === 'alarmsahur') {
        if (args.length < 3) throw 'Falsches Format! Verwenden Sie .alarmsahur stunde|minute|nachricht\nBeispiel: .alarmsahur 5|12|Aufwachen, Zeit zum Frühstück';
        let [time, minute, ...messageParts] = args.join(' ').split('|');
        let message = messageParts.join('|').trim();
        let alarmTime = Number(time);
        let alarmMinute = Number(minute);
        if (isNaN(alarmTime) || isNaN(alarmMinute)) throw 'Die Zeit muss eine Zahl sein!';
        chat.alarm = { time: `${alarmTime}:${alarmMinute}`, message, lastSent: null };
        m.reply(`Alarm aktiviert. Die Gruppe wird die Nachricht "${message}" um ${alarmTime}:${alarmMinute} Uhr erhalten.`);
    } else if (command === 'deletealarmsahur') {
        delete chat.alarm;
        m.reply('Alarm deaktiviert.');
    } else if (command === 'bearbeitenalarmsahur') {
        if (args.length < 3) throw 'Falsches Format! Verwenden Sie .bearbeitenalarmsahur stunde|minute|nachricht\nBeispiel: .bearbeitenalarmsahur 5|12|Aufwachen, Zeit zum Frühstück';
        let [time, minute, ...messageParts] = args.join(' ').split('|');
        let message = messageParts.join('|').trim();
        let alarmTime = Number(time);
        let alarmMinute = Number(minute);
        if (isNaN(alarmTime) || isNaN(alarmMinute)) throw 'Die Zeit muss eine Zahl sein!';
        chat.alarm = { time: `${alarmTime}:${alarmMinute}`, message, lastSent: null };
        m.reply(`Alarm geändert. Die Gruppe wird die Nachricht "${message}" um ${alarmTime}:${alarmMinute} Uhr erhalten.`);
    }
};

handler.command = /^(alarmsahur|deletealarmsahur|bearbeitenalarmsahur)$/i;
handler.help = ['alarmsahur stunde|minute|nachricht', 'deletealarmsahur', 'bearbeitenalarmsahur stunde|minute|nachricht'];
handler.tags = ['gruppe'];
handler.admin = true;
handler.group = true;

module.exports = handler;

const checkAlarmStatus = async (conn) => {
    const now = moment().tz(timeZone);
    const currentTime = now.format('HH:mm');
    const currentDate = now.format('YYYY-MM-DD');

    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (!chat.alarm) continue;

        const { time, message, lastSent } = chat.alarm;

        if (currentTime === time && lastSent !== currentDate) {
            await sendAlarmHidetag(conn, chatId, message);
            chat.alarm.lastSent = currentDate;
        }
    }
};

const sendAlarmHidetag = async (conn, chatId, text) => {
    const groupMetadata = await conn.groupMetadata(chatId);
    const participants = groupMetadata.participants.map((p) => p.id);

    const fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "Status@broadcast",
            "fromMe": false,
            "id": "hallo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Bot\nitem1.TEL;waid=0:0\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    };

    await conn.sendMessage(
        chatId,
        { text, mentions: participants },
        { quoted: fkontak } 
    );
};

schedule.scheduleJob('* * * * *', () => {
    checkAlarmStatus(conn);
});
