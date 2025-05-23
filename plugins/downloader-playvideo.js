const search = require('yt-search');
const axios = require('axios');

const lann = 'DEIN_API_KEY_HIER'; // Your API key here

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw 'Bitte gib einen Titel oder YouTube-Link ein!';

  try {
    await conn.reply(m.chat, 'Bitte warten... Musik wird gesucht...', m);

    const look = await search(text);
    const convert = look.videos[0];
    if (!convert) throw 'Kein Video/Audio gefunden';

    if (convert.seconds >= 3600) {
      return conn.reply(m.chat, 'Das Video ist länger als 1 Stunde!', m);
    }

    let videoUrl;
    try {
      videoUrl = await youtube(convert.url);
    } catch {
      await conn.reply(m.chat, 'Bitte warten...', m);
      videoUrl = await youtube(convert.url);
    }

    let caption = '';
    caption += `∘ Titel: ${convert.title}\n`;
    caption += `∘ Länge: ${convert.timestamp}\n`;
    caption += `∘ Aufrufe: ${convert.views}\n`;
    caption += `∘ Hochgeladen: ${convert.ago}\n`;
    caption += `∘ Autor: ${convert.author.name}\n`;
    caption += `∘ Kanal: ${convert.author.url}\n`;
    caption += `∘ URL: ${convert.url}\n`;
    caption += `∘ Beschreibung: ${convert.description}\n`;

    await conn.sendMessage(m.chat, {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: convert.title,
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: convert.thumbnail,
          sourceUrl: videoUrl.result?.mp4 || videoUrl.mp4 || convert.url,
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl.result?.mp4 || videoUrl.mp4 },
      mimetype: 'video/mp4',
      contextInfo: {
        externalAdReply: {
          title: convert.title,
          thumbnailUrl: convert.thumbnail,
          sourceUrl: videoUrl.result?.mp4 || videoUrl.mp4 || convert.url,
          mediaType: 1,
          renderLargerThumbnail: true,
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `Ein Fehler ist aufgetreten: ${e}`, m);
  }
};

handler.command = handler.help = ['playvid'];
handler.tags = ['herunterladener'];
handler.limit = true;
handler.premium = false;

module.exports = handler;

async function youtube(url) {
  try {
    const { data } = await axios.get(`https://api.betabotz.eu.org/api/Herunterladen/ytmp4?url=${encodeURIComponent(url)}&apikey=${lann}`);
    return data;
  } catch (e) {
    throw e;
  }
}
