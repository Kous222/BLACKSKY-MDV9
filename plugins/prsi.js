let handler = async (m, { conn, text }) => {
  // Sicherstellen, dass die Spiele-Datenbank existiert
  if (!global.db.data.games) {
    global.db.data.games = {};
  }

  const gameId = `prsi_game_${m.chat}`;
  let game = global.db.data.games[gameId];

  if (!game) {
    // Initialisierung des Spiels, wenn es noch nicht existiert
    game = {
      players: [m.sender],
      currentPlayer: 0,
      deck: [],
      discardPile: [],
      playerCards: { [m.sender]: [] },
      started: false,
    };
    global.db.data.games[gameId] = game;
    await m.reply('Das Spiel wurde gestartet! 🎮 Type `.card join` um mitzumachen.');
    return;
  }

  if (!game.started) {
    return await m.reply('Das Spiel wurde noch nicht gestartet. Type `.card start` um das Spiel zu starten.');
  }

  // Spiel starten
  if (text === '.card start' && game.players.length > 1) {
    game.started = true;
    game.deck = createDeck();
    game.playerCards = {};
    game.players.forEach(player => game.playerCards[player] = [drawCard(), drawCard()]);
    game.discardPile.push(drawCard());
    game.currentPlayer = 0;

    return await m.reply('Das Spiel hat begonnen! 🎉');
  }

  // Spieler beitreten
  if (text === '.card join' && !game.players.includes(m.sender)) {
    game.players.push(m.sender);
    game.playerCards[m.sender] = [drawCard(), drawCard()];
    return await m.reply(`Du bist dem Spiel beigetreten, ${m.sender}! 🎲`);
  }

  // Spielzug und Karten ablegen
  if (text === '.card' && game.players[game.currentPlayer] === m.sender) {
    const playerCards = game.playerCards[m.sender];
    const lastCard = game.discardPile[game.discardPile.length - 1];
    
    // Anzeige der letzten Karte
    await m.reply(`Letzte Karte: ${cardToEmoji(lastCard)}`);

    // Zeige die Karten des Spielers an
    const cardEmojis = playerCards.map(card => `${cardToEmoji(card)}`).join(' ');

    await m.reply(`Deine Karten: ${cardEmojis}`);

    const button = {
      buttonText: {
        displayText: "Ziehe eine Karte",
      },
      type: 1,
      id: "draw_card",
    };

    await conn.sendButton(m.chat, 'Wähle eine Karte oder ziehe eine neue!', 'Ziehe eine Karte oder spiele eine gültige Karte!', [button]);

    // Wenn der Spieler keine gültige Karte hat, kann er eine ziehen
    if (!hasValidCard(playerCards, lastCard)) {
      await m.reply('Du hast keine gültige Karte! Du musst eine ziehen.');
      return;
    }
  }

  // Handle Button Click (Ziehe Karte)
  conn.on('message-new', async (message) => {
    if (message.text === 'draw_card' && game.players[game.currentPlayer] === m.sender) {
      const drawnCard = drawCard();
      game.playerCards[m.sender].push(drawnCard);
      await m.reply(`Du hast eine Karte gezogen! Deine neue Karte ist: ${cardToEmoji(drawnCard)}`);
    }
  });

  // Spielstand anzeigen
  const gameStatus = game.players.map(player => {
    const playerHand = game.playerCards[player].map(card => cardToEmoji(card)).join(' ');
    return `${player}: ${playerHand}`;
  }).join('\n');

  await m.reply(`Spielstand:\n${gameStatus}`);
};

function createDeck() {
  const suits = ['♠️', '♥️', '♦️', '♣️'];
  const values = ['7', '8', '9', '10', 'B', 'D', 'K', 'A'];
  let deck = [];
  
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value });
    });
  });

  return deck.sort(() => Math.random() - 0.5);
}

function drawCard() {
  const suits = ['♠️', '♥️', '♦️', '♣️'];
  const values = ['7', '8', '9', '10', 'B', 'D', 'K', 'A'];
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomValue = values[Math.floor(Math.random() * values.length)];
  return { suit: randomSuit, value: randomValue };
}

function cardToEmoji(card) {
  const valueEmojis = {
    '7': '7️⃣',
    '8': '8️⃣',
    '9': '9️⃣',
    '10': '🔟',
    'B': '👑',
    'D': '♦️',
    'K': '👑',
    'A': '🃏',
  };
  return `${valueEmojis[card.value]}${card.suit}`;
}

function hasValidCard(playerCards, lastCard) {
  return playerCards.some(card => card.suit === lastCard.suit || card.value === lastCard.value);
}

handler.command = ['card', 'prsi'];
handler.help = ['.card start', '.card join', '.card'];
handler.tags = ['game'];

module.exports = handler;