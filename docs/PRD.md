# PRD: AI-Powered Spaced Repetition Flashcard App

**Version:** 1.0 | **Date:** 2026-03-12

---

## 1. Product Overview

### 1.1 Summary

A React Native mobile application that combines spaced repetition learning with AI-powered content generation, voice-based answer validation, and gamified progression — making knowledge acquisition faster, more effective, and genuinely enjoyable.

Users create Decks of Cards. Each Card is a rich learning unit: not just a question and answer, but also context explaining *why* the topic matters, a simple example, three real-world use cases, and a difficulty tag. AI can generate entire decks from a topic in seconds, evaluate voice answers, validate typed answers, and produce quizzes. The SM-2 spaced repetition algorithm schedules reviews optimally, and a gamification layer (XP, levels, streaks) keeps users coming back every day.

### 1.2 Vision

**People are happier when they learn.** Learning builds confidence, unlocks better career opportunities, deepens expertise, and creates a sense of daily progress. This app exists to make that experience effortless, structured, and rewarding — eliminating the biggest barriers: creating content, knowing what to study next, and staying consistent.

### 1.3 Target Platforms

- iOS (iPhone, iPad)
- Android (phones and tablets)
- Built with React Native + Expo for a single shared codebase

---

## 2. Goals

### 2.1 Business Goals

- Differentiate from Anki and Quizlet through deep AI integration (generation, voice validation, quiz creation) and gamification.
- Launch a freemium model: core features free, AI features and cloud sync behind a premium subscription.
- Achieve 4.5+ App Store / Play Store rating within 3 months of launch.
- Build a retention-first product: target 20% Day-30 retention from the start.

### 2.2 User Goals

- Create high-quality study material on any topic in seconds — not hours.
- Study efficiently: the algorithm tells you what to review, when.
- Track real progress with analytics, history, levels, and streaks.
- Study anywhere, including offline.
- Understand not just *what* the answer is, but *why it matters* and how it applies in the real world.

### 2.3 Non-Goals

- Not an LMS or course platform — no video hosting, long-form content, or live sessions.
- No social/collaborative deck sharing for MVP.
- No web application in v1.
- No real-time multiplayer or group quiz features in v1.

---

## 3. User Personas

| Persona | Background | Primary Need |
|---|---|---|
| **Alex** — Medical Student | Memorizing thousands of drug names, mechanisms, and side effects | AI-generated decks by topic, voice answers during commute |
| **Maria** — Software Engineer | Learning Rust on the job, 10 min/day commute study | Offline study, push reminders, quick card creation |
| **David** — Language Learner | Building Japanese vocabulary | Multiple study modes, difficulty filtering, import/export |
| **Sarah** — Casual Learner | History and geography for fun | Simple onboarding, dark mode, clear "why this matters" context per card |

### Role-Based Access

| Role | Capabilities |
|---|---|
| **Guest** | Full local study, manual card creation, SM-2, streaks. No AI, no sync. |
| **Free Account** | All guest features + limited AI (3 decks/month) + cloud sync. |
| **Premium** | Unlimited AI generation, voice validation, quiz generator, analytics export, priority AI. |

---

## 4. Card Data Model

Each Card is a **rich learning unit**, not just a question/answer pair:

| Field | Description |
|---|---|
| `question` | The question or prompt |
| `answer` | The correct answer |
| `why_important` | 1–2 sentences explaining why knowing this matters |
| `simple_example` | A clear, concrete example that makes the concept click |
| `use_cases` | 3 one-sentence real-world applications |
| `difficulty` | `easy` / `medium` / `hard` — AI-assigned at generation, user-editable |
| `confidence` | 1–10, updated by SM-2 after each study session |
| `favorite` | Boolean |
| `tags` | Inherited from deck, overridable per card |
| `sm2_interval` | Days until next review |
| `sm2_ease_factor` | SM-2 ease multiplier |
| `sm2_repetitions` | Number of times reviewed |
| `next_review_date` | Scheduled next review date |
| `created_at` | Creation timestamp |
| `updated_at` | Last modified timestamp |

> **Why this structure?** Most learners fail not because they lack the answer, but because they lack *context*. The `why_important`, `simple_example`, and `use_cases` fields are shown after the answer reveal, giving learners the "aha" moment that converts short-term recall into long-term understanding.

---

## 5. Functional Requirements

### 5.1 Deck Management *(Priority: High)*

- Create a deck with name, description, and tags.
- Edit or delete any deck.
- Deck **confidence score** = average confidence of all cards (0–10, one decimal). Cards not yet studied count as 0.
- Export any deck as JSON (includes all card fields).
- Export any deck as a **printable PDF** with bordered card boxes and dashed cut lines (see §5.1b).
- Import a JSON file to create a new deck or merge into an existing deck.
- Duplicate an existing deck.

### 5.1b PDF Export — Printable Flashcards *(Priority: Medium)*

- Accessible from deck options menu: "Export as PDF."
- **Layout**: 2-column grid of cards per page; A4 or US Letter size selectable before export.
- **Front pages**: question + deck name + difficulty label per card box.
- **Back pages**: answer + optional why_important + simple_example per card box, printed in the same card order as fronts.
- **Cut guides**: each card box has a solid inner border and a dashed outer cut line with a ✂ scissors icon at one corner.
- **Filter options**: all cards / favorited only / by difficulty / by confidence range.
- **Context toggle**: user can include or exclude why_important and simple_example on the back side.
- Generated fully on-device via `expo-print` or `react-native-html-to-pdf` (no server required; works offline).
- Shared via native share sheet — supports AirPrint (iOS), Android print service, and save-to-Files.
- Filename: `{deck-name}-flashcards-{date}.pdf`.

### 5.2 AI Deck Generation *(Priority: High)*

- User enters a topic + desired card count (1–100) → AI generates full deck.
- Each generated card includes: question, answer, why_important, simple_example, use_cases, and difficulty.
- User can append more AI-generated cards to an existing deck at any time.
- User can write a question and request AI to generate the answer + context fields only.
- Loading state with progress skeleton during generation.
- Clear error message + retry on failure.
- Requires authenticated account; guest users are prompted to sign up.

### 5.3 Card Management *(Priority: High)*

- Manual card creation: question + answer required; optional context fields.
- Edit any field on any card at any time.
- Delete a card (with confirmation).
- Favorite/unfavorite a card (heart icon, tap-to-toggle).
- User can override AI-assigned difficulty (easy / medium / hard).
- Bulk actions: delete selected cards, reset selected cards' SM-2 progress.

### 5.4 Spaced Repetition Engine — SM-2 *(Priority: High)*

- SM-2 algorithm runs fully on-device (offline-compatible).
- After each card response, user rates confidence 1–10.
- Rating maps to SM-2 quality score: 1–2 → repeat next session/day; 9–10 → interval in weeks.
- Home dashboard shows total due-today count across all decks.
- User can reset SM-2 progress per card or per entire deck.
- Cards with `next_review_date` ≤ today are included in the study queue.

### 5.5 Study Modes *(Priority: High)*

#### A. Flashcard Flip Mode (default)
- Question shown; user taps to flip (3D card animation) and see answer.
- Context fields (why_important, example, use cases) are revealed below the answer.
- User rates confidence 1–10 after each flip.

#### B. Multiple Choice / Quiz Mode
- Each question presented with 4 answer options (1 correct + 3 AI- or deck-generated distractors).
- Correct selection highlighted green; wrong highlighted red + correct revealed.
- User rates confidence after each question.
- A full **Quiz Generator** mode lets the user generate a standalone quiz from any deck (configurable number of questions, difficulty filter), with a final score summary.

#### C. Typing Answer Mode
- User types their answer; fuzzy normalized comparison (case/punctuation-insensitive).
- Expected answer shown side-by-side for self-evaluation.
- User rates confidence 1–10.

#### D. Voice Answer Mode *(Premium)*
- Microphone button shown during question display.
- User records their spoken answer.
- Audio sent to AI (speech-to-text + semantic evaluation).
- AI returns a rating 1–10 with a brief explanation of what was correct/missing.
- AI rating is pre-populated into the confidence slider; user can adjust before confirming.
- Ideal for commute study or language pronunciation practice.

### 5.6 Quiz Generator *(Priority: Medium)*

- Accessible from any deck: "Generate Quiz" button.
- User configures: number of questions (5–50), difficulty filter (all / easy / medium / hard), include only favorited cards (optional).
- Quiz runs in 4-option multiple choice format.
- Final summary: score (X/Y), time taken, per-question breakdown showing correct vs. user's answer.
- Option to export quiz results as PDF or share score.
- Quiz results are logged to session history but do not update SM-2 schedule (quiz ≠ review session).

### 5.7 Session History Tracker *(Priority: Medium)*

- Every completed study session is saved with: date/time, deck name, mode used, cards reviewed, avg confidence, duration, cards improved vs. declined.
- A dedicated **History** screen lists all past sessions in reverse chronological order.
- Tapping a session shows the full session detail (card-by-card breakdown).
- Filters: by deck, by date range, by mode.
- Summary stats at the top: total sessions, total time studied, avg session length.

### 5.8 Levels, XP, and Progression *(Priority: Medium)*

- Users earn **XP** for study actions:
  - Completing a study session: 50 XP base + 5 XP per card reviewed.
  - Rating a card 8–10: +2 XP bonus per card.
  - Completing a quiz: 30 XP + score bonus.
  - Maintaining a streak day: +20 XP.
  - Creating a new deck: +10 XP.
- **Levels** follow an XP curve (Level 1 = 0 XP, Level 2 = 200 XP, … with increasing thresholds).
- A level badge and progress bar are shown on the user profile screen and home dashboard.
- **Streak** is incremented once per calendar day a user completes ≥1 session. Missing a day resets to 0 (with a 1-day grace streak freeze available as a premium perk).
- Level milestones unlock cosmetic deck themes and card styles.
- Weekly XP leaderboard (personal history, not social) showing this week vs. last week.

### 5.9 Progress Analytics *(Priority: Medium)*

- **Home dashboard**: due cards today, current streak, level + XP bar, decks list with confidence score badges.
- **Analytics screen**: 30-day daily review chart, retention rate per deck, confidence score trend (this week vs. last), total cards reviewed all-time, total study time.
- Per-deck analytics: confidence distribution (pie chart by tier), cards by difficulty, review history, avg session duration.

### 5.10 Push Notifications *(Priority: Medium)*

- User defines 1–3 preferred daily reminder times.
- Local notifications (Expo Notifications) include due-card count.
- Streak-at-risk notification (evening reminder if no session completed that day).
- Master on/off toggle; individual reminder management.
- iOS permission prompt with clear value-framing copy before requesting.

### 5.11 User Authentication & Cloud Sync *(Priority: Medium)*

- Sign up / sign in: email + password, Google OAuth, Apple Sign-In (iOS).
- Supabase backend: auth + PostgreSQL data store.
- Delta sync (only changed records since last sync timestamp).
- Conflict resolution: last-write-wins with server timestamp.
- Offline changes queued and auto-synced on reconnect.
- Last-synced timestamp shown in settings.
- Full account + data deletion from settings (GDPR/CCPA compliant).

### 5.12 Search *(Priority: Medium)*

- Global search across deck names, card questions, answers, and context fields.
- Results grouped by deck with highlighted matched text snippet.
- Debounced at 300 ms; runs fully offline against local SQLite.

### 5.13 Onboarding *(Priority: Medium)*

- 4 screens on first launch: (1) What is spaced repetition? (2) Decks and Cards. (3) AI generation. (4) Levels and streaks.
- Skippable at any screen.
- Re-accessible from settings.
- Ends with CTA: "Create your first deck" or "Import a deck."

### 5.14 Dark Mode *(Priority: Low)*

- Light / Dark / System options in settings.
- All screens, modals, and components render correctly in both modes.
- Persisted across app restarts.

### 5.15 Offline Support *(Priority: High)*

- All study modes, SM-2 scheduling, card/deck CRUD: fully offline.
- AI generation and cloud sync require connectivity; show clear offline state.
- No data loss if app is killed mid-session while offline.

---

## 6. User Experience Highlights

### 6.1 Core Flows

**Creating a deck (AI)**
1. Tap FAB → "Generate with AI"
2. Enter topic + card count → Tap Generate
3. Skeleton loading → Preview generated deck
4. Confirm → Navigate to deck detail

**Daily study session**
1. Home shows due-card count per deck
2. Tap deck or "Study All Due" → session starts
3. Flashcard flip → answer revealed → context shown → rate 1–10
4. Session ends → Summary screen → XP earned animation → streak updated

**Voice answer session**
1. Choose "Voice Mode" before starting session
2. Card shown → mic button prominent
3. User speaks answer → AI evaluates → confidence pre-filled
4. User confirms or adjusts rating → next card

### 6.2 Edge Cases

- Zero due cards: show "No cards due — study ahead?" option.
- Partial AI generation: save partial results, notify user.
- JSON import with duplicates: prompt to skip or overwrite.
- Streak at risk (evening, no session): push notification.
- Voice mode offline: gracefully fallback to flip mode with informative message.
- Deck with <4 cards in quiz mode: distractors sourced from all decks.

### 6.3 UI/UX Details

- 3D card flip animation (perspective transform) in flashcard mode.
- Swipe right = confident (green), swipe left = not confident (red) as quick alternative to rating buttons.
- Haptic feedback on card flip, session complete, level-up.
- Confidence badge colors: red (1–3), yellow (4–6), green (7–8), teal (9–10).
- XP gain popup animation after session summary.
- Level-up full-screen celebration animation.
- Skeleton loaders during AI generation.
- Difficulty badges: 🟢 Easy, 🟡 Medium, 🔴 Hard.

---

## 7. Narrative

Maria opens the app during her morning commute. She has 18 Rust cards due. She switches to **Voice Mode** and answers questions out loud while the train moves. The AI rates her answers and pre-fills the confidence slider — she confirms or adjusts with a quick tap. At the end of the session, she earns 140 XP and her streak hits 12 days. The summary screen shows she's Level 7 and 60 XP from Level 8.

That evening she wants to study Rust error handling — a topic not yet in her deck. She taps "Generate with AI," types "Rust error handling with Result and Option," and requests 15 cards. In under 5 seconds, the deck appears — each card showing not just the question and answer, but why this pattern matters, a simple example, and three real-world use cases. She skims the cards, edits one answer, marks two cards as favorites, and saves. Tomorrow morning, those cards will appear in her queue — scheduled by the algorithm at exactly the right time.

---

## 8. Success Metrics

| Category | Metric | Target |
|---|---|---|
| Retention | Day-7 retention | 40% |
| Retention | Day-30 retention | 20% |
| Engagement | Users with 7-day streak | 25% of activated users |
| Engagement | Avg daily session length | 8–15 min |
| Satisfaction | NPS at Day 14 | 40+ |
| Business | Free → Premium conversion | 5% within 60 days |
| Business | AI feature weekly usage | 60% of active users |
| Technical | Crash-free session rate | 99.5%+ |
| Technical | AI generation p50 latency | <4s for 20-card deck |
| Technical | SQLite study queue load | <100ms |
| Technical | Voice-to-rating latency | <6s |

---

## 9. Technical Considerations

### 9.1 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo (managed workflow → EAS Build) |
| Language | TypeScript (strict mode) |
| State | Zustand |
| Local DB | expo-sqlite or WatermelonDB (evaluate for large decks) |
| Cloud DB | Supabase (PostgreSQL + Auth + Realtime) |
| AI API | Claude API (Anthropic) via backend proxy |
| Voice | Expo AV (recording) + AI transcription + semantic evaluation |
| Notifications | Expo Notifications (local scheduling) |
| Auth tokens | Expo SecureStore |
| File I/O | Expo FileSystem + expo-document-picker |
| Navigation | Expo Router (file-based) |
| Animations | React Native Reanimated 3 |
| Testing | Jest + React Native Testing Library |

### 9.2 AI Architecture

- A lightweight **backend proxy** (Node.js + Fastify on Railway or Fly.io) handles all AI API calls.
- The proxy protects the API key, enforces per-user quotas, and logs usage for billing.
- Voice answers: Expo AV records audio → uploaded to proxy → proxy sends to Whisper (transcription) → sends transcript + expected answer to Claude → returns rating 1–10 + explanation JSON.
- Deck generation: proxy sends a structured prompt with topic + count → Claude returns a JSON array of card objects → proxy validates schema → returns to client.

### 9.3 Data Privacy & Compliance

- No card content logged beyond provider standard retention.
- Users can export all data as JSON from settings.
- Full account + data deletion available in-app.
- GDPR / CCPA compliant: privacy policy, data export, deletion workflows at launch.
- Voice audio is not stored after transcription; only the text transcript is used.

### 9.4 Potential Challenges

| Challenge | Mitigation |
|---|---|
| AI answer quality/errors | Easy card editing, clear AI-content disclaimer, user can override any field |
| SM-2 cold start (lots of due cards initially) | UX messaging explaining the system; daily card limit option |
| Voice mode latency | Optimistic UI (show "processing…" immediately); fallback to flip mode on timeout |
| Offline/online sync conflicts | Last-write-wins + last-synced timestamp shown; manual conflict review in future phase |
| iOS push notification opt-in | Value-framing copy before permission prompt |
| Expo managed workflow limits | Evaluate EAS Build custom dev client early for any native modules |

---

## 10. Milestones & Roadmap

### Phase 1 — MVP (Weeks 1–12)

- Project setup: Expo + TypeScript + Zustand + expo-sqlite + EAS Build
- Rich card data model (question, answer, why_important, simple_example, use_cases, difficulty)
- Deck and card CRUD (manual)
- Flashcard flip study mode + SM-2 algorithm
- Confidence rating UI (1–10)
- AI deck generation + AI answer generation (backend proxy)
- JSON import/export
- Home dashboard (due cards, deck list, confidence scores)
- Onboarding flow (4 screens)
- Push notification reminders (local)
- Dark mode
- Internal alpha + usability testing

### Phase 2 — Enhanced Experience (Weeks 13–20)

- User auth (email + Google + Apple) + cloud sync (Supabase)
- Multiple choice study mode + Quiz Generator
- Typing answer mode
- Session history tracker
- XP system + levels + streak gamification
- Per-deck and global analytics screens
- Global search
- Favorites filter in sessions
- Session summary screen with XP animation
- PDF export with printable cut-line flashcard layout
- Public beta (TestFlight + Google Play Internal)

### Phase 3 — Advanced Features (Weeks 21–28)

- Voice answer mode + AI rating (Premium)
- AI distractor generation for multiple choice
- Level-up celebration animation + cosmetic unlocks
- Streak freeze (Premium perk)
- Premium subscription paywall (RevenueCat)
- Analytics export (CSV/PDF)
- Quiz result sharing + export
- Performance optimization (WatermelonDB evaluation)
- App Store + Google Play public launch

---

## 11. User Stories

### US-001 — Create a deck manually
**As a user**, I want to create a new deck by entering a name and optional tags, so I can organize my study material by topic.
**Acceptance criteria:**
- "Create deck" button accessible from home screen.
- Name required (1–100 chars); description and tags optional.
- Submitting creates the deck and navigates to its detail screen.
- Empty name shows inline validation error.

### US-002 — Generate a full deck with AI
**As a user**, I want to enter a topic and card count and have AI generate a complete deck including context fields, so I can start studying without manual authoring.
**Acceptance criteria:**
- "Generate with AI" option in deck creation flow.
- Topic required; card count 1–100 required.
- Each generated card includes question, answer, why_important, simple_example, use_cases, and difficulty.
- Skeleton loading during generation.
- On success: deck saved, navigated to deck detail.
- On failure: error message + retry button.
- Requires authenticated account.

### US-003 — Add more AI cards to existing deck
**As a user**, I want to append AI-generated cards to a deck I already have, so I can expand it without creating a new deck.
**Acceptance criteria:**
- "Generate more cards" action available from deck detail screen.
- Topic defaults to deck name; user can change it.
- New cards appended without altering existing cards.
- Deck card count updates immediately.

### US-004 — Add card with AI-generated answer
**As a user**, I want to write my own question and have AI generate the answer and context fields, so I create cards faster.
**Acceptance criteria:**
- "Generate answer" button in card creation form.
- AI populates answer, why_important, simple_example, use_cases, and difficulty.
- All fields editable before saving.
- Error state allows manual entry if AI fails.

### US-005 — Study in flashcard flip mode
**As a user**, I want to flip flashcards, see the answer with context, and rate my confidence 1–10, so the algorithm schedules my next review.
**Acceptance criteria:**
- Question shown first; "Show answer" tap triggers 3D flip animation.
- Answer, why_important, simple_example, and use_cases shown after flip.
- Confidence rating 1–10 required before moving to next card.
- SM-2 updated immediately after rating.
- Progress indicator shows "Card X of Y."

### US-006 — Study in voice answer mode
**As a premium user**, I want to speak my answer aloud and have AI rate it 1–10, so I can study hands-free during commutes.
**Acceptance criteria:**
- "Voice Mode" selectable before starting a session (premium required).
- Mic button shown during question display.
- Recording starts on tap; stop on second tap or 30s timeout.
- AI returns confidence rating 1–10 + brief explanation within 6s.
- Rating pre-fills the confidence slider; user can adjust before confirming.
- If AI fails or offline: fallback to manual flip mode with message.

### US-007 — Study in multiple choice mode
**As a user**, I want to answer questions with 4 options, so I can test recognition in a quiz-like format.
**Acceptance criteria:**
- "Multiple choice" selectable before session.
- 4 options: 1 correct + 3 distractors (from same deck if possible).
- Correct = green highlight; wrong = red + correct revealed.
- User rates confidence after selection.
- SM-2 updated based on confidence rating.

### US-008 — Study in typing mode
**As a user**, I want to type my answer and compare it to the expected one, so I practice active recall and spelling.
**Acceptance criteria:**
- "Typing" mode selectable before session.
- Normalized fuzzy comparison (case/punctuation-insensitive).
- Expected and typed answers shown side-by-side.
- User self-rates confidence 1–10.

### US-009 — Generate a quiz from a deck
**As a user**, I want to generate a timed quiz from a deck with a final score, so I can test myself without affecting my SM-2 schedule.
**Acceptance criteria:**
- "Generate Quiz" button on deck detail.
- User configures: number of questions (5–50), difficulty filter, favorites only (optional).
- 4-option multiple choice format.
- Final summary: score X/Y, time taken, per-question breakdown.
- Quiz results logged to session history but do NOT update SM-2.
- Option to share score or export summary.

### US-010 — View and rate card difficulty
**As a user**, I want to see the difficulty of each card (easy/medium/hard) and override the AI assignment, so I can calibrate my expectations per card.
**Acceptance criteria:**
- AI assigns difficulty at generation time.
- Difficulty badge (🟢/🟡/🔴) shown on card list and during study.
- User can change difficulty from the card edit view.
- User override is persisted and not overwritten by future AI generation.

### US-011 — Favorite a card
**As a user**, I want to mark cards as favorites so I can filter study sessions to focus on important cards.
**Acceptance criteria:**
- Heart icon visible on card list item and edit view.
- Toggle updates instantly without save action.
- "Study favorites" session filter available when ≥1 card is favorited.
- Favorites filter shown in session setup.

### US-012 — View session summary
**As a user**, I want a summary at the end of a session showing my performance, XP earned, and streak status.
**Acceptance criteria:**
- Summary screen shown automatically after last card.
- Shows: cards reviewed, avg confidence, XP earned, current streak.
- Animated XP counter.
- "Done" and "Study again" buttons.

### US-013 — Track session history
**As a user**, I want to see a log of all my past study sessions, so I can reflect on my learning habits.
**Acceptance criteria:**
- History screen lists sessions in reverse chronological order.
- Each entry shows: date, deck, mode, cards reviewed, avg confidence, duration.
- Tapping a session shows card-by-card detail.
- Filters by deck, date range, mode.

### US-014 — Earn XP and level up
**As a user**, I want to earn XP for studying and level up, so I feel a sense of accomplishment and progression.
**Acceptance criteria:**
- XP awarded per session, per card rated 8–10, per streak day, per deck created.
- Level badge and XP progress bar on home dashboard and profile.
- Level-up triggers a full-screen celebration animation.
- XP thresholds per level visible in profile.

### US-015 — Maintain a streak
**As a user**, I want to see my consecutive study streak so I stay motivated to study every day.
**Acceptance criteria:**
- Streak increments once per calendar day when ≥1 session completed.
- Streak resets to 0 if a day is missed (premium: 1 streak freeze available).
- Streak displayed on home dashboard and session summary.
- Evening push notification when streak is at risk.

### US-016 — Export a deck as JSON
**As a user**, I want to export a deck as JSON including all card context fields, so I can back it up or share it.
**Acceptance criteria:**
- "Export" in deck options menu.
- JSON includes all card fields (question, answer, why_important, simple_example, use_cases, difficulty, confidence, sm2 data).
- Shared via native share sheet.
- Filename: `{deck-name}-{date}.json`.

### US-016b — Export deck to PDF (Printable Flashcards)
**As a user**, I want to export my deck as a printable PDF where each card is drawn inside a bordered box with dashed cut lines, so I can print and physically cut out my flashcards for offline paper study.
**Acceptance criteria:**
- "Export as PDF" option available from the deck options menu alongside JSON export.
- The PDF is laid out in a **2-column grid** of cards per page (A4 and US Letter size selectable).
- Each card block contains:
  - **Front side**: question text + deck name + difficulty badge label (Easy / Medium / Hard).
  - **Back side**: answer text + why_important + simple_example (condensed, 1–2 lines each).
- Each card block is enclosed in a **solid border rectangle** with a **dashed cut line** offset slightly outside the border (scissors icon printed at one corner of the cut line as a visual cue).
- Front and back sides are printed on **separate pages** in the same order, so the user can print double-sided or cut fronts and backs separately and pair them.
- A user-configurable option controls whether context fields (why_important, simple_example) are included on the back side or omitted for a minimal flashcard.
- User can filter which cards to include: all cards, favorited only, by difficulty, or by confidence range (e.g., only cards rated 1–5).
- The PDF is generated on-device using a React Native PDF library (e.g., `react-native-html-to-pdf` or `expo-print`) — no server needed.
- The generated PDF is shared via the native share sheet (save to Files, print directly via AirPrint/Android print service, or share to another app).
- Filename: `{deck-name}-flashcards-{date}.pdf`.
- Works offline (no network required for PDF generation).

### US-017 — Import a deck from JSON
**As a user**, I want to import a JSON file to restore or receive a shared deck.
**Acceptance criteria:**
- "Import deck" from home screen menu.
- Native file picker for JSON selection.
- Preview shown: deck name + card count before import.
- Duplicate handling: skip or overwrite prompt.
- Success message with imported card count.

### US-018 — View analytics
**As a user**, I want to see my progress over time including retention rate, confidence trends, and daily review chart.
**Acceptance criteria:**
- 30-day daily review bar chart on analytics screen.
- Retention rate per deck.
- Confidence score trend (this week vs. last week).
- Total cards reviewed and total study time all-time.

### US-019 — Set push notification reminders
**As a user**, I want to set daily reminder times so I get notified when it's time to study.
**Acceptance criteria:**
- Up to 3 reminder times via time picker in settings.
- Master on/off toggle.
- Notifications include due-card count.
- Local scheduling via Expo Notifications (works offline).
- iOS prompts for permission with value-framing copy.

### US-020 — Sign in and sync across devices
**As a user**, I want my decks and progress synced to the cloud so I can study on any device.
**Acceptance criteria:**
- Sign up/in: email + password, Google, Apple (iOS).
- Delta sync in background; offline changes queued.
- Last-synced timestamp in settings.
- Full data deletion available from settings.

### US-021 — Study offline
**As a user**, I want all study features to work without internet.
**Acceptance criteria:**
- Flip, multiple choice, typing, quiz modes work offline.
- SM-2 updates saved locally; synced when online.
- AI and sync show clear offline state messages.
- No data lost if app closed mid-offline session.

### US-022 — Search across all content
**As a user**, I want to search all decks and cards by text so I can find specific content quickly.
**Acceptance criteria:**
- Global search screen from navigation.
- Searches question, answer, why_important, simple_example fields.
- Results grouped by deck with highlighted match snippet.
- Debounced at 300ms; works offline.

### US-023 — Complete onboarding
**As a new user**, I want a simple walkthrough so I understand how the app works.
**Acceptance criteria:**
- 4-screen onboarding on first launch only.
- Covers: spaced repetition, decks/cards, AI generation, levels/streaks.
- Skippable at any screen.
- Re-accessible from settings.
- Ends with "Create your first deck" CTA.

### US-024 — Reset SM-2 progress
**As a user**, I want to reset spaced repetition progress on a card or full deck without deleting my cards.
**Acceptance criteria:**
- "Reset progress" on card edit view (single card).
- "Reset deck progress" on deck options (all cards).
- Confirmation dialog before reset.
- Resets interval, ease factor, repetitions, next_review_date to SM-2 defaults.
- Question, answer, context fields, and favorites unaffected.

### US-025 — Toggle dark mode
**As a user**, I want to choose light, dark, or system theme so I can study comfortably in any lighting.
**Acceptance criteria:**
- 3-option theme setting: Light / Dark / System.
- System option follows device appearance and updates dynamically.
- All screens render correctly in both modes.
- Preference persisted across restarts.
