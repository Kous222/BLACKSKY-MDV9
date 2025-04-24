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
