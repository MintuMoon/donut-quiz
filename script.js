let currentQuestionIndex = 0;
let activeQuestions = [];
let scores = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0, galaxy: 0, spicy: 0, cruller: 0 };
let userName = "";
let currentQuizLength = 20;
let currentLang = "en"; // Default active language state

// Multi-language UI dictionaries
const UI_TEXT = {
    en: {
        startTitle: "Which Donut Are You?",
        startSubtitle: "Discover your true sweet personality by answering random questions!",
        labelName: "Enter Your Name:",
        labelLang: "Language / Язык:",
        labelTheme: "Choose Theme:",
        labelLength: "Quiz Length:",
        labelSound: "Sound Effects:",
        startBtn: "Start Quiz",
        titleHistory: "Recent Matches:",
        titleStats: "Your Donut Stats:",
        clearBtn: "Clear Personal Data",
        questionNum: "Question",
        of: "of",
        loadingQuestion: "Loading question...",
        resultLabel: "Your Result",
        greetingPrefix: "Hey",
        restartBtn: "Take Quiz Again",
        shareBtn: "Copy Result Link 📋",
        shareTextTemplate: "🍩 I took the Donut Quiz and matched with",
        shareTextLinkSuffix: "Find yours here:",
        copied: "Copied to Clipboard! ✅",
        anonymous: "Anonymous Player",
        wasMatched: "was matched with",
        onDate: "on"
    },
    ru: {
        startTitle: "Какой ты пончик?",
        startSubtitle: "Узнай свой истинный сладкий характер, ответив на случайные вопросы!",
        labelName: "Введите ваше имя:",
        labelLang: "Язык / Language:",
        labelTheme: "Выберите тему:",
        labelLength: "Длина теста:",
        labelSound: "Звуковые эффекты:",
        startBtn: "Начать тест",
        titleHistory: "Недавние результаты:",
        titleStats: "Ваша статистика пончиков:",
        clearBtn: "Сбросить личные данные",
        questionNum: "Вопрос",
        of: "из",
        loadingQuestion: "Загрузка вопроса...",
        resultLabel: "Ваш результат",
        greetingPrefix: "Эй",
        restartBtn: "Пройти тест снова",
        shareBtn: "Поделиться результатом 📋",
        shareTextTemplate: "🍩 Я прошел тест и мой пончик — это",
        shareTextLinkSuffix: "Узнай свой результат здесь:",
        copied: "Скопировано в буфер! ✅",
        anonymous: "Анонимный игрок",
        wasMatched: "получил(а) результат",
        onDate: "от"
    }
};

// Web Audio API synthesizer engine
const SoundFX = {
    enabled: true,
    ctx: null,
    init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },
    playPop() {
        if (!this.enabled) return;
        if (!this.ctx) this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    },
    playChime() {
        if (!this.enabled) return;
        if (!this.ctx) this.init();
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.06, now + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0, now + idx * 0.08 + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.35);
        });
    }
};

// Canvas Particle Confetti System
const Confetti = {
    active: false,
    particles: [],
    canvas: null,
    ctx: null,
    init() {
        this.canvas = document.getElementById('confetti-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    },
    resize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    },
    start() {
        if (!this.canvas) return;
        this.active = true;
        this.particles = [];
        const colors = ['#ff6f91', '#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea'];
        for (let i = 0; i < 80; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                r: Math.random() * 5 + 3,
                d: Math.random() * this.canvas.height,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 5,
                tiltAngleIncremental: Math.random() * 0.06 + 0.02,
                tiltAngle: 0
            });
        }
        this.loop();
    },
    stop() {
        this.active = false;
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },
    loop() {
        if (!this.active || !this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let remaining = false;
        this.particles.forEach(p => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle);
            p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 5;
            if (p.y < this.canvas.height) remaining = true;
            this.ctx.beginPath();
            this.ctx.lineWidth = p.r;
            this.ctx.strokeStyle = p.color;
            this.ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            this.ctx.stroke();
        });
        if (remaining) requestAnimationFrame(() => this.loop());
    }
};

// Shuffling helper
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Map unique categories
function getUniqueCategoryQuestions() {
    const grouped = {};
    normalQuestions.forEach(q => {
        if (!grouped[q.category]) grouped[q.category] = [];
        grouped[q.category].push(q);
    });
    const categories = shuffleArray(Object.keys(grouped));
    const selectedQuestions = [];
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const randomQuestionFromCat = grouped[cat][Math.floor(Math.random() * grouped[cat].length)];
        selectedQuestions.push(randomQuestionFromCat);
    }
    return selectedQuestions;
}

// Localize starting UI text blocks
function translateStartScreen() {
    const t = UI_TEXT[currentLang];
    document.getElementById('start-title').innerText = t.startTitle;
    document.getElementById('start-subtitle').innerText = t.startSubtitle;
    document.getElementById('label-name').innerText = t.labelName;
    document.getElementById('label-lang').innerText = t.labelLang;
    document.getElementById('label-theme').innerText = t.labelTheme;
    document.getElementById('label-length').innerText = t.labelLength;
    document.getElementById('label-sound').innerText = t.labelSound;
    document.getElementById('start-btn').innerText = t.startBtn;
    document.getElementById('title-history').innerText = t.titleHistory;
    document.getElementById('title-stats').innerText = t.titleStats;
    document.getElementById('clear-history-btn').innerText = t.clearBtn;
}

// Display tally stats and matches history logs
function displayHistoryAndStats() {
    const historyList = document.getElementById('history-list');
    const historyBox = document.getElementById('history-box');
    const statsList = document.getElementById('stats-list');
    const statsBox = document.getElementById('stats-box');
    const clearBtn = document.getElementById('clear-history-btn');

    const history = StorageManager.getHistory();
    const stats = StorageManager.getStats();
    const totalRuns = Object.values(stats).reduce((a, b) => a + b, 0);
    const t = UI_TEXT[currentLang];

    if (historyList && historyBox) {
        if (history.length === 0) {
            historyBox.style.display = 'none';
        } else {
            historyBox.style.display = 'block';
            historyList.innerHTML = '';
            history.forEach(item => {
                const li = document.createElement('li');
                const displayName = item.name === "Anonymous Player" ? t.anonymous : item.name;
                li.innerHTML = `<strong>${displayName}</strong>: ${item.emoji} <em>${item.type[currentLang]}</em> ${t.onDate} ${item.date}`;
                historyList.appendChild(li);
            });
        }
    }

    if (statsList && statsBox) {
        if (totalRuns === 0) {
            statsBox.style.display = 'none';
        } else {
            statsBox.style.display = 'block';
            statsList.innerHTML = `
                <li>🍩 ${results.classic.title[currentLang]}: ${stats.classic || 0}</li>
                <li>🧁 ${results.sprinkles.title[currentLang]}: ${stats.sprinkles || 0}</li>
                <li>🍓 ${results.jelly.title[currentLang]}: ${stats.jelly || 0}</li>
                <li>🍵 ${results.matcha.title[currentLang]}: ${stats.matcha || 0}</li>
                <li>🥓 ${results.bacon.title[currentLang]}: ${stats.bacon || 0}</li>
                <li>🌌 ${results.galaxy.title[currentLang]}: ${stats.galaxy || 0}</li>
                <li>🌶️ ${results.spicy.title[currentLang]}: ${stats.spicy || 0}</li>
                <li>👑 ${results.cruller.title[currentLang]}: ${stats.cruller || 0}</li>
            `;
        }
    }

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

    const lengthSelect = document.getElementById('length-select');
    currentQuizLength = lengthSelect ? parseInt(lengthSelect.value, 10) : CONFIG.QUIZ_LENGTH;

    const soundSelect = document.getElementById('sound-select');
    SoundFX.enabled = (soundSelect && soundSelect.value === 'on');

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    
    currentQuestionIndex = 0;
    scores = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0, galaxy: 0, spicy: 0, cruller: 0 };
    
    const includeSecret = Math.random() < CONFIG.SECRET_CHANCE; 
    let selected = getUniqueCategoryQuestions(); 
    selected = shuffleArray(selected);

    if (includeSecret) {
        let shuffledNormals = selected.slice(0, currentQuizLength - 1);
        
        // Match bilingual questions for secret item
        const localSecret = {
            category: secretQuestion.category,
            isSecret: secretQuestion.isSecret,
            q: secretQuestion.q[currentLang],
            a: secretQuestion.a[currentLang]
        };
        shuffledNormals.push(localSecret);
        selected = shuffleArray(shuffledNormals); 
    } else {
        selected = selected.slice(0, currentQuizLength);
    }

    // Convert question array objects for runtime language
    activeQuestions = selected.map(q => {
        if (q.isSecret) return q; // Already formatted above
        return {
            category: q.category,
            q: q.q[currentLang],
            a: q.a[currentLang]
        };
    });

    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = activeQuestions[currentQuestionIndex];
    const t = UI_TEXT[currentLang];
    document.getElementById('question-number').innerText = `${t.questionNum} ${currentQuestionIndex + 1} ${t.of} ${currentQuizLength}`;
    
    const qTextElement = document.getElementById('question-text');
    qTextElement.innerText = currentQuestion.q;

    if (currentQuestion.isSecret) {
        qTextElement.classList.add('secret');
    } else {
        qTextElement.classList.remove('secret');
    }
    
    const progressPercentage = (currentQuestionIndex / currentQuizLength) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;

    const answersList = document.getElementById('answers-list');
    answersList.innerHTML = '';
    
    const shuffledAnswers = shuffleArray(currentQuestion.a);
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-option');
        button.innerText = answer.text;
        button.onclick = () => {
            SoundFX.playPop();
            selectAnswer(answer.type);
        };
        answersList.appendChild(button);
    });
}

function selectAnswer(type) {
    if (scores[type] !== undefined) scores[type]++;
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuizLength) {
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

    const t = UI_TEXT[currentLang];
    const greetingText = userName ? `${t.greetingPrefix} ${userName}, ${t.resultLabel}` : t.resultLabel;
    document.getElementById('result-user-greeting').innerText = greetingText;

    const result = results[winningType];
    document.getElementById('result-title').innerText = result.title[currentLang];
    document.getElementById('result-emoji').innerText = result.emoji;
    document.getElementById('result-description').innerText = result.description[currentLang];

    document.getElementById('restart-btn').innerText = t.restartBtn;
    document.getElementById('share-btn').innerText = t.shareBtn;

    SoundFX.playChime();
    Confetti.start();

    // Map bilingual details back to unified storage logger
    const localizedResultRecord = {
        en: results[winningType].title.en,
        ru: results[winningType].title.ru
    };
    StorageManager.saveResult(userName, localizedResultRecord, result.emoji, winningType);
}

function shareResult() {
    const resultTitle = document.getElementById('result-title').innerText;
    const resultEmoji = document.getElementById('result-emoji').innerText;
    const t = UI_TEXT[currentLang];
    const shareText = `${t.shareTextTemplate} ${resultEmoji} ${resultTitle}! ${t.shareTextLinkSuffix} ${window.location.href}`;
    
    navigator.clipboard.writeText(shareText).then(() => {
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.innerText = t.copied;
            setTimeout(() => {
                shareBtn.innerText = t.shareBtn;
            }, 2000);
        }
    }).catch(err => {
        console.error("Failed to copy link: ", err);
    });
}

function restartQuiz() {
    Confetti.stop();
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

// Handle dynamic language updates
function handleLanguageChange() {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        currentLang = langSelect.value;
        translateStartScreen();
        displayHistoryAndStats();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Confetti.init();
    
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const clearBtn = document.getElementById('clear-history-btn');
    const shareBtn = document.getElementById('share-btn');
    const langSelect = document.getElementById('lang-select');
    
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (clearBtn) clearBtn.addEventListener('click', clearData);
    if (shareBtn) shareBtn.addEventListener('click', shareResult);
    if (langSelect) {
        langSelect.addEventListener('change', handleLanguageChange);
        currentLang = langSelect.value; // Sync on startup
    }

    translateStartScreen();
    displayHistoryAndStats();
});
