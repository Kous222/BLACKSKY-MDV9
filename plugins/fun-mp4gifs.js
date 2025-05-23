const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

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
    }

    // Extract the actual command used
    const actualCommand = command.toLowerCase().replace('mp4', '');
    
    // Check if command exists in our map
    if (!gifCommands[actualCommand]) {
        let availableCommands = Object.keys(gifCommands).map(cmd => `mp4${cmd}`).join(', ');
        return m.reply(`✳️ Unbekannter GIF-Befehl. Verfügbare Befehle:\n\n${availableCommands}`)
    }
    
    // Get the GIF filename
    const gifFile = gifCommands[actualCommand];
    const gifPath = path.join(process.cwd(), 'gifs', gifFile);
    
    // Check if the GIF file exists
    if (!fs.existsSync(gifPath)) {
        return m.reply(`❌ Die GIF-Datei ${gifFile} wurde nicht gefunden.`);
    }
    
    try {
        // Create tmp folder if it doesn't exist
        if (!fs.existsSync('./tmp')) {
            fs.mkdirSync('./tmp');
        }
        
        // Extract target from mention or quoted message
        let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
        const targetName = target ? '@' + target.split('@')[0] : '';
        const userName = '@' + m.sender.split('@')[0];
        
        // Create appropriate message based on command type
        let caption = '';
        
        // Social interaction commands
        const socialCommands = ['bite', 'cuddle', 'hug', 'kiss', 'poke', 'punch', 'slap', 'pat', 'highfive', 'kill', 'fuck'];
        
        if (socialCommands.includes(actualCommand)) {
            // If no target is provided but it's a social command, make it look like someone is doing the action to the user
            if (!target) {
                // Generate a random name from this list of German names
                const germanNames = ['Hans', 'Franz', 'Lukas', 'Sophie', 'Emma', 'Lena', 'Felix', 'Max', 'Anna', 'Lisa', 'Paul', 'Julia', 'Johannes', 'Marie', 'Leon', 'Lara', 'Finn', 'Mia', 'Elias', 'Sarah'];
                const randomName = germanNames[Math.floor(Math.random() * germanNames.length)];
                
                // Make it look like the random name is performing the action on the user
                caption = `${randomName} ${germanTranslations[actualCommand]} ${userName}`;
            } else {
                // With a target, the user performs the action on the target
                caption = `${m.name} ${germanTranslations[actualCommand]} ${targetName}`;
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
            };
            
            if (emojiMap[actualCommand]) {
                caption += emojiMap[actualCommand];
            }
        } else {
            // For emotional/reaction GIFs
            // Get the German translation for the emotion
            const germanEmotion = germanTranslations[actualCommand];
            
            // Special cases for verb-like actions vs. emotions
            const actionVerbs = ['dance', 'laugh', 'smile', 'wave', 'wink', 'yeet', 'cool', 'bonk', 'facepalm'];
            
            if (actionVerbs.includes(actualCommand)) {
                caption = `${m.name} ${germanEmotion}`;
                
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
                };
                
                if (emojiMap[actualCommand]) {
                    caption += emojiMap[actualCommand];
                }
            } else {
                // For emotional states
                caption = `${m.name} fühlt sich ${germanEmotion}`;
            }
        }
        
        // Set file paths for conversion
        const outputPath = `./tmp/gif_${actualCommand}_${Date.now()}.mp4`;
        
        // Convert GIF to MP4
        m.reply('⏳ Sende GIF...');
        await execAsync(`ffmpeg -i ${gifPath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${outputPath}`);
        
        // Send the converted GIF as a video with caption
        await conn.sendFile(
            m.chat,
            outputPath,
            `${actualCommand}.mp4`,
            caption,
            m,
            true,
            {
                asDocument: false,
                gifPlayback: true,
                mentions: [m.sender, ...(target ? [target] : [])]
            }
        );
        
        // Clean up temporary file
        fs.unlinkSync(outputPath);
        
    } catch (error) {
        console.error(error);
        return m.reply('❌ Es gab einen Fehler beim Senden des GIFs. Bitte versuche es erneut.');
    }
};

// Create an array of command patterns from the keys of gifCommands
const commandList = [
    'mp4angry', 'mp4bite', 'mp4blush', 'mp4bonk', 'mp4bored', 'mp4confused', 'mp4cool', 
    'mp4cuddle', 'mp4dance', 'mp4disgusted', 'mp4excited', 'mp4facepalm', 'mp4fuck', 
    'mp4greedy', 'mp4happy', 'mp4highfive', 'mp4horny', 'mp4hug', 'mp4hungry', 
    'mp4jealous', 'mp4kill', 'mp4kiss', 'mp4laugh', 'mp4nervous', 'mp4panic', 
    'mp4pat', 'mp4poke', 'mp4proud', 'mp4punch', 'mp4sad', 'mp4scared', 
    'mp4shock', 'mp4shy', 'mp4slap', 'mp4sleepy', 'mp4smile', 'mp4surprised', 
    'mp4tired', 'mp4wave', 'mp4wink', 'mp4yeet'
];

handler.help = commandList.map(cmd => `${cmd}`);
handler.tags = ['fun', 'gifs'];
handler.command = new RegExp(`^(${commandList.join('|')})$`, 'i');

module.exports = handler;