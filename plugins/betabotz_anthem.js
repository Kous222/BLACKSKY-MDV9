let fetch = require('node-fetch')

let handler = async (m, { conn, command }) => {
let Audio = 'src/lagu.mp3'
const img = await fetch(`https://telegra.ph/file/3947ccd86c9e9426eec8b.jpg`).then(res => res.buffer())
let text = `🎵 Betabotz Lied 🎵

(Strophe 1)
Auf GitHub ist Betabotz aktiv,
Open-Source-Code, unersetzlicher Geist.
ERLANRAHMAT, der Besitzer,
Verbreitet den WhatsApp-Bot, unaufhaltsam.

(Refrain)
Betabotz, oh Betabotz,
Mit faszinierenden APIs.
Von Medien-Downloader bis Pairing-Code,
Beeindruckende Funktionen, unbestreitbar.

(Strophe 2)
Windows, VPS, RDP, alles möglich,
Git, NodeJS, FFmpeg, ImageMagick, nicht vergessen.
ApiKey muss ausgefüllt werden, vergiss es nicht,
Express, ffmpeg, imagemagick, webp, alles verbunden.

(Refrain)
Betabotz, oh Betabotz,
Mit faszinierenden APIs.
Von Medien-Downloader bis Pairing-Code,
Beeindruckende Funktionen, unbestreitbar.

(Bridge)
Seltene Scraper, toanime, remini, und tozombie,
Uploader von BOTCAHX und AEMT, unbestreitbar.
Verwendet CDN und AEMT,
Betabotz-Tools, beeindruckende Funktionen.

(Refrain)
Betabotz, oh Betabotz,
Mit faszinierenden APIs.
Von Medien-Downloader bis Pairing-Code,
Beeindruckende Funktionen, unbestreitbar.

(Outro)
Danke, Tio Erlan Nayla,
Bo`
await conn.sendFile(m.chat, img, null, text, m);
conn.sendMessage(m.chat, { Audio: { url: Audio }, mimetype: 'Audio/mpeg' }, { quoted: m });

}

handler.customPrefix = /^(betabotz)$/i 
handler.command = new RegExp
handler.tags = ['spielen']
module.exports = handler