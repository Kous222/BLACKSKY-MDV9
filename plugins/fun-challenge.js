let handler = async (m, { command }) => {
  const challenges = [
    'Iss etwas richtig Scharfes!',
    'Tanze 30 Sekunden lang – egal wo du bist!',
    'Erzähle deinen Eltern einen schlechten Witz.',
    'Schicke einer zufälligen Person in deinen Kontakten ein Kompliment.',
    'Mach 10 Liegestütze – jetzt sofort!',
    'Versuche, 1 Minute lang nicht zu lachen.',
    'Sprich 3 Minuten lang nur in Reimen.',
    'Trinke ein Glas Wasser in einem Zug.',
    'Imitiere für 1 Minute ein Tier deiner Wahl.',
    'Schreibe in den Gruppenchat: "Ich bin der/die Coolste hier!"',
    'Stell dich vor einen Spiegel und mach dir 3 Komplimente.',
    'Wechsle dein Profilbild zu einem Meme für die nächsten 10 Minuten.',
    'Schreib "Ich liebe Brokkoli" in deine WhatsApp-Statusnachricht.',
    'Gib der nächsten Nachricht in der Gruppe eine dramatische Sprachnachricht als Antwort.',
    'Sprich mit einem imaginären Freund für 2 Minuten.',
    'Mach ein Selfie mit deiner peinlichsten Pose und poste es.',
    'Benutze 5 Minuten lang nur Emojis zum Kommunizieren.',
    'Sprich den nächsten Satz, den du schreibst, mit einem Dialekt.',
    'Stelle dich jemandem in der Gruppe offiziell als König/Königin vor.',
    'Wechsle deinen Namen in WhatsApp für 1 Stunde zu "Spicy Kartoffel".',
    'Rufe jemanden an und singe ihm Happy Birthday – egal ob er Geburtstag hat oder nicht.',
    'Setz dir eine imaginäre Krone auf und verhalte dich 5 Minuten wie ein König/eine Königin.',
    'Führe einen kurzen Monolog über das Leben... als Banane.',
    'Schreibe deinen letzten geträumten Traum in den Gruppenchat.',
    'Wähle jemanden aus der Gruppe und mach ihm/ihr ein ernst gemeintes Kompliment.',
    'Erzähle der Gruppe dein peinlichstes Erlebnis – wenn du dich traust!',
    'Finde 3 Gegenstände in deiner Nähe und erkläre, warum sie für eine Apokalypse nützlich wären.',
    'Rede 1 Minute lang wie ein Roboter.',
    'Tue so, als wärst du ein Nachrichtensprecher und gib eine „Breaking News“ Meldung durch.',
    'Wähle jemanden aus der Gruppe und mach ihm/ihr einen Heiratsantrag.'
  ];

  let challenge = challenges[Math.floor(Math.random() * challenges.length)];
  m.reply(`🎯 *Deine Herausforderung:*\n${challenge}`);
};

handler.command = /^challenge$/i;
handler.help = ['challenge'];
handler.tags = ['fun'];

module.exports = handler;
