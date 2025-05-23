let handler = async (m, { conn, text, participants }) => {
  // Check if a user is mentioned in the message
  let mentioned = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : '';

  // If no user is mentioned, return an error message
  if (!mentioned) {
    return m.reply('Bitte erwähne eine Person, der du einen Anmachspruch senden möchtest!');
  }

  // List of pickup lines (added more fun and creative lines)
  let pickupLines = [
    `Bist du ein Magier? Denn immer wenn ich dich ansehe, verschwinden alle anderen! ✨`,
    `Glaubst du an Liebe auf den ersten Blick oder soll ich nochmal vorbeigehen? 😏`,
    `Hast du eine Karte? Ich habe mich in deinen Augen verirrt. 🗺️`,
    `Bist du ein Parkplatz? Weil du mir immer den Kopf verdrehst! 🚗`,
    `Entschuldigung, aber ich glaube, du hast etwas verloren: mein Herz. 💖`,
    `Sind deine Eltern Bäcker? Denn du bist ein echter Keks. 🍪`,
    `Glaubst du an Schicksal? Denn es scheint, als wären wir füreinander bestimmt. 💘`,
    `Bist du ein Zauberer? Denn immer wenn ich in deine Augen sehe, verschwinde ich in einem Meer aus Gefühlen. 🧙‍♂️`,
    `Ich muss ein Foto von dir machen, damit ich die Sonne wiedersehen kann. ☀️`,
    `Du bist wie ein Traum – und ich will nie wieder aufwachen. 🌙`,
    `Entschuldigung, aber du bist der Grund, warum meine Gedanken immer abdriften... 💭`,
    `Kannst du mir bitte deine Hand geben? Weil ich in deinem Herz ein Zuhause gefunden habe. 🏠💖`,
    `Ich habe meine Nummer verloren... Kann ich deine haben? 📱`,
    `Sind deine Eltern Künstler? Weil du ein wahres Meisterwerk bist. 🎨🖌️`,
    `Wenn du ein Gemüse wärst, wärst du ein süßer Kürbis! 🎃❤️`,
    `Du bist so heiß, dass mein Handy gerade überhitzt! 🔥📱`,
    `Bist du ein Alien? Denn du hast mich entführt! 👽💫`,
    `Hast du eine Bandage? Weil ich mir beim Fallen in deine Augen das Knie aufgeschlagen habe! 🩹💘`,
    `Bist du Google? Denn du hast alles, wonach ich gesucht habe. 🔍💖`,
    `Wenn ich dir einen Stern geben würde, hättest du die ganze Galaxie. 🌌⭐`,
    `Bist du mein WLAN? Denn ich fühle eine starke Verbindung. 📶❤️`,
    `Kommst du aus der Zukunft? Weil du perfekt für mich bist! ⏳💫`,
    `Ich dachte, Engel hätten Flügel... aber du hast einfach nur mein Herz erobert. 😇💖`
  ];

  // Randomly select one of the pickup lines
  let randomPickupLine = pickupLines[Math.floor(Math.random() * pickupLines.length)];

  // Send the pickup line to the group with the mentioned user
  await conn.sendMessage(m.chat, {
    text: `*Anmachspruch für @${mentioned.split('@')[0]}:* \n\n${randomPickupLine}`,
    mentions: [mentioned]  // Mention the user
  }, { quoted: m });
};

handler.help = ['anmachspruch [@user]'];
handler.tags = ['fun'];
handler.command = /^anmachspruch$/i;

module.exports = handler;
