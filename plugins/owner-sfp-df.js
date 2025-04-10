let fs = require('fs');
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `uhm.. teksnya welche?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} Menü`;

  if (command === 'sfp') {
    if (!m.quoted.text) throw `antworten nachricht sein/ihr!`;
    let path = `plugins/${text}.js`;
    await fs.writeFileSync(path, m.quoted.text);
    m.reply(`terspeichern in ${path}`);
  } else if (command === 'df') {
    let path = `plugins/${text}.js`;
    if (!fs.existsSync(path)) throw `file plugin ${text}.js nicht gefunden`;
    fs.unlinkSync(path);
    m.reply(`file plugin ${text}.js erfolgreich dilöschen`);
  }
};

handler.help = ['sfp', 'df'].map(v => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^(sf|df)$/i;
handler.rowner = true;

module.exports = handler;
