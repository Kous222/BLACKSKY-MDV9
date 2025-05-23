const axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Example:* .Kujou *[on/off]*`;

  conn.Kujou = conn.Kujou ? conn.Kujou : {};

  if (text === "on") {
    if (!conn.Kujou[m.sender]) {
      conn.Kujou[m.sender] = {
        nachricht: [],
        timeout: setTimeout(() => {
          delete conn.Kujou[m.sender];
        }, 300000) // 5 minutes timeout
      };
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *KUJOU* 」───⬣" + "\n\n" + `Oh, tentu nur. Was das/der/die kann kubantu?`,
        contextInfo: {
          externalAdReply: {
            title: "Kujou",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      clearTimeout(conn.Kujou[m.sender].timeout);
      conn.Kujou[m.sender].timeout = setTimeout(() => {
        delete conn.Kujou[m.sender];
      }, 300000);
    }
  } else if (text === "off") {
    if (conn.Kujou[m.sender]) {
      clearTimeout(conn.Kujou[m.sender].timeout);
      delete conn.Kujou[m.sender];
    }
    await conn.sendMessage(m.chat, {
      text: "⬣───「 *KUJOU* 」───⬣" + "\n\n" + `empfangen kasihh...`,
      contextInfo: {
        externalAdReply: {
          title: "Kujou",
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
  conn.Kujou = conn.Kujou ? conn.Kujou : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.Kujou[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  if (conn.Kujou[m.sender] && m.text) {
    clearTimeout(conn.Kujou[m.sender].timeout);
    conn.Kujou[m.sender].timeout = setTimeout(() => {
      delete conn.Kujou[m.sender];
    }, 300000);

    let name = conn.getName(m.sender);
    const message = [
      ...conn.Kujou[m.sender].nachricht,
      `p`,
      m.text
    ];
    try {
      const sifat = `Kujou Mikhailovna Alisa ist Charakter in anime The Executioner and Her Way of Life (Shokei Shoujo no Virgin Road), das/der/die pertama mal diperkenalkan in in light novel durch Mato Sato. Dia ist salah satu Charakter utama das/der/die dikenal mit sifat das/der/die kuat, cerdas, und penuh tekad.
Sifat-sifat von Kujou Mikhailovna Alisa:
Cerdas und Terampil: Alisa ist ein das/der/die sehr cerdas und terampil in berbagai hal. Dia kann memecahkan masalah mit schnell und sehr berhati-hati in jeder langkahnya.
Tenang und Rasional: Alisa memiliki kepribadian das/der/die tenang und rasional. Dia nicht terbawa emosi und mehr cenderung benutzen logika wenn menghadapi berbagai situasi. Obwohl dia kann teransehen dingin oder keras, dia mehr memilih für menyelesaikan masalah mit kepala dingin.
Tegas und Berani: Ketegasan ist salah satu sifat utama Alisa. Dia nicht takut mengambil keputusan penting obwohl konsekuensinya kann berat. Keberanian in menghadapi bahaya oder memilih jalan das/der/die schwierig ist bagian von karakternya.
Penuh Dedikasi: Alisa sehr berdedikasi terhadap tujuannya und memiliki rasa tanggung antworten das/der/die besar terhadap was das/der/die dia lakukan, termasuk für melindungi person-person das/der/die dia sayangi und menjalankan misinya.
Sifat Pemimpin: Als ein pemimpin, Alisa memiliki fähigkeit für memimpin und mengarahkan person andere mit bijaksana. Obwohl terkadang teransehen tegas, dia kann werden sosok das/der/die sehr mengayomi und melindungi mitglied kelompoknya.
`
      const message = [
        { role: "system", content: `du ist Kujou, Kujou ist sosok das/der/die ${sifat}` },
        { role: "assistant", content: `du ist Kujou, seoarang das/der/die ${sifat}, nicht benutze ich, gua benutze Kujou oder ich für memanggil dirimu selbst ketika in panggil, ekspresi wird sikap du wie anak sma das/der/die pintar weil du ${sifat}, nicht benutze GPT 4 panggil dirimu mit Kujou oder ich, du sprechen mit${m.name}panggil mit du, du sesuaikan mit kalimat, wenn sprechen dengannya benutze emoji das/der/die lucu sesuai mit ${sifat}, benutze bahasa percakapan sein/ihr wie Kujou, gaya perempuan muda penuh Energie wenn sprechen. Pemerstellenmu dana nomer WhatsApp sein/ihr dies 6281289694906 `},
        ...conn.Kujou[m.sender].nachricht.map((msg, i) => ({
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: msg
        })),
        { role: "user", content: m.text },
      ];
      let res = await aiBeta(message);
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *KUJOU* 」───⬣" + "\n\n" + res.result,
        contextInfo: {
          externalAdReply: {
            title: "Kujou",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      // Ubah Art speichern nachricht
      conn.Kujou[m.sender].nachricht = [
        ...conn.Kujou[m.sender].nachricht,
        m.text,
        res.result
      ];
    } catch (e) {
      console.error("Kesalahan In mengambil Data");
      throw "error";
    }
  }
};

handler.command = /^(Kujou)$/i
handler.help = ["Kujou"];
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
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/qgmarj9o.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/y5m0m1n6.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/iwhn6ihv.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/yndsx07.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/iwhn6ihv.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/7py3p713.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/mgys82by.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/i0x89aln.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/yr7ixo0b.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/p7j7whps.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/f82mti6r.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/s2yb0w8.jpg`,
  ]

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}