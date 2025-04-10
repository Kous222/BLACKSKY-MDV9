module.exports = {
    growth: 0.7, // Lower growth rate for more balanced progression

    xpRange(level = 0, multiplier = 1) {
        if (level < 0 || isNaN(level)) return { min: 0, xp: 0, max: 0 };
        level = Math.floor(level);

        // Base XP requirements that scale with level
        let min = level === 0 ? 0 : Math.round((Math.pow(level, 2) * 100) * multiplier);
        let max = Math.round((Math.pow(level + 1, 2) * 100) * multiplier);

        return {
            min,
            xp: max - min,
            max
        };
    },

    findLevel(xp, multiplier = 1) {
        if (xp === undefined || isNaN(xp)) return 0;
        if (xp <= 0) return 0;

        // Find appropriate level for XP amount
        let level = 0;
        while (this.xpRange(level, multiplier).max <= xp) level++;
        return level;
    },

    canLevelUp(level, xp, multiplier = 1) {
        if (level < 0 || isNaN(level) || isNaN(xp)) return false;
        return this.findLevel(xp, multiplier) > level;
    }
};
