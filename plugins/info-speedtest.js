let cp = require('child_process');
let { promisify } = require('util');
let exec = promisify(cp.exec).bind(cp);

let handler = async (m, { conn }) => {
    await conn.reply(m.chat, `Bitte warten...`, m); // Changed Antworten to reply
    let o;
    try {
        o = await exec('python3 speed.py --share --secure');
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim()) {
            conn.relayMessage(m.chat, {
                extendedTextMessage: {
                    text: stdout, // Corrected "Text" to "text" (lowercase)
                    contextInfo: {
                        externalAdReply: {
                            title: "",
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnailUrl: 'https://telegra.ph/file/ec8cf04e3a2890d3dce9c.jpg',
                            sourceUrl: ''
                        }
                    },
                    mentions: [m.sender]
                }
            }, {});
        }
        if (stderr.trim()) {
            conn.reply(m.chat, stderr, m); // Changed Antworten to reply
        }
    }
};

handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest|ookla)$/i;
handler.Premium = false;

module.exports = handler;
