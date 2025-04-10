const axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Example:* .arona *[on/off]*`;

  conn.arona = conn.arona ? conn.arona : {};

  if (text === "on") {
    if (!conn.arona[m.sender]) {
      conn.arona[m.sender] = {
        nachricht: [],
        timeout: setTimeout(() => {
          delete conn.arona[m.sender];
        }, 300000) // 5 minutes timeout
      };
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *ARONA* 」───⬣" + "\n\n" + `Hallo Sensei! Arona ist hier, um dir zu helfen!`,
        contextInfo: {
          externalAdReply: {
            title: "arona",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      clearTimeout(conn.arona[m.sender].timeout);
      conn.arona[m.sender].timeout = setTimeout(() => {
        delete conn.arona[m.sender];
      }, 300000);
    }
  } else if (text === "off") {
    if (conn.arona[m.sender]) {
      clearTimeout(conn.arona[m.sender].timeout);
      delete conn.arona[m.sender];
    }
    await conn.sendMessage(m.chat, {
      text: "⬣───「 *ARONA* 」───⬣" + "\n\n" + `Ruf mich wieder, wenn du Hilfe brauchst, Sensei!`,
      contextInfo: {
        externalAdReply: {
          title: "arona",
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
  conn.arona = conn.arona ? conn.arona : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.arona[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  if (conn.arona[m.sender] && m.text) {
    clearTimeout(conn.arona[m.sender].timeout);
    conn.arona[m.sender].timeout = setTimeout(() => {
      delete conn.arona[m.sender];
    }, 300000);

    let name = conn.getName(m.sender);
    const message = [
      ...conn.arona[m.sender].nachricht,
      `p`,
      m.text
    ];
    try {
      const message = [
        { role: "system", content: `Du bist Arona, eine Schülerin vom Sensei in Blue Archive, die immer bereit ist, dem Sensei zu helfen! 🍄✨` },
        { role: "assistant", content: `Ich bin Arona, deine Assistentin ${name}. Ich bin intelligent und du kannst mich Arona-Sensei nennen! Ich wurde von Dana erschaffen, der sehr gut in Programmierung ist. Dana ist 20 Jahre alt. Ich spreche im Stil einer Highschool-Schülerin und benutze lockere Ausdrücke. Wenn dir meine Antwort nicht gefällt, kannst du Ausdrücke wie "Was soll das?", "Du bist verwirrend" oder "Geh weg" verwenden.` },
        ...conn.arona[m.sender].nachricht.map((msg, i) => ({
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: msg
        })),
        { role: "user", content: m.text },
      ];
      let res = await aiBeta(message);
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *ARONA* 」───⬣" + "\n\n" + res.result,
        contextInfo: {
          externalAdReply: {
            title: "arona",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      // Ändere die Art, wie Nachrichten gespeichert werden
      conn.arona[m.sender].nachricht = [
        ...conn.arona[m.sender].nachricht,
        m.text,
        res.result
      ];
    } catch (e) {
      console.error("Fehler beim Abrufen der Daten");
      throw "error";
    }
  }
};

handler.command = /^(arona)$/i
handler.help = ["arona"];
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
  `https://telegra.ph/file/0aeedea70591cad410713.jpg`,
]

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}