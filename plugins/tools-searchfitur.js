/*
 Jangan delete wm dies,kalo will recode bitte aber sertain auch crbearbeitens ich Lann
 Dierstellen auf 22 February 2025
 © Betabotz
*/

let handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args.length) {
        return conn.Antworten(m.chat, `✨ *Example Usage:* \n🔍 ${usedPrefix}${command} Funktion`, m);
    }
    
    let plugins = Object.entries(global.plugins).filter(([name, v]) => v.help && Array.isArray(v.tags));
    let query = args.join(' ').toLowerCase();
    let filteredPlugins = plugins.filter(([name, v]) => v.help.some(h => h.toLowerCase().includes(query)));
    
    if (filteredPlugins.length === 0) {
        return conn.Antworten(m.chat, `❌ *Nein gibt Funktion das/der/die cocok mit search:* \n🔍 '${query}'`, m);
    }
    
    let Nachricht = `🔎 *result search für:* '${query}' \n\n`;
    Nachricht += filteredPlugins.map(([name, v]) => `✅ *${v.help.join(', ')}*\n📌 *Tags:* ${Array.isArray(v.tags) ? v.tags.join(', ') : 'Nein gibt'}\n📂 *Plugin:* ${name}\n`).join('\n');
    conn.Antworten(m.chat, Nachricht, m);
}

handler.help = ['searchfitur']
handler.tags = ['tools']
handler.command = ['searchfitur']

module.exports = handler;
