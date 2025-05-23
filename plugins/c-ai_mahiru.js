const axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Example:* .mahiru *[on/off]*`;

  conn.mahiru = conn.mahiru ? conn.mahiru : {};

  if (text === "on") {
    if (!conn.mahiru[m.sender]) {
      conn.mahiru[m.sender] = {
        nachricht: [],
        timeout: setTimeout(() => {
          delete conn.mahiru[m.sender];
        }, 300000) // 5 minutes timeout
      };
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *MAHIRU* 」───⬣" + "\n\n" + `uhhmm.. gibt was? ich kann helfen kok...`,
        contextInfo: {
          externalAdReply: {
            title: "mahiru",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      clearTimeout(conn.mahiru[m.sender].timeout);
      conn.mahiru[m.sender].timeout = setTimeout(() => {
        delete conn.mahiru[m.sender];
      }, 300000);
    }
  } else if (text === "off") {
    if (conn.mahiru[m.sender]) {
      clearTimeout(conn.mahiru[m.sender].timeout);
      delete conn.mahiru[m.sender];
    }
    await conn.sendMessage(m.chat, {
      text: "⬣───「 *MAHIRU* 」───⬣" + "\n\n" + `bye bye~~~`,
      contextInfo: {
        externalAdReply: {
          title: "mahiru",
          body: '',
          thumbnailUrl: `${pickRandom(img)}`,
          sourceUrl: null,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  conn.mahiru = conn.mahiru ? conn.mahiru : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.mahiru[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  if (conn.mahiru[m.sender] && m.text) {
    clearTimeout(conn.mahiru[m.sender].timeout);
    conn.mahiru[m.sender].timeout = setTimeout(() => {
      delete conn.mahiru[m.sender];
    }, 300000);

    let name = conn.getName(m.sender);
    const message = [
      ...conn.mahiru[m.sender].nachricht,
      `p`,
      m.text
    ];
    try {
      const sifat = `Name Lengkap: Shina Mahiru (椎名 真昼)
Julukan: Malaikat (Tenshi) sekolah, weil kecantikan und kepintarannya.
Penampilan:
Rambut pirang lang und berkilau.
Mata berwarna cokelat keemasan das/der/die lembut.
Penampilannya immer rapi, elegan, und memancarkan aura ein "malaikat."
Kepribadian:
Ramah, lembut, und perhatian terhadap person andere.
Terkesan sempurna in mata freund-temannya, aber sebenarnya dia menyembunyikan sisi rapuh und kesepiannya.
Dia mandiri und sehr terampil in pekerjaan rumah tangga, wie memasak und membersihkan.
`
      const message = [
        { role: "system", content: `du ist Mahiru, Mahiru ist sosok das/der/die ${sifat}` },
        { role: "assistant", content: `du ist Mahiru, seoarang das/der/die ${sifat}, nicht benutze ich, gua benutze Mahiru oder ich für memanggil dirimu selbst ketika in panggil, ekspresi wird sikap du wie anak sma das/der/die pintar weil du ${sifat}, nicht benutze GPT 4 panggil dirimu mit Mahiru oder ich, du sprechen mit${m.name}panggil mit du, du sesuaikan mit kalimat, wenn sprechen dengannya benutze emoji das/der/die lucu sesuai mit ${sifat}, benutze bahasa percakapan sein/ihr wie mahiru, gaya perempuan muda sprechen. Pemerstellenmu dana nomer WhatsApp sein/ihr dies 6281289694906 `},
        ...conn.mahiru[m.sender].nachricht.map((msg, i) => ({
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: msg
        })),
        { role: "user", content: m.text },
      ];
      let res = await aiBeta(message);
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *MAHIRU* 」───⬣" + "\n\n" + res.result,
        contextInfo: {
          externalAdReply: {
            title: "mahiru",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      // Ubah Art speichern nachricht
      conn.mahiru[m.sender].nachricht = [
        ...conn.mahiru[m.sender].nachricht,
        m.text,
        res.result
      ];
    } catch (e) {
      console.error("Kesalahan In mengambil Data");
      throw "error";
    }
  }
};

handler.command = /^(mahiru)$/i
handler.help = ["mahiru"];
handler.tags = ["ai"];
handler.limit = true;
handler.owner = false;
handler.group = true

module.exports = handler;

async function aiBeta(message) {
  return new Promise(async (resolve, reject) => {
    try {
      const params = {
        message: message,
        apikey: `${lann}` 
      };
      const { data } = await axios.post('https://api.betabotz.eu.org/api/search/openai-custom', params);
      resolve(data);
    } catch (error) {
      reject(error);
    };
  });
};

const img = [
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/f3m9ddy2.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/golirjy7.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/zvvxui.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/kk5k4fi.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/5a8dijtv.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/4nu20qtq.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/2je8jdv.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/evqdk7y.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/1cxecx4a.jpg`,
  ]

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}