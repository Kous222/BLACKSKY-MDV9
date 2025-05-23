let handler = async (m, { conn, args }) => {
  let target = m.mentionedJid[0] || m.sender 
  let user = global.db.data.users[target]
  
  let Rüstung = user.Rüstung
  let sword = user.sword
  let fishingrod = user.fishingrod
  let pickaxe = user.pickaxe
  let katana = user.katana
  let bow = user.bow
  let axe = user.axe

  let capt = `
*INVENTAR - BENUTZER*

*Benutzername* : ${user.name}
*Rolle* : ${user.role}
*Stufe* : ${user.Stufe}
*Erfahrung* : ${user.exp}
*Limit* : ${user.limit}
*Münzen* : ${user.Münzen}
*Titel* : ${user.titlein}
*Fähigkeit* : ${user.Fähigkeit ? user.Fähigkeit : 'Keine vorhanden'}

━━━╺╺「 *Status* 」╸╸━━━
*Gesundheit* : ${user.healt}
*Energie* : ${user.Energie}
*Ausdauer* : ${user.Ausdauer}
*Geschwindigkeit* : ${user.speed}
*Stärke* : ${user.strenght}
*Angriff* : ${user.attack}
*Verteidigung* : ${user.defense}

━━━╺╺「 *Rucksack* 」╸╸━━━
*Trank* : ${user.potion}
*Diamant* : ${user.Diamant}
*Gold* : ${user.Gold}
*Eisen* : ${user.iron}
*Brillanten* : ${user.berlian}
*Smaragd* : ${user.emerald}
*Litecoin* : ${user.litecoin}
*Ticketmünze* : ${user.tiketcoin}
*Stein* : ${user.batu}
*Holz* : ${user.kayu}
*Schnur* : ${user.string}
*Kohle* : ${user.coal}

━━━╺╺「 *Waffe* 」╸╸━━━
*Rüstung* : ${Rüstung == 0 ? 'Nicht vorhanden' : '' || Rüstung == 1 ? 'Lederrüstung' : '' || Rüstung == 2 ? 'Eisenrüstung' : '' || Rüstung == 3 ? 'Goldrüstung' : '' || Rüstung == 4 ? 'Diamantrüstung' : '' || Rüstung == 5 ? 'Smaragdrüstung' : '' || Rüstung == 6 ? 'Kristallrüstung' : '' || Rüstung == 7 ? 'Obsidianrüstung' : '' || Rüstung == 8 ? 'Netherit-Rüstung' : '' || Rüstung == 9 ? 'Wither-Rüstung' : '' || Rüstung == 10 ? 'Drachen-Rüstung' : '' || Rüstung == 11 ? 'Hacker-Rüstung' : '' || Rüstung == 12 ? 'GOTT-Rüstung' : ''}
*Schwert* : ${sword == 0 ? 'Nicht vorhanden' : '' || sword == 1 ? 'Holzschwert' : '' || sword == 2 ? 'Eisenschwert' : '' || sword == 3 ? 'Goldschwert' : '' || sword == 4 ? 'Diamantschwert' : '' || sword == 5 ? 'Netherit-Schwert' : '' || Rüstung == 6 ? 'Kristallschwert' : '' || sword == 7 ? 'Obsidianschwert' : '' || sword == 8 ? 'Netherit-Schwert' : '' || sword == 9 ? 'Wither-Schwert' : '' || sword == 10 ? 'Drachenschwert' : '' || sword == 11 ? 'Hacker-Schwert' : '' || sword == 12 ? 'GOTT-Schwert' : ''}
*Angelrute* : ${fishingrod == 0 ? 'Nicht vorhanden' : '' || fishingrod == 1 ? 'Holzangelrute' : '' || fishingrod == 2 ? 'Eisenangelrute' : '' || fishingrod == 3 ? 'Goldangelrute' : '' || fishingrod == 4 ? 'Diamantangelrute' : '' || fishingrod == 5 ? 'Netherit-Angelrute' : '' || fishingrod == 6 ? 'Kristallangelrute' : '' || fishingrod == 7 ? 'Obsidianangelrute' : '' || fishingrod == 8 ? 'Netherit-Angelrute' : '' || fishingrod == 9 ? 'Wither-Angelrute' : '' || fishingrod == 10 ? 'Drachenangelrute' : '' || fishingrod == 11 ? 'Hacker-Angelrute' : '' || fishingrod == 12 ? 'GOTT-Angelrute' : ''}
*Spitzhacke* : ${pickaxe == 0 ? 'Nicht vorhanden' : '' || pickaxe == 1 ? 'Holzspitzhacke' : '' || pickaxe == 2 ? 'Eisenspitzhacke' : '' || pickaxe == 3 ? 'Goldspitzhacke' : '' || pickaxe == 4 ? 'Diamantspitzhacke' : '' || pickaxe == 5 ? 'Netherit-Spitzhacke' : '' || pickaxe == 6 ? 'Kristallspitzhacke' : '' || pickaxe == 7 ? 'Obsidianspitzhacke' : '' || pickaxe == 8 ? 'Netherit-Spitzhacke' : '' || pickaxe == 9 ? 'Wither-Spitzhacke' : '' || pickaxe == 10 ? 'Drachen-Spitzhacke' : '' || pickaxe == 11 ? 'Hacker-Spitzhacke' : '' || pickaxe == 12 ? 'GOTT-Spitzhacke' : ''}
*Katana* : ${katana == 0 ? 'Nicht vorhanden' : '' || katana == 1 ? 'Holzkatana' : '' || katana == 2 ? 'Eisenkatana' : '' || katana == 3 ? 'Goldkatana' : '' || katana == 4 ? 'Diamantkatana' : '' || katana == 5 ? 'Netherit-Katana' : '' || katana == 6 ? 'Kristallkatana' : '' || katana == 7 ? 'Obsidiankatana' : '' || katana == 8 ? 'Netherit-Katana' : '' || katana == 9 ? 'Wither-Katana' : '' || katana == 10 ? 'Drachen-Katana' : '' || katana == 11 ? 'Hacker-Katana' : '' || katana == 12 ? 'GOTT-Katana' : ''}
*Axt* : ${axe== 0 ? 'Nicht vorhanden' : '' || axe== 1 ? 'Holzaxt' : '' || axe== 2 ? 'Eisenaxt' : '' || axe== 3 ? 'Goldaxt' : '' || axe== 4 ? 'Diamantaxt' : '' || axe== 5 ? 'Netherit-Axt' : '' || axe== 6 ? 'Kristallaxt' : '' || axe== 7 ? 'Obsidianaxt' : '' || axe== 8 ? 'Netherit-Axt' : '' || axe== 9 ? 'Wither-Axt' : '' || axe== 10 ? 'Drachen-Axt' : '' || axe== 11 ? 'Hacker-Axt' : '' || axe== 12 ? 'GOTT-Axt' : ''}
*Bogen* : ${bow == 0 ? 'Nicht vorhanden' : '' || bow == 1 ? 'Holzbogen' : '' || bow == 2 ? 'Eisenbogen' : '' || bow == 3 ? 'Goldbogen' : '' || bow == 4 ? 'Diamantbogen' : '' || bow == 5 ? 'Netherit-Bogen' : '' || bow == 6 ? 'Kristallbogen' : '' || bow == 7 ? 'Obsidianbogen' : '' || bow == 8 ? 'Netherit-Bogen' : '' || bow == 9 ? 'Wither-Bogen' : '' || bow == 10 ? 'Drachen-Bogen' : '' || bow == 11 ? 'Hacker-Bogen' : '' || bow == 12 ? 'GOTT-Bogen' : ''}

━━━╺╺「 *Haltbarkeit* 」╸╸━━━
*Rüstung* : ${user.armordurability}
*Schwert* : ${user.sworddurability}
*Angelrute* : ${user.fishingroddurability}
*Spitzhacke* : ${user.pickaxedurability}
*Katana* : ${user.katanadurability}
*Axt* : ${user.axedurability}
*Bogen* : ${user.bowdurability}

━━━╺╺「 *Benutzer-Kisten* 」╸╸━━━
*Gewöhnlich* : ${user.common}
*Ungewöhnlich* : ${user.uncommon}
*Mystisch* : ${user.mythic}
*Legendär* : ${user.legendary}
*Gesamt-Kisten* : ${user.common + user.uncommon + user.mythic + user.legendary}

━━━╺╺「 *Benutzer-Haustiere* 」╸╸━━━
*Haustier-Token* : ${user.pet}
*Tierfutter* : ${user.Tierfutter}

*Katze* : Lv. ${user.Katze}
*Hund* : Lv. ${user.Hund}
*Fuchs* : Lv. ${user.Fuchs}
*Wolf* : Lv. ${user.Wolf}
*Phönix* : Lv. ${user.Phönix}
`
  
/*conn.sendMessage(m.chat, {
text: capt,
contextInfo: {
externalAdReply: {
title: 'I N V E N T A R',
thumbnailUrl: 'https://telegra.ph/file/ea3ee889b63edfb616c2d.jpg',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m })*/

conn.fakeReply(m.chat, capt, '0@s.whatsapp.net', 'Inventar', 'Status@broadcast')
  //conn.sendFile(m.chat, 'https://telegra.ph/file/5488aa5c5b3c28cd35e0e.jpg', 'balance.jpg', caption, m)
}

handler.help = ['inventory *@user*', 'inventar *@user*']
handler.tags = ['rpg']
handler.command = /^inv|inventory|inventar$/i
handler.rpg = true
module.exports = handler