const delay = (time) => new Promise((res) => setTimeout(res, time));

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports.before = async function (m) {
    this.judipvp = this.judipvp ? this.judipvp : {};
    let room = Object.values(this.judipvp).find(room => room.id.startsWith('judipvp') && room.Status && [room.p, room.p2].includes(m.sender));
    let user = db.data.users;
    let score = Math.ceil(Math.random() * 100) * 1;
    let score2 = Math.ceil(Math.random() * 100) * 1;

    if (room) {
        if (m.sender === room.p2 && /y(a|es)?/i.test(m.text.toLowerCase()) && m.isGroup && room.Status === 'wait') {
            if (/n(o)?|nicht/i.test(m.text.toLowerCase())) {
                this.reply(m.chat, `@${room.p2.split`@`[0]} ablehnen judipvp, judipvp diabbrechenkan`, m, { contextInfo: { mentionedJid: [room.p2] } });
                delete this.judipvp[room.id];
            }
            if (user[room.p2][room.type] < room.taruhan) return m.reply(`Geld du Weniger! du brauchen ${room.taruhan} ${room.type}`);
            if (user[room.p][room.type] < room.taruhan) return m.reply(`Geld Lawanmu Weniger! brauchen ${room.taruhan} ${room.type}`);
            clearTimeout(room.zeit);
            room.Status = 'spin';
            room.ursprünglich = m.chat;
            room.spin = room.p;
            await this.reply(room.ursprünglich, `Bitte Spin @${room.p.split('@')[0]}\n\nSpin mit Art ketik *Spin/Judi*`, m, { contextInfo: { mentionedJid: [room.p] } });
            room.zeit = setTimeout(() => {
                this.reply(m.chat, `Zeit abgelaufen @${room.spin.split('@')[0]} Nein antworten`, m, { contextInfo: { mentionedJid: [room.spin] } });
                delete this.judipvp[room.id];
            }, 60000);
        } else if (room.Status === 'spin' && /spin|judi/i.test(m.text)) {
            if (m.sender !== room.spin) return m.reply('Jetzt nicht giliran du');
            if (user[room.spin][room.type] < room.taruhan) return m.reply(`Geld du Weniger! du brauchen ${room.taruhan} ${room.type}`);
            if (user[room.p2][room.type] < room.taruhan) return m.reply(`Geld Lawanmu Weniger! brauchen ${room.taruhan} ${room.type}`);
            clearTimeout(room.zeit);
            room.score = score;
            room.Status = 'spinp';
            room.spin = room.p2;
            room.zeit = setTimeout(() => {
                this.reply(m.chat, `Zeit abgelaufen @${room.spin.split('@')[0]} Nein antworten`, m, { contextInfo: { mentionedJid: [room.spin] } });
                delete this.judipvp[room.id];
            }, 60000);
            this.reply(room.ursprünglich, `@${m.sender.split('@')[0]} erfolgreich erhalten score ${score}\nJetzt giliran @${room.p2.split('@')[0]} für spin\n\nBitte ketik *Spin/Judi* für spin`, m, { contextInfo: { mentionedJid: [room.p, room.p2] } });
        } else if (room.Status === 'spinp' && /spin|judi/i.test(m.text)) {
            if (m.sender !== room.spin) return m.reply(room.ursprünglich, 'Jetzt nicht giliranmu!', m);
            if (user[room.spin][room.type] < room.taruhan) return m.reply(`Geld du Weniger! du brauchen ${room.taruhan} ${room.type}`);
            if (user[room.p][room.type] < room.taruhan) return m.reply(`Geld Lawanmu Weniger! brauchen ${room.taruhan} ${room.type}`);
            clearTimeout(room.zeit);
            if (room.score < score2) {
                user[room.p2][room.type] += room.taruhan * 1;
                user[room.p][room.type] -= room.taruhan * 1;
                room.win = room.p2;
            } else if (room.score > score2) {
                user[room.p2][room.type] -= room.taruhan * 1;
                user[room.p][room.type] += room.taruhan * 1;
                room.win = room.p;
            } else {
                room.win = 'draw';
            }
            this.reply(room.ursprünglich, `
| *PLAYERS* | *POINT* |
*👤 @${room.p.split('@')[0]} :*      ${room.score}
*👤 @${room.p2.split('@')[0]} :*    ${score2}

${room.win !== 'draw' ? `Pemenangnya ist @${room.win.split('@')[0]} Und erhalten ${room.taruhan * 1} ${room.type}` : `Draw Masing Masing erhalten ${room.taruhan} ${room.type}`}
`.trim(), m, { contextInfo: { mentionedJid: [room.p, room.p2] } });
            delete this.judipvp[room.id];
        }
        return true;
    }
    return true;
};