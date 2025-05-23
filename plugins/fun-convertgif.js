const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Check if this is a reply to a message
    if (!m.quoted || !m.quoted.mimetype || !m.quoted.mimetype.includes('image')) {
        return m.reply(`✳️ Antworte auf ein GIF oder Bild mit *${usedPrefix + command}*`);
    }
    
    // Get the quoted message (the GIF)
    const quotedMsg = m.quoted;
    
    try {
        // Create temp folder if it doesn't exist
        if (!fs.existsSync('./tmp')) {
            fs.mkdirSync('./tmp');
        }
        
        // Download the media
        m.reply('⏳ Konvertiere das GIF...');
        const media = await quotedMsg.download();
        const inputPath = './tmp/inputgif_' + Math.floor(Math.random() * 10000) + '.gif';
        const outputPath = './tmp/outputgif_' + Math.floor(Math.random() * 10000) + '.mp4';
        
        // Save media to a temporary file
        fs.writeFileSync(inputPath, media);
        
        // Convert GIF to MP4 using FFmpeg (better for WhatsApp)
        await execAsync(`ffmpeg -i ${inputPath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${outputPath}`);
        
        // Send the converted GIF as a video
        await conn.sendFile(
            m.chat,
            outputPath,
            'converted.mp4',
            'Hier ist dein konvertiertes GIF',
            m,
            true,
            {
                asDocument: false,
                gifPlayback: true
            }
        );
        
        // Clean up temporary files
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
        
    } catch (error) {
        console.error(error);
        return m.reply('❌ Es gab einen Fehler bei der Konvertierung des GIFs. Bitte versuche es erneut.');
    }
};

handler.help = ['convertgif'];
handler.tags = ['tools'];
handler.command = /^(convertgif)$/i;

module.exports = handler;