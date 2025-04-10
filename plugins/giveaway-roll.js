let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) throw `_*Nein gibt GIVEAWAY stattfinden digrup dies!*_\n\n*${usedPrefix}startengiveaway* - für mestarten giveaway`

    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.giveway[id][1]
    let cita = absen[Math.floor(Math.random() * absen.length)]
    let tag = `@${cita.split`@`[0]}`
    let loadd = [
 '■□ 10%',
 '□■ 20%',
 '■□ 30%',
 '□■ 40%',
 '■□ 50%',
 '□■ 60%',
 '■□ 70%',
 '□■ 80%',
 '■□ 90%',
 '*Mendapatkan Pemenangnya*'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '*Mensuchen Pemenangnya*'})

for (let i = 0; i < loadd.length; i++) {
await sleep(1000)
await conn.sendMessage(m.chat, {text: loadd[i], bearbeiten: key })} return conn.reply(m.chat, `🎊 *CONGRATULATIONS* 🎉
${tag} du Pemenang Giveawaynya🎉

Tanggal: ${date}
————————————————————————
_*Note:* delete giveaway nach fertig mit schreiben *.löschengiveaway*_`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['rollgiveaway']
handler.tags = ['adminry', 'group']
handler.command = /^(rolling|rollgiveaway|rollinggiveaway)$/i
handler.admin = true
module.exports = handler

const sleep = (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}