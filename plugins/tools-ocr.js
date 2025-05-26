const hochladenImage = require('../lib/hochladenImage');
const ocrapi = require('ocr-space-api-wrapper');

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  if (!mime) throw `❗ *Bitte antworte auf ein Bild mit dem Befehl .ocr*`;
  if (!/^image\/(jpe?g|png)$/i.test(mime)) throw `⚠️ *Bildformat ${mime} wird nicht unterstützt!*\nUnterstützt: JPEG oder PNG`;

  try {
    let img = await q.download?.();
    if (!img) throw 'Bild konnte nicht heruntergeladen werden.';

    let url = await hochladenImage(img);
    let result = await ocrapi.ocrSpace(url);

    let text = result?.ParsedResults?.[0]?.ParsedText?.trim();
    if (!text) throw 'Kein Text im Bild erkannt.';

    await m.reply(`📝 *Erkannter Text:*\n\n${text}`);
  } catch (e) {
    console.error('[OCR FEHLER]', e);
    await m.reply('❌ *Fehler bei der Texterkennung. Stelle sicher, dass du ein klares Bild gesendet hast.*');
  }
};

handler.help = ['ocr', 'texterkennung', 'textlesen', 'totext'];
handler.tags = ['tools'];
handler.command = /^ocr|texterkennung|textlesen|totext$/i;
handler.limit = true;

module.exports = handler;
