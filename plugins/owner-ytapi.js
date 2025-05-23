/**
 * YouTube API Test Tool
 * This owner-only command tests different YouTube API services to diagnose issues
 */

const ytdl = require('ytdl-core');
const axios = require('axios');
const search = require('yt-search');

let handler = async (m, { conn, text, args }) => {
    // Owner-only command
    if (!global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) {
        return m.reply('👑 This command is only for the bot owner.');
    }
    
    if (!text) {
        return m.reply(`🔍 *YouTube API Diagnostic Tool*

This tool tests different YouTube API services to diagnose issues with the play command.

Usage: 
.ytapi <youtube_url or search_term>
.ytapi check
.ytapi reset

Options:
- check: Test all API endpoints without downloading
- reset: Clear cached connections and cookies`);
    }
    
    if (text === 'check') {
        await m.reply('🔄 Running API diagnostics. Please wait...');
        
        const results = [];
        
        // Test search functionality
        try {
            const searchStart = Date.now();
            const searchRes = await search('test music');
            const searchTime = Date.now() - searchStart;
            
            results.push({
                name: 'YouTube Search',
                status: searchRes && searchRes.videos && searchRes.videos.length > 0 ? '✅ Working' : '❌ Failed',
                time: `${searchTime}ms`,
                details: searchRes?.videos?.length ? `Found ${searchRes.videos.length} results` : 'No results'
            });
        } catch (e) {
            results.push({
                name: 'YouTube Search',
                status: '❌ Error',
                time: 'N/A',
                details: e.message
            });
        }
        
        // Test ytdl info retrieval
        try {
            const infoStart = Date.now();
            const videoInfo = await ytdl.getBasicInfo('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
                requestOptions: { 
                    headers: { 'User-Agent': 'Mozilla/5.0' } 
                }
            });
            const infoTime = Date.now() - infoStart;
            
            results.push({
                name: 'ytdl-core Info',
                status: '✅ Working',
                time: `${infoTime}ms`,
                details: `Title: ${videoInfo.videoDetails.title.substring(0, 30)}...`
            });
        } catch (e) {
            results.push({
                name: 'ytdl-core Info',
                status: '❌ Error',
                time: 'N/A',
                details: e.message
            });
        }
        
        // Test Betabotz API
        const lann = global.lann || 'Btz-jdyXQ';
        try {
            const apiStart = Date.now();
            const betabotzRes = await axios.get(`https://api.betabotz.eu.org/api/download/ytmp3?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ&apikey=${lann}`, {
                timeout: 10000
            });
            const apiTime = Date.now() - apiStart;
            
            results.push({
                name: 'Betabotz API',
                status: betabotzRes.data?.result?.url ? '✅ Working' : '❌ No URL',
                time: `${apiTime}ms`,
                details: betabotzRes.data?.result?.url ? 'URL received' : JSON.stringify(betabotzRes.data).substring(0, 50)
            });
        } catch (e) {
            results.push({
                name: 'Betabotz API',
                status: '❌ Error',
                time: 'N/A',
                details: e.message
            });
        }
        
        // Test Y2Mate API
        try {
            const y2mateStart = Date.now();
            
            // First request to get token
            const analyzeRes = await axios.post('https://www.y2mate.com/mates/analyzeV2/ajax', 
                new URLSearchParams({
                    'k_query': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    'k_page': 'home',
                    'hl': 'en',
                    'q_auto': '0'
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'Origin': 'https://www.y2mate.com',
                        'Referer': 'https://www.y2mate.com/'
                    },
                    timeout: 10000
                }
            );
            
            const y2mateTime = Date.now() - y2mateStart;
            
            results.push({
                name: 'Y2Mate API',
                status: analyzeRes.data?.vid ? '✅ Working' : '❌ No Video ID',
                time: `${y2mateTime}ms`,
                details: analyzeRes.data?.vid ? 
                    `Video ID: ${analyzeRes.data.vid}, Formats: ${Object.keys(analyzeRes.data.links || {}).join(', ')}` : 
                    JSON.stringify(analyzeRes.data).substring(0, 50)
            });
        } catch (e) {
            results.push({
                name: 'Y2Mate API',
                status: '❌ Error',
                time: 'N/A',
                details: e.message
            });
        }
        
        // Format and send results
        let reportText = `📊 *YouTube API Diagnostic Results*\n\n`;
        
        for (const result of results) {
            reportText += `*${result.name}*\n`;
            reportText += `Status: ${result.status}\n`;
            reportText += `Response Time: ${result.time}\n`;
            reportText += `Details: ${result.details}\n\n`;
        }
        
        reportText += `🧪 Test completed at ${new Date().toLocaleString()}`;
        
        await m.reply(reportText);
        return;
    }
    
    if (text === 'reset') {
        try {
            // Clear ytdl cache
            if (ytdl.cache) {
                ytdl.cache.clear();
                console.log('ytdl cache cleared');
            }
            
            // Reset axios agent
            axios.defaults.agent = null;
            
            await m.reply('✅ YouTube API connections reset. The system will rebuild connections on the next request.');
        } catch (e) {
            await m.reply(`❌ Error resetting connections: ${e.message}`);
        }
        return;
    }
    
    // If we get here, the user provided a YouTube URL or search term
    await m.reply('🔍 Testing YouTube download... Please wait.');
    
    try {
        // Check if input is a URL
        const isUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(text);
        
        // If not a URL, search for it first
        if (!isUrl) {
            const searchResults = await search(text);
            if (!searchResults || !searchResults.videos || searchResults.videos.length === 0) {
                return m.reply('❌ No videos found for your search query.');
            }
            
            // Use the first result
            text = searchResults.videos[0].url;
            await m.reply(`🎵 Found video: "${searchResults.videos[0].title}"\n🔗 URL: ${text}\n\nTesting download now...`);
        }
        
        // Get video info
        const videoInfo = await ytdl.getInfo(text, {
            requestOptions: { 
                headers: { 'User-Agent': 'Mozilla/5.0' } 
            }
        });
        
        // Get audio formats
        const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');
        
        if (!audioFormats || audioFormats.length === 0) {
            return m.reply('❌ No audio formats available for this video.');
        }
        
        // Show available formats
        let formatReport = `📄 *Available Audio Formats*\n\nTitle: ${videoInfo.videoDetails.title}\nLength: ${formatDuration(videoInfo.videoDetails.lengthSeconds)}\n\n`;
        
        audioFormats.forEach((format, index) => {
            formatReport += `${index + 1}. Bitrate: ${format.audioBitrate || 'N/A'}kbps, Codec: ${format.audioCodec || 'N/A'}, Size: ${format.contentLength ? formatFileSize(format.contentLength) : 'Unknown'}\n`;
        });
        
        formatReport += `\nTotal formats: ${audioFormats.length}`;
        
        await m.reply(formatReport);
        
        // Test downloading using one of the formats
        const selectedFormat = audioFormats.find(f => f.audioBitrate >= 128) || audioFormats[0];
        
        await m.reply(`🧪 Testing download of format with ${selectedFormat.audioBitrate}kbps bitrate...`);
        
        try {
            // Try to send the audio
            await conn.sendMessage(m.chat, {
                audio: { url: selectedFormat.url },
                mimetype: 'audio/mpeg',
                fileName: `${videoInfo.videoDetails.title.replace(/[^\w\s]/gi, '')}.mp3`
            }, { quoted: m });
            
            await m.reply('✅ Direct download test successful! The play command should work properly now.');
        } catch (downloadError) {
            await m.reply(`❌ Direct download test failed: ${downloadError.message}`);
        }
        
    } catch (e) {
        await m.reply(`❌ Error during API test: ${e.message}`);
    }
};

handler.help = ['ytapi'];
handler.tags = ['owner'];
handler.command = /^(ytapi|yttest)$/i;

module.exports = handler;

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

function formatFileSize(bytes) {
    if (!bytes || isNaN(bytes)) return 'Unknown';
    
    bytes = parseInt(bytes);
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}