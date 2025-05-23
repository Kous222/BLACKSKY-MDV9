async function handler(m, { conn, usedPrefix, command, text }) {
  let user = global.db.data.users[m.sender]
  let SWORD = user.sword < 1
  let RÜSTUNG = user.Rüstung < 1
  let HEALT = user.healt < 90
  let prefix = usedPrefix
  if (SWORD || RÜSTUNG || HEALT) {
    const danzz = []
      console.log({SWORD, RÜSTUNG, HEALT})
      let thumb = 'https://telegra.ph/file/e7e06f759a0549bff9a64.jpg'
      let kemii = `${prefix}shop buy Rüstung\n\nUntuk kaufen Rüstung du!`
      let anjy = `${prefix}shop buy sword\n\nUntuk kaufen schwert du!`
      let kemii1 = `${prefix} heal\n\nUntuk hinzufügen Blut du!`
      if (SWORD) return conn.sendMessage(m.chat, {
        text: anjy,
        contextInfo: {
        externalAdReply: {
        title: 'D u n g e o n',
        thumbnailUrl: 'https://telegra.ph/file/750e79e2764d529aea52e.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
        }}})
      if (RÜSTUNG) return conn.sendMessage(m.chat, {
        text: kemii,
        contextInfo: {
        externalAdReply: {
        title: 'D u n g e o n',
        thumbnailUrl: 'https://telegra.ph/file/750e79e2764d529aea52e.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
        }}})
      if (HEALT) return conn.sendMessage(m.chat, {
        text: kemii1,
        contextInfo: {
        externalAdReply: {
        title: 'D u n g e o n',
        thumbnailUrl: 'https://telegra.ph/file/750e79e2764d529aea52e.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
        }}})
      
      let lmao = Gegenstand(user.sword * 1, user.Rüstung * 1, user.healt * 1, usedPrefix)
      if (danzz.length == 0) return conn.sendMessage(m.chat, {
        text: lmao,
        contextInfo: {
        externalAdReply: {
        title: 'D u n g e o n',
        thumbnailUrl: 'https://telegra.ph/file/750e79e2764d529aea52e.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
        }}})
  }
  global.Verlies = global.Verlies ? global.Verlies : {}
  if (Object.values(global.Verlies).find(room => room.id.startsWith('Verlies') && [room.spiel.player1, room.spiel.player2, room.spiel.player3, room.spiel.player4].includes(m.sender))) return conn.reply(m.chat, 'du noch in in Verlies', m)// nek iseh neng njero Verlies
  let timing = (new Date - (user.lastdungeon * 1)) * 1
  if (timing < 100) return conn.reply(m.chat, `Bitte warten...clockSchnur(100 - timing)} für kann zu Verlies`, m)// Cooldown
  let room = Object.values(global.Verlies).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
  if (room) {

    // Biar simple :v
    let p1 = room.spiel.player1 || ''
    let p2 = room.spiel.player2 || ''
    let p3 = room.spiel.player3 || ''
    let p4 = room.spiel.player4 || ''
    let c1 = room.player1 || ''
    let c2 = room.player2 || ''
    let c3 = room.player3 || ''
    let c4 = room.player4 || ''

    if (!p2) {
      room.player2 = m.chat
      room.spiel.player2 = m.sender
    } else if (!p3) {
      room.player3 = m.chat
      room.spiel.player3 = m.sender
    } else if (!p4) {
      room.player4 = m.chat
      room.spiel.player4 = m.sender
      room.state = 'PLAYING'
    }
    
      
     const buttons = [
         {buttonId: 'gass..', buttonText: {displayText: 'gass..'}, type: 1}
     ]
      
      let lmao = `${!room.spiel.player4 ? `Menünggu ${!room.spiel.player3 && !room.spiel.player4 ? '2' : '1'} Partner wieder... ${room.name ? `mengetik command dibawah dies *${usedPrefix}${command} ${room.name}*` : ''}` : 'Alle partner hat lengkap...'}`
      conn.sendMessage(m.chat, {
        text: lmao,
        contextInfo: {
        externalAdReply: {
        title: 'D u n g e o n',
        thumbnailUrl: 'https://telegra.ph/file/750e79e2764d529aea52e.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
        }}})
      
      if (room.spiel.player1 && room.spiel.player2 && room.spiel.player3 && room.spiel.player4) {

      // Hadiah ben do seneng :v
      room.price.Münzen += (Math.floor(Math.random() * 1000001)) * 1
      room.price.exp += (Math.floor(Math.random() * 500001)) * 1
      room.price.iron += (pickRandom([0, 0, 0, 0, 1, 0, 0, 0])) * 1
      room.spiel.Diamant += (pickRandom([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0])) * 1
      room.spiel.müll += (Math.floor(Math.random() * 101)) * 1
      room.price.schnur += (Math.floor(Math.random() * 2)) * 1
      room.price.holz += (Math.floor(Math.random() * 2)) * 1
      room.price.stein += (Math.floor(Math.random() * 2)) * 1
      room.spiel.haustierfutter += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1
      room.spiel.common += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
      room.spiel.uncommon += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1

      let str = `
Room id: ${room.id}

${M(p1)}, ${M(p2)}, ${M(p3)} und ${M(p4)}

gerade berperang in Verlies...
`.trim()

      await m.reply(str, c1, {
        contextInfo: {
          mentionedJid: conn.parseMention(str)
        }
      })
      if (![c1, c3, c4].includes(c2)) m.reply(str, c2, {
          contextInfo: {
            mentionedJid: conn.parseMention(str)
          }
      })
      if (![c1, c2, c4].includes(c3)) m.reply(str, c3, {
        contextInfo: {
            mentionedJid: conn.parseMention(str)
          }
      })
      if (![c1, c2, c3].includes(c4)) m.reply(str, c4, {
        contextInfo: {
            mentionedJid: conn.parseMention(str)
        }
      })

      setTimeout(async () => {
        let users = global.db.data.users[m.sender]
        let player  = [p1, p2, p3, p4]
        let { healt, sword } = room.less
        let { exp, Münzen, müll, potion, Diamant, iron, holz, stein, schnur, common, uncommon, mythic, legendary, pet, haustierfutter } = room.price  
        let str2 = `
Leben *${M(p1)}*, *${M(p2)}*, *${M(p3)}* und *${M(p4)}* jeweils jeweils verringert *-${healt * 1}*, und durability Sword ihr jeweils jeweils verringert *-${sword * 1}* weil ihr hat töten *${pickRandom(['Ender Dragon', 'Baby Dragon', 'Titan', 'Cacing und Semut', 'PP Mikey', 'Person', 'Kecoa', 'Semut', 'Siput', '....', 'Wither', 'Sekeleton', 'Ayam Emas', 'Temenmu', 'Sapi', 'Nein Gibt', 'Creeper', 'Zombie', 'Hewan Pelihraanmu','Diri Sendiri'])}* und erhalten total
*Exp:* ${exp * 4}
*Geld:* ${Münzen * 4}
*Müll:* ${müll  * 4}${potion == 0 ? '' : '\n*Potion:* ' + potion * 4}${haustierfutter == 0 ? '' : '\n*Haustierfutter* ' + haustierfutter * 4}${holz == 0 ? '' : '\n*Holz:* ' + holz * 4}${stein == 0 ? '' : '\n*Stein:* ' + stein * 4}${schnur == 0 ? '' : '\n*Schnur:* ' + schnur * 4}${iron == 0 ? '' : '\n*Iron:* ' + iron * 4}${Diamant == 0 ? '' : '\n*Diamond:* ' + Diamant * 4}${common == 0 ? '' : '\n*Common Crate:* ' + common * 4}${uncommon == 0 ? '' : '\n*Uncommon Crate:* ' + uncommon * 4}
           `.trim()
        for (let i = 0; i < player.length; i++) {
          let p = player[i]
          setTimeout(() => {
            users[p].healt -= healt * 1
            users[p].sworddurability -= sword * 1
            users[p].Münzen += Münzen * 1
            users[p].exp += exp * 1
            users[p].müll += müll * 1
            users[p].potion += potion * 1
            users[p].Diamant += Diamant * 1
            users[p].iron += iron * 1
            users[p].holz += holz * 1
            users[p].stein += stein * 1
            users[p].schnur += schnur * 1
            users[p].common += common * 1
            users[p].uncommon += uncommon * 1
            users[p].mythic += mythic * 1
            users[p].legendary += legendary * 1
            users[p].pet += pet * 1
            users[p].haustierfutter += haustierfutter * 1
            users[p].lastdungeon = new Date * 1

            if ((users[p].healt * 1) < 1) users[p].healt = 0
            if ((users[p].sworddurability * 1) < 1) {
              users[p].sword -= 1
              users[p].sworddurability = (users[p].sword * 1) * 50
            }
          }, (i * 1) * 1500)
        }
          
        await m.reply(str2, c1, {
          contextInfo: {
            mentionedJid: conn.parseMention(str2)
          }
        })
        if (![c1, c3, c4].includes(c2)) m.reply(str2, c2, {
          contextInfo: {
            mentionedJid: conn.parseMention(str2)
          }
        })
        if (![c1, c2, c4].includes(c3)) m.reply(str2, c3, {
          contextInfo: {
            mentionedJid: conn.parseMention(str2)
          }
        })
        if (![c1, c2, c3].includes(c4)) m.reply(str2, c4, {
          contextInfo: {
            mentionedJid: conn.parseMention(st2)
          }
        })

        if (mythic > 0) {
          let str3 = 'Herzlichen Glückwunsch ' + M(p1) + ', ' + M(p2) + ', ' + M(p3) + ' und ' + M(p4) +' ihr erhalten Gegenstand Rare Total *' + mythic * 4 + '* 📦Mythic Crate'
          await m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
        }

        if (legendary > 0 || pet > 0) {
          let str3 = (mythic > 0 ? 'Und auch' : 'Herzlichen Glückwunsch ' + M(p1) + ', ' + M(p2) + ', ' + M(p3) + ' und ' + M(p4) + ' ihr') + ' erhalten Gegenstand Epic Total ' + (pet > 0 && legendary > 0 ? `*${legendary * 4}* 🎁Legendary Crate und *${pet * 4}* 📦Pet Crate` : pet > 0 && legendary < 1 ? `*${pet * 4}* 📦Pet Crate` : legendary > 0 && pet < 1 ? `*${legendary * 4}* 🎁Legendary Crate` : '')
          await m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
        }

        // Biar mehr simple
        let _1 = users[p1]
        let _2 = users[p2]
        let _3 = users[p3]
        let _4 = users[p4]
        let _H1 = (_1.healt * 1)
        let _H2 = (_2.healt * 1)
        let _H3 = (_3.healt * 1)
        let _H4 = (_4.healt * 1)

        // sd = SwordDurability :v
        let _sd1 = (_1.sworddurability * 1)
        let _sd2 = (_2.sworddurability * 1)
        let _sd3 = (_3.sworddurability * 1)
        let _sd4 = (_4.sworddurability * 1)

        //Peringatan falls Gesundheit sein/ihr 0 oder sword durabilitynya 0
        if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {

          //Sama kek oben biar simple aja :v 
          let s1 = (_sd1 * 1) < 1
          let s2 = (_sd2 * 1) < 1
          let s3 = (_sd3 * 1) < 1
          let s4 = (_sd4 * 1) < 1

          //erstellen nyimpen data während :v
          let HEALT = [], SDH = [], SDM1L = []
          for (let wer in player) {
            if ((users[wer].healt * 1) < 1) HEALT.push(wer)
            if ((users[wer].sworddurability * 1) < 1 && (users[wer].sword * 1) == 1) SDH.push(wer)
            if ((users[wer].sworddurability * 1) < 1 && (users[wer].sword * 1) !== 1) SDM1L.push(wer)
          }

          let sI = data(SDH)
          let sH = data(SDM1L)
          let H = data(HEALT)

          let str3 = `${((SDH || SDH.length > 0) || (SDM1L || SDM1L.length > 0)) ? `⚔️Sword ${((SDH || SDH.length > 0 ? sI + ' Hancur, bitte crafting ⚔️Sword zurück mit mengetik *' + usedPrefix + 'craft sword*' : '') + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ', Sedangkan ⚔️Sword ' : '') + sH + ' Hancur, und Menürun *1* Stufe' : ''))}` : ''}${HEALT || HEALT.length > 0 ? `❤️Leben ${H} verbraucht, bitte Inhalt ❤️Leben mit mengetik ${usedPrefix}heal` : ''}`
          await m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
          if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          })
        }

        //delete annunya biar kann spielen Verlies wieder :V
        delete global.Verlies[room.id]

      }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
      if (global.Verlies && room.state == 'PLAYING') delete global.Verlies[room.id] //Pastiin wieder falls noch gibt wird ilang :v
    }
  } else {
      room = {
          id: 'Verlies-' + (+ new Date),
          player1: m.chat,
          player2: '',
          player3: '',
          player4: '',
          state: 'WAITING',
          spiel: {
              player1: m.sender,
              player2: '',
              player3: '',
              player4: '',
          },
          price: {
              Münzen: (Math.floor(Math.random() * 500001)) * 1,
              exp: (Math.floor(Math.random() * 70001)) * 1,
              müll: (Math.floor(Math.random() * 201)) * 1,
              potion: (Math.floor(Math.random() * 2)) * 1,
              Diamant: (pickRandom([0, 0, 0, 0, 1, 0, 0])) * 1,
              iron: (Math.floor(Math.random() * 2)) * 1,
              holz: (Math.floor(Math.random() * 3)) * 1,
              stein: (Math.floor(Math.random() * 2)) * 1,
              schnur: (Math.floor(Math.random() * 2)) * 1,
              common: (pickRandom([0, 0, 0, 1, 0, 0])) * 1,
              uncommon: (pickRandom([0, 0, 0, 1, 0, 0, 0])) * 1,
              mythic: (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0])) * 1,
              legendary: (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0])) * 1,
              pet: (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1,
              haustierfutter: (pickRandom([0, 0, 0, 1, 0, 0, 0, 0])) * 1,
          },
          less: {
              healt: (Math.floor(Math.random() * 101)) * 1,
              sword: (Math.floor(Math.random() * 50)) * 1,
          }
      }
      if (text) room.name = text
      
      let lmao = 'Warte auf Partner...' + (text ? ` tippe command unter dieser\n${usedPrefix}${command} ${text}` : '') + '\noder tippe *selbst* um alleine zu spielen'
conn.sendMessage(m.chat, {
  text: lmao,
  contextInfo: {
  externalAdReply: {
  title: 'D u n g e o n',
  thumbnailUrl: 'https://telegra.ph/file/750e79e2764d529aea52e.jpg',
  mediaType: 1,
  renderLargerThumbnail: true
  }}})
      global.Verlies[room.id] = room
    }
}

handler.before = function (m) {
global.Verlies = global.Verlies ? global.Verlies : {}
let room = Object.values(global.Verlies).find(room => room.id.startsWith('Verlies-') && [room.spiel.player1, room.spiel.player2, room.spiel.player3, room.spiel.player4].includes(m.sender) && room.state == 'WAITING')
if (room) {

  let p1 = room.spiel.player1 || ''
  let p2 = room.spiel.player2 || ''
  let p3 = room.spiel.player3 || ''
  let p4 = room.spiel.player4 || ''
  let c1 = room.player1 || ''
  let c2 = room.player2 || ''
  let c3 = room.player3 || ''
  let c4 = room.player4 || '' 

  let PLAYER = [room.spiel.player1]
  if (room.spiel.player2) PLAYER.push(room.spiel.player2)
  if (room.spiel.player3) PLAYER.push(room.spiel.player3)
  if (room.spiel.player4) PLAYER.push(room.spiel.player4)
  let P = data(PLAYER)
  if (/^(selbst|dewean|solo)$/i.test(m.text.toLowerCase())) {
      let lmao = 'du nicht kann spielen selbst weil haben partner. Bitte ketik *gass* für spielen mit partner andere...'
      conn.sendMessage(m.chat, {
        text: lmao,
        contextInfo: {
        externalAdReply: {
        title: 'D u n g e o n',
        thumbnailUrl: 'https://telegra.ph/file/750e79e2764d529aea52e.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
        }}})

    if (room.player2 || room.player3 || room.player4) return this.sendMessage(m.chat, lmao, { quoted: m })
    room.state = 'PLAYING'
    let str = `
Room id: ${room.id}

${P}

gerade berperang in Verlies...
`.trim()
    m.reply(str, room.player1, {
      contextInfo: {
        mentionedJid: this.parseMention(str)
      }
    })

    setTimeout(async () => {
      let users = global.db.data.users[p1]
      let { healt, sword } = room.less
      let { exp, Münzen, müll, potion, Diamant, iron, holz, stein, schnur, common, uncommon, mythic, legendary, pet, haustierfutter } = room.price  
      let str2 = `
Leben du verringert -${healt * 1}, und durability Sword du -${sword * 1} weil du hat töten ${pickRandom(['Ender Dragon', 'Baby Dragon', 'Titan', 'Cacing und Semut', 'PP Mikey', 'Person', 'Kecoa', 'Semut', 'Siput', '....', 'Wither', 'Sekeleton', 'Ayam Emas', 'Temenmu', 'Sapi', 'Nein Gibt', 'Creeper', 'Zombie', 'Hewan Pelihraanmu','Diri Sendiri'])} und erhalten
*Exp:* ${exp}
*Geld:* ${Münzen}
*Müll:* ${müll}${potion == 0 ? '' : '\n*Potion:* ' + potion}${haustierfutter == 0 ? '' : '\n*Haustierfutter* ' + haustierfutter * 1}${holz == 0 ? '' : '\n*Holz:* ' + holz}${stein == 0 ? '' : '\n*Stein:* ' + stein}${schnur == 0 ? '' : '\n*Schnur:* ' + schnur}${iron == 0 ? '' : '\n*Iron:* ' + iron}${Diamant == 0 ? '' : '\n*Diamond:* ' + Diamant}${common == 0 ? '' : '\n*Common Crate:* ' + common}${uncommon == 0 ? '' : '\n*Uncommon Crate:* ' + uncommon}
`.trim()
      users.healt -= healt * 1
      users.sworddurability -= sword * 1
      users.Münzen += Münzen * 1
      users.exp += exp * 1
      users.müll += müll * 1
      users.potion += potion * 1
      users.Diamant += Diamant * 1
      users.iron += iron * 1
      users.holz += holz * 1
      users.stein += stein * 1
      users.schnur += schnur * 1
      users.common += common * 1
      users.uncommon += uncommon * 1
      users.mythic += mythic * 1
      users.legendary += legendary * 1
      users.pet += pet * 1
      users.haustierfutter += haustierfutter * 1
      users.lastdungeon = new Date * 1
      await m.reply(str2, room.player1)
      if (mythic > 0) {
        let str3 = 'Herzlichen Glückwunsch du erhalten Gegenstand Rare nämlich *' + mythic + '* Mythic Crate'
        m.reply(str3, room.player1)
      }
      if (legendary > 0 || pet > 0) {
        let str3 = (mythic > 0 ? 'Und auch' : 'Herzlichen Glückwunsch du') + ' erhalten Gegenstand Epic nämlich ' + (pet > 0 && legendary > 0 ? `*${legendary}* Legendary Crate und *${pet}* Pet Crate` : pet > 0 && legendary < 1 ? `*${pet}* Pet Crate` : legendary > 0 && pet < 1 ? `*${legendary}* Legendary Crate` : '')
        m.reply(str3, room.player1)
      }
      if ((users.healt * 1) < 1 || (users.sworddurability * 1) < 1) {
        let sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) == 1
        let _sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 1
        let __sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 0
        let healt1 = (users.healt * 1) < 1
        if (__sword1) {
          users[p1].sword -= 1
          users[p1].sworddurability = 0
        }
        let str3 = `${__sword1 ? ` Sword du ${_sword1 ? ` Stufe sein/ihr verringert 1 weil hancur` : ` Hancur, und bitte crafting Sword zurück mit mengetik ${usedPrefix}`}craft sword` : ''} ${healt1 ? `${__sword1 ? 'Und ' : ''}Leben du verbraucht, bitte Inhalt zurück mit ketik ${usedPrefix}heal` : ''}`
        m.reply(str3, room.player1, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
      }
      delete global.Verlies[room.id]
    }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
    if (global.Verlies && room.state == 'PLAYING') delete global.Verlies[room.id]

  } else if (/^(gass?s?s?s?.?.?.?|starten|los?s?s?.?.?.?)$/i.test(m.text.toLowerCase())) {
      let str = `
Room id: ${room.id}

${P}

gerade berperang in Verlies...
`.trim()
    m.reply(str, c1, {
      contextInfo: {
        mentionedJid: this.parseMention(str)
      }
    })
    if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str, c2, {
      contextInfo: {
        mentionedJid: this.parseMention(str)
      }
    })
    if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str, c3, {
      contextInfo: {
        mentionedJid: this.parseMention(str)
      }
    })
    if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str, c4, {
      contextInfo: {
        mentionedJid: this.parseMention(str)
      }
    })
      
    for (let _p of PLAYER) {
      room.price.Münzen += (Math.floor(Math.random() * 41)) * 1
      room.price.exp += (Math.floor(Math.random() * 76)) * 1
      room.spiel.müll += (Math.floor(Math.random() * 16)) * 1
      room.price.schnur += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
      room.price.holz += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
      room.price.stein += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
      room.spiel.common += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1
    }

    let users = global.db.data.users[m.sender]
    let Person = PLAYER.length
    let { healt, sword } = room.less
    let { exp, Münzen, müll, potion, Diamant, iron, holz, stein, schnur, common, uncommon, mythic, legendary, pet, haustierfutter } = room.price

    setTimeout(async () => {
      let str2 =`
Leben ${P} jeweils jeweils verringert *-${healt * 1}*, und durability Sword ihr jeweils jeweils verringert *-${sword * 1}* weil ihr hat töten *${pickRandom(['Ender Dragon', 'Baby Dragon', 'Titan', 'Cacing und Semut', 'PP Mikey', 'Person', 'Kecoa', 'Semut', 'Siput', '....', 'Wither', 'Sekeleton', 'Ayam Emas', 'Temenmu', 'Sapi', 'Nein Gibt', 'Creeper', 'Zombie', 'Hewan Pelihraanmu','Diri Sendiri'])}* und erhalten total
*Exp:* ${exp * Person}
*Geld:* ${Münzen * Person}
*Müll:* ${müll  * Person}${potion == 0 ? '' : '\n*Potion:* ' + potion * Person}${haustierfutter == 0 ? '' : '\n*Haustierfutter* ' + haustierfutter * Person}${holz == 0 ? '' : '\n*Holz:* ' + holz * Person}${stein == 0 ? '' : '\n*Stein:* ' + stein * Person}${schnur == 0 ? '' : '\n*Schnur:* ' + schnur * Person}${iron == 0 ? '' : '\n*Iron:* ' + iron * Person}${Diamant == 0 ? '' : '\n*Diamond:* ' + Diamant * Person}${common == 0 ? '' : '\n*Common Crate:* ' + common * Person}${uncommon == 0 ? '' : '\n*Uncommon Crate:* ' + uncommon * Person}
`.trim()
      await m.reply(str2, c1, {
        contextInfo: {
          mentionedJid: this.parseMention(str2)
        }
      })
      if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str2, c2, {
        contextInfo: {
          mentionedJid: this.parseMention(str2)
        }
      })
      if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str2, c3, {
        contextInfo: {
          mentionedJid: this.parseMention(str2)
        }
      })
      if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str2, c4, {
        contextInfo: {
          mentionedJid: this.parseMention(str2)
        }
      })
    }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
    for (let i = 0; i < PLAYER.length; i++) {
      let p = PLAYER[i]
      setTimeout(() => {
        users[p].healt -= healt * 1
        users[p].sworddurability -= sword * 1
        users[p].Münzen += Münzen * 1
        users[p].exp += exp * 1
        users[p].müll += müll * 1
        users[p].potion += potion * 1
        users[p].Diamant += Diamant * 1
        users[p].iron += iron * 1
        users[p].holz += holz * 1
        users[p].stein += stein * 1
        users[p].schnur += schnur * 1
        users[p].common += common * 1
        users[p].uncommon += uncommon * 1
        users[p].mythic += mythic * 1
        users[p].legendary += legendary * 1
        users[p].pet += pet * 1
        users[p].haustierfutter += haustierfutter * 1
        users[p].lastdungeon = new Date * 1

        if ((users[p].healt * 1) < 1) users[p].healt = 0
        if ((users[p].sworddurability * 1) < 1) {
          users[p].sword -= 1
          users[p].sworddurability = (users[p].sword * 1) * 50
        }
      }, i * 1500)
    }

    // Nak entok Gegenstand Rare
    if (mythic > 0) {
      let str3 = 'Herzlichen Glückwunsch ' + P + ' ihr erhalten Gegenstand Rare Total *' + mythic * Person + '* Mythic Crate'
      m.reply(str3, c1, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
    }

    // Nak entok Gegenstand Epic
    if (legendary > 0 || pet > 0) {
      let str3 = (mythic > 0 ? 'Und auch' : 'Herzlichen Glückwunsch ' + P + ' ihr') + ' erhalten Gegenstand Epic Total ' + (pet > 0 && legendary > 0 ? `*${legendary * Person}* 🎁Legendary Crate und *${pet * Person}* 📦Pet Crate` : pet > 0 && legendary < 1 ? `*${pet * Person}* 📦Pet Crate` : legendary > 0 && pet < 1 ? `*${legendary * Person}* 🎁Legendary Crate` : '')
      m.reply(str3, c1, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
    }

    // Biar mehr simple
    let _1 = users && p1 && users[p1] ? users[p1] : {}
    let _2 = users && p2 && users[p2] ? users[p2] : {}
    let _3 = users && p3 && users[p3] ? users[p3] : {}
    let _4 = users && p4 && users[p4] ? users[p4] : {}
    let _H1 = _1 && _1.healt ? (_1.healt * 1) : 100
    let _H2 = _2 && _2.healt ? (_2.healt * 1) : 100
    let _H3 = _3 && _3.healt ? (_3.healt * 1) : 100
    let _H4 = _4 && _4.healt ? (_4.healt * 1) : 100

    // sd = SwordDurability :v
    let _sd1 = _1 && _1.sworddurability ? (_1.sworddurability * 1) : 100
    let _sd2 = _2 && _2.sworddurability ? (_2.sworddurability * 1) : 100
    let _sd3 = _3 && _3.sworddurability ? (_3.sworddurability * 1) : 100
    let _sd4 = _4 && _4.sworddurability ? (_4.sworddurability * 1) : 100

    //Peringatan falls Gesundheit sein/ihr 0 oder sword durabilitynya 0
    if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {

      //Sama kek oben biar simple aja :v 
      let s1 = _sd1 ? (_sd1 * 1) < 1 : false
      let s2 = _sd2 ? (_sd2 * 1) < 1 : false
      let s3 = _sd3 ? (_sd3 * 1) < 1 : false
      let s4 = _sd4 ? (_sd4 * 1) < 1 : false

      //erstellen nyimpen data während :v
      let HEALT = [], SDH = [], SDM1L = []
      for (let wer in PLAYER) {
        if ((users[wer].healt * 1) < 1) HEALT.push(wer)
        if ((users[wer].sworddurability * 1) < 1 && (users[wer].sword * 1) == 1) SDH.push(wer)
        if ((users[wer].sworddurability * 1) < 1 && (users[wer].sword * 1) !== 1) SDM1L.push(wer)
      }

      // Convert Array to Schnur
      let sI = data(SDH)
      let sH = data(SDM1L)
      let H = data(HEALT)

      let str3 = `${((SDH || SDH.length > 0) || (SDM1L || SDM1L.length > 0)) ? `⚔️Sword ${((SDH || SDH.length > 0 ? sI + ' Hancur, bitte crafting ⚔️Sword zurück mit mengetik *' + usedPrefix + 'craft sword*' : '') + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ', Sedangkan ⚔️Sword ' : '') + sH + ' Hancur, und Menürun *1* Stufe' : ''))}` : ''}${HEALT || HEALT.length > 0 ? `❤️Leben ${H} verbraucht, bitte Inhalt ❤️Leben mit mengetik ${usedPrefix}heal` : ''}`
      m.reply(str3, c1, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
      if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
        contextInfo: {
          mentionedJid: this.parseMention(str3)
        }
      })
    }
    delete global.Verlies[room.id]
  } 
  if (global.Verlies && room.state == 'PLAYING') delete global.Verlies[room.id] // Löschens nek iseh ono neng Verlies
}

return 
}

handler.help = ['Verlies'].map(v => v + ' *[Name room]*')
handler.tags = ['rpg']
handler.command = /^(Verlies)$/i
handler.rpg = true
handler.mods = false

module.exports = handler

/**
* pickRandom from array
* @param {Array} list 
* @returns *
*/
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

/**
* Message if the conditions are not met
* @param {Number} sword 
* @param {Number} Rüstung 
* @param {Number} healt 
* @param {Schnur} usedPrefix 
* @returns Schnur
*/
function Gegenstand(sword, Rüstung, healt, usedPrefix) {
let sw = (sword * 1) < 1
let a = (Rüstung * 1) < 1
let h = (healt * 1) < 90
let str = `
${sw ? 'du noch nicht haben ⚔️Sword' : ''}${sw && a && h ? ',' : sw && a ? ' und ' : ''} ${a ? '🥼Armor' : ''}${sw && a && h ? ' und Minimal 90 ❤Healt' : h ? 'Minimal 90 ❤Healt' : ''}${sw ? `\nuntuk erhalten ⚔Sword ketik *${usedPrefix}craft sword*` : ''}${a ? `\nuntuk erhalten 🥼Armor ketik *${usedPrefix}buy Rüstung*` : ''}${h ? `\nuntuk hinzufügen ❤Healt ketik *${usedPrefix}heal*` : ''}
`.trim()
return str
}

/**
* To split jid
* @param {Schnur} jid 
* @returns Schnur
*/
function M(jid) {
return '@' + jid.split('@')[0]
}

/**
* To clock
* @param {Number} ms 
* @returns Schnur
*/
function clockSchnur(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toSchnur().padStart(2, 0) ).join(':')
}

/**
* Get data in Array
* @param {Array} DATA ( avaible array length is 4)
* @returns Schnur
*/
function data(DATA) {
let lang = DATA.length * 1
let msg = ''
DATA.forEach(player => {
  if (lang == 1) msg += `*${M(player)}*` 
  else {
    if (DATA.indexOf(player) !== (lang - 1)) msg += `*${M(player)}*, ` 
    else msg += `und *${M(player)}*`
  }
})
return msg
}