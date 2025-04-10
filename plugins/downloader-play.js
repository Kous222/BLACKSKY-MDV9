const ytdl = require('@distube/ytdl-core');
const ytSearch = require('yt-search');
const { Readable } = require('stream');

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Gib den Songtitel oder YouTube-Link an.');

    try {
        const searchResult = await ytSearch(text);
        const video = searchResult.videos[0];
        if (!video) return m.reply('❌ Kein Video gefunden.');

        const videoUrl = video.url;
        const title = video.title;
        const thumbnail = video.thumbnail;

        const audioStream = ytdl(videoUrl, {
            filter: 'audioonly',
            quality: 'highestaudio'
        });

        const streamBuffer = Readable.from(audioStream);

        await conn.sendMessage(m.chat, {
            audio: { stream: streamBuffer },
            mimetype: 'audio/mp4',
            fileName: `${title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: title,
                    body: "YouTube Music",
                    thumbnailUrl: thumbnail,
                    sourceUrl: videoUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: m });
    } catch (err) {
        console.error(err);
        return m.reply(`❌ Ein Fehler ist aufgetreten:\n${err.message}`);
    }
};

handler.command = ['play'];
handler.help = ['play <titel>'];
handler.tags = ['downloader'];
handler.limit = true;

module.exports = handler;
