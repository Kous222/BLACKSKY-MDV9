const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');

const tmpdir = os.tmpdir();

function tmpFilePath(ext) {
  return path.join(tmpdir, `temp_${Date.now()}${ext}`);
}

async function prepareImage(buffer) {
  // Bild auf 512x512, quadratisch, transparenten Hintergrund skalieren
  return await sharp(buffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .webp()
    .toBuffer();
}

async function videoBufferToWebp(buffer) {
  return new Promise((resolve, reject) => {
    const input = tmpFilePath('.mp4');
    const output = tmpFilePath('.webp');

    fs.writeFileSync(input, buffer);

    ffmpeg(input)
      .inputOptions(['-t', '6']) // max 6 Sekunden
      .outputOptions([
        '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,fps=15',
        '-vcodec', 'libwebp',
        '-lossless', '0',
        '-q:v', '50',
        '-preset', 'default',
        '-an',
        '-loop', '0',
        '-ss', '0',
        '-t', '6',
        '-fps_mode', 'cfr'
      ])
      .toFormat('webp')
      .save(output)
      .on('end', () => {
        const data = fs.readFileSync(output);
        fs.unlinkSync(input);
        fs.unlinkSync(output);
        resolve(data);
      })
      .on('error', (err) => {
        if (fs.existsSync(input)) fs.unlinkSync(input);
        if (fs.existsSync(output)) fs.unlinkSync(output);
        reject(err);
      });
  });
}

let handler = async (m, { conn, command, usedPrefix }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (/image|picture|photo/i.test(mime)) {
    // Bild → Sticker
    m.reply('Erstelle Sticker aus Bild...');
    try {
      const buffer = await q.download();
      const prepared = await prepareImage(buffer);
      await conn.sendMessage(m.chat, { sticker: prepared }, { quoted: m });
    } catch (e) {
      console.error(e);
      m.reply('Fehler beim Erstellen des Stickers aus Bild.');
    }
  } else if (/video|gif/i.test(mime)) {
    // Video/GIF → Sticker
    const duration = (q.msg || q).seconds || 0;
    if (duration > 6) return m.reply('Video/GIF darf maximal 6 Sekunden lang sein.');

    m.reply('Verarbeite Video/GIF zu Sticker...');
    try {
      const buffer = await q.download();
      const webpBuffer = await videoBufferToWebp(buffer);
      await conn.sendMessage(m.chat, { sticker: webpBuffer }, { quoted: m });
    } catch (e) {
      console.error(e);
      m.reply('Fehler beim Erstellen des Stickers aus Video/GIF.');
    }
  } else {
    return m.reply(`Bitte sende ein Bild, Video oder GIF mit dem Befehl ${usedPrefix + command}`);
  }
};

handler.help = ['sticker', 'aufkleber', 's'];
handler.tags = ['sticker'];
handler.command = /^(s(ticker)?|aufkleber)$/i;
handler.limit = true;

module.exports = handler;
