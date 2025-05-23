const fs = require('fs');
const dbPath = './lib/soccer_scores.json';

// Lade oder initialisiere Datenbank
let soccerDB = {};
if (fs.existsSync(dbPath)) {
  soccerDB = JSON.parse(fs.readFileSync(dbPath));
}

let handler = async (m, { conn, text, command }) => {
  const directions = ['Links', 'Mitte', 'Rechts'];
  const specialShots = ['Fallrückzieher', 'Lupfer', 'Direktschuss'];
  const user = m.sender;

  // Benutzerdaten vorbereiten
  soccerDB[user] = soccerDB[user] || { goals: 0, shots: 0 };
  
  if (!text) {
    // Menü zum Schießen
    await conn.sendMessage(m.chat, {
      text: '⚽️ Wähle die Richtung oder Spezialschuss:',
      footer: 'Wohin möchtest du schießen?',
      buttons: [
        { buttonId: '.soccer Links', buttonText: { displayText: '↩️ Links' }, type: 1 },
        { buttonId: '.soccer Mitte', buttonText: { displayText: '⬆️ Mitte' }, type: 1 },
        { buttonId: '.soccer Rechts', buttonText: { displayText: '↪️ Rechts' }, type: 1 },
        { buttonId: '.soccer Fallrückzieher', buttonText: { displayText: '⚡ Fallrückzieher' }, type: 1 },
        { buttonId: '.soccer Lupfer', buttonText: { displayText: '🎯 Lupfer' }, type: 1 },
        { buttonId: '.soccer Direktschuss', buttonText: { displayText: '🔥 Direktschuss' }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m });
  } else {
    text = text.trim();
    if (![...directions, ...specialShots].includes(text)) {
      return m.reply('Ungültige Auswahl! Bitte wähle: Links, Mitte, Rechts oder einen Spezialschuss.');
    }

    const goalkeeperChoice = directions[Math.floor(Math.random() * directions.length)];
    let result;
    let goal = false;

    if (directions.includes(text)) {
      // Normale Schüsse
      if (text === goalkeeperChoice) {
        result = `🧤 Der Torwart hat deinen Schuss nach *${text}* gehalten!`;
      } else {
        result = `⚽️ TOR! Dein Schuss nach *${text}* war erfolgreich! 🎉`;
        goal = true;
      }
    } else {
      // Spezialschüsse: höhere Erfolgschance
      if (Math.random() < 0.8) {
        result = `⚡ Spektakulärer *${text}*! TOR! Unglaublich schön! 🔥`;
        goal = true;
      } else {
        result = `😞 Dein *${text}* war leider zu schwach, der Torwart hält ihn.`;
      }
    }

    soccerDB[user].shots++;
    if (goal) soccerDB[user].goals++;

    fs.writeFileSync(dbPath, JSON.stringify(soccerDB));

    await conn.sendMessage(m.chat, {
      text: `Du hast *${text}* geschossen!\nTorwart sprang nach *${goalkeeperChoice}*.\n\n${result}\n\n⚽️ Tore: *${soccerDB[user].goals}* | Schüsse: *${soccerDB[user].shots}*`,
      contextInfo: {
        mentionedJid: [m.sender]
      }
    }, { quoted: m });

    // Tor-Animation bei Tor
    if (goal) {
      setTimeout(() => {
        conn.sendMessage(m.chat, { text: '🏃‍♂️⚽️💨 ➡️ 🥅 TOR!!!' }, { quoted: m });
      }, 1000);
    }
  }
};

handler.help = ['soccer'];
handler.tags = ['game', 'fun'];
handler.command = /^soccer(\s.+)?$/i;


module.exports = handler;