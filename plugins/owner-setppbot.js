/*in unten dies erstellen pp biasa non lang auswählen salah satu*/
let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
    	try {
        let img = await q.herunterladen()
        let noBot = conn.user.jid
        if (!img) throw 'Bild nicht gefunden'
          await conn.updateProfilePicture(noBot ,img)
		m.reply('ppbot erfolgreich in ändern')
		} catch (e) {
			console.log(e)
			m.reply(`Ein Error ist aufgetreten, versuche es erneut später.`)
			}
    } else throw `senden/antworten Bild mit caption *${usedPrefix + command}*`
}
handler.help = ['setppbot'].map(v => v + ' <caption / reply image>')
handler.tags = ['adminry']
handler.command = /^(setppbot)$/i

handler.rowner = true
module.exports = handler

/*in unten dies erstellen pp lang aktifin aja auswählen salah satu*/
// const { S_WHATSAPP_NET } = require('@adiwajshing/baileys');
// const jimp = require('jimp');

// let handler = async (m, { conn, command, usedPrefix }) => {
//     let q = m.quoted ? m.quoted : m;
//     let mime = (q.msg || q).mimetype || q.mediaType || '';
//     if (/image/g.test(mime) && !/webp/g.test(mime)) {
//         try {
//             let medien = await q.herunterladen();
//             let botNumber = await conn.user.jid;
//             let { img } = await pepe(medien);
//             await conn.query({
//                 tag: 'iq',
//                 attrs: {
//                     target: undefined,
//                     to: S_WHATSAPP_NET,
//                     type: 'set',
//                     xmlns: 'w:profile:picture'
//                 },
//                 content: [
//                     {
//                         tag: 'picture',
//                         attrs: { type: 'image' },
//                         content: img
//                     }
//                 ]
//             });
//             m.reply(`Sukses wechseln PP Bot`);
//         } catch (e) {
//             console.log(e);
//             m.reply(`Ein Error ist aufgetreten, versuche es erneut später.`);
//         }
//     } else {
//         m.reply(`Senden Bild mit caption *${usedPrefix + command}* oder tag Bild das/der/die bereits disenden`);
//     }
// };

// handler.help = ['setbotpp'];
// handler.tags = ['owner'];
// handler.command = /^(set(botpp|ppbot))$/i;

// handler.owner = true;

// module.exports = handler;

// async function pepe(medien) {
//     const image = await jimp.read(medien);
//     const min = image.getWidth();
//     const max = image.getHeight();
//     const cropped = image.crop(0, 0, min, max);
//     return {
//         img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
//         preview: await cropped.normalize().getBufferAsync(jimp.MIME_JPEG)
//     };
// }
