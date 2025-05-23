let { MessageType } = require('@adiwajshing/baileys')
const Hab = 20000
const Hag = 15000
const Hr = 15000
const Hs = 20000
const Hbp = 50000
const Hga = 15000
const Hoa = 15000
const Hv = 50000
const Hsu = 30000
const Hb = 20000
const Hg = 100000
const Hso = 50000
const Hro = 10000
const Hib = 15000
const Hlb = 15000
const Hnb = 15000
const Hbb = 15000
const Hub = 15000
const Hpb = 200000
const Hkb = 20000
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    const _armor = global.db.data.users[m.sender].Rüstung
    const Rüstung = (_armor == 0 ? 20000 : '' || _armor == 1 ? 49999 : '' || _armor == 2 ? 99999 : '' || _armor == 3 ? 149999 : '' || _armor == 4 ? 299999 : '')
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
    const Kchat = `━━━━━━━━━━━━━━━━━\n
╭──『 ғᴏᴏᴅ 』
│⬡ *ayambakar* : ${Hab}
│⬡ *ayamgoreng* : ${Hag} 
│⬡ *rendang* : ${Hr} 
│⬡ *steak* : ${Hs} 
│⬡ *babipanggang* : ${Hbp} 
│⬡ *gulaiayam* : ${Hga} 
│⬡ *oporayam* : ${Hoa} 
│⬡ *vodka* : ${Hv} 
│⬡ *sushi* : ${Hsu} 
│⬡ *bandage* : ${Hb} 
│⬡ *ganja* : ${Hg} 
│⬡ *soda* : ${Hso} 
│⬡  *roti* : ${Hro}
│⬡ *ikanbakar* : ${Hib}
│⬡ *lelebakar* : ${Hlb}
│⬡ *nilabakar* : ${Hnb}
│⬡ *bawalbakar* : ${Hbb}
│⬡ *udangbakar* : ${Hub}
│⬡ *pausbakar* : ${Hpb}
│⬡ *kepitingbakar* : ${Hkb}
╰───────────────
━━━━━━━━━━━━━━━━━

> *Kaufbeispiel :*
#resto kaufen food Anzahl
#resto kaufen ayambakar 2
`.trim()
    try {
        if (/resto/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
            const müll = global.db.data.users[m.sender].müll
            switch (jualbeli) {
            case 'kaufen':
                switch (_type) {
                    case 'ayambakar':
                            if (global.db.data.users[m.sender].Münzen >= Hab * count) {
                                global.db.data.users[m.sender].Münzen -= Hab * count
                                global.db.data.users[m.sender].ayambakar += count * 1
                                conn.reply(m.chat, `Succes kaufen ${count} Ayam Bakar mit harga ${Hab * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`,)
                        break
                    case 'ayamgoreng':
                            if (global.db.data.users[m.sender].Münzen >= Hag * count) {
                                global.db.data.users[m.sender].ayamgoreng += count * 1
                                global.db.data.users[m.sender].Münzen -= Hag * count
                                conn.reply(m.chat, `Succes kaufen ${count} Ayam Goreng mit harga ${Hag * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'rendang':
                            if (global.db.data.users[m.sender].Münzen >= Hr * count) {
                                global.db.data.users[m.sender].rendang += count * 1
                                global.db.data.users[m.sender].Münzen -= Hr * count
                                conn.reply(m.chat, `Succes kaufen ${count} Rendang mit harga ${Hr * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'steak':
                            if (global.db.data.users[m.sender].Münzen >= Hs * count) {
                                global.db.data.users[m.sender].steak += count * 1
                                global.db.data.users[m.sender].Münzen -= Hs * count
                                conn.reply(m.chat, `Succes kaufen ${count} Steak mit harga ${Hs * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'babipanggang':
                            if (global.db.data.users[m.sender].Münzen >= Hbp * count) {
                                global.db.data.users[m.sender].babipanggang += count * 1
                                global.db.data.users[m.sender].Münzen -= Hbp * count
                                conn.reply(m.chat, `Succes kaufen ${count} Babi Panggang mit harga ${Hbp * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'gulaiayam':
                            if (global.db.data.users[m.sender].Münzen >= Hga * count) {
                                global.db.data.users[m.sender].Münzen -= Hga * count
                                global.db.data.users[m.sender].gulai += count * 1
                                conn.reply(m.chat, `Succes kaufen ${count} Gulai Ayam mit harga ${Hga * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`,)
                        break
                    case 'oporayam':
                            if (global.db.data.users[m.sender].Münzen >= Hoa * count) {
                                global.db.data.users[m.sender].oporayam += count * 1
                                global.db.data.users[m.sender].Münzen -= Hoa * count
                                conn.reply(m.chat, `Succes kaufen ${count} Opor Ayam mit harga ${Hoa * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'vodka':
                            if (global.db.data.users[m.sender].Münzen >= Hv * count) {
                                global.db.data.users[m.sender].vodka += count * 1
                                global.db.data.users[m.sender].Münzen -= Hv * count
                                conn.reply(m.chat, `Succes kaufen ${count} Vodka mit harga ${Hv * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'sushi':
                            if (global.db.data.users[m.sender].Münzen >= Hsu * count) {
                                global.db.data.users[m.sender].sushi += count * 1
                                global.db.data.users[m.sender].Münzen -= Hsu * count
                                conn.reply(m.chat, `Succes kaufen ${count} Sushi mit harga ${Hsu * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'bandage':
                            if (global.db.data.users[m.sender].Münzen >= Hb * count) {
                                global.db.data.users[m.sender].bandage += count * 1
                                global.db.data.users[m.sender].Münzen -= Hb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bandage mit harga ${Hb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'ganja':
                            if (global.db.data.users[m.sender].Münzen >= Hg * count) {
                                global.db.data.users[m.sender].Münzen -= Hg * count
                                global.db.data.users[m.sender].ganja += count * 1
                                conn.reply(m.chat, `Succes kaufen ${count} Ganja mit harga ${Hg * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`,)
                        break
                    case 'soda':
                            if (global.db.data.users[m.sender].Münzen >= Hso * count) {
                                global.db.data.users[m.sender].soda += count * 1
                                global.db.data.users[m.sender].Münzen -= Hso * count
                                conn.reply(m.chat, `Succes kaufen ${count} Soda mit harga ${Hso * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'roti':
                            if (global.db.data.users[m.sender].Münzen >= Hro * count) {
                                global.db.data.users[m.sender].roti += count * 1
                                global.db.data.users[m.sender].Münzen -= Hro * count
                                conn.reply(m.chat, `Succes kaufen ${count} Roti mit harga ${Hro * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'ikanbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hib * count) {
                                global.db.data.users[m.sender].ikanbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hib * count
                                conn.reply(m.chat, `Succes kaufen ${count} Ikan Bakar mit harga ${Hib * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'lelebakar':
                            if (global.db.data.users[m.sender].Münzen >= Hlb * count) {
                                global.db.data.users[m.sender].lelebakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hlb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Lele Bakar mit harga ${Hlb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'nilabakar':
                            if (global.db.data.users[m.sender].Münzen >= Hnb * count) {
                                global.db.data.users[m.sender].Münzen -= Hnb * count
                                global.db.data.users[m.sender].nilabakar += count * 1
                                conn.reply(m.chat, `Succes kaufen ${count} Nila Bakar mit harga ${Hnb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`,)
                        break
                    case 'bawalbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hbb * count) {
                                global.db.data.users[m.sender].bawalbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hbb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bawal Bakar mit harga ${Hbb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'udangbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hub * count) {
                                global.db.data.users[m.sender].udangbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hub * count
                                conn.reply(m.chat, `Succes kaufen ${count} Udang Bakar mit harga ${Hub * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'pausbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hpb * count) {
                                global.db.data.users[m.sender].pausbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hpb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Paus Bakar mit harga ${Hpb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'kepitingbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hkb * count) {
                                global.db.data.users[m.sender].kepitingbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hkb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Kepiting Bakar mit harga ${Hkb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    default:
                        return conn.reply(m.chat, Kchat, m)
                }
                break
            /*case 'verkaufen': 
                switch (_type) {                  
                     case 'banteng':
                        if (global.db.data.users[m.sender].banteng >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spaus * count
                            global.db.data.users[m.sender].banteng -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Banteng Mit Harga ${Sbanteng * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Banteng`.trim(), m)
                        break
                        case 'harimau':
                        if (global.db.data.users[m.sender].harimau >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sharimau * count
                            global.db.data.users[m.sender].harimau -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Tagemau Mit Harga ${Sharimau * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Tiger`.trim(), m)
                        break
                        case 'gajah':
                        if (global.db.data.users[m.sender].gajah >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sgajah * count
                            global.db.data.users[m.sender].gajah -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Gajah Mit Harga ${Sgajah * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Elefant`.trim(), m)
                        break
                        case 'kambing':
                        if (global.db.data.users[m.sender].kambing >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skambing * count
                            global.db.data.users[m.sender].kambing -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Kambing Mit Harga ${Skambing * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Ziege`.trim(), m)
                        break
                        case 'panda':
                        if (global.db.data.users[m.sender].panda >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spanda * count
                            global.db.data.users[m.sender].panda -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Panda Mit Harga ${Sbuaya * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Panda`.trim(), m)
                        break
                        case 'buaya':
                        if (global.db.data.users[m.sender].buaya >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbuaya * count
                            global.db.data.users[m.sender].buaya -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Buaya Mit Harga ${Sbuaya * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krokodil`.trim(), m)
                        break
                        case 'kerbau':
                        if (global.db.data.users[m.sender].kerbau >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skerbau * count
                            global.db.data.users[m.sender].kerbau -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Kerbau Mit Harga ${Skerbau * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Büffel`.trim(), m)
                        break
                        case 'sapi':
                        if (global.db.data.users[m.sender].sapi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Ssapi * count
                            global.db.data.users[m.sender].sapi -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Sapi Mit Harga ${Ssapi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Kuh`.trim(), m)
                        break
                        case 'monyet':
                        if (global.db.data.users[m.sender].monyet >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Smonyet * count
                            global.db.data.users[m.sender].monyet -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Monyet Mit Harga ${Smonyet * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Affe`.trim(), m)
                        break
                        case 'babi':
                        if (global.db.data.users[m.sender].babi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].babi -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Babi Mit Harga ${Sbabi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Schwein`.trim(), m)
                        break
                        case 'babihutan':
                        if (global.db.data.users[m.sender].babihutan >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbabihutan * count
                            global.db.data.users[m.sender].babihutan -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Babi Hutan Mit Harga ${Sbabihutan * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Wildschwein`.trim(), m)
                        break
                        case 'ayam':
                        if (global.db.data.users[m.sender].ayam >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sayam * count
                            global.db.data.users[m.sender].ayam -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Ayam Mit Harga ${Sayam * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Huhn`.trim(), m)
                        break
                        //angeln
                        case 'kepiting':
                        if (global.db.data.users[m.sender].kepiting >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].kepiting -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Kepiting Mit Harga ${Skepiting * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krabbe`.trim(), m)
                        break
                        case 'ikan':
                        if (global.db.data.users[m.sender].ikan >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].ikan -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Ikan Mit Harga ${Sikan * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Fisch`.trim(), m)
                        break
                        case 'dory':
                        if (global.db.data.users[m.sender].dory >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sdory * count
                            global.db.data.users[m.sender].dory -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Ikan Dory Mit Harga ${Sdory * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Dory-Fisch`.trim(), m)
                        break
                        case 'gurita':
                        if (global.db.data.users[m.sender].gurita >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].gurita -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Gurita Mit Harga ${Sgurita * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krake`.trim(), m)
                        break
                        case 'buntal':
                        if (global.db.data.users[m.sender].buntal >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbuntal * count
                            global.db.data.users[m.sender].buntal -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Ikan Buntal Mit Harga ${Sbuntal * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Kugelfisch`.trim(), m)
                        break
                        case 'hiu':
                        if (global.db.data.users[m.sender].hiu >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Shiu * count
                            global.db.data.users[m.sender].hiu -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Hiu Mit Harga ${Shiu * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Hai`.trim(), m)
                        break
                        case 'orca':
                        if (global.db.data.users[m.sender].orca >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sorca * count
                            global.db.data.users[m.sender].orca -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Paus Orca Mit Harga ${Sorca * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Orca`.trim(), m)
                        break
                        case 'lumba':
                        if (global.db.data.users[m.sender].lumba >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].lumba -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Lumba Lumba Mit Harga ${Slumba * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Delfin`.trim(), m)
                        break
                        case 'paus':
                        if (global.db.data.users[m.sender].paus >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spaus * count
                            global.db.data.users[m.sender].paus -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Paus Mit Harga ${Spaus * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Wal`.trim(), m)
                        break
                  case 'lobster':
                        if (global.db.data.users[m.sender].lobster >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Slobster * count
                            global.db.data.users[m.sender].lobster -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Lobster Mit Harga ${Slobster * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Hummer`.trim(), m)
                        break
                     case 'udang':
                        if (global.db.data.users[m.sender].udang >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sudang * count
                            global.db.data.users[m.sender].udang -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Udang Mit Harga ${Sudang * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Garnele`.trim(), m)
                        break
                      case 'cumi':
                        if (global.db.data.users[m.sender].cumi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Scumi * count
                            global.db.data.users[m.sender].cumi -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Cumi Mit Harga ${Scumi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Tintenfisch`.trim(), m)
                        break
                    default:
                        return conn.reply(m.chat, Kchat, m)
                }
                break*/
            default:
                return conn.sendFile(m.chat, thumb, 'Markt.jpg', `${Kchat}`, m)
            }
        } else if (/kaufen/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
                case 'ayambakar':
                            if (global.db.data.users[m.sender].Münzen >= Hab * count) {
                                global.db.data.users[m.sender].Münzen -= Hab * count
                                global.db.data.users[m.sender].ayambakar += count * 1
                                conn.reply(m.chat, `Succes kaufen ${count} Ayam Bakar mit harga ${Hab * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`,)
                        break
                    case 'ayamgoreng':
                            if (global.db.data.users[m.sender].Münzen >= Hag * count) {
                                global.db.data.users[m.sender].ayamgoreng += count * 1
                                global.db.data.users[m.sender].Münzen -= Hag * count
                                conn.reply(m.chat, `Succes kaufen ${count} Ayam Goreng mit harga ${Hag * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'rendang':
                            if (global.db.data.users[m.sender].Münzen >= Hr * count) {
                                global.db.data.users[m.sender].rendang += count * 1
                                global.db.data.users[m.sender].Münzen -= Hr * count
                                conn.reply(m.chat, `Succes kaufen ${count} Rendang mit harga ${Hr * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'steak':
                            if (global.db.data.users[m.sender].Münzen >= Hs * count) {
                                global.db.data.users[m.sender].steak += count * 1
                                global.db.data.users[m.sender].Münzen -= Hs * count
                                conn.reply(m.chat, `Succes kaufen ${count} Steak mit harga ${Hs * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'babipanggang':
                            if (global.db.data.users[m.sender].Münzen >= Hbp * count) {
                                global.db.data.users[m.sender].babipanggang += count * 1
                                global.db.data.users[m.sender].Münzen -= Hbp * count
                                conn.reply(m.chat, `Succes kaufen ${count} Babi Panggang mit harga ${Hbp * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'gulaiayam':
                            if (global.db.data.users[m.sender].Münzen >= Hga * count) {
                                global.db.data.users[m.sender].Münzen -= Hga * count
                                global.db.data.users[m.sender].gulai += count * 1
                                conn.reply(m.chat, `Succes kaufen ${count} Gulai Ayam mit harga ${Hga * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`,)
                        break
                    case 'oporayam':
                            if (global.db.data.users[m.sender].Münzen >= Hoa * count) {
                                global.db.data.users[m.sender].oporayam += count * 1
                                global.db.data.users[m.sender].Münzen -= Hoa * count
                                conn.reply(m.chat, `Succes kaufen ${count} Opor Ayam mit harga ${Hoa * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'vodka':
                            if (global.db.data.users[m.sender].Münzen >= Hv * count) {
                                global.db.data.users[m.sender].vodka += count * 1
                                global.db.data.users[m.sender].Münzen -= Hv * count
                                conn.reply(m.chat, `Succes kaufen ${count} Vodka mit harga ${Hv * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'sushi':
                            if (global.db.data.users[m.sender].Münzen >= Hsu * count) {
                                global.db.data.users[m.sender].sushi += count * 1
                                global.db.data.users[m.sender].Münzen -= Hsu * count
                                conn.reply(m.chat, `Succes kaufen ${count} Sushi mit harga ${Hsu * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'bandage':
                            if (global.db.data.users[m.sender].Münzen >= Hb * count) {
                                global.db.data.users[m.sender].bandage += count * 1
                                global.db.data.users[m.sender].Münzen -= Hb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bandage mit harga ${Hb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'ganja':
                            if (global.db.data.users[m.sender].Münzen >= Hg * count) {
                                global.db.data.users[m.sender].Münzen -= Hg * count
                                global.db.data.users[m.sender].ganja += count * 1
                                conn.reply(m.chat, `Succes kaufen ${count} Ganja mit harga ${Hg * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`,)
                        break
                    case 'soda':
                            if (global.db.data.users[m.sender].Münzen >= Hso * count) {
                                global.db.data.users[m.sender].soda += count * 1
                                global.db.data.users[m.sender].Münzen -= Hso * count
                                conn.reply(m.chat, `Succes kaufen ${count} Soda mit harga ${Hso * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'roti':
                            if (global.db.data.users[m.sender].Münzen >= Hro * count) {
                                global.db.data.users[m.sender].roti += count * 1
                                global.db.data.users[m.sender].Münzen -= Hro * count
                                conn.reply(m.chat, `Succes kaufen ${count} Roti mit harga ${Hro * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'ikanbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hib * count) {
                                global.db.data.users[m.sender].ikanbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hib * count
                                conn.reply(m.chat, `Succes kaufen ${count} Ikan Bakar mit harga ${Hib * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'lelebakar':
                            if (global.db.data.users[m.sender].Münzen >= Hlb * count) {
                                global.db.data.users[m.sender].lelebakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hlb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Lele Bakar mit harga ${Hlb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'nilabakar':
                            if (global.db.data.users[m.sender].Münzen >= Hnb * count) {
                                global.db.data.users[m.sender].Münzen -= Hnb * count
                                global.db.data.users[m.sender].nilabakar += count * 1
                                conn.reply(m.chat, `Succes kaufen ${count} Nila Bakar mit harga ${Hnb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`,)
                        break
                    case 'bawalbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hbb * count) {
                                global.db.data.users[m.sender].bawalbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hbb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bawal Bakar mit harga ${Hbb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'udangbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hub * count) {
                                global.db.data.users[m.sender].udangbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hub * count
                                conn.reply(m.chat, `Succes kaufen ${count} Udang Bakar mit harga ${Hub * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                    case 'pausbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hpb * count) {
                                global.db.data.users[m.sender].pausbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hpb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Paus Bakar mit harga ${Hpb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                   case 'kepitingbakar':
                            if (global.db.data.users[m.sender].Münzen >= Hkb * count) {
                                global.db.data.users[m.sender].kepitingbakar += count * 1
                                global.db.data.users[m.sender].Münzen -= Hkb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Kepiting Bakar mit harga ${Hkb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Nicht genug Geld`, m)                       
                        break
                default:
                    return conn.reply(m.chat, Kchat, m)
            }
      /*  } else if (/sell|verkaufen|/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) { 
                       case 'banteng':
                        if (global.db.data.users[m.sender].banteng >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spaus * count
                            global.db.data.users[m.sender].banteng -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Banteng Mit Harga ${Sbanteng * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Banteng`.trim(), m)
                        break
                        case 'harimau':
                        if (global.db.data.users[m.sender].harimau >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sharimau * count
                            global.db.data.users[m.sender].harimau -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Tagemau Mit Harga ${Sharimau * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Tiger`.trim(), m)
                        break
                        case 'gajah':
                        if (global.db.data.users[m.sender].gajah >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sgajah * count
                            global.db.data.users[m.sender].gajah -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Gajah Mit Harga ${Sgajah * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Elefant`.trim(), m)
                        break
                        case 'kambing':
                        if (global.db.data.users[m.sender].kambing >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skambing * count
                            global.db.data.users[m.sender].kambing -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Kambing Mit Harga ${Skambing * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Ziege`.trim(), m)
                        break
                        case 'panda':
                        if (global.db.data.users[m.sender].panda >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spanda * count
                            global.db.data.users[m.sender].panda -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Panda Mit Harga ${Sbuaya * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Panda`.trim(), m)
                        break
                        case 'buaya':
                        if (global.db.data.users[m.sender].buaya >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbuaya * count
                            global.db.data.users[m.sender].buaya -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Buaya Mit Harga ${Sbuaya * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krokodil`.trim(), m)
                        break
                        case 'kerbau':
                        if (global.db.data.users[m.sender].kerbau >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skerbau * count
                            global.db.data.users[m.sender].kerbau -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Kerbau Mit Harga ${Skerbau * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Büffel`.trim(), m)
                        break
                        case 'sapi':
                        if (global.db.data.users[m.sender].sapi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Ssapi * count
                            global.db.data.users[m.sender].sapi -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Sapi Mit Harga ${Ssapi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Kuh`.trim(), m)
                        break
                        case 'monyet':
                        if (global.db.data.users[m.sender].monyet >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Smonyet * count
                            global.db.data.users[m.sender].monyet -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Monyet Mit Harga ${Smonyet * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Affe`.trim(), m)
                        break
                        case 'babi':
                        if (global.db.data.users[m.sender].babi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbabi * count
                            global.db.data.users[m.sender].babi -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Babi Mit Harga ${Sbabi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Schwein`.trim(), m)
                        break
                        case 'babihutan':
                        if (global.db.data.users[m.sender].babihutan >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbabihutan * count
                            global.db.data.users[m.sender].babihutan -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Babi Hutan Mit Harga ${Sbabihutan * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Wildschwein`.trim(), m)
                        break
                        case 'ayam':
                        if (global.db.data.users[m.sender].ayam >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sayam * count
                            global.db.data.users[m.sender].ayam -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Ayam Mit Harga ${Sayam * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Huhn`.trim(), m)
                        break
                        //angeln
                        case 'kepiting':
                        if (global.db.data.users[m.sender].kepiting >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].kepiting -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Kepiting Mit Harga ${Skepiting * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krabbe`.trim(), m)
                        break
                        case 'ikan':
                        if (global.db.data.users[m.sender].ikan >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].ikan -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Ikan Mit Harga ${Sikan * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Fisch`.trim(), m)
                        break
                        case 'dory':
                        if (global.db.data.users[m.sender].dory >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sdory * count
                            global.db.data.users[m.sender].dory -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Ikan Dory Mit Harga ${Sdory * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Dory-Fisch`.trim(), m)
                        break
                        case 'gurita':
                        if (global.db.data.users[m.sender].gurita >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].gurita -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Gurita Mit Harga ${Sgurita * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Krake`.trim(), m)
                        break
                        case 'buntal':
                        if (global.db.data.users[m.sender].buntal >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sbuntal * count
                            global.db.data.users[m.sender].buntal -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Ikan Buntal Mit Harga ${Sbuntal * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Kugelfisch`.trim(), m)
                        break
                        case 'hiu':
                        if (global.db.data.users[m.sender].hiu >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Shiu * count
                            global.db.data.users[m.sender].hiu -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Hiu Mit Harga ${Shiu * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Hai`.trim(), m)
                        break
                        case 'orca':
                        if (global.db.data.users[m.sender].orca >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sorca * count
                            global.db.data.users[m.sender].orca -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Paus Orca Mit Harga ${Sorca * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Orca`.trim(), m)
                        break
                        case 'lumba':
                        if (global.db.data.users[m.sender].lumba >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Skepiting * count
                            global.db.data.users[m.sender].lumba -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Lumba Lumba Mit Harga ${Slumba * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Delfin`.trim(), m)
                        break
                        case 'paus':
                        if (global.db.data.users[m.sender].paus >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spaus * count
                            global.db.data.users[m.sender].paus -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Paus Mit Harga ${Spaus * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Wal`.trim(), m)
                        break
                  case 'lobster':
                        if (global.db.data.users[m.sender].lobster >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Slobster * count
                            global.db.data.users[m.sender].lobster -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Lobster Mit Harga ${Slobster * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Hummer`.trim(), m)
                        break
                     case 'udang':
                        if (global.db.data.users[m.sender].udang >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Sudang * count
                            global.db.data.users[m.sender].udang -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Udang Mit Harga ${Sudang * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Garnele`.trim(), m)
                        break
                      case 'cumi':
                        if (global.db.data.users[m.sender].cumi >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Scumi * count
                            global.db.data.users[m.sender].cumi -= count * 1
                            conn.reply(m.chat, `Sukses verkaufen ${count} Cumi Mit Harga ${Scumi * count} Money `.trim(), m)
                        } else conn.reply(m.chat, `Du hast nicht genug Tintenfisch`.trim(), m)
                        break                                        
                default:
                    return conn.reply(m.chat, Kchat, m)
            }*/
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

handler.help = ['resto *<kaufen> <args>*']
handler.tags = ['rpg']    

handler.command = /^(resto|kaufen)$/i
handler.rpg = true
module.exports = handler