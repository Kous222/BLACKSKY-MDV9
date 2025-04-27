let handler = async (m, { text, conn }) => {
  const characters = [
    { name: "Andrew Lincoln", character: "Rick Grimes" },
    { name: "Norman Reedus", character: "Daryl Dixon" },
    { name: "Melissa McBride", character: "Carol Peletier" },
    { name: "Steven Yeun", character: "Glenn Rhee" },
    { name: "Lauren Cohan", character: "Maggie Greene" },
    { name: "Danai Gurira", character: "Michonne" },
    { name: "Chandler Riggs", character: "Carl Grimes" },
    { name: "Michael Cudlitz", character: "Abraham Ford" },
    { name: "Josh McDermitt", character: "Eugene Porter" },
    { name: "Christian Serratos", character: "Rosita Espinosa" },
    { name: "Sonequa Martin-Green", character: "Sasha Williams" },
    { name: "Lennie James", character: "Morgan Jones" },
    { name: "Jeffrey Dean Morgan", character: "Negan" },
    { name: "Khary Payton", character: "Ezekiel" },
    { name: "Avi Nash", character: "Siddiq" },
    { name: "Cudlitz", character: "Abraham Ford" },
    { name: "Jeff Perry", character: "Bob Stookey" },
    { name: "Jon Bernthal", character: "Shane Walsh" },
    { name: "Tovah Feldshuh", character: "Deanna Monroe" },
    { name: "David Morrissey", character: "The Governor" },
    { name: "Michael Rooker", character: "Merle Dixon" },
    { name: "Sarah Wayne Callies", character: "Lori Grimes" },
    { name: "Dallas Roberts", character: "Milton Mamet" },
    { name: "Jeff Perry", character: "Bob Stookey" },
    { name: "Lori Holden", character: "Andrea" },
    { name: "Pollyanna McIntosh", character: "Jadis / Anne" },
    { name: "Tom Payne", character: "Paul 'Jesus' Rovia" },
    { name: "Eleanor Matsuura", character: "Yumiko" },
    { name: "Cooper Andrews", character: "Jerry" },
    { name: "Katelyn Nacon", character: "Enid" },
    { name: "Austin Nichols", character: "Spencer Monroe" }
  ];

  // Generate a random index to pick a character
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : `@${m.sender.split('@')[0]}`;
  
  await m.reply(`${target} Du bist jetzt als *${randomCharacter.character}* bekannt! 🎬\n Schauspieler: *${randomCharacter.name}* 🎥`);
};

handler.command = ['walkingdead', 'whoareyou', 'wdactor'];
handler.help = ['walkingdead [@user]'];
handler.tags = ['fun'];

module.exports = handler;