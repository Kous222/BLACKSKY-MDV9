const fs = require('fs');
const path = require('path');

const storeDatabaseFilePath = path.join(__dirname, 'store-database.json');

const loadStoreDatabase = () => {
    if (fs.existsSync(storeDatabaseFilePath)) {
        const data = fs.readFileSync(storeDatabaseFilePath);
        return JSON.parse(data);
    }
    return { store: {}, transactions: {}, setlist: {}, addlist: {} };
};

const saveStoreDatabase = (data) => {
    fs.writeFileSync(storeDatabaseFilePath, JSON.stringify(data, null, 2));
};

const handler = async (message, { text, isOwner, usedPrefix }) => {
    const storeDatabase = loadStoreDatabase();
    storeDatabase.setlist = storeDatabase.setlist || {};

    const chatId = message.chat;

    if (!isOwner) throw `Nur der Eigentümer kann die Setlist konfigurieren.`;
    if (!text) throw `Bitte gib die Setlist an, die konfiguriert werden soll. Beispiel: ${usedPrefix}setlist SetlistText\n\nAnweisung: Verwende benutzerdefinierten Text für das Layout der Setlist. Beispielvorlage:\n🔥 BetaBotz Hosting 🔥  

––––––––––––––––––––––––––  
📌 Paket registrieren:  
╭──────────────────────────╮  
⇒

╰──────────────────────────╯  
––––––––––––––––––––––––––  


ℹ️ Regeln:
•⁠  ⁠Verboten für Mining
•⁠  ⁠Verboten für DDOS
•⁠  ⁠Verboten für Skripte, die Proxy-Dateien oder sogar DDOS-Dateien enthalten
•⁠  ⁠Verboten, Panel-Links zu verbreiten oder Benutzerdaten zu verbreiten
•⁠  ⁠Bei Verstoß gegen die Nutzungsbedingungen werde ich das Konto löschen, weil ich streng bin 😹🗿

✅ Buildpack, das bereits installiert ist 🛠️  
•⁠  ⁠FFMPEG, IMAGEMAGICK, PYTHON3, PYTHON3-PIP  
•⁠  ⁠PUPPETEER, CHROMIUM, PM2, NPM, YARN  
•⁠  ⁠SPEEDTEST-NET, usw.  

🍄 Vorteile:
•⁠  ⁠Erhalte kostenlos ein Premium-Konto in der API für kostenlose Nutzer, bei kostenpflichtigen Benutzern kann das Ablaufdatum oder Limit ausgewählt werden
•⁠  ⁠Kann zum Ausführen von Websites verwendet werden (mit Cloudflare Tunnel oder ähnlichem)
•⁠  ⁠Erhalte Zugriff auf die Website für Kaufverwaltung, Rechnungen, Server-Ablaufdaten und Informationen über das Panel

📆 Aktivierungszeitraum: 30 Tage  
🔄 Garantie: 30 Tage  
🗓️ Wenn Sie verlängern möchten, schreiben Sie mir

📩 Kontaktieren Sie uns:  
📱 WhatsApp: 

Gib das Schlüsselwort ein, um den Inhalt zu sehen!`;

    storeDatabase.setlist[chatId] = text.trim();
    saveStoreDatabase(storeDatabase);
    return message.reply(`Setlist für diese Gruppe erfolgreich konfiguriert!`);
};

handler.help = ['setlist'];
handler.tags = ['store'];
handler.command = /^setlist$/i;
handler.owner = true;
module.exports = handler;


// Kein Code von außen kopieren, eigene Logik verwenden
// Frei änderbar, da Open Source
// danaputra133
// Tutorial verfügbar unter: https://youtu.be/sFj3Mh-z1Jk