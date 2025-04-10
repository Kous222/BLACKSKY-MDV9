/*
*GRUPPENALARM*
Erstellt von Dana Putra | Betabotz | Aqua Bot
Diese Wassermarke darf frei gelöscht werden, Sie dürfen auch lernen, wie der Code arbeitet. Viel Spaß beim Programmieren!:)
Vergessen Sie nicht, dem Admin auf GitHub zu folgen = danaputra133
*/

let moment = require('moment-timezone');
let schedule = require('node-schedule');

const timeZone = 'Europe/Berlin';


const groupChats = [
    'id GC 1 @g.us',
    'id GC 2 @g.us',  //kann ID aus "=> m" in der Gruppenkonversation sein
];

// Alarmzeit für jede Gruppe
const alarmTimes = {
    'id GC 1 @g.us': ['22:10', '00:23', '00:40', '06:00'],
    'id GC 2 @g.us': ['22:11', '06:01', '00:40'],
};


const sendAlarmHidetag = async (conn, chatId, text) => {
    const groupMetadata = await conn.groupMetadata(chatId);
    const participants = groupMetadata.participants.map((p) => p.id);

//Dies erstellt einen Hidetag
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

const checkAlarmStatus = async (conn) => {
    const currentTime = moment().tz(timeZone).format('HH:mm');

    for (const chatId of groupChats) {
        if (alarmTimes[chatId]) {
            for (const time of alarmTimes[chatId]) {
                if (currentTime === time) {
                    const alarmMessage = `⏰ *GRUPPENALARM!*\n\n🚨Bitte Berichte überprüfen!`; //Wörter geändert :)
                    await sendAlarmHidetag(conn, chatId, alarmMessage);
                }
            }
        }
    }
};


schedule.scheduleJob('* * * * *', () => {
    checkAlarmStatus(conn);
});
