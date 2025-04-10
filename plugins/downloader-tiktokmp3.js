/**
 * TikTok MP3 Downloader
 * Extracts audio from TikTok videos and sends as MP3
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Check if URL is provided
    if (!args[0]) {
        return m.reply(`Usage: ${usedPrefix + command} [TikTok URL]`);
    }
    
    // Get the TikTok URL
    const url = args[0];
    
    // Basic URL validation
    if (!url.match(/^https?:\/\/(www\.|vm\.|vt\.|)?tiktok\.com/)) {
        return m.reply('Invalid TikTok URL. Please provide a valid TikTok video link.');
    }
    
    try {
        // Show processing message
        m.reply('⏳ Processing your TikTok audio request...');
        
        // Various TikTok API options (try multiple in sequence if needed)
        
        // First attempt - using tikwm API
        try {
            const apiUrl = `https://api.tikwm.com/service/api/music/url?url=${encodeURIComponent(url)}`;
            const response = await axios.get(apiUrl, { timeout: 10000 });
            
            if (response.data && response.data.code === 0 && response.data.data && response.data.data.music_url) {
                // Create a temporary file to store the audio
                const tmpDir = path.join(process.cwd(), 'tmp');
                if (!fs.existsSync(tmpDir)) {
                    fs.mkdirSync(tmpDir, { recursive: true });
                }
                
                const timestamp = new Date().getTime();
                const outputPath = path.join(tmpDir, `tiktok_${timestamp}.mp3`);
                
                // Download the audio
                const audioResponse = await axios({
                    method: 'get',
                    url: response.data.data.music_url,
                    responseType: 'stream',
                    timeout: 30000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });
                
                // Save the audio to a file
                const writer = fs.createWriteStream(outputPath);
                
                audioResponse.data.pipe(writer);
                
                return new Promise((resolve, reject) => {
                    writer.on('finish', async () => {
                        try {
                            // Get metadata from the API response
                            const title = response.data.data.music_title || 'TikTok Audio';
                            const author = response.data.data.music_author || 'Unknown';
                            const cover = response.data.data.cover_url || null;
                            
                            // Get file size
                            const stats = fs.statSync(outputPath);
                            const fileSize = formatFileSize(stats.size);
                            
                            // Send the MP3 file
                            await conn.sendMessage(m.chat, {
                                audio: { url: outputPath },
                                mimetype: 'audio/mpeg',
                                fileName: `${title}.mp3`,
                                contextInfo: cover ? {
                                    externalAdReply: {
                                        title: title,
                                        body: author,
                                        thumbnailUrl: cover,
                                        sourceUrl: url
                                    }
                                } : undefined
                            }, { quoted: m });
                            
                            // Send confirmation message
                            m.reply(`✅ *TikTok Audio Downloaded*
🎵 *Title:* ${title}
👤 *Author:* ${author}
📦 *Size:* ${fileSize}`);
                            
                            // Schedule file cleanup after 10 minutes
                            setTimeout(() => {
                                if (fs.existsSync(outputPath)) {
                                    fs.unlinkSync(outputPath);
                                    console.log(`[TikTok] Cleaned up ${outputPath}`);
                                }
                            }, 10 * 60 * 1000);
                            
                            resolve();
                        } catch (error) {
                            console.error('[TikTok] Error sending file:', error);
                            m.reply('❌ Error sending the audio file: ' + error.message);
                            reject(error);
                        }
                    });
                    
                    writer.on('error', (error) => {
                        console.error('[TikTok] Error saving file:', error);
                        m.reply('❌ Error saving the audio file: ' + error.message);
                        reject(error);
                    });
                });
            }
        } catch (firstApiError) {
            console.log('[TikTok] First API method failed:', firstApiError.message);
            // Continue to next method
        }
        
        // Second attempt - using alternative API
        try {
            const apiUrl = `https://api.akuari.my.id/downloader/tiktok?link=${encodeURIComponent(url)}`;
            const response = await axios.get(apiUrl, { timeout: 10000 });
            
            if (response.data && response.data.hasil && response.data.hasil.audio) {
                // Create a temporary file to store the audio
                const tmpDir = path.join(process.cwd(), 'tmp');
                if (!fs.existsSync(tmpDir)) {
                    fs.mkdirSync(tmpDir, { recursive: true });
                }
                
                const timestamp = new Date().getTime();
                const outputPath = path.join(tmpDir, `tiktok_${timestamp}.mp3`);
                
                // Download the audio
                const audioResponse = await axios({
                    method: 'get',
                    url: response.data.hasil.audio,
                    responseType: 'stream',
                    timeout: 30000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });
                
                // Save the audio to a file
                const writer = fs.createWriteStream(outputPath);
                
                audioResponse.data.pipe(writer);
                
                return new Promise((resolve, reject) => {
                    writer.on('finish', async () => {
                        try {
                            // Get metadata from the API response
                            const title = response.data.hasil.title || 'TikTok Audio';
                            const author = response.data.hasil.author || 'Unknown';
                            const cover = response.data.hasil.thumbnail || null;
                            
                            // Get file size
                            const stats = fs.statSync(outputPath);
                            const fileSize = formatFileSize(stats.size);
                            
                            // Send the MP3 file
                            await conn.sendMessage(m.chat, {
                                audio: { url: outputPath },
                                mimetype: 'audio/mpeg',
                                fileName: `${title}.mp3`,
                                contextInfo: cover ? {
                                    externalAdReply: {
                                        title: title,
                                        body: author,
                                        thumbnailUrl: cover,
                                        sourceUrl: url
                                    }
                                } : undefined
                            }, { quoted: m });
                            
                            // Send confirmation message
                            m.reply(`✅ *TikTok Audio Downloaded*
🎵 *Title:* ${title}
👤 *Author:* ${author}
📦 *Size:* ${fileSize}`);
                            
                            // Schedule file cleanup after 10 minutes
                            setTimeout(() => {
                                if (fs.existsSync(outputPath)) {
                                    fs.unlinkSync(outputPath);
                                    console.log(`[TikTok] Cleaned up ${outputPath}`);
                                }
                            }, 10 * 60 * 1000);
                            
                            resolve();
                        } catch (error) {
                            console.error('[TikTok] Error sending file:', error);
                            m.reply('❌ Error sending the audio file: ' + error.message);
                            reject(error);
                        }
                    });
                    
                    writer.on('error', (error) => {
                        console.error('[TikTok] Error saving file:', error);
                        m.reply('❌ Error saving the audio file: ' + error.message);
                        reject(error);
                    });
                });
            }
        } catch (secondApiError) {
            console.log('[TikTok] Second API method failed:', secondApiError.message);
            // Continue to final method
        }
        
        // Final attempt - using a more reliable but slower method
        // Download the video first, then extract audio
        const tmpDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }
        
        const timestamp = new Date().getTime();
        const videoPath = path.join(tmpDir, `tiktok_${timestamp}.mp4`);
        const audioPath = path.join(tmpDir, `tiktok_${timestamp}.mp3`);
        
        // Use a fallback API to get the video
        const fallbackApiUrl = `https://api.dlpanda.com/v1/tiktok?url=${encodeURIComponent(url)}&token=UVlVV1RkdERjSWVBdlFWcFljTGZTUFZsNjYzaGlRQVFpZGdXNFd5UXJBNVBhN3A1bnV5TWx2NVRpdD09`;
        
        try {
            const response = await axios.get(fallbackApiUrl, { timeout: 15000 });
            
            if (response.data && response.data.video_url) {
                // Download the video
                const videoResponse = await axios({
                    method: 'get',
                    url: response.data.video_url,
                    responseType: 'stream',
                    timeout: 30000
                });
                
                // Save the video to a file
                const videoWriter = fs.createWriteStream(videoPath);
                videoResponse.data.pipe(videoWriter);
                
                await new Promise((resolve, reject) => {
                    videoWriter.on('finish', resolve);
                    videoWriter.on('error', reject);
                });
                
                // Extract audio using FFmpeg
                m.reply('📹 Video downloaded. Extracting audio...');
                
                const ffmpegCommand = `ffmpeg -i "${videoPath}" -vn -acodec libmp3lame -ab 128k "${audioPath}"`;
                
                exec(ffmpegCommand, async (error, stdout, stderr) => {
                    // Delete the video file
                    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
                    
                    if (error) {
                        console.error('[TikTok] FFmpeg error:', error);
                        m.reply('❌ Error extracting audio: ' + error.message);
                        return;
                    }
                    
                    // Check if the output file exists and has content
                    if (!fs.existsSync(audioPath) || fs.statSync(audioPath).size === 0) {
                        m.reply('❌ Failed to extract audio from the video.');
                        return;
                    }
                    
                    // Get file size
                    const stats = fs.statSync(audioPath);
                    const fileSize = formatFileSize(stats.size);
                    
                    // Get metadata from API response
                    const title = response.data.title || 'TikTok Audio';
                    const author = response.data.author_name || 'Unknown';
                    const cover = response.data.thumbnail_url || null;
                    
                    // Send the MP3 file
                    await conn.sendMessage(m.chat, {
                        audio: { url: audioPath },
                        mimetype: 'audio/mpeg',
                        fileName: `${title}.mp3`,
                        contextInfo: cover ? {
                            externalAdReply: {
                                title: title,
                                body: author,
                                thumbnailUrl: cover,
                                sourceUrl: url
                            }
                        } : undefined
                    }, { quoted: m });
                    
                    // Send confirmation message
                    m.reply(`✅ *TikTok Audio Extracted*
🎵 *Title:* ${title}
👤 *Author:* ${author}
📦 *Size:* ${fileSize}`);
                    
                    // Schedule file cleanup after 10 minutes
                    setTimeout(() => {
                        if (fs.existsSync(audioPath)) {
                            fs.unlinkSync(audioPath);
                            console.log(`[TikTok] Cleaned up ${audioPath}`);
                        }
                    }, 10 * 60 * 1000);
                });
                
                return;
            }
        } catch (fallbackError) {
            console.error('[TikTok] Fallback method failed:', fallbackError.message);
        }
        
        // If all methods failed
        throw new Error('All download methods failed. Please try a different TikTok URL or try again later.');
        
    } catch (error) {
        console.error('[TikTok] Error:', error);
        m.reply(`❌ Error: ${error.message}`);
    }
};

handler.help = ['tiktokmp3', 'ttmp3'];
handler.tags = ['downloader'];
handler.command = /^(tiktokmp3|ttmp3)$/i;

module.exports = handler;

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}