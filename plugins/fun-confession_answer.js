const delay = time => new Promise(res => setTimeout(res, time))
let handler = m => m
handler.all = async function (m) {
	if (!m.chat.endsWith('@s.whatsapp.net')) return !0;
	this.menfess = this.menfess ? this.menfess : {}
	let mf = Object.values(this.menfess).find(v => v.Status === false && v.penerima == m.sender)
	if (!mf) return !0
	console.log({ text: m.text })
	if ((m.text === 'BALAS NACHRICHT' || m.text === '') && m.quoted.mtype == 'buttonMessage') return m.reply("Bitte Tippe Nachricht Antwort Mu");
	let txt = `hallo kak @${mf.von.split('@')[0]}, du Empfangen Nachricht Antwort\n\nPesan du: \n${mf.nachricht}\n\nPesan Balasannya: \n${m.text}\n`.trim();
	await this.reply(mf.von, txt, null).then(() => {
		m.reply('erfolgreich senden antwortenan!')
		delay(2000)
		delete this.menfess[mf.id]
		return !0
		})
	return !0
}
module.exports = handler
