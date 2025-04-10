const ytdl = require('@distube/ytdl-core');
const ytSearch = require('yt-search');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Ensure tmp directory exists
const TMP_DIR = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
}

/**
 * Improved play command optimized for Heroku
 * - Uses buffer-based approach instead of streaming
 * - Downloads the audio in smaller chunks
 * - Handles Heroku's ephemeral filesystem better
 */
let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Gib den Songtitel oder YouTube-Link an.');

    // Send initial processing message
    const processingMsg = await m.reply('🔍 *Searching and processing your request...*');
    
    try {
        // Search for the video
        const searchResult = await ytSearch(text);
        const video = searchResult.videos[0];
        if (!video) return m.reply('❌ Kein Video gefunden.');

        const videoUrl = video.url;
        const videoId = video.videoId;
        const title = video.title;
        const thumbnail = video.thumbnail;
        
        // Update status message
        await conn.sendMessage(m.chat, { text: `✅ *Found:* ${title}\n👤 *Channel:* ${video.author.name}\n⏱️ *Duration:* ${video.timestamp}\n\n_Starting download, please wait..._`, edit: processingMsg });
        
        // File path for downloaded audio
        const outputPath = path.join(TMP_DIR, `yt_${videoId}.mp3`);
        
        // Get video info
        const info = await ytdl.getInfo(videoUrl, {
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            }
        });
        
        // Get audio formats and select best one (prioritizing mp3 or adaptive formats)
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
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
        
        // Final update to the status message
        await conn.sendMessage(m.chat, { text: `✅ *Download completed*\n🎵 *Title:* ${title}\n🔊 *Quality:* ${format.audioBitrate}kbps\n\n_Sending audio now..._`, edit: processingMsg });
        
        // Send the audio file
        await conn.sendMessage(m.chat, {
            audio: { url: outputPath },
            mimetype: 'audio/mpeg',
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
        
        // Clean up the file after sending (optional, can be removed if you want to keep files)
        // This helps manage Heroku's limited disk space
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
        
    } catch (err) {
        console.error('Play command error:', err);
        return m.reply(`❌ Ein Fehler ist aufgetreten:\n${err.message}`);
    }
};

handler.command = ['play'];
handler.help = ['play <titel>'];
handler.tags = ['downloader'];
handler.limit = true;

module.exports = handler;
