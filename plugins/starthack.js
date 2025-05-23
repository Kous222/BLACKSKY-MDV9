let handler = async (m, { text, conn }) => {
  let targetNumber = text?.replace(/[^0-9]/g, '');
  let targetJid = targetNumber ? `${targetNumber}@s.whatsapp.net` : null;

  if (!targetJid) {
    await m.reply('❌ *Bitte gib den Benutzer an, den du hacken möchtest (z.B. @1234567890).*');
    return;
  }

  const sender = m.sender;
  const fakeIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const fakePass = ["secretpassword123", "qwerty123", "passwordlol", "admin123", "mydogisawesome"][Math.floor(Math.random() * 5)];
  const fakeChats = Math.floor(Math.random() * 300) + 50;

  const hackSteps = [
    `Starte Hack-Vorgang für @${targetNumber}... 🚀💻`,
    "[▓░░░░░░░░░░░░] 10% - IP-Adresse wird gesucht... 🌐",
    "[▓▓▓░░░░░░░░░░] 30% - Benutzerdaten werden extrahiert... 💼",
    "[▓▓▓▓▓░░░░░░░░] 50% - Chats werden durchsucht... 📱",
    "[▓▓▓▓▓▓▒▒░░░░░] 80% - Fotos und Videos gesichert... 📸📥",
    "[▓▓▓▓▓▓▓▓▓▒▒] 100% - Hack erfolgreich abgeschlossen! 😎💻",
    "",
    `*Ergebnis für @${targetNumber}:*`,
    `- IP-Adresse: ${fakeIp} 🌍`,
    `- Standort: Unbekannt 🕵️‍♂️`,
    `- Geheime Chats: ${fakeChats} 🔐`,
    `- Passwort: "${fakePass}" 🔑`,
    "",
    `@${targetNumber}, du wurdest erfolgreich "gehackt"! 😜💥`,
    "_(Natürlich nur ein Spaß-Befehl!)_ 😂"
  ];

  for (let i = 0; i < hackSteps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await conn.sendMessage(m.chat, {
      text: hackSteps[i],
      mentions: [targetJid]
    }, { quoted: m });
  }
};

handler.command = ['starthack'];
handler.help = ['starthack [@user]'];
handler.tags = ['fun'];

module.exports = handler;