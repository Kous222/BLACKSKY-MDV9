let handler = async (m, { text, command, usedPrefix, commands }) => {
  // If user requested help for a specific command
  if (text) {
    let cmd = commands.find(v => v.help && v.help.includes(text.toLowerCase()));
    if (!cmd) return m.reply(`❌ Kein Befehl namens *${text}* gefunden.`);
    
    let info = `ℹ️ Hilfe zu *${text.toLowerCase()}*:\n\n` +
      `📌 *Befehl:* ${usedPrefix}${cmd.help[0]}\n` +
      `🏷️ *Kategorie:* ${cmd.tags?.join(', ') || 'Unbekannt'}\n` +
      (cmd.owner ? '🔒 *Nur Owner*\n' : '') +
      (cmd.group ? '👥 *Nur Gruppen*\n' : '') +
      (cmd.private ? '📩 *Nur Privatchat*\n' : '') +
      (cmd.premium ? '💎 *Premium erforderlich*\n' : '') +
      `\n📝 *Beschreibung:* Nicht angegeben.`;

    return m.reply(info);
  }

  // If no command name given, show all categories and commands
  let groups = {};

  for (let cmd of commands) {
    if (cmd.help && !cmd.disabled) {
      let tag = cmd.tags?.[0] || 'Sonstige';
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(`${usedPrefix}${cmd.help[0]}`);
    }
  }

  let helpList = Object.keys(groups).map(tag => {
    return `📂 *${tag}*\n` + groups[tag].map(cmd => `• ${cmd}`).join('\n');
  }).join('\n\n');

  let helpText = `🆘 *Hilfe – Verfügbare Befehle*\n\n` +
    helpList +
    `\n\nℹ️ Du kannst auch *${usedPrefix}help <befehl>* eingeben, z.B. *${usedPrefix}help kick*`;

  return m.reply(helpText);
};

handler.help = ['help [befehl]'];
handler.tags = ['info'];
handler.command = /^hilfe|help|commands?$/i;

module.exports = handler;
