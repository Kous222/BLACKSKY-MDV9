const yts = require('yt-search')
let axios = require("axios");
let handler = async (m, { conn, Text, usedPrefix, command}) => {
    if (!Text) throw `[❗] *Penggunaan:* ${usedPrefix + command} <search>`;   
    conn.sendMessage(m.chat, { react: { Text: '🎧', key: m.key }})
    let anu = (await yts(Text)).all
    let Video = anu.filter(v => v.type === 'Video') 
    let channel = anu.filter(v => v.type === 'channel') 
    if (!anu) throw 'Video/Audio Nein Gefunden';
    let { title } = anu;
    let responseText = '[❗] Antworten Nachricht dies mit nomor für erhalten lagunya.\n\n';
Video.forEach(async(data, index) => {
        responseText += `*${index + 1}.* ${data.title} || ${data.timestamp}\n`;
    });
    const { key } = await conn.Antworten(m.chat, responseText, m);   
    conn.ytsvideo[m.sender] = { anu, key, title };
}
handler.before = async (m, { conn }) => {
    conn.ytsvideo = conn.ytsvideo ? conn.ytsvideo : {};
    if (m.isBaileys || !(m.sender in conn.ytsvideo)) return;
    const { anu, key, title } = conn.ytsvideo[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.Text) return;
    const choice = m.Text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= anu.length) {
        conn.sendMessage(m.chat, { delete: key });
        delete conn.ytsvideo[m.sender];
        const selectedTrack = anu[inputNumber - 1];
        try {
            if (selectedTrack.seconds >= 3600) {
            return conn.Antworten(m.chat, 'Video is longer than 1 hour!', m);
            } else {
            let videoUrl = await youtube(selectedTrack.url);
            let videoLink = videoUrl.result.mp4
            let captions = '';
            captions += `∘ Title : ${selectedTrack.title}\n`;
            captions += `∘ Duration : ${selectedTrack.timestamp}\n`;
            captions += `∘ Viewers : ${selectedTrack.views}\n`;
            captions += `∘ Hochladen At : ${selectedTrack.ago}\n`;
            captions += `∘ url : ${selectedTrack.url}\n`;
            captions += `∘ Description : ${selectedTrack.description}\n`;

            conn.sendMessage(m.chat, { react: { Text: '⏳', key: m.key }})
            await conn.sendMessage(m.chat, { Video: { url: videoLink }, caption: captions }, { quoted: m });
          }
        } catch (error) {
            console.error('error herunterladening and Senden Audio:', error);
            await conn.Antworten(m.chat, 'error wenn menngambil data, Versuche es erneut mit nomor das/der/die andere tau hubungi owner!', m);
            conn.sendMessage(m.chat, { react: { Text: '🚫', key: m.key }})
        }
    } else {
        await conn.Antworten(m.chat, "[❗] Nomor urut nicht valid. Silakan auswählen nomor das/der/die sesuai mit liste in oben.", m);
        conn.sendMessage(m.chat, { react: { Text: '🚫', key: m.key }})
     }
};
handler.help = ['yts4 <search>'];
handler.tags = ['herunterladener'];
handler.command = /^(yts4)$/i;
handler.limit = true;
module.exports = handler;

async function youtube(url) {
   try {
   const { data } = await axios.get("https://api.betabotz.eu.org/api/Herunterladen/yt?url="+url+"&apikey="+lann)
   return data;
   } catch (e) {
   return e;
   }
}
