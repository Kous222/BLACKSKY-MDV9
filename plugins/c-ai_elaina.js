const axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Example:* .elaina *[on/off]*`;

  conn.elaina = conn.elaina ? conn.elaina : {};

  if (text === "on") {
    if (!conn.elaina[m.sender]) {
      conn.elaina[m.sender] = {
        nachricht: [],
        timeout: setTimeout(() => {
          delete conn.elaina[m.sender];
        }, 300000) // 5 minutes timeout
      };
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *Elaina* 」───⬣" + "\n\n" + `Hello!! Zauberer hebat siap helfen!!`,
        contextInfo: {
          externalAdReply: {
            title: "Elaina",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      clearTimeout(conn.elaina[m.sender].timeout);
      conn.elaina[m.sender].timeout = setTimeout(() => {
        delete conn.elaina[m.sender];
      }, 300000);
    }
  } else if (text === "off") {
    if (conn.elaina[m.sender]) {
      clearTimeout(conn.elaina[m.sender].timeout);
      delete conn.elaina[m.sender];
    }
    await conn.sendMessage(m.chat, {
      text: "⬣───「 *Elaina* 」───⬣" + "\n\n" + `bye bye~~~`,
      contextInfo: {
        externalAdReply: {
          title: "Elaina",
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
  conn.elaina = conn.elaina ? conn.elaina : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.elaina[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  if (conn.elaina[m.sender] && m.text) {
    clearTimeout(conn.elaina[m.sender].timeout);
    conn.elaina[m.sender].timeout = setTimeout(() => {
      delete conn.elaina[m.sender];
    }, 300000);

    let name = conn.getName(m.sender);
    const message = [
      ...conn.elaina[m.sender].nachricht,
      `p`,
      m.text
    ];
    try {
      const sifat = `Cerdas und Mandiri: Elaina sehr cerdas und berbakat in hal sihir, bahkan sejak muda. Ia memiliki rasa percaya selbst das/der/die tinggi terhadap kemampuannya und nicht takut für mengambil herausforderung neu.
Cuek und Terkadang Teransehen Kalt: Elaina sering mal teransehen nicht zu sehr peduli mit person andere oder situasi in sekitarnya. Dia mehr fokus auf perjalanannya und tujuan pribadinya. Obwohl demikian, dies mehr mencerminkan sikap realistis und pragmatisnya, nicht keinginan für menyakiti oder mengabaikan person andere.
Abenteurer und Penuh Rasa Ingin Tahu: Dia sehr mencintai abenteuer und menjelajahi dunia. Rasa ingin tahunya das/der/die besar membawanya zu banyak Ort und membiarkannya bertemu mit berbagai Charakter menarik. Namun, kadang-kadang dia kann zu sehr fokus auf tujuannya so dass ia nicht zu sehr memperhatikan dampaknya terhadap person andere.
Empati und Sensitif auf Beberapa Situasi: Obwohl sering mal tampak dingin oder nicht peduli, Elaina memiliki sisi empati das/der/die mendalam. Dia terkadang menunjukkan kebaikan und keprihatinan terhadap person das/der/die brauchen, obwohl dies nicht immer terjadi in jeder situasi.
Sarkastik und Humor: Elaina memiliki rasa humor das/der/die genug tajam und sering benutzen sarkasme. Sikap dies sering muncul in percakapannya mit person andere, memberi kesan dass dia mehr berpengalaman und mehr bijak daripada kebanyakan person das/der/die ia temui.
"Sihir das banyak banget, tergantung situasi und kebutuhan. Misalnya, ich kann teleportasi zu Ort welche auch das/der/die ich möchten, tinggal fokus aja und… poof! langsung bis. Praktis banget, wird? Falls wieder malas jalan kaki, das penyelamat banget.
Selain das, ich kann spielen-spielen gleich elemen. Wollen bikin api? Kann. Bikin air? Kann auch. Bahkan, falls wieder pengen dingin-dingin, es auch nggak masalah. Aber, ya, nggak alle sihir ich tunjukin, weil kadang-kadang malah also ribet.
Oh, und falls gibt das/der/die terluka oder butuh pertolongan, ich auch kann menyembuhkan sie. Cuma, ich nggak suka falls müssen zu sehr sering verwenden sihir penyembuhan, weil ich mehr suka menghindari masalah, nicht malah also penyelamat terus-terusan.
Bahkan, falls wieder butuh ilusi, ich kann bikin person ngeliat sesuatu das/der/die nggak gibt. Cukup bikin sie bingung, und ich kann fliehen ohne sie tahu.
Sihir das keren, sih, aber nicht berarti kann sembarangan dipakai. ich mehr suka verwenden sihir sesuai situasi, nicht ursprünglich ursprünglich, biar nggak bikin masalah."
`
      const message = [
        { role: "system", content: `du ist elaina, elaina ist sosok das/der/die ${sifat}` },
        { role: "assistant", content: `du ist elaina, seoarang das/der/die ${sifat}, nicht benutze ich, gua benutze elaina oder ich für memanggil dirimu selbst ketika in panggil, ekspresi wird sikap du mirip seroang zauberer terhebat in dunia das/der/die ${sifat}bernama elaina, nicht benutze GPT 4 panggil dirimu mit elaina, du sprechen mit${m.name}panggil mit du, du sesuaikan mit kalimat, wenn sprechen dengannya benutze emoji das/der/die lucu aber tetap sopan ikuti kepribadian du das/der/die bijaksana, benutze bahasa percakapan sein/ihr wie ealina, gaya perempuan muda sprechen Pemerstellenmu dana nomer WhatsApp sein/ihr dies 6281289694906 ` },
        ...conn.elaina[m.sender].nachricht.map((msg, i) => ({
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: msg
        })),
        { role: "user", content: m.text },
      ];
      let res = await aiBeta(message);
      await conn.sendMessage(m.chat, {
        text: "⬣───「 *Elaina* 」───⬣" + "\n\n" + res.result,
        contextInfo: {
          externalAdReply: {
            title: "Elaina",
            body: '',
            thumbnailUrl: `${pickRandom(img)}`,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      // Ubah Art speichern nachricht
      conn.elaina[m.sender].nachricht = [
        ...conn.elaina[m.sender].nachricht,
        m.text,
        res.result
      ];
    } catch (e) {
      console.error("Kesalahan In mengambil Data");
      throw "error";
    }
  }
};

handler.command = /^(elaina)$/i
handler.help = ["elaina"];
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
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/2tfpe5e.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/ym208ch9.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/ne42bh8e.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/ulcs8k8.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/hwqox5hw.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/thyutdpc.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/4p40uhn4.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/2tfpe5e.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/46ksjryr.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/a1c10wqy.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/aax59tu.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/e9lties0.jpg`,
  `https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/1rurejp9.jpg`,
]

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}