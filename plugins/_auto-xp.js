/**
 * BocchiBot German Version - Auto XP Module
 * Enhanced XP system with balanced rewards, anti-spam features,
 * daily caps, and special activity bonuses
 */

// XP Configuration Parameters
const CONFIG = {
  // Daily XP cap to prevent excessive grinding
  DAILY_XP_CAP: 3000, // Maximum XP a user can earn per day
  
  // XP cooldown to prevent spamming (in milliseconds)
  NORMAL_COOLDOWN: 180000, // 3 minutes between regular XP awards
  SPECIAL_COOLDOWN: 60000,  // 1 minute for special activities
  
  // Enable weekly bonus day (Sunday)
  BONUS_DAY_MULTIPLIER: 1.5,
  
  // XP gain multiplier for premium users
  PREMIUM_MULTIPLIER: 1.3,
  
  // Chance of getting any XP (makes leveling less predictable)
  XP_CHANCE: 0.75, // 75% chance to get XP on eligible activity
  BONUS_XP_CHANCE: 0.08 // 8% chance for bonus XP
};

// XP reward amounts for different activities
const XP_REWARDS = {
  // Basic activities
  TEXT_MESSAGE: { min: 3, max: 7 },
  COMMAND_USAGE: { min: 5, max: 10 },
  MEDIA_MESSAGE: { min: 4, max: 8 },
  STICKER_USAGE: { min: 3, max: 6 },
  VOICE_MESSAGE: { min: 4, max: 8 },
  
  // Special activities with higher rewards
  GAMES: { min: 10, max: 25 },
  QUIZ_CORRECT: { min: 15, max: 35 },
  RPG_ACTIVITY: { min: 8, max: 15 },
  
  // Default/fallback
  DEFAULT: { min: 1, max: 3 }
};

// Bonus XP for special occasions
const BONUS_XP = {
  REGULAR: { min: 1, max: 5 },
  SPECIAL: { min: 5, max: 15 },
  RARE: { min: 10, max: 30 }
};

/**
 * Generate a random XP amount within a range
 * @param {Object} range - Object containing min and max values
 * @returns {Number} - Random XP amount
 */
function getRandomXP(range) {
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

/**
 * Check if today is the bonus day (Sunday)
 * @returns {Boolean} - Whether today is a bonus day
 */
function isBonusDay() {
  return new Date().getDay() === 0; // Sunday is bonus day
}

/**
 * Award XP to a user
 * @param {Object} user - User object from the database
 * @param {String} activity - Type of activity
 * @returns {Number} - Amount of XP awarded
 */
function awardXP(user, activity) {
  if (!user) return 0;
  
  // Initialize user data if missing
  if (!user.exp) user.exp = 0;
  if (!user.dailyXP) user.dailyXP = 0;
  if (!user.lastDailyReset) user.lastDailyReset = 0;
  if (!user.lastXPTime) user.lastXPTime = 0;
  if (!user.totalMessages) user.totalMessages = 0;
  
  // Increment message counter
  user.totalMessages++;
  
  const now = Date.now();
  const today = new Date().setHours(0, 0, 0, 0);
  
  // Reset daily XP counter if it's a new day
  if (user.lastDailyReset < today) {
    user.dailyXP = 0;
    user.lastDailyReset = today;
  }
  
  // Check if user has reached daily XP cap
  if (user.dailyXP >= CONFIG.DAILY_XP_CAP) {
    return 0; // No XP awarded if daily cap is reached
  }
  
  // Determine appropriate cooldown based on activity
  const isSpecialActivity = ['games', 'quiz_correct', 'rpg_activity'].includes(activity);
  const requiredCooldown = isSpecialActivity ? CONFIG.SPECIAL_COOLDOWN : CONFIG.NORMAL_COOLDOWN;
  
  // Check cooldown between XP awards
  if (now - user.lastXPTime < requiredCooldown) return 0;
  
  // Random chance to get XP (makes leveling less predictable)
  if (Math.random() > CONFIG.XP_CHANCE) {
    user.lastXPTime = now; // Still update cooldown
    return 0;
  }
  
  // Determine XP reward based on activity
  let xpAmount = 0;
  
  switch (activity) {
    case 'text':
      xpAmount = getRandomXP(XP_REWARDS.TEXT_MESSAGE);
      break;
    case 'command':
      xpAmount = getRandomXP(XP_REWARDS.COMMAND_USAGE);
      break;
    case 'media':
      xpAmount = getRandomXP(XP_REWARDS.MEDIA_MESSAGE);
      break;
    case 'sticker':
      xpAmount = getRandomXP(XP_REWARDS.STICKER_USAGE);
      break;
    case 'voice':
      xpAmount = getRandomXP(XP_REWARDS.VOICE_MESSAGE);
      break;
    case 'games':
      xpAmount = getRandomXP(XP_REWARDS.GAMES);
      break;
    case 'quiz_correct':
      xpAmount = getRandomXP(XP_REWARDS.QUIZ_CORRECT);
      break;
    case 'rpg_activity':
      xpAmount = getRandomXP(XP_REWARDS.RPG_ACTIVITY);
      break;
    default:
      xpAmount = getRandomXP(XP_REWARDS.DEFAULT);
  }
  
  // Apply premium user bonus if applicable
  if (user.premium) {
    xpAmount = Math.floor(xpAmount * CONFIG.PREMIUM_MULTIPLIER);
  }
  
  // Apply bonus day multiplier if applicable
  if (isBonusDay()) {
    xpAmount = Math.floor(xpAmount * CONFIG.BONUS_DAY_MULTIPLIER);
  }
  
  // Random chance for bonus XP
  if (Math.random() < CONFIG.BONUS_XP_CHANCE) {
    // Determine bonus tier based on total messages
    let bonusXP = 0;
    if (user.totalMessages > 5000) {
      bonusXP = getRandomXP(BONUS_XP.RARE);
    } else if (user.totalMessages > 1000) {
      bonusXP = getRandomXP(BONUS_XP.SPECIAL);
    } else {
      bonusXP = getRandomXP(BONUS_XP.REGULAR);
    }
    
    xpAmount += bonusXP;
  }
  
  // Adjust XP amount to not exceed daily cap
  const xpToAward = Math.min(xpAmount, CONFIG.DAILY_XP_CAP - user.dailyXP);
  
  // Award XP, update daily counter and cooldown
  user.exp += xpToAward;
  user.dailyXP += xpToAward;
  user.lastXPTime = now;
  
  return xpToAward;
}

/**
 * Determine activity type from message
 * @param {Object} m - Message object
 * @returns {String} - Activity type
 */
function getActivityType(m) {
  // Check for RPG commands (based on common prefixes or keywords)
  if (m.text && /^\.?(adventure|hunt|fish|mine|work|dungeon|quest|battle)/i.test(m.text)) {
    return 'rpg_activity';
  }
  
  // Check for game commands
  if (m.text && /^\.?(game|play|tebak|quiz|math|suit)/i.test(m.text)) {
    return 'games';
  }
  
  // Check for quiz answers (typically short responses after quiz questions)
  if (m.text && m.quoted && m.text.length < 20 && m.quoted.text && 
      /tebak|quiz|pertanyaan|question|guess/i.test(m.quoted.text)) {
    return 'quiz_correct';  // We don't actually know if it's correct, but we'll count it as quiz activity
  }
  
  // Standard message types
  if (m.text && typeof global.prefix === 'string' && m.text.startsWith(global.prefix)) {
    return 'command';  // Command
  } else if (m.text && global.prefix instanceof RegExp && global.prefix.test(m.text)) {
    return 'command';  // Command (regex prefix)
  } else if (m.mtype === 'stickerMessage') {
    return 'sticker';  // Sticker
  } else if (m.mtype === 'audioMessage' || m.mtype === 'pttMessage') {
    return 'voice';    // Voice/audio
  } else if (['imageMessage', 'videoMessage', 'documentMessage'].includes(m.mtype)) {
    return 'media';    // Media file
  } else {
    return 'text';     // Default to text
  }
}

module.exports = {
  before(m) {
    // Skip if not in a group (we only reward XP in groups)
    if (!m.isGroup) return;
    
    // Skip if no message content
    if (!m.text && !m.mtype) return;
    
    try {
      // Get user from database
      let user = global.db.data.users[m.sender];
      if (!user) return;
      
      // Determine activity type
      const activityType = getActivityType(m);
      
      // Award XP based on activity
      const xpAwarded = awardXP(user, activityType);
      
      // Debug log (uncomment if needed)
      // if (xpAwarded > 0) {
      //   console.log(`[XP] ${m.sender} received ${xpAwarded} XP for ${activityType}`);
      // }
      
      return true;
    } catch (e) {
      console.error('[AUTO-XP] Error:', e);
      return true; // Continue execution even if there's an error
    }
  }
};