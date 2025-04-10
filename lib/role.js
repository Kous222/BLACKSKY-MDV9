/**
 * Role management module
 * This module handles role assignments based on user level
 */

/**
 * Get the role for a given level
 * @param {Number} level - The user's level
 * @returns {String} - The role corresponding to the level
 */
function getRoleByLevel(level) {
  return (level <= 2) ? 'Newbie ㋡'
    : ((level >= 2) && (level <= 4)) ? 'Beginner Grade 1 ⚊¹'
    : ((level >= 4) && (level <= 6)) ? 'Beginner Grade 2 ⚊²'
    : ((level >= 6) && (level <= 8)) ? 'Beginner Grade 3 ⚊³'
    : ((level >= 8) && (level <= 10)) ? 'Beginner Grade 4 ⚊⁴'
    : ((level >= 10) && (level <= 20)) ? 'Private Grade 1 ⚌¹'
    : ((level >= 20) && (level <= 30)) ? 'Private Grade 2 ⚌²'
    : ((level >= 30) && (level <= 40)) ? 'Private Grade 3 ⚌³'
    : ((level >= 40) && (level <= 50)) ? 'Private Grade 4 ⚌⁴'
    : ((level >= 50) && (level <= 60)) ? 'Private Grade 5 ⚌⁵'
    : ((level >= 60) && (level <= 70)) ? 'Corporal Grade 1 ☰¹' 
    : ((level >= 70) && (level <= 80)) ? 'Corporal Grade 2 ☰²' 
    : ((level >= 80) && (level <= 90)) ? 'Corporal Grade 3 ☰³' 
    : ((level >= 90) && (level <= 100)) ? 'Corporal Grade 4 ☰⁴' 
    : ((level >= 100) && (level <= 110)) ? 'Corporal Grade 5 ☰⁵'
    : ((level >= 110) && (level <= 120)) ? 'Sergeant Grade 1 ≣¹'
    : ((level >= 120) && (level <= 130)) ? 'Sergeant Grade 2 ≣²'
    : ((level >= 130) && (level <= 140)) ? 'Sergeant Grade 3 ≣³'
    : ((level >= 140) && (level <= 150)) ? 'Sergeant Grade 4 ≣⁴'
    : ((level >= 150) && (level <= 160)) ? 'Sergeant Grade 5 ≣⁵' 
    : ((level >= 160) && (level <= 170)) ? 'Staff Grade 1 ﹀¹' 
    : ((level >= 170) && (level <= 180)) ? 'Staff Grade 2 ﹀²' 
    : ((level >= 180) && (level <= 190)) ? 'Staff Grade 3 ﹀³' 
    : ((level >= 190) && (level <= 200)) ? 'Staff Grade 4 ﹀⁴' 
    : ((level >= 200) && (level <= 210)) ? 'Staff Grade 5 ﹀⁵' 
    : ((level >= 210) && (level <= 220)) ? 'Sergeant Grade 1 ︾¹'
    : ((level >= 220) && (level <= 230)) ? 'Sergeant Grade 2 ︾²'
    : ((level >= 230) && (level <= 240)) ? 'Sergeant Grade 3 ︾³'
    : ((level >= 240) && (level <= 250)) ? 'Sergeant Grade 4 ︾⁴'
    : ((level >= 250) && (level <= 260)) ? 'Sergeant Grade 5 ︾⁵'
    : ((level >= 260) && (level <= 270)) ? '2nd Lt. Grade 1 ♢¹'
    : ((level >= 270) && (level <= 280)) ? '2nd Lt. Grade 2 ♢²'  
    : ((level >= 280) && (level <= 290)) ? '2nd Lt. Grade 3 ♢³' 
    : ((level >= 290) && (level <= 300)) ? '2nd Lt. Grade 4 ♢⁴' 
    : ((level >= 300) && (level <= 310)) ? '2nd Lt. Grade 5 ♢⁵'
    : ((level >= 310) && (level <= 320)) ? '1st Lt. Grade 1 ♢♢¹'
    : ((level >= 320) && (level <= 330)) ? '1st Lt. Grade 2 ♢♢²'
    : ((level >= 330) && (level <= 340)) ? '1st Lt. Grade 3 ♢♢³'
    : ((level >= 340) && (level <= 350)) ? '1st Lt. Grade 4 ♢♢⁴'
    : ((level >= 350) && (level <= 360)) ? '1st Lt. Grade 5 ♢♢⁵'
    : ((level >= 360) && (level <= 370)) ? 'Major Grade 1 ✷¹'
    : ((level >= 370) && (level <= 380)) ? 'Major Grade 2 ✷²'
    : ((level >= 380) && (level <= 390)) ? 'Major Grade 3 ✷³'
    : ((level >= 390) && (level <= 400)) ? 'Major Grade 4 ✷⁴'
    : ((level >= 400) && (level <= 410)) ? 'Major Grade 5 ✷⁵'
    : ((level >= 410) && (level <= 420)) ? 'Colonel Grade 1 ✷✷¹'
    : ((level >= 420) && (level <= 430)) ? 'Colonel Grade 2 ✷✷²'
    : ((level >= 430) && (level <= 440)) ? 'Colonel Grade 3 ✷✷³'
    : ((level >= 440) && (level <= 450)) ? 'Colonel Grade 4 ✷✷⁴'
    : ((level >= 450) && (level <= 460)) ? 'Colonel Grade 5 ✷✷⁵'
    : ((level >= 460) && (level <= 470)) ? 'Brigadier Early ✰'
    : ((level >= 470) && (level <= 480)) ? 'Brigadier Silver ✩'
    : ((level >= 480) && (level <= 490)) ? 'Brigadier gold ✯' 
    : ((level >= 490) && (level <= 500)) ? 'Brigadier Platinum ✬'
    : ((level >= 500) && (level <= 600)) ? 'Brigadier Diamond ✪'
    : ((level >= 600) && (level <= 700)) ? 'Legendary 忍'
    : ((level >= 700) && (level <= 800)) ? 'Legendary 忍忍'
    : ((level >= 800) && (level <= 900)) ? 'Legendary 忍忍忍'
    : ((level >= 900) && (level <= 1000)) ? 'Legendary忍忍忍忍'
    : 'Master 숒 × Legendary 숒';
}

/**
 * Update a user's role based on their level
 * @param {Object} user - The user object from the database
 * @returns {Object} - The updated user object
 */
function updateRole(user) {
  if (!user) return null;
  
  // Set a default level if not present
  user.level = user.level || 0;
  
  // Update the role based on the level
  const newRole = getRoleByLevel(user.level);
  
  // Only update if the role has changed
  if (user.role !== newRole) {
    user.role = newRole;
  }
  
  return user;
}

module.exports = {
  getRoleByLevel,
  updateRole
};