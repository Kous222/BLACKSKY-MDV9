const cooldown = 300000; // Standard-Cooldown (5 Minuten in Millisekunden)
const cooldownAfterWork = 5 * 60 * 1000; // Cooldown nach der Arbeit für 5 Minuten

let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {
    const user = global.db.data.users[m.sender];

    // Überprüfen, ob der Benutzer einen Job hat
    if (user.job === 'Arbeitslos') {
        throw `Du hast noch keinen Job. Tippe *${usedPrefix}arbeit (Beruf)*, um dich zu bewerben.`;
    }

    // Überprüfen, ob der Benutzer im Gefängnis oder entführt ist
    if (user.jail === true) {
        throw '*Du kannst keine Aktivitäten durchführen, da du im Gefängnis bist!*';
    }
    if (user.culik === true) {
        throw '*Du kannst keine Aktivitäten durchführen, da du entführt wurdest!*';
    }

    // Überprüfen, ob der Benutzer bereits auf Arbeit ist und Cooldown
    if (new Date() - user.pekerjaansatu < cooldown || user.pekerjaansatu + cooldownAfterWork > new Date()) {
        let remainingTime;
        if (new Date() - user.pekerjaansatu < cooldown) {
            remainingTime = user.pekerjaansatu + cooldown - new Date();
        } else {
            remainingTime = user.pekerjaansatu + cooldownAfterWork - new Date();
        }
        let formattedTime = new Date(remainingTime).toISOString().substr(11, 8);
        throw `Du warst bereits arbeiten. Bitte warte *${formattedTime}*, bevor du erneut arbeitest.`;
    }

    // Job-Liste mit deutschen Jobnamen
    const jobList = {
        'motorradtaxi-fahrer': [11000, 10000, 10000],
        'büroangestellter': [32000, 32000, 40000],
        'spieleentwickler': [420000, 410000, 400000],
        'backend-entwickler': [130000, 130000, 140000],
        'webentwickler': [72000, 72000, 80000],
        'fahrer': [26000, 25000, 25000],
        'kurier': [15000, 14000, 14000],
        'frontend-entwickler': [52000, 52000, 60000],
        'fullstack-entwickler': [210000, 210000, 200000],
        'fußballspieler': [900000, 900000, 1000000],
        'supermarktmitarbeiter': [27000, 27000, 30000],
        'auftragskiller': [31000, 31000, 40000],    
        'kopfgeldjäger': [31000, 31000, 40000],        
        'polizist': [31000, 31000, 40000], 
        'händler': [1700000, 1700000, 2000000],
        'arzt': [1700000, 1700000, 2000000],
        'jäger': [1700000, 1700000, 2000000]
    };

    // Job-Übersetzung bleibt nun mit deutschen Bezeichnungen
    const jobTranslation = {
        'motorradtaxi-fahrer': 'Motorradtaxi-Fahrer',
        'büroangestellter': 'Büroangestellter',
        'spieleentwickler': 'Spieleentwickler',
        'backend-entwickler': 'Backend-Entwickler',
        'webentwickler': 'Webentwickler',
        'fahrer': 'Fahrer',
        'kurier': 'Kurier',
        'frontend-entwickler': 'Frontend-Entwickler',
        'fullstack-entwickler': 'Fullstack-Entwickler',
        'fußballspieler': 'Fußballspieler',
        'supermarktmitarbeiter': 'Supermarktmitarbeiter',
        'auftragskiller': 'Auftragskiller',
        'kopfgeldjäger': 'Kopfgeldjäger',
        'polizist': 'Polizist',
        'händler': 'Händler',
        'arzt': 'Arzt',
        'jäger': 'Jäger'
    };

    // Sicherstellen, dass der Job des Benutzers in der Job-Liste vorhanden ist
    if (!jobList[user.job]) {
        throw `Dein aktueller Job "${user.job}" ist nicht bekannt oder ungültig. Bitte bewirb dich neu mit *${usedPrefix}arbeit*!`;
    }

    // Job-Daten abrufen
    let [geldMax, expMax, bankMax] = jobList[user.job];
    let geld = Math.floor(Math.random() * geldMax);
    let exp = Math.floor(Math.random() * expMax);
    let bank = Math.floor(Math.random() * bankMax);

    // Benutzer-Statistiken aktualisieren
    user.Münzen += geld;
    user.exp += exp;
    user.jobexp += 1;
    user.pekerjaansatu = new Date().getTime();

    // Jobname aus der Übersetzungsliste
    let jobName = jobTranslation[user.job] || user.job;

    // Antwortnachricht
    let message = `*Einnahmen aus deinem Job als ${jobName}:* 
• Münzen: €${geld}
• Erfahrung: ${exp} XP
• Arbeitsfortschritt: +1%`;

    // Speichern der neuen Daten im 'database.json'
    await global.db.save();

    // Antwort an den Benutzer
    conn.reply(m.chat, message, m);
};

handler.help = ['work'];
handler.tags = ['rpg'];
handler.command = /^(work)$/i;
handler.limit = true;

module.exports = handler;
