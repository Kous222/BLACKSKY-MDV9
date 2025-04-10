const fetch = require('node-fetch');
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Anmeldenkan url!\n\ncontoh:\n${usedPrefix + command} https://www.threads.net/@diiemofc/post/Cujx6ryoYx6?igshid=NTc4MTIwNjQ2YQ%3D%3D`;
  }
  if (!args[0].match(/threads/gi)) {
    throw `url Nein Gefunden!`;
  }
  m.Antworten(wait);
  try {
    const api = await fetch(`https://api.betabotz.eu.org/api/Herunterladen/threads?url=${args[0]}&apikey=${lann}`).then(results => results.json());
    const foto = api.result.image_urls[0] || null;
    const Video = api.result.video_urls[0] || null;   
    if (Video) {
      try { 
        conn.sendFile(m.chat, Video.herunterladen_url, 'threads.mp4', '*THREADS DOWNLOADER*', m);
      } catch (e) {
        throw `Medien Video nicht Gefunden!`;
      }
    } else if (foto) {
      try {
        conn.sendFile(m.chat, foto, 'threads.jpeg', '*THREADS DOWNLOADER*', m);
      } catch (e) {
        throw `Medien foto nicht Gefunden!`;
      }
    } else {
      throw `Konten nicht Gefunden!`;
    }
  } catch (e) {
    console.log(e);
    throw `✖️ *Server down*` 
  }
};
handler.command = handler.help = ['threads', 'threadsdl'];
handler.tags = ['herunterladener'];
handler.limit = true;
handler.group = false;
handler.Premium = false;

module.exports = handler;
