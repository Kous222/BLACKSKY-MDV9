let handler = async (m, { text, conn }) => {
  const target = text ? `@${text.replace(/[^0-9]/g, '')}` : '';
  const sender = `@${m.sender.split('@')[0]}`;

  if (!target) {
    await m.reply('❌ *Wen willst du abweisen? Bitte gib eine Nummer oder @user an!*');
    return;
  }

  const korbMessages = [
    `${sender} schaut ${target} tief in die Augen... und gibt einen Korb. 🧺💔`,
    `${sender} sagt zu ${target}: „Sorry, du bist einfach nicht mein Typ.“ ❌`,
    `${sender} gibt ${target} einen epischen Korb mit Rückwärtssalto. 🧺🤸‍♂️`,
    `${sender} lässt ${target} abblitzen wie ein Profi. 💅🧊`,
    `${sender} ruft laut: „Nein danke, ${target}!“ und verschwindet im Nebel. 🧺🌫️`,
    `${sender} schreibt ${target} auf die Friendzone-Liste. 📜✋`,
  ];

  const message = korbMessages[Math.floor(Math.random() * korbMessages.length)];

  await conn.sendMessage(m.chat, {
    text: message,
    mentions: [m.sender, `${text.replace(/[^0-9]/g, '')}@s.whatsapp.net`]
  }, { quoted: m });
};

handler.command = ['korb'];
handler.help = ['korb [@user]'];
handler.tags = ['fun'];

module.exports = handler;