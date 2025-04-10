let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender];
  
  if (user.jail && (!user.perkerjaandua || user.pekerjaandua > Date.now())) {
    if (user.pekerjaandua) {
      let remainingTime = user.pekerjaandua - Date.now();
      let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      let seconds = Math.floor((remainingTime / 1000) % 60);
      
      if (m.sender === text) {
        return m.reply(`_Kamu noch befindet sich in penjara_\n*Rest zeit penjara:* ${minutes} menit ${seconds} Sekunden`);
      } else {
        return m.reply(`_kamu noch befindet sich in penjara_\n*Rest zeit penjara*: ${minutes} menit ${seconds} Sekunden`, null, { mentions: [m.sender] });
      }
    }
  } else if (user.jail === true) {
    if (m.sender === text) {
      return m.reply('*du dipenjara seumur hidup!*');
    } else {
      return m.reply(`_kamu hat dipenjara seumur hidup_`, null, { mentions: [m.sender] });
    }
  } else {
    if (m.sender === text) {
      return m.reply('*du nicht gerade dipenjara*');
    } else {
      return m.reply(`_kamu nicht gerade in penjara_`, null, { mentions: [m.sender] });
    }
  }
}

handler.help = ['checkjail', 'cj', 'statuspenjara', 'jailstatus']
handler.tags = ['rpg']
handler.command = /^(checkjail|cj|statuspenjara|jailstatus)$/i
handler.rpg = true

module.exports = handler