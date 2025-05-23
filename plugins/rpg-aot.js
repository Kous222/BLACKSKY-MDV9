
let handler = async (m, { conn, usedPrefix, Besitzer }) => {
    try {
        let user = global.db.data.users[m.sender]

        // Überprüfen ob der Nutzer sowohl ein Schwert als auch eine Rüstung hat
        if (!user.sword) {
            conn.reply(m.chat, '⚔️ Du hast noch kein Schwert. Tippe *' + usedPrefix + 'craft sword*, um dein Abenteuer zu starten.', m)
            return
        }

        if (!user.Rüstung) {
            conn.reply(m.chat, '🛡️ Du hast noch keine Rüstung. Tippe *' + usedPrefix + 'craft Rüstung*, um dein Abenteuer zu starten.', m)
            return
        }

        let __timers = (new Date - user.lastadventure)
        let _timers = (600000 - __timers) // 10 Minuten in Millisekunden
        let timers = clockString(_timers)

        if (user.healt > 79) {
            if (new Date - user.lastadventure > 600000) { // 10 Minuten Cooldown

                // Titanen definieren
                let monsters = [
                    { name: 'Reiner Titan', Gesundheit: 20, attack: 5 },
                    { name: 'Abnormer Titan', Gesundheit: 50, attack: 10 },
                    { name: 'Gepanzerter Titan', Gesundheit: 100, attack: 20 },
                    { name: 'Weiblicher Titan', Gesundheit: 30, attack: 7 },
                    { name: 'Kolossaler Titan', Gesundheit: 40, attack: 15 },
                    { name: 'Bestientitan', Gesundheit: 70, attack: 17 },
                    { name: 'Karrentitan', Gesundheit: 25, attack: 8 },
                    { name: 'Kiefertitan', Gesundheit: 60, attack: 12 },
                    { name: 'Kriegshammertitan', Gesundheit: 45, attack: 14 },
                    { name: 'Angriffstitan', Gesundheit: 80, attack: 18 },
                    { name: 'Urtitan', Gesundheit: 120, attack: 25 },
                    { name: 'Ymir’s Titan', Gesundheit: 150, attack: 30 },
                    { name: 'Rod Reiss Titan', Gesundheit: 200, attack: 35 },
                    { name: 'Geistloser Titan', Gesundheit: 250, attack: 40 },
                    { name: 'Dina Fritz Titan', Gesundheit: 300, attack: 45 },
                    { name: 'Lächelnder Titan', Gesundheit: 350, attack: 50 },
                    { name: 'Grisha Yeager Titan', Gesundheit: 400, attack: 55 },
                    { name: 'Frieda Reiss Titan', Gesundheit: 450, attack: 60 },
                    { name: 'Eren Yeager Titan', Gesundheit: 500, attack: 65 },
                    { name: 'Armin Arlert Titan', Gesundheit: 550, attack: 70 }
                ]

                // Boss-Titanen definieren
                let bosses = [
                    { name: 'Eren Yeager (Urtitan)', Gesundheit: 1000, attack: 100 },
                    { name: 'Zeke Yeager (Bestientitan)', Gesundheit: 1200, attack: 120 },
                    { name: 'Reiner Braun (Gepanzerter Titan)', Gesundheit: 1500, attack: 150 },
                    { name: 'Bertholdt Hoover (Kolossaler Titan)', Gesundheit: 2000, attack: 200 }
                ]

                // Zufälliger Gegner (Boss mit 10 % Wahrscheinlichkeit)
                let isBoss = Math.random() < 0.1
                let enemy = isBoss ? bosses[Math.floor(Math.random() * bosses.length)] : monsters[Math.floor(Math.random() * monsters.length)]
                let enemyHealth = enemy.Gesundheit
                let enemyAttack = enemy.attack

                // Kampf simulieren
                let userAttack = 10
                while (user.healt > 0 && enemyHealth > 0) {
                    enemyHealth -= userAttack
                    if (enemyHealth > 0) {
                        user.healt -= enemyAttack
                    }
                }

                if (user.healt <= 0) {
                    conn.reply(m.chat, `😵 Du hast im Kampf gegen *${enemy.name}* verloren. Heile dich zuerst.`, m)
                    return
                }

                // Belohnungen
                let _Münzen = `${Math.floor(Math.random() * 100001)}`
                let Münzen = (_Münzen * 1)
                let exp = `${Math.floor(Math.random() * 10001)}`
                let kayu = `${Math.floor(Math.random() * 51)}`
                let batu = `${Math.floor(Math.random() * 51)}`
                let limit = `${Math.floor(Math.random() * 50) + 1}`
                let _stamina = `${Math.floor(Math.random() * 51)}`
                let Ausdauer = (_stamina * 1)
                let mythic = Number(pickRandom(['1', '3', '1', '1', '2']))
                let legendary = Number(pickRandom(['1', '3', '1', '1', '2']))
                let itemrand = [
                    `*Glückwunsch! Du hast einen seltenen Gegenstand erhalten:*\n${mythic} 🎁 Mythic Crate`,
                    `*Glückwunsch! Du hast einen seltenen Gegenstand erhalten:*\n${legendary} 🎁 Legendary Crate`
                ]
                let rendem = itemrand[Math.floor(Math.random() * itemrand.length)]

                let peta = pickRandom([
                    'Wall Maria', 'Wall Rose', 'Wall Sina', 'Shiganshina', 'Trost', 'Stohess', 'Ragako', 'Utgard', 'Wald der Giganten',
                    'Kriegerbasis', 'Yeageristenstützpunkt', 'Liberio', 'Marley', 'Pfadwelt', 'Fort Slava', 'Paradiesinsel',
                    'Mahr-Hauptquartier', 'Odiha', 'Hafen von Kiyomi', 'Hizuru', 'Hafen von Marley', 'Untergrundstadt',
                    'Südliche Slums', 'Nördliche Slums', 'Östliche Slums', 'Westliche Slums', 'Trainingsgelände',
                    'Orvud', 'Utopia', 'Klorva', 'Karanes', 'Kolkhoz'
                ])

                let str = `
🩸 *Leben verloren:* -${userAttack} durch das Abenteuer in *${peta}* gegen *${enemy.name}*. Du erhältst:
⚗️ *Erfahrung:* ${exp}
💵 *Geld:* ${Münzen}
🎟️ *Tiketcoin:* 1
🪵 *Holz:* ${kayu}
🪨 *Stein:* ${batu}
🏷️ *Limit:* ${limit}
⚡ *Ausdauer verloren:* -${Ausdauer}
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

                // Daten aktualisieren
                user.Gesundheit -= userAttack
                user.exp += exp * 1
                user.tiketcoin += 1
                user.Münzen += Münzen
                user.kayu += kayu * 1
                user.batu += batu * 1
                user.Ausdauer -= Ausdauer
                user.limit += limit * 1
                user.lastadventure = new Date * 1

                // Haltbarkeit verringern
                user.sworddurability -= 1
                user.armordurability -= 1

                if (user.sworddurability <= 0) {
                    user.sword = false
                    conn.reply(m.chat, '⚔️ Dein Schwert ist zerbrochen. Stelle ein neues her, um weiterzukämpfen.', m)
                }

                if (user.armordurability <= 0) {
                    user.Rüstung = false
                    conn.reply(m.chat, '🛡️ Deine Rüstung ist zerbrochen. Stelle eine neue her, um weiterzukämpfen.', m)
                }

            } else {
                conn.reply(m.chat, `💧 Du bist erschöpft. Bitte warte *${timers}*, bevor du erneut ein Abenteuer startest.`, m)
            }
        } else {
            conn.reply(m.chat, '🩸 Du brauchst mindestens 80 Leben, um ein Abenteuer zu starten. Kaufe vorher Tränke mit:\n*' + usedPrefix + 'shop buy potion <Anzahl>*\nund benutze sie mit:\n*' + usedPrefix + 'use potion <Anzahl>*', m)
        }
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Ein Fehler ist aufgetreten.', m)
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
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
