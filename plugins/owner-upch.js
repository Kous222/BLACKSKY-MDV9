const { proto } = require('@adiwajshing/baileys'); 

let handler = async (m, { conn, text }) => {
    try {

        let teks = text 
            ? text 
            : m.quoted && m.quoted.text 
            ? m.quoted.text 
            : m.quoted && m.quoted.caption 
            ? m.quoted.caption 
            : m.quoted && m.quoted.description 
            ? m.quoted.description 
            : '';
        if (!teks) {
            return m.reply('Harap eingeben teks für disenden zu channel!');
        }

        await sendMessage(conn, teks);
        m.reply('Sukses senden nachricht zu channel');
    } catch (e) {
        console.error(e);
        m.reply('fehlgeschlagen senden nachricht');
    }
};


handler.command = /^(ch)$/i; 
handler.owner = true; 
module.exports = handler; 


function sendMessage(conn, teks) {
    const msg = {
        conversation: teks,
    };
    const plaintext = proto.Message.encode(msg).finish();
    const plaintextNode = {
        tag: 'plaintext',
        attrs: {},
        content: plaintext,
    };
    const node = {
        tag: 'message',
        attrs: {
            to: '', //isi mit id ihr! für Art erhalten id sein/ihr kann ansehen in https://youtu.be/L3hDISOjO7k
            type: 'text',
        },
        content: [plaintextNode],
    };

    return conn.query(node); 
}
