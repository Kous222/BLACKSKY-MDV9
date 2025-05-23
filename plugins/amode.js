const fs = require('fs');
const path = require('path');

const DATA_FOLDER = './lib';
const DATA_FILE = path.join(DATA_FOLDER, 'amode.json');

// Sicherstellen, dass lib-Ordner und amode.json existieren
function ensureDataFile() {
    if (!fs.existsSync(DATA_FOLDER)) {
        fs.mkdirSync(DATA_FOLDER, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({}));
    }
}

// Daten laden
function loadData() {
    ensureDataFile();
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Daten speichern
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let handler = async (m, { conn, args, usedPrefix, command, isAdmin, isOwner }) => {
    if (!m.isGroup) throw '❌ Dieser Befehl funktioniert nur in Gruppen.';
    if (!isAdmin && !isOwner) throw '⛔ Nur Admins dürfen den Admin-Modus ändern!';

    let groupId = m.chat;
    let option = (args[0] || '').toLowerCase();

    // Lade die amode-Daten
    let amode = loadData();

    if (option === 'enable') {
        amode[groupId] = true;
        saveData(amode);
        await conn.sendMessage(m.chat, {
            text: '✅ Admin-Modus wurde *aktiviert*! Nur Admins können jetzt Befehle verwenden.',
            buttons: [
                { buttonId: usedPrefix + command + ' disable', buttonText: { displayText: '❎ Admin-Modus Deaktivieren' }, type: 1 }
            ],
            footer: 'BLACKSKY-MD',
            headerType: 1
        });
    } else if (option === 'disable') {
        amode[groupId] = false;
        saveData(amode);
        await conn.sendMessage(m.chat, {
            text: '❎ Admin-Modus wurde *deaktiviert*! Jetzt können alle Mitglieder Befehle verwenden.',
            buttons: [
                { buttonId: usedPrefix + command + ' enable', buttonText: { displayText: '✅ Admin-Modus Aktivieren' }, type: 1 }
            ],
            footer: 'BLACKSKY-MD',
            headerType: 1
        });
    } else {
        throw `⚙️ Bitte benutze:\n\n${usedPrefix + command} enable\n${usedPrefix + command} disable`;
    }
}

handler.help = ['amode [enable|disable]'];
handler.tags = ['group'];
handler.command = ['amode'];
handler.group = true;
handler.admin = true;

module.exports = handler;

// Hook: verhindert Befehle von Nicht-Admins, wenn Admin-Mode aktiv ist
handler.before = async function (m, { isAdmin, isOwner }) {
    if (!m.isGroup) return;
    if (isAdmin || isOwner) return;

    let groupId = m.chat;
    let amode = loadData();
    if (amode[groupId]) {
        throw '⛔ Nur Admins dürfen in diesem Chat Befehle benutzen!';
    }
};
