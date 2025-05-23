const {
    BufferJSON, 
    WA_DEFAULT_EPHEMERAL, 
    generateWAMessageFromContent, 
    proto, 
    generateWAMessageContent, 
    generateWAMessage, 
    prepareWAMessageMedia, 
    areJidsSameUser, 
    getContentType
} = require('@adiwajshing/baileys');

process.env.TZ = 'Europe/Berlin';
let fs = require('fs');
let path = require('path');
let fetch = require('node-fetch');
let moment = require('moment-timezone');
let levelling = require('../lib/levelling');

let arrayMenü = [
    'all', 'ai', 'spielen', 'database', 'herunterladener', 'rpg', 'rpgG', 'sticker', 'advanced', 'xp', 'fun', 'spiel', 'github', 'group', 'image', 'nsfw', 'info', 'internet', 'islam', 'kerang', 'maker', 'news', 'owner', 'voice', 'quotes', 'store', 'stalk', 'shortlink', 'tools', 'anonymous'
];

// Emoji mapping for categories
const categoryEmojis = {
    'all': '🌟',
    'ai': '🤖',
    'spielen': '🎮',
    'database': '🗄️',
    'herunterladener': '📥',
    'rpg': '⚔️',
    'rpgG': '🏰',
    'sticker': '🎨',
    'advanced': '⚙️',
    'xp': '✨',
    'fun': '😄',
    'spiel': '🎯',
    'github': '🐙',
    'group': '👥',
    'image': '🖼️',
    'nsfw': '🔞',
    'info': 'ℹ️',
    'internet': '🌐',
    'islam': '🕌',
    'kerang': '🐚',
    'maker': '🛠️',
    'news': '📰',
    'owner': '👑',
    'voice': '🎤',
    'quotes': '💬',
    'store': '🛒',
    'stalk': '👀',
    'shortlink': '🔗',
    'tools': '🔧',
    'anonymous': '🕵️'
};

const allTags = arrayMenü.reduce((acc, tag) => {
    const emoji = categoryEmojis[tag] || '📋';
    acc[tag] = `${emoji} MENÜ ${tag.toUpperCase()}`;
    return acc;
}, {});
allTags['all'] = '🌟 ALLE MENÜS';

const defaultMenü = {
    before: `
╭━━━━━━━━━━━━━━━━╮
│   *BLACKSKY-MD*
│  ⚡ PREMIUM BOT ⚡
╰━━━━━━━━━━━━━━━━╯

👋 Hallo, %name!
🤖 Ich bin ein KI-gestützter WhatsApp Bot, der dir bei verschiedenen Aufgaben helfen kann.

╭━━━━⟮ 📊 BOT INFO ⟯━━━━╮
│ 
│ ⏰ *Laufzeit:* %uptime
│ 📅 *Datum:* %date
│ 🕒 *Uhrzeit:* %time
│ 🔑 *Präfix:* [ %_p ]
│
╰━━━━━━━━━━━━━━━━╯`.trimStart(),
    header: '╭━━━⟮ %category ⟯━━━╮',
    body: '│ %cmd %islimit %isPremium',
    footer: '╰━━━━━━━━━━━━━━━━╯',
    after: `
╭━━━━⟮ 💡 HINWEIS ⟯━━━━╮
│ 
│ • Tippe %_pmenu <kategorie>
│   für ein bestimmtes Menü
│ • Beispiel: %_pmenu tools
│ • Nutze %_philfe für Hilfe
│
╰━━━━━━━━━━━━━━━━╯`
};

let handler = async (m, { conn, usedPrefix: _p, args = [], command }) => {
    try {
        let { exp, limit, Stufe } = global.db.data.users[m.sender];
        let name = `@${m.sender.split`@`[0]}`;
        let teks = args[0] || '';
        
        let d = new Date();
        let locale = 'de-DE';
        let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
        let time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' });
        let uptime = clockString(process.uptime() * 1000);
        
        let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
            help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
            tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
            limit: plugin.limit,
            Premium: plugin.Premium
        }));
        
        if (!teks) {
            let menuList = `${defaultMenü.before}\n\n╭━━━⟮ 📋 MENÜLISTE ⟯━━━╮\n`;
            
            // Add all categories with emojis
            const menuItems = arrayMenü.map(tag => {
                const emoji = categoryEmojis[tag] || '📋';
                return { tag, emoji };
            });
            
            // Function to add divider line
            const addDivider = () => menuList += `│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n`;
            
            // Main sections
            menuList += `│ *🌟 HAUPTMENÜS*\n`;
            menuList += `│ ${categoryEmojis['all']} ${_p}menu all\n`;
            menuList += `│ ${categoryEmojis['tools']} ${_p}menu tools\n`;
            menuList += `│ ${categoryEmojis['info']} ${_p}menu info\n`;
            menuList += `│ ${categoryEmojis['owner']} ${_p}menu owner\n`;
            
            addDivider();
            
            // Entertainment section
            menuList += `│ *🎮 UNTERHALTUNG*\n`;
            menuList += `│ ${categoryEmojis['spielen']} ${_p}menu spielen\n`;
            menuList += `│ ${categoryEmojis['rpg']} ${_p}menu rpg\n`;
            menuList += `│ ${categoryEmojis['spiel']} ${_p}menu spiel\n`;
            menuList += `│ ${categoryEmojis['rpgG']} ${_p}menu rpgG\n`;
            menuList += `│ ${categoryEmojis['fun']} ${_p}menu fun\n`;
            menuList += `│ ${categoryEmojis['xp']} ${_p}menu xp\n`;
            
            addDivider();
            
            // Media section
            menuList += `│ *📥 MEDIEN*\n`;
            menuList += `│ ${categoryEmojis['herunterladener']} ${_p}menu herunterladener\n`;
            menuList += `│ ${categoryEmojis['sticker']} ${_p}menu sticker\n`;
            menuList += `│ ${categoryEmojis['image']} ${_p}menu image\n`;
            menuList += `│ ${categoryEmojis['maker']} ${_p}menu maker\n`;
            menuList += `│ ${categoryEmojis['voice']} ${_p}menu voice\n`;
            
            addDivider();
            
            // Communication section
            menuList += `│ *💬 KOMMUNIKATION*\n`;
            menuList += `│ ${categoryEmojis['ai']} ${_p}menu ai\n`;
            menuList += `│ ${categoryEmojis['anonymous']} ${_p}menu anonymous\n`;
            menuList += `│ ${categoryEmojis['quotes']} ${_p}menu quotes\n`;
            menuList += `│ ${categoryEmojis['islam']} ${_p}menu islam\n`;
            
            addDivider();
            
            // Internet section
            menuList += `│ *🌐 INTERNET*\n`;
            menuList += `│ ${categoryEmojis['internet']} ${_p}menu internet\n`;
            menuList += `│ ${categoryEmojis['github']} ${_p}menu github\n`;
            menuList += `│ ${categoryEmojis['news']} ${_p}menu news\n`;
            menuList += `│ ${categoryEmojis['stalk']} ${_p}menu stalk\n`;
            menuList += `│ ${categoryEmojis['shortlink']} ${_p}menu shortlink\n`;
            menuList += `│ ${categoryEmojis['store']} ${_p}menu store\n`;
            
            // Admin section
            addDivider();
            menuList += `│ *⚙️ VERWALTUNG*\n`;
            menuList += `│ ${categoryEmojis['advanced']} ${_p}menu advanced\n`;
            menuList += `│ ${categoryEmojis['group']} ${_p}menu group\n`;
            menuList += `│ ${categoryEmojis['database']} ${_p}menu database\n`;
            menuList += `│ ${categoryEmojis['nsfw']} ${_p}menu nsfw\n`;
            
            // Get remaining categories not listed above
            const listedCategories = ['all', 'tools', 'info', 'owner', 'spielen', 'rpg', 'spiel', 
                'rpgG', 'fun', 'xp', 'herunterladener', 'sticker', 'image', 'maker', 'voice', 
                'ai', 'anonymous', 'quotes', 'islam', 'internet', 'github', 'news', 'stalk', 
                'shortlink', 'store', 'advanced', 'group', 'database', 'nsfw'];
                
            const remainingCategories = arrayMenü.filter(tag => !listedCategories.includes(tag));
            
            if (remainingCategories.length > 0) {
                addDivider();
                menuList += `│ *📋 WEITERE MENÜS*\n`;
                for (let i = 0; i < remainingCategories.length; i++) {
                    const tag = remainingCategories[i];
                    const emoji = categoryEmojis[tag] || '📋';
                    menuList += `│ ${emoji} ${_p}menu ${tag}\n`;
                }
            }
            
            menuList += `╰━━━━━━━━━━━━━━━━╯\n\n${defaultMenü.after}`;
            return sendMenü(m, conn, menuList, { name, uptime, date, time, _p });
        }
        
        if (teks.toLowerCase() === 'all') {
            let allMenüs = `${defaultMenü.before}\n\n`;
            
            // Organize categories in a logical order
            const categoryOrder = [
                'all', 'tools', 'info', 'spielen', 'spiel', 'xp', 'rpg', 'rpgG',
                'ai', 'fun', 'quotes', 'voice', 'anonymous', 
                'herunterladener', 'sticker', 'image', 'maker',
                'internet', 'github', 'news', 'shortlink', 'store', 'stalk',
                'database', 'advanced', 'group', 'owner',
                'nsfw', 'islam', 'kerang'
            ];
            
            // Filter ordered categories to only include ones that exist in arrayMenü
            const orderedTags = categoryOrder.filter(tag => arrayMenü.includes(tag));
            // Add any remaining categories that aren't in our predefined order
            const remainingTags = arrayMenü.filter(tag => !orderedTags.includes(tag));
            const allOrderedTags = [...orderedTags, ...remainingTags];
            
            // Initialize command count for summary
            let totalCommandCount = 0;
            
            // Add a helpful header to the all menu
            allMenüs += `╭━━━━⟮ 📋 VOLLSTÄNDIGE BEFEHLSLISTE ⟯━━━━╮\n`;
            allMenüs += `│ Alle verfügbaren Befehle sind nach Kategorien sortiert\n`;
            allMenüs += `│ 🔒 = Limitierte Funktion | ⭐ = Premium Funktion\n`;
            allMenüs += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
            
            // Process each category
            for (let tag of allOrderedTags) {
                let categoryCommands = help.filter(Menü => Menü.tags.includes(tag));
                if (categoryCommands.length > 0) {
                    // Add a divider before each category (except the first one)
                    if (tag !== allOrderedTags[0]) {
                        allMenüs += `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n\n`;
                    }
                    
                    // Add category header with emoji
                    allMenüs += `${defaultMenü.header.replace(/%category/g, allTags[tag])}\n`;
                    
                    // Add category description if available
                    const categoryDescriptions = {
                        'ai': '🤖 Befehle für künstliche Intelligenz und Chatbots',
                        'spielen': '🎮 Spielbefehlselemente',
                        'database': '🗄️ Datenbankverwaltungsbefehle',
                        'herunterladener': '📥 Herunterladen von Inhalten',
                        'rpg': '⚔️ Rollenspielbefehle',
                        'sticker': '🎨 Sticker und Bildbearbeitung',
                        'tools': '🔧 Nützliche Werkzeuge und Dienstprogramme',
                        'group': '👥 Gruppenverwaltungsbefehle',
                        'owner': '👑 Besitzerbefehle',
                        'info': 'ℹ️ Informationsbefehle',
                        'fun': '😄 Unterhaltungsbefehle',
                        'internet': '🌐 Internetbezogene Befehle',
                        'xp': '✨ Erfahrung und Levelingbefehle',
                        'nsfw': '🔞 Alterseingeschränkte Inhalte',
                    };
                    
                    if (categoryDescriptions[tag]) {
                        allMenüs += `│ ${categoryDescriptions[tag]}\n│\n`;
                    }
                    
                    // Organize commands alphabetically for this category
                    let commandList = [];
                    for (let Menü of categoryCommands) {
                        for (let helpItem of Menü.help) {
                            if (helpItem && typeof helpItem === 'string') {
                                commandList.push({
                                    cmd: helpItem,
                                    limit: Menü.limit,
                                    premium: Menü.Premium
                                });
                            }
                        }
                    }
                    
                    // Sort commands alphabetically
                    commandList.sort((a, b) => a.cmd.localeCompare(b.cmd));
                    
                    // Count commands for this category
                    const categoryCommandCount = commandList.length;
                    totalCommandCount += categoryCommandCount;
                    
                    // Display all commands in vertical list format
                    for (let item of commandList) {
                        const limitIcon = item.limit ? ' 🔒' : '';
                        const premiumIcon = item.premium ? ' ⭐' : '';
                        
                        // Format each command in a consistent vertical style
                        allMenüs += `│ ${_p}${item.cmd}${limitIcon}${premiumIcon}\n`;
                    }
                    
                    // Add command count for this category
                    allMenüs += `│\n│ Total: ${categoryCommandCount} Befehle\n`;
                    allMenüs += `${defaultMenü.footer}\n\n`;
                }
            }
            
            // Add a summary at the end
            allMenüs += `╭━━━⟮ 📊 ZUSAMMENFASSUNG ⟯━━━╮\n`;
            allMenüs += `│ Gesamtanzahl der Befehle: ${totalCommandCount}\n`;
            allMenüs += `│ Kategorien: ${allOrderedTags.length}\n`;
            allMenüs += `│ Präfix: ${_p}\n`;
            allMenüs += `╰━━━━━━━━━━━━━━━━╯\n\n`;
            
            allMenüs += defaultMenü.after;
            return sendMenü(m, conn, allMenüs, { name, uptime, date, time, _p });
        }
        
        if (!allTags[teks]) return m.reply(`❌ Menü "${teks}" ist nicht verfügbar.\n📋 Bitte tippe ${_p}menu, um die vollständige Liste zu sehen.`);
        
        let menuCategory = `${defaultMenü.before}\n\n${defaultMenü.header.replace(/%category/g, allTags[teks])}\n`;
        let categoryCommands = help.filter(Menü => Menü.tags.includes(teks));
        
        // Add category description based on tag
        const categoryDescriptions = {
            'ai': '🤖 Befehle für künstliche Intelligenz und Chatbots',
            'spielen': '🎮 Spielbefehlselemente',
            'database': '🗄️ Datenbankverwaltungsbefehle',
            'herunterladener': '📥 Herunterladen von Inhalten',
            'rpg': '⚔️ Rollenspielbefehle',
            'sticker': '🎨 Sticker und Bildbearbeitung',
            'tools': '🔧 Nützliche Werkzeuge und Dienstprogramme',
            // Add descriptions for other categories as needed
        };
        
        if (categoryDescriptions[teks]) {
            menuCategory += `│ ${categoryDescriptions[teks]}\n│\n`;
        }
        
        // Organize commands alphabetically
        let commandItems = [];
        for (let Menü of categoryCommands) {
            for (let help of Menü.help) {
                commandItems.push({
                    cmd: help,
                    limit: Menü.limit,
                    Premium: Menü.Premium
                });
            }
        }
        
        // Sort commands alphabetically
        commandItems.sort((a, b) => a.cmd.localeCompare(b.cmd));
        
        for (let item of commandItems) {
            const limitIcon = item.limit ? '🔒' : '';
            const premiumIcon = item.Premium ? '⭐' : '';
            const combinedCmd = `${_p}${item.cmd}`;
            
            menuCategory += defaultMenü.body
                .replace(/%cmd/g, combinedCmd)
                .replace(/%islimit/g, item.limit ? ' 🔒' : '') // Replace with icon
                .replace(/%isPremium/g, item.Premium ? ' ⭐' : '') + '\n'; // Replace with icon
        }
        
        menuCategory += `${defaultMenü.footer}\n\n${defaultMenü.after}`;
        return sendMenü(m, conn, menuCategory, { name, uptime, date, time, _p });
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, 'Entschuldigung, im Menü ist ein Fehler aufgetreten.', m);
    }
};

handler.help = ['menu', 'hilfe', 'info'];
handler.tags = ['spielen'];
handler.command = /^(menu|hilfe|help|info|bot)$/i;
handler.exp = 3;

module.exports = handler;

function sendMenü(m, conn, text, replace) {
    // Format template placeholders
    text = text.replace(/%\w+/g, match => replace[match.slice(1)] || match);
    
    // Add some random design elements for visual enhancement
    const randomEmojis = ['✨', '🌟', '💫', '⚡', '🔥', '💎', '🌈', '🎯'];
    const randomEmoji = () => randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
    
    // Add footer with version information and credits
    const footer = `\n\n╭━━━⟮ ${randomEmoji()} INFO ⟯━━━╮
│ 
│ • BLACKSKY-MD Bot v1.5.0
│ • © 2023-2025 BLACKSKY
│ • !help für weitere Hilfe
│
╰━━━━━━━━━━━━━━━━╯`;
    
    // Send the menu message with enhanced presentation
    conn.sendMessage(m.chat, {
        image: { url: './src/BLACKSKY-MD.png' },
        caption: text + footer,
        mentions: [m.sender]
    }, { quoted: m });
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
