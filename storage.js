// Local Storage manager for match logs and dynamic tallies
const StorageManager = {
    saveResult(userName, donutType, emoji, typeKey) {
        // Save to general history
        const history = this.getHistory();
        const record = {
            name: userName || "Anonymous Player",
            type: donutType,
            emoji: emoji,
            date: new Date().toLocaleDateString()
        };
        history.unshift(record);
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(history.slice(0, 5)));

        // Increment dynamic stats counter
        const stats = this.getStats();
        if (stats[typeKey] !== undefined) {
            stats[typeKey]++;
        } else {
            stats[typeKey] = 1;
        }
        localStorage.setItem(CONFIG.STATS_KEY, JSON.stringify(stats));
    },

    getHistory() {
        const data = localStorage.getItem(CONFIG.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    getStats() {
        const data = localStorage.getItem(CONFIG.STATS_KEY);
        const defaultStats = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0 };
        return data ? JSON.parse(data) : defaultStats;
    },

    clearAll() {
        localStorage.removeItem(CONFIG.STORAGE_KEY);
        localStorage.removeItem(CONFIG.STATS_KEY);
    }
};
