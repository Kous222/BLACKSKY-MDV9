let handler = async (m, { conn, command, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase()
    let users = global.db.data.users[m.sender]
    let time = users.lastkerja + 300000
    let __timers = (new Date - users.lastkerja)
    let _timers = (0 - __timers)
    let timers = clockString(_timers)
    let penumpan = ['Herr', 'Dame', 'Student', 'Schüler', 'ältere Dame']
    let penumpang = penumpan[Math.floor(Math.random() * penumpan.length)]
    let daganga = ['Karotten', 'Kohl', 'Salat', 'Tomaten', 'Sellerie', 'Chili', 'Fleisch', 'Fisch', 'Hühnchen']
    let dagangan = daganga[Math.floor(Math.random() * daganga.length)]
    let pasie = ['Kopfschmerzen', 'Verletzung', 'Verbrennung', 'Knochenbruch']
    let pasien = pasie[Math.floor(Math.random() * pasie.length)]
    let pane = ['Karotten', 'Kohl', 'Erdbeeren', 'Tee', 'Reis', 'Orangen', 'Bananen', 'Wassermelonen', 'Durian', 'Rambutan']
    let panen = pane[Math.floor(Math.random() * pane.length)]
    let bengke = ['Auto', 'Motorrad', 'Rikscha', 'Taxi', 'Bus', 'Kleinbus', 'Dreirad', 'Fahrrad']
    let bengkel = bengke[Math.floor(Math.random() * bengke.length)]
    let ruma = ['Haus bauen', 'Gebäude bauen', 'Haus reparieren', 'Gebäude reparieren', 'Öffentliche Einrichtung bauen', 'Öffentliche Einrichtung reparieren']
    let rumah = ruma[Math.floor(Math.random() * ruma.length)]
    let pnjh = ['Dieb', 'Verkehrssünder', 'Bankräuber', 'Taschendieb', 'Korruptionsverdächtiger']
    let pnjht = pnjh[Math.floor(Math.random() * pnjh.length)]
    
    if (/kerjadulu|arbeiten|work|arbeit/i.test(command)) {
        switch (type) {
            case 'ojek':
                if (new Date - users.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für ${clockString(time - new Date())}`)
                let hasilojek = Math.floor(Math.random() * 5000000)
                m.reply(`Du hast *${penumpang}* transportiert 🚗\nUnd erhältst dafür *${hasilojek} Münzen*`).then(() => {
                    users.Münzen += hasilojek
                    users.lastkerja = new Date * 1
                })
                break
            case 'pedagang':
                if (new Date - users.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für\n🕜 ${clockString(time - new Date())}`)
                let hasildagang = Math.floor(Math.random() * 5000000)
                m.reply(`Du hast Kunden gewonnen, die *${dagangan}* kaufen 🛒\nUnd erhältst dafür *${hasildagang} Münzen*`).then(() => {
                    users.Münzen += hasildagang
                    users.lastkerja = new Date * 1
                })
                break
            case 'dokter':
                if (new Date - users.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für\n🕜 ${clockString(time - new Date())}`)
                let hasildokter = Math.floor(Math.random() * 5000000)
                m.reply(`Du hast einen Patienten mit *${pasien}* geheilt 💉\nUnd erhältst dafür *${hasildokter} Münzen*`).then(() => {
                    users.Münzen += hasildokter
                    users.lastkerja = new Date * 1
                })
                break
            case 'petani':
                if (new Date - users.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für\n🕜 ${clockString(time - new Date())}`)
                let hasiltani = Math.floor(Math.random() * 5000000)
                m.reply(`Du hast *${panen}* geerntet! 🌽 Und verkauft 🧺\nUnd erhältst dafür *${hasiltani} Münzen*`).then(() => {
                    users.Münzen += hasiltani
                    users.lastkerja = new Date * 1
                })
                break
            case 'montir':
                if (new Date - users.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für\n🕜 ${clockString(time - new Date())}`)
                let hasilmontir = Math.floor(Math.random() * 5000000)
                m.reply(`Du hast einen Kunden bedient und ein *${bengkel} 🔧* repariert\nUnd erhältst dafür *${hasilmontir} Münzen*`).then(() => {
                    users.Münzen += hasilmontir
                    users.lastkerja = new Date * 1
                })
                break
            case 'kuli':
                if (new Date - users.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für\n🕜 ${clockString(time - new Date())}`)
                let hasilkuli = Math.floor(Math.random() * 5000000)
                m.reply(`Du hast gerade ${rumah} fertiggestellt 🔨\nUnd erhältst dafür *${hasilkuli} Münzen*`).then(() => {
                    users.Münzen += hasilkuli
                    users.lastkerja = new Date * 1
                })
                break
            case 'polisi':
                if (new Date - users.lastkerja < 300000) return m.reply(`Du arbeitest bereits\nZeit für eine Pause für\n🕜 ${clockString(time - new Date())}`)
                let hasilpolis = Math.floor(Math.random() * 5000000)
                m.reply(`Du hast gerade einen ${pnjht} verhaftet 🚨\nUnd erhältst dafür *${hasilpolis} Münzen*`).then(() => {
                    users.Münzen += hasilpolis
                    users.lastkerja = new Date * 1
                })
                break
            default:
                //return m.reply(`_*Wähle einen Beruf, den du ausüben möchtest*_\n\n_• Bauarbeiter_ \n_• Mechaniker_ \n_• Bauer_ \n_• Arzt_ \n_• Händler_ \n_• Fahrer_ \n\nBeispiel zur Verwendung:\n${usedPrefix}arbeiten Bauarbeiter`)
let judul = `
_*Wähle einen Beruf, den du ausüben möchtest*_

- Arzt [👨‍⚕]
- Händler [👨🏻‍🍳]
- Fahrer [🛵] 
- Bauarbeiter [👷‍♂️]
- Mechaniker [👨‍🔧]
- Bauer [👨‍🌾]
- Polizist [👮]
`
                let msg = {
                viewOnceMessage: {
                        message: {
                                messageContextInfo: {
                                        deviceListMetadata: {},
                                        deviceListMetadataVersion: 2,
                                },
                                interactiveMessage: {
                                        body: {
                                                text: judul,
                                        },
                                        footer: {
                                                text: `by Killua Fourteen`,
                                        },
                                        header: {
                                                title: '',
                                                subtitle: '',
                                                hasMediaAttachment: false
                                        },
                                        nativeFlowMessage: {
                                                buttons: [
                                                        {
              "name": "single_select",
              "buttonParamsJson":
JSON.stringify({
 "title": "Wähle einen Beruf",
"sections": [
      {
        title: 'Berufsliste',
        highlight_label: 'Auswählen', /*personal*/
        rows: [
          { "header": "", "title": 'Arzt [👨‍⚕]', "description": "Als Arzt arbeiten", "id": `.arbeiten dokter` },
          { "header": "", "title": 'Händler [👨🏻‍🍳]', "description": "Als Händler arbeiten", "id": `.arbeiten pedagang` },
          { "header": "", "title": 'Fahrer [🛵]', "description": "Als Fahrer arbeiten", "id": `.arbeiten ojek` },
          { "header": "", "title": 'Bauarbeiter [👷‍♂️]', "description": "Als Bauarbeiter arbeiten", "id": `.arbeiten kuli` },
          { "header": "", "title": 'Mechaniker [👨‍🔧]', "description": "Als Mechaniker arbeiten", "id": `.arbeiten montir` },
          { "header": "", "title": 'Bauer [👨‍🌾]', "description": "Als Bauer arbeiten", "id": `.arbeiten petani` },
          { "header": "", "title": 'Polizist [👮]', "description": "Als Polizist arbeiten", "id": `.arbeiten polisi` },
        ]
      }
    ]
              })              
            } 
                                                ],
                                        },
                                        contextInfo: {
                                                quotedMessage: m.message,
                                                participant: m.sender,
                                                ...m.key
                                        },
                                    
                                },
                        },
                },
        };
         return conn.relayMessage(m.chat, msg, { });
        }
    }
}
handler.help = ['arbeiten', 'arbeit', 'work']
handler.tags = ['rpg']
handler.command = /^(arbeiten|arbeit|work)$/i

handler.register = true
handler.group = true
handler.rpg = true

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}