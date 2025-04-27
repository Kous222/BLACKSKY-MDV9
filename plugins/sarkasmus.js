let handler = async (m, { conn }) => {
  const jokes = [
    "Natürlich helfe ich dir... sobald meine Motivation zurück aus dem Urlaub ist.",
    "Du hast recht. Ich liege falsch. Wie immer. Danke für die Erinnerung.",
    "Ich bin nicht faul. Ich bin im Energiesparmodus.",
    "Ach, du hast keine Zeit? Erzähl mir mehr, während du stundenlang auf TikTok scrollst.",
    "Ich arbeite hart daran, so zu tun, als wäre ich beschäftigt.",
    "Oh, du hast eine Meinung? Wie mutig.",
    "Das Leben ist kein Wunschkonzert – eher eine kaputte Playlist auf Dauerschleife.",
    "Du bist einzigartig… genau wie alle anderen auch.",
    "Ich wollte dir einen sarkastischen Kommentar schreiben, aber du hast mich mit deiner Logik schon genug verwirrt.",
    "Wenn ich dir zustimme, liegen wir dann beide falsch?"
  ];

  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  m.reply(`*Sarkastischer Spruch:*\n\n${joke}`);
};

handler.command = ['sarkasmus', 'sarkastisch', 'sarcasm'];
handler.help = ['sarkasmus'];
handler.tags = ['fun'];

module.exports = handler;