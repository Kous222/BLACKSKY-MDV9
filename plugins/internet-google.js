let fetch = require('node-fetch');

let handler = async (m, { conn, command, args }) => {
  let text = args[0];
  if (!text) return conn.reply(m.chat, 'Nein gibt teks für disuchen', m);

  try {
    let response = await fetch(`https://api.betabotz.eu.org/api/search/google?text1=${encodeURIComponent(text)}&apikey=${lann}`);
    let data = await response.json();

    if (!data.Status) throw eror

    let msg = data.result.map(({ title, url, description }) => {
      return `*${title}*\n_${url}_\n_${description}_`;
    }).join('\n\n');
    conn.relayMessage(m.chat, {
     extendedTextMessage:{
                text: msg, 
                contextInfo: {
                     externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://telegra.ph/file/d7b761ea856b5ba7b0713.jpg',
                        sourceUrl: ''
                    }
                }, mentions: [m.sender]
}}, {})
  } catch (e) {
    throw eror
  }
};

handler.help = ['google'].map(v => v + ' <pensuchenan>');
handler.tags = ['internet'];
handler.command = /^google$/i;
handler.limit = true;

module.exports = handler;
