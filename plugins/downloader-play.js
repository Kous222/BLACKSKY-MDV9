const ytdl = require('@distube/ytdl-core');
const ytSearch = require('yt-search');
const { pipeline } = require('stream');
const { PassThrough } = require('stream');

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Gib den Songtitel oder YouTube-Link an.');

    try {
        const search = await ytSearch(text);
        const video = search.videos[0];
        if (!video) return m.reply('❌ Kein Video gefunden.');

        const title = video.title;
        const url = video.url;
        const thumbnail = video.thumbnail;

        const stream = ytdl(url, {
            filter: 'audioonly',
            quality: 'highestaudio',
            highWaterMark: 1 << 25 // wichtig für Heroku!
        });

        const pass = new PassThrough();
        pipeline(stream, pass, (err) => {
            if (err) console.error('Stream error:', err);
        });

        await conn.sendMessage(m.chat, {
            audio: { stream: pass },
            mimetype: 'audio/mp4',
            fileName: `${title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: title,
                    body: "YouTube Music",
                    thumbnailUrl: thumbnail,
                    sourceUrl: url,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: m });

    } catch (err) {
        console.error('Play error:', err);
        m.reply('❌ Fehler beim Abrufen oder Senden der Audiodatei.\n\n' + err.message);
    }
};

handler.command = ['play'];
handler.help = ['play <titel>'];
handler.tags = ['downloader'];
handler.limit = true;

module.exports = handler;
