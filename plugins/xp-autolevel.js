/**
 * BocchiBot German Version - Auto Level Settings
 * Toggle automatic level-up notifications on or off
 */

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Get user data
  let user = global.db.data.users[m.sender]
  
  // Initialize autolevelup if not present
  if (typeof user.autolevelup !== 'boolean') {
    user.autolevelup = true // Default to enabled
  }
  
  // If no arguments provided, show current status
  if (!args[0]) {
    return m.reply(`
┌─⊷ *AUTO-LEVEL STATUS*
│ 
│ 🤖 Auto-Level ist derzeit: ${user.autolevelup ? '*AKTIVIERT* ✅' : '*DEAKTIVIERT* ❌'}
│ 
│ Mit aktiviertem Auto-Level erhältst du automatisch 
│ private Benachrichtigungen, wenn du ein Level aufsteigst.
│ 
└───────────

Verwende ${usedPrefix}${command} ein/on um es zu aktivieren.
Verwende ${usedPrefix}${command} aus/off um es zu deaktivieren.
    `.trim())
  }
  
  // Process command based on argument
  const action = args[0].toLowerCase()
  
  if (['on', 'ein', 'enable', 'aktivieren', 'ja', 'yes'].includes(action)) {
    if (user.autolevelup) {
      return m.reply('🔄 Auto-Level ist bereits aktiviert!')
    }
    
    user.autolevelup = true
    return m.reply('✅ Auto-Level wurde aktiviert! Du erhältst nun automatisch private Benachrichtigungen, wenn du ein Level aufsteigst.')
  }
  
  if (['off', 'aus', 'disable', 'deaktivieren', 'nein', 'no'].includes(action)) {
    if (!user.autolevelup) {
      return m.reply('🔄 Auto-Level ist bereits deaktiviert!')
    }
    
    user.autolevelup = false
    return m.reply('❌ Auto-Level wurde deaktiviert! Du erhältst keine automatischen Level-Benachrichtigungen mehr.')
  }
  
  // If invalid argument
  return m.reply(`❓ Ungültige Option! Bitte verwende:
- ${usedPrefix}${command} ein/on
- ${usedPrefix}${command} aus/off`)
}

handler.help = ['autolevel', 'autolevelup', 'levelnotif', 'levelbenachrichtigung - Aktiviere oder deaktiviere automatische Level-Up-Benachrichtigungen. Mit aktivierter Funktion wirst du automatisch benachrichtigt, wenn du ein neues Level erreichst.']
handler.tags = ['xp']
handler.command = /^(autolevel(up)?|level(notif|benachrichtigung))$/i

module.exports = handler