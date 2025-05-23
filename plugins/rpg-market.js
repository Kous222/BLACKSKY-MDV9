let { MessageType } = require('@adiwajshing/baileys')
const Skepiting = 7000
const Slobster = 7000
const Sudang = 7000
const Scumi = 7000
const Sgurita = 7000
const Sbuntal = 7000
const Sdory = 7000
const Sorca = 7000
const Slumba = 7000
const Spaus = 7000
const Sikan = 7000
const Shiu = 7000
const Sbanteng = 9000
const Sharimau = 9000
const Sgajah = 9000
const Skambing = 9000
const Spanda = 9000
const Sbuaya = 9000
const Skerbau = 9000
const Ssapi= 9000
const Smonyet = 9000
const Sbabihutan = 9000
const Sbabi = 9000
const Sayam = 9000
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    const _armor = global.db.data.users[m.sender].Rüstung
    const Rüstung = (_armor == 0 ? 20000 : '' || _armor == 1 ? 49999 : '' || _armor == 2 ? 99999 : '' || _armor == 3 ? 149999 : '' || _armor == 4 ? 299999 : '')
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
    const Kchat = `━━━━━━━━━━━━━━━━━
*🌱 Tier   | 💲 Verkaufspreis*\n━━━━━━━━━━━━━━━━━\n
🦀 Krabbe:        ${Skepiting}
🦞 Hummer:       ${Slobster}
🦐 Garnele:       ${Sudang}
🦑 Tintenfisch:   ${Scumi}
🐙 Krake:         ${Sgurita}
🐡 Kugelfisch:    ${Sbuntal}
🐠 Doktorfisch:   ${Sdory}
🐳 Orca:          ${Sorca}
🐬 Delfin:        ${Slumba}
🐋 Wal:           ${Spaus}
🦈 Hai:           ${Shiu}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐃 Banteng:      ${Sbanteng}
🐅 Tiger:         ${Sharimau}
🐘 Elefant:       ${Sgajah}
🐐 Ziege:         ${Skambing}
🐼 Panda:         ${Spanda}
🐃 Büffel:        ${Skerbau}
🐊 Krokodil:      ${Sbuaya}
🐂 Kuh:           ${Ssapi}
🐒 Affe:          ${Smonyet}
🐗 Wildschwein:   ${Sbabihutan}
🐖 Schwein:       ${Sbabi}
🐔 Huhn:          ${Sayam}\n━━━━━━━━━━━━━━━━━\n━━━━━━━━━━━━━━━━━
🧪 *Verwendungsbeispiel:*
#Markt verkaufen huhn
`.trim()
    try {
        if (/Markt|Geschäft/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
            const müll = global.db.data.users[m.sender].müll
            switch (jualbeli) {
           /* case 'buy':
                switch (_type) {
                    case 'potion':
                            if (global.db.data.users[m.sender].Münzen >= potion * count) {
                                global.db.data.users[m.sender].Münzen -= potion * count
                                global.db.data.users[m.sender].potion += count * 1
                                conn.reply(m.chat, `Erfolgreich gekauft: ${count} Trank für ${potion * count} Münzen \n\nVerwende den Trank mit: *${usedPrefix}use potion <Anzahl>*`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Trank für ${potion * count} Münzen `,)
                        break
                    case 'Diamant':
                            if (global.db.data.users[m.sender].Münzen >= Bdiamond * count) {
                                global.db.data.users[m.sender].Diamant += count * 1
                                global.db.data.users[m.sender].Münzen -= Bdiamond * count
                                conn.reply(m.chat, `Erfolgreich gekauft: ${count} Diamanten für ${Bdiamond * count} Münzen`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld`, m)
                        
                        break
                    case 'common':
                            if (global.db.data.users[m.sender].Münzen >= Bcommon * count) {
                                global.db.data.users[m.sender].common += count * 1
                                global.db.data.users[m.sender].Münzen -= Bcommon * count
                                conn.reply(m.chat, `Erfolgreich gekauft: ${count} Gemeine Kiste für ${Bcommon * count} Münzen`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Gemeine Kiste für ${Bcommon * count} Münzen \n\nÖffne Kiste mit: *${usedPrefix}open common*`, m)
                        
                        break
                    case 'uncommon':
                            if (global.db.data.users[m.sender].Münzen >= Buncommon * count) {
                                global.db.data.users[m.sender].uncommon += count * 1
                                global.db.data.users[m.sender].Münzen -= Buncommon * count
                                conn.reply(m.chat, `Erfolgreich gekauft: ${count} Ungewöhnliche Kiste für ${Buncommon * count} Münzen`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Ungewöhnliche Kiste für ${Buncommon * count} Münzen \n\nÖffne Kiste mit: *${usedPrefix}open uncommon*`, m)
                        
                        break
                    case 'mythic':
                            if (global.db.data.users[m.sender].Münzen >= Bmythic * count) {
                                    global.db.data.users[m.sender].mythic += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmythic * count
                                conn.reply(m.chat, `Erfolgreich gekauft: ${count} Mythische Kiste für ${Bmythic * count} Münzen`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Mythische Kiste für ${Bmythic* count} Münzen\n\nÖffne Kiste mit: *${usedPrefix}open mythic*`, m)
                        
                        break
                    case 'legendary':
                            if (global.db.data.users[m.sender].Münzen >= Blegendary * count) {
                                global.db.data.users[m.sender].legendary += count * 1
                                global.db.data.users[m.sender].Münzen -= Blegendary * count
                                conn.reply(m.chat, `Erfolgreich gekauft: ${count} Legendäre Kiste für ${Blegendary * count} Münzen`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Legendäre Kiste für ${Blegendary * count} Münzen \n\nÖffne Kiste mit: *${usedPrefix}open legendary*`, m)
                        
                        break
                    case 'müll':
                            if (global.db.data.users[m.sender].Münzen >= Bmüll * count) {
                                global.db.data.users[m.sender].müll += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmüll * count
                                conn.reply(m.chat, `Erfolgreich gekauft: ${count} Müll für ${Bmüll * count} Münzen`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Müll für ${Bmüll * count} Münzen`.trim(), m)
                        
                        break
                    case 'Rüstung':
                            if (global.db.data.users[m.sender].Rüstung == 5) return conn.reply(m.chat, 'Deine Rüstung hat bereits die *maximale Stufe* erreicht', m)
                            if (global.db.data.users[m.sender].Münzen > Rüstung) {
                                global.db.data.users[m.sender].Rüstung += 1
                                global.db.data.users[m.sender].Münzen -= Rüstung * 1
                                conn.reply(m.chat, `Rüstung erfolgreich für ${Rüstung} Münzen gekauft` ,m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf einer Rüstung für ${Rüstung} Münzen`, m)
                        
                        break
                    default:
                        return conn.reply(m.chat, Kchat, m)
                }
                break*/
            case 'verkaufen': 
                switch (_type) {                  
                     case 'banteng':
                        if (global.db.data.users[m.sender].banteng >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spaus * count
                            global.db.data.users[m.sender].banteng -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Banteng für ${Sbanteng * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Banteng`.trim(), m)
                        break
                        case 'harimau':
                        if (global.db.data.users[m.sender].harimau >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sharimau * count
                            global.db.data.users[m.sender].harimau -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Tagemau für ${Sharimau * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Tiger`.trim(), m)
                        break
                        case 'gajah':
                        if (global.db.data.users[m.sender].gajah >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sgajah * count
                            global.db.data.users[m.sender].gajah -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Gajah für ${Sgajah * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Elefant`.trim(), m)
                        break
                        case 'kambing':
                        if (global.db.data.users[m.sender].kambing >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skambing * count
                            global.db.data.users[m.sender].kambing -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Kambing für ${Skambing * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Ziege`.trim(), m)
                        break
                        case 'panda':
                        if (global.db.data.users[m.sender].panda >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spanda * count
                            global.db.data.users[m.sender].panda -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Panda für ${Sbuaya * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Panda`.trim(), m)
                        break
                        case 'buaya':
                        if (global.db.data.users[m.sender].buaya >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbuaya * count
                            global.db.data.users[m.sender].buaya -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Buaya für ${Sbuaya * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krokodil`.trim(), m)
                        break
                        case 'kerbau':
                        if (global.db.data.users[m.sender].kerbau >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skerbau * count
                            global.db.data.users[m.sender].kerbau -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Kerbau für ${Skerbau * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Büffel`.trim(), m)
                        break
                        case 'sapi':
                        if (global.db.data.users[m.sender].sapi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Ssapi * count
                            global.db.data.users[m.sender].sapi -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Sapi für ${Ssapi * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Kuh`.trim(), m)
                        break
                        case 'monyet':
                        if (global.db.data.users[m.sender].monyet >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Smonyet * count
                            global.db.data.users[m.sender].monyet -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Monyet für ${Smonyet * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Affe`.trim(), m)
                        break
                        case 'babi':
                        if (global.db.data.users[m.sender].babi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].babi -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Babi für ${Sbabi * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Schwein`.trim(), m)
                        break
                        case 'babihutan':
                        if (global.db.data.users[m.sender].babihutan >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbabihutan * count
                            global.db.data.users[m.sender].babihutan -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Babi Hutan für ${Sbabihutan * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Wildschwein`.trim(), m)
                        break
                        case 'ayam':
                        if (global.db.data.users[m.sender].ayam >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sayam * count
                            global.db.data.users[m.sender].ayam -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Ayam für ${Sayam * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Huhn`.trim(), m)
                        break
                        //angeln
                        case 'kepiting':
                        if (global.db.data.users[m.sender].kepiting >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].kepiting -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Kepiting für ${Skepiting * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krabbe`.trim(), m)
                        break
                        case 'ikan':
                        if (global.db.data.users[m.sender].ikan >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].ikan -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Ikan für ${Sikan * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Fisch`.trim(), m)
                        break
                        case 'dory':
                        if (global.db.data.users[m.sender].dory >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sdory * count
                            global.db.data.users[m.sender].dory -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Ikan Dory für ${Sdory * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Dory-Fisch`.trim(), m)
                        break
                        case 'gurita':
                        if (global.db.data.users[m.sender].gurita >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].gurita -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Gurita für ${Sgurita * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krake`.trim(), m)
                        break
                        case 'buntal':
                        if (global.db.data.users[m.sender].buntal >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbuntal * count
                            global.db.data.users[m.sender].buntal -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Ikan Buntal für ${Sbuntal * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Kugelfisch`.trim(), m)
                        break
                        case 'hiu':
                        if (global.db.data.users[m.sender].hiu >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Shiu * count
                            global.db.data.users[m.sender].hiu -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Hiu für ${Shiu * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Hai`.trim(), m)
                        break
                        case 'orca':
                        if (global.db.data.users[m.sender].orca >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sorca * count
                            global.db.data.users[m.sender].orca -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Paus Orca für ${Sorca * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Orca`.trim(), m)
                        break
                        case 'lumba':
                        if (global.db.data.users[m.sender].lumba >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].lumba -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Lumba Lumba für ${Slumba * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Delfin`.trim(), m)
                        break
                        case 'paus':
                        if (global.db.data.users[m.sender].paus >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spaus * count
                            global.db.data.users[m.sender].paus -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Paus für ${Spaus * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Wal`.trim(), m)
                        break
                  case 'lobster':
                        if (global.db.data.users[m.sender].lobster >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Slobster * count
                            global.db.data.users[m.sender].lobster -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Lobster für ${Slobster * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Hummer`.trim(), m)
                        break
                     case 'udang':
                        if (global.db.data.users[m.sender].udang >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sudang * count
                            global.db.data.users[m.sender].udang -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Udang für ${Sudang * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Garnele`.trim(), m)
                        break
                      case 'cumi':
                        if (global.db.data.users[m.sender].cumi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Scumi * count
                            global.db.data.users[m.sender].cumi -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Cumi für ${Scumi * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Tintenfisch`.trim(), m)
                        break
                    default:
                        return conn.reply(m.chat, Kchat, m)
                }
                break
            default:
                return conn.sendFile(m.chat, thumb, 'Markt.jpg', `${Kchat}`, m)
            }
      /*  } else if (/kaufen|buy/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
                case 'potion':
                        if (global.db.data.users[m.sender].Münzen >= potion * count) {
                            global.db.data.users[m.sender].Münzen -= potion * count
                            global.db.data.users[m.sender].potion += count * 1
                            conn.reply(m.chat, `Erfolgreich gekauft: ${count} Trank für ${potion * count} Münzen \n\nVerwende den Trank mit: *${usedPrefix}use potion <Anzahl>*`, m)
                        } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Potion für ${potion * count} Münzen`,m)
                    
                    break
                case 'Diamant':
                        if (global.db.data.users[m.sender].Münzen >= Bdiamond * count) {
                            global.db.data.users[m.sender].Diamant += count * 1
                            global.db.data.users[m.sender].Münzen -= Bdiamond * count
                            conn.reply(m.chat, `Erfolgreich gekauft ${count} Diamond für ${Bdiamond * count} Münzen `, m)
                        } else conn.reply(m.chat, `Du hast nicht genug Geld `, m)
                    
                    break
                case 'common':
                        if (global.db.data.users[m.sender].Münzen >= Bcommon * count) {
                            global.db.data.users[m.sender].common += count * 1
                            global.db.data.users[m.sender].Münzen -= Bcommon * count
                            conn.reply(m.chat, `Erfolgreich gekauft ${count} Common Crate für ${Bcommon * count} Münzen `, m)
                        } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Common Crate für ${Bcommon * count} Münzen \n\nÖffne Kiste mit Tippe : *${usedPrefix}open common*`, m)
                    
                    break
                case 'uncommon':
                        if (global.db.data.users[m.sender].Münzen >= Buncommon * count) {
                            global.db.data.users[m.sender].uncommon += count * 1
                            global.db.data.users[m.sender].Münzen -= Buncommon * count
                            conn.reply(m.chat, `Erfolgreich gekauft ${count} Uncommon Crate für ${Buncommon * count} Münzen `, m)
                        } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Uncommon Crate für ${Buncommon * count} Münzen \n\nÖffne Kiste mit Tippe: *${usedPrefix}open uncommon*`, m)
                   
                    break
                case 'mythic':
                        if (global.db.data.users[m.sender].Münzen >= Bmythic * count) {
                            global.db.data.users[m.sender].mythic += count * 1
                            global.db.data.users[m.sender].Münzen -= Bmythic * count
                            conn.reply(m.chat, `Erfolgreich gekauft: ${count} Mythische Kiste für ${Bmythic * count} Münzen`, m)
                        } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Mythische Kiste für ${Bmythic* count} Münzen\n\nÖffne Kiste mit: *${usedPrefix}open mythic*`, m)
                    
                    break
                case 'legendary':
                        if (global.db.data.users[m.sender].Münzen >= Blegendary * count) {
                            global.db.data.users[m.sender].legendary += count * 1
                            global.db.data.users[m.sender].Münzen -= Blegendary * count
                            conn.reply(m.chat, `Erfolgreich gekauft: ${count} Legendäre Kiste für ${Blegendary * count} Münzen`, m)
                        } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Legendäre Kiste für ${Blegendary * count} Münzen\n\nÖffne Kiste mit: *${usedPrefix}open legendary*`, m)
                    
                    break
                case 'müll':
                        if (global.db.data.users[m.sender].Münzen >= Bmüll * count) {
                            global.db.data.users[m.sender].müll += count * 1
                            global.db.data.users[m.sender].Münzen -= Bmüll * count
                            conn.reply(m.chat, `Erfolgreich gekauft: ${count} Müll für ${Bmüll * count} Münzen`, m)
                        } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf von ${count} Müll für ${Bmüll * count} Münzen`.trim(), m)
                    
                    break
                case 'Rüstung':
                        if (global.db.data.users[m.sender].Rüstung == 5) return conn.reply(m.chat, 'Deine Rüstung hat bereits die *maximale Stufe* erreicht', m)
                        if (global.db.data.users[m.sender].Münzen > Rüstung * 1) {
                            global.db.data.users[m.sender].Rüstung += 1
                            global.db.data.users[m.sender].Münzen -= Rüstung * 1
                            conn.reply(m.chat, `Rüstung erfolgreich für ${Rüstung} Münzen gekauft` ,m)
                          
                        } else conn.reply(m.chat, `Du hast nicht genug Geld zum Kauf einer Rüstung für ${Rüstung} Münzen`, m)
                    
                    break
                default:
                    return conn.reply(m.chat, Kchat, m)
            }*/
        } else if (/sell|verkaufen|/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) { 
                       case 'banteng':
                        if (global.db.data.users[m.sender].banteng >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spaus * count
                            global.db.data.users[m.sender].banteng -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Banteng für ${Sbanteng * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Banteng`.trim(), m)
                        break
                        case 'harimau':
                        if (global.db.data.users[m.sender].harimau >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sharimau * count
                            global.db.data.users[m.sender].harimau -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Tagemau für ${Sharimau * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Tiger`.trim(), m)
                        break
                        case 'gajah':
                        if (global.db.data.users[m.sender].gajah >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sgajah * count
                            global.db.data.users[m.sender].gajah -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Gajah für ${Sgajah * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Elefant`.trim(), m)
                        break
                        case 'kambing':
                        if (global.db.data.users[m.sender].kambing >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skambing * count
                            global.db.data.users[m.sender].kambing -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Kambing für ${Skambing * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Ziege`.trim(), m)
                        break
                        case 'panda':
                        if (global.db.data.users[m.sender].panda >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spanda * count
                            global.db.data.users[m.sender].panda -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Panda für ${Sbuaya * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Panda`.trim(), m)
                        break
                        case 'buaya':
                        if (global.db.data.users[m.sender].buaya >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbuaya * count
                            global.db.data.users[m.sender].buaya -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Buaya für ${Sbuaya * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krokodil`.trim(), m)
                        break
                        case 'kerbau':
                        if (global.db.data.users[m.sender].kerbau >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skerbau * count
                            global.db.data.users[m.sender].kerbau -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Kerbau für ${Skerbau * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Büffel`.trim(), m)
                        break
                        case 'sapi':
                        if (global.db.data.users[m.sender].sapi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Ssapi * count
                            global.db.data.users[m.sender].sapi -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Sapi für ${Ssapi * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Kuh`.trim(), m)
                        break
                        case 'monyet':
                        if (global.db.data.users[m.sender].monyet >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Smonyet * count
                            global.db.data.users[m.sender].monyet -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Monyet für ${Smonyet * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Affe`.trim(), m)
                        break
                        case 'babi':
                        if (global.db.data.users[m.sender].babi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbabi * count
                            global.db.data.users[m.sender].babi -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Babi für ${Sbabi * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Schwein`.trim(), m)
                        break
                        case 'babihutan':
                        if (global.db.data.users[m.sender].babihutan >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbabihutan * count
                            global.db.data.users[m.sender].babihutan -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Babi Hutan für ${Sbabihutan * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Wildschwein`.trim(), m)
                        break
                        case 'ayam':
                        if (global.db.data.users[m.sender].ayam >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sayam * count
                            global.db.data.users[m.sender].ayam -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Ayam für ${Sayam * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Huhn`.trim(), m)
                        break
                        //angeln
                        case 'kepiting':
                        if (global.db.data.users[m.sender].kepiting >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].kepiting -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Kepiting für ${Skepiting * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krabbe`.trim(), m)
                        break
                        case 'ikan':
                        if (global.db.data.users[m.sender].ikan >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].ikan -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Ikan für ${Sikan * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Fisch`.trim(), m)
                        break
                        case 'dory':
                        if (global.db.data.users[m.sender].dory >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sdory * count
                            global.db.data.users[m.sender].dory -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Ikan Dory für ${Sdory * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Dory-Fisch`.trim(), m)
                        break
                        case 'gurita':
                        if (global.db.data.users[m.sender].gurita >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].gurita -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Gurita für ${Sgurita * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krake`.trim(), m)
                        break
                        case 'buntal':
                        if (global.db.data.users[m.sender].buntal >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbuntal * count
                            global.db.data.users[m.sender].buntal -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Ikan Buntal für ${Sbuntal * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Kugelfisch`.trim(), m)
                        break
                        case 'hiu':
                        if (global.db.data.users[m.sender].hiu >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Shiu * count
                            global.db.data.users[m.sender].hiu -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Hiu für ${Shiu * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Hai`.trim(), m)
                        break
                        case 'orca':
                        if (global.db.data.users[m.sender].orca >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sorca * count
                            global.db.data.users[m.sender].orca -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Paus Orca für ${Sorca * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Orca`.trim(), m)
                        break
                        case 'lumba':
                        if (global.db.data.users[m.sender].lumba >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].lumba -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Lumba Lumba für ${Slumba * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Delfin`.trim(), m)
                        break
                        case 'paus':
                        if (global.db.data.users[m.sender].paus >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spaus * count
                            global.db.data.users[m.sender].paus -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Paus für ${Spaus * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Wal`.trim(), m)
                        break
                  case 'lobster':
                        if (global.db.data.users[m.sender].lobster >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Slobster * count
                            global.db.data.users[m.sender].lobster -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Lobster für ${Slobster * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Hummer`.trim(), m)
                        break
                     case 'udang':
                        if (global.db.data.users[m.sender].udang >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sudang * count
                            global.db.data.users[m.sender].udang -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Udang für ${Sudang * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Garnele`.trim(), m)
                        break
                      case 'cumi':
                        if (global.db.data.users[m.sender].cumi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Scumi * count
                            global.db.data.users[m.sender].cumi -= count * 1
                            conn.reply(m.chat, `Erfolgreich verkauft: ${count} Cumi für ${Scumi * count} Münzen `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Tintenfisch`.trim(), m)
                        break                                        
                default:
                    return conn.reply(m.chat, Kchat, m)
            }
        }
    } catch (e) {
        conn.reply(m.chat, Kchat, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['Markt *<verkaufen>|<args>*', 'Marktplatz *<verkaufen>|<args>*']
handler.tags = ['rpg']
    
handler.command = /^(Markt|Marktplatz|verkaufen)$/i
handler.rpg = true
module.exports = handler