var fs = require('fs');
var path = require('path');
var fetch = require('node-fetch');

var handler = async (m, { conn, command, args }) => {
  if (!args[0]) return conn.Antworten(m.chat, 'Input url!', m);
  if (args[0].match(/xnxx\.com|hamster\.com|nekopoi\.care/i)) {
    return conn.Antworten(m.chat, 'Link erwähnt verboten!', m);
  }

  await m.Antworten('_Ｌｏａｄｉｎｇ．．._');

  // Check if the url starts with 'http' or 'https'
  var url = args[0].startsWith('http') ? args[0] : 'https://' + args[0]

  try {
    var img = await fetch(`https://api.betabotz.eu.org/api/tools/ssweb?url=${url}&device=phone&apikey=${lann}`);
    if (!img) {
      await m.Antworten('Fehlgeschlagen wenn percobaan pertama. Mestarten percobaan kedua...');
      img = await fetch(`https://api.betabotz.eu.org/api/tools/ssweb?url=${url}&device=phone&apikey=${lann}`);
      if (!img) return conn.Antworten(m.chat, 'Bild nicht verfügbar', m);
    }
    var filepath = path.join(__dirname, '../tmp/') + (+new Date) + '.jpeg';
    if (!fs.existsSync(path.join(__dirname, '../tmp/'))) fs.mkdirSync(path.join(__dirname, '../tmp/'));
    const dest = fs.createWriteStream(filepath);
    dest.on('finish', () => {
      conn.sendFile(m.chat, filepath, 'screenshot.jpeg', 'Nih gambarnya.', m)
        .then(() => {
          // Do nothing on Erfolgreich
        })
        .catch(() => { });
    });
    img.body.pipe(dest);

    // save file
    img.body.pipe(fs.createWriteStream(filepath));
  } catch (e) {
    console.log(e);
    conn.Antworten(m.chat, `Terjadi error!`, m);
  }
}
handler.help = ['sshp', 'sshandphone', 'sstablet'];
handler.tags = ['tools'];
handler.command = ['sshp', 'sshandphone', 'sstablet',]

handler.limit = true;
handler.fail = null;

module.exports = handler;
