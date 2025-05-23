const { sKata, cKata } = require('.././lib/sambung-Wort');

const spiel = `• *S A M B U N G - K A T A*

> Spiel Wort Bersambung ist Spiel das/der/die dimana jeder pemainnya diharuskan memerstellen Wort von Ende Wort das/der/die berasal von Wort vorher.
`.trim();

const rules = `• *R U L E S*
- Antwort merupakan Wort dasar
- Nein mengandung spasi
- Wort imbuhan (me-, -an, dll).

> Pemain das/der/die überleben wird
 gewinnen und erhalten
 500xp X Anzahl Spieler
- .skata für join
- .skata start für mestarten
`.trim();

let poin = 500;

let handler = async (m, { conn, text, isPrems, isROwner, usedPrefix, command }) => {
    let isDebug = /debug/i.test(command) && isROwner;
    //if (!isPrems) throw `Spiel dies in tahap pengemmbangan.. cooming soon`
    conn.skata = conn.skata ? conn.skata : {};
    // try {
    let id = m.chat;
    let Wort = await genKata();
    let room_all = Object.values(conn.skata).find(room => room.id !== id && room.player.includes(m.sender));
    if (room_all) throw `du gerade spielen sambung Wort in chat andere, fertigkan spiel du besonders erst`;
    if (id in conn.skata) {
        let room = conn.skata[id];
        let member = room.player;
        if (room.Status == 'play') {
            if (!room.Zeit._destroyed && !room.diam) return conn.reply(m.chat, `Hii @${m.sender.split`@`[0]}, Masih gibt spiel stattfinden in chat dies\nTunggu bis spiel enden\nLalu ikut bergabung`, room.chat, { contextInfo: { mentionedJid: member } }).catch(e => { return !1 }); // ketika naileys err
            delete conn.skata[id];
        }
        if (text == 'start' && room.Status == 'wait') {
            if (!member.includes(m.sender)) return m.reply('du noch nicht ikut');
            if (member.length < 2) throw `Minimal 2 person`;
            room.curr = member[0];
            room.Status = 'play';
            room.chat = await conn.reply(m.chat, `Saatnya @${member[0].split`@`[0]}\nStarten : *${(room.Wort).toUpperCase()}*\n*${room.filter(room.Wort).toUpperCase()}... ?*\n*Jawab mit mengetik langsung!*\n"nyerah" für menyerah\nTotal: ${member.length} Player`, m, { contextInfo: { mentionedJid: member } });
            room.win_point = 100;
            for (let i of room.player) {
                let user = db.data.users[i];
                if (!('skata' in user)) user.skata = 0;
            }
            clearTimeout(room.waktu_list);
            room.Zeit = setTimeout(() => {
                conn.reply(m.chat, `Zeit antworten verbraucht\n@${room.curr.split`@`[0]} tereliminasi`, room.chat, { contextInfo: { mentionedJid: member } }).then(_ => {
                    room.eliminated.push(room.curr);
                    let index = member.indexOf(room.curr);
                    member.splice(index, 1);
                    room.curr = member[0];
                    if (room.player.length == 1 && room.Status == 'play') {
                        db.data.users[member[0]].exp += room.win_point;
                        conn.reply(m.chat, `@${member[0].split`@`[0]} Gewinnen\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: member } }).then(_ => {
                            delete conn.skata[id];
                            return !0;
                        });
                    }
                    room.diam = true;
                    room.new = true;
                    let who = room.curr;
                    conn.preSudo('nextkata', who, m).then(async _ => {
                        conn.ev.emit('messages.upsert', _);
                    });
                });
            }, 45000);

        } else if (room.Status == 'wait') {
            if (member.includes(m.sender)) throw `du bereits ikut in list`;
            member.push(m.sender);
            clearTimeout(room.waktu_list);
            room.waktu_list = setTimeout(() => {
                conn.reply(m.chat, `Sambung Wort nicht distarten (Cancel)`, room.chat).then(() => { delete conn.skata[id] });
            }, 120000);
            let caption = `• *L I S T - P L A Y E R*
${member.map((v, i) => `- ${i + 1}. @${v.split`@`[0]}`).join('\n')}
Sambung Wort wird dimainkan sesuai urutan player ( *Bergiliran* )
Und nur kann dimainkan durch player das/der/die registriert`.trim();
            room.chat = await conn.reply(m.chat, `${caption}\n\nTippe\n*${usedPrefix + command}* für join/ikut\n*${usedPrefix + command} start* für mestarten`, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } });
        }
    } else {
        conn.skata[id] = {
            id,
            player: isDebug ? ([owner[0] + '@s.whatsapp.net', conn.user.jid, owner[0] + '@s.whatsapp.net']) : [],
            Status: 'wait',
            eliminated: [],
            basi: [],
            diam: false,
            win_point: 0,
            curr: '',
            Wort,
            filter,
            genKata,
            chat: conn.reply(m.chat, `${spiel}\n${rules}`, m),
            Zeit: false
        };
    }
    // } catch (e) {
    //  throw e
    // }
};

handler.help = ['sambungkata'];
handler.tags = ['spiel'];
handler.command = /^s(ambung)?Wort(debug)?$/i;
handler.group = true;

module.exports = handler;

async function genKata() {
    let json = await sKata();
    let result = json.Wort;
    while (result.length < 3 || result.length > 7) {
        json = await sKata();
        result = json.Wort;
    }
    return result;
}

function filter(text) {
    let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
    let misah;
    if (text.length < 3) return text;
    // alarm
    if (/([qwrtypsdfghjklzxcvbnm][qwrtypsdfhjklzxcvbnm])$/.test(text)) {
        let mid = /([qwrtypsdfhjklzxcvbnm])$/.exec(text)[0];
        return mid;
    }

    // mati + voc + ng {kijang, pisang, dalang, dll}

    if (/([qwrtypsdfghjklzxcvbnm][aiueo]ng)$/.test(text)) {
        let mid = /([qwrtypsdfghjklzxcvbnm][aiueo]ng)$/.exec(text)[0];
        return mid;
    }
    // voc2x + mati(optional) {portofolio, manusia, tiup, dll}
    else if (/([aiueo][aiueo]([qwrtypsdfghjklzxcvbnm]|ng)?)$/i.test(text)) {
        if (/(ng)$/i.test(text)) return text.substring(text.length - 3); // ex tiang, riang, siang
        else if (/([qwrtypsdfghjklzxcvbnm])$/i.test(text)) return text.substring(text.length - 2);
        else return text.substring(text.length - 1);
    }
    // ng/ny + voc + mati { sinyal, langit, banyak, dll}
    else if (/n[gy]([aiueo]([qwrtypsdfghjklzxcvbnm])?)$/.test(text)) {
        let nyenye = /n[gy]/i.exec(text)[0];
        misah = text.split(nyenye);
        return nyenye + misah[misah.length - 1];
    }
    // mati { kuku, batu, du, ich, ich, dll}
    else {
        let res = Array.from(text).filter(v => mati.includes(v));
        let resu = res[res.length - 1];
        for (let huruf of mati) {
            if (text.endsWith(huruf)) {
                resu = res[res.length - 2];
            }
        }
        misah = text.split(resu);
        if (text.endsWith(resu)) {
            return resu + misah[misah.length - 2] + resu;
        }
        return resu + misah[misah.length - 1];
    }
}