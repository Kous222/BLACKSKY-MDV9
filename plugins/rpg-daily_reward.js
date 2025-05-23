const fs = require('fs');

const prem = 1000; // EP die Premium-Benutzer erhalten
const free = 100; // EP die normale Benutzer erhalten

let handler = async (m, {conn, text, isPrems}) => {
    let lastClaimTime = global.db.data.users[m.sender].lastclaim || 0;
    let currentTime = new Date().getTime();

    // Überprüfen, ob 24 Stunden (86400000 ms) seit dem letzten Anspruch vergangen sind
    if (currentTime - lastClaimTime < 86400000) throw `🎁 *Sie haben Ihre tägliche Belohnung bereits gesammelt*\n\n🕚 Komm zurück in *${msToTime(86400000 - (currentTime - lastClaimTime))}*`;

    // EP je nach Benutzertyp hinzufügen
    global.db.data.users[m.sender].Erfahrung += isPrems ? prem : free;
    m.reply(`
🎁 *EP BELOHNUNG*
*Spiel weiter, um mehr EP zu erhalten*
Prüfe mit .balance deine EP-Menge!
🆙 *EP* : +${isPrems ? prem : free}`);

    // Letzte Anspruchszeit aktualisieren
    global.db.data.users[m.sender].lastclaim = currentTime;
}

handler.help = handler.command = ['Täglich', 'täglich', 'tagesbelohnung'];
handler.tags = ['rpg'];
handler.rpg = true

module.exports = handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " Stunden " + minutes + " Minuten";
}