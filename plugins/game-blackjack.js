const { randomInt } = require('crypto');

function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }

  return deck.sort(() => Math.random() - 0.5);
}

function getValue(hand) {
  let value = 0;
  let aces = 0;
  for (let card of hand) {
    if (['J', 'Q', 'K'].includes(card.value)) {
      value += 10;
    } else if (card.value === 'A') {
      value += 11;
      aces++;
    } else {
      value += parseInt(card.value);
    }
  }
  while (value > 21 && aces) {
    value -= 10;
    aces--;
  }
  return value;
}

function formatHand(hand) {
  return hand.map(c => `[${c.value}${c.suit}]`).join(' ');
}

global.blackjackGames = global.blackjackGames || {};

let handler = async (m, { conn }) => {
  const id = m.chat;
  if (!global.blackjackGames[id]) {
    const deck = createDeck();
    const playerHand = [deck.pop(), deck.pop()];
    const dealerHand = [deck.pop(), deck.pop()];
    global.blackjackGames[id] = {
      deck,
      playerHand,
      dealerHand,
      status: 'playing'
    };

    let reply = `🎲 *BLACKJACK* 🎲\n\n`;
    reply += `🧍 *Deine Karten:* ${formatHand(playerHand)} (Punkte: ${getValue(playerHand)})\n`;
    reply += `🤖 *Dealer zeigt:* [${dealerHand[0].value}${dealerHand[0].suit}] [?]\n\n`;
    reply += `👉 Tippe *.hit* um eine Karte zu ziehen\n👉 Tippe *.stand* um zu passen`;
    return conn.reply(m.chat, reply, m);
  }

  return conn.reply(m.chat, '❗ Ein Spiel läuft bereits. Nutze *.hit* oder *.stand*', m);
};

handler.command = /^blackjack$/i;
handler.tags = ['game'];
handler.help = ['blackjack'];
handler.group = false;

module.exports = handler;
dler;

// Hit command
module.exports.hit = async (m, { conn }) => {
  const id = m.chat;
  const game = games[id];
  if (!game) return m.reply('⚠️ Kein Spiel läuft. Starte eins mit *.blackjack*');

  game.playerHand.push(game.deck.pop());
  const playerValue = getValue(game.playerHand);

  if (playerValue > 21) {
    delete games[id];
    return conn.reply(m.chat, `💥 *Bust!* Du hast ${playerValue} Punkte erreicht.\n💀 *Verloren!*\n\n👉 Starte ein neues Spiel mit *.blackjack*`, m);
  }

  let reply = `🧍 *Deine Karten:* ${formatHand(game.playerHand)} (Punkte: ${playerValue})\n`;
  reply += `👉 Tippe *.hit* um eine weitere Karte zu ziehen\n👉 Tippe *.stand* um zu passen`;
  return conn.reply(m.chat, reply, m);
};

module.exports.hit.command = /^hit$/i;

// Stand command
module.exports.stand = async (m, { conn }) => {
  const id = m.chat;
  const game = games[id];
  if (!game) return m.reply('⚠️ Kein Spiel läuft. Starte eins mit *.blackjack*');

  let dealerValue = getValue(game.dealerHand);
  while (dealerValue < 17) {
    game.dealerHand.push(game.deck.pop());
    dealerValue = getValue(game.dealerHand);
  }

  const playerValue = getValue(game.playerHand);
  let result = '';

  if (dealerValue > 21 || playerValue > dealerValue) {
    result = '🏆 *Du hast gewonnen!*';
  } else if (dealerValue === playerValue) {
    result = '🤝 *Unentschieden!*';
  } else {
    result = '💀 *Du hast verloren!*';
  }

  const finalReply = `🎲 *BLACKJACK ERGEBNIS* 🎲\n\n` +
    `🧍 *Deine Karten:* ${formatHand(game.playerHand)} (Punkte: ${playerValue})\n` +
    `🤖 *Dealer Karten:* ${formatHand(game.dealerHand)} (Punkte: ${dealerValue})\n\n` +
    `${result}\n\n👉 Neues Spiel starten mit *.blackjack*`;

  delete games[id];
  return conn.reply(m.chat, finalReply, m);
};

module.exports.stand.command = /^stand$/i;
