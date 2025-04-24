const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const sharp = require('sharp');
const { tmpdir } = require('os');
const { promisify } = require('util');
const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

const execAsync = promisify(exec);
const lann = global.lann || 'Btz-jdyXQ';

// Temporary directory for processing
const TMP_DIR = path.join(tmpdir(), 'wa_stickers');
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

// Basic sticker cache
const STICKER_CACHE_SIZE = 30;
const stickerCache = new Map();

// Calculate a simple hash for buffer
function calculateHash(buffer) {
    let hash = 0;
    const samples = 20;
    const step = Math.max(1, Math.floor(buffer.length / samples));
    for (let i = 0; i < buffer.length; i += step) {
        hash = ((hash << 5) - hash) + buffer[i];
        hash = hash & hash;
    }
    return hash.toString(16);
}

// Sticker generation methods
const stickerAPIs = [
    // 1: Built-in Baileys
    async (buffer, conn, m, options) => {
        return await conn.sendImageAsSticker(m.chat, buffer, m, options);
    },

    // 2: External API
    async (buffer, conn, m, options) => {
        const url = await uploadImage(buffer);
        const apiUrl = `https://api.betabotz.eu.org/api/maker/sticker?url=${encodeURIComponent(url)}&apikey=${lann}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API responded with status: ${response.status}`);
        const stickerBuffer = await response.buffer();
        return await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
    },

    // 3: wa-sticker-formatter
    async (buffer, conn, m, options) => {
        try {
            const { default: WSF } = await import('wa-sticker-formatter');
            const wsf = new WSF.Sticker(buffer, {
                pack: options.packname || global.packname,
                author: options.author || global.author,
                type: WSF.StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                quality: 70,
                id: options.id || Math.random().toString(36).substring(2)
            });
            const stickerBuffer = await wsf.toBuffer();
            return await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
        } catch (e) {
            throw new Error('wa-sticker-formatter not available: ' + e.message);
        }
    }
];

let handler = async (m, { conn, command, usedPrefix }) => {
    let q = m.quoted || m;
    let mime = (q.msg || q).mimetype || '';

    if (/image|bild/i.test(mime)) {
        m.reply('Processing... Please wait.');
        const startTime = Date.now();
        let media = await q.download();

        try {
            const mediaHash = calculateHash(media);

            if (stickerCache.has(mediaHash)) {
                console.log(`Using cached sticker (${mediaHash})`);
                await conn.sendMessage(m.chat, { sticker: stickerCache.get(mediaHash) }, { quoted: m });
                console.log(`Sent from cache in ${(Date.now() - startTime) / 1000}s`);
                return;
            }

            const processed = await sharp(media)
                .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .toFormat('png', { quality: 90, compressionLevel: 9 })
                .toBuffer();

            let success = false, finalStickerBuffer = null;

            for (const method of stickerAPIs) {
                try {
                    if (stickerAPIs.indexOf(method) === 0) {
                        const result = await conn.prepareImageSticker(processed, {
                            packname: global.packname || "WhatsApp Bot",
                            author: global.author || "Created with ❤️"
                        });
                        finalStickerBuffer = result;
                        await conn.sendMessage(m.chat, { sticker: result }, { quoted: m });
                    } else {
                        await method(processed, conn, m, {
                            packname: global.packname || "WhatsApp Bot",
                            author: global.author || "Created with ❤️"
                        });
                    }

                    success = true;

                    if (finalStickerBuffer) {
                        if (stickerCache.size >= STICKER_CACHE_SIZE) {
                            stickerCache.delete(stickerCache.keys().next().value);
                        }
                        stickerCache.set(mediaHash, finalStickerBuffer);
                        console.log(`Cached sticker ${mediaHash}, cache size: ${stickerCache.size}`);
                    }

                    break;
                } catch (e) {
                    console.error('Sticker method failed:', e);
                }
            }

            if (!success) throw new Error('All sticker methods failed.');

            console.log(`Sticker created in ${(Date.now() - startTime) / 1000}s`);
        } catch (e) {
            console.error('Error:', e);
            m.reply('Fehler beim Erstellen des Stickers: ' + e.message);
        }

    } else if (/video|vid/i.test(mime)) {
        if ((q.msg || q).seconds > 7) return m.reply('Maximal 6 Sekunden!');

        m.reply('Processing video... Please wait.');
        const startTime = Date.now();
        let media = await q.download();

        try {
            const mediaHash = calculateHash(media);

            if (stickerCache.has(`video_${mediaHash}`)) {
                console.log(`Using cached video sticker (${mediaHash})`);
                await conn.sendMessage(m.chat, { sticker: stickerCache.get(`video_${mediaHash}`) }, { quoted: m });
                return;
            }

            await conn.sendVideoAsSticker(m.chat, media, m, {
                packname: global.packname || "WhatsApp Bot",
                author: global.author || "Created with ❤️"
            });

        } catch (e) {
            console.error('Video error:', e);

            try {
                const tempFile = path.join(TMP_DIR, `video_${Date.now()}.mp4`);
                fs.writeFileSync(tempFile, media);

                const url = await uploadImage(media);
                const apiUrl = `https://api.betabotz.eu.org/api/maker/stickergif?url=${encodeURIComponent(url)}&apikey=${lann}`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`API responded with status: ${response.status}`);

                const stickerBuffer = await response.buffer();
                await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });

                const mediaHash = calculateHash(media);
                if (stickerCache.size >= STICKER_CACHE_SIZE) {
                    stickerCache.delete(stickerCache.keys().next().value);
                }
                stickerCache.set(`video_${mediaHash}`, stickerBuffer);

                fs.existsSync(tempFile) && fs.unlinkSync(tempFile);
            } catch (fallbackError) {
                console.error('Fallback failed:', fallbackError);
                m.reply('Fehler beim Verarbeiten des Videos. Nutze ein kürzeres Video oder ein Bild.');
            }
        }

    } else {
        throw `Sende ein Bild/Video mit Beschriftung ${usedPrefix + command}\nVideodauer 1–6 Sekunden.`;
    }
};

handler.help = ['sticker', 'aufkleber', 's'];
handler.tags = ['sticker'];
handler.command = /^(s(ticker)?|aufkleber)$/i;
handler.limit = true;

module.exports = handler;
