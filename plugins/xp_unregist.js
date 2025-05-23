const { createHash } = require('crypto');

let handler = async function (m, { conn, args, command, usedPrefix }) {
  if (!args[0]) {
    throw `✳️ *Bitte gib deine Seriennummer an!*\nBeispiel: ${usedPrefix + command} <Seriennummer>\n\nDu kannst deine Seriennummer mit folgendem Befehl einsehen:\n*${usedPrefix}nomorseri*`
  }

  let user = global.db.data.users[m.sender];
  let sn = createHash('md5').update(m.sender).digest('hex');

  if (args[0] !== sn) {
    throw '⚠️ *Ungültige Seriennummer!* Bitte überprüfe sie mit dem Befehl *.nomorseri*'
  }

  user.registered = false;
  m.reply('✅ *Du wurdest erfolgreich abgemeldet.*');
};

handler.help = ['unreg <Seriennummer>'];
handler.tags = ['xp'];
handler.command = ['unreg'];
handler.register = true;

module.exports = handler;
