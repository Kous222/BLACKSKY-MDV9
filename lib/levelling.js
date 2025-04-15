/**
 * BocchiBot German Version - Levelling System
 * A sophisticated levelling system with balanced XP curves and high maximum levels
 */

module.exports = {
    /**
     * Growth rate
     * A smooth growth factor that increases exponentially with each level
     * Carefully balanced to create a satisfying but challenging progression
     */
    growth: Math.pow(Math.PI / Math.E, 1.7) * Math.E * 1.15,

    /**
     * Get XP range at specified level
     * @param {Number} level - Current level
     * @param {Number} multiplier - XP multiplier (default: 1)
     * @returns {Object} - min, max, and xp required
     */
    xpRange(level, multiplier = global.multiplier || 1) {
        if (level < 0) throw new TypeError('Level cannot be negative');
        level = Math.floor(level);
        
        // Use a sophisticated exponential growth formula for XP requirements
        // This creates a smooth curve that gets progressively steeper
        let min = level === 0 ? 0 : Math.round(Math.pow(level, this.growth) * multiplier) + 1;
        let max = Math.round(Math.pow(++level, this.growth) * multiplier);
        
        return {
            min,
            max,
            xp: max - min
        };
    },

    /**
     * Get level by XP
     * @param {Number} xp - Current XP amount
     * @param {Number} multiplier - XP multiplier (default: 1)
     * @returns {Number} - Calculated level
     */
    findLevel(xp, multiplier = global.multiplier || 1) {
        if (xp === Infinity) return Infinity;
        if (isNaN(xp)) return NaN;
        if (xp <= 0) return -1;
        
        let level = 0;
        // Binary search optimization for faster level calculation
        let low = 0;
        let high = 2000; // Set a high upper bound
        
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            let xpRequired = this.xpRange(mid, multiplier).min;
            
            if (xpRequired <= xp) {
                level = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        return level;
    },

    /**
     * Can the user level up based on current XP?
     * @param {Number} level - Current level
     * @param {Number} xp - Current XP amount
     * @param {Number} multiplier - XP multiplier (default: 1)
     * @returns {Boolean} - Whether user can level up
     */
    canLevelUp(level, xp, multiplier = global.multiplier || 1) {
        if (level < 0) return false;
        if (xp === Infinity) return true;
        if (isNaN(xp)) return false;
        if (xp <= 0) return false;
        
        // Check if the user's XP exceeds the minimum XP required for the next level
        const calculatedLevel = this.findLevel(xp, multiplier);
        return calculatedLevel > level;
    },

    /**
     * Get total levels supported
     * @returns {Number} - Max level (1000)
     */
    maxLevel() {
        return 1000;  // Max level is 1000 - BocchiBot German Version supports very high levels
    },

    /**
     * Get XP required to reach max level
     * @param {Number} multiplier - XP multiplier (default: 1)
     * @returns {Number} - Total XP required for max level
     */
    totalXPForMaxLevel(multiplier = global.multiplier || 1) {
        return this.xpRange(this.maxLevel(), multiplier).max;
    },
    
    /**
     * Get progress percentage to next level
     * @param {Number} level - Current level
     * @param {Number} xp - Current XP
     * @param {Number} multiplier - XP multiplier (default: 1)
     * @returns {Object} - Progress information including percentage and visual bar
     */
    getProgressData(level, xp, multiplier = global.multiplier || 1) {
        const { min, max, xp: xpRequired } = this.xpRange(level, multiplier);
        
        // Calculate current XP in this level and XP left to level up
        const currentXP = Math.max(0, xp - min);
        const xpLeft = Math.max(0, max - xp);
        
        // Calculate progress percentage (0-100)
        const progressPercent = xpRequired > 0 
            ? Math.min(100, Math.floor((currentXP / xpRequired) * 100)) 
            : 100;
        
        // Create a visual progress bar
        let progressBar = '';
        const barLength = 15;
        const filledLength = Math.floor((progressPercent / 100) * barLength);
        
        for (let i = 0; i < barLength; i++) {
            progressBar += i < filledLength ? '█' : '░';
        }
        
        return {
            currentXP,
            xpRequired,
            xpTotal: xp,
            xpLeft,
            progressPercent,
            progressBar
        };
    }
};