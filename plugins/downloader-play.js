const ytdl = require('ytdl-core');
const search = require('yt-search');
const fs = require('fs');
const path = require('path');

const TMP_DIR = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
}

let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) return m.reply(`Please provide a song title or YouTube link\n\nExample: ${usedPrefix}play Despacito`);

    try {
        let searchMessage = await m.reply('🔍 *Searching...*');
        let videoUrl, videoInfo;

        if (text.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/)) {
            videoUrl = text;
            videoInfo = await ytdl.getInfo(videoUrl);
        } else {
            const searchResults = await search(text);
            if (!searchResults?.videos?.length) return m.reply('❌ No videos found.');

            const video = searchResults.videos[0];
            videoUrl = video.url;
            videoInfo = await ytdl.getInfo(videoUrl);
        }

        const videoId = videoInfo.videoDetails.videoId;
        const title = videoInfo.videoDetails.title;
        const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

        await conn.sendMessage(m.chat, { 
            text: `🎵 *Found:* ${title}\n⌛ *Downloading audio...*`,
            edit: searchMessage
        });

        const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');
        const format = audioFormats
            .filter(f => f.hasAudio)
            .sort((a, b) => b.audioBitrate - a.audioBitrate)[0];

        if (!format) throw new Error('No suitable audio format found');

        const outputPath = path.join(TMP_DIR, `${videoId}.mp3`);
        const audioStream = ytdl(videoUrl, { format: format });
        const writer = fs.createWriteStream(outputPath);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
            audioStream.pipe(writer);
        });

        await conn.sendMessage(m.chat, {
            audio: { url: outputPath },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: title,
                    body: videoInfo.videoDetails.author.name,
                    thumbnailUrl: thumbnail,
                    sourceUrl: videoUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        // Clean up file
        setTimeout(() => {
            try {
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(outputPath);
                }
            } catch (err) {
                console.error('Error cleaning up file:', err);
            }
        }, 60000);

    } catch (error) {
        console.error('Play command error:', error);
        m.reply(`❌ Error: ${error.message}\nPlease try again or use a different video.`);
    }
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = /^(play|song|music)$/i;
handler.limit = true;

module.exports = handler;