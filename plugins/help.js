const handler = async (m, { conn, args, usedPrefix, command }) => {
  const plugins = Object.values(global.plugins).filter(p => p.help && p.help.length);

  if (!args[0]) {
    // Liste aller Befehle
    const allCommands = plugins
      .flatMap(p => p.help.map(cmd => `${usedPrefix}${cmd}`))
      .join('\n• ');

    const message = `
╔═══❖•✦✧✦•❖══╗
       📝 *HILFE* 📝
╚═══❖•✦✧✦•❖══╝

Hier sind alle verfügbaren Befehle:

• ${allCommands}

Tipp: Schreibe *${usedPrefix}help befehl* für mehr Infos.
`;

    return m.reply(message.trim());
  } else {
    // Details zu bestimmtem Befehl
    const name = args[0].toLowerCase();
    const plugin = plugins.find(p => p.help.find(h => h.toLowerCase() === name));

    if (!plugin) {
      return m.reply(`❌ Befehl *${name}* nicht gefunden.`);
    }

    const cmd = plugin.help.find(h => h.toLowerCase() === name);
    const desc = plugin.description || plugin.desc || 'Keine Beschreibung verfügbar.';
    const limit = plugin.limit ? 'Ja' : 'Nein';
    const premium = plugin.premium || plugin.Premium ? 'Ja' : 'Nein';
    const tags = plugin.tags?.join(', ') || 'Allgemein';

    const detailMessage = `
╔═════ ∘◦ ❉ ◦∘ ═════╗
         ℹ️ *BEFEHLDETAILS* ℹ️
╚═════ ∘◦ ❉ ◦∘ ═════╝

• *Name:* ${usedPrefix}${cmd}
• *Beschreibung:* ${desc}
• *Kategorie:* ${tags}
• *Limit:* ${limit}
• *Premium:* ${premium}
    `.trim();

    return m.reply(detailMessage);
  }
};

handler.help = ['help', 'hilfe'];
handler.tags = ['info'];
handler.command = /^(help|hilfe|h|hilfe)$/i;

module.exports = handler;
