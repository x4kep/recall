<p align="center">
  <img src="./assets/logo.png" alt="Recall logo" width="180" />
</p>

# Recall — AI-Powered Spaced Repetition Flashcards

> **Remember everything. Effortlessly.**

Recall is a React Native mobile app that combines spaced repetition learning with AI-powered content generation, voice-based answer validation, and gamified progression — making knowledge acquisition faster, more effective, and genuinely enjoyable.

---

## What is it?

Users create **Decks** of **Cards**. Each card is a rich learning unit — not just a question and answer, but also context explaining _why_ the topic matters, a simple example, three real-world use cases, and a difficulty tag.

The **SM-2 spaced repetition algorithm** schedules reviews at the optimal time. **AI** can generate entire decks from a topic in seconds, evaluate voice answers, and produce quizzes. A **gamification layer** (XP, levels, streaks) keeps users coming back every day.

---

## Features

### Core (MVP)

- **Deck & Card Management** — Create, edit, delete decks and cards with rich context fields
- **Spaced Repetition (SM-2)** — Fully offline algorithm schedules reviews based on confidence ratings
- **Flashcard Flip Mode** — 3D card flip, answer reveal with context, confidence rating 1–10
- **Home Dashboard** — Due cards today, deck list with confidence scores, streak display
- **Offline First** — All study modes and SM-2 scheduling work without internet

### AI-Powered

- **AI Deck Generation** — Enter a topic + card count, get a full deck in seconds via Claude API
- **AI Answer Generation** — Write a question, AI fills in answer and all context fields
- **Voice Answer Mode** _(Premium)_ — Speak your answer, AI rates it 1–10 with explanation

### Study Modes

- **Flashcard Flip** — Classic flip with confidence rating
- **Multiple Choice** — 4-option quiz format with instant feedback
- **Typing Mode** — Type your answer, fuzzy comparison with expected answer
- **Voice Mode** _(Premium)_ — Hands-free study for commutes

### Gamification

- **XP & Levels** — Earn XP for sessions, high ratings, streaks, and deck creation
- **Daily Streaks** — Consecutive study day tracking with streak-at-risk notifications
- **Session Summary** — XP earned animation, avg confidence, cards reviewed

### Progress & Analytics

- **Session History** — Full log of past sessions with per-card breakdowns
- **Analytics Screen** — 30-day review chart, retention rates, confidence trends
- **Per-Deck Analytics** — Confidence distribution, difficulty breakdown, review history

### Other

- **Push Notifications** — Daily reminders with due-card count (Expo Notifications)
- **JSON Import/Export** — Back up or share any deck with all context fields
- **PDF Export** — Printable flashcard layout with cut lines for physical cards
- **Global Search** — Search across all decks and cards, works offline
- **Dark Mode** — Light / Dark / System theme options
- **Cloud Sync** _(Phase 2)_ — Supabase auth + delta sync across devices

---

## Tech Stack

| Layer         | Technology                               |
| ------------- | ---------------------------------------- |
| Framework     | React Native + Expo (SDK 55)             |
| Language      | TypeScript (strict)                      |
| Navigation    | Expo Router (file-based)                 |
| State         | Zustand                                  |
| Local DB      | expo-sqlite                              |
| Cloud DB      | Supabase (PostgreSQL + Auth)             |
| AI            | Claude API (Anthropic) via backend proxy |
| Animations    | React Native Reanimated 3                |
| Notifications | Expo Notifications                       |
| Auth Tokens   | Expo SecureStore                         |

---

## Project Structure

```
recall/
├── app/
│   ├── _layout.tsx          # Root layout, DB init
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab bar (Home, Decks)
│   │   ├── index.tsx        # Home screen
│   │   └── decks.tsx        # Deck list screen
│   ├── deck/[id].tsx        # Deck detail + card management
│   └── study/[id].tsx       # Study session screen
├── constants/
│   └── colors.ts            # Design tokens
├── lib/
│   ├── db.ts                # SQLite schema & init
│   └── sm2.ts               # SM-2 algorithm
└── store/
    └── deckStore.ts         # Zustand store (decks + cards)
```

---

## Getting Started

**Prerequisites:** Node 20+, Expo CLI, iOS Simulator or Android Emulator (or Expo Go app)

```bash
git clone https://github.com/x4kep/recall.git
cd recall
npm install
npx expo start
```

Scan the QR code with Expo Go or press `i` for iOS / `a` for Android.

---

## Card Data Model

Each card is a rich learning unit designed to create lasting understanding — not just short-term recall:

| Field              | Description                             |
| ------------------ | --------------------------------------- |
| `question`         | The question or prompt                  |
| `answer`           | The correct answer                      |
| `why_important`    | Why knowing this matters                |
| `simple_example`   | A concrete example that makes it click  |
| `use_cases`        | 3 real-world applications               |
| `difficulty`       | `easy` / `medium` / `hard`              |
| `confidence`       | 1–10, updated by SM-2 after each review |
| `next_review_date` | SM-2 scheduled next review              |

---

## Roadmap

| Phase                  | Timeline    | Focus                                                                   |
| ---------------------- | ----------- | ----------------------------------------------------------------------- |
| **Phase 1 — MVP**      | Weeks 1–12  | Core CRUD, SM-2, flashcard study, AI generation, offline                |
| **Phase 2 — Enhanced** | Weeks 13–20 | Auth + cloud sync, quiz mode, XP/levels, analytics, PDF export          |
| **Phase 3 — Advanced** | Weeks 21–28 | Voice mode, premium subscription, level-up animations, App Store launch |

---

## Target Platforms

- iOS (iPhone, iPad)
- Android (phones and tablets)

---

## License

Private — all rights reserved.

---

npx expo run:android --variant release ( Build app localy )
npx expo run:android ( Hot Reload )
