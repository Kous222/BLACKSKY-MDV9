const moment = require('moment-timezone');

let handler = async (m, { text, conn, usedPrefix, command }) => {
    try {
        if (!text) {
            return m.reply(`╭═══❯ *TRAUMWELT-ERKUNDER* ❮═══
│
│ 🌙 Erkunde deine Traumwelt!
│ 
│ 📝 *Format:*
│ ${usedPrefix}${command} [Name/Schlüsselwort]
│
│ 📌 *Beispiel:*
│ ${usedPrefix}${command} Raiden
│ ${usedPrefix}${command} Meer
│
╰═════════════════════`);
        }

        await m.reply("🌙 *Betrete die Traumwelt...*");
        await new Promise(resolve => setTimeout(resolve, 1500));
        await m.reply("✨ *Sammle Traumessenzen...*");
        await new Promise(resolve => setTimeout(resolve, 1500));

        const dreamData = generateDreamWorld(text);
        const dreamInterpretation = interpretDream(dreamData);

        const caption = `╭═══❯ *TRAUMWELT* ❮═══
│
│ 👤 *Erkunder:* ${text}
│ 🌙 *Traumstufe:* ${dreamData.Stufe}
│ 🎭 *Traumkern:*
│ ${dreamData.core}
│ 🌈 *Traumelemente:*
│ ${dreamData.elements.join('\n│ ')}
│ 🎪 *Traumereignisse:*
│ ${dreamData.events.join('\n│ ')}
│ 🌟 *Besondere Begegnungen:*
│ ${dreamData.encounters.join('\n│ ')}
│ 💫 *Traumkräfte:*
│ ${dreamData.powers.join('\n│ ')}
│ 🔮 *Traumbotschaft:*
│ ${dreamData.message}
│ 📝 *Traumdeutung:*
│ ${dreamInterpretation}
│
╰═════════════════════

🎯 *Traumqualität:* ${dreamData.quality}
⏰ *Traumzeit:* ${moment().tz('Europe/Berlin').format('HH:mm:ss')}`;

        return m.reply(caption);

    } catch (error) {
        console.error('Error in dreamworld command:', error);
        return m.reply(`╭══════════════════════
│ ❌ *Ein Fehler ist aufgetreten*
│ Bitte versuche es später noch einmal
╰══════════════════════`);
    }
};

function generateDreamWorld(seed) {
    const dreamLevels = ['Luzid ✨', 'Mystisch 🌟', 'Ätherisch 💫', 'Göttlich 🌙', 'Legendär 🎇'];
    const dreamQualities = ['Friedliche Träume 😌', 'Abenteuerträume 🚀', 'Mystische Vision 🔮', 'Prophetische Träume 📖', 'Epische Reise 🗺️'];

    const elementsList = [
        '🌊 Leuchtender Kristallozean',
        '🌈 Schwebender Regenbogen',
        '🌺 Schwebende Gärten',
        '⭐ Lebendige Konstellationen',
        '🌙 Zwillingsmonde',
        '🎪 Dimensionszirkus',
        '🏰 Wolkenschloss',
        '🌋 Prismaberg',
        '🎭 Schattentheater',
        '🎪 Zeitportal'
    ];

    const eventsList = [
        '🦋 Schmetterlinge überbringen geheime Botschaften',
        '🎭 Masken tanzen von selbst',
        '🌊 Sternschnuppenregen fällt ins Meer',
        '🎪 Parade magischer Wesen',
        '🌺 Blumen singen alte Lieder',
        '🎨 Gemälde werden lebendig',
        '🎵 Musik erscheint als Farben',
        '⚡ Blitze formen eine Treppe zum Himmel',
        '🌈 Regenbogen verwandelt sich in eine Brücke',
        '🕰️ Zeit dreht sich rückwärts'
    ];

    const encountersList = [
        '🐉 Weiser Regenbogendrache',
        '🧙‍♂️ Sternenzauberer',
        '🦊 Neunschweifiger Geisterfuchs',
        '🧝‍♀️ Traumüberbringende Fee',
        '🦁 Kristalllöwe',
        '🐋 Mystischer fliegender Wal',
        '🦅 Zeitphönix',
        '🐢 Weltentragende Schildkröte',
        '🦄 Dimensionseinhorn',
        '👻 Beschützergeist'
    ];

    const powersList = [
        '✨ Zeit kontrollieren',
        '🌊 Mit Elementen sprechen',
        '🎭 Gestaltwandlung',
        '🌈 Realitätsmanipulation',
        '👁️ Zukunftsvisionen',
        '🎪 Dimensionsteleportation',
        '🌙 Spirituelle Heilung',
        '⚡ Kosmische Energie',
        '🎨 Sofortige Schöpfung',
        '💫 Universelle Telepathie'
    ];

    const messagesList = [
        'Deine Reise wird große Veränderungen bringen',
        'Alte Geheimnisse werden bald enthüllt',
        'Verborgene Kraft wird bald erwachen',
        'Ein neues Schicksal wartet am Horizont',
        'Spirituelle Verbindungen werden stärker',
        'Eine große Transformation wird geschehen',
        'Erleuchtung wird aus unerwarteter Richtung kommen',
        'Eine wichtige Mission wird bald beginnen',
        'Gute Vorzeichen auf deinem Lebensweg',
        'Neue Weisheit wird gefunden'
    ];

    // Generate random but consistent results based on seed
    const seedNum = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const randomize = (arr) => arr[Math.floor((seedNum * arr.length) / 1000) % arr.length];
    const randomMultiple = (arr, count) => {
        const shuffled = [...arr].sort(() => (seedNum * 0.5) - 0.5);
        return shuffled.slice(0, count);
    };

    return {
        Stufe: randomize(dreamLevels),
        quality: randomize(dreamQualities),
        core: generateDreamCore(seed),
        elements: randomMultiple(elementsList, 3),
        events: randomMultiple(eventsList, 3),
        encounters: randomMultiple(encountersList, 2),
        powers: randomMultiple(powersList, 2),
        message: randomize(messagesList)
    };
}

function generateDreamCore(seed) {
    const cores = [
        '🌌 Mystische Parallelwelt',
        '🎪 Reich der Zwischenwunder',
        '🌙 Silberlichtdimension',
        '✨ Schwebende Kristallwelt',
        '🌈 Reich des ewigen Regenbogens',
        '🎭 Traumrealitätstheater',
        '⚡ Mysteriöse Zeitzone',
        '🌺 Magischer Garten Eden',
        '🌊 Mystischer Sternenozean',
        '🏰 Glitzernder Wolkenpalast'
    ];
    
    return cores[Math.floor((Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0) * cores.length) / 1000) % cores.length];
}

function interpretDream(dreamData) {
    const interpretations = [
        'Dieser Traum zeigt ein außergewöhnliches kreatives Potenzial in dir',
        'Eine bedeutungsvolle spirituelle Reise wird bald beginnen',
        'Verborgene Kraft in dir wird enthüllt werden',
        'Eine Zeit großer Transformation nähert sich',
        'Eine besondere Beziehung wird sich in naher Zukunft bilden',
        'Ein erstaunliches neues Abenteuer wartet',
        'Alte Weisheit wird dir neue Wege eröffnen',
        'Ein besonderes Schicksal bewegt sich in deine Richtung',
        'Eine wichtige Lebensmission wird bald enthüllt',
        'Spirituelle Erleuchtung wird in unerwarteter Form kommen'
    ];

    const seedValue = dreamData.Stufe + dreamData.core;
    return interpretations[Math.floor((Array.from(seedValue).reduce((acc, char) => acc + char.charCodeAt(0), 0) * interpretations.length) / 1000) % interpretations.length];
}

// Metadata command
handler.help = ['traumwelt', 'traum', 'träume', 'traumexp'];
handler.tags = ['spaß'];
handler.command = /^traumwelt|traum|träume|mimpi$/i;
handler.group = true;
handler.limit = 1;

module.exports = handler;