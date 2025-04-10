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
        
        // More restrictive level-up system - only allow 1 level-up at a time
        // This further slows down progression
        let levelUpCount = 0
        const maxLevelUps = 1 // Reduced from 5 to 1 - only allow one level at a time
        
        // Add a random chance to sometimes skip auto-level ups (20% chance)
        // This makes users need to run the .levelup command manually more often
        const skipChance = Math.random();
        if (skipChance > 0.2 && 
            levelling.canLevelUp(user.level || 0, user.exp || 0, global.multiplier || 1) && 
            user.level < 100 && 
            levelUpCount < maxLevelUps) {
          user.level++
          levelUpCount++
        }
        
        // Update the role
        user = updateRole(user)
        
        // No automatic notification for level up
        // Now users need to check their .profile or use .levelup manually
        // This creates a more "discovery-based" progression system
        
        // Update user role silently
        if (beforeLevel !== user.level) {
          // Log level up event for admin monitoring (console only)
          console.log(`User ${m.sender} leveled up: ${beforeLevel} -> ${user.level}`);
          
          // If role changed, log that too
          if (beforeRole !== user.role) {
            console.log(`User ${m.sender} role changed: ${beforeRole} -> ${user.role}`);
          }
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