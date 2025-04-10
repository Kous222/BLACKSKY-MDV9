/* 
    Made by https://github.com/syahrularranger 
    Bitte nicht löschen oder bearbeiten :)
*/
let timeout = 60000
let poin = 500
let poin_lose = -100
let handler = async (m, { conn, usedPrefix }) => {
  conn.suit = conn.suit ? conn.suit : {}
  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw 'Beende dein laufendes Duell zuerst'
  if (!m.mentionedJid[0]) return m.reply(`_Wen möchtest du herausfordern?_\nMentioniere die Person.. Beispiel\n\n${usedPrefix}suit @${owner[1]}`, m.chat, { contextInfo: { mentionedJid: [owner[1] + '@s.whatsapp.net'] } })
  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `Die Person, die du herausfordern möchtest, spielt gerade ein Duell mit jemand anderem :(`
  let id = 'suit_' + new Date() * 1
  let caption = `
_*SCHERE-STEIN-PAPIER PvP*_

@${m.sender.split`@`[0]} fordert @${m.mentionedJid[0].split`@`[0]} zu einem Duell heraus

Bitte @${m.mentionedJid[0].split`@`[0]} 
`.trim()
  let footer = `Tippe "annehmen/ok/los" um das Duell zu starten\nTippe "ablehnen/nein/später" um die Herausforderung abzulehnen`
  conn.suit[id] = {
    chat: await conn.send2But(m.chat, caption, footer, 'Annehmen', 'ok', 'Ablehnen', 'ablehnen', m, { contextInfo: { mentionedJid: conn.parseMention(caption) } }),
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    Status: 'wait',
    Zeit: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `_Zeit für das Duell abgelaufen_`, m)
      delete conn.suit[id]
    }, timeout), poin, poin_lose, timeout
  }
}
handler.tags = ['spiel']
handler.help = ['suitpvp', 'suit2'].map(v => v + ' @tag')
handler.command = /^suit(pvp|2)$/i
handler.limit = false
handler.group = true

module.exports = handler
