let handler = async (m, { conn, usedPrefix }) => {
    // Create a help message for direct GIFs
    const message = `
╭─「 🎬 *DIREKTE GIF-BEFEHLE* 🎬 」
│ Direkte GIFs werden als Bilder gesendet, nicht als Sticker oder Video!
│
│ *EMOTIONEN:*
│ • ${usedPrefix}dgangry - Wütend sein
│ • ${usedPrefix}dgblush - Erröten
│ • ${usedPrefix}dgbored - Gelangweilt sein
│ • ${usedPrefix}dgconfused - Verwirrt sein
│ • ${usedPrefix}dgdisgusted - Angewidert sein
│ • ${usedPrefix}dgexcited - Aufgeregt sein
│ • ${usedPrefix}dggreedy - Gierig sein
│ • ${usedPrefix}dghappy - Glücklich sein
│ • ${usedPrefix}dghorny - Geil sein
│ • ${usedPrefix}dghungry - Hungrig sein
│ • ${usedPrefix}dgjealous - Eifersüchtig sein
│ • ${usedPrefix}dgnervous - Nervös sein
│ • ${usedPrefix}dgpanic - In Panik sein
│ • ${usedPrefix}dgproud - Stolz sein
│ • ${usedPrefix}dgsad - Traurig sein
│ • ${usedPrefix}dgscared - Ängstlich sein
│ • ${usedPrefix}dgshock - Geschockt sein
│ • ${usedPrefix}dgshy - Schüchtern sein
│ • ${usedPrefix}dgsleepy - Schläfrig sein
│ • ${usedPrefix}dgsurprised - Überrascht sein
│ • ${usedPrefix}dgtired - Müde sein
│
│ *AKTIONEN:*
│ • ${usedPrefix}dgbonk - Bonken
│ • ${usedPrefix}dgcool - Cool sein
│ • ${usedPrefix}dgdance - Tanzen
│ • ${usedPrefix}dgfacepalm - Facepalmen
│ • ${usedPrefix}dglaugh - Lachen
│ • ${usedPrefix}dgsmile - Lächeln
│ • ${usedPrefix}dgwave - Winken
│ • ${usedPrefix}dgwink - Zwinkern
│ • ${usedPrefix}dgyeet - Yeeten
│
│ *SOZIALE INTERAKTIONEN:*
│ • ${usedPrefix}dgbite @user - Jemanden beißen
│ • ${usedPrefix}dgcuddle @user - Mit jemandem kuscheln
│ • ${usedPrefix}dgfuck @user - Mit jemandem ficken
│ • ${usedPrefix}dghighfive @user - Jemandem ein High Five geben
│ • ${usedPrefix}dghug @user - Jemanden umarmen
│ • ${usedPrefix}dgkill @user - Jemanden töten
│ • ${usedPrefix}dgkiss @user - Jemanden küssen
│ • ${usedPrefix}dgpat @user - Jemanden streicheln
│ • ${usedPrefix}dgpoke @user - Jemanden anstupsen
│ • ${usedPrefix}dgpunch @user - Jemanden schlagen
│ • ${usedPrefix}dgslap @user - Jemanden ohrfeigen
│
│ *HINWEIS:*
│ • Bei sozialen Aktionen kannst du einen Benutzer markieren oder auf eine Nachricht antworten
│ • Wenn du keinen Benutzer markierst, führst du die Aktion an dir selbst aus
│ • Beispiel: ${usedPrefix}dghug (ohne Mention) → "Martin umarmt sich selbst"
│ • Mit Mention: ${usedPrefix}dghug @user → "Martin umarmt @user"
│
│ *UNTERSCHIED ZU REGULÄREN GIF-BEFEHLEN:*
│ Die Direktbefehle (mit "dg" Präfix) senden das GIF immer als Bild und nicht als Sticker oder Video.
╰────────────────────`

    // Send the help message
    await conn.sendMessage(m.chat, {
        image: { url: './src/BLACKSKY-MD.png' },
        caption: message
    }, { quoted: m });
}

handler.help = ['directgifs', 'dggifs', 'gifhelp']
handler.tags = ['help', 'main']
handler.command = /^(directgifs|dggifs|gifhelp)$/i

module.exports = handler