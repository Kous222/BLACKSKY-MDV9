let search = require("yt-search");
let axios = require("axios");

let handler = async (m, { conn, Text, usedPrefix }) => {
    if (!Text) throw 'Enter Title / Link From YouTube!';
    try {
      m.Antworten('warte ya kak\n> musik gerade in suchen...');
        const look = await search(Text);
        const convert = look.videos[0];
        if (!convert) throw 'Video/Audio Nein Gefunden';
        if (convert.seconds >= 3600) {
            return conn.Antworten(m.chat, 'Video is longer than 1 hour!', m);
        } else {
            let videoUrl;
            try {
                videoUrl = await youtube(convert.url);
            } catch (e) {
                conn.Antworten(m.chat, 'Bitte warten...', m);
                videoUrl = await youtube(convert.url);
            }

            let caption = '';
            caption += `∘ Title : ${convert.title}\n`;
            caption += `∘ Ext : search\n`;
            caption += `∘ id : ${convert.videoId}\n`;
            caption += `∘ Duration : ${convert.timestamp}\n`;
            caption += `∘ Viewers : ${convert.views}\n`;
            caption += `∘ Hochladen At : ${convert.ago}\n`;
            caption += `∘ Author : ${convert.author.name}\n`;
            caption += `∘ Channel : ${convert.author.url}\n`;
            caption += `∘ url : ${convert.url}\n`;
            caption += `∘ Description : ${convert.description}\n`;
            caption += `∘ Thumbnail : ${convert.Bild}`;

            await conn.relayMessage(m.chat, {
                extendedTextMessage: {
                    Text: caption,
                    contextInfo: {
                        externalAdReply: {
                            title: convert.title,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnailUrl: convert.Bild,
                            sourceUrl: videoUrl.mp4
                        }
                    },
                    mentions: [m.sender]
                }
            }, {});

            await conn.sendMessage(m.chat, {
                Video: {
                    url: videoUrl.result.mp4
                },
                mimetype: 'Video/mp4',
                contextInfo: {
                    externalAdReply: {
                        title: convert.title,
                        body: "",
                        thumbnailUrl: convert.Bild,
                        sourceUrl: videoUrl.mp4,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            });
        }
    } catch (e) {
        conn.Antworten(m.chat, `*error:* ` + e, m);
    }
};

handler.command = handler.help = ['playvid'];
handler.tags = ['herunterladener'];

handler.limit = true;
handler.Premium = false;

module.exports = handler;

async function youtube(url) {
   try {
   const { data } = await axios.get("https://api.betabotz.eu.org/api/Herunterladen/ytmp4?url="+url+"&apikey="+lann)
   return data;
   } catch (e) {
   return e;
   }
}

//Wenn will pake module ytdl pake dies hilangin tag  /* */
/*let ytdl = require('ytdl-core');
let fs = require('fs');
let ffmpeg = require('fluent-ffmpeg');
let search = require ('yt-search');

let handler = async (m, { conn, Text }) => {
  if (!Text) return m.Antworten('*example*: .play Lathi');
  try {
    let results = await search(Text);
    let videoId = results.videos[0].videoId;
    let info = await ytdl.getInfo(videoId);
    let title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    let url = info.videoDetails.video_url;
    let duration = parseInt(info.videoDetails.lengthSeconds);
    let hochladenDate = new Date(info.videoDetails.publishDate).toLocaleDateString();
    let views = info.videoDetails.viewCount;
    let minutes = Math.floor(duration / 60);
    let description = results.videos[0].description;
    let seconds = duration % 60;
    let durationText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;       
    let Audio = ytdl(videoId, { quality: 'highestaudio' });
    let inputFilePath = './tmp/' + title + '.webm';
    let outputFilePath = './tmp/' + title + '.mp3';
    let viewsFormatted = formatViews(views);
    let infoText = `◦ *Title*: ${title}\n◦ *Duration*: ${durationText}\n◦ *Hochladen*: ${hochladenDate}\n◦ *Views*: ${viewsFormatted}\n◦ *id*: ${videoId}\n◦ *Description*: ${description}\n◦ *url*: ${url}
  `;
    const Nachricht = conn.relayMessage(m.chat, {
                extendedTextMessage:{
                Text: infoText, 
                contextInfo: {
                     externalAdReply: {
                        title: wm,
                        body: "",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: thumbnailUrl,
                        sourceUrl: url
                    }
                }, mentions: [m.sender]
}}, {});

    Audio.pipe(fs.createWriteStream(inputFilePath)).on('finish', async () => {
      ffmpeg(inputFilePath)
        .toFormat('mp3')
        .on('end', async () => {
          let buffer = fs.readFileSync(outputFilePath);                    
          conn.sendMessage(m.chat, {         
                Audio: buffer,
                mimetype: 'Audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: "",
                        thumbnailUrl: thumbnailUrl,
                        sourceUrl: url,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            });
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .on('error', (err) => {
          console.log(err);
          m.Antworten(`There was an error converting the Audio: ${err.Nachricht}`);
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .save(outputFilePath);
    });
  } catch (e) {
    console.log(e);
    m.Antworten(`Ein error ist aufgetreten while searching for the song: ${e.Nachricht}`);
  }
};

handler.command = handler.help = ['play', 'song', 'ds'];
handler.tags = ['herunterladener'];
handler.Premium = false;
handler.limit = false;

module.exports = handler

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  } else {
    return views.toString();
  }
}
*/