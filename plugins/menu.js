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
    'all', 'ai', 'database', 'herunterladener', 'rpg', 'rpgG', 'sticker', 'advanced', 'xp', 'fun', 'spiel', 'github', 'group', 'image', 'nsfw', 'info', 'internet', 'islam', 'kerang', 'maker', 'news', 'owner', 'voice', 'quotes', 'store', 'stalk', 'shortlink', 'tools', 'anonymous'
];

// Emoji mapping für Kategorien
const categoryEmojis = {
    'all': '🌟',
    'ai': '🤖',
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
│        *BLACKSKY-MD*
│  *⚡ PREMIUM BOT ⚡*
╰━━━━━━━━━━━━━━━━╯

*👋 Hallo, %name!*
*❤️ Ich bin BLACKSKY dein Lieblings Bot ❤️*

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
│ • Tippe .menu <kategorie>
│   für ein bestimmtes Menü
│ • Beispiel: .menu tools
│ • Nutze .hilfe für Hilfe
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
            
            // Hauptkategorien mit Emojis hinzufügen
            const menuItems = arrayMenü.map(tag => {
                const emoji = categoryEmojis[tag] || '📋';
                return { tag, emoji };
            });
            
            // Funktion zum Hinzufügen einer Trennlinie
            const addDivider = () => menuList += `│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n`;
            
            // Hauptbereiche
            menuList += `│ *🌟 HAUPTMENÜ*\n`;
            menuList += `│ ${categoryEmojis['all']} ${_p}menu all\n`;
            menuList += `│ ${categoryEmojis['tools']} ${_p}menu tools\n`;
            menuList += `│ ${categoryEmojis['info']} ${_p}menu info\n`;
            menuList += `│ ${categoryEmojis['owner']} ${_p}menu owner\n`;
            
            addDivider();
            
            // Unterhaltungsbereich
            menuList += `│ *🎮 UNTERHALTUNG*\n`;
            menuList += `│ ${categoryEmojis['rpg']} ${_p}menu rpg\n`;
            menuList += `│ ${categoryEmojis['spiel']} ${_p}menu spiel\n`;
            menuList += `│ ${categoryEmojis['rpgG']} ${_p}menu rpgG\n`;
            menuList += `│ ${categoryEmojis['fun']} ${_p}menu fun\n`;
            menuList += `│ ${categoryEmojis['xp']} ${_p}menu xp\n`;
            
            addDivider();
            
            // Medienbereich
            menuList += `│ *📥 MEDIEN*\n`;
            menuList += `│ ${categoryEmojis['herunterladener']} ${_p}menu herunterladener\n`;
            menuList += `│ ${categoryEmojis['sticker']} ${_p}menu sticker\n`;
            menuList += `│ ${categoryEmojis['image']} ${_p}menu image\n`;
            menuList += `│ ${categoryEmojis['maker']} ${_p}menu maker\n`;
            menuList += `│ ${categoryEmojis['voice']} ${_p}menu voice\n`;
            
            addDivider();
            
            // Kommunikationsbereich
            menuList += `│ *💬 KOMMUNIKATION*\n`;
            menuList += `│ ${categoryEmojis['ai']} ${_p}menu ai\n`;
            menuList += `│ ${categoryEmojis['anonymous']} ${_p}menu anonymous\n`;
            menuList += `│ ${categoryEmojis['quotes']} ${_p}menu quotes\n`;
            menuList += `│ ${categoryEmojis['islam']} ${_p}menu islam\n`;
            
            addDivider();
            
            // Internetbereich
            menuList += `│ *🌐 INTERNET*\n`;
            menuList += `│ ${categoryEmojis['internet']} ${_p}menu internet\n`;
            menuList += `│ ${categoryEmojis['github']} ${_p}menu github\n`;
            menuList += `│ ${categoryEmojis['news']} ${_p}menu news\n`;
            menuList += `│ ${categoryEmojis['stalk']} ${_p}menu stalk\n`;
            menuList += `│ ${categoryEmojis['shortlink']} ${_p}menu shortlink\n`;
            menuList += `│ ${categoryEmojis['store']} ${_p}menu store\n`;
            
            // Adminbereich
            addDivider();
            menuList += `│ *⚙️ VERWALTUNG*\n`;
            menuList += `│ ${categoryEmojis['advanced']} ${_p}menu advanced\n`;
            menuList += `│ ${categoryEmojis['group']} ${_p}menu group\n`;
            menuList += `│ ${categoryEmojis['database']} ${_p}menu database\n`;
            menuList += `│ ${categoryEmojis['nsfw']} ${_p}menu nsfw\n`;
            
            // Restliche Kategorien hinzufügen
            const listedCategories = ['all', 'tools', 'info', 'owner', 'rpg', 'spiel', 
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
            const categoryOrder = [
                'all', 'tools', 'info', 'spiel', 'xp', 'rpg', 'rpgG',
                'ai', 'fun', 'quotes', 'voice', 'anonymous', 
                'herunterladener', 'sticker', 'image', 'maker',
                'internet', 'github', 'news', 'shortlink', 'store', 'stalk',
                'database', 'advanced', 'group', 'owner',
                'nsfw', 'islam', 'kerang'
            ];
            const orderedTags = categoryOrder.filter(tag => arrayMenü.includes(tag));
            const remainingTags = arrayMenü.filter(tag => !orderedTags.includes(tag));
            const allOrderedTags = [...orderedTags, ...remainingTags];

            let totalCommandCount = 0;

            allMenüs += `╭━━━━⟮ 📋 VOLLSTÄNDIGE BEFEHLSLISTE ⟯━━━━╮\n`;
            allMenüs += `│ ${categoryEmojis['all']} Alle Befehle - sortiert nach Kategorien\n`;
            allMenüs += `│ ☠️ = Limitierte Funktion | ⭐ = Premium Funktion\n`;
            allMenüs += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;

            for (let tag of allOrderedTags) {
                let categoryCommands = help.filter(Menü => Menü.tags.includes(tag));
                if (categoryCommands.length > 0) {
                    if (tag !== allOrderedTags[0]) {
                        allMenüs += `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n\n`;
                    }
                    allMenüs += `${defaultMenü.header.replace(/%category/g, allTags[tag])}\n`;
                    // Beschreibung für Kategorie hinzufügen
                    const categoryDescriptions = {
                        'ai': '🤖 Befehle für künstliche Intelligenz und Chatbots',
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
                    // Commands alphabetisch sortieren
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
                    commandList.sort((a, b) => a.cmd.localeCompare(b.cmd));
                    const categoryCommandCount = commandList.length;
                    totalCommandCount += categoryCommandCount;

                    for (let item of commandList) {
                        const limitIcon = item.limit ? ' ☠️' : '';
                        const premiumIcon = item.premium ? ' ⭐' : '';
                        allMenüs += `│ ${_p}${item.cmd}${limitIcon}${premiumIcon}\n`;
                    }
                    allMenüs += `│\n│ Total: ${categoryCommandCount} Befehle\n`;
                    allMenüs += `${defaultMenü.footer}\n\n`;
                }
            }

            // Zusammenfassung
            allMenüs += `╭━━━⟮ 📊 ZUSAMMENFASSUNG ⟯━━━╮\n`;
            allMenüs += `│ Gesamtzahl der Befehle: ${totalCommandCount}\n`;
            allMenüs += `│ Kategorien: ${allOrderedTags.length}\n`;
            allMenüs += `│ Präfix: ${_p}\n`;
            allMenüs += `╰━━━━━━━━━━━━━━━━╯\n\n`;

            allMenüs += defaultMenü.after;
            return sendMenü(m, conn, allMenüs, { name, uptime, date, time, _p });
        }

        if (!allTags[teks]) return m.reply(`❌ Menü "${teks}" ist nicht verfügbar.\n📋 Bitte tippe ${_p}menu, um die vollständige Liste zu sehen.`);

        let menuCategory = `${defaultMenü.before}\n\n${defaultMenü.header.replace(/%category/g, allTags[teks])}\n`;
        let categoryCommands = help.filter(Menü => Menü.tags.includes(teks));

        // Kategorie Beschreibung hinzufügen
        const categoryDescriptions = {
            'ai': '🤖 Befehle für künstliche Intelligenz und Chatbots',
            'database': '🗄️ Datenbankverwaltungsbefehle',
            'herunterladener': '📥 Herunterladen von Inhalten',
            'rpg': '⚔️ Rollenspielbefehle',
            'sticker': '🎨 Sticker und Bildbearbeitung',
            'tools': '🔧 Nützliche Werkzeuge und Dienstprogramme',
            // Weitere Beschreibungen bei Bedarf hinzufügen
        };
        if (categoryDescriptions[teks]) {
            menuCategory += `│ ${categoryDescriptions[teks]}\n│\n`;
        }

        // Commands alphabetisch sortieren
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
        commandItems.sort((a, b) => a.cmd.localeCompare(b.cmd));

        for (let item of commandItems) {
            const limitIcon = item.limit ? '☠️' : '';
            const premiumIcon = item.Premium ? '⭐' : '';
            const combinedCmd = `${_p}${item.cmd}`;

            menuCategory += defaultMenü.body
                .replace(/%cmd/g, combinedCmd)
                .replace(/%islimit/g, item.limit ? ' ☠️' : '') // Icon ersetzen
                .replace(/%isPremium/g, item.Premium ? '⭐' : '') + '\n'; // Icon ersetzen
        }

        menuCategory += `${defaultMenü.footer}\n\n${defaultMenü.after}`;
        return sendMenü(m, conn, menuCategory, { name, uptime, date, time, _p });
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, 'Entschuldigung, im Menü ist ein Fehler aufgetreten.', m);
    }
}

handler.help = ['menu', 'info'];
handler.tags = ['spielen'];
handler.command = /^(menu|info|bot)$/i;
handler.exp = 3;

module.exports = handler;

function sendMenü(m, conn, text, replace) {
    // Platzhalter im Text ersetzen
    text = text.replace(/%\w+/g, match => replace[match.slice(1)] || match);
    
    // Zufällige Emojis für visuelles Design
    const randomEmojis = ['✨', '🌟', '💫', '⚡', '🔥', '💎', '🌈', '🎯'];
    const randomEmoji = () => randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
    
    // Footer mit Version und Credits
    const footer = `\n\n╭━━━⟮ ${randomEmoji()} INFO ⟯━━━╮
│ 
│ • *BLACKSKY-MD Bot V2*
│ • *© 2023-2025 BLACKSKY*
│ • *.help für weitere Hilfe*
│
╰━━━━━━━━━━━━━━━━╯`;
    
    // Senden der Menü-Nachricht mit Design-Elementen
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
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}