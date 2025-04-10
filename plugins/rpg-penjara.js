let handler = async (m, { conn, args, text, usedPrefix, command }) => {
 const JAIL_TEAME = 60 * 60 * 1000
 let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
 const user = global.db.data.users[who]
 const usar = global.db.data.users[m.sender]
 if (usar.job == 'polisi') {
    if (!text) throw '*Wer soll ins Gefängnis?*'
    if (!who) return m.reply('*Markiere das Ziel oder gib die Nummer ein*')
    if (!user) return m.reply(`*Nutzer ${who} existiert nicht in der Datenbank*`)
    
    user.jail = true
    user.perkerjaandua = Date.now() + JAIL_TEAME
    
    setTimeout(() => {
    conn.reply(who, `*du wurdest ins Gefängnis gebracht durch ${usar.name}*`, fverif)
    }, 5000)
    conn.reply(m.chat, `erfolgreich ins Gefängnis gebracht *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*\n🧤 +1 Level für harte Arbeit\n\n_Wenn die Polizei jemanden ohne bestimmten Grund ins Gefängnis bringt, wird sie direkt von der Behörde gesperrt._`, m, { mentions: [who] })
    return
   }
   await conn.reply(m.chat, '*Diese Funktion ist nur für Personen verfügbar, die als Polizist arbeiten*', m)
}

handler.help = ['gefängnis']
handler.tags = ['rpg']
handler.command = /^gefängnis$/i
handler.register = true
handler.rpg = true

module.exports = handler