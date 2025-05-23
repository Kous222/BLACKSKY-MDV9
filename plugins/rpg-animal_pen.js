let handler = async (m, { conn, usedPrefix }) => {
        let user = global.db.data.users[m.sender]
        let cap = `*━━━ ❨ Tiergehege ❩ ━━┄┈*

=> *Dein Gehege :*  @${m.sender.split`@`[0]}

*🐂 = [ ${user.banteng} ] Wildrind*
*🐅 = [ ${user.harimau} ] Tiger*
*🐘 = [ ${user.gajah} ] Elefant*
*🐐 = [ ${user.kambing} ] Ziege*
*🐼 = [ ${user.panda} ] Panda*
*🐊 = [ ${user.buaya} ] Krokodil*
*🐃 = [ ${user.kerbau} ] Büffel*
*🐮 = [ ${user.sapi} ] Kuh*
*🐒 = [ ${user.monyet} ] Affe*
*🐗 = [ ${user.babihutan} ] Wildschwein*
*🐖 = [ ${user.babi} ] Schwein*
*🐓 = [ ${user.ayam} ] Huhn*

Benutze *${usedPrefix}Markt* zum Verkaufen oder *${usedPrefix}cook* zum Kochen.`

        conn.reply(m.chat, cap, m, { mentions: await conn.parseMention(cap) } )
}

handler.help = ['kandang', 'gehege', 'stall', 'animal_pen']
handler.tags = ['rpg']
handler.command = /^(kandang|gehege|stall|animal_pen|animals)$/i
handler.rpg = true

module.exports = handler