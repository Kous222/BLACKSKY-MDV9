function handler(m, { text }) {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    m.reply(teks.replace(/[a-z]/gi, v => {
        return {
            'a': 'ka',
            'b': 'tu',
            'c': 'mi',
            'd': 'te',
            'e': 'ku',
            'f': 'lu',
            'g': 'ji',
            'h': 'ri',
            'i': 'ki',
            'j': 'zu',
            'k': 'me',
            'l': 'ta',
            'm': 'rin',
            'n': 'to',
            'o': 'mo',
            'p': 'no',
            'q': 'zu',
            'r': 'shi',
            's': 'ari',
            't': 'ci',
            'u': 'do',
            'v': 'ru',
            'w': 'mei',
            'x': 'na',
            'y': 'fu',
            'z': 'zi'
        }[v.toLowerCase()] || v
    }))
}
handler.help = ['ninjaname <text>', 'ninjanamens <text>']
handler.tags = ['spaß']
handler.command =  /^(ninjaname|namaninja|namae|ninjanamens|ninjabenennung)$/i

module.exports = handler