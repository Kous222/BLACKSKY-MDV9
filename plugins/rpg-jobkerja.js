const cooldown = 300000; // 5 Minuten
const cooldownAfterWork = 5 * 60 * 1000;

const { addBalance } = require('../lib/bank'); // Bank-System
const User = require('../lib/User'); // Dein Mongoose-Modell

let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {
    // Benutzer aus global.db holen
    const user = global.db.data.users[m.sender];

    if (user.job === 'Arbeitslos') {
        throw `Du hast noch keinen Job. Tippe *${usedPrefix}arbeit (Beruf)*, um dich zu bewerben.`;
    }

    if (user.jail === true) throw '*Du bist im Gefängnis!*';
    if (user.culik === true) throw '*Du wurdest entführt!*';

    if (new Date() - user.pekerjaansatu < cooldown || user.pekerjaansatu + cooldownAfterWork > new Date()) {
        let remainingTime = Math.max(
            user.pekerjaansatu + cooldown - new Date(),
            user.pekerjaansatu + cooldownAfterWork - new Date()
        );
        let formattedTime = new Date(remainingTime).toISOString().substr(11, 8);
        throw `Du warst bereits arbeiten. Bitte warte *${formattedTime}*, bevor du erneut arbeitest.`;
    }

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

    if (!jobList[user.job]) {
        throw `Dein aktueller Job "${user.job}" ist ungültig. Bewirb dich neu mit *${usedPrefix}arbeit*!`;
    }

    let [geldMax, expMax, bankMax] = jobList[user.job];
    let geld = Math.floor(Math.random() * geldMax);
    let exp = Math.floor(Math.random() * expMax);

    user.Münzen += geld;
    user.exp += exp;
    user.jobexp += 1;
    user.pekerjaansatu = new Date().getTime();

    // MongoDB speichern
    await User.updateOne(
        { jid: m.sender },
        {
            $set: {
                exp: user.exp,
                Münzen: user.Münzen,
                jobexp: user.jobexp,
                pekerjaansatu: user.pekerjaansatu
            }
        },
        { upsert: true }
    );

    let jobName = jobTranslation[user.job] || user.job;
    let message = `*Einnahmen aus deinem Job als ${jobName}:* 
• Münzen: €${geld}
• Erfahrung: ${exp} XP
• Arbeitsfortschritt: +1%`;

    conn.reply(m.chat, message, m);

    // Balance im Atlas-Konto erhöhen
    await addBalance(m.sender, geld, 'Münzen');
};

handler.help = ['work'];
handler.tags = ['rpg'];
handler.command = /^(work)$/i;
handler.limit = true;

module.exports = handler;
