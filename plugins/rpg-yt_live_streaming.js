let handler = async (m, { conn, command, args }) => {
    let user = global.db.data.users[m.sender];
    const tag = `@${m.sender.replace(/@.+/, '')}`;
    try {
        if (command === 'ytlive' || command === 'livestream') {
            if (!user.youtube_account) {
                return conn.reply(m.chat, `Hey du ${tag}\nErstelle zuerst ein Konto\nTippe: .youtubekonto`, m);
            }
            let title = args.join(' ');
            if (!title || title.length > 50) {
                return conn.reply(m.chat, `${tag} Bitte gib einen Titel für deinen Livestream an (maximal 50 Zeichen).`, m);
            }
            const cooldownTime = 600000; // 10 Minuten in Millisekunden (10 * 60 * 1000)
            const lastLiveTime = user.lastLiveTime || 0;
            const timeSinceLastLive = new Date() - lastLiveTime;
            if (timeSinceLastLive < cooldownTime) {
                const remainingCooldown = cooldownTime - timeSinceLastLive;
                const formattedCooldown = msToTime(remainingCooldown);
                throw `Du bist bereits erschöpft. Bitte warte\n${formattedCooldown}`;
            }
            setTimeout(() => {
                conn.reply(m.chat, `👋 Hallo ${tag}, deine Abonnenten warten bereits,\nZeit für einen neuen Livestream!`, m);
            }, cooldownTime);
            const randomSubscribers = Math.floor(Math.random() * (3000 - 10 + 1)) + 1;
            const randomLike = Math.floor(Math.random() * (1000 - 20 + 1)) + 10;
            const randomViewers = Math.floor(Math.random() * (1000000 - 100 + 1)) + 1;
            const randomDonation = Math.floor(Math.random() * (200000 - 10000 + 1)) + 10000;
            user.subscribers += randomSubscribers;
            user.like += randomLike;
            user.viewers += randomViewers;
            user.Münzen += randomDonation;
            user.lastLiveTime = new Date();
            if (user.subscribers >= 1000000 && user.playButton < 3) {
                user.playButton += 1;
                user.eris += Math.floor(Math.random() * (1000000 - 500000 + 1)) + 500000; // Belohnung Eris
                user.exp += 5000; // Belohnung EXP
                conn.reply(m.chat, `📢 Glückwunsch! Du hast einen Abonnenten-Meilenstein erreicht und erhältst den *🥇 Diamant Play Button* sowie eine Belohnung an Münzen und Erfahrungspunkten! 🎉\n\n📢 Überprüfe deinen Fortschritt mit *.ytprofil*`, m);
            } else if (user.subscribers >= 100000 && user.playButton < 2) {
                user.playButton += 1;
                user.eris += Math.floor(Math.random() * (500000 - 300000 + 1)) + 300000; // Belohnung Eris
                user.exp += 2500; // Belohnung EXP
                conn.reply(m.chat, `📢 Glückwunsch! Du hast einen Abonnenten-Meilenstein erreicht und erhältst den *🥈 Gold Play Button* sowie eine Belohnung an Münzen und Erfahrungspunkten! 🎉\n\n📢 Überprüfe deinen Fortschritt mit *.ytprofil*`, m);
            } else if (user.subscribers >= 10000 && user.playButton < 1) {
                user.playButton += 1;
                user.Münzen += Math.floor(Math.random() * (250000 - 10000 + 1)) + 10000; // Belohnung Eris
                user.exp += 500; // Belohnung EXP
                conn.reply(m.chat, `📢 Glückwunsch! ${tag}, du hast einen Abonnenten-Meilenstein erreicht und erhältst den *🥉 Silber Play Button* sowie eine Belohnung an Münzen und Erfahrungspunkten! 🎉\n\n📢 Überprüfe deinen Fortschritt mit *.ytprofil*`, m);
            };
            const formattedSubscribers = formatNumber(user.subscribers);
            const formattedLike = formatNumber(user.like);
            const formattedViewers = formatNumber(user.viewers);
            const formattedDonation = formatCurrency(randomDonation);

            conn.reply(m.chat, `
[ 🎦 ] Ergebnisse des Livestreams

🧑🏻‍💻 *Streamer:* ${tag}
📹 *Livestream-Titel:* ${title}
📈 *Neue Abonnenten:* +${formatNumber(randomSubscribers)}
👍🏻 *Neue Likes:* +${formatNumber(randomLike)}
🪬 *Neue Zuschauer:* +${formatNumber(randomViewers)}
💵 *Spenden:* ${formattedDonation}

📊 *Gesamtlikes:* ${formattedLike}
📊 *Gesamtzuschauer:* ${formattedViewers}
📊 *Gesamtabonnenten:* ${formattedSubscribers}

> Überprüfe dein YouTube-Konto
> Tippe: .ytprofil`, m);
        }
    } catch (err) {
        m.reply("📢: " + err);
    }
};

// Funktion zur Konvertierung großer Zahlen in das Format K, M, Mrd., Bio.
function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + ' Bio.';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + ' Mrd.';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + ' Mio.';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
}

// Funktion zur Konvertierung von Zahlen in Währungsformat (EUR)
function formatCurrency(num) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num / 15000); // Umrechnung von IDR zu EUR (ungefähr)
}

// Funktion zur Konvertierung von Millisekunden in ein lesbares Zeitformat
function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const formattedTime = [];
    if (hours > 0) {
        formattedTime.push(`${hours} Stunden`);
    }
    if (minutes > 0) {
        formattedTime.push(`${minutes} Minuten`);
    }
    if (seconds > 0 || (hours === 0 && minutes === 0)) {
        formattedTime.push(`${seconds} Sekunden`);
    }

    return formattedTime.join(' ');
}

// Hilfe, Tags, Befehl und Registrierung für den RPG-Befehlshandler
handler.help = ['ytlive', 'livestream'];
handler.tags = ['rpg'];
handler.command = /^(ytlive|livestream)$/i;
handler.register = true;
handler.rpg = true;
handler.group = true;

// Ekspor handler Befehl RPG
module.exports = handler;