let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.giveway = conn.giveway ? conn.giveway : {}
    if (!(id in conn.giveway)) throw `_*Nein gibt GIVEAWAY stattfinden digrup dies!*_\n\n*${usedPrefix}startengiveaway* - für mestarten giveaway`

    let absen = conn.giveway[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) throw '*du bereits ikut!*'
    absen.push(m.sender)
    m.reply(`*Done!*\n\n\`\`\`Total das/der/die bereits ikut GIVEWAY sebanyak\`\`\`\n*${absen.length} Mitglied*`)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
}
handler.help = ['ikutgiveaway']
handler.tags = ['group']
handler.command = /^(ikut|ikutgiveaway)$/i
handler.group = true
module.exports = handler