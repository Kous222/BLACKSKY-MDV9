let games = {}

const words = ['katze', 'hund', 'apfel', 'computer', 'haus', 'blume', 'schule', 'spiel', 'banane', 'musik']

function mask(word, guesses) {
  return word.split('').map(c => (guesses.includes(c) ? c : '_')).join(' ')
}

let handler = async (m, { args, command }) => {
  let id = m.chat
  games[id] = games[id] || null

  if (command === 'hangman') {
    if (games[id]) return m.reply('⚠️ Es läuft bereits ein Galgenmännchen-Spiel in diesem Chat.')
    let word = words[Math.floor(Math.random() * words.length)]
    games[id] = {
      word,
      guesses: [],
      wrong: [],
      maxTries: 6
    }
    return m.reply(`🎮 *Galgenmännchen gestartet!*\n\n${mask(word, [])}\n\n❓ Errate das Wort! Antworte mit einem einzelnen Buchstaben.`)
  }

  if (!games[id]) return m.reply('⚠️ Kein Spiel aktiv. Starte eins mit *.hangman*')

  let letter = (args[0] || '').toLowerCase()
  if (!/^[a-zäöüß]$/.test(letter)) return m.reply('❗ Bitte gib einen gültigen Buchstaben ein.')

  let game = games[id]
  if (game.guesses.includes(letter) || game.wrong.includes(letter)) return m.reply('❗ Buchstabe wurde bereits geraten.')

  if (game.word.includes(letter)) {
    game.guesses.push(letter)
  } else {
    game.wrong.push(letter)
  }

  let display = mask(game.word, game.guesses)
  let won = !display.includes('_')
  let lost = game.wrong.length >= game.maxTries

  if (won || lost) {
    delete games[id]
    return m.reply(won
      ? `✅ *Glückwunsch!* Du hast das Wort erraten: *${game.word}*`
      : `❌ *Game Over!* Das gesuchte Wort war: *${game.word}*`)
  }

  return m.reply(
    `🎮 *Galgenmännchen*\n\n${display}\n\n❌ Fehler: ${game.wrong.join(', ') || '-'} (${game.wrong.length}/${game.maxTries})`
  )
}

handler.command = /^hangman|rate$/i
handler.help = ['hangman', 'rate <buchstabe>']
handler.tags = ['game']
module.exports = handler
