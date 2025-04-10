
const Bcoal = 1500
const Scoal = 1000
const Trank = 20000
const Spotion = 100 
const Bdiamond = 100000
const Sdiamond = 1000
const Bemerald = 500000
const Semerald = 50000
const Bcommon = 100000
const Scommon = 1000
const Suncommon = 100
const Buncommon = 100000
const Bmythic = 100000
const Smythic = 1000
const Blegendary = 200000
const Slegendary = 5000
const Bmüll = 120
const Smüll = 5
const Bkayu = 1000
const Skayu = 400
const Bbotol = 300
const Sbotol = 50
const Bkaleng = 400
const Skaleng = 100
const Bkardus = 400
const Skardus = 50
const Bpisang = 5500
const Spisang = 100
const Bmangga = 4600
const Smangga = 150
const Bjeruk = 6000
const Sjeruk = 300
const Banggur = 5500
const Sanggur = 150
const Bapel = 5500
const Sapel = 400
const Bbibitpisang = 550
const Sbibitpisang = 50
const Bbibitmangga = 550
const Sbibitmangga = 50
const Bbibitjeruk = 550
const Sbibitjeruk = 50
const Bbibitanggur = 550
const Sbibitanggur = 50
const Bbibitapel = 550
const Sbibitapel = 50
const Bberlian = 150000
const Sberlian = 10000
const Bemasbatang = 250000
const Semasbatang = 10000
const Bemasbiasa = 150000
const Semasbiasa = 15000
const Bphonix = 1000000000
const Sphonix = 1000000
const Bgriffin = 100000000
const Sgriffin = 100000
const Bkyubi = 100000000
const Skyubi = 100000
const Bnaga = 100000000
const Snaga = 100000
const Bcentaur = 100000000
const Scentaur = 100000
const Bkuda = 50000000
const Skuda = 100000
const Brubah = 100000000
const Srubah = 100000
const Bkucing = 5000000
const Skucing = 50000
const Bserigala = 50000000
const Sserigala = 500000
const Bmakananpet = 50000
const Smakananpet = 500
const Bmakananphonix = 80000
const Smakananphonix = 5000
const Bmakanangriffin = 80000
const Smakanangriffin = 5000
const Bmakanannaga = 150000
const Smakanannaga = 10000
const Bmakanankyubi = 150000
const Smakanankyubi = 10000
const Bmakanancentaur = 150000
const Smakanancentaur = 10000
const Bhealtmonster = 20000
const Bpet = 150000
const Spet = 1000
const Blimit = 5
const Slimit = 20000
const Bexp = 550
const Baqua = 5000
const Saqua = 1000
const Biron = 20000
const Siron = 5000
const Bstring = 50000
const Sstring = 5000
const Bsword = 150000
const Ssword = 15000
const Bumpan = 1500
const Sumpan = 100
const Bpancingan = 5000000
const Spancingan = 500000
const BBensin = 20000
const BWeap = 150000
const SWeap = 15000
const SBensin = 10000
const Bbatu = 500
const Sbatu = 100
const Bketake = 15
const Btiketcoin = 500
const Bkoinexpg = 500000
const BObat = 15000
const ObatStock = 500
const Beleksirb = 500
const BnStock  = 9999
const WeapStock = 50
let handler  = async (m, { conn, command, args, usedPrefix, Besitzer }) => {
    const _armor = global.db.data.users[m.sender].Rüstung
    const Rüstung = (_armor == 0 ? 20000 : '' || _armor == 1 ? 49999 : '' || _armor == 2 ? 99999 : '' || _armor == 3 ? 149999 : '' || _armor == 4 ? 299999 : '')
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
    let nomors = m.sender
    const Kchat = `
╸╸━━━「 *Kaufpreise* 」━━━╺╺
> Bedürfnisse
🏷️Limit: ${Blimit}
🐉 Haustier:  ${Bpet}

> Fruchtsamen
🍌Bananensamen: ${Bbibitpisang}
🍇Weintraubensamen: ${Bbibitanggur}
🥭Mangosamen: ${Bbibitmangga}
🍊Orangensamen:  ${Bbibitjeruk}
🍎Apfelsamen:   ${Bbibitapel}

> Artikel
🥤Trank:      ${Trank}
💎Diamant:     ${Bdiamond}
❇️Smaragd:     ${Bemerald}
⛓️Eisen:        ${Biron}
💎Edelstein:     ${Bberlian}
🪙Gold:        ${Bemasbiasa}
🪨Kohle:        ${Bcoal}
📨Gewöhnlich:      ${Bcommon}
📨Ungewöhnlich:    ${Buncommon}
🎁Mythisch:      ${Bmythic}
🗃️Legendär:   ${Blegendary}
🗑️Müll:      ${Bmüll}
🧵Schnur:      ${Bstring}
🍾Flasche:       ${Bbotol}
🥫Dose:      ${Bkaleng}
📦Karton:      ${Bkardus}
🪵Holz:        ${Bkayu}
🪨Stein:        ${Bbatu}
⚔️Schwert:       ${Bsword}

> Lebensmittel
🍌Banane:        ${Bpisang}
🍇Weintraube:        ${Banggur}
🥭Mango:        ${Bmangga}
🍊Orange:         ${Bjeruk}
🍎Apfel:          ${Bapel}
🫔Tierfutter:    ${Bmakananpet}
🥩Drachenfutter:   ${Bmakanannaga}
🥩Kyubifutter:  ${Bmakanankyubi}
🥩Greifenfutter:${Bmakanangriffin}
🥩Phönixfutter: ${Bmakananphonix}
🥩Zentaurenfutter:${Bmakanancentaur}

> Getränke
🫗Wasser:          ${Baqua}

> Angeln
🪤Köder:         ${Bumpan}

╸╸━━━「 *Verkaufspreise* 」━━━╺╺
> Bedürfnisse
🏷️Limit:         ${Slimit}
🐈Haustier:           ${Spet}

> Artikel
🥤Trank:        ${Spotion}
💎Diamant:       ${Sdiamond}
📨Gewöhnlich:        ${Scommon}
🧰Ungewöhnlich:      ${Suncommon}
🎁Mythisch:        ${Smythic}
🗃️Legendär:     ${Slegendary}
🗑️Müll:        ${Smüll}
🕸️Schnur:        ${Sstring}
⛓️Eisen:          ${Siron}
🪙Gold:          ${Bemasbiasa}
🪨Kohle:          ${Bcoal}
🪨Stein:          ${Bbatu}
🍾Flasche:         ${Bbotol}
🥫Dose:        ${Bkaleng}
📦Karton:        ${Bkardus}
🪵Holz:          ${Bkayu}
💎Edelstein:       ${Sberlian}
🔫Waffe:        ${SWeap}
⚔️Schwert:         ${Ssword}

> Lebensmittel
🍌Banane:        ${Bpisang}
🍇Weintraube:        ${Banggur}
🥭Mango:        ${Bmangga}
🍊Orange:         ${Bjeruk}
🍎Apfel:          ${Bapel}
🫔Tierfutter:    ${Bmakananpet}
🥩Drachenfutter:   ${Bmakanannaga}
🥩Kyubifutter:  ${Bmakanankyubi}
🥩Greifenfutter:${Bmakanangriffin}
🥩Phönixfutter: ${Bmakananphonix}
🥩Zentaurenfutter:${Bmakanancentaur}

> Getränke
🫗Wasser:       ${Saqua}
=======================
Verwendung: ${usedPrefix}shop <Kaufen|Verkaufen> <Gegenstand> <Anzahl>
Beispiel: *${usedPrefix}shop Kaufen Trank 1*
`.trim()
    try {
        if (/shop|Geschäft/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(999999999999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
            const Müll = global.db.data.users[m.sender].Müll
            switch (jualbeli) {
            case 'Kaufen':
                switch (_type) {
                    case 'Trank':
                            if (global.db.data.users[m.sender].Münzen >= Trank * count) {
                                global.db.data.users[m.sender].Münzen -= Trank * count
                                global.db.data.users[m.sender].Trank += count * 1
                                conn.reply(m.chat, `Erfolgreich ${count} Trank für ${Trank * count} Münzen gekauft\n\nBenutze den Trank mit: *${usedPrefix}Benutzen Trank <Anzahl>*`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld, um ${count} Trank für ${Trank * count} Münzen zu kaufen`,)
                        break
                    case 'Diamant':
                            if (global.db.data.users[m.sender].Münzen >= Bdiamond * count) {
                                global.db.data.users[m.sender].Diamant += count * 1
                                global.db.data.users[m.sender].Münzen -= Bdiamond * count
                                conn.reply(m.chat, `Erfolgreich ${count} Diamant für ${Bdiamond * count} Münzen gekauft`, m)
                            } else conn.reply(m.chat, `Du hast nicht genug Geld`, m)
                        
                        break
                    case 'coal':
                            if (global.db.data.users[m.sender].Münzen >= Bcoal * count) {
                                global.db.data.users[m.sender].coal += count * 1
                                global.db.data.users[m.sender].Münzen -= Bcoal * count
                                conn.reply(m.chat, `Succes kaufen ${count} Coal mit harga ${Bcoal * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug`, m)
                        
                        break
                    case 'common':
                            if (global.db.data.users[m.sender].Münzen >= Bcommon * count) {
                                global.db.data.users[m.sender].common += count * 1
                                global.db.data.users[m.sender].Münzen -= Bcommon * count
                                conn.reply(m.chat, `Succes kaufen ${count} Gewöhnliche Kiste mit harga ${Bcommon * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Gewöhnliche Kiste mit harga ${Bcommon * count} Münzen\n\nKiste öffnen mit ketik: *${usedPrefix}Öffnen common*`, m)
                          
                        break
                    case 'uncommon':
                            if (global.db.data.users[m.sender].Münzen >= Buncommon * count) {
                                global.db.data.users[m.sender].uncommon += count * 1
                                global.db.data.users[m.sender].Münzen -= Buncommon * count
                                conn.reply(m.chat, `Succes kaufen ${count} Ungewöhnliche Kiste mit harga ${Buncommon * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Ungewöhnliche Kiste mit harga ${Buncommon * count} Münzen\n\nKiste öffnen mit ketik: *${usedPrefix}Öffnen uncommon*`, m)
                        
                        break
                    case 'mythic':
                            if (global.db.data.users[m.sender].Münzen >= Bmythic * count) {
                                    global.db.data.users[m.sender].mythic += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmythic * count
                                conn.reply(m.chat, `Succes kaufen ${count} Mythische Kiste mit harga ${Bmythic * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Mythische Kiste mit harga ${Bmythic* count} Münzen\n\nKiste öffnen mit ketik: *${usedPrefix}Öffnen mythic*`, m)
                        
                        break
                    case 'legendary':
                            if (global.db.data.users[m.sender].Münzen >= Blegendary * count) {
                                global.db.data.users[m.sender].legendary += count * 1
                                global.db.data.users[m.sender].Münzen -= Blegendary * count
                                conn.reply(m.chat, `Succes kaufen ${count} Legendäre Kiste mit harga ${Blegendary * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Legendäre Kiste mit harga ${Blegendary * count} Münzen\n\nKiste öffnen mit ketik: *${usedPrefix}Öffnen legendary*`, m)
                        
                        break
                    case 'Müll':
                            if (global.db.data.users[m.sender].Münzen >= Bmüll * count) {
                                global.db.data.users[m.sender].Müll += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmüll * count
                                conn.reply(m.chat, `Succes kaufen ${count} Müll mit harga ${Bmüll * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Müll mit harga ${Bmüll * count} Münzen`.trim(), m)
                        
                        break
                    case 'kaleng':
                            if (global.db.data.users[m.sender].Münzen >= Bkaleng * count) {
                                global.db.data.users[m.sender].kaleng += count * 1
                                global.db.data.users[m.sender].Münzen -= Bkaleng * count
                                conn.reply(m.chat, `Succes kaufen ${count} Kaleng mit harga ${Bkaleng * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Kaleng mit harga ${Bkaleng * count} Münzen`.trim(), m)
                        
                        break
                    case 'kardus':
                            if (global.db.data.users[m.sender].Münzen >= Bkardus * count) {
                                global.db.data.users[m.sender].kardus += count * 1
                                global.db.data.users[m.sender].Münzen -= Bkardus * count
                                conn.reply(m.chat, `Succes kaufen ${count} Kardus mit harga ${Bkardus * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Kardus mit harga ${Bkardus * count} Münzen`.trim(), m)
                        
                        break
                    case 'botol':
                            if (global.db.data.users[m.sender].Münzen >= Bbotol * count) {
                                global.db.data.users[m.sender].botol += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbotol * count
                                conn.reply(m.chat, `Succes kaufen ${count} Botol mit harga ${Bbotol * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} botol mit harga ${Bbotol * count} Münzen`.trim(), m)
                        
                        break
                    case 'Holz':
                            if (global.db.data.users[m.sender].Münzen >= Bkayu * count) {
                                global.db.data.users[m.sender].Holz += count * 1
                                global.db.data.users[m.sender].Münzen -= Bkayu * count
                                conn.reply(m.chat, `Succes kaufen ${count} Holz mit harga ${Bkayu * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Holz mit harga ${Bkayu * count} Münzen`.trim(), m)
                        
                        break
                    case 'pisang':
                            if (global.db.data.users[m.sender].Münzen >= Bpisang * count) {
                                global.db.data.users[m.sender].pisang += count * 1
                                global.db.data.users[m.sender].Münzen -= Bpisang * count
                                conn.reply(m.chat, `Succes kaufen ${count} Pisang mit harga ${Bpisang * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} pisang mit harga ${Bpisang * count} Münzen`.trim(), m)
                        
                        break
                    case 'anggur':
                            if (global.db.data.users[m.sender].Münzen >= Banggur * count) {
                                global.db.data.users[m.sender].anggur += count * 1
                                global.db.data.users[m.sender].Münzen -= Banggur * count
                                conn.reply(m.chat, `Succes kaufen ${count} Anggur mit harga ${Banggur * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} anggur mit harga ${Banggur * count} Münzen`.trim(), m)
                        
                        break
                    case 'mangga':
                            if (global.db.data.users[m.sender].Münzen >= Bmangga * count) {
                                global.db.data.users[m.sender].mangga += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmangga * count
                                conn.reply(m.chat, `Succes kaufen ${count} Mangga mit harga ${Bmangga * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} mangga mit harga ${Bmangga * count} Münzen`.trim(), m)
                        
                        break
                    case 'jeruk':
                            if (global.db.data.users[m.sender].Münzen >= Bjeruk * count) {
                                global.db.data.users[m.sender].jeruk += count * 1
                                global.db.data.users[m.sender].Münzen -= Bjeruk * count
                                conn.reply(m.chat, `Succes kaufen ${count} Jeruk mit harga ${Bjeruk * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} jeruk mit harga ${Bjeruk * count} Münzen`.trim(), m)
                        
                        break
                    case 'apel':
                            if (global.db.data.users[m.sender].Münzen >= Bapel * count) {
                                global.db.data.users[m.sender].apel += count * 1
                                global.db.data.users[m.sender].Münzen -= Bapel * count
                                conn.reply(m.chat, `Succes kaufen ${count} Apel mit harga ${Bapel * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} apel mit harga ${Bapel * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitpisang':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitpisang * count) {
                                global.db.data.users[m.sender].bibitpisang += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitpisang * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Pisang mit harga ${Bbibitpisang * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit pisang mit harga ${Bbibitpisang * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitanggur':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitanggur * count) {
                                global.db.data.users[m.sender].bibitanggur += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitanggur * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Anggur mit harga ${Bbibitanggur * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit anggur mit harga ${Bbibitanggur * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitmangga':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitmangga * count) {
                                global.db.data.users[m.sender].bibitmangga += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitmangga * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Mangga mit harga ${Bbibitmangga * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit mangga mit harga ${Bbibitmangga * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitjeruk':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitjeruk * count) {
                                global.db.data.users[m.sender].bibitjeruk += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitjeruk * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Jeruk mit harga ${Bbibitjeruk * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit jeruk mit harga ${Bbibitjeruk * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitapel':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitapel * count) {
                                global.db.data.users[m.sender].bibitapel += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitapel * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Apel mit harga ${Bbibitapel * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit apel mit harga ${Bbibitapel * count} Münzen`.trim(), m)
                        
                        break 
                    case 'gardenboxs':
                            if (global.db.data.users[m.sender].Münzen >= Bgardenboxs * count) {
                                global.db.data.users[m.sender].gardenboxs += count * 1
                                global.db.data.users[m.sender].Münzen -= Bgardenboxs * count
                                conn.reply(m.chat, `Succes kaufen ${count} Gardenboxs mit harga ${Bgardenboxs * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} gardenboxs mit harga ${Bgardenboxs * count} Münzen`.trim(), m)
                        
                        break
                    case 'berlian':
                            if (global.db.data.users[m.sender].Münzen >= Bberlian * count) {
                                global.db.data.users[m.sender].berlian += count * 1
                                global.db.data.users[m.sender].Münzen -= Bberlian * count
                                conn.reply(m.chat, `Succes kaufen ${count} Berlian mit harga ${Bberlian * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} berlian mit harga ${Bberlian * count} Münzen`.trim(), m)
                        
                        break
                    case 'bensin':
                            if (global.db.data.users[m.sender].Münzen >= BBensin * count) {
                                global.db.data.users[m.sender].bensin += count * 1
                                global.db.data.users[m.sender].Münzen -= BBensin * count
                                conn.reply(m.chat, `Succes kaufen ${count}L Bensin mit harga ${BBensin * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Bensin mit harga ${BBensin * count} Münzen`.trim(), m)
                        
                        break
                        case 'weapon':
                            if (global.db.data.users[m.sender].Münzen >= BWeap * count) {
                                global.db.data.users[m.sender].weapon += count * 1
                                global.db.data.users[m.sender].Münzen -= BWeap * count
                                conn.reply(m.chat, `Succes kaufen ${count} Weapon mit harga ${BWeap * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Weapon mit harga ${BWeap * count} Münzen`.trim(), m)
                        
                        break
                        case 'obat':
                            if (global.db.data.users[m.sender].Münzen >= BObat * count) {
                                global.db.data.users[m.sender].obat += count * 1
                                global.db.data.users[m.sender].Münzen -= BObat * count
                                conn.reply(m.chat, `Succes kaufen ${count} kapsul Obat mit harga ${BObat * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} kapsul Obat mit harga ${BObat * count} Münzen`.trim(), m)
                        
                        break
                        
                    case 'Gold':
                            if (global.db.data.users[m.sender].Münzen >= Bemasbiasa * count) {
                                global.db.data.users[m.sender].Gold += count * 1
                                global.db.data.users[m.sender].Münzen -= Bemasbiasa * count
                                conn.reply(m.chat, `Succes kaufen ${count} Emas mit harga ${Bemasbiasa * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Gold mit harga ${Bemasbiasa * count} Münzen`.trim(), m)
                        
                        break 
                     case 'Haustier':
                            if (global.db.data.users[m.sender].Münzen >= Bpet * count) {
                                global.db.data.users[m.sender].Haustier += count * 1
                                global.db.data.users[m.sender].Münzen -= Bpet * count
                                conn.reply(m.chat, `Succes kaufen ${count} Haustier Random mit harga ${Bpet * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Haustier random mit harga ${Bpet * count} Münzen`.trim(), m)
                        
                        break
                   case 'Limit':
                            if (global.db.data.users[m.sender].Diamant >= Blimit * count) {
                                global.db.data.users[m.sender].Limit += count * 1
                                global.db.data.users[m.sender].Diamant -= Blimit * count
                                conn.reply(m.chat, `Succes kaufen ${count} Limit mit harga ${Blimit * count} Münzen`, m)
                            } else conn.reply(m.chat, `Diamant Sie Nicht genug für kaufen ${count} Limit mit harga ${Blimit * count} Diamant`.trim(), m)
                        
                        break 
                   /*case 'Erfahrung':
                            if (global.db.data.users[m.sender].Münzen >= Bexp * count) {
                                global.db.data.users[m.sender].Erfahrung += count * 1
                                global.db.data.users[m.sender].Münzen -= Bexp * count
                                conn.reply(m.chat, `Succes kaufen ${count} Erfahrung mit harga ${Bexp * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Erfahrung mit harga ${Bexp * count} Münzen`.trim(), m)
                        
                        break
                     case 'eleksirb':
                            if (global.db.data.users[m.sender].Münzen >= Beleksirb * count) {
                                global.db.data.users[m.sender].eleksirb += count * 1
                                global.db.data.users[m.sender].Münzen -= Beleksirb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Eleksir Biru mit harga ${Beleksirb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Eleksir Biru mit harga ${Beleksirb * count} Münzen`.trim(), m)
                        
                        break
                        case 'koinexpg':
                            if (global.db.data.users[m.sender].Münzen >= Bkoinexpg * count) {
                                global.db.data.users[m.sender].koinexpg += count * 1
                                global.db.data.users[m.sender].Münzen -= Bkoinexpg * count
                                conn.reply(m.chat, `Succes kaufen ${count} Koinexpg mit harga ${Bkoinexpg * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} koinexpg mit harga ${Bkoinexpg * count} Münzen`.trim(), m)
                        
                        break*/
                  case 'cupon':
                            if (global.db.data.users[m.sender].tiketcoin >= Btiketcoin * count) {
                                global.db.data.users[m.sender].cupon += count * 1
                                global.db.data.users[m.sender].tiketcoin -= Btiketcoin * count
                                conn.reply(m.chat, `Succes kaufen ${count} cupon mit harga ${Btiketcoin * count} Tiketcoin`, m)
                            } else conn.reply(m.chat, `Tiketcoin Sie Nicht genug für kaufen ${count} cupon mit harga ${Btiketcoin * count} Tiketcoin\n\nCara erhalten tiketcoin, Sie muss memainkan alle Funktion spiel..`.trim(), m)
                        
                        break 
                  case 'makananpet':
                            if (global.db.data.users[m.sender].Münzen >= Bmakananpet * count) {
                                global.db.data.users[m.sender].makananpet += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakananpet * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Haustier mit harga ${Bmakananpet * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan Haustier mit harga ${Bmakananpet * count} Münzen`.trim(), m)
                        
                        break 
                case 'makanannaga':
                            if (global.db.data.users[m.sender].Münzen >= Bmakanannaga * count) {
                                global.db.data.users[m.sender].makanannaga += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakanannaga * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Naga mit harga ${Bmakanannaga * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan naga mit harga ${Bmakanannaga * count} Münzen`.trim(), m)
                        
                        break 
                 case 'makananphonix':
                            if (global.db.data.users[m.sender].Münzen >= Bmakananphonix * count) {
                                global.db.data.users[m.sender].makananphonix += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakananphonix * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Phonix mit harga ${Bmakananphonix * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan phonix mit harga ${Bmakananphonix * count} Münzen`.trim(), m)
                        
                        break 
                case 'makanankyubi':
                            if (global.db.data.users[m.sender].Münzen >= Bmakanankyubi * count) {
                                global.db.data.users[m.sender].makanankyubi += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakanankyubi* count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Kyubi mit harga ${Bmakanankyubi * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan kyubi mit harga ${Bmakanankyubi * count} Münzen`.trim(), m)
                        
                        break 
                 case 'makanangriffin':
                            if (global.db.data.users[m.sender].Münzen >= Bmakanangriffin * count) {
                                global.db.data.users[m.sender].makanangriffin += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakanangriffin * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Griffin mit harga ${Bmakanangriffin * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan griffin mit harga ${Bmakanangriffin * count} Münzen`.trim(), m)
                        
                        break 
                  case 'makanancentaur':
                            if (global.db.data.users[m.sender].Münzen >= Bmakanancentaur * count) {
                                global.db.data.users[m.sender].makanancentaur += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakanancentaur * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Centaur mit harga ${Bmakanancentaur * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan centaur mit harga ${Bmakanancentaur * count} Münzen`.trim(), m)
                        
                        break 
                  case 'tiketm':
                            if (global.db.data.users[m.sender].Münzen >= Bhealtmonster * count) {
                                global.db.data.users[m.sender].healtmonster += count * 1
                                global.db.data.users[m.sender].Münzen -= Bhealtmonster * count
                                conn.reply(m.chat, `Succes kaufen ${count} TiketM mit harga ${Bhealtmonster * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} tiketm mit harga ${Bhealtmonster * count} Münzen`.trim(), m)
                        
                        break
                  case 'aqua':
                            if (global.db.data.users[m.sender].Münzen >= Baqua * count) {
                                global.db.data.users[m.sender].aqua += count * 1
                                global.db.data.users[m.sender].Münzen -= Baqua * count
                                conn.reply(m.chat, `Succes kaufen ${count} Aqua mit harga ${Baqua * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} aqua mit harga ${Baqua * count} Münzen`.trim(), m)
                        
                        break
                  case 'Eisen':
                            if (global.db.data.users[m.sender].Münzen >= Biron * count) {
                                global.db.data.users[m.sender].Eisen += count * 1
                                global.db.data.users[m.sender].Münzen -= Biron * count
                                conn.reply(m.chat, `Succes kaufen ${count} Eisen mit harga ${Biron * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Eisen mit harga ${Biron * count} Münzen`.trim(), m)
                        
                        break
                  case 'Schnur':
                            if (global.db.data.users[m.sender].Münzen >= Bstring * count) {
                                global.db.data.users[m.sender].Schnur += count * 1
                                global.db.data.users[m.sender].Münzen -= Bstring * count
                                conn.reply(m.chat, `Succes kaufen ${count} Schnur mit harga ${Bstring * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Schnur mit harga ${Bstring * count} Münzen`.trim(), m)
                        
                        break
                  case 'emerald':
                            if (global.db.data.users[m.sender].Münzen >= Bemerald * count) {
                                global.db.data.users[m.sender].emerald += count * 1
                                global.db.data.users[m.sender].Münzen -= Bemerald * count
                                conn.reply(m.chat, `Succes kaufen ${count} emerald mit harga ${Bemerald * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} emerald mit harga ${Bemerald * count} Münzen`.trim(), m)
                        
                        break 
                  case 'Stein':
                            if (global.db.data.users[m.sender].Münzen >= Bbatu * count) {
                                global.db.data.users[m.sender].Stein += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbatu * count
                                conn.reply(m.chat, `Succes kaufen ${count} Stein mit harga ${Bbatu * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Stein mit harga ${Bbatu * count} Münzen`.trim(), m)
                        
                        break 
                    case 'umpan':
                            if (global.db.data.users[m.sender].Münzen >= Bumpan * count) {
                                global.db.data.users[m.sender].umpan += count * 1
                                global.db.data.users[m.sender].Münzen -= Bumpan * count
                                conn.reply(m.chat, `Succes kaufen ${count} Umpan mit harga ${Bumpan * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} umpan mit harga ${Bumpan * count} Münzen`.trim(), m)
                        
                        break 
                    case 'pancingan':
                            if (global.db.data.users[m.sender].Münzen >= Bpancingan * count) {
                                global.db.data.users[m.sender].pancingan += count * 1
                                global.db.data.users[m.sender].Münzen -= Bpancingan * count
                                conn.reply(m.chat, `Succes kaufen ${count} Pancingan mit harga ${Bpancingan * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} pancingan mit harga ${Bpancingan * count} Münzen`.trim(), m)
                        
                        break
                    case 'Rüstung':
                            if (global.db.data.users[m.sender].Rüstung == 5) return conn.reply(m.chat, 'Armormu bereits *Stufe Max*', m)
                            if (global.db.data.users[m.sender].Münzen > Rüstung) {
                                global.db.data.users[m.sender].Rüstung += 1
                                global.db.data.users[m.sender].Münzen -= Rüstung * 1
                                conn.reply(m.chat, `Succes kaufen Rüstung seharga ${Rüstung} Münzen` ,m)
                            } else conn.reply(m.chat, `Geld mu Nicht genug für kaufen Rüstung seharga ${Rüstung} Münzen`, m)
                        
                        break
                    default:
                        return conn.reply(m.chat, Kchat, m)
                }
                break
            case 'Verkaufen': 
                switch (_type) {
                    case 'Trank':
                        if (global.db.data.users[m.sender].Trank >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Spotion * count
                            global.db.data.users[m.sender].Trank -= count * 1
                            conn.reply(m.chat, `Succes verkaufen ${count} Trank mit harga ${Spotion * count} Münzen`.trim(), m)
                        } else conn.reply(m.chat, `Trank du Nicht genug`.trim(), m)
                        break
                    case 'common':
                        if (global.db.data.users[m.sender].common >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Scommon * count
                            global.db.data.users[m.sender].common -= count * 1
                            conn.reply(m.chat, `Succes verkaufen ${count} Gewöhnliche Kiste mit harga ${Scommon * count} Münzen`.trim(), m)
                        } else conn.reply(m.chat, `Gewöhnliche Kiste du Nicht genug`.trim(), m)
                        break
                    case 'uncommon':
                        if (global.db.data.users[m.sender].uncommon >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Suncommon * count
                            global.db.data.users[m.sender].uncommon -= count * 1
                            conn.reply(m.chat, `Succes verkaufen ${count} Ungewöhnliche Kiste mit harga ${Suncommon * count} Münzen`.trim(), m)
                        } else conn.reply(m.chat, `Ungewöhnliche Kiste du Nicht genug`.trim(), m)
                        break
                    case 'mythic':
                        if (global.db.data.users[m.sender].mythic >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Smythic * count
                            global.db.data.users[m.sender].mythic -= count * 1
                            conn.reply(m.chat, `Succes verkaufen ${count} Mythische Kiste mit harga ${Smythic * count} Münzen`.trim(), m)
                        } else conn.reply(m.chat, `Mythische Kiste du Nicht genug`.trim(), m)
                        break
                    case 'legendary':
                        if (global.db.data.users[m.sender].legendary >= count * 1) {
                            global.db.data.users[m.sender].Münzen += Slegendary * count
                            global.db.data.users[m.sender].legendary -= count * 1
                            conn.reply(m.chat, `Succes verkaufen ${count} Legendäre Kiste mit harga ${Slegendary * count} Münzen`.trim(), m)
                        } else conn.reply(m.chat, `Legendäre Kiste du Nicht genug`.trim(), m)
                        break
                    case 'Müll':
                        if (global.db.data.users[m.sender].Müll >= count * 1) {
                            global.db.data.users[m.sender].Müll -= count * 1
                            global.db.data.users[m.sender].Münzen += Smüll * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Müll, und Sie erhalten ${Smüll * count} Münzen`, m)
                        } else conn.reply(m.chat, `Müll Sie Nicht genug`, m)
                        break
                    case 'kaleng':
                        if (global.db.data.users[m.sender].kaleng >= count * 1) {
                            global.db.data.users[m.sender].kaleng -= count * 1
                            global.db.data.users[m.sender].Münzen += Skaleng * count
                            conn.reply(m.chat, `Succes verkaufen ${count} kaleng, und Sie erhalten ${Skaleng * count} Münzen`, m)
                        } else conn.reply(m.chat, `Kaleng Sie Nicht genug`, m)
                        break
                    case 'kardus':
                        if (global.db.data.users[m.sender].kardus >= count * 1) {
                            global.db.data.users[m.sender].kardus -= count * 1
                            global.db.data.users[m.sender].Münzen += Skardus * count
                            conn.reply(m.chat, `Succes verkaufen ${count} kardus, und Sie erhalten ${Skardus * count} Münzen`, m)
                        } else conn.reply(m.chat, `Kardus Sie Nicht genug`, m)
                        break
                    case 'botol':
                        if (global.db.data.users[m.sender].botol >= count * 1) {
                            global.db.data.users[m.sender].botol -= count * 1
                            global.db.data.users[m.sender].Münzen += Sbotol * count
                            conn.reply(m.chat, `Succes verkaufen ${count} botol, und Sie erhalten ${Sbotol * count} Münzen`, m)
                        } else conn.reply(m.chat, `Botol Sie Nicht genug`, m)
                        break
                    case 'Holz':
                        if (global.db.data.users[m.sender].Holz >= count * 1) {
                            global.db.data.users[m.sender].Holz -= count * 1
                            global.db.data.users[m.sender].Münzen += Skayu * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Holz, und Sie erhalten ${Skayu * count} Münzen`, m)
                        } else conn.reply(m.chat, `Holz Sie Nicht genug`, m)
                        break
                    case 'pisang':
                        if (global.db.data.users[m.sender].pisang >= count * 1) {
                            global.db.data.users[m.sender].pisang -= count * 1
                            global.db.data.users[m.sender].Münzen += Spisang * count
                            conn.reply(m.chat, `Succes verkaufen ${count} pisang, und Sie erhalten ${Spisang * count} Münzen`, m)
                        } else conn.reply(m.chat, `Pisang Sie Nicht genug`, m)
                        break
                    case 'anggur':
                        if (global.db.data.users[m.sender].anggur >= count * 1) {
                            global.db.data.users[m.sender].anggur -= count * 1
                            global.db.data.users[m.sender].Münzen += Sanggur * count
                            conn.reply(m.chat, `Succes verkaufen ${count} anggur, und Sie erhalten ${Sanggur * count} Münzen`, m)
                        } else conn.reply(m.chat, `Anggur Sie Nicht genug`, m)
                        break
                    case 'mangga':
                        if (global.db.data.users[m.sender].mangga >= count * 1) {
                            global.db.data.users[m.sender].mangga -= count * 1
                            global.db.data.users[m.sender].Münzen += Smangga * count
                            conn.reply(m.chat, `Succes verkaufen ${count} mangga, und Sie erhalten ${Smangga * count} Münzen`, m)
                        } else conn.reply(m.chat, `Mangga Sie Nicht genug`, m)
                        break
                    case 'jeruk':
                        if (global.db.data.users[m.sender].jeruk >= count * 1) {
                            global.db.data.users[m.sender].jeruk -= count * 1
                            global.db.data.users[m.sender].Münzen += Sjeruk * count
                            conn.reply(m.chat, `Succes verkaufen ${count} jeruk, und Sie erhalten ${Sjeruk * count} Münzen`, m)
                        } else conn.reply(m.chat, `Jeruk Sie Nicht genug`, m)
                        break
                    case 'apel':
                        if (global.db.data.users[m.sender].apel >= count * 1) {
                            global.db.data.users[m.sender].apel -= count * 1
                            global.db.data.users[m.sender].Münzen += Sapel * count
                            conn.reply(m.chat, `Succes verkaufen ${count} apel, und Sie erhalten ${Sapel * count} Münzen`, m)
                        } else conn.reply(m.chat, `Apel Sie Nicht genug`, m)
                        break
                   case 'berlian':
                        if (global.db.data.users[m.sender].berlian >= count * 1) {
                            global.db.data.users[m.sender].berlian -= count * 1
                            global.db.data.users[m.sender].Münzen += Sberlian * count
                            conn.reply(m.chat, `Succes verkaufen ${count} berlian, und Sie erhalten ${Sberlian * count} Münzen`, m)
                        } else conn.reply(m.chat, `Berlian Sie Nicht genug`, m)
                        break
                   case 'Gold':
                        if (global.db.data.users[m.sender].Gold >= count * 1) {
                            global.db.data.users[m.sender].Gold -= count * 1
                            global.db.data.users[m.sender].Münzen += Semasbiasa * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Gold , und Sie erhalten ${Semasbiasa * count} Münzen`, m)
                        } else conn.reply(m.chat, `Emas Sie Nicht genug`, m)
                        break  
                   case 'bensin':
                        if (global.db.data.users[m.sender].bensin >= count * 1) {
                            global.db.data.users[m.sender].bensin -= count * 1
                            global.db.data.users[m.sender].Münzen += SBensin * count
                            conn.reply(m.chat, `Succes verkaufen ${count} bensin , und Sie erhalten ${SBensin * count} Münzen`, m)
                        } else conn.reply(m.chat, `Bensin Sie Nicht genug`, m)  
                        break  
                   case 'weapon':
                        if (global.db.data.users[m.sender].weapon >= count * 1) {
                            global.db.data.users[m.sender].weapon -= count * 1
                            global.db.data.users[m.sender].Münzen += SWeap * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Weapon , und Sie erhalten ${SWeap * count} Münzen`, m)
                        } else conn.reply(m.chat, `Weapon Sie Nicht genug`, m)  
                        break  
                    case 'Haustier':
                        if (global.db.data.users[m.sender].Haustier >= count * 1) {
                            global.db.data.users[m.sender].Haustier -= count * 1
                            global.db.data.users[m.sender].Münzen += Spet * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Haustier random, und Sie erhalten ${Spet * count} Münzen`, m)
                        } else conn.reply(m.chat, `Haustier Random Sie Nicht genug`, m)
                        break 
                    case 'makananpet':
                        if (global.db.data.users[m.sender].makananpet >= count * 1) {
                            global.db.data.users[m.sender].makananpet -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakananpet * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan Haustier, und Sie erhalten ${Smakananpet * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan Haustier Sie Nicht genug`, m)
                        break 
                    case 'makananphonix':
                        if (global.db.data.users[m.sender].makananphonix >= count * 1) {
                            global.db.data.users[m.sender].makananphonix -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakananphonix * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan phonix, und Sie erhalten ${Smakananphonix * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan phonix Sie Nicht genug`, m)
                        break
                    case 'makanannaga':
                        if (global.db.data.users[m.sender].makanannaga >= count * 1) {
                            global.db.data.users[m.sender].makanannaga -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakanannaga * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan naga, und Sie erhalten ${Smakanannaga * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan naga Sie Nicht genug`, m)
                        break
                    case 'makanankyubi':
                        if (global.db.data.users[m.sender].makanankyuni >= count * 1) {
                            global.db.data.users[m.sender].makanankyubi -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakanankyubi * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan kyubi, und Sie erhalten ${Smakanankyubi* count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan kyubi Sie Nicht genug`, m)
                        break
                    case 'makanangriffin':
                        if (global.db.data.users[m.sender].makanangriffin >= count * 1) {
                            global.db.data.users[m.sender].makanangriffin -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakanangriffin * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan griffin, und Sie erhalten ${Smakanangriffin * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan griffin Sie Nicht genug`, m)
                        break 
                    case 'makanancentaur':
                        if (global.db.data.users[m.sender].makanancentaur >= count * 1) {
                            global.db.data.users[m.sender].makanancentaur -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakanancentaur * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan centaur, und Sie erhalten ${Smakanancentaur * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan centaur Sie Nicht genug`, m)
                        break
                    case 'aqua':
                        if (global.db.data.users[m.sender].aqua >= count * 1) {
                            global.db.data.users[m.sender].aqua -= count * 1
                            global.db.data.users[m.sender].Münzen += Saqua * count
                            conn.reply(m.chat, `Succes verkaufen ${count} aqua, und Sie erhalten ${Saqua * count} Münzen`, m)
                        } else conn.reply(m.chat, `Aqua Sie Nicht genug`, m)
                        break
                    case 'pancingan':
                        if (global.db.data.users[m.sender].pancingan >= count * 1) {
                            global.db.data.users[m.sender].pancingan -= count * 1
                            global.db.data.users[m.sender].Münzen += Spancingan * count
                            conn.reply(m.chat, `Succes verkaufen ${count} pancingan, und Sie erhalten ${Spancingan * count} Münzen`, m)
                        } else conn.reply(m.chat, `Pancingan Sie Nicht genug`, m)
                        break
                    case 'Eisen':
                        if (global.db.data.users[m.sender].Eisen >= count * 1) {
                            global.db.data.users[m.sender].Eisen -= count * 1
                            global.db.data.users[m.sender].Münzen += Siron * count
                            conn.reply(m.chat, `Succes verkaufen ${count} pancingan, und Sie erhalten ${Siron * count} Münzen`, m)
                        } else conn.reply(m.chat, `Eisen Sie Nicht genug`, m)
                        break
                    case 'Schnur':
                        if (global.db.data.users[m.sender].Schnur >= count * 1) {
                            global.db.data.users[m.sender].Schnur -= count * 1
                            global.db.data.users[m.sender].Münzen += Sstring * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Schnur, und Sie erhalten ${Sstring * count} Münzen`, m)
                        } else conn.reply(m.chat, `Schnur Sie Nicht genug`, m)
                        break
                    case 'sword':
                        if (global.db.data.users[m.sender].sword >= count * 1) {
                            global.db.data.users[m.sender].sword -= count * 1
                            global.db.data.users[m.sender].Münzen += Ssword * count
                            conn.reply(m.chat, `Succes verkaufen ${count} sword, und Sie erhalten ${Ssword * count} Münzen`, m)
                        } else conn.reply(m.chat, `Sword Sie Nicht genug`, m)
                        break
                    case 'Stein':
                        if (global.db.data.users[m.sender].Stein >= count * 1) {
                            global.db.data.users[m.sender].Stein -= count * 1
                            global.db.data.users[m.sender].Münzen += Sbatu * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Stein, und Sie erhalten ${Sbatu * count} Münzen`, m)
                        } else conn.reply(m.chat, `Stein Sie Nicht genug`, m)
                        break
                    case 'Limit':
                        if (global.db.data.users[m.sender].Limit >= count * 1) {
                            global.db.data.users[m.sender].Limit -= count * 1
                            global.db.data.users[m.sender].Münzen += Slimit * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Limit, und Sie erhalten ${Slimit * count} Münzen`, m)
                        } else conn.reply(m.chat, `Limit Sie Nicht genug`, m)
                        break
                    case 'Diamant':
                        if (global.db.data.users[m.sender].Diamant >= count * 1) {
                            global.db.data.users[m.sender].Diamant -= count * 1
                            global.db.data.users[m.sender].Münzen += Sdiamond * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Diamant, und Sie erhalten ${Sdiamond * count} Münzen`, m)
                        } else conn.reply(m.chat, `Diamant Sie Nicht genug`, m)
                        break
                    case 'coal':
                            if (global.db.data.users[m.sender].coal >= count * 1) {
                                global.db.data.users[m.sender].coal -= count * 1
                                global.db.data.users[m.sender].Münzen += Scoal * count
                                conn.reply(m.chat, `Succes verkaufen ${count} Coal, und Sie erhalten ${Scoal * count} Münzen`, m)
                            } else conn.reply(m.chat, `Coal Sie Nicht genug`, m)
                        
                        break
                    default:
                        return conn.reply(m.chat, Kchat, m)
                }
                break
            default:
                return conn.reply(m.chat, Kchat, m)
            }
        } else if (/kaufen|Kaufen/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(999999999999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
                case 'Trank':
                        if (global.db.data.users[m.sender].Münzen >= Trank * count) {
                            global.db.data.users[m.sender].Münzen -= Trank * count
                            global.db.data.users[m.sender].Trank += count * 1
                            conn.reply(m.chat, `Succes kaufen ${count} Trank mit harga ${Trank * count} Münzen\n\nGunakan Trank mit ketik: *${usedPrefix}Benutzen Trank <Anzahl>*`, m)
                        } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Trank mit harga ${Trank * count} Münzen`,m)
                    
                    break
                case 'Diamant':
                        if (global.db.data.users[m.sender].Münzen >= Bdiamond * count) {
                            global.db.data.users[m.sender].Diamant += count * 1
                            global.db.data.users[m.sender].Münzen -= Bdiamond * count
                            conn.reply(m.chat, `Succes kaufen ${count} Diamant mit harga ${Bdiamond * count} Münzen`, m)
                        } else conn.reply(m.chat, `Geld Sie Nicht genug`, m)
                    
                    break
                    case 'coal':
                            if (global.db.data.users[m.sender].Münzen >= Bcoal * count) {
                                global.db.data.users[m.sender].coal += count * 1
                                global.db.data.users[m.sender].Münzen -= Bcoal * count
                                conn.reply(m.chat, `Succes kaufen ${count} Coal mit harga ${Bcoal * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug`, m)
                        
                        break
                case 'common':
                        if (global.db.data.users[m.sender].Münzen >= Bcommon * count) {
                            global.db.data.users[m.sender].common += count * 1
                            global.db.data.users[m.sender].Münzen -= Bcommon * count
                            conn.reply(m.chat, `Succes kaufen ${count} Gewöhnliche Kiste mit harga ${Bcommon * count} Münzen`, m)
                        } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Gewöhnliche Kiste mit harga ${Bcommon * count} Münzen\n\nKiste öffnen mit ketik: *${usedPrefix}Öffnen common*`, m)
                    
                    break
                case 'uncommon':
                        if (global.db.data.users[m.sender].Münzen >= Buncommon * count) {
                            global.db.data.users[m.sender].uncommon += count * 1
                            global.db.data.users[m.sender].Münzen -= Buncommon * count
                            conn.reply(m.chat, `Succes kaufen ${count} Ungewöhnliche Kiste mit harga ${Buncommon * count} Münzen`, m)
                        } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Ungewöhnliche Kiste mit harga ${Buncommon * count} Münzen\n\nKiste öffnen mit ketik: *${usedPrefix}Öffnen uncommon*`, m)
                   
                    break
                case 'mythic':
                        if (global.db.data.users[m.sender].Münzen >= Bmythic * count) {
                            global.db.data.users[m.sender].mythic += count * 1
                            global.db.data.users[m.sender].Münzen -= Bmythic * count
                            conn.reply(m.chat, `Succes kaufen ${count} Mythische Kiste mit harga ${Bmythic * count} Münzen`, m)
                        } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Mythische Kiste mit harga ${Bmythic* count} Münzen\n\nKiste öffnen mit ketik: *${usedPrefix}Öffnen mythic*`, m)
                    
                    break
                case 'legendary':
                        if (global.db.data.users[m.sender].Münzen >= Blegendary * count) {
                            global.db.data.users[m.sender].legendary += count * 1
                            global.db.data.users[m.sender].Münzen -= Blegendary * count
                            conn.reply(m.chat, `Succes kaufen ${count} Legendäre Kiste mit harga ${Blegendary * count} Münzen`, m)
                        } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Legendäre Kiste mit harga ${Blegendary * count} Münzen\n\nKiste öffnen mit ketik: *${usedPrefix}Öffnen legendary*`, m)
                    
                    break
                case 'Müll':
                        if (global.db.data.users[m.sender].Münzen >= Bmüll * count) {
                            global.db.data.users[m.sender].Müll += count * 1
                            global.db.data.users[m.sender].Münzen -= Bmüll * count
                            conn.reply(m.chat, `Succes kaufen ${count} Müll mit harga ${Bmüll * count} Münzen`, m)
                        } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Müll mit harga ${Bmüll * count} Münzen`.trim(), m)
                    
                    break
                    case 'kaleng':
                            if (global.db.data.users[m.sender].Münzen >= Bkaleng * count) {
                                global.db.data.users[m.sender].kaleng += count * 1
                                global.db.data.users[m.sender].Münzen -= Bkaleng * count
                                conn.reply(m.chat, `Succes kaufen ${count} Kaleng mit harga ${Bkaleng * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Kaleng mit harga ${Bkaleng * count} Münzen`.trim(), m)
                        
                        break
                    case 'kardus':
                            if (global.db.data.users[m.sender].Münzen >= Bkardus * count) {
                                global.db.data.users[m.sender].kardus += count * 1
                                global.db.data.users[m.sender].Münzen -= Bkardus * count
                                conn.reply(m.chat, `Succes kaufen ${count} Kardus mit harga ${Bkardus * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Kardus mit harga ${Bkardus * count} Münzen`.trim(), m)
                        
                        break
                    case 'botol':
                            if (global.db.data.users[m.sender].Münzen >= Bbotol * count) {
                                global.db.data.users[m.sender].botol += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbotol * count
                                conn.reply(m.chat, `Succes kaufen ${count} Botol mit harga ${Bbotol * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} botol mit harga ${Bbotol * count} Münzen`.trim(), m)
                        
                        break
                    case 'Holz':
                            if (global.db.data.users[m.sender].Münzen >= Bkayu * count) {
                                global.db.data.users[m.sender].Holz += count * 1
                                global.db.data.users[m.sender].Münzen -= Bkayu * count
                                conn.reply(m.chat, `Succes kaufen ${count} Holz mit harga ${Bkayu * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Holz mit harga ${Bkayu * count} Münzen`.trim(), m)
                        
                        break
                    case 'pisang':
                            if (global.db.data.users[m.sender].Münzen >= Bpisang * count) {
                                global.db.data.users[m.sender].pisang += count * 1
                                global.db.data.users[m.sender].Münzen -= Bpisang * count
                                conn.reply(m.chat, `Succes kaufen ${count} Pisang mit harga ${Bpisang * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} pisang mit harga ${Bpisang * count} Münzen`.trim(), m)
                        
                        break
                    case 'anggur':
                            if (global.db.data.users[m.sender].Münzen >= Banggur * count) {
                                global.db.data.users[m.sender].anggur += count * 1
                                global.db.data.users[m.sender].Münzen -= Banggur * count
                                conn.reply(m.chat, `Succes kaufen ${count} Anggur mit harga ${Banggur * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} anggur mit harga ${Banggur * count} Münzen`.trim(), m)
                        
                        break
                    case 'mangga':
                            if (global.db.data.users[m.sender].Münzen >= Bmangga * count) {
                                global.db.data.users[m.sender].mangga += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmangga * count
                                conn.reply(m.chat, `Succes kaufen ${count} Mangga mit harga ${Bmangga * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} mangga mit harga ${Bmangga * count} Münzen`.trim(), m)
                        
                        break
                    case 'jeruk':
                            if (global.db.data.users[m.sender].Münzen >= Bjeruk * count) {
                                global.db.data.users[m.sender].jeruk += count * 1
                                global.db.data.users[m.sender].Münzen -= Bjeruk * count
                                conn.reply(m.chat, `Succes kaufen ${count} Jeruk mit harga ${Bjeruk * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} jeruk mit harga ${Bjeruk * count} Münzen`.trim(), m)
                        
                        break
                    case 'apel':
                            if (global.db.data.users[m.sender].Münzen >= Bapel * count) {
                                global.db.data.users[m.sender].apel += count * 1
                                global.db.data.users[m.sender].Münzen -= Bapel * count
                                conn.reply(m.chat, `Succes kaufen ${count} Apel mit harga ${Bapel * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} apel mit harga ${Bapel * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitpisang':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitpisang * count) {
                                global.db.data.users[m.sender].bibitpisang += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitpisang * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Pisang mit harga ${Bbibitpisang * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit pisang mit harga ${Bbibitpisang * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitanggur':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitanggur * count) {
                                global.db.data.users[m.sender].bibitanggur += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitanggur * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Anggur mit harga ${Bbibitanggur * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit anggur mit harga ${Bbibitanggur * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitmangga':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitmangga * count) {
                                global.db.data.users[m.sender].bibitmangga += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitmangga * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Mangga mit harga ${Bbibitmangga * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit mangga mit harga ${Bbibitmangga * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitjeruk':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitjeruk * count) {
                                global.db.data.users[m.sender].bibitjeruk += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitjeruk * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Jeruk mit harga ${Bbibitjeruk * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit jeruk mit harga ${Bbibitjeruk * count} Münzen`.trim(), m)
                        
                        break
                    case 'bibitapel':
                            if (global.db.data.users[m.sender].Münzen >= Bbibitapel * count) {
                                global.db.data.users[m.sender].bibitapel += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbibitapel * count
                                conn.reply(m.chat, `Succes kaufen ${count} Bibit Apel mit harga ${Bbibitapel * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} bibit apel mit harga ${Bbibitapel * count} Münzen`.trim(), m)
                        
                        break 
                    case 'gardenboxs':
                            if (global.db.data.users[m.sender].Münzen >= Bgardenboxs * count) {
                                global.db.data.users[m.sender].gardenboxs += count * 1
                                global.db.data.users[m.sender].Münzen -= Bgardenboxs * count
                                conn.reply(m.chat, `Succes kaufen ${count} Gardenboxs mit harga ${Bgardenboxs * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} gardenboxs mit harga ${Bgardenboxs * count} Münzen`.trim(), m)
                        
                        break
                    case 'berlian':
                            if (global.db.data.users[m.sender].Münzen >= Bberlian * count) {
                                global.db.data.users[m.sender].berlian += count * 1
                                global.db.data.users[m.sender].Münzen -= Bberlian * count
                                conn.reply(m.chat, `Succes kaufen ${count} Apel mit harga ${Bberlian * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} berlian mit harga ${Bberlian * count} Münzen`.trim(), m)
                        
                        break
                    case 'Gold':
                            if (global.db.data.users[m.sender].Münzen >= Bemasbiasa * count) {
                                global.db.data.users[m.sender].Gold += count * 1
                                global.db.data.users[m.sender].Münzen -= Bemasbiasa * count
                                conn.reply(m.chat, `Succes kaufen ${count} Emas mit harga ${Bemasbiasa * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Gold mit harga ${Bemasbiasa * count} Münzen`.trim(), m)
                        
                        break  
                     case 'Haustier':
                            if (global.db.data.users[m.sender].Münzen >= Bpet * count) {
                                global.db.data.users[m.sender].Haustier += count * 1
                                global.db.data.users[m.sender].Münzen -= Bpet * count
                                conn.reply(m.chat, `Succes kaufen ${count} Haustier Random mit harga ${Bpet * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Haustier random mit harga ${Bpet * count} Münzen`.trim(), m)
                        
                        break
                  case 'Limit':
                            if (global.db.data.users[m.sender].Diamant >= Blimit * count) {
                                global.db.data.users[m.sender].Limit += count * 1
                                global.db.data.users[m.sender].Diamant -= Blimit * count
                                conn.reply(m.chat, `Succes kaufen ${count} Limit mit harga ${Blimit * count} Münzen`, m)
                            } else conn.reply(m.chat, `Diamant Sie Nicht genug für kaufen ${count} Limit mit harga ${Blimit * count} Diamant`.trim(), m)
                        
                        break 
                   /*case 'Erfahrung':
                            if (global.db.data.users[m.sender].Münzen >= Bexp * count) {
                                global.db.data.users[m.sender].Erfahrung += count * 1
                                global.db.data.users[m.sender].Münzen -= Bexp * count
                                conn.reply(m.chat, `Succes kaufen ${count} Erfahrung mit harga ${Bexp * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Erfahrung mit harga ${Bexp * count} Münzen`.trim(), m)
                        
                        break
                     case 'eleksirb':
                            if (global.db.data.users[m.sender].Münzen >= Beleksirb * count) {
                                global.db.data.users[m.sender].eleksirb += count * 1
                                global.db.data.users[m.sender].Münzen -= Beleksirb * count
                                conn.reply(m.chat, `Succes kaufen ${count} Eleksir Biru mit harga ${Beleksirb * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Eleksir Biru mit harga ${Beleksirb * count} Münzen`.trim(), m)
                        
                        break
                        case 'koinexpg':
                            if (global.db.data.users[m.sender].Münzen >= Bkoinexpg * count) {
                                global.db.data.users[m.sender].koinexpg += count * 1
                                global.db.data.users[m.sender].Münzen -= Bkoinexpg * count
                                conn.reply(m.chat, `Succes kaufen ${count} Koinexpg mit harga ${Bkoinexpg * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} koinexpg mit harga ${Bkoinexpg * count} Münzen`.trim(), m)
                        
                        break*/
                  case 'cupon':
                            if (global.db.data.users[m.sender].tiketcoin >= Btiketcoin * count) {
                                global.db.data.users[m.sender].cupon += count * 1
                                global.db.data.users[m.sender].tiketcoin -= Btiketcoin * count
                                conn.reply(m.chat, `Succes kaufen ${count} cupon mit harga ${Btiketcoin * count} Tiketcoin`, m)
                            } else conn.reply(m.chat, `Tiketcoin Sie Nicht genug für kaufen ${count} cupon mit harga ${Btiketcoin * count} Tiketcoin\n\nCara erhalten tiketcoin, Sie muss memainkan alle Funktion spiel..`.trim(), m)
                        
                        break 
                 case 'makananpet':
                            if (global.db.data.users[m.sender].Münzen >= Bmakananpet * count) {
                                global.db.data.users[m.sender].makananpet += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakananpet * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Haustier mit harga ${Bmakananpet * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan Haustier mit harga ${Bmakananpet * count} Münzen`.trim(), m)
                        
                        break
                case 'makanannaga':
                            if (global.db.data.users[m.sender].Münzen >= Bmakanannaga * count) {
                                global.db.data.users[m.sender].makanannaga += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakanannaga * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Naga mit harga ${Bmakanannaga * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan Haustier mit harga ${Bmakanannaga * count} Münzen`.trim(), m)
                        
                        break 
                 case 'makananphonix':
                            if (global.db.data.users[m.sender].Münzen >= Bmakananphonix * count) {
                                global.db.data.users[m.sender].makananphonix += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakananphonix * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Phonix mit harga ${Bmakananphonix * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan Haustier mit harga ${Bmakananphonix * count} Münzen`.trim(), m)
                        
                        break 
                case 'makanankyubi':
                            if (global.db.data.users[m.sender].Münzen >= Bmakanankyubi * count) {
                                global.db.data.users[m.sender].makanankyubi += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakanankyubi* count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Kyubi mit harga ${Bmakanankyubi * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan kyubi mit harga ${Bmakanankyubi * count} Münzen`.trim(), m)
                        
                        break 
                 case 'makanangriffin':
                            if (global.db.data.users[m.sender].Münzen >= Bmakanangriffin * count) {
                                global.db.data.users[m.sender].makanangriffin += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakanangriffin * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Griffin mit harga ${Bmakanangriffin * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan griffin mit harga ${Bmakanangriffin * count} Münzen`.trim(), m)
                        
                        break 
                  case 'makanancentaur':
                            if (global.db.data.users[m.sender].Münzen >= Bmakanancentaur * count) {
                                global.db.data.users[m.sender].makanancentaur += count * 1
                                global.db.data.users[m.sender].Münzen -= Bmakanancentaur * count
                                conn.reply(m.chat, `Succes kaufen ${count} Makanan Centaur mit harga ${Bmakanancentaur * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} makanan centaur mit harga ${Bmakanancentaur * count} Münzen`.trim(), m)
                        
                        break 
                case 'tiketm':
                            if (global.db.data.users[m.sender].Münzen >= Bhealtmonster * count) {
                                global.db.data.users[m.sender].healtmonster += count * 1
                                global.db.data.users[m.sender].Münzen -= Bhealtmonster * count
                                conn.reply(m.chat, `Succes kaufen ${count} TiketM mit harga ${Bhealtmonster * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} tiketm mit harga ${Bhealtmonster * count} Münzen`.trim(), m)
                        
                        break
                  case 'aqua':
                            if (global.db.data.users[m.sender].Münzen >= Baqua * count) {
                                global.db.data.users[m.sender].aqua += count * 1
                                global.db.data.users[m.sender].Münzen -= Baqua * count
                                conn.reply(m.chat, `Succes kaufen ${count} Aqua mit harga ${Baqua * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} aqua mit harga ${Baqua * count} Münzen`.trim(), m)
                        
                        break
                  case 'Eisen':
                            if (global.db.data.users[m.sender].Münzen >= Biron * count) {
                                global.db.data.users[m.sender].Eisen += count * 1
                                global.db.data.users[m.sender].Münzen -= Biron * count
                                conn.reply(m.chat, `Succes kaufen ${count} Eisen mit harga ${Biron * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Eisen mit harga ${Biron * count} Münzen`.trim(), m)
                        
                        break
                  case 'Schnur':
                            if (global.db.data.users[m.sender].Münzen >= Bstring * count) {
                                global.db.data.users[m.sender].Schnur += count * 1
                                global.db.data.users[m.sender].Münzen -= Bstring * count
                                conn.reply(m.chat, `Succes kaufen ${count} Schnur mit harga ${Bstring * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Schnur mit harga ${Bstring * count} Münzen`.trim(), m)
                        
                        break
                  case 'emerald':
                            if (global.db.data.users[m.sender].Münzen >= Bemerald * count) {
                                global.db.data.users[m.sender].emerald += count * 1
                                global.db.data.users[m.sender].Münzen -= Bemerald * count
                                conn.reply(m.chat, `Succes kaufen ${count} emerald mit harga ${Bemerald * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} emerald mit harga ${Bemerald * count} Münzen`.trim(), m)
                        
                        break
                  case 'Stein':
                            if (global.db.data.users[m.sender].Münzen >= Bbatu * count) {
                                global.db.data.users[m.sender].Stein += count * 1
                                global.db.data.users[m.sender].Münzen -= Bbatu * count
                                conn.reply(m.chat, `Succes kaufen ${count} Stein mit harga ${Bbatu * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} Stein mit harga ${Bbatu * count} Münzen`.trim(), m)
                        
                        break 
                 case 'umpan':
                            if (global.db.data.users[m.sender].Münzen >= Bumpan * count) {
                                global.db.data.users[m.sender].umpan += count * 1
                                global.db.data.users[m.sender].Münzen -= Bumpan * count
                                conn.reply(m.chat, `Succes kaufen ${count} Umpan mit harga ${Bumpan * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} umpan mit harga ${Bumpan * count} Münzen`.trim(), m)
                        
                        break
                    case 'pancingan':
                            if (global.db.data.users[m.sender].Münzen >= Bpancingan * count) {
                                global.db.data.users[m.sender].pancingan += count * 1
                                global.db.data.users[m.sender].Münzen -= Bpancingan * count
                                conn.reply(m.chat, `Succes kaufen ${count} Pancingan mit harga ${Bpancingan * count} Münzen`, m)
                            } else conn.reply(m.chat, `Geld Sie Nicht genug für kaufen ${count} pancingan mit harga ${Bpancingan * count} Münzen`.trim(), m)
                        
                        break
                case 'Rüstung':
                        if (global.db.data.users[m.sender].Rüstung == 5) return conn.reply(m.chat, 'Armormu bereits *Stufe Max*', m)
                        if (global.db.data.users[m.sender].Münzen > Rüstung * 1) {
                            global.db.data.users[m.sender].Rüstung += 1
                            global.db.data.users[m.sender].Münzen -= Rüstung * 1
                            conn.reply(m.chat, `Succes kaufen Rüstung seharga ${Rüstung} Münzen` ,m)
                          
                        } else conn.reply(m.chat, `Geld mu Nicht genug für kaufen Rüstung seharga ${Rüstung} Münzen`, m)
                    
                    break
                default:
                    return conn.reply(m.chat, Kchat, m)
            }
        } else if (/Verkaufen|verkaufen|/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(999999999999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
                case 'Trank':
                    if (global.db.data.users[m.sender].Trank >= count * 1) {
                        global.db.data.users[m.sender].Münzen += Spotion * count
                        global.db.data.users[m.sender].Trank -= count * 1
                        conn.reply(m.chat, `Succes verkaufen ${count} Trank mit harga ${Spotion * count} Münzen`.trim(), m)
                    } else conn.reply(m.chat, `Trank du Nicht genug`.trim(), m)
                    break
                case 'common':
                    if (global.db.data.users[m.sender].common >= count * 1) {
                        global.db.data.users[m.sender].Münzen += Scommon * count
                        global.db.data.users[m.sender].common -= count * 1
                        conn.reply(m.chat, `Succes verkaufen ${count} Gewöhnliche Kiste mit harga ${Scommon * count} Münzen`.trim(), m)
                    } else conn.reply(m.chat, `Gewöhnliche Kiste du Nicht genug`.trim(), m)
                    break
                case 'uncommon':
                    if (global.db.data.users[m.sender].uncommon >= count * 1) {
                        global.db.data.users[m.sender].Münzen += Suncommon * count
                        global.db.data.users[m.sender].uncommon -= count * 1
                        conn.reply(m.chat, `Succes verkaufen ${count} Ungewöhnliche Kiste mit harga ${Suncommon * count} Münzen`.trim(), m)
                    } else conn.reply(m.chat, `Ungewöhnliche Kiste du Nicht genug`.trim(), m)
                    break
                case 'mythic':
                    if (global.db.data.users[m.sender].mythic >= count * 1) {
                        global.db.data.users[m.sender].Münzen += Smythic * count
                        global.db.data.users[m.sender].mythic -= count * 1
                        conn.reply(m.chat, `Succes verkaufen ${count} Mythische Kiste mit harga ${Smythic * count} Münzen`.trim(), m)
                    } else conn.reply(m.chat, `Mythische Kiste du Nicht genug`.trim(), m)
                    break
                case 'legendary':
                    if (global.db.data.users[m.sender].legendary >= count * 1) {
                        global.db.data.users[m.sender].Münzen += Slegendary * count
                        global.db.data.users[m.sender].legendary -= count * 1
                        conn.reply(m.chat, `Succes verkaufen ${count} Legendäre Kiste mit harga ${Slegendary * count} Münzen`.trim(), m)
                    } else conn.reply(m.chat, `Legendäre Kiste du Nicht genug`.trim(), m)
                    break
                case 'Müll':
                    if (global.db.data.users[m.sender].Müll >= count * 1) {
                        global.db.data.users[m.sender].Müll -= count * 1
                        global.db.data.users[m.sender].Münzen += Smüll * count
                        conn.reply(m.chat, `Succes verkaufen ${count} Müll, und Sie erhalten ${Smüll * count} Münzen`.trim(), m)
                    } else conn.reply(m.chat, `Müll Sie Nicht genug`.trim(), m)
                    break
                    case 'kaleng':
                        if (global.db.data.users[m.sender].kaleng >= count * 1) {
                            global.db.data.users[m.sender].kaleng -= count * 1
                            global.db.data.users[m.sender].Münzen += Skaleng * count
                            conn.reply(m.chat, `Succes verkaufen ${count} kaleng, und Sie erhalten ${Skaleng * count} Münzen`, m)
                        } else conn.reply(m.chat, `Kaleng Sie Nicht genug`, m)
                        break
                    case 'kardus':
                        if (global.db.data.users[m.sender].kardus >= count * 1) {
                            global.db.data.users[m.sender].kardus -= count * 1
                            global.db.data.users[m.sender].Münzen += Skardus * count
                            conn.reply(m.chat, `Succes verkaufen ${count} kardus, und Sie erhalten ${Skardus * count} Münzen`, m)
                        } else conn.reply(m.chat, `Kardus Sie Nicht genug`, m)
                        break
                    case 'botol':
                        if (global.db.data.users[m.sender].botol >= count * 1) {
                            global.db.data.users[m.sender].botol -= count * 1
                            global.db.data.users[m.sender].Münzen += Sbotol * count
                            conn.reply(m.chat, `Succes verkaufen ${count} botol, und Sie erhalten ${Sbotol * count} Münzen`, m)
                        } else conn.reply(m.chat, `Botol Sie Nicht genug`, m)
                        break
                    case 'Holz':
                        if (global.db.data.users[m.sender].Holz >= count * 1) {
                            global.db.data.users[m.sender].Holz -= count * 1
                            global.db.data.users[m.sender].Münzen += Skayu * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Holz, und Sie erhalten ${Skayu * count} Münzen`, m)
                        } else conn.reply(m.chat, `Holz Sie Nicht genug`, m)
                        break
                    case 'pisang':
                        if (global.db.data.users[m.sender].pisang >= count * 1) {
                            global.db.data.users[m.sender].pisang -= count * 1
                            global.db.data.users[m.sender].Münzen += Spisang * count
                            conn.reply(m.chat, `Succes verkaufen ${count} pisang, und Sie erhalten ${Spisang * count} Münzen`, m)
                        } else conn.reply(m.chat, `Pisang Sie Nicht genug`, m) 
                        break
                    case 'anggur':
                        if (global.db.data.users[m.sender].anggur >= count * 1) {
                            global.db.data.users[m.sender].anggur -= count * 1
                            global.db.data.users[m.sender].Münzen += Sanggur * count
                            conn.reply(m.chat, `Succes verkaufen ${count} anggur, und Sie erhalten ${Sanggur * count} Münzen`, m)
                        } else conn.reply(m.chat, `Anggur Sie Nicht genug`, m)
                        break
                    case 'mangga':
                        if (global.db.data.users[m.sender].mangga >= count * 1) {
                            global.db.data.users[m.sender].mangga -= count * 1
                            global.db.data.users[m.sender].Münzen += Smangga * count
                            conn.reply(m.chat, `Succes verkaufen ${count} mangga, und Sie erhalten ${Smangga * count} Münzen`, m)
                        } else conn.reply(m.chat, `Mangga Sie Nicht genug`, m)
                        break
                    case 'jeruk':
                        if (global.db.data.users[m.sender].jeruk >= count * 1) {
                            global.db.data.users[m.sender].jeruk -= count * 1
                            global.db.data.users[m.sender].Münzen += Sjeruk * count
                            conn.reply(m.chat, `Succes verkaufen ${count} jeruk, und Sie erhalten ${Sjeruk * count} Münzen`, m)
                        } else conn.reply(m.chat, `Jeruk Sie Nicht genug`, m)
                        break
                    case 'apel':
                        if (global.db.data.users[m.sender].apel >= count * 1) {
                            global.db.data.users[m.sender].apel -= count * 1
                            global.db.data.users[m.sender].Münzen += Sapel * count
                            conn.reply(m.chat, `Succes verkaufen ${count} apel, und Sie erhalten ${Sapel * count} Münzen`, m)
                        } else conn.reply(m.chat, `Apel Sie Nicht genug`, m)
                        break
                    case 'berlian':
                        if (global.db.data.users[m.sender].berlian >= count * 1) {
                            global.db.data.users[m.sender].berlian -= count * 1
                            global.db.data.users[m.sender].Münzen += Sberlian * count
                            conn.reply(m.chat, `Succes verkaufen ${count} berlian, und Sie erhalten ${Sberlian * count} Münzen`, m)
                        } else conn.reply(m.chat, `Berlian Sie Nicht genug`, m)
                        break
                   case 'Gold':
                        if (global.db.data.users[m.sender].Gold >= count * 1) {
                            global.db.data.users[m.sender].Gold -= count * 1
                            global.db.data.users[m.sender].Münzen += Semasbiasa * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Gold, und Sie erhalten ${Semasbiasa * count} Münzen`, m)
                        } else conn.reply(m.chat, `Emas Sie Nicht genug`, m)
                        break
                    case 'Haustier':
                        if (global.db.data.users[m.sender].Haustier >= count * 1) {
                            global.db.data.users[m.sender].Haustier -= count * 1
                            global.db.data.users[m.sender].Münzen += Spet * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Haustier random, und Sie erhalten ${Spet * count} Münzen`, m)
                        } else conn.reply(m.chat, `Haustier Random Sie Nicht genug`, m)
                        break 
                 case 'makananpet':
                        if (global.db.data.users[m.sender].makananpet >= count * 1) {
                            global.db.data.users[m.sender].makananpet -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakananpet * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan Haustier, und Sie erhalten ${Smakananpet * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan Haustier Sie Nicht genug`, m)
                        break 
                case 'makanannaga':
                        if (global.db.data.users[m.sender].makanannaga >= count * 1) {
                            global.db.data.users[m.sender].makanannaga -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakanannaga * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan naga, und Sie erhalten ${Smakanannaga * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan naga Sie Nicht genug`, m)
                        break
                 case 'makananphonix':
                        if (global.db.data.users[m.sender].makananphonix >= count * 1) {
                            global.db.data.users[m.sender].makananphonix -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakananphonix * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan phonix, und Sie erhalten ${Smakananphonix * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan phonix Sie Nicht genug`, m)
                        break
                    case 'makanankyubi':
                        if (global.db.data.users[m.sender].makanankyuni >= count * 1) {
                            global.db.data.users[m.sender].makanankyubi -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakanankyubi * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan kyubi, und Sie erhalten ${Smakanankyubi* count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan kyubi Sie Nicht genug`, m)
                        break
                    case 'makanangriffin':
                        if (global.db.data.users[m.sender].makanangriffin >= count * 1) {
                            global.db.data.users[m.sender].makanangriffin -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakanangriffin * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan griffin, und Sie erhalten ${Smakanangriffin * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan griffin Sie Nicht genug`, m)
                        break
                    case 'makanancentaur':
                        if (global.db.data.users[m.sender].makanancentaur >= count * 1) {
                            global.db.data.users[m.sender].makanancentaur -= count * 1
                            global.db.data.users[m.sender].Münzen += Smakanancentaur * count
                            conn.reply(m.chat, `Succes verkaufen ${count} makanan centaur, und Sie erhalten ${Smakanancentaur * count} Münzen`, m)
                        } else conn.reply(m.chat, `Makanan centaur Sie Nicht genug`, m)
                        break
                    case 'aqua':
                        if (global.db.data.users[m.sender].aqua >= count * 1) {
                            global.db.data.users[m.sender].aqua -= count * 1
                            global.db.data.users[m.sender].Münzen += Saqua * count
                            conn.reply(m.chat, `Succes verkaufen ${count} aqua, und Sie erhalten ${Saqua * count} Münzen`, m)
                        } else conn.reply(m.chat, `Aqua Sie Nicht genug`, m)
                        break
                    case 'pancingan':
                        if (global.db.data.users[m.sender].pancingan >= count * 1) {
                            global.db.data.users[m.sender].pancingan -= count * 1
                            global.db.data.users[m.sender].Münzen += Spancingan * count
                            conn.reply(m.chat, `Succes verkaufen ${count} pancingan, und Sie erhalten ${Spancingan * count} Münzen`, m)
                        } else conn.reply(m.chat, `Pancingan Sie Nicht genug`, m)
                        break
                    case 'Eisen':
                        if (global.db.data.users[m.sender].Eisen >= count * 1) {
                            global.db.data.users[m.sender].Eisen -= count * 1
                            global.db.data.users[m.sender].Münzen += Siron * count
                            conn.reply(m.chat, `Succes verkaufen ${count} pancingan, und Sie erhalten ${Siron * count} Münzen`, m)
                        } else conn.reply(m.chat, `Eisen Sie Nicht genug`, m)
                        break
                    case 'Schnur':
                        if (global.db.data.users[m.sender].Schnur >= count * 1) {
                            global.db.data.users[m.sender].Schnur -= count * 1
                            global.db.data.users[m.sender].Münzen += Sstring * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Schnur, und Sie erhalten ${Sstring * count} Münzen`, m)
                        } else conn.reply(m.chat, `Schnur Sie Nicht genug`, m)
                        break
                    case 'sword':
                        if (global.db.data.users[m.sender].sword >= count * 1) {
                            global.db.data.users[m.sender].sword -= count * 1
                            global.db.data.users[m.sender].Münzen += Ssword * count
                            conn.reply(m.chat, `Succes verkaufen ${count} sword, und Sie erhalten ${Ssword * count} Münzen`, m)
                        } else conn.reply(m.chat, `Sword Sie Nicht genug`, m)
                        break
                    case 'Stein':
                        if (global.db.data.users[m.sender].Stein >= count * 1) {
                            global.db.data.users[m.sender].Stein -= count * 1
                            global.db.data.users[m.sender].Münzen += Sbatu * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Stein, und Sie erhalten ${Sbatu * count} Münzen`, m)
                        } else conn.reply(m.chat, `Stein Sie Nicht genug`, m)
                        break
                    case 'Limit':
                        if (global.db.data.users[m.sender].Limit >= count * 1) {
                            global.db.data.users[m.sender].Limit -= count * 1
                            global.db.data.users[m.sender].Münzen += Slimit * count
                            conn.reply(m.chat, `Succes verkaufen ${count} Limit, und Sie erhalten ${Slimit * count} Münzen`, m)
                        } else conn.reply(m.chat, `Limit Sie Nicht genug`, m)
                        break
                    case 'Diamant':
                       if (global.db.data.users[m.sender].Diamant >= count * 1) {
                           global.db.data.users[m.sender].Diamant -= count * 1
                           global.db.data.users[m.sender].Münzen += Sdiamond * count
                           conn.reply(m.chat, `Succes verkaufen ${count} Diamant, und Sie erhalten ${Sdiamond * count} Münzen`, m)
                        } else conn.reply(m.chat, `Diamant Sie Nicht genug`, m)
                       break
                    case 'coal':
                            if (global.db.data.users[m.sender].coal >= count * 1) {
                                global.db.data.users[m.sender].coal -= count * 1
                                global.db.data.users[m.sender].Münzen += Scoal * count
                                conn.reply(m.chat, `Succes verkaufen ${count} Coal, und Sie erhalten ${Scoal * count} Münzen`, m)
                            } else conn.reply(m.chat, `Coal Sie Nicht genug`, m)
                        
                        break
                default:
                    return conn.reply(m.chat, Kchat, m)
            }
        }
    } catch (e) {
        conn.reply(m.chat, Kchat, m)
        console.log(e)
    }
}

handler.help = ['shop <Verkaufen|Kaufen> <args>', 'laden', 'geschäft']
handler.tags = ['rpg']
    
handler.command = /^(((shop|Geschäft|Kaufen|kaufen|Verkaufen|verkaufen)$|laden|geschäft)|laden|geschäft)/i
handler.Limit = true
handler.group = true
handler.rpg = true
module.exports = handler
