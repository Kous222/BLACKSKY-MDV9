let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : `@${m.sender.split('@')[0]}`;
  
  const jokes = [
    `Dein Gesicht ist so hässlich, dass selbst der Spiegel wegläuft! 😜`,
    `Hast du einen Gesichts-Filter? Oder hast du es ohne probiert? 🤭`,
    `Dein Gesicht ist wie eine gute Pizza: Es sieht gut aus, aber wenn du zu lange schaust, wirst du hungrig... nach etwas anderem. 🍕`,
    `Du bist nicht hässlich, du bist nur ein bisschen 'ungewöhnlich'... wie ein Kunstwerk aus dem Museum der seltsamen Dinge. 🖼️`,
    `Dein Gesicht erinnert mich an eine gute alte Zeit... Ich weiß nicht wann, aber sie war bestimmt nicht gut. 😆`,
    `Hast du jemals über eine Maske nachgedacht? Oder hast du das schon probiert? 😜`,
    `Dein Gesicht ist wie ein Puzzle – schwer zu erkennen, aber irgendwie komplett. 🧩`,
    `Ich hab dein Gesicht nicht gesehen, aber meine Kamera ist kaputt... 🤣`,
    `Es gibt Menschen, die 'Gute Laune' verbreiten – du verbreitest 'Verwirrung'. 😆`,
    `Dein Gesicht könnte glatt als Kunstwerk durchgehen... Kunst der Schockierung! 🎨`,
    `Ich wusste nicht, dass es so was wie 'Frühstücksgesichter' gibt... aber hier bist du. 🍳`,
    `Weißt du, was besser aussieht als dein Gesicht? Alles andere. 😜`,
    `Dein Gesicht ist wie der Windows 95-Startbildschirm – sehr retro, aber nicht unbedingt schön. 💻`,
    `Ich würde dir sagen, dass du ein schönes Lächeln hast, aber das würde die Wahrheit verdrehen. 😅`,
    `Du bist nicht hässlich... du bist einfach nur auf deine ganz eigene Weise faszinierend. 😎`,
    `Du siehst aus wie ein Meme – alt und irgendwie lustig, aber nie wirklich gut. 🖼️`,
    `Ich dachte, dein Gesicht wäre ein Filter, aber es ist der natürliche Look, oder? 😬`,
    `Du hast das Gesicht einer 'Wie kamst du hierher?'-Frage. 🤔`,
    `Dein Gesicht ist so süß wie ein Gummibärchen... das ich fallen lasse und dann drauf trete. 🍬`
  ];

  // Select a random joke from the list
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  // Send the joke
  await m.reply(`${randomJoke} ${target ? `\n\nZielgerichtet an: ${target}` : ''}`);
};

handler.command = ['ugly','face'];
handler.help = ['ugly [@user]'];
handler.tags = ['fun'];

module.exports = handler;