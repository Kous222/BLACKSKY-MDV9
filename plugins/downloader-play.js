const ytdl = require('ytdl-core');
const search = require('yt-search');
const fs = require('fs');
const path = require('path');

const TMP_DIR = '/tmp'; // Nur auf Heroku beschreibbar

let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) return m.reply(`Bitte gib einen Songtitel oder YouTube-Link an.\n\nBeispiel: ${usedPrefix}play Despacito`);

    try {
        let searchMessage = await m.reply('🔍 *Suche läuft...*');
        let videoUrl, videoInfo;

        if (text.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/)) {
            videoUrl = text;
            videoInfo = await ytdl.getInfo(videoUrl);
        } else {
            const searchResults = await search(text);
            if (!searchResults?.videos?.length) return m.reply('❌ Keine Videos gefunden.');

            const video = searchResults.videos[0];
            videoUrl = video.url;
            videoInfo = await ytdl.getInfo(videoUrl);
        }

        const videoId = videoInfo.videoDetails.videoId;
        const title = videoInfo.videoDetails.title;
        const duration = parseInt(videoInfo.videoDetails.lengthSeconds || '0');
        const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

        if (duration > 600) return m.reply('❌ Das Video ist zu lang. Maximal 10 Minuten erlaubt.');

        await conn.sendMessage(m.chat, { 
            text: `🎵 *Gefunden:* ${title}\n⌛ *Lade Audio herunter...*`,
            edit: searchMessage
        });

        const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly').filter(f =>
            f.mimeType.includes('audio/mp4') || f.mimeType.includes('audio/mpeg')
        );
        const format = audioFormats
            .filter(f => f.hasAudio)
            .sort((a, b) => b.audioBitrate - a.audioBitrate)[0];

        if (!format) throw new Error('Kein geeignetes Audioformat gefunden');

        const outputPath = path.join(TMP_DIR, `${videoId}.mp3`);
        const audioStream = ytdl(videoUrl, {
            format: format,
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            }
        });
        const writer = fs.createWriteStream(outputPath);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
            audioStream.pipe(writer);
        });

        await new Promise(resolve => setTimeout(resolve, 1000)); // kurze Wartezeit nach Schreibvorgang

        const audioBuffer = fs.readFileSync(outputPath);

        await conn.sendMessage(m.chat, {
            audio: audioBuffer,
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

        setTimeout(() => {
            try {
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(outputPath);
                }
            } catch (err) {
                console.error('Fehler beim Löschen:', err);
            }
        }, 60000);

    } catch (error) {
        console.error('Fehler im Play-Befehl:', error);
        m.reply(`❌ Fehler: ${error.message.includes("captcha") ? "YouTube blockiert den Zugriff von diesem Server.\nVersuche ein anderes Lied oder verwende einen Proxy/VPS." : error.message}`);
    }
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = /^(play|song|music)$/i;
handler.limit = true;

module.exports = handler;
