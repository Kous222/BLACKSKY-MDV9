let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.iq)}`, m)
}
handler.help = ['iqtest']
handler.tags = ['spiel']
handler.command = /^(iqtest)$/i
handler.owner = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'Ihr IQ beträgt: 1',
'Ihr IQ beträgt: 14',
'Ihr IQ beträgt: 23',
'Ihr IQ beträgt: 35',
'Ihr IQ beträgt: 41',
'Ihr IQ beträgt: 50',
'Ihr IQ beträgt: 67',
'Ihr IQ beträgt: 72',
'Ihr IQ beträgt: 86',
'Ihr IQ beträgt: 99',
'Ihr IQ beträgt: 150',
'Ihr IQ beträgt: 340',
'Ihr IQ beträgt: 423',
'Ihr IQ beträgt: 500',
'Ihr IQ beträgt: 676',
'Ihr IQ beträgt: 780',
'Ihr IQ beträgt: 812',
'Ihr IQ beträgt: 945',
'Ihr IQ beträgt: 1000',
'Ihr IQ beträgt: Unbegrenzt!',
'Ihr IQ beträgt: 5000',
'Ihr IQ beträgt: 7500',
'Ihr IQ beträgt: 10000',
]
