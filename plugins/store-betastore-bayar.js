const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@adiwajshing/baileys');

const qrisUrl = 'https://files.catbox.moe/spv9di.jpg'; 

const handler = async (message, { conn }) => {
    const replyMessage = `Metode Pembayaran:\n\nDana: 081289694906\n\nSilakan lakukan pembayaran und senden bukti pembayaran mit caption id Transaksi.`;
    await message.reply(replyMessage);

    const { imageMessage } = await generateWAMessageContent({
        image: { url: qrisUrl }
    }, {
        hochladen: conn.waUploadToServer
    });

    const msg = generateWAMessageFromContent(message.chat, {
        imageMessage: {
            ...imageMessage,
            caption: 'Scan QRIS für pembayaran'
        }
    }, { quoted: message });

    await conn.relayMessage(message.chat, msg.message, {
        messageId: msg.key.id
    });
};

handler.customPrefix = /^bayar$/i;
handler.command = new RegExp;
module.exports = handler;

// no copas code von luar, logic verwenden kepala
// frei ubah weil open source
// danaputra133
// tutorial verwenden gibt in: https://youtu.be/sFj3Mh-z1Jk