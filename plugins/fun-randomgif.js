const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const util = require('util')
const execAsync = util.promisify(exec)
const { Sticker, StickerTypes } = require('wa-sticker-formatter')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Directory containing GIFs
    const gifsDir = path.join(process.cwd(), 'gifs')
    
    // Get all GIF files in the directory
    let gifFiles = fs.readdirSync(gifsDir)
        .filter(file => file.endsWith('.gif'))
    
    if (gifFiles.length === 0) {
        return m.reply('❌ Keine GIF-Dateien gefunden.')
    }
    
    // Get a random GIF file
    const randomGif = gifFiles[Math.floor(Math.random() * gifFiles.length)]
    const gifPath = path.join(gifsDir, randomGif)
    
    // Extract the name without extension
    const gifName = randomGif.replace('.gif', '')
    
    // Caption for the GIF
    const caption = `🎲 *Zufälliges GIF:* ${gifName}`
    
    try {
        // Create tmp directory if it doesn't exist
        if (!fs.existsSync('./tmp')) {
            fs.mkdirSync('./tmp');
        }

        // First method - send as animatedSticker
        try {
            const gifBuffer = fs.readFileSync(gifPath);
            const sticker = new Sticker(gifBuffer, {
                pack: 'Random GIFs', 
                author: 'WhatsApp Bot',
                type: StickerTypes.FULL,
                categories: ['🎭', '😂', '🎮'],
                id: randomGif,
                quality: 50,
                background: 'transparent'
            });
            
            const stickerBuffer = await sticker.toBuffer();

            // Send the sticker first
            await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
            
            // Then send the caption as a separate message
            await conn.reply(m.chat, caption, m);
            
            return;
        } catch (e) {
            console.log('Error sending random gif as sticker:', e);
            // If sticker conversion fails, fall back to other methods
        }

        // Second method - convert to mp4 and send as video
        try {
            const outputPath = `./tmp/randomgif_${Date.now()}.mp4`;
            
            // Convert GIF to MP4
            await execAsync(`ffmpeg -i ${gifPath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${outputPath}`);
            
            // Send as video
            await conn.sendMessage(m.chat, { 
                video: fs.readFileSync(outputPath),
                caption: caption,
                gifPlayback: true,
                mimetype: 'video/mp4'
            }, { quoted: m });
            
            // Clean up
            fs.unlinkSync(outputPath);
            return;
        } catch (e) {
            console.log('Error sending random gif as video:', e);
            // If video conversion fails, fall back to final method
        }

        // Final fallback - send as document
        await conn.sendMessage(m.chat, { 
            document: fs.readFileSync(gifPath),
            mimetype: 'image/gif',
            fileName: randomGif,
            caption: caption
        }, { quoted: m });
    } catch (error) {
        console.error('Error in randomgif command:', error);
        m.reply('❌ Es gab ein Problem beim Senden des GIFs. Versuche es später erneut.');
    }
}

handler.help = ['randomgif']
handler.tags = ['fun']
handler.command = /^(randomgif)$/i

module.exports = handler