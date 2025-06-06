let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
      return {...value, jid: key}
    })
    let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
    let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
    let sortedLevel = users.map(toNumber('Stufe')).sort(sort('Stufe'))
    let sortedMoney = users.map(toNumber('Münzen')).sort(sort('Münzen'))
    let sortedDiamond = users.map(toNumber('Diamant')).sort(sort('Diamant'))
    let sortedBank = users.map(toNumber('bank')).sort(sort('bank'))
    let usersExp = sortedExp.map(enumGetKey)
    let usersLim = sortedLim.map(enumGetKey)
    let usersLevel = sortedLevel.map(enumGetKey)
    let usersMoney = sortedMoney.map(enumGetKey)
    let usersDiamond = sortedDiamond.map(enumGetKey)
    let usersBank = sortedBank.map(enumGetKey)
    console.log(participants)  
    let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length)
    let text = `
  • *XP Leaderboard Top ${len}* •
  du: *${usersExp.indexOf(m.name) + 1}* von *${usersExp.length}*
  
  ${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${exp} Exp*`).join`\n`}
  
  • *Limit Leaderboard Top ${len}* •
  du: *${usersLim.indexOf(m.name) + 1}* von *${usersLim.length}*
  
  ${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${limit} Limit*`).join`\n`}
  
  • *Stufe Leaderboard Top ${len}* •
  du: *${usersLevel.indexOf(m.name) + 1}* von *${usersLevel.length}*
  
  ${sortedLevel.slice(0, len).map(({ jid, Stufe }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Stufe ${Stufe}*`).join`\n`}
  
  • *Money Leaderboard Top ${len}* •
  du: *${usersMoney.indexOf(m.name) + 1}* von *${usersMoney.length}*
  
  ${sortedMoney.slice(0, len).map(({ jid, Münzen }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Money ${Münzen}*`).join`\n`}
  
  • *Bank Leaderboard Top ${len}* •
  du: *${usersBank.indexOf(m.name) + 1}* von *${usersBank.length}*
  
  ${sortedBank.slice(0, len).map(({ jid, bank }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Bank ${bank}*`).join`\n`}
  `.trim()
    conn.reply(m.chat, text, m, {
      contextInfo: {
        mentionedJid: [...usersExp.slice(0, len), ...usersLim.slice(0, len), ...usersLevel.slice(0, len), ...usersMoney.slice(0, len), ...usersBank.slice(0, len)].filter(v => !participants.some(p => v === p.jid))
      }
    })
  }
  handler.help = ['leaderboard <Anzahl user>']
  handler.tags = ['info']
  handler.command = /^(leaderboard|lb)$/i
  handler.Besitzer = false
  handler.mods = false
  handler.Premium = false
  handler.group = true
  handler.private = false
  
  handler.admin = false
  handler.botAdmin = false
  handler.rpg = true
  
  handler.fail = null
  handler.exp = 0
  
  module.exports = handler
  
  function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
  }
  
  function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
      return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
    }
    else return a => a === undefined ? _default : a
  }
  
  function enumGetKey(a) {
    return a.jid
  }