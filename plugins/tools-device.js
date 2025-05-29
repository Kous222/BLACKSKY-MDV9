const { getDevice } = require('@adiwajshing/baileys');

let handler = async (m) => {
  let msg = m.quoted ? m.quoted : m;
  let device = getDevice(msg.key.id);
  m.reply(`📱 Nachricht gesendet von einem *${device}* Gerät.`);
};

handler.help = ['device'];
handler.tags = ['tools'];
handler.command = /^(device)$/i;

module.exports = handler;
