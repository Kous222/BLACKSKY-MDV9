let timeout = 100000;
let poin = 10000;
let src;
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {};
  let id = m.chat;

  if (id in conn.tebakgambar) {
    conn.reply(m.chat, 'Es gibt noch eine unbeantwortete Frage in diesem Chat', conn.tebakgambar[id][0]);
    throw false;
  }

  try {
    if (!src) {
      // Fetch game data from API
      const response = await fetch(`https://api.betabotz.eu.org/api/spiel/tebakgambar?apikey=${lann}`);

      // Log status and body of the response
      console.log("API Response Status:", response.status);
      const contentType = response.headers.get('content-type');
      
      // Check if the response is JSON
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log("Parsed API Data:", data);

        if (Array.isArray(data) && data.length > 0) {
          src = data;
        } else {
          throw new Error("Keine gültigen Spieldaten empfangen");
        }
      } else {
        const errorPage = await response.text();
        console.error("Error Page:", errorPage);
        throw new Error("Erhaltene Antwort ist keine gültige JSON. Möglicherweise ein Fehler der API.");
      }
    }

    let json = src[Math.floor(Math.random() * src.length)];
    if (!json) throw "Ein Fehler ist aufgetreten, bitte versuche den Befehl erneut!";

    let caption = `
≡ _BILDERRÄTSEL SPIEL_

┌─⊷ *FRAGE*
▢ Erklärung: *${json.deskripsi}*
▢ Zeitlimit: *${(timeout / 1000).toFixed(2)} Sekunden*
▢ Bonus: ${poin} Münzen
▢ Tippe ${usedPrefix}hint für einen Hinweis
▢ *ANTWORTE* auf diese Nachricht, um zu antworten
└──────────────
    `.trim();

    conn.tebakgambar[id] = [
      await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption }, { quoted: m }),
      json,
      poin,
      setTimeout(() => {
        if (conn.tebakgambar[id]) {
          conn.reply(m.chat, `Zeit abgelaufen!\nDie Antwort ist *${json.Antwort}*`, conn.tebakgambar[id][0]);
          delete conn.tebakgambar[id];
        }
      }, timeout)
    ];
  } catch (error) {
    console.error("Error during game data fetch:", error); // Log the error
    conn.reply(m.chat, "Es gab ein Problem beim Abrufen der Spieldaten. Bitte versuche es später erneut!");
  }
};

handler.help = ['tebakgambar', 'bildraten', 'bilderraten', 'bilderrätsel', 'bilderrate'];
handler.tags = ['spiel'];
handler.command = /^(tebakgambar|bildraten|bilderraten)/i;
handler.limit = false;
handler.group = true;

module.exports = handler;
