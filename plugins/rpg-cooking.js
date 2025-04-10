let handler = async (m, {
        command,
        usedPrefix,
        DevMode,
        args
}) => {
        let type = (args[0] || '').toLowerCase()
    let msk = (args[0] || '').toLowerCase()
    let user = global.db.data.users[m.sender]
    let author = global.author
let cok = `「 *K O C H E N* 」


▧ gebratenes_huhn 🍖
〉Benötigt 2 Huhn 🐓 & 1 Kohle 🕳️
▧ frittiertes_huhn 🍗
〉Benötigt 2 Huhn 🐓 & 1 Kohle 🕳️
▧ hühnersuppe 🍜
〉Benötigt 2 Huhn 🐓 & 1 Kohle 🕳️
▧ steak 🥩
〉Benötigt 2 Rind 🐮 & 1 Kohle 🕳️
▧ rindfleischeintopf 🥘
〉Benötigt 2 Rind 🐮 & 1 Kohle 🕳️
▧ hühnercurry 🍲
〉Benötigt 2 Huhn 🐓 & 1 Kohle 🕳️
▧ schweinebraten 🥠
〉Benötigt 2 Schwein 🐖 & 1 Kohle 🕳️
▧ gegrillter_fisch 🐟
〉Benötigt 2 Fisch 🐟 & 1 Kohle 🕳️
▧ gegrillter_wels 🐟
〉Benötigt 2 Wels 🐟 & 1 Kohle 🕳️
▧ gegrillte_tilapia 🐟
〉Benötigt 2 Tilapia 🐟 & 1 Kohle 🕳️
▧ gegrillter_buntbarsch 🐟
〉Benötigt 2 Buntbarsch 🐟 & 1 Kohle 🕳️
▧ gegrillte_garnelen 🦐
〉Benötigt 2 Garnelen 🦐 & 1 Kohle 🕳️
▧ gegrillter_wal 🐳
〉Benötigt 2 Wal 🐳 & 1 Kohle 🕳️
▧ gegrillte_krabben 🦀
〉Benötigt 2 Krabben 🦀 & 1 Kohle 🕳️

• *Beispiel:* .kochen gebratenes_huhn

Bitte verwende Unterstriche statt Leerzeichen`

try {
       if (/kochen|cook/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(5, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
                case 'ayambakar':
            if (user.ayam < count * 2 || user.coal < 1 * count) {
                           user.ayam >= count * 1
                            user.ayam -= count * 2
                            user.coal -= count * 1
                            user.ayambakar += count * 1
                            conn.reply(m.chat, `Sukses memasak ${count} ayam bakar🍖`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak ayam bakar\nAnda butuh 2 ayam und 1 coal für memasak`, m)
                                        break
                                  case 'gulaiayam':
            if (user.ayam < count * 2 || user.coal < 1 * count) {
                            user.ayam >= count * 1
                            user.ayam -= count * 2
                            user.coal -= count * 1
                            user.gulai += count * 1
                            conn.reply(m.chat, `Sukses memasak ${ count } Gulai Ayam🍜`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak gulai ayam\nAnda butuh 2 ayam und 1 coal für memasak`, m)
                                        break
                  case 'rendang':
            if (user.sapi < count * 2 || user.coal < 1 * count) {
                            user.sapi >= count * 1
                            user.sapi -= count * 2
                            user.coal -= count * 1
                            user.rendang += count * 1
                            conn.reply(m.chat, `Sukses memasak ${ count } Rendang 🍜`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak dimasak rendang\nAnda butuh 2 sapi und 1 coal für memasak`, m)
                                        break
                   case 'ayamgoreng':
            if (user.ayam < count * 2 || user.coal < 1 * count) {
                           user.ayam >= count * 1
                            user.ayam -= count * 2
                            user.coal -= count * 1
                            user.ayamgoreng += count * 1
                            conn.reply(m.chat, `Sukses memasak ${ count } ayam goreng🍗`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak ayam goreng\nAnda butuh 2 ayam und 1 coal für memasak`, m)
                                        break
                        case 'oporayam':
            if (user.ayam < count * 2 || user.coal < 1 * count) {
                          user.ayam >= count * 1
                            user.ayam -= count * 2
                            user.coal -= count * 1
                            user.oporayam += count * 1
                            conn.reply(m.chat, `Sukses memasak ${ count } opor ayam`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak opor ayam\nAnda butuh 2 ayam und 1 coal für memasak`, m)
                                        break
                        case 'steak':
            if (user.sapi < count * 2 || user.coal < 1 * count) {
                            user.sapi >= count * 1
                            user.sapi -= count * 2
                            user.coal -= count * 1
                            user.steak += count * 1
                            conn.reply(m.chat, `Sukses memasak ${ count } Steak`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak steak\nAnda butuh 2 sapi und 1 coal für memasak`, m)
                                break
             case 'babipanggang':
            if (user.babi < count * 2 || user.coal < 1 * count) {
                            user.babi >= count * 1
                            user.babi -= count * 2
                            user.coal -= count * 1
                            user.babipanggang += count * 1
                            conn.reply(m.chat, `Sukses memasak ${ count } babi panggang`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak babi panggang\nAnda butuh 2 babi und 1 coal für memasak`, m)
                                break
                                case 'ikanbakar':
            if (user.ikan < count * 2 || user.coal < 1 * count) {
                           user.ikan >= count * 1
                            user.ikan -= count * 2
                            user.coal -= count * 1
                            user.ikanbakar += count * 1
                            conn.reply(m.chat, `Sukses memasak ${count} ikan bakar🍖`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak ikan bakar\nAnda butuh 2 ikan und 1 coal für memasak`, m)
                                        break
                                        case 'lelebakar':
            if (user.lele < count * 2 || user.coal < 1 * count) {
                           user.lele >= count * 1
                            user.lele -= count * 2
                            user.coal -= count * 1
                            user.lelebakar += count * 1
                            conn.reply(m.chat, `Sukses memasak ${count} lele bakar🍖`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak lele bakar\nAnda butuh 2 lele und 1 coal für memasak`, m)
                                        break
                                        case 'nilabakar':
            if (user.nila < count * 2 || user.coal < 1 * count) {
                           user.nila >= count * 1
                            user.nila -= count * 2
                            user.coal -= count * 1
                            user.nilabakar += count * 1
                            conn.reply(m.chat, `Sukses memasak ${count} nila bakar🍖`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak nila bakar\nAnda butuh 2 nila und 1 coal für memasak`, m)
                                        break
                                        case 'bawalbakar':
            if (user.bawal < count * 2 || user.coal < 1 * count) {
                           user.bawal >= count * 1
                            user.bawal -= count * 2
                            user.coal -= count * 1
                            user.bawalbakar += count * 1
                            conn.reply(m.chat, `Sukses memasak ${count} bawal bakar🍖`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak bawal bakar\nAnda butuh 2 bawal und 1 coal für memasak`, m)
                                        break
                                        case 'udangbakar':
            if (user.udang < count * 2 || user.coal < 1 * count) {
                           user.udang >= count * 1
                            user.udang -= count * 2
                            user.coal -= count * 1
                            user.udangbakar += count * 1
                            conn.reply(m.chat, `Sukses memasak ${count} udang bakar🍖`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak udang bakar\nAnda butuh 2 udang und 1 coal für memasak`, m)
                                        break
                                        case 'pausbakar':
            if (user.paus < count * 2 || user.coal < 1 * count) {
                           user.paus >= count * 1
                            user.paus -= count * 2
                            user.coal -= count * 1
                            user.pausbakar += count * 1
                            conn.reply(m.chat, `Sukses memasak ${count} paus bakar🍖`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak paus bakar\nAnda butuh 2 paus und 1 coal für memasak`, m)
                                        break
                                        case 'kepitingbakar':
            if (user.kepiting < count * 2 || user.coal < 1 * count) {
                           user.kepiting >= count * 1
                            user.kepiting -= count * 2
                            user.coal -= count * 1
                            user.kepitingbakar += count * 1
                            conn.reply(m.chat, `Sukses memasak ${count} kepiting bakar🍖`, m)
                       } else conn.reply(m.chat, `Sie nicht haben bahan für memasak kepiting bakar\nAnda butuh 2 kepiting und 1 coal für memasak`, m)
                                        break
                default:
                await conn.reply(m.chat, cok, m)
        
        //              })
            }
        }
    } catch (e) {
        conn.reply(m.chat, `Es scheint, dass ein Fehler aufgetreten ist. Bitte melde es dem Besitzer`, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'cooking.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['kochen <gericht> <menge>', 'cook <gericht> <menge>']
handler.tags = ['rpg']
handler.group = true
handler.command = /^(kochen|cook)$/i
handler.rpg = true
module.exports = handler