const Münzenplus = 1
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^atm/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].Münzen / Münzenplus) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].Münzen >= Münzenplus * count) {
    global.db.data.users[m.sender].Münzen -= Münzenplus * count
    global.db.data.users[m.sender].bank += count
    conn.reply(m.chat, `🚩 -${Münzenplus * count} Money\n+ ${count} ATM`, m)
  } else conn.reply(m.chat, `🚩 Money not enough to save ${count} ATM`, m)
}
handler.help = ['atm *<amount>*', 'atmall']
handler.tags = ['rpg']
handler.command = /^(atm([0-9]+)|atm|atmall)$/i
handler.Besitzer = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false
handler.limit = true
handler.admin = false
handler.botAdmin = false
handler.rpg = true

handler.fail = null
handler.exp = 0

module.exports = handler
