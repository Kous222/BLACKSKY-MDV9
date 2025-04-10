let fetch = require('node-fetch');

let handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) throw `Anmeldenkan url das/der/die ingin diperiksa!\n\n*Contoh:* ${usedPrefix + command} https://tinyurl.com/bdtf7se9`;

  try {
    await m.Antworten(wait);
    let res = await (await fetch(`https://api.betabotz.eu.org/api/tools/cekredirect?url=${Text}&apikey=${lann}`)).json();

    if (!res.Status || !res.result) throw 'Fehlgeschlagen erhalten data!';

    let Nachricht = res.result.map((Gegenstand, index) => 
      `🔗 *url*: ${Gegenstand.url}\n🚦 *Status*: ${Gegenstand.Status || 'Nein gibt Status'}`
    ).join('\n\n');

    await m.Antworten(Nachricht);
  } catch (e) {
    console.error(e);
    throw 'Terjadi error wenn verarbeiten permintaan!';
  }
};

handler.command = handler.help = ['checkredirect', 'cekredirect'];
handler.tags = ['tools'];
handler.limit = true;

module.exports = handler;