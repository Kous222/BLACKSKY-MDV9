let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  
  // Initialize daily XP tracking fields if they don't exist
  if (!user.dailyXP) user.dailyXP = 0
  if (!user.lastDailyReset) user.lastDailyReset = 0
  
  // Check if it's a new day and reset if needed
  const today = new Date().setHours(0, 0, 0, 0)
  if (user.lastDailyReset < today) {
    user.dailyXP = 0
    user.lastDailyReset = today
  }
  
  // Get the daily XP cap from the constant in _auto-xp.js
  // If it's not directly accessible, we hardcode it here (should match the value in _auto-xp.js)
  const DAILY_XP_CAP = 1500
  
  // Format percentage for progress with safety check
  const progressPercent = DAILY_XP_CAP > 0 ? Math.min(100, Math.floor((user.dailyXP / DAILY_XP_CAP) * 100)) : 0
  
  // Create progress bar (10 segments)
  let progressBar = ''
  const filledSegments = Math.floor(progressPercent / 10)
  for (let i = 0; i < 10; i++) {
    progressBar += i < filledSegments ? '█' : '▒'
  }
  
  // Calculate time until reset
  const nextReset = new Date()
  nextReset.setHours(24, 0, 0, 0)
  const timeUntilReset = nextReset - new Date()
  const hoursLeft = Math.floor(timeUntilReset / (60 * 60 * 1000))
  const minutesLeft = Math.floor((timeUntilReset % (60 * 60 * 1000)) / (60 * 1000))
  
  let message = `
📊 *TÄGLICHER XP-FORTSCHRITT* 📊

XP heute gesammelt: *${user.dailyXP}/${DAILY_XP_CAP}* (${progressPercent}%)
${progressBar}

⏱️ Tägliches XP-Limit wird zurückgesetzt in: *${hoursLeft}h ${minutesLeft}m*

🔍 Gesamte XP: *${user.exp}*
📝 Level: *${user.level}*
🏅 Rolle: *${user.role}*

ℹ️ _Je langsamer du levelst, desto wertvoller ist dein Fortschritt!_
`.trim()

  m.reply(message)
}

handler.help = ['dailyxp', 'xpdaily']
handler.tags = ['xp']
handler.command = /^(daily|dailyxp|xpdaily)$/i

module.exports = handler