module.exports = {
    // Stärkeres exponentielles Wachstum
    growth: 2.5, // vorher: ~2.37, nun deutlich langsameres Leveln

    xpRange(level, multiplier = global.multiplier || 100) {
        if (level < 0) throw new TypeError('Level cannot be negative');
        level = Math.floor(level);
        let min = level === 0 ? 0 : Math.round(Math.pow(level, this.growth) * multiplier) + 1;
        let max = Math.round(Math.pow(++level, this.growth) * multiplier);
        return {
            min,
            max,
            xp: max - min
        };
    },

    findLevel(xp, multiplier = global.multiplier || 100) {
        if (xp === Infinity) return Infinity;
        if (isNaN(xp)) return NaN;
        if (xp <= 0) return -1;
        let level = 0;
        do {
            level++;
        } while (this.xpRange(level, multiplier).min <= xp);
        return --level;
    },

    canLevelUp(level, xp, multiplier = global.multiplier || 100) {
        if (level < 0) return false;
        if (xp === Infinity) return true;
        if (isNaN(xp)) return false;
        if (xp <= 0) return false;
        return level < this.findLevel(xp, multiplier);
    },

    maxLevel() {
        return 100;
    },

    totalXPForMaxLevel(multiplier = global.multiplier || 100) {
        let totalXP = 0;
        for (let level = 1; level <= this.maxLevel(); level++) {
            totalXP += this.xpRange(level, multiplier).xp;
        }
        return totalXP;
    }
};
