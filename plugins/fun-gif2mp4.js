const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const util = require('util')
const execAsync = util.promisify(exec)

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Check if there are arguments
    if (!args[0]) {
        return conn.reply(m.chat, `✳️ Bitte gib den Namen eines GIFs an.\n\nBeispiel: *${usedPrefix + command} hug*`, m)
    }
    
    // Map of English command names to GIF filenames
    const gifCommands = {
        'angry': 'angry.gif',
        'bite': 'bite.gif',
        'blush': 'blush.gif',
        'bonk': 'bonk.gif',
        'bored': 'bored.gif',
        'confused': 'confused.gif',
        'cool': 'cool.gif',
        'cuddle': 'cuddle.gif',
        'dance': 'dance.gif',
        'disgusted': 'disgusted.gif',
        'excited': 'excited.gif',
        'facepalm': 'facepalm.gif',
        'fuck': 'fuck.gif',
        'greedy': 'greedy.gif',
        'happy': 'happy.gif',
        'highfive': 'highfive.gif',
        'horny': 'horny.gif',
        'hug': 'hug.gif',
        'hungry': 'hungry.gif',
        'jealous': 'jealous.gif',
        'kill': 'kill.gif',
        'kiss': 'kiss.gif',
        'laugh': 'laugh.gif',
        'nervous': 'nervous.gif',
        'panic': 'panic.gif',
        'pat': 'pat.gif',
        'poke': 'poke.gif',
        'proud': 'proud.gif',
        'punch': 'punch.gif',
        'sad': 'sad.gif',
        'scared': 'scared.gif',
        'shock': 'shock.gif',
        'shy': 'shy.gif',
        'slap': 'slap.gif',
        'sleepy': 'sleepy.gif',
        'smile': 'smile.gif',
        'surprised': 'surprised.gif',
        'tired': 'tired.gif',
        'wave': 'wave.gif',
        'wink': 'wink.gif',
        'yeet': 'yeet.gif',
    }
    
    // Get the GIF name from arguments
    const gifName = args[0].toLowerCase()
    
    // Check if the GIF name exists in our commands
    if (!gifCommands[gifName]) {
        let availableGifs = Object.keys(gifCommands).join(', ')
        return conn.reply(m.chat, `✳️ GIF nicht gefunden. Verfügbare GIFs:\n\n${availableGifs}`, m)
    }
    
    // Get the path to the GIF file
    const gifPath = path.join(process.cwd(), 'gifs', gifCommands[gifName])
    
    // Check if the GIF file exists
    if (!fs.existsSync(gifPath)) {
        return conn.reply(m.chat, `❌ Die GIF-Datei ${gifCommands[gifName]} wurde nicht gefunden.`, m)
    }
    
    try {
        // Create tmp directory if it doesn't exist
        if (!fs.existsSync('./tmp')) {
            fs.mkdirSync('./tmp')
        }
        
        // Reply with progress message
        conn.reply(m.chat, `⏳ Konvertiere ${gifName}.gif zu MP4...`, m)
        
        // Path for the output MP4 file
        const outputPath = `./tmp/${gifName}_${Date.now()}.mp4`
        
        // Convert GIF to MP4 using FFmpeg
        await execAsync(`ffmpeg -i ${gifPath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${outputPath}`)
        
        // Send the MP4 as a video
        await conn.sendMessage(m.chat, { 
            video: fs.readFileSync(outputPath),
            caption: `🎬 *${gifName}.gif als MP4*`,
            gifPlayback: true,
            mimetype: 'video/mp4'
        }, { quoted: m })
        
        // Clean up the temporary file
        fs.unlinkSync(outputPath)
        
    } catch (error) {
        console.error('Error in gif2mp4 command:', error)
        conn.reply(m.chat, `❌ Es gab einen Fehler bei der Konvertierung: ${error.message}`, m)
    }
}

handler.help = ['gif2mp4 <name>']
handler.tags = ['tools']
handler.command = /^(gif2mp4|giftomp4|gif2video)$/i

module.exports = handler