let handler = async (m, { text, usedPrefix, command }) => {
  try {
    let result = await partner();
    let teks = `- Partner \`@${m.quoted ? m.quoted.sender.split("@")[0] : m.sender.split("@")[0]}\` : ${result.rasse}\n\n *Hautfarbe* : ${result.hautfarbe}\n *Haarfarbe* : ${result.haarfarbe}\n *Erklärung* : ${result.beschreibung}`;

    if (m.key.fromMe) {
      await m.reply(teks, { bearbeiten: m.key, mentions: [m.quoted ? m.quoted.sender : m.sender] });
    } else {
      await m.reply(teks);
    }
  } catch (e) {
    console.error(e);
  }
};

handler.command = handler.help = ['partnercheck', 'meinpartner', 'partner'];
handler.tags = ['spaß'];
handler.limit = true;

module.exports = handler;

async function partner() {
  const partnerDaten = [
    { rasse: "Deutsch", hautfarbe: "Hell", haarfarbe: "Blond", beschreibung: "Du wirst einen organisierten und pünktlichen Partner aus Deutschland bekommen. Achte auf Zuverlässigkeit, um sein/ihr Herz zu gewinnen." },
    { rasse: "Französisch", hautfarbe: "Hell", haarfarbe: "Braun", beschreibung: "Du wirst einen romantischen und kulinarisch begabten Partner aus Frankreich bekommen. Schätze die kleinen Dinge des Lebens mit ihm/ihr." },
    { rasse: "Italienisch", hautfarbe: "Mittel", haarfarbe: "Dunkelbraun", beschreibung: "Leidenschaftlich und familienorientiert - dein zukünftiger Partner wird das Leben mit Freude und gutem Essen füllen." },
    { rasse: "Spanisch", hautfarbe: "Olive", haarfarbe: "Schwarz", beschreibung: "Lebensfroh, gesellig und warmherzig - das ist, was du mit diesem Partner erleben wirst." },
    { rasse: "Skandinavisch", hautfarbe: "Hell", haarfarbe: "Blond", beschreibung: "Dieser Partner ist ausgeglichen, naturverbunden und schätzt Gleichberechtigung in der Beziehung." },
    { rasse: "Schweizer", hautfarbe: "Hell", haarfarbe: "Braun", beschreibung: "Du wirst einen zuverlässigen und beständigen Partner aus einem der schönsten Länder Europas bekommen." },
    { rasse: "Niederländisch", hautfarbe: "Hell", haarfarbe: "Blond", beschreibung: "Der Partner, den du bekommen wirst, ist direkt, pragmatisch und hat einen guten Sinn für Humor." },
    { rasse: "Britisch", hautfarbe: "Hell", haarfarbe: "Braun", beschreibung: "Höflich, mit trockenem Humor und Liebe zum Tee - wenn du jemanden mit Charme suchst, ist dies dein Partner." },
  ];

  const partnerIndex = Math.floor(Math.random() * partnerDaten.length);
  const partnerInfo = partnerDaten[partnerIndex];

  return {
    rasse: partnerInfo.rasse,
    hautfarbe: partnerInfo.hautfarbe,
    haarfarbe: partnerInfo.haarfarbe,
    beschreibung: partnerInfo.beschreibung,
  };
}