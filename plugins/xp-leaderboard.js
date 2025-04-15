/**
 * BocchiBot German Version - XP Leaderboard
 * Shows user rankings based on XP and level
 */

const levelling = require('../lib/levelling')
const { getRoleBadge } = require('../lib/role')

let handler = async (m, { conn, args, participants }) => {
  // Get all users with XP data
  let users = Object.entries(global.db.data.users)
    .filter(([, user]) => typeof user.exp === 'number' && user.exp > 0)
  
  // Sort by highest XP
  users.sort((a, b) => b[1].exp - a[1].exp)
  
  // Limit to top 10
  let leaderboard = users.slice(0, 10)
  
  // Format numbers for better readability
  const formatNumber = (num) => num.toLocaleString('de-DE')
  
  // Find user's rank (position in leaderboard)
  let userRank = users.findIndex(([id]) => id === m.sender) + 1
  
  // Build the leaderboard text
  let text = `
╔═══❖•ೋ°❀°ೋ•❖═══╗
   *XP RANGLISTE*  🏆
╚═══❖•ೋ°❀°ೋ•❖═══╝

${leaderboard.map(([id, user], index) => {
    // Get badge for user level
    const badge = getRoleBadge(user.level || 0)
    
    // Format name (up to 25 chars)
    let name = conn.getName(id)
    if (name.length > 25) name = name.substring(0, 22) + '...'
    
    // Create entry
    return `${index + 1}. ${badge} ${name}
   ├─ 📊 Level: ${user.level || 0}
   ├─ 💫 XP: ${formatNumber(user.exp || 0)}
   └─ 🏅 Rolle: ${user.role || 'Rekrut ㋡'}`
  }).join('\n\n')}

${userRank > 10 ? `\n┌─⊷ *DEINE POSITION*
│ 
│ 🏅 Du bist auf Platz ${userRank} von ${users.length} Benutzern
│ 
└───────────` : ''}

💡 _Die Rangliste zeigt die Top 10 Benutzer nach XP._
📊 _Verwende .levelup, um im Level aufzusteigen!_`.trim()

  m.reply(text)
}

handler.help = ['toplevel', 'topxp', 'leaderboard', 'rangliste - Zeigt die Top-10-Rangliste der Benutzer basierend auf ihren XP und Leveln. Deine eigene Position wird ebenfalls angezeigt, falls du nicht unter den Top 10 bist.']
handler.tags = ['xp']
handler.command = /^(toplevel|leaderboard|rangliste|topxp)$/i

module.exports = handler