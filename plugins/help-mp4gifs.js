let handler = async (m, { conn, usedPrefix }) => {
    // Categories
    const emotionsGifs = [
        { command: 'mp4angry', desc: 'Zeigt, dass du wütend bist (MP4-Format)' },
        { command: 'mp4blush', desc: 'Zeigt, dass du errötist (MP4-Format)' },
        { command: 'mp4bored', desc: 'Zeigt, dass du gelangweilt bist (MP4-Format)' },
        { command: 'mp4confused', desc: 'Zeigt, dass du verwirrt bist (MP4-Format)' },
        { command: 'mp4cool', desc: 'Zeigt, dass du cool bist (MP4-Format)' },
        { command: 'mp4disgusted', desc: 'Zeigt, dass du angewidert bist (MP4-Format)' },
        { command: 'mp4excited', desc: 'Zeigt, dass du aufgeregt bist (MP4-Format)' },
        { command: 'mp4greedy', desc: 'Zeigt, dass du gierig bist (MP4-Format)' },
        { command: 'mp4happy', desc: 'Zeigt, dass du glücklich bist (MP4-Format)' },
        { command: 'mp4horny', desc: 'Zeigt, dass du geil bist (MP4-Format)' },
        { command: 'mp4hungry', desc: 'Zeigt, dass du hungrig bist (MP4-Format)' },
        { command: 'mp4jealous', desc: 'Zeigt, dass du eifersüchtig bist (MP4-Format)' },
        { command: 'mp4laugh', desc: 'Zeigt, dass du lachst (MP4-Format)' },
        { command: 'mp4nervous', desc: 'Zeigt, dass du nervös bist (MP4-Format)' },
        { command: 'mp4panic', desc: 'Zeigt, dass du in Panik bist (MP4-Format)' },
        { command: 'mp4proud', desc: 'Zeigt, dass du stolz bist (MP4-Format)' },
        { command: 'mp4sad', desc: 'Zeigt, dass du traurig bist (MP4-Format)' },
        { command: 'mp4scared', desc: 'Zeigt, dass du ängstlich bist (MP4-Format)' },
        { command: 'mp4shock', desc: 'Zeigt, dass du geschockt bist (MP4-Format)' },
        { command: 'mp4shy', desc: 'Zeigt, dass du schüchtern bist (MP4-Format)' },
        { command: 'mp4sleepy', desc: 'Zeigt, dass du schläfrig bist (MP4-Format)' },
        { command: 'mp4smile', desc: 'Zeigt, dass du lächelst (MP4-Format)' },
        { command: 'mp4surprised', desc: 'Zeigt, dass du überrascht bist (MP4-Format)' },
        { command: 'mp4tired', desc: 'Zeigt, dass du müde bist (MP4-Format)' },
        { command: 'mp4wink', desc: 'Zeigt, dass du zwinkerst (MP4-Format)' }
    ];

    const actionsGifs = [
        { command: 'mp4bite @user', desc: 'Beißt den markierten Benutzer (MP4-Format)' },
        { command: 'mp4bonk @user', desc: 'Bonkt den markierten Benutzer (MP4-Format)' },
        { command: 'mp4cuddle @user', desc: 'Kuschelt mit dem markierten Benutzer (MP4-Format)' },
        { command: 'mp4dance', desc: 'Tanzt fröhlich (MP4-Format)' },
        { command: 'mp4facepalm', desc: 'Zeigt einen Facepalm (MP4-Format)' },
        { command: 'mp4fuck @user', desc: 'NSFW Aktion mit dem markierten Benutzer (MP4-Format)' },
        { command: 'mp4highfive @user', desc: 'Gibt dem markierten Benutzer ein High Five (MP4-Format)' },
        { command: 'mp4hug @user', desc: 'Umarmt den markierten Benutzer (MP4-Format)' },
        { command: 'mp4kill @user', desc: 'Tötet den markierten Benutzer (im Spaß) (MP4-Format)' },
        { command: 'mp4kiss @user', desc: 'Küsst den markierten Benutzer (MP4-Format)' },
        { command: 'mp4pat @user', desc: 'Streichelt den markierten Benutzer (MP4-Format)' },
        { command: 'mp4poke @user', desc: 'Stupst den markierten Benutzer an (MP4-Format)' },
        { command: 'mp4punch @user', desc: 'Schlägt den markierten Benutzer (MP4-Format)' },
        { command: 'mp4slap @user', desc: 'Ohrfeigt den markierten Benutzer (MP4-Format)' },
        { command: 'mp4wave', desc: 'Winkt den anderen zu (MP4-Format)' },
        { command: 'mp4yeet @user', desc: 'Yeet den markierten Benutzer (MP4-Format)' }
    ];

    // Create message header
    let message = `
╭─「 🎬 *MP4-GIF-BEFEHLE* 🎬 」
│
│ Hier sind alle verfügbaren MP4-GIF-Befehle:
│ Diese funktionieren genauso wie normale GIF-Befehle,
│ aber werden als Video gesendet, was besser in WhatsApp angezeigt wird.
│ Nutze sie mit ${usedPrefix}befehl oder ${usedPrefix}befehl @user
╰────

╭─「 😊 *EMOTIONEN (MP4)* 😊 」
│`;

    // Add emotion commands to message
    emotionsGifs.forEach(gif => {
        message += `\n│ • ${usedPrefix}${gif.command} - ${gif.desc}`;
    });

    message += `\n╰────

╭─「 🎬 *AKTIONEN (MP4)* 🎬 」
│`;

    // Add action commands to message
    actionsGifs.forEach(gif => {
        message += `\n│ • ${usedPrefix}${gif.command} - ${gif.desc}`;
    });

    message += `\n╰────

*Hinweis:* 
- Bei Aktionen mit @user kannst du optional einen Benutzer markieren oder auf eine Nachricht antworten
- Wenn du keinen Benutzer markierst, wird eine zufällige Person die Aktion an dir ausführen
- MP4-GIFs werden besser in WhatsApp angezeigt als normale GIFs
- Beispiel: .mp4hug (ohne Mention) → "Hans umarmt dich", .mp4hug @user → "Du umarmst @user"`;

    // Send the message
    await m.reply(message);
};

handler.help = ['mp4gifhelp', 'mp4gifs'];
handler.tags = ['info'];
handler.command = /^(mp4gifhelp|mp4gifs)$/i;

module.exports = handler;