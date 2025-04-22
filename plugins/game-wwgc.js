// werewolf.js - Werwolf-Spiel (auf Deutsch lokalisiert)

const fs = require('fs');
const path = './database.json';
let database = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {};
if (!database.werewolf) database.werewolf = {};

function save() {
  fs.writeFileSync(path, JSON.stringify(database, null, 2));
}

const ROLES = ['Werwolf', 'Dorfbewohner', 'Seher'];
const EMOJIS = { Werwolf: '🐺', Dorfbewohner: '👨‍🌾', Seher: '🔮' };

function getRandomRole() {
  const index = Math.floor(Math.random() * ROLES.length);
  return ROLES[index];
}

function getGame(chatId) {
  if (!database.werewolf[chatId]) {
    database.werewolf[chatId] = { players: {}, started: false };
    save();
  }
  return database.werewolf[chatId];
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

module.exports = {
  name: 'werewolf',
  description: 'Spiele Werwolf im Gruppenchat!',
  category: 'spiele',
  async run({ conn, m, args, isAdmin, isBotAdmin, participants }) {
    const chatId = m.chat;
    const game = getGame(chatId);

    const command = (args[0] || '').toLowerCase();

    if (command === 'start') {
      if (!isAdmin) return m.reply('Nur Admins dürfen das Spiel starten.');
      if (game.started) return m.reply('Ein Spiel läuft bereits.');
      const playerList = Object.keys(game.players);
      if (playerList.length < 3) return m.reply('Mindestens 3 Spieler werden benötigt.');
      // Rollen zufällig verteilen
      const roles = shuffle([
        'Werwolf',
        'Werwolf',
        'Seher',
        ...Array(playerList.length - 3).fill('Dorfbewohner')
      ]);
      playerList.forEach((id, i) => {
        game.players[id].role = roles[i];
        conn.sendMessage(id, { text: `Deine Rolle ist: *${roles[i]}* ${EMOJIS[roles[i]] || ''}` });
      });
      game.started = true;
      save();
      return m.reply(`Das Werwolf-Spiel hat begonnen! Die Rollen wurden privat verteilt.`);
    }

    if (command === 'beitreten') {
      if (game.started) return m.reply('Ein Spiel läuft bereits. Bitte warte, bis es vorbei ist.');
      if (game.players[m.sender]) return m.reply('Du bist bereits im Spiel.');
      game.players[m.sender] = { name: m.pushName };
      save();
      return m.reply(`Du bist dem Werwolf-Spiel beigetreten.`);
    }

    if (command === 'verlassen') {
      if (!game.players[m.sender]) return m.reply('Du bist nicht im Spiel.');
      delete game.players[m.sender];
      save();
      return m.reply('Du hast das Spiel verlassen.');
    }

    if (command === 'status') {
      const playerList = Object.entries(game.players)
        .map(([id, p]) => `• ${p.name || id}${game.started ? '' : ' (bereit)'}`)
        .join('\n');
      return m.reply(game.started
        ? `Das Spiel läuft gerade.\nTeilnehmer:\n${playerList}`
        : `Werwolf-Spiel Lobby:\nTeilnehmer:\n${playerList || 'Keine Teilnehmer'}\n\nVerwende *.werewolf beitreten*, um mitzuspielen.`);
    }

    if (command === 'reset') {
      if (!isAdmin) return m.reply('Nur Admins dürfen das Spiel zurücksetzen.');
      delete database.werewolf[chatId];
      save();
      return m.reply('Das Werwolf-Spiel wurde zurückgesetzt.');
    }

    return m.reply(`Verfügbare Befehle:\n.werewolf beitreten\n.werewolf verlassen\n.werewolf status\n.werewolf start\n.werewolf reset`);
  }
};
