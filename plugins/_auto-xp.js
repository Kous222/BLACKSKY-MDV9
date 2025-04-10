/**
 * Auto XP module
 * This plugin automatically awards XP to users when they are active in groups or use bot commands
 * Improved with daily XP caps and slower progression
 */

// Daily XP cap to prevent excessive grinding
const DAILY_XP_CAP = 1500; // Maximum XP a user can earn per day

// Set XP reward amounts for different activities (significantly reduced for slower progression)
const XP_REWARDS = {
  TEXT_MESSAGE: { min: 1, max: 3 },        // Reduced XP for regular text messages
  MEDIA_MESSAGE: { min: 1, max: 4 },       // Reduced XP for sending media (images, videos, etc.)
  COMMAND_USAGE: { min: 2, max: 8 },       // Reduced XP for using bot commands
  STICKER_USAGE: { min: 1, max: 3 },       // Reduced XP for sending stickers
  VOICE_MESSAGE: { min: 1, max: 4 },       // Reduced XP for voice messages
  GROUP_ACTIVITY: { min: 1, max: 2 }       // Reduced XP for other group activities
};

// XP cooldown to prevent spamming (in milliseconds)
const XP_COOLDOWN = 300000; // 5 minutes cooldown (increased from 1 minute)

/**
 * Generate a random XP amount within a range
 * @param {Object} range - Object containing min and max values
 * @returns {Number} - Random XP amount
 */
function getRandomXP(range) {
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

/**
 * Award XP to a user
 * @param {Object} user - User object from the database
 * @param {String} activity - Type of activity
 * @returns {Number} - Amount of XP awarded
 */
function awardXP(user, activity) {
  if (!user) return 0;
  
  // Initialize XP and tracking properties if not present
  if (!user.exp) user.exp = 0;
  if (!user.dailyXP) user.dailyXP = 0;
  if (!user.lastDailyReset) user.lastDailyReset = 0;
  
  const now = Date.now();
  const today = new Date().setHours(0, 0, 0, 0);
  
  // Check cooldown between XP awards
  if (!user.lastXPTime) user.lastXPTime = 0;
  if (now - user.lastXPTime < XP_COOLDOWN) return 0;
  
  // Reset daily XP counter if it's a new day
  if (user.lastDailyReset < today) {
    user.dailyXP = 0;
    user.lastDailyReset = today;
  }
  
  // Check if user has reached daily XP cap
  if (user.dailyXP >= DAILY_XP_CAP) {
    return 0; // No XP awarded if daily cap is reached
  }
  
  // Chance-based system: Sometimes don't award XP at all
  // This makes leveling more unpredictable and slower
  const chanceToGet = Math.random();
  if (chanceToGet > 0.7) { // 30% chance to not get any XP
    user.lastXPTime = now; // Still update cooldown
    return 0;
  }
  
  // Get XP amount based on activity
  let xpAmount = 0;
  
  switch (activity) {
    case 'text':
      xpAmount = getRandomXP(XP_REWARDS.TEXT_MESSAGE);
      break;
    case 'media':
      xpAmount = getRandomXP(XP_REWARDS.MEDIA_MESSAGE);
      break;
    case 'command':
      xpAmount = getRandomXP(XP_REWARDS.COMMAND_USAGE);
      break;
    case 'sticker':
      xpAmount = getRandomXP(XP_REWARDS.STICKER_USAGE);
      break;
    case 'voice':
      xpAmount = getRandomXP(XP_REWARDS.VOICE_MESSAGE);
      break;
    default:
      xpAmount = getRandomXP(XP_REWARDS.GROUP_ACTIVITY);
  }
  
  // Rare bonus XP chance (around 5% chance)
  const bonusChance = Math.random();
  if (bonusChance > 0.95) {
    // Award a small bonus occasionally to keep things interesting
    xpAmount += Math.floor(Math.random() * 3) + 1; // 1-3 bonus XP
  }
  
  // Adjust XP amount to not exceed daily cap
  const xpToAward = Math.min(xpAmount, DAILY_XP_CAP - user.dailyXP);
  
  // Award XP, update daily counter and cooldown
  user.exp += xpToAward;
  user.dailyXP += xpToAward;
  user.lastXPTime = now;
  
  return xpToAward;
}

module.exports = {
  before(m) {
    // Skip if not in a group
    if (!m.isGroup) return;
    
    // Skip if no message
    if (!m.text && !m.mtype) return;
    
    // Get user from database
    let user = global.db.data.users[m.sender];
    if (!user) return;
    
    // Determine activity type
    let activityType = 'text'; // Default
    
    if (m.mtype) {
      // Check message type
      if (['imageMessage', 'videoMessage', 'documentMessage'].includes(m.mtype)) {
        activityType = 'media';
      } else if (m.mtype === 'stickerMessage') {
        activityType = 'sticker';
      } else if (m.mtype === 'audioMessage' || m.mtype === 'pttMessage') {
        activityType = 'voice';
      }
    }
    
    // Award extra XP for commands
    if (m.text && typeof global.prefix === 'string' && m.text.startsWith(global.prefix)) {
      activityType = 'command';
    } else if (m.text && global.prefix instanceof RegExp && global.prefix.test(m.text)) {
      activityType = 'command';
    }
    
    // Award XP based on activity
    awardXP(user, activityType);
    
    return true;
  }
};