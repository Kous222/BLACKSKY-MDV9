/*
*Automatische Limitrücksetzung ein/aus*
Erstellt von Dana Putra | Betabotz | Aqua Bot
Diese Nachricht darf frei gelöscht werden, Sie dürfen auch den Code studieren und davon lernen. Happy coding! :)
Vergessen Sie nicht, dem Admin auf GitHub zu folgen = danaputra133
*/

let isAutoResetEnabled = false; 
let autoResetTimeout = null; 

let handler = async (m, { conn, args, command }) => {
    let lim = 10; 

    if (args.length === 0) {
        
        return conn.reply(
            m.chat,
            `*'on' oder 'off'!*\n\nBeispiel:\n- *.${command} on* um die automatische Zurücksetzung jeden Tag um 00:00 Uhr zu aktivieren\n- *.${command} off* um die automatische Zurücksetzung zu deaktivieren`,
            null
        );
    }

    if (args[0] === 'on') {
        if (isAutoResetEnabled) {
            return conn.reply(m.chat, `*Automatische Limitrücksetzung ist bereits aktiv!*`, null);
        }
        isAutoResetEnabled = true;
        scheduleDailyReset(conn, lim);
        conn.reply(m.chat, `*Automatische Limitrücksetzung wird jeden Tag um 00:00 Uhr ausgeführt.*`, null);
    } else if (args[0] === 'off') {
        if (!isAutoResetEnabled) {
            return conn.reply(m.chat, `*Automatische Limitrücksetzung ist bereits deaktiviert!*`, null);
        }
        isAutoResetEnabled = false;
        cancelScheduledReset(); 
        conn.reply(m.chat, `*Automatische Limitrücksetzung wurde deaktiviert.*`, null);
    } else {
        return conn.reply(
            m.chat,
            `*Ungültiges Argument!*\nBitte benutzen Sie 'on' oder 'off'.\n\nBeispiele:\n- *.${command} on*\n- *.${command} off*`,
            null
        );
    }
};


function resetLimit(conn, lim) {
    let list = Object.entries(global.db.data.users);
    list.map(([user, data]) => (Number(data.limit = lim)));
    conn.reply('120363361439264023@g.us', `*Limit wurde erfolgreich auf ${lim} / Benutzer zurückgesetzt*`, null); // Informationen an eine bestimmte Gruppe senden
}

function getTimeUntilMidnight() {
    let now = new Date();
    let nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); 
    return nextMidnight - now;
}


function scheduleDailyReset(conn, lim) {
    let timeUntilMidnight = getTimeUntilMidnight();

    autoResetTimeout = setTimeout(() => {
        if (isAutoResetEnabled) {
            console.log(`Limit für Benutzer wird auf ${lim} zurückgesetzt`);
            resetLimit(conn, lim); 
            scheduleDailyReset(conn, lim); 
        }
    }, timeUntilMidnight); 
}


function cancelScheduledReset() {
    if (autoResetTimeout) {
        clearTimeout(autoResetTimeout); 
        autoResetTimeout = null;
    }
}

handler.help = ['resetauto'].map(v => 'on/off' + v);
handler.tags = ['owner'];
handler.command = /^(resetauto|rli)$/i;

handler.owner = true;

module.exports = handler;
