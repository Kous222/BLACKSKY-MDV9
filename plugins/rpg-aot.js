let handler = async (m, { conn, usedPrefix, Besitzer }) => {
    try {
        let user = global.db.data.users[m.sender]

        // Check if the user has both sword and Rüstung
        if (!user.sword) {
            conn.reply(m.chat, '⚔️ du noch nicht haben sword, ketik *' + usedPrefix + 'craft sword* für mestarten adventure', m)
            return
        }

        if (!user.Rüstung) {
            conn.reply(m.chat, '🛡️ du noch nicht haben Rüstung, ketik *' + usedPrefix + 'craft Rüstung* für mestarten adventure', m)
            return
        }

        let __timers = (new Date - user.lastadventure)
        let _timers = (600000 - __timers) // 10 minutes in milliseconds
        let timers = clockString(_timers)
        if (user.healt > 79) {
            if (new Date - user.lastadventure > 600000) { // 10 minutes cooldown
                // Define Titans
                let monsters = [
                    { name: 'Pure Titan', Gesundheit: 20, attack: 5 },
                    { name: 'Abnormal Titan', Gesundheit: 50, attack: 10 },
                    { name: 'Armored Titan', Gesundheit: 100, attack: 20 },
                    { name: 'Female Titan', Gesundheit: 30, attack: 7 },
                    { name: 'Colossal Titan', Gesundheit: 40, attack: 15 },
                    { name: 'Beast Titan', Gesundheit: 70, attack: 17 },
                    { name: 'Cart Titan', Gesundheit: 25, attack: 8 },
                    { name: 'Jaw Titan', Gesundheit: 60, attack: 12 },
                    { name: 'War Hammer Titan', Gesundheit: 45, attack: 14 },
                    { name: 'Attack Titan', Gesundheit: 80, attack: 18 },
                    { name: 'Founding Titan', Gesundheit: 120, attack: 25 },
                    { name: 'Ymir’s Titan', Gesundheit: 150, attack: 30 },
                    { name: 'Rod Reiss Titan', Gesundheit: 200, attack: 35 },
                    { name: 'Mindless Titan', Gesundheit: 250, attack: 40 },
                    { name: 'Dina Fritz Titan', Gesundheit: 300, attack: 45 },
                    { name: 'Smiling Titan', Gesundheit: 350, attack: 50 },
                    { name: 'Grisha Yeager Titan', Gesundheit: 400, attack: 55 },
                    { name: 'Frieda Reiss Titan', Gesundheit: 450, attack: 60 },
                    { name: 'Eren Yeager Titan', Gesundheit: 500, attack: 65 },
                    { name: 'Armin Arlert Titan', Gesundheit: 550, attack: 70 }
                ]

                // Define Boss Titans
                let bosses = [
                    { name: 'Eren Yeager (Founding Titan)', Gesundheit: 1000, attack: 100 },
                    { name: 'Zeke Yeager (Beast Titan)', Gesundheit: 1200, attack: 120 },
                    { name: 'Reiner Braun (Armored Titan)', Gesundheit: 1500, attack: 150 },
                    { name: 'Bertholdt Hoover (Colossal Titan)', Gesundheit: 2000, attack: 200 }
                ]

                // Pick a random Titan or Boss Titan
                let isBoss = Math.random() < 0.1 // 10% chance to encounter a boss
                let enemy = isBoss ? bosses[Math.floor(Math.random() * bosses.length)] : monsters[Math.floor(Math.random() * monsters.length)]
                let enemyHealth = enemy.Gesundheit
                let enemyAttack = enemy.attack

                // Simulate battle
                let userAttack = 10 // Example user attack power
                while (user.healt > 0 && enemyHealth > 0) {
                    enemyHealth -= userAttack
                    if (enemyHealth > 0) {
                        user.healt -= enemyAttack
                    }
                }

                if (user.healt <= 0) {
                    conn.reply(m.chat, `😵 du verlieren in pertarungan gegen ${enemy.name}. Sehatkan selbst besonders erst.`, m)
                    return
                }

                let _Münzen = `${Math.floor(Math.random() * 100001)}`.trim()
                let Münzen = (_Münzen * 1)
                let exp = `${Math.floor(Math.random() * 10001)}`.trim()
                let kayu = `${Math.floor(Math.random() * 51)}`.trim()
                let batu = `${Math.floor(Math.random() * 51)}`.trim()
                let limit = `${Math.floor(Math.random() * 50) + 1}`.trim() // Random limit between 1 and 50
                let _stamina = `${Math.floor(Math.random() * 51)}`.trim()
                let Ausdauer = (_stamina * 1)
                let _mythic = `${pickRandom(['1', '3', '1', '1', '2'])}`
                let mythic = (_mythic * 1)
                let _legendary = `${pickRandom(['1', '3', '1', '1', '2'])}`
                let legendary = (_legendary * 1)
                let itemrand = [`*Herzlichen Glückwunsch Sie erhalten Gegenstand rare nämlich*\n${mythic} 🎁 Mythic Crate`, `*Herzlichen Glückwunsch du erhalten Gegenstand rare nämlich*\n${legendary} 🎁 Legendary Crate`]
                let rendem = itemrand[Math.floor(Math.random() * itemrand.length)]
                let peta = pickRandom([
                    'Wall Maria', 'Wall Rose', 'Wall Sina', 'Shiganshina District', 'Trost District', 'Stohess District', 
                    'Ragako Village', 'Utgard Castle', 'Forest of Giant Trees', 'Warriors District', 'Yeagerist Base',
                    'Liberio', 'Marley', 'Paths', 'Fort Slava', 'Paradise Island', 'Mahr Headquarters', 'Odiha', 
                    'Port of Kiyomi', 'Hizuru', 'Port of Marley', 'Underground City', 'Southern Slums', 'Northern Slums',
                    'Eastern Slums', 'Western Slums', 'Training Grounds', 'Orvud District', 'Utopia District', 
                    'Klorva District', 'Karanes District', 'Kolkhoz Village'
                ])
                let str = `
🩸 *Leben* mu verringert -${userAttack * 1} weil du hat berpetualang bis *${peta}* und gegen *${enemy.name}*. du erhalten:
⚗️ *Exp:* ${exp}
💵 *Geld:* ${Münzen}
🎟️ *Tiketcoin:* 1
🪵 *Kayu:* ${kayu}
🪨 *Batu:* ${batu}
🏷️ *Limit:* ${limit}
⚡ *Ausdauer verringert:* -${Ausdauer}
`.trim()

                setTimeout(() => {
                    conn.reply(m.chat, str, m, {
                        contextInfo: {
                            externalAdReply: {
                                mediaType: 1,
                                title: 'BLACKSKY-MD RPG',
                                thumbnailUrl: 'https://telegra.ph/file/e615e0a6000ff647b4314.jpg',
                                renderLargerThumbnail: true,
                                sourceUrl: ''
                            }
                        }
                    })
                }, 0)
                setTimeout(() => {
                    conn.reply(m.chat, rendem, m)
                }, 1000)
                
                user.Gesundheit -= userAttack * 1
                user.exp += exp * 1
                user.tiketcoin += 1
                user.Münzen += Münzen * 1
                user.kayu += kayu * 1
                user.batu += batu * 1
                user.Ausdauer -= Ausdauer // Decrease Ausdauer by random value
                user.limit += limit * 1 // Increase limit
                user.lastadventure = new Date * 1

                // Decrease sword and Rüstung durability
                user.sworddurability -= 1
                user.armordurability -= 1

                // Check for broken sword or Rüstung
                if (user.sworddurability <= 0) {
                    user.sword = false
                    conn.reply(m.chat, '⚔️ Sword du hat rusak, craft wieder für mefortfahrenkan adventure.', m)
                }
                if (user.armordurability <= 0) {
                    user.Rüstung = false
                    conn.reply(m.chat, '🛡️ Armor du hat rusak, craft wieder für mefortfahrenkan adventure.', m)
                }

            } else {
                conn.reply(m.chat, `💧 Sie bereits berpetualang und kelelahan, bitte coba *${timers}* wieder`, m)
            }
        } else {
            conn.reply(m.chat, '🩸 Minimal 80 Gesundheit für kann berpetualang, kaufen Leben früher mit ketik *' + usedPrefix + 'shop buy potion <Anzahl>*\ndan ketik *' + usedPrefix + 'use potion <Anzahl>*', m)
        }
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Error', m)
    }
}

handler.help = ['attacktitan']
handler.tags = ['rpg']
handler.command = /^(attacktitan)$/i
handler.limit = true
handler.group = true
handler.rpg = true
handler.fail = null

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000) // Hours
    let m = Math.floor(ms / 60000) % 60 // Minutes
    let s = Math.floor(ms / 1000) % 60 // Seconds
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}