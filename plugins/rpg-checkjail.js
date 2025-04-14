let handler = async (m, { conn, text, usedPrefix, command }) => {
  let target = text ? (text.includes('@') ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : text) : m.sender;
  const user = global.db.data.users[target];

  if (!user) return m.reply('Benutzer nicht gefunden.');

  if (user.jail === undefined) user.jail = false;
  if (user.perkerjaandua === undefined) user.perkerjaandua = 0;

  // Wenn im Gefängnis und Zeit läuft noch
  if (user.jail && user.perkerjaandua > Date.now()) {
    let remainingTime = user.perkerjaandua - Date.now();
    let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let seconds = Math.floor((remainingTime / 1000) % 60);

    if (target === m.sender) {
      return m.reply(`*Du bist noch im Gefängnis!*\n*Verbleibende Zeit:* ${minutes} Minuten ${seconds} Sekunden`);
    } else {
      return m.reply(`*Diese Person ist noch im Gefängnis!*\n*Verbleibende Zeit:* ${minutes} Minuten ${seconds} Sekunden`, null, {
        mentions: [target]
      });
    }
  }

  // Lebenslänglich
  if (user.jail === true && user.perkerjaandua === 0) {
    if (target === m.sender) {
      return m.reply('*Du bist lebenslang im Gefängnis!*');
    } else {
      return m.reply(`*Diese Person ist lebenslang im Gefängnis!*`, null, {
        mentions: [target]
      });
    }
  }

  // Nicht im Gefängnis
  if (target === m.sender) {
    return m.reply('*Du bist nicht im Gefängnis.*');
  } else {
    return m.reply(`*Diese Person ist nicht im Gefängnis.*`, null, {
      mentions: [target]
    });
  }
};

handler.help = ['checkjail', 'cj', 'statuspenjara', 'jailstatus'];
handler.tags = ['rpg'];
handler.command = /^(checkjail|cj|statuspenjara|jailstatus)$/i;
handler.rpg = true;

module.exports = handler;
