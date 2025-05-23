let handler = async (m, {
        command,
        usedPrefix,
        args
}) => {
        let user = global.db.data.users[m.sender]
        let author = global.author
        let upgrd = (args[0] || '').toLowerCase()
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
    const list = `「 *E S S E N* 」
╭──『 Speisen 』
│⬡ Befehl eingeben↓
│   ${usedPrefix + command} steak
│
│⬡ 🍖 *Gegrilltes Huhn* : ${user.ayambakar}
│⬡ 🍗 *Gebratenes Huhn* : ${user.ayamgoreng}
│⬡ 🥘 *Rindfleischeintopf* : ${user.rendang}
│⬡ 🥩 *Steak* : ${user.steak}
│⬡ 🥠 *Gegrilltes Schwein* : ${user.babipanggang}
│⬡ 🍲 *Hühnercurry* : ${user.gulai}
│⬡ 🍜 *Hühnersuppe* : ${user.oporayam}
│⬡ 🍷 *Wodka* : ${user.vodka}
│⬡ 🍣 *Sushi* : ${user.sushi}
│⬡ 💉 *Verband* : ${user.bandage}
│⬡ ☘️ *Cannabis* : ${user.ganja}
│⬡ 🍺 *Limonade* : ${user.soda}
│⬡ 🍞 *Brot* : ${user.roti}
│⬡ 🍖 *Gegrillter Fisch* : ${user.ikanbakar}
│⬡ 🍖 *Gegrillter Wels* : ${user.lelebakar}
│⬡ 🍖 *Gegrillte Tilapia* : ${user.nilabakar}
│⬡ 🍖 *Gegrillter Pomfret* : ${user.bawalbakar}
│⬡ 🍖 *Gegrillte Garnelen* : ${user.udangbakar}
│⬡ 🍖 *Gegrillter Wal* : ${user.pausbakar}
│⬡ 🍖 *Gegrillte Krabbe* : ${user.kepitingbakar}
╰───────────────
• *Beispiel:* .essen steak

Benutze Leerzeichen
`.trim()
    //try {
    if (/essen|eat/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
          case 'ayamgoreng':
        if (user.Ausdauer < 100) {
                if (user.ayamgoreng >= count * 1) {
                            user.ayamgoreng -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Mmmm, lecker!`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug gebratenes Huhn.` ,m)
        } else conn.reply( m.chat, `Deine Ausdauer ist bereits voll.`, m)
        break
        case 'ayambakar':
        if (user.Ausdauer < 100) {
                if (user.ayambakar >= count * 1) {
                            user.ayambakar -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Ayam bakar du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'oporayam':
        if (user.Ausdauer < 100) {
                if (user.oporayam >= count * 1) {
                            user.oporayam -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Opor ayam du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'rendang':
        if (user.Ausdauer < 100) {
                if (user.rendang >= count * 1) {
                            user.rendang -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Rendang du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'steak':
        if (user.Ausdauer < 100) {
                if (user.steak >= count * 1) {
                            user.steak -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Mmmm, lecker!`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Steak.` ,m)
        } else conn.reply( m.chat, `Deine Ausdauer ist bereits voll.`, m)
        break
        case 'gulaiayam':
        if (user.Ausdauer < 100) {
                if (user.gulai >= count * 1) {
                            user.gulai -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Gulai ayam du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'babipanggang':
        if (user.Ausdauer < 100) {
                if (user.babipanggang >= count * 1) {
                            user.babipanggang -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Babi panggang du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'soda':
        if (user.Ausdauer < 100) {
                if (user.soda >= count * 1) {
                            user.soda -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Glek glek glek`, m)
                            } else conn.reply(m.chat, ` Soda du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'vodka':
        if (user.Ausdauer < 100) {
                if (user.vodka >= count * 1) {
                            user.vodka -= count * 1
                            user.Ausdauer += 25 * count
                            conn.reply(m.chat, `Glek Glek Glek`, m)
                            } else conn.reply(m.chat, ` Vodka du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'ganja':
        if (user.Ausdauer < 100) {
                if (user.ganja >= count * 1) {
                            user.ganja -= count * 1
                            user.healt += 90 * count
                            conn.reply(m.chat, `ngefly`, m)
                            } else conn.reply(m.chat, ` Ganja du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'bandage':
        if (user.Ausdauer < 100) {
                if (user.bandage >= count * 1) {
                            user.bandage -= count * 1
                            user.healt += 25 * count
                            conn.reply(m.chat, `Sretset`, m)
                            } else conn.reply(m.chat, ` Bandage du weniger` ,m)
        } else conn.reply( m.chat, `Healt du bereits penuh`, m)
        break
        case 'sushi':
        if (user.Ausdauer < 100) {
                if (user.sushi >= count * 1) {
                            user.sushi -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Sushi du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        break
        case 'roti':
        if (user.Ausdauer < 100) {
                if (user.roti >= count * 1) {
                            user.roti -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` Roti du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'ikanbakar':
        if (user.Ausdauer < 100) {
                if (user.ikanbakar >= count * 1) {
                            user.ikanbakar -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` ikan bakar du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'lelebakar':
        if (user.Ausdauer < 100) {
                if (user.lelebakar >= count * 1) {
                            user.lelebakar -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` lele bakar du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'nilabakar':
        if (user.Ausdauer < 100) {
                if (user.nilabakar >= count * 1) {
                            user.nilabakar -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` nila bakar du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'bawalbakar':
        if (user.Ausdauer < 100) {
                if (user.bawalbakar >= count * 1) {
                            user.bawalbakar -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` bawal bakar du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'udangbakar':
        if (user.Ausdauer < 100) {
                if (user.udangbakar >= count * 1) {
                            user.udangbakar -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` udang bakar du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'pausbakar':
        if (user.Ausdauer < 100) {
                if (user.pausbakar >= count * 1) {
                            user.pausbakar -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` paus bakar du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
        case 'kepitingbakar':
        if (user.Ausdauer < 100) {
                if (user.kepitingbakar >= count * 1) {
                            user.kepitingbakar -= count * 1
                            user.Ausdauer += 20 * count
                            conn.reply(m.chat, `Nyam nyam`, m)
                            } else conn.reply(m.chat, ` kepiting bakar du weniger` ,m)
        } else conn.reply( m.chat, `Ausdauer du bereits penuh`, m)
        break
          default:
       await conn.reply(m.chat, list, m)
            }
    } else if (/p/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
      switch (_type) {
        case 'p':
         break
         default:
                return conn.reply(m.chat, list,m)
         }
                            
        console.log(e)
        if (DevMode) {
            for (let jid of global.Besitzer.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
            conn.reply(jid, 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*',m)
                
            }
        }
    }
}

handler.help = ['eat', 'essen']
handler.tags = ['rpg']
handler.register = true
handler.command = /^(eat|essen)$/i
handler.rpg = true
module.exports = handler