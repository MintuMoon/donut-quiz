let currentQuestionIndex = 0;
let activeQuestions = [];
let scores = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0 };
let userName = "";

// Fisher-Yates Shuffling algorithm
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Render local history and dynamic stats tally on the dashboard
function displayHistoryAndStats() {
    const historyList = document.getElementById('history-list');
    const historyBox = document.getElementById('history-box');
    const statsList = document.getElementById('stats-list');
    const statsBox = document.getElementById('stats-box');
    const clearBtn = document.getElementById('clear-history-btn');

    const history = StorageManager.getHistory();
    const stats = StorageManager.getStats();
    const totalRuns = Object.values(stats).reduce((a, b) => a + b, 0);

    // Render matches log
    if (historyList && historyBox) {
        if (history.length === 0) {
            historyBox.style.display = 'none';
        } else {
            historyBox.style.display = 'block';
            historyList.innerHTML = '';
            history.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.name}</strong> was matched with ${item.emoji} <em>${item.type}</em> on ${item.date}`;
                historyList.appendChild(li);
            });
        }
    }

    // Render tallies dashboard
    if (statsList && statsBox) {
        if (totalRuns === 0) {
            statsBox.style.display = 'none';
        } else {
            statsBox.style.display = 'block';
            statsList.innerHTML = `
                <li>🍩 Classic: ${stats.classic} match(es)</li>
                <li>🧁 Sprinkles: ${stats.sprinkles} match(es)</li>
                <li>🍓 Jelly: ${stats.jelly} match(es)</li>
                <li>🍵 Matcha: ${stats.matcha} match(es)</li>
                <li>🥓 Bacon: ${stats.bacon} match(es)</li>
            `;
        }
    }

    // Toggle clear button
    if (clearBtn) {
        clearBtn.style.display = (history.length > 0 || totalRuns > 0) ? 'block' : 'none';
    }
}

function startQuiz() {
    const nameInput = document.getElementById('username-input');
    userName = nameInput ? nameInput.value.trim() : "";
    
    const themeSelect = document.getElementById('theme-select');
    const selectedTheme = themeSelect ? themeSelect.value : "candy";
    
    document.body.className = `theme-${selectedTheme}`;

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    
    currentQuestionIndex = 0;
    scores = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0 };
    
    const includeSecret = Math.random() < CONFIG.SECRET_CHANCE; 
    let selected = [];

    if (includeSecret) {
        let shuffledNormals = shuffleArray(normalQuestions).slice(0, CONFIG.QUIZ_LENGTH - 1);
        shuffledNormals.push(secretQuestion);
        selected = shuffleArray(shuffledNormals); 
    } else {
        selected = shuffleArray(normalQuestions).slice(0, CONFIG.QUIZ_LENGTH);
    }

    activeQuestions = selected;
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = activeQuestions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1} of ${CONFIG.QUIZ_LENGTH}`;
    
    const qTextElement = document.getElementById('question-text');
    qTextElement.innerText = currentQuestion.q;

    if (currentQuestion.isSecret) {
        qTextElement.classList.add('secret');
    } else {
        qTextElement.classList.remove('secret');
    }
    
    const progressPercentage = (currentQuestionIndex / CONFIG.QUIZ_LENGTH) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;

    const answersList = document.getElementById('answers-list');
    answersList.innerHTML = '';
    
    const shuffledAnswers = shuffleArray(currentQuestion.a);
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-option');
        button.innerText = answer.text;
        button.onclick = () => selectAnswer(answer.type);
        answersList.appendChild(button);
    });
}

function selectAnswer(type) {
    if (scores[type] !== undefined) scores[type]++;
    currentQuestionIndex++;

    if (currentQuestionIndex < CONFIG.QUIZ_LENGTH) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    let winningType = 'classic';
    let maxScore = -1;
    for (const type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            winningType = type;
        }
    }

    const greetingText = userName ? `Hey ${userName}, Your Result` : "Your Result";
    document.getElementById('result-user-greeting').innerText = greetingText;

    const result = results[winningType];
    document.getElementById('result-title').innerText = result.title;
    document.getElementById('result-emoji').innerText = result.emoji;
    document.getElementById('result-description').innerText = result.description;

    // Save and register tally tracking inside storage
    StorageManager.saveResult(userName, result.title, result.emoji, winningType);
}

function restartQuiz() {
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
    const nameInput = document.getElementById('username-input');
    if (nameInput) nameInput.value = "";
    displayHistoryAndStats();
}

function clearData() {
    StorageManager.clearAll();
    displayHistoryAndStats();
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const clearBtn = document.getElementById('clear-history-btn');
    
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (clearBtn) clearBtn.addEventListener('click', clearData);

    displayHistoryAndStats();
});
