let fetch = require('node-fetch');
let fs = require('fs');

let timeout = 3600000 // 1 Stunde in Millisekunden

let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    let u = global.db.data.users[m.sender];
    let time = u.lastclaim + 3600000;
    if (new Date - u.lastclaim < 3600000) 
        throw `*Du hast bereits nach einem Airdrop gesucht!* 🪙\nBitte warte noch ${clockString(time - new Date())}, bevor du es erneut versuchen kannst.`;

    let ich = `${Math.floor(Math.random() * 101)}`.trim();
    let du = `${Math.floor(Math.random() * 81)}`.trim(); 
    let A = parseInt(ich);
    let K = parseInt(du);

    if (A > K) {
        let _müll = Array.from({length: 50}, (_, i) => (i + 1).toString());
        let müll = _müll[Math.floor(Math.random() * _müll.length)];
        let holz = _müll[Math.floor(Math.random() * _müll.length)];
        let stein = _müll[Math.floor(Math.random() * _müll.length)];
        conn.sendFile(m.chat, 'https://telegra.ph/file/60437ce6d807b605adf5e.jpg', 'zonk.jpg', `*Airdrop Abfall!* Der Inhalt war enttäuschend...\n\n*Belohnungen:*\n• *Müll:* ${müll}\n• *Holz:* ${holz}\n• *Stein:* ${stein}`, m);
        u.müll += parseInt(müll);
        u.kayu += parseInt(holz);
        u.batu += parseInt(stein);
        u.lastclaim = new Date * 1;
    } else if (A < K) {
        let _limit = ['10', '20', '30'];
        let limit = _limit[Math.floor(Math.random() * _limit.length)];
        let _münzen = ['10000', '100000', '500000'];
        let münzen = _münzen[Math.floor(Math.random() * _münzen.length)];
        let _punkte = ['10000', '100000', '500000'];
        let punkte = _punkte[Math.floor(Math.random() * _punkte.length)];
        conn.sendFile(m.chat, 'https://telegra.ph/file/d3bc1d7a97c62d3baaf73.jpg', 'rare.jpg', `*Seltener Airdrop!* Du hast eine seltene Airdrop-Kiste erhalten!\n\n*Belohnungen:*\n• *Limit:* ${limit}\n• *Münzen:* ${münzen}\n• *Punkte:* ${punkte}`, m);
        u.limit += parseInt(limit);
        u.Münzen += parseInt(münzen);
        u.poin += parseInt(punkte);
        u.lastclaim = new Date * 1;
    } else {
        conn.sendFile(m.chat, 'https://telegra.ph/file/5d71027ecbcf771b299fb.jpg', 'zonk.jpg', `*Zonk Airdrop!* Deine Kiste war leer...\n\n*Belohnungen:*\n• *Münzen:* -1.000.000\n• *Inhalt:* Luft`, m);
        u.Münzen -= 1000000;
        u.lastclaim = new Date * 1;
    }

    /*setTimeout(() => {
        conn.reply(m.chat, `Zeit für eine neue *Airdrop*-Suche!`, m);
    }, timeout);*/
};

handler.help = ['airdrop'];
handler.tags = ['rpg'];
handler.command = /^(airdrop)$/i;
handler.group = true;
handler.rpg = true;
module.exports = handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n*' + d + '* _Tage_ ☀️\n ', '*' + h + '* _Stunden_ 🕐\n ', '*' + m + '* _Minuten_ ⏰\n ', '*' + s + '* _Sekunden_ ⏱️ '].map(v => v.toString().padStart(2, 0)).join('');
}
