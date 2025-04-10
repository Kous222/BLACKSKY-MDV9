module.exports = {
    /**
     * Growth rate
     * A smooth growth factor that increases exponentially with each level
     */
    growth: Math.pow(Math.PI / Math.E, 1.618) * Math.E * 0.75,

    /**
     * Get XP range at specified level
     * @param {Number} level
     * @param {Number} multiplier
     */
    xpRange(level, multiplier = global.multiplier || 1) {
        if (level < 0) throw new TypeError('Level cannot be negative');
        level = Math.floor(level);
        // Use a smooth exponential growth for XP requirement
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
     * @param {Number} xp
     * @param {Number} multiplier
     */
    findLevel(xp, multiplier = global.multiplier || 1) {
        if (xp === Infinity) return Infinity;
        if (isNaN(xp)) return NaN;
        if (xp <= 0) return -1;
        let level = 0;
        // Find the level by comparing XP ranges
        do {
            level++;
        } while (this.xpRange(level, multiplier).min <= xp);
        return --level;
    },

    /**
     * Can the user level up based on current XP?
     * @param {Number} level
     * @param {Number} xp
     * @param {Number} multiplier
     */
    canLevelUp(level, xp, multiplier = global.multiplier || 1) {
        if (level < 0) return false;
        if (xp === Infinity) return true;
        if (isNaN(xp)) return false;
        if (xp <= 0) return false;
        return level < this.findLevel(xp, multiplier);
    },

    /**
     * Get total levels supported
     * @returns {Number} Max level (100)
     */
    maxLevel() {
        return 100;  // Max level is 100
    },

    /**
     * Get XP required to reach max level
     * @param {Number} multiplier
     * @returns {Number} Total XP required for max level
     */
    totalXPForMaxLevel(multiplier = global.multiplier || 1) {
        let totalXP = 0;
        for (let level = 1; level <= this.maxLevel(); level++) {
            totalXP += this.xpRange(level, multiplier).xp;
        }
        return totalXP;
    }
};
