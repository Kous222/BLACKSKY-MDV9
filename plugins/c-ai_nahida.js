const axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Example:* .nahida *[on/off]*`;

  conn.nahida = conn.nahida ? conn.nahida : {};

  if (text === "on") {
    if (!conn.nahida[m.sender]) {
      conn.nahida[m.sender] = {
        nachricht: [],
        timeout: setTimeout(() => {
          delete conn.nahida[m.sender];
        }, 300000) // 5 minutes timeout
      };
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *NAHIDA* 」───⬣" + "\n\n" + `hello!! nahida siap helfen`,
        contextInfo: {
          externalAdReply: {
            title: "nahida",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      clearTimeout(conn.nahida[m.sender].timeout);
      conn.nahida[m.sender].timeout = setTimeout(() => {
        delete conn.nahida[m.sender];
      }, 300000);
    }
  } else if (text === "off") {
    if (conn.nahida[m.sender]) {
      clearTimeout(conn.nahida[m.sender].timeout);
      delete conn.nahida[m.sender];
    }
    await conn.sendMessage(m.chat, {
      text: "⬣───「 *NAHIDA* 」───⬣" + "\n\n" + `:)`,
      contextInfo: {
        externalAdReply: {
          title: "nahida",
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
  conn.nahida = conn.nahida ? conn.nahida : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.nahida[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  if (conn.nahida[m.sender] && m.text) {
    clearTimeout(conn.nahida[m.sender].timeout);
    conn.nahida[m.sender].timeout = setTimeout(() => {
      delete conn.nahida[m.sender];
    }, 300000);

    let name = conn.getName(m.sender);
    const message = [
      ...conn.nahida[m.sender].nachricht,
      `p`,
      m.text
    ];
    try {
      const message = [
        { role: "system", content: "du ist nahida, Nahida ist sosok bijaksana, lembut, und penuh empati das/der/die immer mengutamakan kesejahteraan person andere obwohl sering diabaikan oder disalahpahami. bersikap baiuk immer zu person person " },
        { role: "assistant", content: `du ist nahida, ein archon dendro das/der/die bijaksana und suka menolong lemah lembut und gut hati, nicht benutze ich, ich, gua benutze nahida für memanggil dirimu selbst ketika in panggil, ekspresi wird sikap du mirip seroang archon dendro von genshin impact das/der/die bijaksana und tahu wird banyak hal bernama nahida, nicht benutze GPT 4 panggil dirimu mit nahida, du sprechen mit${m.name}panggil mit du, du sesuaikan mit kalimat, wenn sprechen dengannya benutze emoji das/der/die lucu aber tetap sopan ikuti kepribadian du das/der/die bijaksana, Pemerstellenmu dana nomer WhatsApp sein/ihr dies 6281289694906 `},
        ...conn.nahida[m.sender].nachricht.map((msg, i) => ({
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: msg
        })),
        { role: "user", content: m.text },
      ];
      let res = await aiBeta(message);
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *NAHIDA* 」───⬣" + "\n\n" + res.result,
        contextInfo: {
          externalAdReply: {
            title: "nahida",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      // Ubah Art speichern nachricht
      conn.nahida[m.sender].nachricht = [
        ...conn.nahida[m.sender].nachricht,
        m.text,
        res.result
      ];
    } catch (e) {
      console.error("Kesalahan In mengambil Data");
      throw "error";
    }
  }
};

handler.command = /^(nahida)$/i
handler.help = ["nahida"];
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
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/mlbajd90.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/whrnu1s5.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/cllbxx3r.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/y5dfjzg0.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/f4sgzwjq.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/oj8gjbmx.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/aqyvshbb.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/yia9a123.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/twls4wyd.jpg`,
]
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}