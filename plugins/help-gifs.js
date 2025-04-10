let handler = async (m, { conn, usedPrefix }) => {
    // Categories
    const emotionsGifs = [
        { command: 'angry', desc: 'Zeigt, dass du wütend bist' },
        { command: 'blush', desc: 'Zeigt, dass du errötist' },
        { command: 'bored', desc: 'Zeigt, dass du gelangweilt bist' },
        { command: 'confused', desc: 'Zeigt, dass du verwirrt bist' },
        { command: 'cool', desc: 'Zeigt, dass du cool bist' },
        { command: 'disgusted', desc: 'Zeigt, dass du angewidert bist' },
        { command: 'excited', desc: 'Zeigt, dass du aufgeregt bist' },
        { command: 'greedy', desc: 'Zeigt, dass du gierig bist' },
        { command: 'happy', desc: 'Zeigt, dass du glücklich bist' },
        { command: 'horny', desc: 'Zeigt, dass du geil bist' },
        { command: 'hungry', desc: 'Zeigt, dass du hungrig bist' },
        { command: 'jealous', desc: 'Zeigt, dass du eifersüchtig bist' },
        { command: 'laugh', desc: 'Zeigt, dass du lachst' },
        { command: 'nervous', desc: 'Zeigt, dass du nervös bist' },
        { command: 'panic', desc: 'Zeigt, dass du in Panik bist' },
        { command: 'proud', desc: 'Zeigt, dass du stolz bist' },
        { command: 'sad', desc: 'Zeigt, dass du traurig bist' },
        { command: 'scared', desc: 'Zeigt, dass du ängstlich bist' },
        { command: 'shock', desc: 'Zeigt, dass du geschockt bist' },
        { command: 'shy', desc: 'Zeigt, dass du schüchtern bist' },
        { command: 'sleepy', desc: 'Zeigt, dass du schläfrig bist' },
        { command: 'smile', desc: 'Zeigt, dass du lächelst' },
        { command: 'surprised', desc: 'Zeigt, dass du überrascht bist' },
        { command: 'tired', desc: 'Zeigt, dass du müde bist' },
        { command: 'wink', desc: 'Zeigt, dass du zwinkerst' }
    ];

    const actionsGifs = [
        { command: 'bite @user', desc: 'Beißt den markierten Benutzer' },
        { command: 'bonk @user', desc: 'Bonkt den markierten Benutzer' },
        { command: 'cuddle @user', desc: 'Kuschelt mit dem markierten Benutzer' },
        { command: 'dance', desc: 'Tanzt fröhlich' },
        { command: 'facepalm', desc: 'Zeigt einen Facepalm' },
        { command: 'fuck @user', desc: 'NSFW Aktion mit dem markierten Benutzer' },
        { command: 'highfive @user', desc: 'Gibt dem markierten Benutzer ein High Five' },
        { command: 'hug @user', desc: 'Umarmt den markierten Benutzer' },
        { command: 'kill @user', desc: 'Tötet den markierten Benutzer (im Spaß)' },
        { command: 'kiss @user', desc: 'Küsst den markierten Benutzer' },
        { command: 'pat @user', desc: 'Streichelt den markierten Benutzer' },
        { command: 'poke @user', desc: 'Stupst den markierten Benutzer an' },
        { command: 'punch @user', desc: 'Schlägt den markierten Benutzer' },
        { command: 'slap @user', desc: 'Ohrfeigt den markierten Benutzer' },
        { command: 'wave', desc: 'Winkt den anderen zu' },
        { command: 'yeet @user', desc: 'Yeet den markierten Benutzer' }
    ];

    // Create message header
    let message = `
╭─「 🎭 *GIF-BEFEHLE* 🎭 」
│
│ Hier sind alle verfügbaren GIF-Befehle:
│ Nutze sie mit ${usedPrefix}befehl oder ${usedPrefix}befehl @user
╰────

╭─「 😊 *EMOTIONEN* 😊 」
│`;

    // Add emotion commands to message
    emotionsGifs.forEach(gif => {
        message += `\n│ • ${usedPrefix}${gif.command} - ${gif.desc}`;
    });

    message += `\n╰────

╭─「 🎬 *AKTIONEN* 🎬 」
│`;

    // Add action commands to message
    actionsGifs.forEach(gif => {
        message += `\n│ • ${usedPrefix}${gif.command} - ${gif.desc}`;
    });

    message += `\n╰────

╭─「 👥 *GRUPPENAKTIONEN* 👥 」
│ Nur für Admins & Besitzer!
│`;

    // Define group actions
    const groupActions = [
        { command: 'hugall [text]', desc: 'Umarmt alle in der Gruppe' },
        { command: 'biteall [text]', desc: 'Beißt alle in der Gruppe' },
        { command: 'cuddleall [text]', desc: 'Kuschelt mit allen in der Gruppe' },
        { command: 'kissall [text]', desc: 'Küsst alle in der Gruppe' },
        { command: 'patall [text]', desc: 'Streichelt alle in der Gruppe' },
        { command: 'pokeall [text]', desc: 'Stupst alle in der Gruppe an' },
        { command: 'punchall [text]', desc: 'Schlägt alle in der Gruppe' },
        { command: 'slapall [text]', desc: 'Ohrfeigt alle in der Gruppe' },
        { command: 'highfiveall [text]', desc: 'Gibt allen in der Gruppe ein High Five' },
        { command: 'killall [text]', desc: 'Tötet alle in der Gruppe (im Spaß)' },
        { command: 'waveall [text]', desc: 'Winkt allen in der Gruppe zu' },
        { command: 'danceall [text]', desc: 'Tanzt für alle in der Gruppe' },
        { command: 'happyall [text]', desc: 'Ist glücklich mit allen in der Gruppe' },
        { command: 'laughall [text]', desc: 'Lacht mit allen in der Gruppe' },
        { command: 'smileall [text]', desc: 'Lächelt allen in der Gruppe zu' },
        { command: 'winkall [text]', desc: 'Zwinkert allen in der Gruppe zu' }
    ];

    // Add group action commands to message
    groupActions.forEach(gif => {
        message += `\n│ • ${usedPrefix}${gif.command} - ${gif.desc}`;
    });

    message += `\n╰────

*Hinweis:* 
- Bei Aktionen mit @user kannst du optional einen Benutzer markieren oder auf eine Nachricht antworten
- Wenn du keinen Benutzer markierst, führst du die Aktion an dir selbst aus
- Beispiel: .hug (ohne Mention) → "Martin umarmt sich selbst", .hug @user → "Martin umarmt @user"
- Die Gruppenaktionen funktionieren auch mit deutschen Befehlen wie .umarmenalle, .küssenalle, usw.`;

    // Send the message
    await m.reply(message);
};

handler.help = ['gifhelp', 'gifbefehle', 'gifs'];
handler.tags = ['info'];
handler.command = /^(gifhelp|gifbefehle|gifs)$/i;

module.exports = handler;