let handler = async (m, {
	conn
}) => {
	let __timers = (new Date - global.db.data.users[m.sender].lastngewe)
	let _timers = (500000 - __timers)
	let timers = clockString(_timers)
	let user = global.db.data.users[m.sender]
	if (new Date - global.db.data.users[m.sender].lastngewe > 500000) {
		let hsl = `du Terbaring Lemas Karna durchführen Skidipapap 24 Stunden Tetapi du erhalten:
3000 Münze
1000 Exp
10 Limit
Und kostenlos Boba + Nasi Padang
`
		global.db.data.users[m.sender].Münze += 3000
		global.db.data.users[m.sender].exp += 1000
		global.db.data.users[m.sender].limit += 10

		setTimeout(() => {
			conn.reply(m.chat, hsl, m)
		}, 20000)

		setTimeout(() => {
		    conn.reply(m.chat, `du Di Paksa für Melayaninya 24 Stunden`, m)
		}, 18000)

		setTimeout(() => {
			conn.reply(m.chat, `du start durchführen Skidipapap Dengannya`, m)
		}, 15000)

		setTimeout(() => {
			conn.reply(m.chat, `du erhalten Pelanggan Und Pergi Ke Hotel`, m)
		}, 14000)

		setTimeout(() => {
			conn.reply(m.chat, `gerade suchen Pelanggan`, m)
		}, 0)
		user.lastngewe = new Date * 1
	} else conn.reply(m.chat, `*du bereits Kecapekan*\n*Bitte Pause Dulu während* ${timers}`, m)
}
handler.help = ['openbo']
handler.tags = ['rpg']
handler.command = /^(openbo)$/i
handler.group = true
handler.rpg = true
module.exports = handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n' + d, ' *Tage*\n ', h, ' *Stunden*\n ', m, ' *Minuten*\n ', s, ' *Sekunden* '].map(v => v.toString().padStart(2, 0)).join('')
}