let fetch = require('node-fetch');
let uploadImage = require('../lib/uploadImage');

// Get API key
const lann = global.lann || 'Btz-jdyXQ'; 

let handler = m => m;

handler.before = async function(m, { conn }) {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (!global.antiporn) return;
    if (!/image/.test(mime)) return;
    
    try {
        let medien = await q.download();
        let url = await uploadImage(medien);
        
        const response = await fetch(`https://api.betabotz.eu.org/api/tools/nsfw-detect?url=${url}&apikey=${lann}`);
        const res = await response.json();
        
        if (res.result?.labelName === 'Porn') {
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            m.reply('⚠️antiporn detected⚠️');
        }
    } catch (e) {
        console.log('Error in antiporn plugin:', e);
    }
};

module.exports = handler;
