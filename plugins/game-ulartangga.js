/* TITENI NEK DIHAPUS
* BY NAAAZZZ
* NANDA
* JOIN SL COMMUNITY 
*/
const { drawBoard } = require('../lib/ular_tangga.js');

const getRandom = function (array) {
                        return array[Math.floor(Math.random() * array.length)]
                        }

    let data = [{
        map: "https://telegra.ph/file/46a0c38104f79cdbfe83f.jpg", 
            nazz: { 2:38, 7:14, 8:31, 15:26, 21:42, 28:84, 36:44, 51:67, 78:98, 71:91, 87:94, 16:6, 46:25, 49:11, 62:19, 64:60, 74:53, 89:68, 92:88, 95:75, 99:80 }, 
                name: "Classic", 
                stabil_x: 20,
                stabil_y: 20
        },
{
                map: "https://telegra.ph/file/46a0c38104f79cdbfe83f.jpg", 
                nazz: { 2:38, 7:14, 8:31, 15:26, 21:42, 28:84, 36:44, 51:67, 78:98, 71:91, 87:94, 16:6, 46:25, 49:11, 62:19, 64:60, 74:53, 89:68, 92:88, 95:75, 99:80 }, 
                name: "Classic 2",
                stabil_x: 20,
                stabil_y: 20
        }]

let handler = async (m, { conn, text, command }) => {
        conn.ulartangga = conn.ulartangga ? conn.ulartangga : {};
    const ut = conn.ulartangga;
    const nazz_cmd = {
        create: () => {
            if(ut[m.chat]) throw "Es gibt bereits eine Spielsitzung in diesem Chat!";
            let anu = getRandom(data) 
            ut[m.chat] = { date: Date.now(), Status: 'WAITING', host: m.sender, players: {}, map: anu.map, map_name: anu.name, schlangen_leitern: anu.nazz, stabil_x: anu.stabil_x, stabil_y: anu.stabil_y};
            ut[m.chat].players[m.sender] = { rank: 'HOST', schritte: 1 };
            return m.reply(`Erfolgreich einen Raum für Schlangen und Leitern mit ID "${m.chat}" erstellt`);
        },
        join: () => {
            if(!ut[m.chat]) throw "Es gibt keine Spielsitzung in diesem Chat!";
            if(ut[m.chat].players[m.sender]) return conn.sendMessage(m.chat, { text: `Sie sind bereits dem Raum von @${ut[m.chat].host.split("@")[0]} beigetreten`, mentions: [ut[m.chat].host] }, { quoted: m }) 
            if(Object.keys(ut[m.chat].players).length >= 4) throw "Spieleranzahl hat das Limit überschritten!";
            if(ut[m.chat].Status === 'PLAYING') throw "Spiel läuft bereits, Sie können nicht mehr beitreten";
            ut[m.chat].players[m.sender] = { rank: 'MEMBER', schritte: 1 };
            return conn.sendMessage(m.chat, { text: `Erfolgreich dem Raum von @${ut[m.chat].host.split("@")[0]} beigetreten`, mentions: [ut[m.chat].host] }, { quoted: m }) 
        },
        delete: () => {
            if(!ut[m.chat]) throw "Es gibt keine Spielsitzung in diesem Chat!";
            if((ut[m.chat].host !== m.sender) && ((Date.now() - ut[m.chat].date) < 300000)) throw "Sie können die Spielsitzung nicht löschen, weil Sie nicht der Host sind. Sie können die Sitzung nach "+timeToFixed(300000 - (Date.now() - ut[m.chat].date))+" löschen."
            if((ut[m.chat].host !== m.sender) && (ut[m.chat].Status === 'PLAYING') && ((Date.now() - ut[m.chat].date) < 1000000)) throw "Sie können die Spielsitzung nicht löschen, weil Sie nicht der Host sind und das Spiel gerade läuft. Sie können die Sitzung nach "+timeToFixed(1000000 - (Date.now() - ut[m.chat].date))+" löschen."
            delete ut[m.chat];
           m.reply(`Spielsitzung mit ID "${m.chat}" erfolgreich gelöscht`) 
        },
        info: async() => {
            if(!ut[m.chat]) throw "Es gibt keine Spielsitzung in diesem Chat!"; 
            return conn.sendMessage(m.chat, { text: `*Raum-Info*:
Host: @${ut[m.chat].host.split("@")[0]}
Status: ${ut[m.chat].Status}
Map: ${ut[m.chat].map_name}
Spieler: ${Object.keys(ut[m.chat].players).length}/4
${Object.keys(ut[m.chat].players).map(v => "- @"+v.split("@")[0]).join("\n") }`, mentions: Object.keys(ut[m.chat].players) }, { quoted: m }) 
        },
        start: () => {
            if(!ut[m.chat]) throw "Es gibt keine Spielsitzung in diesem Chat!";
            if(ut[m.chat].Status === 'PLAYING') throw "Das Spiel läuft bereits!";
            if(ut[m.chat].host !== m.sender) throw "Nur der Host kann das Spiel starten!";
            ut[m.chat].Status = "PLAYING";
            m.reply("Spiel gestartet!");
            start(m, ut, conn)
        }, 
       exit: () => {
        if(!ut[m.chat]) throw "Es gibt keine Spielsitzung in diesem Chat!";
       if(!Object.keys(ut[m.chat].players).includes(m.sender)) throw "Sie nehmen nicht an diesem Spiel teil!";
       delete ut[m.chat].players[m.sender]
       m.reply("Erfolgreich aus dem Spiel ausgetreten") 
       if(!(Object.keys(ut[m.chat].players).length)) {
delete ut[m.chat]
       return m.reply("Da es keine Spieler mehr gibt, wird die Spielsitzung gelöscht") 
       }
       if(ut[m.chat].Status === 'PLAYING') {
        const players = Object.keys(ut[m.chat].players)
        conn.sendMessage(m.chat, { text: `@${players[ut[m.chat].turn %= players.length].split("@")[0]} ist an der Reihe, tippe *würfeln*`, mentions: [players[ut[m.chat].turn %= players.length]] }, { quoted: m }) 
       }
       if(!Object.keys(ut[m.chat].players).includes(ut[m.chat].host)) {
        let host = Object.keys(ut[m.chat].players)[0]
        ut[m.chat].host = host
               ut[m.chat].players[host].rank = 'HOST'
        conn.sendMessage(m.chat, { text: `Da der Host das Spiel verlassen hat, wird die Host-Position an @${host.split("@")[0]} übertragen`, mentions: [host] }, { quoted: m }) 
       }
      }
    };
    if(!text || !Object.keys(nazz_cmd).includes(text)) return conn.sendMessage(m.chat, { text: `Hallo! Willkommen zu Schlangen und Leitern, ein klassisches Spiel voller Abenteuer und Herausforderungen! Hier müssen Spieler Hindernisse überwinden und Leitern erklimmen, um die Zahl 100 zu erreichen und zum Gewinner zu werden. Aber sei vorsichtig, es gibt rutschige Schlangen, die dich zurückfallen lassen können, und Leitern, die dir helfen, schneller zum Gipfel zu gelangen! 🐍🎲\n\nKomm und nimm an diesem spannenden Abenteuer in Schlangen und Leitern teil! 🎯🎮\n\nHier sind einige Befehle für Schlangen und Leitern:\n${Object.keys(nazz_cmd).map(v => "⬡ "+v).join("\n")}\n\nBeispiel: .ulartangga create`, contextInfo: {
            externalAdReply: {  
                title: 'Schlangen und Leitern', 
                body: 'Created by nazz',
                thumbnailUrl: "https://telegra.ph/file/f5d7192eea4848b112d7b.jpg", 
                sourceUrl: 'youtube.com',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }}, { quoted: m }) 
    await nazz_cmd[text]();
    }

handler.command = /^(ulartangga|ut|schlangenundleitern|sl)$/i
handler.help = ["ulartangga", "schlangenundleitern"];
handler.tags = "spiel";
handler.owner = false

handler.before = async function (m, { conn, text, command }) {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        conn.ulartangga = conn.ulartangga ? conn.ulartangga : {};
    const ut = conn.ulartangga;
        const commandWord = body.toLowerCase().split(" ")[0];
        if((commandWord !== "kocok" && commandWord !== "würfeln") || !ut.hasOwnProperty(m.chat)) return
        await kocok(m, ut, conn) 
        }

module.exports = handler;

async function kocok(m, ut, conn) {
        if(!ut[m.chat]) return;
        const players = Object.keys(ut[m.chat].players);
        if(!players.includes(m.sender)) return;
        const turns = (ut[m.chat].turn >= players.length) ? (ut[m.chat].turn %= players.length) : ut[m.chat].turn;
        if(players.indexOf(m.sender) !== turns) throw "Sie sind nicht an der Reihe!";
        let warna = ["Rot","Gelb","Grün","Blau"][players.indexOf(m.sender)]
        const dadu = Math.floor(Math.random() * 6 + 1)
       let key = await conn.sendMessage(m.chat, { sticker: { url: `https://raw.githubusercontent.com/fgmods/fg-team/spielen/games/dados/${dadu}.webp` }, packname: "Created by Naaazzzzz", author: "Naaazzzzz" }, { quoted: m })
        ut[m.chat].turn += 1;
        ut[m.chat].players[m.sender].schritte += dadu;
        let schritte = ut[m.chat].players[m.sender].schritte - dadu
        if(ut[m.chat].players[m.sender].schritte > 100) ut[m.chat].players[m.sender].schritte = 100 - (ut[m.chat].players[m.sender].schritte - 100);
        let nazz = ut[m.chat].schlangen_leitern
        let teks;
        if(Object.keys(nazz).includes(ut[m.chat].players[m.sender].schritte.toString())) {
            teks = ut[m.chat].players[m.sender].schritte > nazz[ut[m.chat].players[m.sender].schritte] ? "\nDu bist auf eine Schlange getreten" : "\nDu steigst eine Leiter hoch";
            ut[m.chat].players[m.sender].schritte = nazz[ut[m.chat].players[m.sender].schritte];
        }
        const user1 = (ut[m.chat].players[players[0]]?.schritte ?? null) || null;
        const user2 = (ut[m.chat].players[players[1]]?.schritte ?? null) || null;
        const user3 = (ut[m.chat].players[players[2]]?.schritte ?? null) || null;
        const user4 = (ut[m.chat].players[players[3]]?.schritte ?? null) || null;
        if(ut[m.chat].players[m.sender].schritte === 100) {
                global.db.data.users[m.sender].limit += 5
        global.db.data.users[m.sender].exp += 1000
        global.db.data.users[m.sender].coin += 5
            await conn.sendMessage(m.chat, { image: await drawBoard(ut[m.chat].map, user1, user2, user3, user4, ut[m.chat].stabil_x, ut[m.chat].stabil_y), caption: `@${m.sender.split("@")[0]} hat gewonnen\n+1000 exp\n+5 limit\n+5 Münze`, mentions: [m.sender] }, { quoted: key });
            delete ut[m.chat];
            return
        }
        return await conn.sendMessage(m.chat, { image: await drawBoard(ut[m.chat].map, user1, user2, user3, user4, ut[m.chat].stabil_x, ut[m.chat].stabil_y), caption: `${warna} *${schritte}* --> *${ut[m.chat].players[m.sender].schritte}*${teks ? teks:""}\n@${players[ut[m.chat].turn %= players.length].split("@")[0]} ist an der Reihe, tippe *würfeln*`, mentions: [players[ut[m.chat].turn %= players.length]]}, { quoted: key });
    }

async function start(m, ut, conn) {
    const players = Object.keys(ut[m.chat].players);
    if(!players.includes(m.sender)) return;
    let nazz_players = `Rot: @${players[0].split("@")[0]}`;
    if(players[1]) {
        nazz_players += `\nGelb: @${players[1].split("@")[0]}`
    }
    if(players[2]) {
        nazz_players += `\nGrün: @${players[2].split("@")[0]}`;
    }
    if(players[3]) {
        nazz_players += `\nBlau: @${players[3].split("@")[0]}`;
    }
    const teks = `*SCHLANGEN UND LEITERN*
    
${nazz_players}

@${players[0].split("@")[0]} ist an der Reihe, tippe *würfeln*`;
    conn.sendMessage(m.chat, { image: await drawBoard(ut[m.chat].map, 1, null, null, null, ut[m.chat].stabil_x, ut[m.chat].stabil_y), caption: teks, mentions: conn.parseMention(teks) }, { quoted: m })
    ut[m.chat].turn = 0
}

function timeToFixed(milliseconds) {
        var seconds = Math.floor(milliseconds / 1000);
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var remainingSeconds = seconds % 60;
        return hours + ' Stunden ' + minutes + ' Minuten ' + remainingSeconds + ' Sekunden';
    }