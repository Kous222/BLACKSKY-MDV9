let handler = async (m, { conn, usedPrefix, command, participants }) => {
  // Ensure there are at least 3 participants in the group
  if (participants.length < 3) {
    return m.reply('❌ Es sind nicht genügend Mitglieder in der Gruppe, um ein Sandwich zu erstellen. Mindestens 3 Mitglieder werden benötigt.');
  }

  // Randomly pick users for the sandwich positions
  const topUser = participants[Math.floor(Math.random() * participants.length)].jid;
  const middleUser = participants[Math.floor(Math.random() * participants.length)].jid;
  const bottomUser = participants[Math.floor(Math.random() * participants.length)].jid;

  // Ensure the users are not the same
  while (topUser === middleUser || middleUser === bottomUser || topUser === bottomUser) {
    topUser = participants[Math.floor(Math.random() * participants.length)].jid;
    middleUser = participants[Math.floor(Math.random() * participants.length)].jid;
    bottomUser = participants[Math.floor(Math.random() * participants.length)].jid;
  }

  // Prepare the sandwich message
  let sandwichMessage = `🥪 *Das Sandwich der Gruppe* 🥪\n\n`;
  sandwichMessage += `◦ *Oben*: @${topUser.split('@')[0]}\n`;
  sandwichMessage += `◦ *Mitte*: @${middleUser.split('@')[0]}\n`;
  sandwichMessage += `◦ *Unten*: @${bottomUser.split('@')[0]}\n`;
  sandwichMessage += `Genießt das Sandwich!`;

  // Send the message tagging the users
  await conn.sendMessage(m.chat, {
    text: sandwichMessage,
    mentions: [topUser, middleUser, bottomUser],
  }, { quoted: m });
};

handler.help = ['sandwich'];
handler.tags = ['fun'];
handler.command = /^(sandwich)$/i;
handler.group = true;

module.exports = handler;
