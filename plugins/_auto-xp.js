/**
 * Auto XP module
 * This plugin automatically awards XP to users when they are active in groups or use bot commands
 */

// Set XP reward amounts for different activities
const XP_REWARDS = {
  TEXT_MESSAGE: { min: 3, max: 10 },      // Random XP for regular text messages
  MEDIA_MESSAGE: { min: 5, max: 15 },     // Random XP for sending media (images, videos, etc.)
  COMMAND_USAGE: { min: 10, max: 25 },    // Random XP for using bot commands
  STICKER_USAGE: { min: 4, max: 12 },     // Random XP for sending stickers
  VOICE_MESSAGE: { min: 5, max: 15 },     // Random XP for voice messages
  GROUP_ACTIVITY: { min: 2, max: 7 }      // Random XP for other group activities
};

// XP cooldown to prevent spamming (in milliseconds)
const XP_COOLDOWN = 60000; // 1 minute cooldown

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
  
  // Initialize XP if not present
  if (!user.exp) user.exp = 0;
  
  // Check cooldown
  const now = Date.now();
  if (!user.lastXPTime) user.lastXPTime = 0;
  
  // If on cooldown, don't award XP
  if (now - user.lastXPTime < XP_COOLDOWN) return 0;
  
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
  
  // Award XP and update cooldown
  user.exp += xpAmount;
  user.lastXPTime = now;
  
  return xpAmount;
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