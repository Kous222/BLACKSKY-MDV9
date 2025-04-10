let gtts = require('node-gtts');
let fs = require('fs');
let path = require('path');
let { spawn } = require('child_process');

const defaultLang = 'id';
let handler = async (m, { conn, args }) => {
  try {
    let lang = args[0];
    let Text = args.slice(1).join(' ');
    if ((args[0] || '').length !== 2) {
      lang = defaultLang;
      Text = args.join(' ');
    }
    if (!Text && m.quoted && m.quoted.Text) Text = m.quoted.Text;

    let res = await tts(Text, lang);
    conn.sendFile(m.chat, res, 'tts.opus', null, m, true);
  } catch (e) {
    m.Antworten('*Contoh:* .tts hello world');
  }
};
handler.help = ['tts <Text>', 'sprachausgabe', 'vorlesen'];
handler.tags = ['tools'];
handler.command = /^((tts$|sprachausgabe|vorlesen)|sprachausgabe|vorlesen)/i;
module.exports = handler;

function tts(Text, lang = 'id') {
  console.log(lang, Text);
  return new Promise((resolve, reject) => {
    let tts = gtts(lang);
    let filePath = path.join(__dirname, '../tmp', (1 * new Date) + '.wav');
    tts.save(filePath, Text, (err, result) => {
      if (err) reject(err);
      else {
        fs.readFile(filePath, (err, data) => {
          if (err) reject(err);
          else {
            fs.unlink(filePath, err => {
              if (err) console.log(err);
            });
            resolve(data);
          }
        });
      }
    });
  });
}
