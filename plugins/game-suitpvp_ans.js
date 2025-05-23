let handler = m => m
handler.before = async function (m) {
  this.suit = this.suit ? this.suit : {}
  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
  let room = Object.values(this.suit).find(room => room.id && room.Status && [room.p, room.p2].includes(m.sender))
  if (room) {
    let win = ''
    let tie = false
    if (m.sender == room.p2 && /^(acc(ept)?|annehmen|empfangen|ok|los|oke?|ablehnen|nein|später|abwarten)/i.test(m.text) && m.isGroup && room.Status == 'wait') {
      if (/^(ablehnen|nein|später|abwarten)/i.test(m.text)) {
        this.reply(m.chat, `@${room.p2.split`@`[0]} hat die Herausforderung abgelehnt, Spiel beendet`, m)
        delete this.suit[room.id]
        return !0
      }
      room.Status = 'play'
      room.ursprünglich = m.chat
      clearTimeout(room.Zeit)
      //delete room[room.id].Zeit
      m.reply(`Schere-Stein-Papier wurde in den Chat gesendet
@${room.p.split`@`[0]} und 
@${room.p2.split`@`[0]}

Bitte wählt im individuellen Chat eure Option
Klickt auf wa.me/${conn.user.jid.split`@`[0]}`, m.chat, {
        contextInfo: {
          mentionedJid: [room.p, room.p2]
        }
      })

      if (!room.auswählen) this.send3But(room.p, 'Bitte auswählen', `Gewinnen +${room.poin}XP\nVerlieren -${room.poin_lose}XP`, 'Stein🗿', 'Stein', 'Papier📄', 'Papier', 'Schere✂️', 'Schere', m)
      if (!room.auswählen2) this.send3But(room.p2, 'Bitte auswählen', `Gewinnen +${room.poin}XP\nVerlieren -${room.poin_lose}XP`, 'Stein🗿', 'Stein', 'Papier📄', 'Papier', 'Schere✂️', 'Schere', m)
      room.auswahlZeit = setTimeout(() => {
        if (!room.auswählen && !room.auswählen2) this.reply(m.chat, `Beide Spieler scheinen nicht spielen zu wollen,\nSpiel wird beendet`)
        else if (!room.auswählen || !room.auswählen2) {
          win = !room.auswählen ? room.p2 : room.p
          this.reply(m.chat, `@${(room.auswählen ? room.p2 : room.p).split`@`[0]} hat keine Auswahl getroffen, Spiel beendet`, m)
          db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
          db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
        }
        delete this.suit[room.id]
        return !0
      }, room.timeout)
    }
    let jwb = m.sender == room.p
    let jwb2 = m.sender == room.p2
    let s = /schere/i
    let st = /stein/i
    let p = /papier/i
    let reg = /^(schere|stein|papier)/i
    if (jwb && reg.test(m.text) && !room.auswählen && !m.isGroup) {
      room.auswählen = reg.exec(m.text.toLowerCase())[0]
      room.text = m.text
      m.reply(`Du hast ${m.text} gewählt ${!room.auswählen2 ? `\n\nWarte auf die Auswahl des Gegners` : ''}`)
      if (!room.auswählen2) this.reply(room.p2, '_Der Gegner hat bereits gewählt_\nJetzt bist du dran', 0)
    }
    if (jwb2 && reg.test(m.text) && !room.auswählen2 && !m.isGroup) {
      room.auswählen2 = reg.exec(m.text.toLowerCase())[0]
      room.text2 = m.text
      m.reply(`Du hast ${m.text} gewählt ${!room.auswählen ? `\n\nWarte auf die Auswahl des Gegners` : ''}`)
      if (!room.auswählen) this.reply(room.p, '_Der Gegner hat bereits gewählt_\nJetzt bist du dran', 0)
    }
    let stage = room.auswählen
    let stage2 = room.auswählen2
    if (room.auswählen && room.auswählen2) {
      clearTimeout(room.auswahlZeit)
      if (st.test(stage) && s.test(stage2)) win = room.p
      else if (st.test(stage) && p.test(stage2)) win = room.p2
      else if (s.test(stage) && p.test(stage2)) win = room.p
      else if (s.test(stage) && st.test(stage2)) win = room.p2
      else if (p.test(stage) && st.test(stage2)) win = room.p
      else if (p.test(stage) && s.test(stage2)) win = room.p2
      else if (stage == stage2) tie = true
      this.reply(room.ursprünglich, `
_*SCHERE-STEIN-PAPIER ERGEBNIS*_${tie ? '\nUNENTSCHIEDEN' : ''}

@${room.p.split`@`[0]} (${room.text}) ${tie ? '' : room.p == win ? ` Gewonnen \n+${room.poin}XP` : ` Verloren \n-${room.poin_lose}XP`}
@${room.p2.split`@`[0]} (${room.text2}) ${tie ? '' : room.p2 == win ? ` Gewonnen \n+${room.poin}XP` : ` Verloren \n-${room.poin_lose}XP`}
`.trim(), m, { contextInfo: { mentionedJid: [room.p, room.p2] } })
      if (!tie) {
        db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
        db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose

      }
      delete this.suit[room.id]
    }
  }
  return !0
}
handler.exp = 0
module.exports = handler

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
