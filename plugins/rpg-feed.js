let handler = async (m, { conn, args, usedPrefix }) => {
        let info = `
乂 Liste der Haustiere:
🐈 • Katze
🐕 • Hund
🦊 • Fuchs
🐺 • Wolf
🐦‍🔥 • Phönix

*➠ Beispiel:* ${usedPrefix}feed Katze
`.trim()
let nachricht = pickRandom(['ɴʏᴜᴍᴍᴍ~', 'ᴛʜᴀɴᴋs', 'ᴛʜᴀɴᴋʏᴏᴜ ^-^', 'ᴛʜᴀɴᴋ ʏᴏᴜ~', 'ᴀʀɪɢᴀᴛᴏᴜ ^-^'])
    let type = (args[0] || '').toLowerCase()
    let emo = (type == 'fuchs' ? '🦊':'' || type == 'katze' ? '🐈':'' || type == 'hund' ? '🐕':'' || type == 'wolf' ? '🐺':'' || type == 'phonix'? '🐦‍🔥':'' ) 
    let user = global.db.data.users[m.sender]
    let fuchs = global.db.data.users[m.sender].fuchs
    let katze = global.db.data.users[m.sender].katze
    let hund = global.db.data.users[m.sender].hund
    let wolf = global.db.data.users[m.sender].wolf
    let phonix = global.db.data.users[m.sender].phonix
    switch (type) {
        case 'fuchs':
            if (fuchs == 0) return m.reply('*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen')
            if (fuchs == 10) return m.reply('Dein Haustier hat das maximale Stufe erreicht!')
            let __waktur = (new Date - user.fuchslastclaim)
            let _waktur = (600000 - __waktur)
            let waktur = clockString(_waktur)
            if (new Date - user.fuchslastclaim > 600000) {
                if (user.haustierfutter > 0) {
                    user.haustierfutter -= 1
                    user.fuchsexp += 20
                    user.fuchslastclaim = new Date * 1
                    m.reply(`Fütterung von *${type}*...\n*${emo} :* ${nachricht}`)
                    if (fuchs > 0) {
                        let naiklvl = ((fuchs * 100) - 1)
                        if (user.fuchsexp > naiklvl) {
                            user.fuchs += 1
                            user.fuchsexp -= (fuchs * 100)
                            m.reply(`*Herzlichen Glückwunsch!* Dein Haustier ist aufgestiegen`)
                        }
                    }
                } else m.reply(`*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen`)
            } else m.reply(`Dein Haustier ist satt, versuche es in\n➞ *${waktur}* noch einmal zu füttern`)
            break
        case 'katze':
            if (katze == 0) return m.reply('*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen')
            if (katze == 10) return m.reply('Dein Haustier hat das maximale Stufe erreicht!')
            let __waktuc = (new Date - user.katzelastclaim)
            let _waktuc = (600000 - __waktuc)
            let waktuc = clockString(_waktuc)
            if (new Date - user.katzelastclaim > 600000) {
                if (user.haustierfutter > 0) {
                    user.haustierfutter -= 1
                    user.katzexp += 20
                    user.katzelastclaim = new Date * 1
                    m.reply(`Fütterung von *${type}*...\n*${emo} :* ${nachricht}`)
            
                    if (katze > 0) {
                        let naiklvl = ((katze * 100) - 1)
                        if (user.katzexp > naiklvl) {
                            user.katze += 1
                            user.katzexp -= (katze * 100)
                            m.reply(`*Herzlichen Glückwunsch!* Dein Haustier ist aufgestiegen`)
                        }
                    }
                } else m.reply(`*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen`)
            } else m.reply(`Dein Haustier ist satt, versuche es in\n➞ *${waktuc}* noch einmal zu füttern`)
            break
        case 'wolf':
            if (wolf == 0) return m.reply('*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen')
            if (wolf == 10) return m.reply('Dein Haustier hat das maximale Stufe erreicht!')
            let __waktub = (new Date - user.wolflastclaim)
            let _waktub = (600000 - __waktub)
            let waktub = clockString(_waktub)
            if (new Date - user.wolflastclaim > 600000) {
                if (user.haustierfutter > 0) {
                    user.haustierfutter -= 1
                    user.wolfexp += 20
                    user.wolflastclaim = new Date * 1
                    m.reply(`Fütterung von *${type}*...\n*${emo} :* ${nachricht}`)
            
                    if (wolf > 0) {
                        let naiklvl = ((wolf * 100) - 1)
                        if (user.wolfexp > naiklvl) {
                            user.wolf += 1
                            user.wolfexp -= (wolf * 100)
                            m.reply(`*Herzlichen Glückwunsch!* Dein Haustier ist aufgestiegen`)
                        }
                    }
                } else m.reply(`*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen`)
            } else m.reply(`Dein Haustier ist satt, versuche es in\n➞ *${waktub}* noch einmal zu füttern`)
            break
        case 'hund':
            if (hund == 0) return m.reply('*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen')
            if (hund == 10) return m.reply('Dein Haustier hat das maximale Stufe erreicht!')
            let __waktua = (new Date - user.hundlastclaim)
            let _waktua = (600000 - __waktua)
            let waktua = clockString(_waktua)
            if (new Date - user.hundlastclaim > 600000) {
                if (user.haustierfutter > 0) {
                    user.haustierfutter -= 1
                    user.hundexp += 20
                    user.hundlastclaim = new Date * 1
                    m.reply(`Fütterung von *${type}*...\n*${emo} :* ${nachricht}`)
                    if (hund > 0) {
                        let naiklvl = ((hund * 100) - 1)
                        if (user.hundexp > naiklvl) {
                            user.hund += 1
                            user.hundexp -= (hund * 100)
                            m.reply(`*Herzlichen Glückwunsch!* Dein Haustier ist aufgestiegen`)
                        }
                    }
                } else m.reply(`*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen`)
            } else m.reply(`Dein Haustier ist satt, versuche es in\n➞ *${waktua}* noch einmal zu füttern`)
            break
        case 'phonix':
            if (phonix == 0) return m.reply('*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen')
            if (phonix == 10) return m.reply('Dein Haustier hat das maximale Stufe erreicht!')
            let __waktuk = (new Date - user.phonixlastclaim)
            let _waktuk = (600000 - __waktuk)
            let waktuk = clockString(_waktuk)
            if (new Date - user.phonixlastclaim > 600000) {
                if (user.haustierfutter > 0) {
                    user.haustierfutter -= 1
                    user.phonixexp += 20
                    user.phonixlastclaim = new Date * 1
                    m.reply(`Fütterung von *${type}*...\n*${emo} :* ${nachricht}`)
                    if (phonix > 0) {
                        let naiklvl = ((phonix * 100) - 1)
                        if (user.phonixexp > naiklvl) {
                            user.phonix += 1
                            user.phonixexp -= (phonix * 100)
                            m.reply(`*Herzlichen Glückwunsch!* Dein Haustier ist aufgestiegen`)
                        }
                    }
                } else m.reply(`*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen`)
            } else m.reply(`Dein Haustier ist satt, versuche es in\n➞ *${waktuk}* noch einmal zu füttern`)
            break
        case 'robo':
            if (robot == 0) return m.reply('*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen')
            if (robot == 10) return m.reply('Dein Haustier hat das maximale Stufe erreicht!')
            let __wakturb = (new Date - user.robolastfeed)
            let _wakturb = (600000 - __wakturb)
            let wakturb = clockString(_wakturb)
            if (new Date - user.robolastfeed > 600000) {
                if (user.haustierfutter > 0) {
                    user.haustierfutter -= 1
                    user.roboexp += 20
                    user.robolastfeed = new Date * 1
                    m.reply(`Fütterung von *${type}*...\n*${emo} :* ${nachricht}`)
                    if (robot > 0) {
                        let naiklvl = ((robot * 100) - 1)
                        if (user.roboexp > naiklvl) {
                            user.robo += 1
                            user.roboexp -= (robot * 100)
                            m.reply(`*Herzlichen Glückwunsch!* Dein Haustier ist aufgestiegen`)
                        }
                    }
                } else m.reply(`*Du hast kein Futter für dein Haustier*\n\n> Tippe .shop buy haustierfutter\num Futter zu kaufen`)
            } else m.reply(`Dein Haustier ist satt, versuche es in\n➞ *${wakturb}* noch einmal zu füttern`)
            break
        default:
            return m.reply(info)
    }
}
handler.help = ['feed']
handler.tags = ['rpg']
handler.command = /^(feed(ing)?)$/i

handler.register = true
handler.rpg = true
module.exports = handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' Std ', m, ' Min ', s, ' Sek'].map(v => v.toString().padStart(2, 0)).join('')
}
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}