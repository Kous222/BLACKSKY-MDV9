const schaetzfragen = [
  { frage: "Wie viele Liter Wasser passen in einen Elefantenrüssel?", antwort: 10 },
  { frage: "Wie viele Knochen hat ein Mensch?", antwort: 206 },
  { frage: "Wie viele Kalorien hat ein Big Mac?", antwort: 550 },
  { frage: "Wie lang ist der Amazonas (in km)?", antwort: 6400 },
  { frage: "Wie viele Wörter spricht ein Mensch durchschnittlich am Tag?", antwort: 16000 },
  { frage: "Wie alt wurde der älteste Mensch laut Guinness?", antwort: 122 },
  { frage: "Wie viele Planeten gibt es im Sonnensystem?", antwort: 8 },
  { frage: "Wie viele Sekunden hat ein Tag?", antwort: 86400 },
  { frage: "Wie viele PS hat ein Formel-1-Wagen?", antwort: 1000 },
  { frage: "Wie viele Einwohner hat Tokio (ca., Stand 2023)?", antwort: 37400000 }
];

let aktiveSchaetzung = {}; // Speichert laufende Runden pro Gruppe

let handler = async (m, { conn, command }) => {
  const chatId = m.chat;

  if (aktiveSchaetzung[chatId]) {
    return m.reply("❗ Es läuft bereits eine Schätzrunde. Warte auf die Auflösung!");
  }

  const frageObjekt = schaetzfragen[Math.floor(Math.random() * schaetzfragen.length)];
  const frage = frageObjekt.frage;
  const richtigeAntwort = frageObjekt.antwort;

  aktiveSchaetzung[chatId] = {
    frage,
    antwort: richtigeAntwort,
    start: Date.now(),
    antworten: []
  };

  await conn.sendMessage(chatId, {
    text: `🎯 *SCHÄTZFRAGE!*\n\n${frage}\n\n⏳ Ihr habt *30 Sekunden*! Antwortet einfach mit einer Zahl im Chat.`
  });

  setTimeout(async () => {
    const runde = aktiveSchaetzung[chatId];
    if (!runde) return;

    const besteAntwort = runde.antworten.sort((a, b) => {
      return Math.abs(a.wert - runde.antwort) - Math.abs(b.wert - runde.antwort);
    })[0];

    let ergebnis = `⏰ *Zeit ist um!*\n\n✅ Die richtige Antwort war: *${runde.antwort}*\n`;

    if (besteAntwort) {
      ergebnis += `\n🏆 *Sieger:* @${besteAntwort.user.split("@")[0]} mit *${besteAntwort.wert}*`;
    } else {
      ergebnis += "\n😢 Niemand hat eine gültige Zahl gesendet.";
    }

    await conn.sendMessage(chatId, {
      text: ergebnis,
      mentions: besteAntwort ? [besteAntwort.user] : []
    });

    delete aktiveSchaetzung[chatId];
  }, 30000);
};

// Antwort-Handler: erkennt, wenn jemand während der Runde eine Zahl sendet
handler.before = async (m) => {
  const chatId = m.chat;
  const runde = aktiveSchaetzung[chatId];
  if (!runde) return;

  const zahl = parseFloat(m.text);
  if (isNaN(zahl)) return;

  const hatSchon = runde.antworten.find(a => a.user === m.sender);
  if (hatSchon) return;

  runde.antworten.push({ user: m.sender, wert: zahl });
};

handler.command = ['schätzung'];
handler.help = ['schätzung'];
handler.tags = ['game'];
handler.group = true; // Nur in Gruppen erlaubt

module.exports = handler;