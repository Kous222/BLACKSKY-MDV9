
module.exports = {
  before(m) {
    if (!m || !m.sender) return false
    let user = global.db.data.users[m.sender]
    if (!user) {
      global.db.data.users[m.sender] = {
        exp: 0,
        level: 0,
        role: 'Newbie ㋡'
      }
      user = global.db.data.users[m.sender]
    }

    try {
      // Initialize user data if missing
      if (typeof user.exp !== 'number' || isNaN(user.exp)) user.exp = 0
      if (typeof user.level !== 'number' || isNaN(user.level)) user.level = 0
      if (!user.role) user.role = 'Newbie ㋡'

      const levelling = require('../lib/levelling')
      const { updateRole } = require('../lib/role')

      // Check if user can level up
      const canLevelUp = levelling.canLevelUp(user.level, user.exp, global.multiplier || 1)

      if (canLevelUp) {
        const beforeLevel = user.level
        const beforeRole = user.role

        // Level up the user
        user.level++

        // Update role
        user = updateRole(user)

        // Log level up for debugging
        if (beforeLevel !== user.level) {
          console.log(`[LEVELUP] ${m.sender} ${beforeLevel} -> ${user.level}`)
          if (beforeRole !== user.role) {
            console.log(`[ROLE] ${m.sender} ${beforeRole} -> ${user.role}`)
          }
        }
      }
    } catch (error) {
      console.error('[ERROR] Auto-levelrole:', error)
    }

    return true
  }
}
