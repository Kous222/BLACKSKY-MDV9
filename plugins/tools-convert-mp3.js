/**
 * MP3 Converter Tool for YouTube Videos
 * Used to download and convert YouTube videos to MP3 files
 */

const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const os = require("os");

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Check if URL is provided
    if (!args[0]) return m.reply(`Usage: ${usedPrefix + command} [YouTube URL]`);
    
    // Get the YouTube URL
    const url = args[0];
    
    // Validate the URL
    if (!ytdl.validateURL(url)) {
        return m.reply('Invalid YouTube URL. Please provide a valid YouTube video link.');
    }
    
    try {
        // Show processing message
        m.reply('⏳ Processing your request...');
        
        // Check if temp directory exists, create if not
        const tmpDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }
        
        // Generate a random file name based on timestamp
        const timestamp = new Date().getTime();
        const randomName = `youtube_${timestamp}`;
        const outputPath = path.join(tmpDir, `${randomName}.mp3`);
        
        // Get video info
        const info = await ytdl.getInfo(url);
        const videoTitle = info.videoDetails.title;
        const videoAuthor = info.videoDetails.author.name;
        const videoId = info.videoDetails.videoId;
        const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        
        // Get the best audio format
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        
        // Check duration (max 30 minutes)
        const durationInSeconds = parseInt(info.videoDetails.lengthSeconds);
        if (durationInSeconds > 1800) {
            return m.reply('⚠️ This video is too long. Please choose a video that is less than 30 minutes.');
        }
        
        // Create a temporary file to store the audio stream
        const tempFile = path.join(tmpDir, `${randomName}.webm`);
        
        // Download the audio stream
        const stream = ytdl(url, { format: format });
        const fileStream = fs.createWriteStream(tempFile);
        
        let dataRead = 0;
        const contentLength = format.contentLength || 'unknown';
        const startTime = Date.now();
        
        // Track download progress
        stream.on('data', (chunk) => {
            dataRead += chunk.length;
            const elapsed = (Date.now() - startTime) / 1000;
            const speed = dataRead / elapsed;
            
            // Log progress every 1MB
            if (dataRead % 1000000 < 64000) {
                console.log(`[MP3] Downloaded: ${(dataRead/1024/1024).toFixed(2)}MB, Speed: ${(speed/1024/1024).toFixed(2)}MB/s`);
            }
        });
        
        // Listen for errors
        stream.on('error', (err) => {
            console.error('[MP3] Download error:', err);
            m.reply('❌ An error occurred during download: ' + err.message);
            if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        });
        
        // Handle download completion
        fileStream.on('finish', () => {
            m.reply(`📥 Download complete. Converting to MP3...`);
            
            // Convert the WebM file to MP3 using FFmpeg
            const ffmpegCommand = `ffmpeg -i "${tempFile}" -vn -ab 128k -ar 44100 -y "${outputPath}"`;
            
            exec(ffmpegCommand, async (error, stdout, stderr) => {
                // Delete the temp file
                if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
                
                if (error) {
                    console.error('[MP3] FFmpeg error:', error);
                    m.reply('❌ An error occurred during conversion: ' + error.message);
                    return;
                }
                
                // Check if the output file exists and has content
                if (!fs.existsSync(outputPath) || fs.statSync(outputPath).size === 0) {
                    m.reply('❌ Failed to convert the audio.');
                    return;
                }
                
                // Send the MP3 file
                await conn.sendMessage(m.chat, {
                    audio: { url: outputPath },
                    mimetype: 'audio/mpeg',
                    fileName: `${videoTitle}.mp3`,
                    contextInfo: {
                        externalAdReply: {
                            title: videoTitle,
                            body: videoAuthor,
                            thumbnailUrl: thumbnail,
                            sourceUrl: url
                        }
                    }
                }, { quoted: m });
                
                // Get file size
                const stats = fs.statSync(outputPath);
                const fileSize = formatFileSize(stats.size);
                
                // Send confirmation message
                m.reply(`✅ *MP3 Conversion Complete*
🎵 *Title:* ${videoTitle}
👤 *Author:* ${videoAuthor}
📦 *Size:* ${fileSize}
🔗 *Link:* ${url}`);
                
                // Schedule file cleanup after 10 minutes
                setTimeout(() => {
                    if (fs.existsSync(outputPath)) {
                        fs.unlinkSync(outputPath);
                        console.log(`[MP3] Cleaned up ${outputPath}`);
                    }
                }, 10 * 60 * 1000);
            });
        });
        
        // Start the download
        stream.pipe(fileStream);
        
    } catch (error) {
        console.error('[MP3] Error:', error);
        m.reply(`❌ Error: ${error.message}`);
    }
};

handler.help = ['mp3', 'tomp3'];
handler.tags = ['tools'];
handler.command = /^(mp3|tomp3)$/i;

module.exports = handler;

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}