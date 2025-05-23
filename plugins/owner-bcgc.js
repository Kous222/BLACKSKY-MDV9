let handler = async (m, { conn, isROwner, text }) => {
    const delay = time => new Promise(res => setTimeout(res, time))
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    var nachricht = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!nachricht) throw 'teksnya?'
    m.reply(`Sende Broadcast an ${anu.length} Chat, Zeit Fertig ${anu.length * 0.5 } Sekunden`)
    for (let i of anu) {
    await delay(500)
    conn.relayMessage(i, {
extendedTextMessage:{
                text: nachricht, 
                contextInfo: {
                     externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg',
                        sourceUrl: ''
                    }
                }, mentions: [m.sender]
}}, {}).catch(_ => _)
    }
  m.reply(`Sukses Sende Broadcast an ${anu.length} Group`)
}
handler.help = ['bcgcbot <teks>']
handler.tags = ['owner']
handler.command = /^((broadcastgc|bcgc)Bot)$/i

handler.owner = true

module.exports = handler
