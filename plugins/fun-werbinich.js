const werBinIchAntworten = [
  "Du bist ein müder Waschbär mit WLAN.",
  "Im Inneren ein hyperaktives Eichhörnchen auf Zucker.",
  "Captain Cringe – Retter der peinlichen Gespräche.",
  "Snack-Gott: Immer hungrig, nie vorbereitet.",
  "In einem Paralleluniversum wärst du ein professioneller Memer.",
  "Du bist der Sidekick im Film deines Lebens.",
  "80% Chaos, 20% Glück – das bist du.",
  "Dein Lebensmotto: 'Wenn schon peinlich, dann mit Stil.'",
  "Du bist eine Mischung aus Kaffee, Sarkasmus und leichten Existenzkrisen.",
  "Emoji-Warrior – kommuniziert nur in Memes."
];

let handler = async (m, { conn }) => {
  const senderName = m.pushName || "Unbekannt";
  const antwort = werBinIchAntworten[Math.floor(Math.random() * werBinIchAntworten.length)];

  await conn.sendMessage(m.chat, {
    text: `👤 *Analyse für @${m.sender.split('@')[0]}*\n\n${antwort}`, // Tags the user
    mentions: [m.sender] // Ensure it tags the user properly
  });
};

handler.command = ['werbinich'];
handler.help = ['werbinich'];
handler.tags = ['fun'];
handler.group = true; // Only active in groups

module.exports = handler;
