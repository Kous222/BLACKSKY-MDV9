let fetch = require('node-fetch');

function getPrayerTimes(jsonData) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const todayString = `${day}-${month}-${year}`;

    for (const Gegenstand of jsonData.result.data) {
        if (Gegenstand.date.gregorian.date === todayString) {
            return Gegenstand;
        }
    }
    return null;
}

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Verwendungsbeispiel: ${usedPrefix}${command} berlin`;

    try {
        const res = await (await fetch(`https://api.betabotz.eu.org/api/tools/jadwalshalat?stadt=${text}&apikey=${lann}`)).json();
        
        if (!res.Status || res.result.code !== 200) {
            throw 'Fehler: API-Antwort nicht gültig';
        }

        const prayerTimes = getPrayerTimes(res);
        
        if (prayerTimes) {
            let timings = prayerTimes.timings;
            let gebetszeiten = Object.entries(timings)
                .map(([name, time]) => `*${name}:* ${time}`)
                .join('\n');
            
            let message = `
Gebetszeiten für *${text}*
${gebetszeiten}
`.trim();
            
            m.reply(message);
        } else {
            throw 'Fehler: Keine Daten für heute verfügbar';
        }
    } catch (error) {
        m.reply('Ein Fehler ist aufgetreten: ' + error);
    }
};

handler.help = ['salat <gebiet>'];
handler.tags = ['islam'];
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i;
handler.limit = true;

module.exports = handler;