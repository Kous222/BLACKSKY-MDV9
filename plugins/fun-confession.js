let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw `*Weg penggunaan :*\n\n${usedPrefix + command} nomor|name pengirim|nachricht\n\n*Note:* name pengirim darf name samaran oder anonymous.\n\n*Beispiel:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Anonymous|hallo.`;
    let [jid, name, nachricht] = text.split('|');
    if ((!jid || !name || !nachricht)) throw `*Weg penggunaan :*\n\n${usedPrefix + command} nomor|name pengirim|nachricht\n\n*Note:* name pengirim darf name samaran oder anonymous.\n\n*Beispiel:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Anonymous|hallo.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer nicht registriert in whatsapp.';
    if (jid == m.sender) throw 'nicht kann senden nachricht menfess zu selbst selbst.'
    let mf = Object.values(conn.menfess).find(mf => mf.Status === true)
    if (mf) return !0
    	let id = + new Date
        let teks = `hallo @${data.jid.split("@")[0]}, du empfangen nachricht Menfess nih.\n\nDari: *${name}*\nPesan: \n${nachricht}\n\nMau antworten nachricht dies kak? kann kok kak. tinggal tippe nachricht kakak dann senden, später ich sampaikan zu *${name}*.`.trim();
        await conn.relayMessage(data.jid, {
                extendedTextMessage:{
                text: teks, 
                contextInfo: {
                mentionedJid: [data.jid],
                     externalAdReply: {
                        title: 'M E N F E S S',
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                        sourceUrl: ''
                    }
                }
          }}, {}).then(() => {
            m.reply('erfolgreich senden nachricht menfess.')
            conn.menfess[id] = {
                id,
                von: m.sender,
                name: name,
                penerima: data.jid,
                nachricht: nachricht,
                Status: false
            }
            return !0
        })
}
handler.tags = ['fun']
handler.help = ['menfess']
handler.command = /^(menfess|menfes)$/i
handler.private = true

module.exports = handler
