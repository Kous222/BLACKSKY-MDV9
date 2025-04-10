let moment = require('moment-timezone');
let schedule = require('node-schedule');

const timeZone = 'Asia/Jakarta';

let handler = async (m, { conn, command, args, isOwner, isAdmin }) => {
    let chat = global.db.data.chats[m.chat];
    if (!m.isGroup) throw 'Dieser Befehl kann nur in Gruppen verwendet werden!';
    if (!(isAdmin || isOwner)) throw 'Dieser Befehl kann nur von Gruppenadministratoren verwendet werden!';

    if (command === 'aktivieren' && args[0] === 'autogc') {
        if (args.length < 2) throw 'Falsches Format! Verwende .aktivieren autogc Schließzeit|Öffnungszeit\nBeispiel: .aktivieren autogc 21|5';
        let [closeTime, openTime] = args[1].split('|').map(Number);
        if (isNaN(closeTime) || isNaN(openTime)) throw 'Die Schließ- und Öffnungszeiten müssen Zahlen sein!';
        chat.autoGc = { closeTime, openTime };
        m.reply(`Automatisches Gruppenöffnen/-schließen aktiviert. Die Gruppe wird um ${closeTime}:00 Uhr geschlossen und um ${openTime}:00 Uhr geöffnet.`);
    } else if (command === 'deaktivieren' && args[0] === 'autogc') {
        delete chat.autoGc;
        m.reply('Automatisches Gruppenöffnen/-schließen deaktiviert.');
    }
};

handler.command = /^(aktiv|mati|aktivieren|deaktivieren)$/i;
handler.help = ['aktivieren autogc Schließzeit|Öffnungszeit', 'deaktivieren autogc'];
handler.tags = ['group'];
handler.admin = true;
handler.group = true;

module.exports = handler;

const checkGroupsStatus = async (conn) => {
    const currentTime = moment().tz(timeZone).format('HH:mm');

    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (!chat.autoGc) continue;

        const { closeTime, openTime } = chat.autoGc;
        const currentHour = moment().tz(timeZone).hour();

        if (currentHour === closeTime && chat.groupStatus !== 'closed') {
            await conn.groupSettingUpdate(chatId, 'announcement');
            await conn.sendMessage(chatId, { text: `(AUTOMATISCH) 𝖦𝖱𝖴𝖯𝖯𝖤 𝖦𝖤𝖲𝖢𝖧𝖫𝖮𝖲𝖲𝖤𝖭, 𝖶𝖨𝖱𝖣 𝖴𝖬 ${openTime}:00 𝖴𝖧𝖱 𝖦𝖤Ö𝖥𝖥𝖭𝖤𝖳` });
            chat.groupStatus = 'closed';
        }

        if (currentHour === openTime && chat.groupStatus !== 'opened') {
            await conn.groupSettingUpdate(chatId, 'not_announcement');
            await conn.sendMessage(chatId, { text: `(AUTOMATISCH) 𝖦𝖱𝖴𝖯𝖯𝖤 𝖦𝖤Ö𝖥𝖥𝖭𝖤𝖳, 𝖶𝖨𝖱𝖣 𝖴𝖬 ${closeTime}:00 𝖴𝖧𝖱 𝖦𝖤𝖲𝖢𝖧𝖫𝖮𝖲𝖲𝖤𝖭` });
            chat.groupStatus = 'opened';
        }
    }
};

schedule.scheduleJob('* * * * *', () => {
    checkGroupsStatus(conn);
});