const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createAdventures() {
    const areaNames = [
        "Dichter Wald", "Verstecktes Dorf", "Mysteriöse Höhle", "Berggipfel", "Abgelegener See",
        "Grünes Tal", "Verlassenes Schloss", "Geheime Insel", "Dunkler Wald", "Antike Ruinen",
        "Vergessener Tempel", "Kampffeld", "Flüchtlingslager", "Bambuswald", "Stranddorf",
        "Schneewald", "Wüstenlandschaft", "Kristallhöhle", "Piratenlager", "Nebliger Sumpf",
        "Vulkan", "Unterwasserhöhle", "Eispalast", "Stürmisches Meer", "Drachenhöhle"
    ];

    let adventures = areaNames.map((areaName, i) => ({
        area: `Abenteuer in ${areaName}`,
        txt: areaName.toLowerCase().replace(/ /g, "_"),
        reward: {
            exp: 50 + (i * 50),
            loot: {
                potion: Math.floor(Math.random() * 10) + 1,
                Diamant: Math.floor(Math.random() * 5) + 1,
                Gold: Math.floor(Math.random() * 10) + 1,
                Münzen: Math.floor(Math.random() * (50000 - 1000 + 1)) + 1000,
                limit: Math.floor(Math.random() * 10) + 1
            }
        }
    }));
    return adventures;
}

function formatTime(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n' + d, ' *Tage ☀️*\n', h, ' *Stunden 🕐*\n', m, ' *Minuten ⏰*\n', s, ' *Sekunden ⏱️*'].map(v => v.toString().padStart(2, 0)).join('');
}

async function handler(m, { conn, text }) {
    conn.adventure = conn.adventure || {};
    let user = global.db.data.users[m.sender];

    if (m.sender in conn.adventure) {
        if (conn.adventure[m.sender].currentArea >= conn.adventure[m.sender].areas.length) {
            return m.reply("🏆 Du hast alle Abenteuergebiete abgeschlossen.");
        }
        return m.reply("⏳ Du hast noch ein Abenteuergebiet, das noch nicht beendet ist. Bitte beende es zuerst.");
    } else {
        if (text === 'start') {
            let adventures = createAdventures();

            if (!user) return m.reply("📝 Bitte registriere dich, um das Spiel zu spielen.");
            if (user.healt === 0 || user.Ausdauer === 0) return m.reply("❗ Deine Ausdauer/Gesundheit ist unter 100.");
            if (typeof user.exp !== "number") global.db.data.users[m.sender].exp = 0;
            if (typeof user.loot !== "object") global.db.data.users[m.sender].loot = { potion: 0, Diamant: 0, Gold: 0, Münzen: 0, limit: 0 };
            if (typeof user.lastGameTime !== "number") global.db.data.users[m.sender].kerjasatu = 0;

            const cooldown = 5 * 60 * 1000; // 5 Minuten Abklingzeit
            let timers = cooldown - (Date.now() - (user.kerjasatu || 0));
            if (timers > 0) return m.reply(`Bitte warte ${formatTime(timers)}, bevor du ein neues Abenteuer startest.`);

            let { area, txt, reward } = adventures[0]; // Start with the first area
            let currentArea = 0;
            let hasilPetualangan = 0;
            let totalReward = { potion: 0, Diamant: 0, Gold: 0, Münzen: 0, limit: 0 };

            conn.adventure[m.sender] = {
                areas: adventures,
                currentArea,
                hasilPetualangan,
                lastPetualanganTime: Date.now(),
                totalReward,
            };

            let caption = `🏞️ *ABENTEUERGEBIET:* ${area}\n\n🪓 Tippe *'${txt}'* um das Abenteuer in diesem Gebiet zu starten.\n🔍 Anzahl der erreichten Abenteuerergebnisse: ${hasilPetualangan}\n💰 Erhaltene Erfahrungspunkte: ${reward.exp}\n🎁 Erhaltene Beute: Trank: ${reward.loot.potion}, Diamant: ${reward.loot.Diamant}, Gold: ${reward.loot.Gold}, Münzen: ${reward.loot.Münzen}, Limit: ${reward.loot.limit}`;

            return m.reply(caption);
        } else {
            let instructions = "🏅 Herzlich willkommen beim Abenteuerspiel!\n";
            instructions += "Tippe *'abenteuer start'* um ein Abenteuer zu beginnen.\n";
            instructions += "Tippe *'stoppen'* um das Abenteuer zu beenden, während du spielst.";

            return m.reply(instructions);
        }
    }
}

handler.before = async m => {
    conn.adventure = conn.adventure || {};
    if (!(m.sender in conn.adventure)) return;
    if (m.isBaileys) return;

    let { areas, currentArea, hasilPetualangan, lastPetualanganTime, totalReward } = conn.adventure[m.sender];
    const cooldown = 5 * 60 * 1000; // 5 Minuten Abklingzeit
    let user = global.db.data.users[m.sender];

    let msg = m.text.toLowerCase();
    if (msg === 'stoppen') {
        m.reply("❌ Abenteuer wurde beendet. Tippe *'abenteuer start'* um das Abenteuer neu zu starten.");
        delete conn.adventure[m.sender];
        return false;
    } else if (currentArea < areas.length) {
        if (areas[currentArea].txt === msg) {
            let { area, reward } = areas[currentArea];
            user.exp += reward.exp;
            for (let Gegenstand in reward.loot) {
                user.loot[Gegenstand] += reward.loot[Gegenstand];
                totalReward[Gegenstand] += reward.loot[Gegenstand];
            }
            hasilPetualangan++;
            currentArea++;
            conn.adventure[m.sender].currentArea = currentArea;
            conn.adventure[m.sender].hasilPetualangan = hasilPetualangan;
            conn.adventure[m.sender].totalReward = totalReward;
            conn.adventure[m.sender].lastPetualanganTime = Date.now();

            if (currentArea >= areas.length) {
                m.reply(`🎉 Herzlichen Glückwunsch! Du hast alle Abenteuergebiete abgeschlossen.\nGesamte Abenteuerergebnisse: ${hasilPetualangan}\nErhaltene Erfahrungspunkte: ${reward.exp}\nGesamte erhaltene Beute: Trank: ${totalReward.potion}, Diamant: ${totalReward.Diamant}, Gold: ${totalReward.Gold}, Münzen: ${totalReward.Münzen}, Limit: ${totalReward.limit}`);
                delete conn.adventure[m.sender];
                return false;
            } else {
                let nextArea = areas[currentArea].area;
                let caption = `🏞️ *ABENTEUERGEBIET:* ${nextArea}\n\n🪓 Tippe *'${areas[currentArea].txt}'* um das Abenteuer in diesem Gebiet zu starten.\n🔍 Anzahl der erreichten Abenteuerergebnisse: ${hasilPetualangan}\n💰 Erhaltene Erfahrungspunkte: ${reward.exp}\n🎁 Erhaltene Beute: Trank: ${reward.loot.potion}, Diamant: ${reward.loot.Diamant}, Gold: ${reward.loot.Gold}, Münzen: ${reward.loot.Münzen}, Limit: ${reward.loot.limit}\n\n> Tippe *stoppen* um zu beenden`;
                m.reply(caption);
                return false;
            }
        }
    }
};

handler.help = ['abenteuer', 'adventure', 'erkunden'];
handler.tags = ['rpg'];
handler.command = /^(abenteuer|adventure|erkunden)$/i;
handler.group = true;
handler.limit = true;
handler.rpg = true;
handler.register = true;
module.exports = handler;