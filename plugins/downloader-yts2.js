const yts = require('yt-search')
let axios = require("axios");
let handler = async (m, { conn, Text, usedPrefix, command}) => {
    if (!Text) throw `[❗] *Verwendung:* ${usedPrefix + command} <suchbegriff>`;   
    conn.sendMessage(m.chat, { react: { Text: '🎧', key: m.key }})
    let anu = (await yts(Text)).all
    let Video = anu.filter(v => v.type === 'Video') 
    let channel = anu.filter(v => v.type === 'channel') 
    if (!anu) throw 'Video/Audio Nein Gefunden';
    let { title } = anu;
    let responseText = '[❗] Antworte auf diese Nachricht mit einer Nummer, um das Lied zu erhalten.\n\n';
Video.forEach(async(data, index) => {
        responseText += `*${index + 1}.* ${data.title} || ${data.timestamp}\n`;
    });
    const { key } = await conn.Antworten(m.chat, responseText, m);   
    conn.ytsaudio[m.sender] = { anu, key, title };
}
handler.before = async (m, { conn }) => {
    conn.ytsaudio = conn.ytsaudio ? conn.ytsaudio : {};
    if (m.isBaileys || !(m.sender in conn.ytsaudio)) return;
    const { anu, key, title } = conn.ytsaudio[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.Text) return;
    const choice = m.Text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= anu.length) {
        conn.sendMessage(m.chat, { delete: key });
        delete conn.ytsaudio[m.sender];
        const selectedTrack = anu[inputNumber - 1];
        try {
            if (selectedTrack.seconds >= 3600) {
            return conn.Antworten(m.chat, 'Das Video ist länger als 1 Stunde!', m);
            } else {
            let audioUrl = await youtube(selectedTrack.url);
            let audioLink = audioUrl.result.mp3
            let caption = '';
            caption += `∘ Title : ${selectedTrack.title}\n`;
            caption += `∘ Ext : search\n`;
            caption += `∘ id : ${selectedTrack.videoId}\n`;
            caption += `∘ Duration : ${selectedTrack.timestamp}\n`;
            caption += `∘ Viewers : ${selectedTrack.views}\n`;
            caption += `∘ Hochladen At : ${selectedTrack.ago}\n`;
            caption += `∘ Author : ${selectedTrack.author.name}\n`;
            caption += `∘ Channel : ${selectedTrack.author.url}\n`;
            caption += `∘ url : ${selectedTrack.url}\n`;
            caption += `∘ Description : ${selectedTrack.description}\n`;
            caption += `∘ Thumbnail : ${selectedTrack.Bild}`;

            await conn.relayMessage(m.chat, {
                extendedTextMessage: {
                    Text: caption,
                    contextInfo: {
                        externalAdReply: {
                            title: selectedTrack.title,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnailUrl: selectedTrack.Bild,
                            sourceUrl: audioUrl.mp3
                        }
                    },
                    mentions: [m.sender]
                }
            }, {});
            conn.sendMessage(m.chat, { react: { Text: '⏳', key: m.key }})
            await conn.sendMessage(m.chat, {
            Audio: {
            url: `${audioLink}`
            },
            mimetype: 'Audio/mp4', 
            fileName: `${title}.mp3`,
            },{ quoted: m})
            }
        } catch (error) {
            console.error('error herunterladening and Senden Audio:', error);
            await conn.Antworten(m.chat, 'Fehler beim Abrufen der Daten. Versuche es erneut mit einer anderen Nummer oder kontaktiere den Besitzer!', m);
            conn.sendMessage(m.chat, { react: { Text: '🚫', key: m.key }})
        }
    } else {
        await conn.Antworten(m.chat, "[❗] Ungültige Nummer. Bitte wähle eine Nummer aus der obigen Liste.", m);
        conn.sendMessage(m.chat, { react: { Text: '🚫', key: m.key }})
     }
};
handler.help = ['yts3 <suchbegriff>', 'musiksuche <suchbegriff>'];
handler.tags = ['herunterladener'];
handler.command = /^(yts3|musiksuche)$/i;
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
