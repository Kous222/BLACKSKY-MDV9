const axios = require("axios");
const ytSearch = require("yt-search");

let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("❌ Was möchtest du herunterladen?");

  await m.reply("🔄 *BLACKSKY-MD Bot lädt deinen Song... Bitte warte...*");

  try {
    let search = await ytSearch(text);
    let video = search.videos[0];

    if (!video) return m.reply("❌ Keine Ergebnisse gefunden. Versuche es mit einem anderen Titel.");

    let link = video.url;
    let apis = [
      `https://fastrestapis.fasturl.cloud/downup/ytmp3?url=${encodeURIComponent(link)}&quality=128kbps&server=server2`,
      `https://fastrestapis.fasturl.cloud/downup/ytmp3?url=${encodeURIComponent(link)}&quality=128kbps&server=auto`,
      `https://fastrestapis.fasturl.cloud/downup/ytmp3?url=${encodeURIComponent(link)}&quality=128kbps&server=server1`
    ];

    async function fetchWithRetry(apiList, retries = 3, delay = 5000) {
      for (let api of apiList) {
        for (let i = 0; i < retries; i++) {
          try {
            const res = await axios.get(api, {
              timeout: 30000,
              headers: { "accept": "application/json" }
            });
            if (res.data && res.data.status === 200) {
              return res.data.result;
            }
            throw new Error("Ungültige API-Antwort");
          } catch (err) {
            console.error(`Versuch ${i + 1} fehlgeschlagen für ${api}: ${err.message}`);
            if (i < retries - 1) await new Promise(r => setTimeout(r, delay));
          }
        }
      }
      throw new Error("Fehler beim Abrufen des Liedes nach mehreren Versuchen.");
    }

    let data = await fetchWithRetry(apis);

    let songData = {
      title: data.title,
      artist: data.author.name,
      thumbnail: data.metadata.thumbnail,
      videoUrl: data.url,
      audioUrl: data.media
    };

    await conn.sendMessage(m.chat, {
      image: { url: songData.thumbnail },
      caption: `BLACKSKY-MD BOT
╭═════════════════⊷
║ 🎶 *Titel:* ${songData.title}
║ 🎤 *Künstler:* ${songData.artist}
╰═════════════════⊷
*Powered by BLACKSKY-MD BOT*`
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: songData.audioUrl },
      mimetype: "audio/mp4",
      ptt: false
    }, { quoted: m });

    await m.reply("✅ *Erfolgreich gesendet! 🎶*");

  } catch (e) {
    console.error("Fehler:", e.message);
    return m.reply("❌ Fehler beim Download:\n" + e.message);
  }
};

handler.help = ["play"].map(v => v + " <titel>");
handler.tags = ["downloader"];
handler.command = /^play$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;
