let {
        MessageType
} = require('@adiwajshing/baileys');

let wm = global.wm;
let handler = async (m, {
        conn,
        usedPrefix,
        Besitzer
}) => {
                let lastFishingTime = global.db.data.users[m.sender].lastmancing || 0;
                let timeDiff = Date.now() - lastFishingTime;
                let remainingTime = 180000 - timeDiff; 

                if (global.db.data.users[m.sender].fishingrod > 0) {
                        if (timeDiff >= 180000) { 
                                let ikan = Math.floor(Math.random() * 30);
                                let lele = Math.floor(Math.random() * 15);
                                let nila = Math.floor(Math.random() * 10);
                                let bawal = Math.floor(Math.random() * 10);
                                let udang = Math.floor(Math.random() * 39);
                                let paus = Math.floor(Math.random() * 2);
                                let kepiting = Math.floor(Math.random() * 27);

                                let imageUrl = 'https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/arit56zv.jpg';
                                let totalCatch = nila + bawal + ikan + lele + udang + paus + kepiting;

                                let mcng = `•  *Angelergebnis:*
        
◦  🐟 Nilbarsch: ${nila}
◦  🐡 Silberbrachse: ${bawal}
◦  🐟 Katzenfisch: ${lele}
◦  🐟 Fisch: ${ikan}
◦  🦐 Garnele: ${udang}
◦  🐋 Wal: ${paus}
◦  🦀 Krabbe: ${kepiting}`;

                                setTimeout(() => {
                                        conn.sendFile(m.chat, imageUrl, 'angeln.jpg', mcng, m);
                                }, 28000);
                                setTimeout(() => {
                                        conn.reply(m.chat, `Der Köder wurde angebissen!! Zieh die Angel heraus!`, m)
                                }, 18000);
                                setTimeout(() => {
                                        conn.reply(m.chat, `Warte, bis ein Fisch den Köder frisst`, m)
                                }, 8000);
                                setTimeout(() => {
                                        conn.reply(m.chat, `Du gehst angeln 🎣`, m)
                                }, 0);

                                global.db.data.users[m.sender].nila += nila;
                                global.db.data.users[m.sender].ikan += ikan;
                                global.db.data.users[m.sender].lele += lele;
                                global.db.data.users[m.sender].bawal += bawal;
                                global.db.data.users[m.sender].udang += udang;
                                global.db.data.users[m.sender].lastmancing = Date.now();
                                global.db.data.users[m.sender].udang += udang;
                                global.db.data.users[m.sender].paus += paus ;
                                global.db.data.users[m.sender].udang +=  udang;
                                global.db.data.users[m.sender].kepiting += kepiting ;
                                global.db.data.users[m.sender].fishingrod -= 1;
                                global.db.data.users[m.sender].totalPancingan += totalCatch;
                        } else {
                                let remainingTimeStr = formatTime(remainingTime);
                                conn.reply(m.chat, `Du hast vor kurzem geangelt, warte bitte ${remainingTimeStr}`, m);
                        }
                } else {
                        conn.reply(m.chat, '[❗] Du hast keine Angelrute! Stelle zuerst eine im Handwerk her 🎣', m);
                }
}

handler.help = ['angeln', 'fischen'];
handler.tags = ['rpg'];
handler.command = /^(angeln|fischen)$/i;
handler.rpg = true
module.exports = handler;

function formatTime(ms) {
        let seconds = Math.floor(ms / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        let hStr = hours.toString().padStart(2, '0');
        let mStr = minutes.toString().padStart(2, '0');
        let sStr = seconds.toString().padStart(2, '0');

        return `${hStr}:${mStr}:${sStr}`;
}