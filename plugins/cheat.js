let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : `@${m.sender.split('@')[0]}`;

  // If no target is provided, remind the user to specify one
  if (!target) {
    await m.reply('❌ *Bitte gib den Benutzernamen an, den du betrügen möchtest!*');
    return;
  }

  // Fun fake cheat process steps
  const cheatSteps = [
    `Starte Cheat-Vorgang für ${target}... 🎮⚡`,
    "[▓░░░░░░░░░░░░] 10% - Unfaire Vorteile werden aktiviert... 🤫",
    "[▓▓▓░░░░░░░░░░] 25% - Unbesiegbar Modus wird eingeschaltet... 🦸‍♂️💪",
    "[▓▓▓▓▓░░░░░░░░] 50% - Unendlich Leben wird freigeschaltet... ♥️🔄",
    "[▓▓▓▓▓▓▓░░░░░] 75% - Superkraft aktiviert... 🦸‍♀️⚡",
    "[▓▓▓▓▓▓▓▓▓▓] 100% - CHEAT ERFOLGREICH ABGESCHLOSSEN! 😎🎮",
    "",
    `*Ergebnis für ${target}:*`,
    `- Unendliche Ressourcen: Aktiviert 🌟💎`,
    `- Unbesiegbar im Spiel: Aktiviert 💪🏆`,
    `- Beste Ausrüstung: "All-Knowing Sword" 🗡️`,
    `- Perfekte Steuerung: Dein Gegner wird dich nie schlagen! 🎮👑`,
    "",
    `Du bist jetzt ein Cheat-Meister, ${target}! 😜🎮`,
    "_(Natürlich nur ein Spaß-Befehl!)_ 😅🔑"
  ];

  // Send each step with a delay to simulate a "cheat" process
  for (let i = 0; i < cheatSteps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating delay
    await conn.sendMessage(m.chat, { text: cheatSteps[i], mentions: [m.sender] }, { quoted: m });
  }
};

handler.command = ['cheat', 'fakecheat', 'cheatcode'];
handler.help = ['cheat [@user]'];
handler.tags = ['fun'];

module.exports = handler;