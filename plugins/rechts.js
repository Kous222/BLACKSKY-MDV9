const sharp = require('sharp');
const ocr = require('ocr-space-api-wrapper');

const textBlacklist = [
  "88", "14/88", "sieg heil", "heil hitler", "hh", "adolf hitler",
  "white power", "ns-zone", "arische brüder", "arischer stolz",
  "blut und ehre", "nazi", "hitlergruß", "nationalsozialismus",
  "third reich", "volk ohne raum", "judenfrei", "gas die juden",
  "six million wasn't enough", "arbeit macht frei", "widerstand jetzt",
  "kampf der rassen", "hammerskins", "krieg dem system", "keine toleranz",
  "white pride", "gas the jews", "1488", "blood and honour", "14 words",
  "six million lies",

  // Additional words and phrases:
  "racist", "racism", "fascist", "fascism", "white supremacy",
  "heil", "heilhitler", "hitlerjugend", "hitler youth",
  "skinhead", "skrewdriver", "klan", "kkk", "klan", "klan member",
  "blood and soil", "blood & soil", "wotan", "odinism", "asatru",
  "white nationalist", "white nationalism", "racial purity",
  "aryan race", "aryan supremacy", "neo nazi", "neo-nazi",
  "national socialist", "national socialism",
  "racist propaganda", "hate speech", "hate group",
  "anti semitic", "anti-semitic", "holocaust denial",
  "white genocide", "racial cleansing", "ethnic cleansing",
  "holocaust hoax", "racial hatred", "ethno state",
  "racial segregation", "nuremberg laws", "reich", "reichsadler",
  "stahlhelm", "schutzstaffel", "ss", "gestapo",
  "brownshirts", "braunhemden", "bund deutscher maedel",
  "bund", "german reich", "wehrmacht", "reichskriegsflagge",
  "reichskriegsflagge", "völkisch", "völkisch movement",
  "jew hater", "jew hatred", "kike", "yid", "dirty jew",
  "gas chambers", "final solution", "genocide",
  "death camp", "concentration camp", "auschwitz", "buchenwald",
  "mautthausen", "treblinka", "sobibor", "belzec", "chelmno",
  "mass murder", "hate crime", "racial slur", "hate symbol",
  "antisemitism", "neo-nazism"
];

// Create very flexible regex allowing optional spaces/special chars between letters
function createFlexibleRegex(text) {
  const escaped = text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  // Match each letter optionally separated by any non-alphanumeric character (including spaces)
  const pattern = escaped
    .split('')
    .map(ch => {
      if (/[a-z0-9]/i.test(ch)) {
        return ch + '[^a-z0-9]*';  // allow any chars between letters
      } else {
        return '\\' + ch + '[^a-z0-9]*';
      }
    })
    .join('');
  return new RegExp(pattern, 'i');
}

const blacklistRegexes = textBlacklist.map(createFlexibleRegex);

async function extractTextFromImage(buffer) {
  try {
    const resized = await sharp(buffer)
      .resize({ width: 800 })
      .greyscale()
      .normalize()
      .toBuffer();

    const result = await ocr.parseImageFromBuffer(resized, {
      apiKey: 'K89631632388957', // Your API key here
      language: 'eng,de' // English + German
    });

    let text = result.ParsedResults?.[0]?.ParsedText || '';
    
    // Normalize text: lowercase, remove special chars except spaces
    text = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    return '';
  }
}

let handler = async (m, { conn }) => {
  try {
    if (!m.isGroup) return;
    if (!conn.user?.admin) return;  // bot must be admin to delete and remove
    const chatSettings = global.db.data.chats[m.chat] || {};
    if (!chatSettings.antirechts) return;

    const sender = m.sender || m.participant;
    let textToCheck = '';

    // Check if normal text message
    if (m.message?.conversation || m.message?.extendedTextMessage) {
      textToCheck = (m.message.conversation || m.message.extendedTextMessage?.text || '').toLowerCase();
    }

    // If no text but image or sticker, extract text via OCR
    if (!textToCheck && (m.message?.imageMessage || m.message?.stickerMessage)) {
      try {
        const mediaBuffer = await conn.downloadMediaMessage(m);
        // Optional: convert sticker/webp to png before OCR (improves recognition)
        const pngBuffer = await sharp(mediaBuffer).png().toBuffer();
        textToCheck = await extractTextFromImage(pngBuffer);
        console.log('[AntiRechts] OCR extracted text:', textToCheck);
      } catch (err) {
        console.log('[AntiRechts] Error extracting text from media:', err);
      }
    }

    if (!textToCheck) return;

    // Check for blacklisted content using flexible regex
    const matched = blacklistRegexes.filter(regex => regex.test(textToCheck));

    if (matched.length > 0) {
      const reasonText = matched.join(', ');
      console.log(`[AntiRechts] Forbidden content detected in chat ${m.chat} by ${sender}`);
      console.log('Matched phrases:', matched);

      // Inform group with clear reason
      await conn.sendMessage(
        m.chat,
        { text: `🚫 *Verbotener Inhalt erkannt!*\nDer Teilnehmer wurde entfernt, weil er verbotene Begriffe verwendet hat: ${reasonText}` },
        { quoted: m }
      );

      try {
        await conn.deleteMessage(m.chat, m.key);
      } catch (e) {
        console.log('Failed to delete message:', e.message);
      }

      try {
        await conn.groupParticipantsUpdate(m.chat, [sender], 'remove');
      } catch (e) {
        console.log('Failed to remove participant:', e.message);
      }
    }
  } catch (e) {
    console.error('AntiRechts handler error:', e);
  }
};

handler.customPrefix = false;
handler.command = () => false; // run on every message
handler.group = true;
handler.botAdmin = true;
handler.disabled = false;
handler.tags = ['moderation'];
handler.help = ['antirechts (automatisch, im Hintergrund)'];

module.exports = handler;
