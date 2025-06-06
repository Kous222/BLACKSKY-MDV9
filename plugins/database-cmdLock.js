module.exports = Object.assign(async function handler(m, { isOwner, isPremium, command }) {
    if (!(isOwner || isPremium)) {
        global.dfail('Premium', m, conn)
        throw false
    }
    if (!m.quoted) throw 'Reply Nachricht!'
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('hex')
    if (!(hash in sticker)) throw 'Hash not found in database'
    sticker[hash].locked = !/^un/i.test(command)
    m.reply('Done!')
}, {
    help: ['un', ''].map(v => v + 'lockcmd'),
    tags: ['database'],
    command: /^(un)?lockcmd$/i
})