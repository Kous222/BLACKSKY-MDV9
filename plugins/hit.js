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

  game.playerHand.push(game.deck.pop());
  const playerValue = getValue(game.playerHand);

  if (playerValue > 21) {
    delete global.blackjackGames[id];
    return conn.reply(m.chat, `💥 *Bust!* Du hast ${playerValue} Punkte erreicht.\n💀 *Verloren!*\n\n👉 Starte ein neues Spiel mit *.blackjack*`, m);
  }

  let reply = `🧍 *Deine Karten:* ${formatHand(game.playerHand)} (Punkte: ${playerValue})\n`;
  reply += `👉 Tippe *.hit* um eine weitere Karte zu ziehen\n👉 Tippe *.stand* um zu passen`;
  return conn.reply(m.chat, reply, m);
};

handler.command = /^hit$/i;
handler.tags = ['game'];
handler.help = ['hit'];

module.exports = handler;
