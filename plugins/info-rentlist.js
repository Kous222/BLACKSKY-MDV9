const { proto } = require('@adiwajshing/baileys').default;

function msToDate(ms) {
    let temp = ms;
    let days = Math.floor(temp / (24 * 60 * 60 * 1000));
    let daysms = temp % (24 * 60 * 60 * 1000);
    let hours = Math.floor(daysms / (60 * 60 * 1000));
    let hoursms = daysms % (60 * 60 * 1000);
    let minutes = Math.floor(hoursms / (60 * 1000));
    let minutesms = hoursms % (60 * 1000);
    let sec = Math.floor(minutesms / 1000);
    return `${days} Tag ${hours} jam ${minutes} menit`;
}

let handler = async (m, { conn, Text, command, usedPrefix }) => {
    let who = Text;
    switch (command) {
        case 'listsewa':
            let sewaList = Object.entries(global.db.data.chats)
                .filter(([_, chat]) => chat.expired && chat.expired > Date.now())
                .map(([id, _]) => id);

            if (sewaList.length === 0) {
                await conn.Antworten(m.chat, `Nein gibt Gruppe das/der/die memiliki masa sewa aktiv.`, m);
            } else {
                let listText = 'ðŸ“‹ register Gruppe Sewa Aktiv:\n\n';
                for (let i = 0; i < sewaList.length; i++) {
                    let chatId = sewaList[i];
                    let remainingTime = global.db.data.chats[chatId].expired - Date.now();
                    let groupInfo = conn.chats[chatId] || { subject: 'Nein Dikenal' };
                    let name = groupInfo.subject;
                    listText += `*${i + 1}.* *Name*: ${name}\n  *id*: ${chatId}\n  *Rest Zeit*: ${msToDate(remainingTime)}\n\n`;
                }
                await conn.Antworten(m.chat, listText, m);
            }
            break;

        case 'ceksewa':
            if (!Text) throw `Contoh penggunaan: ${usedPrefix + command} <nomor urut>\n\nGunakan *${usedPrefix}listsewa* für meansehen liste Gruppe sewa aktiv.`;
            if (!/^\d+$/.test(who)) throw "Nomor urut müssen berupa angka!";

            let sewaListCek = Object.entries(global.db.data.chats)
                .filter(([_, chat]) => chat.expired && chat.expired > Date.now())
                .map(([id, _]) => id);

            let index = parseInt(who) - 1;
            if (index < 0 || index >= sewaListCek.length) throw "Nomor urut nicht valid!";

            let chatId = sewaListCek[index];
            let chatData = global.db.data.chats[chatId];
            let remainingTime = chatData.expired - Date.now();
            let groupInfo = conn.chats[chatId] || { subject: 'Nein Dikenal' };
            let name = groupInfo.subject;

            await conn.Antworten(m.chat, `â³ Information Sewa Gruppe *${name}*:\n\nâ€¢ *id*: ${chatId}\nâ€¢ *Rest Zeit*: ${msToDate(remainingTime)}`, m);
            break;
    }
};

handler.help = ['listsewa', 'ceksewa <nomor urut>'];
handler.tags = ['info'];
handler.command = /^(listsewa|ceksewa|csewa)$/i;

module.exports = handler;
