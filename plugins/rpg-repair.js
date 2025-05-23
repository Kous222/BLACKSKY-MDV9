let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
  let user = global.db.data.users[m.sender]
  global.db.data.users[m.sender].pickaxe = global.db.data.users[m.sender].pickaxe || 0
  global.db.data.users[m.sender].schwert = global.db.data.users[m.sender].schwert || 0
  global.db.data.users[m.sender].fishingrod = global.db.data.users[m.sender].fishingrod || 0
  global.db.data.users[m.sender].bow = global.db.data.users[m.sender].bow || 0
  global.db.data.users[m.sender].katana = global.db.data.users[m.sender].katana || 0
  global.db.data.users[m.sender].axe = global.db.data.users[m.sender].axe || 0
  global.db.data.users[m.sender].Rüstung = global.db.data.users[m.sender].Rüstung || 0

  let caption = `
乂 *R E P A I R*

乂 *L I S T - R E P A I R*
*[ ⛏️ ]* • Pickaxe 
*[ ⚔️ ]* • Sword 
*[ 🎣 ]* • Fishingrod 
*[ 🥼 ]* • Armor 
*[ 🦯 ]* • Katana 
*[ 🪓 ]* • Axe 
*[ 🏹 ]* • Bow 

乂 *M A T E R I A L*
*[ ⛏️ ]* • _Pickaxe_
 • _5_ || *Kayu*
• _3_ || *Batu*
• _3_ || *Iron*
• _1_ || *Diamond*

*[ 🦯 ]* • _Katana_
 • _5_ || *Kayu*
• _10_ || *Batu*
• _20_ || *Iron*
• _10_ || *Diamond*

*[ ⚔️ ]* • _Sword_
• _5_ || Kayu
• _9_ || Iron
• _1_ || Diamond

*[ 🥼 ]* • _Armor_
• _15_ || Iron
• _3_ || Diamond

*[ 🪓 ]* • _Axe_
• _15_ || Iron
• _10_ || Kayu

*[ 🎣 ]* • _FishingRod_
 • _10_ || *Kayu*
• _15_ || *Batu*
• _5_ || *Iron*

*[ 🏹 ]* • _Bow_
 • _15_ || *Kayu*
• _5_ || *Iron*
• _10_ || *String*

_Example_ :
.reparieren _bow_
`
  try {
    if (/repair|reparieren/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
          case 'pickaxe':
          if (user.pickaxedurability > 99) return m.reply('Pickaxe ist noch nicht beschädigt')
          if (user.pickaxe == 0) return m.reply('Du besitzt noch keine Pickaxe')
            if(user.Diamant < 1 || user.batu < 3 || user.kayu < 5 || user.iron < 3 ) return m.reply(`Material für Reparatur nicht genug!`)
             user.batu -= 3
             user.kayu -= 5
             user.iron -= 3
             user.Diamant -= 1
             user.pickaxedurability = 100
            m.reply("Pickaxe erfolgreich repariert")
            break
            case 'katana':
          if (user.katanadurability > 99) return m.reply('Katana ist noch nicht beschädigt')
          if (user.katana == 0) return m.reply('Du besitzt noch keine Katana')
            if(user.Diamant < 10 || user.batu < 10 || user.kayu < 5 || user.iron < 20 ) return m.reply(`Material für Reparatur nicht genug!`)
             user.batu -= 10
             user.kayu -= 5
             user.iron -= 20
             user.Diamant -= 10
             user.katanadurability = 100
            m.reply("Katana erfolgreich repariert")
            break
          case 'sword':
          if (user.sworddurability > 99) return m.reply('Schwert ist noch nicht beschädigt')
          if (user.sword == 0) return m.reply('Du besitzt noch kein Schwert')
            if(user.Diamant < 1 || user.kayu < 5 || user.iron < 9 ) return m.reply(`Material für Reparatur nicht genug!`)
             user.kayu -= 5
             user.iron -= 9
             user.Diamant -= 1
             user.sworddurability = 100
            m.reply("Schwert erfolgreich repariert")
            break
            case 'fishingrod':
          if (user.fishingroddurability > 99) return m.reply('Angelrute ist noch nicht beschädigt')
          if (user.fishingrod == 0) return m.reply('Du besitzt noch keine Angelrute')
            if(user.kayu < 10 || user.batu < 15 || user.iron < 5 ) return m.reply(`Material für Reparatur nicht genug!`)
             user.kayu -= 10
             user.batu -= 15
             user.iron -= 5
             user.fishingroddurability = 100
            m.reply("Angelrute erfolgreich repariert")
            break
            case 'bow':
          if (user.bowdurability > 99) return m.reply('Bogen ist noch nicht beschädigt')
          if (user.bow == 0) return m.reply('Du besitzt noch keinen Bogen')
            if(user.kayu < 15 || user.iron < 5 || user.string < 10 ) return m.reply(`Material für Reparatur nicht genug!`)
             user.kayu -= 10
             user.iron -= 5
             user.string -= 5
             user.bowdurability = 100
            m.reply("Bogen erfolgreich repariert")
            break
            case 'Rüstung':
          if (user.armordurability > 99) return m.reply('Rüstung ist noch nicht beschädigt')
          if (user.Rüstung == 0) return m.reply('Du besitzt noch keine Rüstung')
            if(user.Diamant < 3 || user.iron < 15 ) return m.reply(`Material für Reparatur nicht genug!`)
             user.iron -= 15
             user.Diamant -= 3
             user.armordurability = 100
            m.reply("Rüstung erfolgreich repariert")
            break
            case 'axe':
          if (user.axedurability > 99) return m.reply('Axt ist noch nicht beschädigt')
          if (user.axe == 0) return m.reply('Du besitzt noch keine Axt')
            if(user.kayu < 10 || user.iron < 15 ) return m.reply(`Material für Reparatur nicht genug!`)
             user.iron -= 15
             user.kayu -= 10
             user.axedurability = 100
            m.reply("Axt erfolgreich repariert")
            break
          default:
                    await conn.reply(m.chat, caption, m, {
                        contextInfo: {
                            externalAdReply: {
                                mediaType: 1,
                                title: 'BETABOTZ RPG',
                                thumbnailUrl: 'https://telegra.ph/file/f329ce46c24b0d7e0837e.jpg',
                                renderLargerThumbnail: true,
                                sourceUrl: ''
                            }
                        }
                    });
            }
        } else if (/enchant|enchan/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
            switch (_type) {
                case 't':
                    break;
                case '':
                    break;
                default:
                    m.reply(caption);
            }
        }
    } catch (err) {
        m.reply("Error\n\n\n" + err.stack);
    }
};

handler.help = ['repair', 'reparieren']
handler.tags = ['rpg']
handler.group = true
handler.command = /^(repair|reparieren)/i
handler.rpg = true
module.exports = handler