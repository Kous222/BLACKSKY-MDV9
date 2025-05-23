let handler = async (m, { isPrems, args, conn, text, command, usedPrefix }) => {
    let user = global.db.data.users[m.sender];

    const jobRequirements = {
        'lieferfahrer': { min: 10, max: 100000 },
        'kurier': { min: 10, max: 200000 },
        'fahrer': { min: 10, max: 200000 },
        'einzelhandelsmitarbeiter': { min: 20, max: 300000 },
        'büroangestellter': { min: 30, max: 400000 },
        'arzt': { min: 50, max: 100000 },
        'frontend entwickler': { min: 40, max: 600000 },
        'webentwickler': { min: 40, max: 600000 },
        'backend entwickler': { min: 40, max: 600000 },
        'fullstack entwickler': { min: 50, max: 700000 },
        'spieleentwickler': { min: 40, max: 600000 },
        'fußballspieler': { min: 30, max: 500000 },
        'händler': { min: 40, max: 60000 },
        'jäger': { min: 20, max: 300000 },
        'polizist': { min: 100, max: 100000 }
    };

    function capitalizeFirstLetter(str) {
        let words = str.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
        return words.join(" ");
    }

    const COOLDOWN_PERIOD = 3 * 24 * 60 * 60 * 1000; // 3 Tage in Millisekunden

    // Cooldown-Prüfung
    if (user.lastjobchange) {
        let lastChange = new Date(user.lastjobchange);
        let now = new Date();
        if (now - lastChange < COOLDOWN_PERIOD) {
            let timeLeft = COOLDOWN_PERIOD - (now - lastChange);
            let daysLeft = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
            let hoursLeft = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            let minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
            throw `⏳ Du hast deinen Beruf erst kürzlich gewechselt.\nBitte warte noch ${daysLeft} Tag(e), ${hoursLeft} Stunde(n) und ${minutesLeft} Minute(n), bevor du erneut wechseln kannst.`;
        }
    }

    // Beruf gültig?
    if (!text || !Object.keys(jobRequirements).includes(text.toLowerCase())) {
        let kerjaan = `乂 *J O B - L I S T E*

• Lieferfahrer 
• Kurier
• Fahrer
• Einzelhandelsmitarbeiter
• Büroangestellter
• Arzt
• Frontend Entwickler
• Webentwickler
• Backend Entwickler
• Fullstack Entwickler
• Spieleentwickler
• Fußballspieler
• Händler
• Jäger
• Polizist

• _Beispiel_ : ${usedPrefix}${command} lieferfahrer`.trim();
        conn.reply(m.chat, kerjaan, m);
        return;
    }

    let job = text.toLowerCase();
    let kapital = capitalizeFirstLetter(job);
    let jobLevelRange = jobRequirements[job];

    // Levelprüfung
    if (user.Stufe < jobLevelRange.min || user.Stufe > jobLevelRange.max) {
        throw `Entschuldigung, Deine Stufe ist nicht ausreichend, um ${kapital} zu werden. Die benötigte Stufe ist zwischen ${jobLevelRange.min} und ${jobLevelRange.max}. Deine aktuelle Stufe ist ${user.Stufe}.`;
    }

    // Beruf speichern und Zeit setzen
    user.job = job;
    user.lastjobchange = new Date().toISOString();

    // Erste Nachricht sofort senden
    let lamarkerja1 = `Du hast *${kapital}* als deinen Beruf gewählt.

⤷ Bitte warte 1 Minute auf die Genehmigung des Unternehmens, um mit der Arbeit beginnen zu können.`.trim();
    conn.reply(m.chat, lamarkerja1, m);

    // 30 Sekunden später: Bestätigungsnachricht
    setTimeout(() => {
        let lamarkerja2 = `🎉 Herzlichen Glückwunsch! Deine Bewerbung wurde vom Unternehmen akzeptiert und du kannst heute mit der Arbeit beginnen.

⤷ Tippe *.job* um deine Berufsdetails anzusehen.`.trim();
        conn.reply(m.chat, lamarkerja2, m);
    }, 30000);
};

handler.help = ['bewerben', 'bewerbung', 'arbeit'];
handler.tags = ['rpg'];
handler.command = /^(bewerben|bewerbung|arbeit)$/i;
handler.rpg = true;

module.exports = handler;
