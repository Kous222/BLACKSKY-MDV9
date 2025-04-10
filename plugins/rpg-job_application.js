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

    //const COOLDOWN_PERIOD = 3 * 24 * 60 * 60 * 1000; // 3 Tage in Millisekunden

    // Prüfen, ob der Nutzer in der Abklingperiode ist
    /*if (user.lastjobchange) {
        let lastjobchange = new Date(lastjobchange);
        let now = new Date();
        if (now - lastjobchange < COOLDOWN_PERIOD) {
            let timeLeft = COOLDOWN_PERIOD - (now - lastjobchange);
            let daysLeft = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
            let hoursLeft = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            let minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
            throw `Sie haben Ihren Beruf erst kürzlich gewechselt. Bitte warten Sie ${daysLeft} Tage, ${hoursLeft} Stunden und ${minutesLeft} Minuten, bevor Sie Ihren Beruf erneut wechseln können.`;
        }
    }*/

    // Prüfen, ob der vom Benutzer eingegebene Text ein gültiger Beruf ist
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

    // Prüfen, ob das Level des Nutzers im erforderlichen Bereich für den gewählten Beruf liegt
    if (user.Stufe < jobLevelRange.min || user.Stufe > jobLevelRange.max) {
        throw `Entschuldigung, Deine Stufe ist nicht ausreichend, um ${kapital} zu werden. Die benötigte Stufe ist zwischen ${jobLevelRange.min} und ${jobLevelRange.max}. Deine aktuelle Stufe ist ${user.Stufe}.`;
    }

    // Nachricht senden, dass der Nutzer einen Beruf gewählt hat und auf Genehmigung wartet
    setTimeout(() => {
        let lamarkerja1 = `Du hast *${kapital}* als deinen Beruf gewählt.

⤷ Bitte warte 1 Minute auf die Genehmigung des Unternehmens, um mit der Arbeit beginnen zu können.`.trim();
        conn.reply(m.chat, lamarkerja1, m);
    }, 0);

    // Nachricht senden, dass die Bewerbung akzeptiert wurde und den Nutzer als arbeitend markieren
    setTimeout(() => {
        let lamarkerja2 = `🎉 Herzlichen Glückwunsch! Deine Bewerbung wurde vom Unternehmen akzeptiert und du kannst heute mit der Arbeit beginnen.

⤷ Tippe *.job* um deine Berufsdetails anzusehen.`.trim();

        // Beruf des Nutzers speichern, ihn als arbeitend markieren und den Zeitpunkt des letzten Berufswechsels notieren
        user.job = job;
    }, 30000);
};

handler.help = ['bewerben', 'bewerbung', 'arbeit'];
handler.tags = ['rpg'];
handler.command = /^(bewerben|bewerbung|arbeit)$/i;
handler.rpg = true
module.exports = handler;

function capitalizeFirstLetter(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
}