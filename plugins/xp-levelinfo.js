/**
 * BocchiBot German Version - Level Info Command
 * Provides detailed information about level requirements
 */

const levelling = require('../lib/levelling')
const { getRoleByLevel, getRoleBadge } = require('../lib/role')

let handler = async (m, { conn, usedPrefix, command, args }) => {
  // Format numbers for better readability
  const formatNumber = (num) => num.toLocaleString('de-DE')
  
  // If a level argument is provided, show info for that level
  let targetLevel = args[0] ? parseInt(args[0]) : null
  
  // Validate level input
  if (args[0] && (isNaN(targetLevel) || targetLevel < 0 || targetLevel > levelling.maxLevel())) {
    return m.reply(`❌ Ungültiges Level! Bitte gib eine Zahl zwischen 0 und ${levelling.maxLevel()} ein.`)
  }
  
  // If no level provided, show the current user's level
  if (!targetLevel) {
    let user = global.db.data.users[m.sender]
    targetLevel = user.level || 0
  }
  
  try {
    // Get XP range for the target level
    const xpInfo = levelling.xpRange(targetLevel)
    const { min, max, xp } = xpInfo
    
    // Get next level info
    const nextLevelXP = targetLevel < levelling.maxLevel() ? 
      levelling.xpRange(targetLevel + 1).min : null
    
    // Get role info
    const role = getRoleByLevel(targetLevel)
    const badge = getRoleBadge(targetLevel)
    
    // Calculate XP to next role
    let nextRoleLevel = targetLevel + 1
    let nextRole = getRoleByLevel(nextRoleLevel)
    
    // Find the next level where the role changes
    while (nextRole === role && nextRoleLevel < levelling.maxLevel()) {
      nextRoleLevel++
      nextRole = getRoleByLevel(nextRoleLevel)
    }
    
    const xpToNextRole = nextRoleLevel <= levelling.maxLevel() ? 
      levelling.xpRange(nextRoleLevel).min - min : null
    
    // Create message
    let message = `
╔═══❖•ೋ°❀°ೋ•❖═══╗
   *LEVEL INFORMATION*  ${badge}
╚═══❖•ೋ°❀°ೋ•❖═══╝

┌─⊷ *LEVEL ${targetLevel} DETAILS*
│ 
│ 🏅 *Rolle:* ${role}
│ 
│ 📊 *XP Bereich:*
│ • Min XP: ${formatNumber(min)}
│ • Benötigt: ${formatNumber(xp)}
│ • Max XP: ${formatNumber(max)}
│ 
${nextLevelXP !== null ? `│ ⬆️ *Zum Level ${targetLevel + 1}:*
│ • Benötigt: ${formatNumber(nextLevelXP - min)} mehr XP
│ • Gesamt: ${formatNumber(nextLevelXP)} XP
│` : '│ 🏆 *MAXIMALES LEVEL ERREICHT*\n│'}
${nextRole !== role ? `│ 
│ 📈 *Nächste Rolle:*
│ • "${nextRole}" bei Level ${nextRoleLevel}
│ • Benötigt: ${formatNumber(xpToNextRole)} XP
│` : ''}
└───────────

${targetLevel === 0 ? `*Tipp:* Interagiere in Gruppen, um XP zu sammeln und im Level aufzusteigen!` : ''}
${targetLevel === levelling.maxLevel() ? `*Gratulation!* Du hast das maximale Level erreicht.` : ''}

*Verwendung:*
• ${usedPrefix}${command} - Zeigt Info zu deinem Level
• ${usedPrefix}${command} [level] - Zeigt Info zum angegebenen Level
`.trim()

    m.reply(message)
  } catch (e) {
    console.error('Level info error:', e)
    m.reply('❌ Ein Fehler ist aufgetreten bei der Berechnung der Level-Informationen.')
  }
}

handler.help = ['levelinfo', 'xpinfo', 'leveldetails - Zeigt detaillierte Informationen über ein bestimmtes Level, einschließlich XP-Anforderungen und Rollen. Du kannst eine Levelnummer angeben, oder deinen eigenen Level anzeigen lassen.']
handler.tags = ['xp']
handler.command = /^(levelinfo|xpinfo|leveldetails)$/i

module.exports = handler