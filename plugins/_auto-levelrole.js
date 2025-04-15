
/**
 * BocchiBot German Version - Automatic Level Up & Role Update
 * This module silently checks and updates user levels and roles
 * without sending notifications to the chat
 */

module.exports = {
  before(m) {
    if (!m || !m.sender) return false

    // Get user data or initialize if not exists
    let user = global.db.data.users[m.sender]
    if (!user) {
      global.db.data.users[m.sender] = {
        exp: 0,
        level: 0,
        role: 'Rekrut ㋡',
        autolevelup: true,
        lastNotification: 0
      }
      user = global.db.data.users[m.sender]
    }

    try {
      // Initialize user data if missing
      if (typeof user.exp !== 'number' || isNaN(user.exp)) user.exp = 0
      if (typeof user.level !== 'number' || isNaN(user.level)) user.level = 0
      if (!user.role) user.role = 'Rekrut ㋡'
      if (typeof user.autolevelup !== 'boolean') user.autolevelup = true
      if (!user.lastNotification) user.lastNotification = 0

      // Import required modules
      const levelling = require('../lib/levelling')
      const { updateRole, getRoleBadge } = require('../lib/role')

      // Calculate if the user can level up
      const calculatedLevel = levelling.findLevel(user.exp, global.multiplier || 1)
      
      // Check if user has enough XP to level up
      if (calculatedLevel > user.level) {
        const beforeLevel = user.level
        const beforeRole = user.role
        const levelGain = calculatedLevel - user.level

        // Set the new level
        user.level = calculatedLevel

        // Update role based on new level
        user = updateRole(user)

        // Log level up for debugging
        console.log(`[LEVELUP] ${m.sender} ${beforeLevel} -> ${user.level} (+${levelGain} levels)`)
        
        // Log role change if applicable
        if (beforeRole !== user.role) {
          console.log(`[ROLE] ${m.sender} ${beforeRole} -> ${user.role}`)
        }

        // If autolevelup is enabled and it's been at least 30 minutes since last notification,
        // send a private level up notification to avoid chat spam
        const now = Date.now()
        const NOTIFICATION_COOLDOWN = 30 * 60 * 1000 // 30 minutes
        
        if (user.autolevelup && (now - user.lastNotification > NOTIFICATION_COOLDOWN)) {
          // Only send notification for significant level ups (every 5 levels) or role changes
          const isSignificantLevel = user.level % 5 === 0 || levelGain >= 3
          const hasRoleChanged = beforeRole !== user.role
          
          if (isSignificantLevel || hasRoleChanged) {
            try {
              // Get badge for the current level
              const badge = getRoleBadge(user.level)
              
              // Create a private message to the user about their level up
              const conn = m.conn || global.conn
              const message = `
*╔══════════════════╗*
*║ LEVEL AUFSTIEG! ${badge}*
*╚══════════════════╝*

Du bist aufgestiegen!
*${beforeLevel}* → *${user.level}* (${levelGain > 1 ? `+${levelGain} Level` : ``})
${hasRoleChanged ? `\nNeue Rolle: *${user.role}*` : ''}

Dein Fortschritt wird automatisch aktualisiert.
`.trim()

              // Send as private message
              conn.sendMessage(m.sender, { text: message })
              
              // Update notification timestamp
              user.lastNotification = now
            } catch (err) {
              console.error('[LEVELUP-NOTIFICATION] Error:', err)
            }
          }
        }
      }
    } catch (error) {
      console.error('[AUTO-LEVELROLE] Error:', error)
    }

    return true
  }
}
