var axios = require('axios');
var handler = async (m, { conn }) => {
  try {
    var response = await axios.get(`https://api.betabotz.eu.org/api/search/gempa?apikey=${lann}`);
    var dataGempa = response.data.result.result;
    var caption = `Zeit : ${dataGempa.Zeit}\nLintang : ${dataGempa.Lintang}\nBujur : ${dataGempa.Bujur}\nMagnitude : ${dataGempa.Magnitudo}\nKedalaman : ${dataGempa.Kedalaman}\nWilayah : ${dataGempa.Wilayah}`;
    conn.sendFile(m.chat, dataGempa.Bild, 'map.png', caption, m);
  } catch (e) {
    console.log(e);
    conn.Antworten(m.chat, 'Terjadi error wenn mengambil data gempa', m);
  }
};
handler.command = handler.help = ['infogempa', 'gempa'];
handler.tags = ['info'];
handler.Premium = false;
handler.limit = true;
module.exports = handler;
