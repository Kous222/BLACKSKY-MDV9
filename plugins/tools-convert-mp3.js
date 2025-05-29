const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`📌 Nutzung: *${usedPrefix + command} [YouTube-Link]*`);
    
    const url = args[0];
    if (!ytdl.validateURL(url)) return m.reply('❌ Ungültiger YouTube-Link.');

    try {
        m.reply('⏳ Bitte warten, Video wird verarbeitet...');

        const tmpDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

        const timestamp = Date.now();
        const randomName = `yt_${timestamp}`;
        const webmPath = path.join(tmpDir, `${randomName}.webm`);
        const mp3Path = path.join(tmpDir, `${randomName}.mp3`);

        const info = await ytdl.getInfo(url);
        const { title, author, videoId, lengthSeconds } = info.videoDetails;
        const duration = parseInt(lengthSeconds);

        if (duration > 1800) return m.reply('⚠️ Das Video ist zu lang. Bitte wähle eines unter 30 Minuten.');

        const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        const stream = ytdl(url, { format });
        const fileStream = fs.createWriteStream(webmPath);

        stream.pipe(fileStream); // Important to pipe first

        fileStream.on('finish', () => {
            const cmd = `ffmpeg -i "${webmPath}" -vn -ab 128k -ar 44100 -y "${mp3Path}"`;

            exec(cmd, async (err) => {
                if (fs.existsSync(webmPath)) fs.unlinkSync(webmPath);
                if (err) return m.reply('❌ Fehler bei der Konvertierung: ' + err.message);

                if (!fs.existsSync(mp3Path) || fs.statSync(mp3Path).size === 0) {
                    return m.reply('❌ Konvertierung fehlgeschlagen.');
                }

                const fileSize = formatFileSize(fs.statSync(mp3Path).size);
                await conn.sendMessage(m.chat, {
                    audio: { url: mp3Path },
                    mimetype: 'audio/mpeg',
                    fileName: `${title}.mp3`,
                    contextInfo: {
                        externalAdReply: {
                            title: title,
                            body: author.name,
                            mediaType: 2,
                            thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                            sourceUrl: url
                        }
                    }
                }, { quoted: m });

                m.reply(`✅ *Konvertierung abgeschlossen*\n\n🎵 *Titel:* ${title}\n👤 *Kanal:* ${author.name}\n📦 *Größe:* ${fileSize}`);

                setTimeout(() => {
                    if (fs.existsSync(mp3Path)) fs.unlinkSync(mp3Path);
                }, 10 * 60 * 1000);
            });
        });

        stream.on('error', (err) => {
            if (fs.existsSync(webmPath)) fs.unlinkSync(webmPath);
            m.reply('❌ Download-Fehler: ' + err.message);
        });

    } catch (err) {
        console.error('[MP3] Fehler:', err);
        m.reply('❌ Unerwarteter Fehler: ' + err.message);
    }
};

handler.help = ['mp3', 'tomp3'];
handler.tags = ['tools'];
handler.command = /^(mp3|tomp3)$/i;

module.exports = handler;

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}
