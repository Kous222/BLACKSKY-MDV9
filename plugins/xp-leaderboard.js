const levelling = require('../lib/levelling')
const { getRoleBadge } = require('../lib/role')

let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users)
    .filter(([, user]) => typeof user.exp === 'number' && user.exp > 0)

  users.sort((a, b) => b[1].exp - a[1].exp)
  let leaderboard = users.slice(0, 10)

  const formatNumber = (num) => num.toLocaleString('de-DE')
  let userRank = users.findIndex(([id]) => id === m.sender) + 1

  let text = `
╔═══❖•ೋ°❀°ೋ•❖═══╗
   *XP RANGLISTE*  🏆
╚═══❖•ೋ°❀°ೋ•❖═══╝

${await Promise.all(leaderboard.map(async ([id, user], index) => {
    const badge = getRoleBadge(user.level || 0)
    let name = await conn.getName(id).catch(_ => 'Unbekannt')
    if (!name) name = 'Unbekannt'
    if (name.length > 25) name = name.substring(0, 22) + '...'
    
    return `${index + 1}. ${badge} ${name}
   ├─ 📊 Level: ${user.level || 0}
   ├─ 💫 XP: ${formatNumber(user.exp || 0)}
   └─ 🏅 Rolle: ${user.role || 'Rekrut ㋡'}`
  })).then(lines => lines.join('\n\n'))}

${userRank > 10 ? `\n┌─⊷ *DEINE POSITION*
│ 
│ 🏅 Du bist auf Platz ${userRank} von ${users.length} Benutzern
│ 
└───────────` : ''}

💡 _Die Rangliste zeigt die Top 10 Benutzer nach XP._
📊 _Verwende .levelup, um im Level aufzusteigen!_`.trim()

  m.reply(text)
}

handler.help = ['toplevel', 'topxp', 'leaderboard', 'rangliste - Zeigt die Top-10-Rangliste der Benutzer basierend auf ihren XP und Leveln.']
handler.tags = ['xp']
handler.command = /^(toplevel|leaderboard|rangliste|topxp)$/i

module.exports = handler
ufzusteigen!_`.trim()

  m.reply(text)
}

handler.help = ['toplevel', 'topxp', 'leaderboard', 'rangliste - Zeigt die Top-10-Rangliste der Benutzer basierend auf ihren XP und Leveln. Deine eigene Position wird ebenfalls angezeigt, falls du nicht unter den Top 10 bist.']
handler.tags = ['xp']
handler.command = /^(toplevel|leaderboard|rangliste|topxp)$/i

module.exports = handler