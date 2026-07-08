# Which Donut Are You?
# 🍩 Which Donut Are You? — Interactive Personality Quiz

An elegant, client-side interactive web application designed as an educational and entertaining personality quiz. The app dynamically evaluates user inputs to match them with one of eight uniquely defined donut personalities, featuring real-time statistics tracking and custom interactive elements.

## 🌟 Key Features

- **Personalization Dashboard:** 
  - Greet users by their custom name on the result screen.
  - Swap UI designs instantly with 3 beautifully crafted, responsive themes: **Sweet Candy**, **Cozy Matcha**, and **Cyber Bacon**.
  - Choose custom quiz lengths: Short (10 Qs), Standard (20 Qs), or Marathon (30 Qs) dynamically.
- **Dynamic 192-Question Database:**
  - Procedurally compiles questions from templates to reach exactly 192 options without bloating the code.
  - Implements an **Anti-Repetition Category Filter** ensuring that every single question in a session represents a completely unique topic with unique answers.
- **Ultra-Rare Secret Event:**
  - Features an easter-egg secret question with a built-in **3% spawn chance** for lucky runs.
- **Persistent Local History & Stats:**
  - Saves your recent match logs using browser `localStorage` [1.1].
  - Counts and displays a personal dashboard showing the exact frequency tally of how many times you matched with each of the **8 donut types** (including *Blueberry Galaxy*, *Spicy Mango Chili*, and *Golden Caramel Cruller*).
- **Web Audio & Visual Celebration:**
  - Playful sound effects synthesized directly in the code via the browser's native **Web Audio API** (completely file-free!).
  - Interactive **Canvas Particle Confetti System** to celebrate matches on the victory screen.

## 🛠️ Tech Stack & Architecture

This project is built to showcase a highly modular, decoupled architecture using pure vanilla frontend web technologies:

- **HTML5:** Semantic document structure with separate containers for quiz flow states.
- **CSS3:** Custom properties (CSS variables) for real-time theme swapping, flexbox/grid layout alignments, and keyframe animations.
- **JavaScript (ES6):**
  - **`config.js`**: Centralized configuration management.
  - **`questions.js`**: Local data store and procedural question compiler.
  - **`storage.js`**: `localStorage` data management and tally calculators.
  - **`script.js`**: Coordinates game flow, audio synthesizers, canvas rendering, and UI DOM manipulation.

## 📦 How to Run Locally

Since this is a fully static client-side application, it requires no external databases or compilers.

1. Clone or download this repository.
2. Ensure all files (`index.html`, `style.css`, `config.js`, `questions.js`, `storage.js`, and `script.js`) are kept in the same root folder.
3. Open `index.html` in any web browser, or host it locally using a simple HTTP server:
   ```bash
   python3 -m http.server 8080
