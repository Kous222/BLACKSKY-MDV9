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

let handler = async (m, { conn }) => {
  const id = m.chat;
  const game = global.blackjackGames?.[id];
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

  delete global.blackjackGames[id];
  return conn.reply(m.chat, finalReply, m);
};

handler.command = /^stand$/i;
handler.tags = ['game'];
handler.help = ['stand'];

module.exports = handler;
