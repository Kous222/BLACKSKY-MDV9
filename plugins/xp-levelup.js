let levelling = require('../lib/levelling')
let { getRoleByLevel } = require('../lib/role')

let handler = m => {
  let user = global.db.data.users[m.sender]
  
  // Initialize user data if missing
  if (!user.exp) user.exp = 0
  if (!user.level) user.level = 0
  if (!user.role) user.role = 'Newbie ㋡'
  
  try {
    // Check if the user can level up - with error handling
    const canLevelUp = levelling.canLevelUp(user.level || 0, user.exp || 0, global.multiplier || 1)
    
    if (!canLevelUp) {
      // Get level information safely
      let levelInfo = { min: 0, xp: 1, max: 100 }
      try {
        levelInfo = levelling.xpRange(user.level || 0, global.multiplier || 1)
      } catch (e) {
        console.error('XP range calculation error:', e)
      }
      
      const { min, xp, max } = levelInfo
      const currentXP = Math.max(0, (user.exp || 0) - min)
      const xpNeeded = Math.max(0, max - (user.exp || 0))
      
      throw `
Level *${user.level} (${currentXP}/${xp})*
Noch *${xpNeeded}* XP nötig!
`.trim()
    }

    // Save the previous level before the level-up attempt
    let before = parseInt(user.level) || 0
    let oldRole = user.role || 'Newbie ㋡'

    // Restrict manual level-ups to be more challenging
    // Increased difficulty for manual level-ups
    let levelUpCount = 0
    const maxLevelUps = 3 // Reduced from 10 to 3 - prevent more than 3 level ups at once
    
    while (levelling.canLevelUp(user.level || 0, user.exp || 0, global.multiplier || 1) && 
           user.level < 100 && 
           levelUpCount < maxLevelUps) {
      user.level++
      levelUpCount++
    }

    // Update the user's role based on the new level
    user.role = getRoleByLevel(user.level || 0)

    // If the level has changed, notify the user
    if (before !== user.level) {
      let roleChanged = oldRole !== user.role
      let levelMessage = `
Herzlichen Glückwunsch, du bist aufgestiegen!
*${before}* -> *${user.level}*`

      if (roleChanged) {
        levelMessage += `

Deine Rolle wurde aktualisiert:
*${oldRole}* -> *${user.role}*`
      }

      levelMessage += `
Verwende *.profile*, um deinen Fortschritt zu überprüfen`

      m.reply(levelMessage.trim())
    } else {
      m.reply('Du hast noch nicht genug XP, um im Level aufzusteigen.')
    }
  } catch (e) {
    if (typeof e === 'string') throw e
    console.error('Level up error:', e)
    m.reply('Es gab einen Fehler beim Levelaufstieg. Bitte versuche es erneut.')
  }
}

handler.help = ['levelup', 'Verwende diesen Befehl, um im Level aufzusteigen, wenn du genug XP hast. Das neue Levelsystem ist langsamer und belohnender - Levelfortschritt wird auf dem Weg zum Maximum von Level 100 immer schwieriger.']
handler.tags = ['xp']

handler.command = /^level(|up)$/i

module.exports = handler
