const Münzenmins = 1
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^pull/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].bank / Münzenmins) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].bank >= Münzenmins * count) {
    global.db.data.users[m.sender].bank -= Münzenmins * count
    global.db.data.users[m.sender].Münzen += count
    conn.reply(m.chat, `🚩 -${Münzenmins * count} ATM\n+ ${count} Money`, m)
  } else conn.reply(m.chat, `🚩 ATM you are left ${count} !!`, m)
}
handler.help = ['pull *<amount>*', 'pullall']
handler.tags = ['rpg']
handler.command = /^pull([0-9]+)|pull|pullall$/i
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