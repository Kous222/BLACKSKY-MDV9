let handler = async (m, { text, conn }) => {
  const characters = [
    { name: "Vin Diesel", character: "Dominic Toretto" },
    { name: "Paul Walker", character: "Brian O'Conner" },
    { name: "Michelle Rodriguez", character: "Letty Ortiz" },
    { name: "Jordana Brewster", character: "Mia Toretto" },
    { name: "Tyrese Gibson", character: "Roman Pearce" },
    { name: "Ludacris", character: "Tej Parker" },
    { name: "Dwayne Johnson", character: "Luke Hobbs" },
    { name: "Gal Gadot", character: "Gisele Yashar" },
    { name: "Jason Statham", character: "Deckard Shaw" },
    { name: "Kurt Russell", character: "Mr. Nobody" },
    { name: "John Cena", character: "Jakob Toretto" },
    { name: "Helen Mirren", character: "Queenie Shaw" },
    { name: "Sung Kang", character: "Han Seoul-Oh" },
    { name: "Nathalie Emmanuel", character: "Ramsey" },
    { name: "Lucas Black", character: "Sean Boswell" },
    { name: "Bow Wow", character: "Twinkie" },
    { name: "Eva Mendes", character: "Monica Fuentes" },
    { name: "Scott Eastwood", character: "Little Nobody" },
    { name: "Charlize Theron", character: "Cipher" },
    { name: "Ronda Rousey", character: "Tess" },
    { name: "Kurt Russell", character: "Mr. Nobody" },
    { name: "Michael Rooker", character: "Buddy" },
    { name: "Luke Evans", character: "Owen Shaw" },
    { name: "Jason Tobin", character: "Jakob Toretto" },
    { name: "Shad Moss", character: "Twinkie" },
    { name: "Miranda Otto", character: "Samantha Hobbs" }
  ];

  // Generate a random index to pick a character
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : `@${m.sender.split('@')[0]}`;
  
  await m.reply(`${target} Du bist jetzt als *${randomCharacter.character}* bekannt! 🎬\n Schauspieler: *${randomCharacter.name}* 🎥`);
};

handler.command = ['fastandfurious', 'whoareyou', 'fandfactor'];
handler.help = ['fastandfurious [@user]'];
handler.tags = ['fun'];

module.exports = handler;