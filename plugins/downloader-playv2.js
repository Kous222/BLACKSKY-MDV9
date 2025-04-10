/**
 * Improved YouTube Audio Downloader
 * Fully rewritten to use direct file downloads for maximum compatibility
 */

const ytdl = require("ytdl-core");
const search = require("yt-search");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { createWriteStream } = require("fs");
const { promisify } = require("util");
const { pipeline } = require("stream");
const streamPipeline = promisify(pipeline);

// Paths for temporary files
const TMP_DIR = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
}

// Cleanup old temporary files periodically
setInterval(() => {
    try {
        const now = Date.now();
        const files = fs.readdirSync(TMP_DIR);
        for (const file of files) {
            if (file.startsWith('yt_') && file.endsWith('.mp3')) {
                const filePath = path.join(TMP_DIR, file);
                const stats = fs.statSync(filePath);
                const fileAge = now - stats.mtimeMs;
                // Remove files older than 1 hour
                if (fileAge > 3600000) {
                    fs.unlinkSync(filePath);
                    console.log(`Removed old audio file: ${file}`);
                }
            }
        }
    } catch (err) {
        console.error('Error cleaning temp files:', err);
    }
}, 600000); // Run every 10 minutes

/**
 * Converts a YouTube video to audio file
 * @param {string} url - YouTube URL
 * @param {string} outputPath - Where to save the file
 * @param {Object} options - Additional options 
 * @returns {Promise<string>} - Path to the downloaded file
 */
async function downloadAndConvertAudio(url, outputPath, options = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`[Play] Starting download for: ${url}`);
            
            const info = await ytdl.getInfo(url, {
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                }
            });
            
            // Choose the best audio-only format
            const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
            if (!audioFormats || audioFormats.length === 0) {
                return reject(new Error('No audio formats available'));
            }
            
            // Sort by quality and pick the best balanced format
            const format = audioFormats
                .filter(format => format.hasAudio)
                .sort((a, b) => {
                    // Score formats by audio quality, preferring 128-192 kbps
                    const aScore = a.audioBitrate ? (a.audioBitrate >= 128 && a.audioBitrate <= 192 ? 100 : 50) : 0;
                    const bScore = b.audioBitrate ? (b.audioBitrate >= 128 && b.audioBitrate <= 192 ? 100 : 50) : 0;
                    return bScore - aScore;
                })[0];
            
            if (!format) {
                return reject(new Error('Could not find a suitable audio format'));
            }
            
            console.log(`[Play] Selected format: ${format.audioBitrate}kbps ${format.audioCodec || 'unknown codec'}`);
            
            // Create a download stream
            const stream = ytdl.downloadFromInfo(info, { format });
            
            // Set up progress tracking
            let downloadedBytes = 0;
            let totalBytes = parseInt(format.contentLength) || 0;
            
            stream.on('data', (chunk) => {
                downloadedBytes += chunk.length;
                if (totalBytes > 0) {
                    const progress = (downloadedBytes / totalBytes * 100).toFixed(2);
                    // Log progress every 20%
                    if (downloadedBytes % Math.floor(totalBytes / 5) < chunk.length) {
                        console.log(`[Play] Download progress: ${progress}%`);
                    }
                }
            });
            
            // Video info for metadata
            const videoTitle = info.videoDetails.title;
            const videoAuthor = info.videoDetails.author.name;
            const videoThumbnail = `https://i.ytimg.com/vi/${info.videoDetails.videoId}/hqdefault.jpg`;
            
            // Create intermediate file paths
            const webmPath = path.join(TMP_DIR, `yt_${info.videoDetails.videoId}_temp.webm`);
            
            // Write audio to WebM file first
            const fileStream = createWriteStream(webmPath);
            
            stream.on('error', (err) => {
                console.error('[Play] Download error:', err.message);
                // Clean up the incomplete file
                if (fs.existsSync(webmPath)) fs.unlinkSync(webmPath);
                reject(err);
            });
            
            fileStream.on('error', (err) => {
                console.error('[Play] File write error:', err.message);
                // Clean up the incomplete file
                if (fs.existsSync(webmPath)) fs.unlinkSync(webmPath);
                reject(err);
            });
            
            // When the download is complete, convert WebM to MP3
            fileStream.on('finish', () => {
                console.log(`[Play] Download complete, converting to MP3: ${webmPath}`);
                
                // Use FFmpeg to convert WebM to MP3
                const ffmpeg = spawn('ffmpeg', [
                    '-i', webmPath,
                    '-vn', // No video
                    '-acodec', 'libmp3lame',
                    '-ab', '192k', // Bitrate
                    '-ar', '44100', // Sample rate
                    '-metadata', `title=${videoTitle}`,
                    '-metadata', `artist=${videoAuthor}`,
                    outputPath
                ]);
                
                let ffmpegErrorOutput = '';
                
                ffmpeg.stderr.on('data', (data) => {
                    // Collect error output for debugging
                    ffmpegErrorOutput += data.toString();
                });
                
                ffmpeg.on('close', (code) => {
                    // Clean up the temporary WebM file
                    if (fs.existsSync(webmPath)) {
                        fs.unlinkSync(webmPath);
                    }
                    
                    if (code === 0) {
                        console.log(`[Play] Conversion successful: ${outputPath}`);
                        resolve({
                            path: outputPath,
                            title: videoTitle,
                            author: videoAuthor,
                            thumbnail: videoThumbnail,
                            videoId: info.videoDetails.videoId,
                            duration: parseInt(info.videoDetails.lengthSeconds),
                            bitrate: format.audioBitrate
                        });
                    } else {
                        console.error(`[Play] FFmpeg conversion failed with code ${code}:`);
                        console.error(ffmpegErrorOutput);
                        reject(new Error(`FFmpeg conversion failed with code ${code}`));
                    }
                });
            });
            
            // Start the download
            await streamPipeline(stream, fileStream);
            
        } catch (error) {
            console.error('[Play] Error in downloadAndConvertAudio:', error.message);
            reject(error);
        }
    });
}

// Extract video ID from YouTube URL
function extractVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
}

// Format duration to MM:SS or HH:MM:SS
function formatDuration(seconds) {
    seconds = parseInt(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

// Format view count with K, M suffixes
function formatViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    } else {
        return views.toString();
    }
}

// Format file size with KB, MB, GB suffixes
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    if (!bytes || isNaN(bytes)) return 'Unknown';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Main handler function
let handler = async (m, { conn, text, args }) => {
    if (!text) return m.reply('Please provide a YouTube link or search term!');
    
    const fastMode = args && args.find(arg => arg.toLowerCase() === 'fast' || arg.toLowerCase() === 'quick');
    
    try {
        // Check if it's a direct YouTube URL
        let videoId = null;
        let isDirectLink = false;
        let videoUrl = text;
        
        if (text.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/)) {
            videoId = extractVideoId(text);
            isDirectLink = true;
            
            if (!videoId) {
                return m.reply('❌ Invalid YouTube URL. Please provide a valid YouTube video link.');
            }
        } else {
            // Search for the video
            m.reply(`🔍 *Searching for:* ${text}`);
            
            const searchResults = await search(text);
            if (!searchResults || !searchResults.videos || searchResults.videos.length === 0) {
                return m.reply('❌ No videos found for your search term.');
            }
            
            const video = searchResults.videos[0];
            videoId = extractVideoId(video.url);
            videoUrl = video.url;
            
            // Show the found video info
            await m.reply(`
🎵 *Found:* ${video.title}
👤 *Channel:* ${video.author.name}
⏱️ *Duration:* ${video.timestamp}
📅 *Uploaded:* ${video.ago}
👁️ *Views:* ${formatViews(video.views)}

_Starting download, please wait..._`);
        }
        
        // Check if the file already exists in tmp directory
        const existingFile = path.join(TMP_DIR, `yt_${videoId}.mp3`);
        
        if (fs.existsSync(existingFile)) {
            const stats = fs.statSync(existingFile);
            // If file exists and is not empty, use it
            if (stats.size > 1024) {
                console.log(`[Play] Using cached file: ${existingFile}`);
                
                // Get basic info for the video to show in the player
                try {
                    const basicInfo = await ytdl.getBasicInfo(videoUrl);
                    
                    await conn.sendMessage(m.chat, {
                        audio: { url: existingFile },
                        mimetype: 'audio/mpeg',
                        fileName: `${basicInfo.videoDetails.title}.mp3`,
                        contextInfo: {
                            externalAdReply: {
                                title: basicInfo.videoDetails.title,
                                body: basicInfo.videoDetails.author.name,
                                thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                                sourceUrl: videoUrl,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    }, { quoted: m });
                    
                    return;
                } catch (infoError) {
                    // If getting info fails, just send the audio without rich preview
                    console.log('[Play] Error getting video info for cached file:', infoError.message);
                    
                    await conn.sendMessage(m.chat, {
                        audio: { url: existingFile },
                        mimetype: 'audio/mpeg',
                        fileName: `audio_${videoId}.mp3`
                    }, { quoted: m });
                    
                    return;
                }
            } else {
                // Remove the empty or corrupted file
                fs.unlinkSync(existingFile);
            }
        }
        
        // Create the output file path
        const outputPath = path.join(TMP_DIR, `yt_${videoId}.mp3`);
        
        try {
        // Alternative direct download method for Heroku
        const startTime = Date.now();
        
        // Get video info
        const basicInfo = await ytdl.getInfo(videoUrl, {
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            }
        });
        
        // Get audio formats and select best one
        const audioFormats = ytdl.filterFormats(basicInfo.formats, 'audioonly');
        const format = audioFormats
            .filter(format => format.hasAudio)
            .sort((a, b) => {
                // Prefer formats with known bitrates between 128-192kbps
                const aScore = a.audioBitrate ? (a.audioBitrate >= 128 && a.audioBitrate <= 192 ? 100 : 50) : 0;
                const bScore = b.audioBitrate ? (b.audioBitrate >= 128 && b.audioBitrate <= 192 ? 100 : 50) : 0;
                return bScore - aScore;
            })[0];
        
        if (!format) {
            return m.reply('❌ Could not find a suitable audio format.');
        }
        
        // Create a direct download URL
        const audioUrl = format.url;
        
        // Download the file using axios
        const response = await axios({
            method: 'GET',
            url: audioUrl,
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        // Write the audio buffer to a file
        fs.writeFileSync(outputPath, Buffer.from(response.data));
        
        const downloadTime = ((Date.now() - startTime) / 1000).toFixed(2);
        
        console.log(`[Play] Download completed in ${downloadTime}s`);
        
        // Get file stats
        const fileStats = fs.statSync(outputPath);
        const fileSize = formatFileSize(fileStats.size);
        
        // Get video metadata for displaying
        const title = basicInfo.videoDetails.title;
        const author = basicInfo.videoDetails.author.name;
        const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        
        // Show some info about the download
        await conn.sendMessage(m.chat, {
            audio: { url: outputPath },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: title,
                    body: author,
                    thumbnailUrl: thumbnail,
                    sourceUrl: videoUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
        
        // Send additional info
        await m.reply(`✅ *Download complete*
⏱️ Process time: ${downloadTime}s
📦 File size: ${fileSize}
🔊 Quality: ${format.audioBitrate || 'Unknown'}kbps`);
        
        // Clean up the file after sending to manage Heroku's limited disk space
        setTimeout(() => {
            try {
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(outputPath);
                    console.log(`Cleaned up file: ${outputPath}`);
                }
            } catch (cleanupErr) {
                console.error('Error cleaning up file:', cleanupErr);
            }
        }, 60000); // Wait 1 minute before deleting
    } catch (downloadError) {
        console.error('[Play] Direct download error:', downloadError);
        
        // Fall back to the original method as backup
        try {
            const startTime = Date.now();
            const result = await downloadAndConvertAudio(videoUrl, outputPath);
            const downloadTime = ((Date.now() - startTime) / 1000).toFixed(2);
            
            console.log(`[Play] Fallback download completed in ${downloadTime}s`);
            
            // Get file stats
            const fileStats = fs.statSync(outputPath);
            const fileSize = formatFileSize(fileStats.size);
            
            // Show some info about the download
            await conn.sendMessage(m.chat, {
                audio: { url: outputPath },
                mimetype: 'audio/mpeg',
                fileName: `${result.title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: result.title,
                        body: result.author,
                        thumbnailUrl: result.thumbnail,
                        sourceUrl: videoUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
            
            // Send additional info
            await m.reply(`✅ *Download complete*
⏱️ Process time: ${downloadTime}s
📦 File size: ${fileSize}
🔊 Quality: ${result.bitrate || 'Unknown'}kbps`);
        } catch (fallbackError) {
            throw fallbackError;
        }
    }
    } catch (e) {
        console.error('[Play] Error:', e);
        m.reply(`❌ *Error:* ${e.message}\n\nPlease try again later or try another video.`);
    }
};

handler.help = ['playv2', 'songv2'];
handler.tags = ['downloader'];
handler.command = /^(playv2|songv2|dsv2)$/i;
handler.exp = 0;

module.exports = handler;