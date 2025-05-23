const youtube = require("yt-search");
let handler = async (m, { conn, Text }) => {
  if (!Text) throw 'url sein/ihr welche?'
  m.Antworten('_Proses..._')
  var search = await youtube(Text);
  var convert = search.videos[0];
  let url = `https://aemt.me/youtube?url=${convert.url}&filter=audioandvideo&quality=highestvideo&contenttype=Video/mp4`
  conn.sendMessage(m.chat, { Video: { url: url }, mimetype: 'Video/mp4' }, { quoted: m })
}
handler.command = handler.help = ['ytv2']
handler.tags = ['herunterladener']
module.exports = handler
