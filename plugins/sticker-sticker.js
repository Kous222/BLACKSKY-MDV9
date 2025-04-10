const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const sharp = require('sharp');
const { tmpdir } = require('os');
const { promisify } = require('util');
const execAsync = promisify(exec);
const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

// Get API key
const lann = global.lann || 'Btz-jdyXQ';

// Create a temporary directory for sticker processing
const TMP_DIR = path.join(tmpdir(), 'wa_stickers');
if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
}

// Create a basic sticker cache to improve performance
const STICKER_CACHE_SIZE = 30; // Max number of stickers to cache
const stickerCache = new Map(); // Map of hash → sticker buffer

// Calculate a simple hash for the buffer
function calculateHash(buffer) {
    let hash = 0;
    const samples = 20; // Take 20 samples from the buffer for faster hash calculation
    const step = Math.max(1, Math.floor(buffer.length / samples));
    
    for (let i = 0; i < buffer.length; i += step) {
        hash = ((hash << 5) - hash) + buffer[i];
        hash = hash & hash; // Convert to 32bit integer
    }
    
    return hash.toString(16); // Return as hex string
}

// Alternative APIs for sticker generation
const stickerAPIs = [
    // First method - direct sendImageAsSticker (builtin Baileys) - fastest method
    async (buffer, conn, m, options) => {
        return await conn.sendImageAsSticker(m.chat, buffer, m, options);
    },
    
    // Second method - Use external API
    async (buffer, conn, m, options) => {
        // Upload the image to get a URL
        const url = await uploadImage(buffer);
        
        // Get sticker from API
        const apiUrl = `https://api.betabotz.eu.org/api/maker/sticker?url=${encodeURIComponent(url)}&apikey=${lann}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error(`API responded with status: ${response.status}`);
        
        const stickerBuffer = await response.buffer();
        return await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
    },
    
    // Third method - Use wa-sticker-formatter (if available)
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
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (/image|bild/i.test(mime)) {
        const startTime = Date.now(); // Track processing time
        m.reply('Processing... Please wait.');
        let medien = await q.download();
        
        try {
            // Calculate hash for original media to check cache
            const mediaHash = calculateHash(medien);
            
            // Check if we have this sticker cached
            if (stickerCache.has(mediaHash)) {
                console.log(`Using cached sticker (${mediaHash})`);
                const cachedSticker = stickerCache.get(mediaHash);
                await conn.sendMessage(m.chat, { sticker: cachedSticker }, { quoted: m });
                console.log(`Sticker sent from cache in ${(Date.now() - startTime) / 1000}s`);
                return;
            }
            
            // Resize and optimize the image with sharp - use lower quality for speed
            let processedMedia = await sharp(medien)
                .resize(512, 512, { 
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 } 
                })
                .toFormat('png', { quality: 90, compressionLevel: 9 }) // Higher compression for smaller file size
                .toBuffer();
            
            // Try all sticker methods until one works
            let success = false;
            let error = null;
            let finalStickerBuffer = null;
            
            for (const method of stickerAPIs) {
                try {
                    // For the first method (sendImageAsSticker), we need to capture the buffer
                    if (stickerAPIs.indexOf(method) === 0) {
                        // Use the direct method but cache the result
                        const result = await conn.prepareImageSticker(processedMedia, { 
                            packname: global.packname || "WhatsApp Bot", 
                            author: global.author || "Created with ❤️" 
                        });
                        
                        finalStickerBuffer = result;
                        await conn.sendMessage(m.chat, { sticker: result }, { quoted: m });
                    } else {
                        await method(processedMedia, conn, m, { 
                            packname: global.packname || "WhatsApp Bot", 
                            author: global.author || "Created with ❤️" 
                        });
                    }
                    
                    success = true;
                    
                    // Update cache with the generated sticker
                    if (finalStickerBuffer) {
                        // Manage cache size - remove oldest entry if full
                        if (stickerCache.size >= STICKER_CACHE_SIZE) {
                            const oldestKey = stickerCache.keys().next().value;
                            stickerCache.delete(oldestKey);
                        }
                        
                        stickerCache.set(mediaHash, finalStickerBuffer);
                        console.log(`Cached sticker with hash ${mediaHash}, cache size: ${stickerCache.size}`);
                    }
                    
                    break;
                } catch (e) {
                    console.error('Sticker method failed:', e);
                    error = e;
                    // Continue to next method
                }
            }
            
            if (!success) {
                throw new Error('All sticker creation methods failed: ' + error?.message);
            }
            
            console.log(`Sticker created and sent in ${(Date.now() - startTime) / 1000}s`);
            
        } catch (e) {
            console.error('Error processing image:', e);
            m.reply('Failed to create sticker. Error: ' + e.message);
        }
    } else if (/video|vid/i.test(mime)) {
        if ((q.msg || q).seconds > 7) return m.reply('Maximal 6 Sekunden!');
        
        const startTime = Date.now(); // Track processing time
        m.reply('Processing video... Please wait.');
        let medien = await q.download();
        
        try {
            // Calculate hash for video
            const mediaHash = calculateHash(medien);
            
            // Check if we have this video sticker cached
            if (stickerCache.has(`video_${mediaHash}`)) {
                console.log(`Using cached video sticker (${mediaHash})`);
                const cachedSticker = stickerCache.get(`video_${mediaHash}`);
                await conn.sendMessage(m.chat, { sticker: cachedSticker }, { quoted: m });
                console.log(`Video sticker sent from cache in ${(Date.now() - startTime) / 1000}s`);
                return;
            }
            
            // Just use the direct method for videos as it's more reliable
            // For videos, we can't easily capture the prepared sticker, so we skip caching for the direct method
            await conn.sendVideoAsSticker(m.chat, medien, m, { 
                packname: global.packname || "WhatsApp Bot", 
                author: global.author || "Created with ❤️" 
            });
            
            console.log(`Video sticker created and sent in ${(Date.now() - startTime) / 1000}s`);
        } catch (e) {
            console.error('Error processing video:', e);
            
            // Try API fallback for video
            try {
                // Save to temp file
                const tempFile = path.join(TMP_DIR, `video_${Date.now()}.mp4`);
                fs.writeFileSync(tempFile, medien);
                
                // Upload the video to get a URL
                const url = await uploadImage(medien);
                
                // Get sticker from API
                const apiUrl = `https://api.betabotz.eu.org/api/maker/stickergif?url=${encodeURIComponent(url)}&apikey=${lann}`;
                
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`API responded with status: ${response.status}`);
                
                const stickerBuffer = await response.buffer();
                await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
                
                // Cache the result
                const mediaHash = calculateHash(medien);
                if (stickerCache.size >= STICKER_CACHE_SIZE) {
                    const oldestKey = stickerCache.keys().next().value;
                    stickerCache.delete(oldestKey);
                }
                stickerCache.set(`video_${mediaHash}`, stickerBuffer);
                
                // Clean up
                if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
                
                console.log(`Video sticker created via API and sent in ${(Date.now() - startTime) / 1000}s`);
            } catch (fallbackError) {
                console.error('Video sticker fallback also failed:', fallbackError);
                m.reply('Fehler bei der Verarbeitung des Videos. Versuche es mit einem kürzeren Video oder einem Bild.');
            }
        }
    } else {
        throw `Sende ein Bild/Video mit Beschriftung ${usedPrefix + command}\nVideodauer 1-6 Sekunden.`;
    }
};

handler.help = ['sticker', 'aufkleber', 's'];
handler.tags = ['sticker'];
handler.command = /^(s(ticker)?|aufkleber)$/i;
handler.limit = true;
module.exports = handler;
