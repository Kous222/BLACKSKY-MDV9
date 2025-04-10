const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createMines() {
    const areaNames = [
        "Gold", "Silber", "Diamant", "Edelstein", "Uran", "Schwarzgold",
        "Kristall", "Rubin", "Saphir", "Topas", "Amethyst", "Smaragd", "Opal", "Quarz",
        "Rotsaphir", "Blautopas", "Violettamethyst", "Rotrubin", "Weißgold",
        "Blaudiamant", "Schwarzedelstein", "Radioaktives Uran", "Seltener Kristall",
        "Stiller Stein", "Türkis", "Granat", "Kalimaya", "Quarzit", "Lapislazuli", "Rhodochrosit",
        "Jaspis", "Malachit", "Hessonit", "Peridot", "Bernstein", "Kornerupin",
        "Morganit", "Labradorit", "Aquamarin", "Tansanit", "Granat", "Aquamarin",
        "Kunzit", "Maw-sit-sit", "Sphene", "Kyanit", "Alexandrit", "Variscit",
        "Neue Mine 1", "Neue Mine 2", "Neue Mine 3"
    ];

    let mines = areaNames.map((areaName, i) => ({
        area: `Mine ${areaName}`,
        txt: areaName.toLowerCase().replace(/ /g, "_"),
        reward: {
            exp: 50 + (i * 50),
            resources: {
                diamant: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                gold: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                stein: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                smaragd: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                kohle: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0,
                eisen: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0
            }
        }
    }));
    return mines;
}

function formatTime(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n' + d, ' *Tage ☀️*\n', h, ' *Stunden 🕐*\n', m, ' *Minuten ⏰*\n', s, ' *Sekunden ⏱️*'].map(v => v.toString().padStart(2, 0)).join('');
}

async function handler(m, { conn, text }) {
    conn.minen = conn.minen || {};
    let user = global.db.data.users[m.sender];

    if (m.sender in conn.minen) {
        if (conn.minen[m.sender].currentArea >= conn.minen[m.sender].areas.length) {
            return m.reply("🏆 Du hast alle Minengebiete abgeschlossen.");
        }
        return m.reply("⏳ Du hast noch ein unvollständiges Minengebiet. Bitte schließe es zuerst ab.");
    } else {
        if (text === 'start') {
            let mines = createMines();

            if (!user) return m.reply("📝 Bitte registriere dich, um das Spiel zu spielen.");
            if (user.healt === 0 || user.Ausdauer === 0) return m.reply("❗ Deine Ausdauer/Gesundheit ist unter 100.");
            if (typeof user.exp !== "number") global.db.data.users[m.sender].exp = 0;
            if (typeof user.resources !== "object") global.db.data.users[m.sender].resources = { diamant: 0, smaragd: 0, kohle: 0, eisen: 0 };
            if (typeof user.kerjasatu !== "number") global.db.data.users[m.sender].kerjasatu = 0;

            const cooldown = 5 * 60 * 1000; // 5 Minuten Abklingzeit
            let timers = cooldown - (Date.now() - (user.kerjasatu || 0));
            if (timers > 0) return m.reply(`Bitte warte ${formatTime(timers)}, bevor du wieder mit dem Bergbau beginnen kannst.`);

            let { area, txt, reward } = mines[0]; // Start with the first area
            let currentArea = 0;
            let minenergebnis = 0;
            let totalReward = { diamant: 0, smaragd: 0, kohle: 0, eisen: 0 };

            conn.minen[m.sender] = {
                areas: mines,
                currentArea,
                minenergebnis,
                lastMiningTime: Date.now(),
                totalReward,
            };

            let caption = `🏞️ *MINENGEBIET:* ${area}\n\n🪨 Tippe *'${txt}'* um mit dem Bergbau in diesem Gebiet zu beginnen.\n🔍 Anzahl der Minenergebnisse: ${minenergebnis}\n💰 Erhaltene Erfahrung: ${reward.exp}\n💎 Erhaltene Ressourcen: Diamant: ${reward.resources.diamant}, Smaragd: ${reward.resources.smaragd}, Kohle: ${reward.resources.kohle}, Eisen: ${reward.resources.eisen}`;

            return m.reply(caption);
        } else {
            let instructions = "🏅 Willkommen beim Bergbauspiel!\n";
            instructions += "Tippe *'minen start'* um mit dem Bergbau zu beginnen.\n";
            instructions += "Tippe *'stoppen'* um den Bergbau zu beenden, wenn du gerade spielst.";

            return m.reply(instructions);
        }
    }
}

handler.before = async m => {
    conn.minen = conn.minen || {};
    if (!(m.sender in conn.minen)) return;
    if (m.isBaileys) return;

    let { areas, currentArea, minenergebnis, lastMiningTime, totalReward } = conn.minen[m.sender];
    const cooldown = 5 * 60 * 1000; // 5 Minuten Abklingzeit
    let user = global.db.data.users[m.sender];

    let msg = m.text.toLowerCase();
    if (msg === 'stoppen') {
        m.reply("❌ Bergbau wurde beendet. Tippe *'minen start'* um mit dem Bergbau neu zu beginnen.");
        delete conn.minen[m.sender];
        return false;
    } else if (currentArea < areas.length) {
        if (areas[currentArea].txt === msg) {
            let { area, reward } = areas[currentArea];
            user.exp += reward.exp;

            // Ressourcen aktualisieren
            for (let resource in reward.resources) {
                user.resources[resource] += reward.resources[resource];
                totalReward[resource] += reward.resources[resource];

                // Sicherstellen, dass die aktualisierten Ressourcen in der Datenbank gespeichert werden
                global.db.data.users[m.sender][resource] += reward.resources[resource];
            }

            minenergebnis++;
            currentArea++;
            conn.minen[m.sender].currentArea = currentArea;
            conn.minen[m.sender].minenergebnis = minenergebnis;
            conn.minen[m.sender].totalReward = totalReward;
            conn.minen[m.sender].lastMiningTime = Date.now();

            if (currentArea >= areas.length) {
                m.reply(`🎉 Herzlichen Glückwunsch! Du hast alle Minengebiete abgeschlossen.\nGesamte Minenergebnisse: ${minenergebnis}\nErhaltene Erfahrung: ${reward.exp}\nGesamte erhaltene Ressourcen: Diamant: ${totalReward.diamant}, Smaragd: ${totalReward.smaragd}, Kohle: ${totalReward.kohle}, Eisen: ${totalReward.eisen}`);
                delete conn.minen[m.sender];
                return false;
            } else {
                let nextArea = areas[currentArea].area;
                let caption = `🏞️ *MINENGEBIET:* ${nextArea}\n\n🪨 Tippe *'${areas[currentArea].txt}'* um mit dem Bergbau in diesem Gebiet zu beginnen.\n🔍 Anzahl der Minenergebnisse: ${minenergebnis}\n💰 Erhaltene Erfahrung: ${reward.exp}\n💎 Erhaltene Ressourcen: Diamant: ${reward.resources.diamant}, Smaragd: ${reward.resources.smaragd}, Kohle: ${reward.resources.kohle}, Eisen: ${reward.resources.eisen}\n\n> Tippe *stoppen* zum Beenden`;
                m.reply(caption);
                return false;
            }
        }
    }
};

handler.help = ['minen', 'bergbau'];
handler.tags = ['rpg'];
handler.command = /^(minen|bergbau)$/i;
handler.group = true;
handler.register = true;
handler.rpg = true;

module.exports = handler;