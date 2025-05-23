let handler = async (m, {conn, Text, usedPrefix}) => {
  if (!Text) throw 'Berikan url von YouTube!'
  try {   
    var aud = `https://aemt.me/youtube?url=${Text}&filter=audioonly&quality=highestaudio&contenttype=Audio/mpeg` 
    await conn.sendMessage(m.chat, { Audio: { url: aud }, mimetype: 'Audio/mpeg' }, { quoted: m })    
  } catch (e) {
    throw 'Video/Audio Nein Gefunden'
  }
}
handler.command = handler.help = ['ytaudio'];
handler.tags = ['herunterladener'];
handler.exp = 0;
handler.limit = true;
handler.Premium = false;
module.exports = handler;
