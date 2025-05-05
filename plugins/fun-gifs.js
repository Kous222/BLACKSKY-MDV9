const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const util = require('util')
const execAsync = util.promisify(exec)
const { MessageType } = require('@adiwajshing/baileys')
const { Sticker, StickerTypes } = require('wa-sticker-formatter')

let handler = async (m, { conn, text, usedPrefix, command }) => {
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
        'assslap': 'assslap.gif',
     }
    
    // German translations for reaction messages
    const germanTranslations = {
        'angry': 'wütend',
        'bite': 'beißt',
        'blush': 'errötet',
        'bonk': 'bonkt',
        'bored': 'gelangweilt',
        'confused': 'verwirrt',
        'cool': 'cool',
        'cuddle': 'kuschelt mit',
        'dance': 'tanzt',
        'disgusted': 'angewidert',
        'excited': 'aufgeregt',
        'facepalm': 'facepalmt',
        'fuck': 'fickt',
        'greedy': 'gierig',
        'happy': 'glücklich',
        'highfive': 'gibt ein High Five',
        'horny': 'geil',
        'hug': 'umarmt',
        'hungry': 'hungrig',
        'jealous': 'eifersüchtig',
        'kill': 'tötet',
        'kiss': 'küsst',
        'laugh': 'lacht',
        'nervous': 'nervös',
        'panic': 'in Panik',
        'pat': 'streichelt',
        'poke': 'stupst an',
        'proud': 'stolz',
        'punch': 'schlägt',
        'sad': 'traurig',
        'scared': 'ängstlich',
        'shock': 'geschockt',
        'shy': 'schüchtern',
        'slap': 'ohrfeigt',
        'sleepy': 'schläfrig',
        'smile': 'lächelt',
        'surprised': 'überrascht',
        'tired': 'müde',
        'wave': 'winkt',
        'wink': 'zwinkert',
        'yeet': 'yeetet',
        'assslap': 'haut auf den Arsch'.  
     }

    // Extract the actual command used
    const actualCommand = command.toLowerCase()
    
    // Check if command exists in our map
    if (!gifCommands[actualCommand]) {
        let availableCommands = Object.keys(gifCommands).join(', ')
        return m.reply(`✳️ Unbekannter GIF-Befehl. Verfügbare Befehle:\n\n${availableCommands}`)
    }
    
    // Get the GIF filename
    const gifFile = gifCommands[actualCommand]
    const gifPath = path.join(process.cwd(), 'gifs', gifFile)
    
    // Check if the GIF file exists
    if (!fs.existsSync(gifPath)) {
        return m.reply(`❌ Die GIF-Datei ${gifFile} wurde nicht gefunden.`)
    }
    
    // Helper function to cleanup JID
    const cleanJid = (jid) => jid ? (jid.includes(':') ? jid.split(':')[0] + '@s.whatsapp.net' : jid) : null
    
    // Extract target from mention or quoted message and clean it
    let target = m.mentionedJid && m.mentionedJid[0] ? cleanJid(m.mentionedJid[0]) : (m.quoted ? cleanJid(m.quoted.sender) : null)
    
    // Format targetName properly for WhatsApp mention - simply '@' + number
    const targetName = target ? '@' + target.split('@')[0] : ''
    
    // For logging purposes
    console.log('GIF command target info:', {
        command: actualCommand,
        mentionedJid: m.mentionedJid,
        target: target,
        targetName: targetName,
        sender: m.sender,
        senderName: m.name
    })
    
    // Create appropriate message based on command type
    let caption = ''
    
    // Social interaction commands
    const socialCommands = ['bite', 'cuddle', 'hug', 'kiss', 'poke', 'punch', 'slap', 'pat', 'highfive', 'kill', 'fuck', 'assslap']
    
    if (socialCommands.includes(actualCommand)) {
        // If no target is provided but it's a social command, make it look like someone is doing the action to the user
        if (!target) {
            // When no target is provided, the user performs the action on themselves
            // Format the sender mention properly for WhatsApp
            caption = `@${m.sender.split('@')[0]} ${germanTranslations[actualCommand]} sich selbst`
        } else {
            // With a target, the user performs the action on the target
            // Format the sender mention properly for WhatsApp
            caption = `@${m.sender.split('@')[0]} ${germanTranslations[actualCommand]} ${targetName}`
        }
        
        // Add emojis to some specific reactions
        const emojiMap = {
            'bite': ' 😬',
            'cuddle': ' 🥰',
            'hug': ' 🤗',
            'kiss': ' 💋',
            'poke': ' 👉',
            'punch': ' 👊',
            'slap': ' ✋',
            'pat': ' 🖐️',
            'highfive': ' ✋',
            'kill': ' 🔪',
            'fuck': ' 🔞',
            'assslap': ' 🍑',
         }
        
        if (emojiMap[actualCommand]) {
            caption += emojiMap[actualCommand]
        }
    } else {
        // For emotional/reaction GIFs
        // Get the German translation for the emotion
        const germanEmotion = germanTranslations[actualCommand]
        
        // Special cases for verb-like actions vs. emotions
        const actionVerbs = ['dance', 'laugh', 'smile', 'wave', 'wink', 'yeet', 'cool', 'bonk', 'facepalm']
        
        if (actionVerbs.includes(actualCommand)) {
            // Format the sender mention properly for WhatsApp
            caption = `@${m.sender.split('@')[0]} ${germanEmotion}`
            
            // Add emojis to some specific reactions
            const emojiMap = {
                'laugh': ' 😂',
                'smile': ' ☺️',
                'dance': ' 💃',
                'wave': ' 👋',
                'wink': ' 😉',
                'yeet': ' 🤣',
                'cool': ' 😎',
                'bonk': ' 🔨',
                'facepalm': ' 🤦',
            }
            
            if (emojiMap[actualCommand]) {
                caption += emojiMap[actualCommand]
            }
        } else {
            // For emotional states - format the mention properly
            caption = `@${m.sender.split('@')[0]} fühlt sich ${germanEmotion}`
        }
    }

    try {
        // Create tmp directory if it doesn't exist
        if (!fs.existsSync('./tmp')) {
            fs.mkdirSync('./tmp');
        }

        // Primary method - convert to mp4 and send as video
        try {
            const outputPath = `./tmp/gif_${actualCommand}_${Date.now()}.mp4`;
            
            // Convert GIF to MP4
            await execAsync(`ffmpeg -i ${gifPath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${outputPath}`);
            
            // Send as video
            await conn.sendMessage(m.chat, { 
                video: fs.readFileSync(outputPath),
                caption: caption,
                gifPlayback: true,
                mentions: [m.sender, ...(target ? [target] : [])],
                mimetype: 'video/mp4'
            }, { quoted: m });
            
            // Clean up
            fs.unlinkSync(outputPath);
            return;
        } catch (e) {
            console.log('Error sending as video:', e);
            // If video conversion fails, fall back to direct GIF
        }

        // Second method - send directly as GIF
        try {
            await conn.sendMessage(m.chat, { 
                video: fs.readFileSync(gifPath),
                caption: caption,
                gifPlayback: true,
                mentions: [m.sender, ...(target ? [target] : [])],
                mimetype: 'video/gif'
            }, { quoted: m });
            return;
        } catch (e) {
            console.log('Error sending as direct GIF:', e);
            // If direct GIF fails, fall back to final methods
        }
        
        // Fallback - sticker method (only if explicitly requested in the future)
        try {
            if (text && text.includes('sticker')) {
                const gifBuffer = fs.readFileSync(gifPath);
                const sticker = new Sticker(gifBuffer, {
                    pack: 'Reactions', 
                    author: 'WhatsApp Bot',
                    type: StickerTypes.FULL,
                    categories: ['🎭', '😂', '🎮'],
                    id: actualCommand,
                    quality: 50,
                    background: 'transparent'
                });
                
                const stickerBuffer = await sticker.toBuffer();

                // Send the sticker first
                await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
                
                // Then send the caption as a separate message with proper WhatsApp mention
                await conn.sendMessage(m.chat, {
                    text: caption,
                    mentions: [m.sender, ...(target ? [target] : [])]
                }, { quoted: m });
                
                return;
            }
        } catch (e) {
            console.log('Error sending as sticker:', e);
        }

        // Last resort - send as document
        await conn.sendMessage(m.chat, { 
            document: fs.readFileSync(gifPath),
            mimetype: 'image/gif',
            fileName: `${actualCommand}.gif`,
            caption: caption,
            mentions: [m.sender, ...(target ? [target] : [])]
        }, { quoted: m });
    } catch (error) {
        console.error('Error in reaction command:', error);
        m.reply('❌ Es gab ein Problem beim Senden des GIFs. Versuche es später erneut.');
    }
}

// Create an array of command patterns from the keys of gifCommands
const commandList = [
    'angry', 'bite', 'blush', 'bonk', 'bored', 'confused', 'cool', 
    'cuddle', 'dance', 'disgusted', 'excited', 'facepalm', 'fuck', 
    'greedy', 'happy', 'highfive', 'horny', 'hug', 'hungry', 
    'jealous', 'kill', 'kiss', 'laugh', 'nervous', 'panic', 
    'pat', 'poke', 'proud', 'punch', 'sad', 'scared', 
    'shock', 'shy', 'slap', 'sleepy', 'smile', 'surprised', 
    'tired', 'wave', 'wink', 'yeet', 'assslap'
]

handler.help = commandList.map(cmd => `${cmd}`)
handler.tags = ['fun', 'gifs']
handler.command = new RegExp(`^(${commandList.join('|')})$`, 'i')

module.exports = handler