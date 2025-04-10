let yts = require('yt-search')
let handler = async (m, { text }) => {
  if (!text) throw 'Suchen was?'
  let results = await yts(text)
  let resultText = results.all.map(v => {
    switch (v.type) {
      case 'Video': return `
*${v.title}* (${v.url})
Duration: ${v.timestamp}
Uploaded ${v.ago}
${v.views} views
      `.trim()
      case 'channel': return `
*${v.name}* (${v.url})
_${v.subCountLabel} (${v.subCount}) Subscriber_
${v.videoCount} Video
`.trim()
    }
  }).filter(v => v).join('\n========================\n')
  m.reply(resultText)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <search>')
handler.tags = ['tools', 'internet', 'herunterladener']
handler.command = /^yts(earch)?$/i

module.exports = handler
