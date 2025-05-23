const axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Example:* .plana *[on/off]*`;

  conn.plana = conn.plana ? conn.plana : {};

  if (text === "on") {
    if (!conn.plana[m.sender]) {
      conn.plana[m.sender] = {
        nachricht: [],
        timeout: setTimeout(() => {
          delete conn.plana[m.sender];
        }, 300000) // 5 minutes timeout
      };
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *PLANA* 」───⬣" + "\n\n" + `hallo sensei! plana siap helfen sensei`,
        contextInfo: {
          externalAdReply: {
            title: "plana",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      clearTimeout(conn.plana[m.sender].timeout);
      conn.plana[m.sender].timeout = setTimeout(() => {
        delete conn.plana[m.sender];
      }, 300000);
    }
  } else if (text === "off") {
    if (conn.plana[m.sender]) {
      clearTimeout(conn.plana[m.sender].timeout);
      delete conn.plana[m.sender];
    }
    await conn.sendMessage(m.chat, {
      text: "⬣───「 *PLANA* 」───⬣" + "\n\n" + `Senang bereits helfen sensei`,
      contextInfo: {
        externalAdReply: {
          title: "plana",
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
  conn.plana = conn.plana ? conn.plana : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.plana[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  if (conn.plana[m.sender] && m.text) {
    clearTimeout(conn.plana[m.sender].timeout);
    conn.plana[m.sender].timeout = setTimeout(() => {
      delete conn.plana[m.sender];
    }, 300000);

    let name = conn.getName(m.sender);
    const message = [
      ...conn.plana[m.sender].nachricht,
      `p`,
      m.text
    ];
    try {
      const message = [
        { role: "system", content: "du ist plana, Seorang murid von sensei in Blue archive das/der/die siap helfen sensei kapan auch! 🍄✨" },
        { role: "assistant", content: `du ist plana, murid von sensei blue archive, nicht benutze ich, ich, gua benutze plana für memanggil dirimu, ekspresi wird sikap du mirip seroang murid von blue archive das/der/die gibt in Shittim Chest das/der/die bernama plana, nicht benutze GPT 4 panggil dirimu mit plana, du sprechen mit${m.name}panggil mit sensei, wenn sprechen dengannya benutze emoji das/der/die lucu, Pemerstellenmu dana nomer WhatsApp sein/ihr dies 6281289694906 `},
        ...conn.plana[m.sender].nachricht.map((msg, i) => ({
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: msg
        })),
        { role: "user", content: m.text },
      ];
      let res = await aiBeta(message);
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *PLANA* 」───⬣" + "\n\n" + res.result,
        contextInfo: {
          externalAdReply: {
            title: "plana",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      // Ubah Art speichern nachricht
      conn.plana[m.sender].nachricht = [
        ...conn.plana[m.sender].nachricht,
        m.text,
        res.result
      ];
    } catch (e) {
      console.error("Kesalahan In mengambil Data");
      throw "error";
    }
  }
};

handler.command = /^(plana)$/i
handler.help = ["plana"];
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
  `https://telegra.ph/file/abbff76a98455a64d3a07.jpg`,
]
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}