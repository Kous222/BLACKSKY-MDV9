let handler = async (m, { conn, text }) => {
  const userId = m.sender;
  const user = global.db.data.users[userId];
  const lastDate = user.lastdate || 0;
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastDate;

  if (timeDiff < 600000) {
    const remainingTime = 600000 - timeDiff;
    conn.reply(m.chat, `Sie müssen ${remainingTime / 1000} Sekunden warten, bevor Sie wieder ein Date beginnen können. ⏳`, m);
    return;
  }

  if (text) {
    const selectedCharacterIndex = parseInt(text) - 1;
    const characterOptions = getCharacterOptions();

    if (selectedCharacterIndex >= 0 && selectedCharacterIndex < characterOptions.length) {
      const selectedCharacter = characterOptions[selectedCharacterIndex];
      const partnerName = selectedCharacter;
      const dateLocation = generateRandomLocation();
      const dateInfo = `
💑 *Date-Informationen* 💑
👤 Partner-Name: ${partnerName}
📍 Date-Ort: ${dateLocation}
      `;

      setTimeout(() => {
        let ending = "Ein glückliches Ende";
        conn.reply(m.chat, `Date beendet!\n\n${dateInfo}\n\n${ending}`, m);
      }, 30000);

      conn.reply(m.chat, `Sie sind gerade auf einem Date mit ${partnerName}!\n\n${dateInfo}`, m);

      user.lastdate = currentTime;
    } else {
      conn.reply(m.chat, 'Ausgewählter Charakter ist ungültig. Date wurde abgebrochen.', m);
    }
  } else {
    const characterList = getCharacterOptions().map((char, index) => `${index + 1}. ${char}`).join('\n');
    conn.reply(m.chat, `Bitte wählen Sie einen Charakter mit dem Format .dating [Charakter-Nummer].\n\nCharakterliste:\n${characterList}`, m);
  }
};

handler.help = ['dating', 'date', 'charakter'];
handler.tags = ['rpg'];
handler.command = /^(dating|date|charakter)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true

module.exports = handler;

function getCharacterOptions() {
  return [
    'Sakura', 'Asuna', 'Mikasa', 'Kagome', 'Saber',
    'Rei', 'Rem', 'Mio', 'Erza', 'Haruhi',
    'Lucy', 'Nami', 'Hinata', 'Rias', 'Rukia',
    'Inori', 'Zero Two', 'Nanami', 'Nezuko', 'Holo', 'Axel',
  ];
}

function generateRandomLocation() {
  const locations = ['Park', 'Strand', 'Café', 'Museum', 'Kino', 'Luxusrestaurant', 'Nachtmarkt', 'Wasserpark', 'Einkaufszentrum', 'Karaokebar', 'Nachtclub', 'Romantisches Hotel'];
  return locations[Math.floor(Math.random() * locations.length)];
}