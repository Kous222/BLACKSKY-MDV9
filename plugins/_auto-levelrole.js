/**
 * Auto Level Role plugin
 * This plugin automatically updates a user's role when 
 * they interact with the bot and gain XP
 */

const { updateRole } = require('../lib/role')
const levelling = require('../lib/levelling')

module.exports = {
  before(m) {
    let user = global.db.data.users[m.sender]
    if (!user) return false
    
    try {
      // Initialize user data if missing
      if (typeof user.exp !== 'number' || isNaN(user.exp)) user.exp = 0
      if (typeof user.level !== 'number' || isNaN(user.level)) user.level = 0
      if (!user.role) user.role = 'Newbie ㋡'
      
      // Check if the user can level up with error handling
      let canLevelUp = false
      try {
        canLevelUp = levelling.canLevelUp(user.level || 0, user.exp || 0, global.multiplier || 1)
      } catch (e) {
        console.error('Error checking level up status:', e)
      }
      
      if (canLevelUp) {
        // Store the previous level and role
        let beforeLevel = parseInt(user.level) || 0
        let beforeRole = user.role || 'Newbie ㋡'
        
        // Level up automatically with safety limits
        let levelUpCount = 0
        const maxLevelUps = 5 // Prevent more than 5 level ups at once for auto-level
        
        while (levelling.canLevelUp(user.level || 0, user.exp || 0, global.multiplier || 1) && 
               user.level < 100 && 
               levelUpCount < maxLevelUps) {
          user.level++
          levelUpCount++
        }
        
        // Update the role
        user = updateRole(user)
        
        // Notify the user if level or role changed
        if (beforeLevel !== user.level) {
          let roleChanged = beforeRole !== user.role
          let levelMessage = `
Herzlichen Glückwunsch, du bist aufgestiegen!
*${beforeLevel}* -> *${user.level}*`
          
          if (roleChanged) {
            levelMessage += `

Deine Rolle wurde aktualisiert:
*${beforeRole}* -> *${user.role}*`
          }
          
          levelMessage += `
Verwende *.profile*, um deinen Fortschritt zu überprüfen`
          
          m.reply(levelMessage.trim())
        }
      } else {
        // If no level up, still update the role to ensure consistency
        updateRole(user)
      }
    } catch (error) {
      console.error('Error in auto-levelrole:', error)
    }
    
    return true
  }
}