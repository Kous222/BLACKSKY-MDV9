// Thanks To Kasan

const util = require('util');

let handler = m => m
handler.before = async function (m) {
try {
let id = m.sender;
let timeout = 180000;
let reward = randomInt(100, 800);
let users = global.db.data.users[m.sender];
let body = (typeof m.text == 'string' ? m.text : '');
conn.bomb = conn.bomb ? conn.bomb : {};

let isSurrender = /^(suren|aufgeben)$/i.test(body);
if (isSurrender) {
await conn.reply(m.chat, `🚩 Aufgegeben`, m);
clearTimeout(conn.bomb[id][2]);
delete conn.bomb[id];
}

if ((id in conn.bomb) && !isNaN(body)) {
let json = conn.bomb[id][1].find(v => v.position == body);
if (!json) return conn.reply(m.chat, `🚩 Um ein field zu öffnen, sende eine Zahl von 1 - 9`, m);

if (json.emot == '💥') {
json.state = true;
let bomb = conn.bomb[id][1];
let teks = `乂  *B O M B*\n\n`;
teks += bomb.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
teks += bomb.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
teks += bomb.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
teks += `Zeitlimit: [ *${((timeout / 1000) / 60)} Minuten* ]\n`;
teks += `*Spiel beendet!* field mit der Bombe geöffnet: (- *${formatNumber(reward)}*)`;

conn.reply(m.chat, teks, m).then(() => {
users.exp < reward ? users.exp = 0 : users.exp -= reward;
clearTimeout(conn.bomb[id][2]);
delete conn.bomb[id];
});
} else if (json.state) {
return conn.reply(m.chat, `🚩 field ${json.number} wurde bereits geöffnet. Bitte wähle ein anderes field.`, m);
} else {
json.state = true;
let changes = conn.bomb[id][1];
let open = changes.filter(v => v.state && v.emot != '💥').length;

if (open >= 8) {
let teks = `乂  *B O M B*\n\n`;
teks += `Sende eine Zahl von *1* - *9*, um eines der *9* nummerierten Felder unten zu öffnen:\n\n`;
teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
teks += `Zeitlimit: [ *${((timeout / 1000) / 60)} Minuten* ]\n`;
teks += `*Spiel beendet!* Das field mit der Bombe wurde nicht geöffnet: (+ *${formatNumber(reward)}*)`;

conn.reply(m.chat, teks, m).then(() => {
users.exp += reward;
clearTimeout(conn.bomb[id][2]);
delete conn.bomb[id];
});
} else {
let teks = `乂  *B O M B*\n\n`;
teks += `Sende eine Zahl von *1* - *9*, um eines der *9* nummerierten Felder unten zu öffnen:\n\n`;
teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
teks += `Zeitlimit: [ *${((timeout / 1000) / 60)} Minuten* ]\n`;
teks += `Das field mit der Bombe wurde nicht geöffnet: (+ *${formatNumber(reward)}*)`;
conn.reply(m.chat, teks, m).then(() => {
users.exp += reward;
});
}
}
}
} catch (e) {
return conn.reply(m.chat, util.format(e), m);
}
return !0;
}

handler.exp = 0

function randomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(number) {
return number.toLocaleString();
}

module.exports = handler
