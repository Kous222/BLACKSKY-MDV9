let handler = async (m, { conn }) => {
  const songs = [
    { zeile: "Ich heb ab, nichts hält mich am Boden...", antwort: "Andreas Bourani – Auf uns" },
    { zeile: "Atemlos durch die Nacht...", antwort: "Helene Fischer – Atemlos" },
    { zeile: "Nur noch kurz die Welt retten...", antwort: "Tim Bendzko – Nur noch kurz die Welt retten" },
    { zeile: "Was soll das bedeuten, das ich so traurig bin...", antwort: "Die Gedanken sind frei" },
    { zeile: "Marmor, Stein und Eisen bricht...", antwort: "Drafi Deutscher – Marmor, Stein und Eisen bricht" },
    { zeile: "Ich war noch niemals in New York...", antwort: "Udo Jürgens – Ich war noch niemals in New York" },
    { zeile: "Verdammt, ich lieb’ dich, ich lieb’ dich nicht...", antwort: "Matthias Reim – Verdammt, ich lieb’ dich" },
    { zeile: "Major Tom grüßt seine Frau...", antwort: "Peter Schilling – Major Tom" },
    { zeile: "Hulapalu, was ist denn das...", antwort: "Andreas Gabalier – Hulapalu" },
    { zeile: "Ein Bett im Kornfeld ist immer frei...", antwort: "Jürgen Drews – Ein Bett im Kornfeld" },
    { zeile: "Du hast, du hast mich...", antwort: "Rammstein – Du hast" },
    { zeile: "Weißt du wieviel Sternlein stehen...", antwort: "Kinderlied – Sternlein" },
    { zeile: "Ich will keine Schokolade...", antwort: "Trude Herr – Ich will keine Schokolade" },
    { zeile: "Die Gedanken sind frei...", antwort: "Volkslied – Die Gedanken sind frei" },
    { zeile: "Ich brauch Tapetenwechsel...", antwort: "Ich + Ich – Vom selben Stern" },
    { zeile: "Ein Hoch auf uns, auf dieses Leben...", antwort: "Andreas Bourani – Auf uns" },
    { zeile: "Ich geh in Flammen auf...", antwort: "Juli – Perfekte Welle" },
    { zeile: "Ich hab geträumt von dir...", antwort: "Klaus Lage – 1000 und 1 Nacht" },
    { zeile: "Leuchtturm, ich wär’ so gern bei dir...", antwort: "Nena – Leuchtturm" },
    { zeile: "99 Luftballons auf ihrem Weg zum Horizont...", antwort: "Nena – 99 Luftballons" },
    { zeile: "Ich liebe das Leben...", antwort: "Vicky Leandros – Ich liebe das Leben" },
    { zeile: "Ohne dich schlaf ich heut Nacht nicht ein...", antwort: "Münchener Freiheit – Ohne dich" },
    { zeile: "Westerland, oh ich will zurück nach Westerland...", antwort: "Die Ärzte – Westerland" },
    { zeile: "Haus am See, ich hab’n Haus, ein Äffchen und ein Pferd...", antwort: "Peter Fox – Haus am See" },
    { zeile: "Eiszeit, hey, hey, hey, es ist Eiszeit...", antwort: "Ideal – Eiszeit" },
    { zeile: "Tage wie diese, dass ein Ende nicht in Sicht ist...", antwort: "Die Toten Hosen – Tage wie diese" },
    { zeile: "Willkommen in meinem Leben, schön, dass du da bist...", antwort: "Revolverheld – Ich lass für dich das Licht an" },
    { zeile: "Ich bin Ich, und du bist du...", antwort: "Rosenstolz – Ich bin ich" },
  ];

  const random = songs[Math.floor(Math.random() * songs.length)];
  conn.songquiz = conn.songquiz || {};
  conn.songquiz[m.chat] = {
    antwort: random.antwort.toLowerCase(),
    timeout: setTimeout(() => delete conn.songquiz[m.chat], 60_000)
  };

  m.reply(`🎵 *Songtext-Quiz*\n\nWelcher Song stammt aus folgender Zeile?\n\n_"${random.zeile}"_\n\n*Du hast 60 Sekunden Zeit!*`);
};

handler.command = ['songquiz'];
handler.help = ['songquiz'];
handler.tags = ['game'];

module.exports = handler;