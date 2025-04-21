// joinrequests.js

let joinRequests = global.joinRequests = global.joinRequests || [];

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'joinrequest') {
    if (!text || !text.includes('whatsapp.com')) {
      throw `Bitte sende einen gültigen Gruppenlink.\nBeispiel:\n${usedPrefix}joinrequest https://chat.whatsapp.com/ABCDEFG123456`;
    }

    joinRequests.push({ link: text.trim(), sender: m.sender });
    await m.reply('✅ Deine Beitrittsanfrage wurde gespeichert. Ein Admin kann den Bot mit `.acceptjoinrequest [Zahl]` hinzufügen.');

    // Sende Bestätigung an Supportgruppe
    const supportGroupId = '120363399996195320@g.us';
    await conn.sendMessage(supportGroupId, {
      text: `📩 Neue Join-Anfrage:

🔗 Gruppenlink: ${text}
👤 Von: @${m.sender.split('@')[0]}

Antworte mit: *.acceptjoinrequest ${joinRequests.length}* um beizutreten.`,
      mentions: [m.sender],
    });

  } else if (command === 'acceptjoinrequest') {
    let index = parseInt(text) - 1;
    if (isNaN(index) || index < 0 || index >= joinRequests.length) {
      throw `❌ Ungültiger Index. Benutze: ${usedPrefix}acceptjoinrequest [Nummer]`;
    }

    let { link, sender } = joinRequests[index];
    joinRequests.splice(index, 1); // Entferne nach dem Beitritt

    let code = link.trim().split('/').pop();
    await conn.groupAcceptInvite(code);

    await m.reply('✅ Bot ist der Gruppe beigetreten.');

    // Optional: Nachricht an den Anfragenden
    await conn.sendMessage(sender, {
      text: `✅ Der Bot ist deiner Gruppe beigetreten!\nDanke für deine Anfrage.`,
    });
  }
};

handler.help = ['joinrequest <link>', 'acceptjoinrequest <nummer>'];
handler.tags = ['owner'];
handler.command = ['joinrequest', 'acceptjoinrequest'];
handler.rowner = true;

module.exports = handler;
