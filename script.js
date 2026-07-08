let currentQuestionIndex = 0;
let activeQuestions = [];
let scores = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0 };
let userName = "";

// Synthesized Sound Engine using Web Audio API
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
        const notes = [523.25, 659.25, 783.99, 1046.50]; // Arpeggio C5, E5, G5, C6
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

            if (p.y < this.canvas.height) {
                remaining = true;
            }

            this.ctx.beginPath();
            this.ctx.lineWidth = p.r;
            this.ctx.strokeStyle = p.color;
            this.ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            this.ctx.stroke();
        });

        if (remaining) {
            requestAnimationFrame(() => this.loop());
        }
    }
};

// Fisher-Yates Shuffling algorithm
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Group questions by category and ensure only 1 question is picked per topic
function getUniqueCategoryQuestions() {
    const grouped = {};
    normalQuestions.forEach(q => {
        if (!grouped[q.category]) {
            grouped[q.category] = [];
        }
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

    // Read audio toggles
    const soundSelect = document.getElementById('sound-select');
    SoundFX.enabled = (soundSelect && soundSelect.value === 'on');

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    
    currentQuestionIndex = 0;
    scores = { classic: 0, sprinkles: 0, jelly: 0, matcha: 0, bacon: 0 };
    
    const includeSecret = Math.random() < CONFIG.SECRET_CHANCE; 
    let selected = getUniqueCategoryQuestions(); // Guarantees 100% unique topics!
    selected = shuffleArray(selected);

    if (includeSecret) {
        let shuffledNormals = selected.slice(0, CONFIG.QUIZ_LENGTH - 1);
        shuffledNormals.push(secretQuestion);
        selected = shuffleArray(shuffledNormals); 
    } else {
        selected = selected.slice(0, CONFIG.QUIZ_LENGTH);
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
        button.onclick = () => {
            SoundFX.playPop(); // Native synth Pop
            selectAnswer(answer.type);
        };
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

    // Trigger visual confetti and audio chime celebrations
    SoundFX.playChime();
    Confetti.start();

    // Save result log
    StorageManager.saveResult(userName, result.title, result.emoji, winningType);
}

function shareResult() {
    const resultTitle = document.getElementById('result-title').innerText;
    const resultEmoji = document.getElementById('result-emoji').innerText;
    const shareText = `🍩 I took the Donut Quiz and matched with ${resultEmoji} ${resultTitle}! Find yours here: ${window.location.href}`;
    
    navigator.clipboard.writeText(shareText).then(() => {
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            const originalText = shareBtn.innerText;
            shareBtn.innerText = "Copied to Clipboard! ✅";
            setTimeout(() => {
                shareBtn.innerText = originalText;
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

document.addEventListener("DOMContentLoaded", () => {
    Confetti.init();
    
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const clearBtn = document.getElementById('clear-history-btn');
    const shareBtn = document.getElementById('share-btn');
    
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (clearBtn) clearBtn.addEventListener('click', clearData);
    if (shareBtn) shareBtn.addEventListener('click', shareResult);

    displayHistoryAndStats();
});
