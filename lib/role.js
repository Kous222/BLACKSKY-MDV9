/**
 * BocchiBot German Version - Role Management System
 * This module provides an extensive military-inspired rank system with 
 * unique symbols and designations for over 1000 levels of progression
 */

/**
 * Get the role for a given level
 * @param {Number} level - The user's level
 * @returns {String} - The role corresponding to the level
 */
function getRoleByLevel(level) {
  return (level <= 2) ? 'Rekrut ㋡'
    : ((level >= 3) && (level <= 5)) ? 'Anfänger Stufe 1 ⚊¹'
    : ((level >= 6) && (level <= 8)) ? 'Anfänger Stufe 2 ⚊²'
    : ((level >= 9) && (level <= 11)) ? 'Anfänger Stufe 3 ⚊³'
    : ((level >= 12) && (level <= 14)) ? 'Anfänger Stufe 4 ⚊⁴'
    : ((level >= 15) && (level <= 17)) ? 'Anfänger Stufe 5 ⚊⁵'
    : ((level >= 18) && (level <= 25)) ? 'Gefreiter Stufe 1 ⚌¹'
    : ((level >= 26) && (level <= 33)) ? 'Gefreiter Stufe 2 ⚌²'
    : ((level >= 34) && (level <= 41)) ? 'Gefreiter Stufe 3 ⚌³'
    : ((level >= 42) && (level <= 49)) ? 'Gefreiter Stufe 4 ⚌⁴'
    : ((level >= 50) && (level <= 57)) ? 'Gefreiter Stufe 5 ⚌⁵'
    : ((level >= 58) && (level <= 66)) ? 'Korporal Stufe 1 ☰¹' 
    : ((level >= 67) && (level <= 75)) ? 'Korporal Stufe 2 ☰²' 
    : ((level >= 76) && (level <= 84)) ? 'Korporal Stufe 3 ☰³' 
    : ((level >= 85) && (level <= 93)) ? 'Korporal Stufe 4 ☰⁴' 
    : ((level >= 94) && (level <= 102)) ? 'Korporal Stufe 5 ☰⁵'
    : ((level >= 103) && (level <= 112)) ? 'Unteroffizier Stufe 1 ≣¹'
    : ((level >= 113) && (level <= 122)) ? 'Unteroffizier Stufe 2 ≣²'
    : ((level >= 123) && (level <= 132)) ? 'Unteroffizier Stufe 3 ≣³'
    : ((level >= 133) && (level <= 142)) ? 'Unteroffizier Stufe 4 ≣⁴'
    : ((level >= 143) && (level <= 152)) ? 'Unteroffizier Stufe 5 ≣⁵' 
    : ((level >= 153) && (level <= 163)) ? 'Feldwebel Stufe 1 ﹀¹' 
    : ((level >= 164) && (level <= 174)) ? 'Feldwebel Stufe 2 ﹀²' 
    : ((level >= 175) && (level <= 185)) ? 'Feldwebel Stufe 3 ﹀³' 
    : ((level >= 186) && (level <= 196)) ? 'Feldwebel Stufe 4 ﹀⁴' 
    : ((level >= 197) && (level <= 207)) ? 'Feldwebel Stufe 5 ﹀⁵' 
    : ((level >= 208) && (level <= 219)) ? 'Oberfeldwebel Stufe 1 ︾¹'
    : ((level >= 220) && (level <= 231)) ? 'Oberfeldwebel Stufe 2 ︾²'
    : ((level >= 232) && (level <= 243)) ? 'Oberfeldwebel Stufe 3 ︾³'
    : ((level >= 244) && (level <= 255)) ? 'Oberfeldwebel Stufe 4 ︾⁴'
    : ((level >= 256) && (level <= 267)) ? 'Oberfeldwebel Stufe 5 ︾⁵'
    : ((level >= 268) && (level <= 280)) ? 'Leutnant Stufe 1 ♢¹'
    : ((level >= 281) && (level <= 293)) ? 'Leutnant Stufe 2 ♢²'  
    : ((level >= 294) && (level <= 306)) ? 'Leutnant Stufe 3 ♢³' 
    : ((level >= 307) && (level <= 319)) ? 'Leutnant Stufe 4 ♢⁴' 
    : ((level >= 320) && (level <= 332)) ? 'Leutnant Stufe 5 ♢⁵'
    : ((level >= 333) && (level <= 346)) ? 'Oberleutnant Stufe 1 ♢♢¹'
    : ((level >= 347) && (level <= 360)) ? 'Oberleutnant Stufe 2 ♢♢²'
    : ((level >= 361) && (level <= 374)) ? 'Oberleutnant Stufe 3 ♢♢³'
    : ((level >= 375) && (level <= 388)) ? 'Oberleutnant Stufe 4 ♢♢⁴'
    : ((level >= 389) && (level <= 402)) ? 'Oberleutnant Stufe 5 ♢♢⁵'
    : ((level >= 403) && (level <= 417)) ? 'Hauptmann Stufe 1 ✷¹'
    : ((level >= 418) && (level <= 432)) ? 'Hauptmann Stufe 2 ✷²'
    : ((level >= 433) && (level <= 447)) ? 'Hauptmann Stufe 3 ✷³'
    : ((level >= 448) && (level <= 462)) ? 'Hauptmann Stufe 4 ✷⁴'
    : ((level >= 463) && (level <= 477)) ? 'Hauptmann Stufe 5 ✷⁵'
    : ((level >= 478) && (level <= 493)) ? 'Major Stufe 1 ✷✷¹'
    : ((level >= 494) && (level <= 509)) ? 'Major Stufe 2 ✷✷²'
    : ((level >= 510) && (level <= 525)) ? 'Major Stufe 3 ✷✷³'
    : ((level >= 526) && (level <= 541)) ? 'Major Stufe 4 ✷✷⁴'
    : ((level >= 542) && (level <= 557)) ? 'Major Stufe 5 ✷✷⁵'
    : ((level >= 558) && (level <= 574)) ? 'Oberstleutnant Stufe 1 ✰'
    : ((level >= 575) && (level <= 591)) ? 'Oberstleutnant Stufe 2 ✩'
    : ((level >= 592) && (level <= 608)) ? 'Oberstleutnant Stufe 3 ✯' 
    : ((level >= 609) && (level <= 625)) ? 'Oberstleutnant Stufe 4 ✬'
    : ((level >= 626) && (level <= 642)) ? 'Oberstleutnant Stufe 5 ✪'
    : ((level >= 643) && (level <= 660)) ? 'Oberst Stufe 1 ✰✰'
    : ((level >= 661) && (level <= 678)) ? 'Oberst Stufe 2 ✩✩'
    : ((level >= 679) && (level <= 696)) ? 'Oberst Stufe 3 ✯✯'
    : ((level >= 697) && (level <= 714)) ? 'Oberst Stufe 4 ✬✬'
    : ((level >= 715) && (level <= 732)) ? 'Oberst Stufe 5 ✪✪'
    : ((level >= 733) && (level <= 751)) ? 'Brigadegeneral Stufe 1 ⚔¹'
    : ((level >= 752) && (level <= 770)) ? 'Brigadegeneral Stufe 2 ⚔²'
    : ((level >= 771) && (level <= 789)) ? 'Brigadegeneral Stufe 3 ⚔³'
    : ((level >= 790) && (level <= 808)) ? 'Generalmajor Stufe 1 ⚔⚔¹'
    : ((level >= 809) && (level <= 827)) ? 'Generalmajor Stufe 2 ⚔⚔²'
    : ((level >= 828) && (level <= 846)) ? 'Generalmajor Stufe 3 ⚔⚔³'
    : ((level >= 847) && (level <= 865)) ? 'Generalleutnant Stufe 1 ⚔⚔⚔¹'
    : ((level >= 866) && (level <= 884)) ? 'Generalleutnant Stufe 2 ⚔⚔⚔²'
    : ((level >= 885) && (level <= 903)) ? 'Generalleutnant Stufe 3 ⚔⚔⚔³'
    : ((level >= 904) && (level <= 922)) ? 'General Stufe 1 ⚔⚔⚔⚔¹'
    : ((level >= 923) && (level <= 941)) ? 'General Stufe 2 ⚔⚔⚔⚔²'
    : ((level >= 942) && (level <= 960)) ? 'General Stufe 3 ⚔⚔⚔⚔³'
    : ((level >= 961) && (level <= 980)) ? 'Generalfeldmarschall Stufe 1 ★'
    : ((level >= 981) && (level <= 999)) ? 'Generalfeldmarschall Stufe 2 ★★'
    : (level >= 1000) ? 'Großmeister ✵ × Legende ✵' : 'Rekrut ㋡';
}

/**
 * Get role badge for display
 * @param {Number} level - User level
 * @returns {String} - Badge emoji or symbol
 */
function getRoleBadge(level) {
  if (level < 15) return '🔰'; // Beginner
  if (level < 50) return '🥉'; // Bronze
  if (level < 150) return '🥈'; // Silver
  if (level < 300) return '🥇'; // Gold
  if (level < 500) return '💎'; // Diamond
  if (level < 750) return '👑'; // Crown
  if (level < 950) return '🏆'; // Trophy
  return '🔱'; // Trident (highest)
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

/**
 * Get color for level display
 * @param {Number} level - User level
 * @returns {String} - Hex color code
 */
function getLevelColor(level) {
  if (level < 15) return '#9E9E9E'; // Gray
  if (level < 50) return '#CD7F32'; // Bronze
  if (level < 150) return '#C0C0C0'; // Silver
  if (level < 300) return '#FFD700'; // Gold
  if (level < 500) return '#B9F2FF'; // Diamond
  if (level < 750) return '#7851A9'; // Royal purple
  if (level < 950) return '#FF4500'; // Red-orange
  return '#00BFFF'; // Deep sky blue
}

module.exports = {
  getRoleByLevel,
  getRoleBadge,
  updateRole,
  getLevelColor
};