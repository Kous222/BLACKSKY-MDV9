let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender];
  
  // Ensure the jail status is initialized
  if (user.jail === undefined) user.jail = false;
  if (user.perkerjaandua === undefined) user.perkerjaandua = 0;

  // If user is jailed, check if their sentence is still active
  if (user.jail && user.perkerjaandua > Date.now()) {
    let remainingTime = user.perkerjaandua - Date.now();
    let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let seconds = Math.floor((remainingTime / 1000) % 60);
    
    // If checking their own status
    if (m.sender === text) {
      return m.reply(`*Du bist noch im Gefängnis*\n*Verbleibende Zeit:* ${minutes} Minuten ${seconds} Sekunden`);
    } else {
      return m.reply(`*Die Person ist noch im Gefängnis*\n*Verbleibende Zeit:* ${minutes} Minuten ${seconds} Sekunden`, null, { mentions: [m.sender] });
    }
  } 
  // If the user is jailed for life
  else if (user.jail === true) {
    if (m.sender === text) {
      return m.reply('*Du bist lebenslang im Gefängnis!*');
    } else {
      return m.reply(`*Die Person ist lebenslang im Gefängnis*`, null, { mentions: [m.sender] });
    }
  } 
  // If the user is not in jail
  else {
    if (m.sender === text) {
      return m.reply('*Du bist nicht im Gefängnis.*');
    } else {
      return m.reply(`*Die Person ist nicht im Gefängnis.*`, null, { mentions: [m.sender] });
    }
  }
};

handler.help = ['checkjail', 'cj', 'statuspenjara', 'jailstatus'];
handler.tags = ['rpg'];
handler.command = /^(checkjail|cj|statuspenjara|jailstatus)$/i;
handler.rpg = true;

module.exports = handler;
