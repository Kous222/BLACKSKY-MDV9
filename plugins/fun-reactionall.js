const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const util = require('util')
const execAsync = util.promisify(exec)
const { MessageType } = require('@adiwajshing/baileys')
const { Sticker, StickerTypes } = require('wa-sticker-formatter')

let handler = async (m, { conn, text, usedPrefix, command, participants, isAdmin, isOwner, groupMetadata }) => {
    // Check permissions - only owner or admin can use this
    if (!(isAdmin || isOwner)) {
        return m.reply('⚠️ Nur Administratoren und Besitzer können diesen Befehl verwenden')
    }
    
    // Map of commands to their base reaction command
    const allCommands = {
        'hugall': 'hug',
        'biteall': 'bite',
        'cuddleall': 'cuddle',
        'kissall': 'kiss',
        'patall': 'pat',
        'pokeall': 'poke',
        'punchall': 'punch',
        'slapall': 'slap',
        'highfiveall': 'highfive',
        'killall': 'kill',
        'waveall': 'wave',
        'danceall': 'dance',
        'happyall': 'happy',
        'laughall': 'laugh',
        'smileall': 'smile',
        'winkall': 'wink',
        // German variants
        'umarmenalle': 'hug',
        'beißenalle': 'bite',
        'kuschelnalle': 'cuddle',
        'küssenalle': 'kiss', 
        'streichelnalle': 'pat',
        'anstupsenalle': 'poke',
        'schlagenalle': 'punch',
        'ohrfeigenalle': 'slap',
        'highfivealle': 'highfive',
        'tötenalle': 'kill',
        'winkenalle': 'wave',
        'tanzenalle': 'dance',
        'glücklichalle': 'happy',
        'lachenalle': 'laugh',
        'lächelnalle': 'smile',
        'zwinkernalle': 'wink'
    }
    
    // German translations for reaction messages
    const germanTranslations = {
        'hug': 'umarmt',
        'bite': 'beißt',
        'cuddle': 'kuschelt mit',
        'kiss': 'küsst',
        'pat': 'streichelt',
        'poke': 'stupst an',
        'punch': 'schlägt',
        'slap': 'ohrfeigt',
        'highfive': 'gibt ein High Five',
        'kill': 'tötet',
        'wave': 'winkt',
        'dance': 'tanzt für',
        'happy': 'ist glücklich mit',
        'laugh': 'lacht mit',
        'smile': 'lächelt',
        'wink': 'zwinkert'
    }
    
    // Emojis for reactions
    const emojiMap = {
        'hug': ' 🤗',
        'bite': ' 😬',
        'cuddle': ' 🥰',
        'kiss': ' 💋',
        'pat': ' 🖐️',
        'poke': ' 👉',
        'punch': ' 👊',
        'slap': ' ✋',
        'highfive': ' ✋',
        'kill': ' 🔪',
        'wave': ' 👋',
        'dance': ' 💃',
        'happy': ' 😄',
        'laugh': ' 😂',
        'smile': ' 😊',
        'wink': ' 😉'
    }
    
    // Extract the actual command and get the base command
    const actualCommand = command.toLowerCase()
    const baseCommand = allCommands[actualCommand]
    
    // Check if command exists in our map
    if (!baseCommand) {
        const availableCommands = Object.keys(allCommands).join(', ')
        return m.reply(`✳️ Unbekannter GIF-Befehl. Verfügbare Befehle:\n\n${availableCommands}`)
    }
    
    // Get the GIF filename
    const gifFile = `${baseCommand}.gif`
    const gifPath = path.join(process.cwd(), 'gifs', gifFile)
    
    // Check if the GIF file exists
    if (!fs.existsSync(gifPath)) {
        return m.reply(`❌ Die GIF-Datei ${gifFile} wurde nicht gefunden.`)
    }
    
    // Get all participants in the group
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    
    // Format caption with proper mentions
    let caption = `@${m.sender.split('@')[0]} ${germanTranslations[baseCommand]} alle in der Gruppe`
    
    // Add emoji if available
    if (emojiMap[baseCommand]) {
        caption += emojiMap[baseCommand]
    }
    
    // Add the message text if provided
    if (text) {
        caption += `\n\n💬 Nachricht: ${text}`
    }
    
    // Add list of all members
    caption += '\n\n🎯 Alle Mitglieder:'
    
    // Tag each member with their phone number
    for (let user of users) {
        const userNumber = user.split('@')[0]
        caption += `\n   • @${userNumber}`
    }
    
    try {
        // Create tmp directory if it doesn't exist
        if (!fs.existsSync('./tmp')) {
            fs.mkdirSync('./tmp')
        }

        // Primary method - convert to mp4 and send as video
        try {
            const outputPath = `./tmp/gif_${baseCommand}_${Date.now()}.mp4`
            
            // Convert GIF to MP4
            await execAsync(`ffmpeg -i ${gifPath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${outputPath}`)
            
            // Send as video
            await conn.sendMessage(m.chat, { 
                video: fs.readFileSync(outputPath),
                caption: caption,
                gifPlayback: true,
                mentions: [m.sender, ...users],
                mimetype: 'video/mp4'
            }, { quoted: m })
            
            // Clean up
            fs.unlinkSync(outputPath)
            return
        } catch (e) {
            console.log('Error sending as video:', e)
            // If video conversion fails, fall back to direct GIF
        }

        // Second method - send directly as GIF
        try {
            await conn.sendMessage(m.chat, { 
                video: fs.readFileSync(gifPath),
                caption: caption,
                gifPlayback: true,
                mentions: [m.sender, ...users],
                mimetype: 'video/gif'
            }, { quoted: m })
            return
        } catch (e) {
            console.log('Error sending as direct GIF:', e)
            // If direct GIF fails, fall back to final methods
        }
        
        // Fallback - sticker method (only if explicitly requested in the future)
        try {
            if (text && text.includes('sticker')) {
                const gifBuffer = fs.readFileSync(gifPath)
                const sticker = new Sticker(gifBuffer, {
                    pack: 'Reactions', 
                    author: 'WhatsApp Bot',
                    type: StickerTypes.FULL,
                    categories: ['🎭', '😂', '🎮'],
                    id: baseCommand,
                    quality: 50,
                    background: 'transparent'
                })
                
                const stickerBuffer = await sticker.toBuffer()

                // Send the sticker first
                await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
                
                // Then send the caption as a separate message with proper WhatsApp mentions
                await conn.sendMessage(m.chat, {
                    text: caption,
                    mentions: [m.sender, ...users]
                }, { quoted: m })
                
                return
            }
        } catch (e) {
            console.log('Error sending as sticker:', e)
        }

        // Last resort - send as document
        await conn.sendMessage(m.chat, { 
            document: fs.readFileSync(gifPath),
            mimetype: 'image/gif',
            fileName: `${baseCommand}.gif`,
            caption: caption,
            mentions: [m.sender, ...users]
        }, { quoted: m })
    } catch (error) {
        console.error('Error in reaction command:', error)
        m.reply('❌ Es gab ein Problem beim Senden des GIFs. Versuche es später erneut.')
    }
}

// Create an array of command patterns
const commandList = [
    'hugall', 'biteall', 'cuddleall', 'kissall', 'patall', 'pokeall', 'punchall', 'slapall', 'highfiveall', 'killall',
    'waveall', 'danceall', 'happyall', 'laughall', 'smileall', 'winkall',
    'umarmenalle', 'beißenalle', 'kuschelnalle', 'küssenalle', 'streichelnalle', 'anstupsenalle', 'schlagenalle', 'ohrfeigenalle', 'highfivealle', 'tötenalle',
    'winkenalle', 'tanzenalle', 'glücklichalle', 'lachenalle', 'lächelnalle', 'zwinkernalle'
]

handler.help = commandList.map(cmd => `${cmd}`)
handler.tags = ['fun', 'gifs', 'group']
handler.command = new RegExp(`^(${commandList.join('|')})$`, 'i')
handler.group = true

module.exports = handler