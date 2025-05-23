let handler = async (m, { args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    if (user.healt >= 10000) return m.reply(`\nGesundheit ❤️ ist schon voll!\n`.trim())
    const heal = 50
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.Gesundheit) / heal)))) * 1
    if (user.potion < count) return m.reply(`\nDeine Tränke🧃 reichen nicht aus, du hast nur *${user.potion}* Tränke!\nGib *${usedPrefix}buy potion ${count - user.potion}* ein, um mehr Tränke zu kaufen\n`.trim())
    user.potion -= count * 1
    user.healt += heal * count
    m.reply(`\nErfolgreich *${count}* Tränke verwendet\n`.trim())
}

handler.help = ['heal *anzahl*']
handler.tags = ['rpg']
handler.command = /^(heal|use)$/i
handler.limit = true
handler.rpg = true
module.exports = handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}
