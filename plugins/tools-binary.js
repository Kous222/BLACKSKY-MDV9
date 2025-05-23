let axios = require("axios");

let handler = async(m, { conn, Text }) => {

    if (!Text) return conn.Antworten(m.chat, 'Anmeldenan Teksnya', m)

	axios.get(`https://some-random-api.ml/binary?Text=${Text}`).then ((res) => {
	 	let result = `Text : ${Text}\nBinary : ${res.data.binary}`

    conn.Antworten(m.chat, result, m)
	})
}
handler.help = ['binary'].map(v => v + ' <Text>')
handler.tags = ['tools']
handler.command = /^(binary)$/i
handler.owner = false
handler.mods = false
handler.Premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = false

module.exports = handler
