let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `${pickRandom(['Jap','Sepertinya Begitu','Kayaknya','Kayaknya nggak','Nggak','Nggak vielleicht'])}
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = ['ob <teks>?']
handler.tags = ['kerang']
handler.customPrefix = /(\?$)/
handler.command = /^ob$/i
handler.owner = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
