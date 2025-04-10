const xpperdiamond = 1000000 
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^(buydm|kaufedia|diamantkaufen|buy_diamond|diamond_buy)/i, '')
  count = count ? /all|alle/i.test(count) ? Math.floor(global.db.data.users[m.sender].Erfahrung / xpperdiamond) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].Erfahrung >= xpperdiamond * count) {
    global.db.data.users[m.sender].Erfahrung -= xpperdiamond * count
    global.db.data.users[m.sender].Diamant += count
    conn.reply(m.chat, `
┌─「 *ZAHLUNGSBELEG* 」
‣ *Kaufbetrag* : + ${count}💎 
‣ *Ausgegeben* : -${xpperdiamond * count} EP
└──────────────`, m)
  } else conn.reply(m.chat, `❎ Entschuldigung, du hast nicht genug *EP*, um *${count}* Diamanten zu kaufen. 1.000.000 EP pro Diamant.\n\nDu kannst *EP* mit *.täglich* oder *.tagesbelohnung* sammeln, durch Spielen verdienen oder mit *.balance* oder *.kontostand* überprüfen\n\nOder du kannst aufladen mit *.DONATE* und den Beleg an *.OWNER* senden`, m)
}
handler.help = ['buydm', 'buyalldm', 'kaufedia', 'kaufalledia', 'diamantkaufen', 'allediamantenkaufen', 'buy_diamond', 'buy_all_diamonds']
handler.tags = ['econ']
handler.command = ['buydm', 'buyalldm', 'kaufedia', 'kaufalledia', 'diamantkaufen', 'allediamantenkaufen', 'buy_diamond', 'buy_all_diamonds'] 
handler.group = true
handler.rpg = true
module.exports = handler;