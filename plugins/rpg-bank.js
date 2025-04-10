let handler = async (m, { conn, args, usedPrefix, command }) => {
  let target = m.mentionedJid[0] || m.sender 
  let user = global.db.data.users[target]
  
  let name = user.name
  let exp = user.exp
  let limit = user.limit
  let balance = user.Münzen
  let atm = user.bank
  let Stufe = user.Stufe
  let role = user.role

  let capt = `乂  *🏦 B A N K K O N T O 🏦*  乂\n\n`
  capt += `  ◦  *👤 Name* : ${name}\n`
  capt += `  ◦  *⭐ Role* : ${role}\n`
  capt += `  ◦  *✨ Exp* : ${exp}\n`
  capt += `  ◦  *📊 Limit* : ${limit}\n`
  capt += `  ◦  *💰 Guthaben* : ${balance}\n`
  capt += `  ◦  *📈 Stufe* : ${Stufe}\n`
  capt += `  ◦  *🏧 ATM* : ${atm}\n\n`
  capt += `> *${usedPrefix} atm <Anzahl>* zum Einzahlen\n`
  capt += `> *${usedPrefix} pull <Anzahl>* zum Abheben\n`

  await conn.relayMessage(m.chat, {
            extendedTextMessage:{
                text: capt, 
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://api.betabotz.eu.org/api/tools/get-hochladen?id=f/106ebnd3.jpg',
                        sourceUrl: 'https://whatsapp.com/channel/0029Va8ZH8fFXUuc69TGVw1q'
                    }
                }, 
                mentions: [m.sender]
            }
        }, {})
}

handler.help = ['bank', 'bankkonto', 'konto']
handler.tags = ['rpg']
handler.command = /^(bank|bankkonto|konto)$/
handler.rpg = true

module.exports = handler
