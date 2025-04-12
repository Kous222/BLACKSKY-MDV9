var name = global.nameowner;
var numberowner = global.numberowner;
var gmail = global.mail;
const {
  default: makeWASocket,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  herunterladenContentFromMessage,
  herunterladenHistory,
  proto,
  getMessage,
  generateWAMessageContent,
  prepareWAMessageMedia
} = require("@adiwajshing/baileys");

var handler = async (m, { conn }) => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN: ${name}
Gegenstand.ORG: Bot-Ersteller
item1.TEL;waid=${numberowner}:${numberowner}@s.whatsapp.net
item1.X-ABLabel:Number des Bot-Erstellers
item2.EMAIL;type=INTERNET:${gmail}
item2.X-ABLabel:E-Mail des Besitzers
item3.ADR:;;🇮🇩 Indonesia;;;;
item3.X-ABADR:ac
item4.EMAIL;type=INTERNET:support@tioprm.eu.org
item4.X-ABLabel:E-Mail des Entwicklers
item3.ADR:;;🇮🇩 Indonesia;;;;
item3.X-ABADR:ac 
item5.url:${instagram}
item5.X-ABLabel:Webseite
END:VCARD`;

  const sentMsg = await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: 'CN',
        contacts: [{ vcard }]
      }
    }
  );
  
  // Corrected method to send a reply
  await conn.reply(m.chat, "Das ist die Nummer des Bot-Besitzers", sentMsg);
};

handler.command = handler.help = ['owner', 'creator', 'besitzer', 'ersteller'];
handler.tags = ['info'];
handler.limit = true;

module.exports = handler;
