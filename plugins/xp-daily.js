/**
 * BocchiBot German Version - Daily XP Tracker
 * Shows user's daily XP progress and time until reset
 */

const { getRoleBadge } = require('../lib/role')

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  
  // Initialize daily XP tracking fields if they don't exist
  if (!user.dailyXP) user.dailyXP = 0
  if (!user.lastDailyReset) user.lastDailyReset = 0
  if (!user.totalMessages) user.totalMessages = 0
  
  // Check if it's a new day and reset if needed
  const today = new Date().setHours(0, 0, 0, 0)
  if (user.lastDailyReset < today) {
    user.dailyXP = 0
    user.lastDailyReset = today
  }
  
  // Get the daily XP cap from the constant in _auto-xp.js
  // Must match the value in _auto-xp.js CONFIG.DAILY_XP_CAP
  const DAILY_XP_CAP = 3000
  
  // Format numbers for better readability
  const formatNumber = (num) => num.toLocaleString('de-DE')
  
  // Format percentage for progress with safety check
  const progressPercent = DAILY_XP_CAP > 0 ? Math.min(100, Math.floor((user.dailyXP / DAILY_XP_CAP) * 100)) : 0
  
  // Create progress bar (15 segments - matches profile display)
  let progressBar = ''
  const filledSegments = Math.floor((progressPercent / 100) * 15)
  for (let i = 0; i < 15; i++) {
    progressBar += i < filledSegments ? '█' : '░'
  }
  
  // Calculate time until reset
  const nextReset = new Date()
  nextReset.setHours(24, 0, 0, 0)
  const timeUntilReset = nextReset - new Date()
  const hoursLeft = Math.floor(timeUntilReset / (60 * 60 * 1000))
  const minutesLeft = Math.floor((timeUntilReset % (60 * 60 * 1000)) / (60 * 1000))
  
  // Get role badge for display
  const badge = getRoleBadge(user.level)
  
  // Determine active bonuses
  let bonusesText = '';
  if (user.premium) {
    bonusesText += `✨ *Premium-Bonus:* 30% mehr XP\n`;
  }
  if (new Date().getDay() === 0) { // Sunday
    bonusesText += `🌟 *Sonntags-Bonus:* 50% mehr XP heute\n`;
  }
  
  // Show cooldown info
  const normalCooldown = 3; // minutes, from _auto-xp.js CONFIG.NORMAL_COOLDOWN
  const specialCooldown = 1; // minutes, from _auto-xp.js CONFIG.SPECIAL_COOLDOWN
  
  let message = `
╔═══❖•ೋ°❀°ೋ•❖═══╗
   *TÄGLICHE XP-STATISTIK*  ${badge}
╚═══❖•ೋ°❀°ೋ•❖═══╝

┌─⊷ *XP FORTSCHRITT*
│ 
│ 📊 *Fortschritt: ${progressPercent}%*
│ ${progressBar}
│ 
│ 💫 *Heute gesammelt:* ${formatNumber(user.dailyXP)}/${formatNumber(DAILY_XP_CAP)}
│ 📚 *Gesamt XP:* ${formatNumber(user.exp)}
│ 
│ ⏱️ *Reset in:* ${hoursLeft}h ${minutesLeft}m
│ 
└───────────

┌─⊷ *LEVEL & ROLLE*
│ 
│ ${badge} *Level:* ${user.level}
│ 🏅 *Rolle:* ${user.role}
│ 
└───────────

${bonusesText ? `┌─⊷ *AKTIVE BONI*
│ 
│ ${bonusesText.trim().replace(/\n/g, '\n│ ')}
└───────────\n` : ''}

┌─⊷ *XP REGELN*
│ 
│ ⏳ *Standard Cooldown:* ${normalCooldown} Minuten
│ 🎮 *Spiel Cooldown:* ${specialCooldown} Minute
│ 
│ ℹ️ _Chatteilnahme, Medien teilen und_
│    _Spielen bringen XP. Bonis für RPG_
│    _Aktivitäten und Quizspiele!_
│ 
└───────────
`.trim()

  m.reply(message)
}

handler.help = ['dailyxp', 'xpdaily', 'daily - Zeigt deinen täglichen XP-Fortschritt und -Grenzen an. Enthält auch Informationen über aktive Bonuszeiten und wann das Tageslimit zurückgesetzt wird.']
handler.tags = ['xp']
handler.command = /^(daily|dailyxp|xpdaily)$/i

module.exports = handler