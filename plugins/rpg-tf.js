//tq: hafizdexe

let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    if (args.length < 3) {
        return conn.reply(m.chat, `benutzen format .tf <type> <Anzahl> <@tag>\n📍contoh penggunaan: *.tf Münzen 100 @tag*\n\n*List die/der/das kann in transfer :*\n💹Money\n🏷 Limit\n💳 Tabungan\n🥤Potion\n🗑️Müll\n💎Diamond\n📦Common\n🛍️Uncommon\n🎁Mythic\n🧰Legendary\n🕸️string\n🪵kayu\n🪨batu\n⛓iron`.trim(), m)
    } else try {
        let type = (args[0] || '').toLowerCase()
        let count = args[1] && args[1].length > 0 ? Math.min(9999999, Math.max(parseInt(args[1]), 1)) : Math.min(1)
        let who = m.mentionedJid ? m.mentionedJid[0] : (args[2].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
        if(!m.mentionedJid || !args[2]) throw 'Tag salah eins, oder ketik Nomernya!!'
        let users = global.db.data.users
        switch (type) {
        	case 'limit':
                if (global.db.data.users[m.sender].limit >= count * 1) {
                    try {
                        global.db.data.users[m.sender].limit -= count * 1
                        global.db.data.users[who].limit += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer limit etwa ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].Münzen += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Du hast nicht genug Limit, um ca. Limit zu transferieren ${count}`.trim(), m)
                break
            case 'Münzen':
                if (global.db.data.users[m.sender].Münzen >= count * 1) {
                    try {
                        global.db.data.users[m.sender].Münzen -= count * 1
                        global.db.data.users[who].Münzen += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer Münzen etwa ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].Münzen += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Du hast nicht genug Geld, um ca. Geld zu transferieren ${count}`.trim(), m)
                break
            case 'tabungan':
                if (global.db.data.users[m.sender].atm >= count * 1) {
                   try {
                       global.db.data.users[m.sender].atm -= count * 1
                       global.db.data.users[who].atm += count * 1
                       conn.reply(m.chat, `erfolgreich mentransfer Geld von bank etwa ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].atm += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                               conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Du hast nicht genug Limit, um ca. Geld von der Bank zu transferieren ${count}`.trim(), m)
                break
            case 'limit':
                if (global.db.data.users[m.sender].limit >= count * 1) {
                    try {
                        global.db.data.users[m.sender].limit -= count * 1
                        global.db.data.users[who].limit += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer limit etwa ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].limit += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Du hast nicht genug Limit, um ca. Limit zu transferieren ${count}`.trim(), m)
                break
            case 'potion':
                if (global.db.data.users[m.sender].potion >= count * 1) {
                    try {
                        global.db.data.users[m.sender].potion -= count * 1
                        global.db.data.users[who].potion += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer ${count} Potion`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].potion += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Potion du nicht genug`.trim(), m)
                break
            case 'müll':
                if (global.db.data.users[m.sender].müll >= count * 1) {
                    try {
                        global.db.data.users[m.sender].müll -= count * 1
                        global.db.data.users[who].müll += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer ${count} Müll`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].müll += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Müll du nicht genug`.trim(), m)
                break
            case 'Diamant':
                if (global.db.data.users[m.sender].Diamant >= count * 1) {
                    try {
                        global.db.data.users[m.sender].Diamant -= count * 1
                        global.db.data.users[who].Diamant += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer ${count} Diamond`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].Diamant += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Diamond du du nicht genug`.trim(), m)
                break
            case 'common':
                if (global.db.data.users[m.sender].common >= count * 1) {
                    try {
                        global.db.data.users[m.sender].common -= count * 1
                        global.db.data.users[who].common += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer ${count} Common Crate`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].common += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Common crate du du nicht genug`.trim(), m)
                break
            case 'uncommon':
                if (global.db.data.users[m.sender].uncommon >= count * 1) {
                    try {
                        global.db.data.users[m.sender].uncommon -= count * 1
                        global.db.data.users[who].uncommon += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer ${count} Uncommon Crate`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].uncommon += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uncommon crate du du nicht genug`.trim(), m)
                break
            case 'mythic':
                if (global.db.data.users[m.sender].mythic >= count * 1) {
                    try {
                        global.db.data.users[m.sender].mythic -= count * 1
                        global.db.data.users[who].mythic += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer ${count} Mythic crate`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].mythic += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Mythic crate du du nicht genug`.trim(), m)
                break
            case 'legendary':
                if (global.db.data.users[m.sender].legendary >= count * 1) {
                    try {
                        global.db.data.users[m.sender].legendary -= count * 1
                        global.db.data.users[who].legendary += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer ${count} Legendary crate`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].legendary += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Legendary crate du du nicht genug`.trim(), m)
                break
            case 'string':
                if (global.db.data.users[m.sender].string >= count * 1) {
                    try {
                        global.db.data.users[m.sender].string -= count * 1
                        global.db.data.users[who].string += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer string etwa ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].string += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Du hast nicht genug Geld, um ca. Schnur zu transferieren ${count}`.trim(), m)
                break
            case 'batu':
                if (global.db.data.users[m.sender].batu >= count * 1) {
                    try {
                        global.db.data.users[m.sender].batu -= count * 1
                        global.db.data.users[who].batu += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer Batu etwa ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].batu += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Du hast nicht genug Geld, um ca. Stein zu transferieren ${count}`.trim(), m)
                break
            case 'kayu':
                if (global.db.data.users[m.sender].kayu >= count * 1) {
                    try {
                        global.db.data.users[m.sender].kayu -= count * 1
                        global.db.data.users[who].kayu += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer kayu etwa ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].kayu += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Du hast nicht genug Geld, um ca. Holz zu transferieren ${count}`.trim(), m)
                break
            case 'iron':
                if (global.db.data.users[m.sender].iron >= count * 1) {
                    try {
                        global.db.data.users[m.sender].iron -= count * 1
                        global.db.data.users[who].iron += count * 1
                        conn.reply(m.chat, `erfolgreich mentransfer iron etwa ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].iron += count * 1
                        m.reply('fehlgeschlagen Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Du hast nicht genug Geld, um ca. Eisen zu transferieren ${count}`.trim(), m)
                break
            default:
                return conn.reply(m.chat, `benutzen format ${usedPrefix}transfer <type> <Anzahl> <@tag>\n📍 Contoh penggunaan: *${usedPrefix}transfer Münzen 100 @tag*\n\n*List die/der/das kann in transfer*\n💹 Money\n🏷 Limit\n💳 Tabungan\n🥤 Potion\n🗑️ Müll\n💎 Diamond\n📦 Common\n🛍️ Uncommon\n🎁 Mythic\n🧰 Legendary\n🕸️ String\n🪵 Kayu\n🪨 Batu\n⛓️ Iron`.trim(), m)
        }
    } catch (e) {
        conn.reply(m.chat, `benutzen format ${usedPrefix}tf <type> <Anzahl> <@tag>\📍 Contoh penggunaan: *${usedPrefix}tf Münzen 100 @tag*\n\n*List die/der/das kann in transfer :*\n💹 Money\n🏷 Limit\n💳 Tabungan\n🥤 Potion\n🗑️ Müll\n💎 Diamond\n📦 Common\n🛍️ Uncommon\n🎁 Mythic\n🧰 Legendary\n🕸️ String\n🪵 Kayu\n🪨 Batu\n⛓ iron`.trim(), m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
            }
        }
    }
}
    
handler.help = ['transfer <Args>']
handler.tags = ['rpg']
handler.command = /^(transfer|tf)$/i
handler.Besitzer = false
handler.mods = false
handler.Premium = false
handler.group = true
handler.private = false
handler.rpg = true
handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.Münzen = 0

module.exports = handler

