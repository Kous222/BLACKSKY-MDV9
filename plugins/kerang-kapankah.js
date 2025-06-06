let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `Kayaknya ${Math.floor(Math.random() * 100)} ${pickRandom(['Sekunden', 'menit', 'jam', 'Tag', 'minggu', 'Monat', 'Jahr', 'abad'])} wieder ...
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = ['', 'kah'].map(v => 'kapan' + v + ' <text>?')
handler.tags = ['kerang']
handler.customPrefix = /(\?$)/
handler.command = /^kapan(kah)?$/i
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
  return list[Math.floor(Math.random() * list.length)]
}

