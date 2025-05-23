let handler = async (m, { conn }) => {
  const responses = [
    '👩‍🦰 Frauenrechte sind nicht vorhanden 🙂',
    '👩 Frauenrechte? Noch im Ladeprozess... 0%.',
    '🚫 Zugriff auf Frauenrechte verweigert.',
    '📢 Frauenrechte wurden nicht gefunden.',
    '❌ Frauenrechte existieren nur in Mythen.',
    '🤷‍♀️ Leider sind Frauenrechte hier nicht verfügbar.'
  ];
  
  let randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  await conn.sendMessage(m.chat, { text: randomResponse }, { quoted: m });
};

handler.command = ['frauenrechte'];
handler.help = ['frauenrechte'];
handler.tags = ['fun'];
handler.group = false; // überall nutzbar

module.exports = handler;
