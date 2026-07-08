let currentQuestionIndex = 0;
let activeQuestions = [];
let scores = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0 };
let userName = "";

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Показ історії на стартовому екрані
function displayHistory() {
  const historyList = document.getElementById("history-list");
  const historyBox = document.getElementById("history-box");

  if (!historyList || !historyBox) return;

  const history = StorageManager.getHistory();

  if (history.length === 0) {
    historyBox.style.display = "none"; // Ховаємо блок, якщо історії немає
    return;
  }

  historyBox.style.display = "block";
  historyList.innerHTML = "";

  history.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.name}</strong> was matched with ${item.emoji} <em>${item.type}</em> on ${item.date}`;
    historyList.appendChild(li);
  });
}

function startQuiz() {
  // 1. Отримуємо дані персоналізації
  const nameInput = document.getElementById("username-input");
  userName = nameInput ? nameInput.value.trim() : "";

  const themeSelect = document.getElementById("theme-select");
  const selectedTheme = themeSelect ? themeSelect.value : "candy";

  // 2. Встановлюємо тему
  document.body.className = `theme-${selectedTheme}`;

  // 3. Зміна екранів
  document.getElementById("start-screen").classList.remove("active");
  document.getElementById("quiz-screen").classList.add("active");

  // 4. Скидання налаштувань
  currentQuestionIndex = 0;
  scores = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0 };

  // 5. Визначення шансу секретного питання (зчитування з config.js)
  const includeSecret = Math.random() < CONFIG.SECRET_CHANCE;
  let selected = [];

  // ТУТ БУВ БАГ: тепер використовується правильний масив normalQuestions
  if (includeSecret) {
    let shuffledNormals = shuffleArray(normalQuestions).slice(
      0,
      CONFIG.QUIZ_LENGTH - 1,
    );
    shuffledNormals.push(secretQuestion);
    selected = shuffleArray(shuffledNormals); // перемішуємо секретне питання
  } else {
    selected = shuffleArray(normalQuestions).slice(0, CONFIG.QUIZ_LENGTH);
  }

  activeQuestions = selected;
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = activeQuestions[currentQuestionIndex];

  // Відображення номера запитання згідно з CONFIG
  document.getElementById("question-number").innerText =
    `Question ${currentQuestionIndex + 1} of ${CONFIG.QUIZ_LENGTH}`;

  const qTextElement = document.getElementById("question-text");
  qTextElement.innerText = currentQuestion.q;

  // Секретне оформлення
  if (currentQuestion.isSecret) {
    qTextElement.classList.add("secret");
  } else {
    qTextElement.classList.remove("secret");
  }

  // Розрахунок прогрес-бару
  const progressPercentage = (currentQuestionIndex / CONFIG.QUIZ_LENGTH) * 100;
  document.getElementById("progress-bar").style.width =
    `${progressPercentage}%`;

  const answersList = document.getElementById("answers-list");
  answersList.innerHTML = "";

  const shuffledAnswers = shuffleArray(currentQuestion.a);

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-option");
    button.innerText = answer.text;
    button.onclick = () => selectAnswer(answer.type);
    answersList.appendChild(button);
  });
}

function selectAnswer(type) {
  if (scores[type] !== undefined) {
    scores[type]++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < CONFIG.QUIZ_LENGTH) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-screen").classList.remove("active");
  document.getElementById("result-screen").classList.add("active");

  let winningType = "classic";
  let maxScore = -1;

  for (const type in scores) {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      winningType = type;
    }
  }

  const result = results[winningType];

  // Відображення персоналізованого вітання
  const greetingText = userName
    ? `Hey ${userName}, Your Result`
    : "Your Result";
  document.getElementById("result-user-greeting").innerText = greetingText;

  document.getElementById("result-title").innerText = result.title;
  document.getElementById("result-emoji").innerText = result.emoji;
  document.getElementById("result-description").innerText = result.description;

  // ЗБЕРЕЖЕННЯ РЕЗУЛЬТАТУ В ІСТОРІЮ (через новий файл storage.js)
  StorageManager.saveResult(userName, result.title, result.emoji);
}

function restartQuiz() {
  document.getElementById("result-screen").classList.remove("active");
  document.getElementById("start-screen").classList.add("active");

  const nameInput = document.getElementById("username-input");
  if (nameInput) nameInput.value = "";

  // Оновлюємо історію на старті
  displayHistory();
}

function clearHistory() {
  StorageManager.clearHistory();
  displayHistory();
}

// Призначаємо події після завантаження дерева
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const clearHistoryBtn = document.getElementById("clear-history-btn");

  if (startBtn) startBtn.addEventListener("click", startQuiz);
  if (restartBtn) restartBtn.addEventListener("click", restartQuiz);
  if (clearHistoryBtn) clearHistoryBtn.addEventListener("click", clearHistory);

  // Відображаємо історію при першому відкритті сайту
  displayHistory();
});
