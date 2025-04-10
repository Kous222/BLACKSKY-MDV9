let fetch = require('node-fetch');
let fs = require('fs');

let timeout = 3600000 // 1 jam in miliSekunden

let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
  
    let u = global.db.data.users[m.sender];
    let time = u.lastclaim + 3600000; // 1 jam in miliSekunden
    if (new Date - u.lastclaim < 3600000) throw `*bereits durchführen suche Airdrop!* 🪙\nHarus warten während damit kann suchen Airdrop zurück während ${clockString(time - new Date())}`;
    let ich = `${Math.floor(Math.random() * 101)}`.trim();
    let du = `${Math.floor(Math.random() * 81)}`.trim(); 
    let A = (ich * 1);
    let K = (du * 1);

    if (A > K) {
      let _müll = Array.from({length: 50}, (_, i) => (i + 1).toString());
      let müll = _müll[Math.floor(Math.random() * _müll.length)];
      let kayu = _müll[Math.floor(Math.random() * _müll.length)];
      let batu = _müll[Math.floor(Math.random() * _müll.length)];
      conn.sendFile(m.chat, 'https://telegra.ph/file/60437ce6d807b605adf5e.jpg', 'zonk.jpg', `*Airdrop Ampas!* Ternyata isinya nicht sesuai ekspektasi\n\n*Rewards*\n• *Müll:* ${müll}\n• *Kayu:* ${kayu}\n• *Batu:* ${batu}`, m);
      u.müll += parseInt(müll);
      u.kayu += parseInt(kayu);
      u.batu += parseInt(batu);
      u.lastclaim = new Date * 1;
    } else if (A < K) {
      let _limit = ['10', '20', '30'];
      let limit = _limit[Math.floor(Math.random() * _limit.length)];
      let _Münzen = ['10000', '100000', '500000'];
      let Münzen = _Münzen[Math.floor(Math.random() * _Münzen.length)];
      let _point = ['10000', '100000', '500000'];
      let point = _point[Math.floor(Math.random() * _point.length)];
      conn.sendFile(m.chat, 'https://telegra.ph/file/d3bc1d7a97c62d3baaf73.jpg', 'rare.jpg', `*Airdrop Rare!*, du erhalten Kotak Airdrop *Rare*\n\nSelamat du erhalten *Rewards*\n• *Limit:* ${limit}\n• *Money:* ${Münzen}\n• *Point:* ${point}`, m);
      u.limit += parseInt(limit);
      u.Münzen += parseInt(Münzen);
      u.poin += parseInt(point);
      u.lastclaim = new Date * 1;
    } else {
      conn.sendFile(m.chat, 'https://telegra.ph/file/5d71027ecbcf771b299fb.jpg', 'zonk.jpg', `*Airdrop Zonks!*, du erhalten Kotak Airdrop *Zonk (Kosong)*\n\nSelamat du erhalten *Rewards*\n• *Money:* -1.000.000\n• *Inhalt:* Angin`, m);
      u.Münzen -= 1000000;
      u.lastclaim = new Date * 1;
    }

    /*setTimeout(() => {
      conn.reply(m.chat, `Waktunya jagen *Airdrop!*`, m);
    }, timeout);*/
};

handler.help = ['airdrop'];
handler.tags = ['rpg'];
handler.command = /^(airdrop)$/i;
handler.group = true;
handler.rpg = true
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