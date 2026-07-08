// Local Storage Manager for Quiz History
const StorageManager = {
  // Зберегти результат
  saveResult(userName, donutType, emoji) {
    const history = this.getHistory();
    const record = {
      name: userName || "Anonymous Player",
      type: donutType,
      emoji: emoji,
      date: new Date().toLocaleDateString(),
    };

    history.unshift(record); // Додаємо новий результат на початок списку

    // Зберігаємо лише останні 5 результатів, щоб не перевантажувати пам'ять
    const updatedHistory = history.slice(0, 5);
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(updatedHistory));
  },

  // Отримати всю історію
  getHistory() {
    const data = localStorage.getItem(CONFIG.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Очистити історію
  clearHistory() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
  },
};
