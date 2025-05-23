const fs = require('fs')
const path = require('path')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Map of command names to GIF filenames
    const gifCommands = {
        'dgangry': 'angry.gif',
        'dgbite': 'bite.gif',
        'dgblush': 'blush.gif',
        'dgbonk': 'bonk.gif',
        'dgbored': 'bored.gif',
        'dgconfused': 'confused.gif',
        'dgcool': 'cool.gif',
        'dgcuddle': 'cuddle.gif',
        'dgdance': 'dance.gif',
        'dgdisgusted': 'disgusted.gif',
        'dgexcited': 'excited.gif',
        'dgfacepalm': 'facepalm.gif',
        'dgfuck': 'fuck.gif',
        'dggreedy': 'greedy.gif',
        'dghappy': 'happy.gif',
        'dghighfive': 'highfive.gif',
        'dghorny': 'horny.gif',
        'dghug': 'hug.gif',
        'dghungry': 'hungry.gif',
        'dgjealous': 'jealous.gif',
        'dgkill': 'kill.gif',
        'dgkiss': 'kiss.gif',
        'dglaugh': 'laugh.gif',
        'dgnervous': 'nervous.gif',
        'dgpanic': 'panic.gif',
        'dgpat': 'pat.gif',
        'dgpoke': 'poke.gif',
        'dgproud': 'proud.gif',
        'dgpunch': 'punch.gif',
        'dgsad': 'sad.gif',
        'dgscared': 'scared.gif',
        'dgshock': 'shock.gif',
        'dgshy': 'shy.gif',
        'dgslap': 'slap.gif',
        'dgsleepy': 'sleepy.gif',
        'dgsmile': 'smile.gif',
        'dgsurprised': 'surprised.gif',
        'dgtired': 'tired.gif',
        'dgwave': 'wave.gif',
        'dgwink': 'wink.gif',
        'dgyeet': 'yeet.gif',
    }
    
    // German translations for reaction messages
    const germanTranslations = {
        'dgangry': 'wütend',
        'dgbite': 'beißt',
        'dgblush': 'errötet',
        'dgbonk': 'bonkt',
        'dgbored': 'gelangweilt',
        'dgconfused': 'verwirrt',
        'dgcool': 'cool',
        'dgcuddle': 'kuschelt mit',
        'dgdance': 'tanzt',
        'dgdisgusted': 'angewidert',
        'dgexcited': 'aufgeregt',
        'dgfacepalm': 'facepalmt',
        'dgfuck': 'fickt',
        'dggreedy': 'gierig',
        'dghappy': 'glücklich',
        'dghighfive': 'gibt ein High Five',
        'dghorny': 'geil',
        'dghug': 'umarmt',
        'dghungry': 'hungrig',
        'dgjealous': 'eifersüchtig',
        'dgkill': 'tötet',
        'dgkiss': 'küsst',
        'dglaugh': 'lacht',
        'dgnervous': 'nervös',
        'dgpanic': 'in Panik',
        'dgpat': 'streichelt',
        'dgpoke': 'stupst an',
        'dgproud': 'stolz',
        'dgpunch': 'schlägt',
        'dgsad': 'traurig',
        'dgscared': 'ängstlich',
        'dgshock': 'geschockt',
        'dgshy': 'schüchtern',
        'dgslap': 'ohrfeigt',
        'dgsleepy': 'schläfrig',
        'dgsmile': 'lächelt',
        'dgsurprised': 'überrascht',
        'dgtired': 'müde',
        'dgwave': 'winkt',
        'dgwink': 'zwinkert',
        'dgyeet': 'yeetet',
    }

    // Extract the actual command used
    const actualCommand = command.toLowerCase()
    
    // Check if command exists in our map
    if (!gifCommands[actualCommand]) {
        let availableCommands = Object.keys(gifCommands).join(', ')
        return m.reply(`✳️ Unbekannter Direkt-GIF-Befehl. Verfügbare Befehle:\n\n${availableCommands}`)
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
    
    // Create appropriate message based on command type
    let caption = ''
    
    // Social interaction commands (remove 'dg' prefix for command name)
    const baseCommand = actualCommand.substring(2) // remove 'dg' prefix
    const socialCommands = ['bite', 'cuddle', 'hug', 'kiss', 'poke', 'punch', 'slap', 'pat', 'highfive', 'kill', 'fuck']
    
    if (socialCommands.includes(baseCommand)) {
        // If no target is provided but it's a social command, make it look like someone is doing the action to the user
        if (!target) {
            // When no target is provided, the user performs the action on themselves
            caption = `@${m.sender.split('@')[0]} ${germanTranslations[actualCommand]} sich selbst`
        } else {
            // With a target, the user performs the action on the target
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
        }
        
        if (emojiMap[baseCommand]) {
            caption += emojiMap[baseCommand]
        }
    } else {
        // For emotional/reaction GIFs
        // Special cases for verb-like actions vs. emotions
        const actionVerbs = ['dance', 'laugh', 'smile', 'wave', 'wink', 'yeet', 'cool', 'bonk', 'facepalm']
        
        if (actionVerbs.includes(baseCommand)) {
            caption = `@${m.sender.split('@')[0]} ${germanTranslations[actualCommand]}`
            
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
            
            if (emojiMap[baseCommand]) {
                caption += emojiMap[baseCommand]
            }
        } else {
            // For emotional states
            caption = `@${m.sender.split('@')[0]} fühlt sich ${germanTranslations[actualCommand]}`
        }
    }

    try {
        // Send directly as an image with caption
        await conn.sendMessage(m.chat, { 
            image: fs.readFileSync(gifPath),
            caption: caption,
            mentions: [m.sender, ...(target ? [target] : [])],
            mimetype: 'image/gif'
        }, { quoted: m });
    } catch (error) {
        console.error('Error in direct GIF command:', error);
        m.reply('❌ Es gab ein Problem beim Senden des GIFs. Versuche es später erneut.');
    }
}

// Create an array of command patterns from the keys of gifCommands
const commandList = [
    'dgangry', 'dgbite', 'dgblush', 'dgbonk', 'dgbored', 'dgconfused', 'dgcool', 
    'dgcuddle', 'dgdance', 'dgdisgusted', 'dgexcited', 'dgfacepalm', 'dgfuck', 
    'dggreedy', 'dghappy', 'dghighfive', 'dghorny', 'dghug', 'dghungry', 
    'dgjealous', 'dgkill', 'dgkiss', 'dglaugh', 'dgnervous', 'dgpanic', 
    'dgpat', 'dgpoke', 'dgproud', 'dgpunch', 'dgsad', 'dgscared', 
    'dgshock', 'dgshy', 'dgslap', 'dgsleepy', 'dgsmile', 'dgsurprised', 
    'dgtired', 'dgwave', 'dgwink', 'dgyeet'
]

handler.help = commandList.map(cmd => `${cmd}`)
handler.tags = ['fun', 'gifs']
handler.command = new RegExp(`^(${commandList.join('|')})$`, 'i')

module.exports = handler