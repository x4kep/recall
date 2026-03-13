# Recall — Frontend Development Plan
**Version:** 1.1 | **Date:** 2026-03-13
**Based on:** PRD.md v1.0 + BRANDING.md v1.0

This document is the authoritative implementation guide for the Recall React Native app. Every architectural decision below is final — developers should code, not deliberate.

---

## ⚠️ Global UI Rule — Icons

**Always use Lucide icons. Never use emoji as UI icons.**

```bash
npm install lucide-react-native
```

```tsx
import { Home, BookOpen, Brain, Star, Trash2, ChevronRight, Upload, Plus } from 'lucide-react-native';

// Usage
<Home size={24} color={Colors.primary} />
```

### Icon reference for common actions

| Action | Lucide Icon |
|---|---|
| Home / Dashboard | `Home` |
| Decks | `BookOpen` |
| Study / Flash | `Brain` |
| Analytics | `BarChart2` |
| Profile | `User` |
| Add / Create | `Plus` |
| Delete | `Trash2` |
| Edit | `Pencil` |
| Favorite / Heart | `Heart` |
| Import | `Upload` |
| Export | `Download` |
| Search | `Search` |
| Settings | `Settings` |
| Back / Close | `X` or `ChevronLeft` |
| Next / Forward | `ChevronRight` |
| Check / Correct | `CheckCircle2` |
| Wrong / Incorrect | `XCircle` |
| Difficulty Easy | `Zap` |
| Difficulty Medium | `Flame` |
| Difficulty Hard | `Skull` |
| Streak | `Flame` |
| XP / Level | `Star` |
| Microphone / Voice | `Mic` |
| Notification | `Bell` |
| Calendar / Due | `CalendarClock` |
| Flip Card | `RefreshCw` |

Emoji are only acceptable as **content** (inside card text, deck descriptions, user-generated data) — never as navigation icons, action buttons, or status indicators.

---

## 1. Project Setup & Tooling

### 1.1 Initialization

```bash
# Requires Node 20+ and EAS CLI
npm install -g eas-cli

npx create-expo-app@latest recall \
  --template https://github.com/expo/expo/tree/main/templates/expo-template-blank-typescript

cd recall
npx expo install expo-router@4 react-native-safe-area-context react-native-screens \
  expo-linking expo-constants expo-status-bar
```

**Expo SDK:** 52 (latest stable as of March 2026). Do not use SDK 51 — SDK 52 ships with React Native 0.76 which includes the New Architecture (Fabric + JSI) enabled by default, required for Reanimated 3 worklets at full performance.

Update `package.json` main entry:
```json
{
  "main": "expo-router/entry"
}
```

Update `app.json`:
```json
{
  "expo": {
    "name": "Recall",
    "slug": "recall",
    "scheme": "recall",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1B2A4A"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.recall.app",
      "usesAppleSignIn": true,
      "infoPlist": {
        "NSMicrophoneUsageDescription": "Recall uses your microphone for voice answer mode.",
        "NSSpeechRecognitionUsageDescription": "Recall uses speech recognition to evaluate your spoken answers."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1B2A4A"
      },
      "package": "com.recall.app",
      "permissions": ["RECORD_AUDIO"]
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "expo-secure-store",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#3B82F6"
        }
      ],
      [
        "expo-av",
        {
          "microphonePermission": "Recall uses your microphone for voice answer mode."
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### 1.2 TypeScript Configuration

`tsconfig.json` — strict mode, full coverage:
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "target": "ES2022",
    "moduleResolution": "bundler",
    "jsx": "react-native",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@stores/*": ["src/stores/*"],
      "@db/*": ["src/db/*"],
      "@theme/*": ["src/theme/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@api/*": ["src/api/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.d.ts", "expo-env.d.ts"]
}
```

### 1.3 Full Directory & File Structure

```
recall/
├── app/                          # Expo Router file-based routes
│   ├── _layout.tsx               # Root layout (fonts, theme, auth gate)
│   ├── index.tsx                 # Redirect to (tabs)/home or onboarding
│   ├── onboarding/
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Screen 1: What is spaced repetition?
│   │   ├── decks.tsx             # Screen 2: Decks & Cards
│   │   ├── ai.tsx                # Screen 3: AI Generation
│   │   └── gamification.tsx      # Screen 4: Levels & Streaks
│   ├── auth/
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Bottom tab navigator
│   │   ├── home/
│   │   │   ├── index.tsx         # Home dashboard
│   │   │   └── _layout.tsx
│   │   ├── study/
│   │   │   ├── index.tsx         # Study mode selector / entry
│   │   │   └── _layout.tsx
│   │   ├── history/
│   │   │   ├── index.tsx         # Session history list
│   │   │   └── _layout.tsx
│   │   ├── analytics/
│   │   │   ├── index.tsx         # Global analytics
│   │   │   └── _layout.tsx
│   │   └── profile/
│   │       ├── index.tsx         # Profile / level screen
│   │       └── _layout.tsx
│   ├── decks/
│   │   ├── [id]/
│   │   │   ├── index.tsx         # Deck detail
│   │   │   ├── edit.tsx          # Edit deck metadata
│   │   │   └── analytics.tsx     # Per-deck analytics
│   │   └── _layout.tsx
│   ├── cards/
│   │   ├── [id]/
│   │   │   ├── index.tsx         # Card detail view
│   │   │   └── edit.tsx          # Card edit form
│   │   └── _layout.tsx
│   ├── session/
│   │   ├── [deckId]/
│   │   │   ├── setup.tsx         # Mode selector before session
│   │   │   ├── study.tsx         # Active study session
│   │   │   └── summary.tsx       # Post-session summary + XP
│   │   └── _layout.tsx
│   ├── quiz/
│   │   ├── [deckId]/
│   │   │   ├── setup.tsx         # Quiz configuration
│   │   │   ├── session.tsx       # Active quiz
│   │   │   └── summary.tsx       # Quiz results
│   │   └── _layout.tsx
│   ├── history/
│   │   └── [sessionId].tsx       # Session detail view
│   ├── search.tsx                # Global search screen
│   ├── pdf-preview/
│   │   └── [deckId].tsx          # PDF export preview
│   └── modals/
│       ├── deck-create.tsx       # Create deck modal
│       ├── ai-generate.tsx       # AI deck generation modal
│       ├── card-create.tsx       # Create card modal
│       ├── settings.tsx          # Settings modal
│       └── level-up.tsx          # Level-up celebration modal
├── src/
│   ├── types/                    # Shared TypeScript types
│   │   ├── index.ts              # Re-exports
│   │   ├── deck.ts
│   │   ├── card.ts
│   │   ├── session.ts
│   │   ├── user.ts
│   │   └── api.ts
│   ├── theme/                    # Design token implementation
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   ├── radius.ts
│   │   ├── motion.ts
│   │   ├── theme.ts
│   │   └── index.ts
│   ├── components/               # Reusable UI components
│   │   ├── primitives/
│   │   │   ├── Button.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Slider.tsx
│   │   │   └── IconButton.tsx
│   │   ├── flashcard/
│   │   │   ├── FlashCard.tsx
│   │   │   ├── ConfidencePicker.tsx
│   │   │   ├── DifficultyBadge.tsx
│   │   │   └── ContextPanel.tsx
│   │   ├── deck/
│   │   │   ├── DeckCard.tsx
│   │   │   ├── DeckList.tsx
│   │   │   ├── DeckConfidenceBar.tsx
│   │   │   └── DeckOptionsMenu.tsx
│   │   ├── study/
│   │   │   ├── StudyProgress.tsx
│   │   │   ├── StudyModeSelector.tsx
│   │   │   ├── SessionSummaryCard.tsx
│   │   │   └── XPGainBanner.tsx
│   │   ├── gamification/
│   │   │   ├── XPBar.tsx
│   │   │   ├── LevelBadge.tsx
│   │   │   ├── StreakCounter.tsx
│   │   │   └── LevelUpModal.tsx
│   │   ├── forms/
│   │   │   ├── AIGenerateForm.tsx
│   │   │   ├── CardEditForm.tsx
│   │   │   └── DeckCreateForm.tsx
│   │   ├── navigation/
│   │   │   ├── TabBar.tsx
│   │   │   ├── ScreenHeader.tsx
│   │   │   └── BackButton.tsx
│   │   └── feedback/
│   │       ├── SkeletonLoader.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       └── ToastNotification.tsx
│   ├── db/                       # SQLite layer
│   │   ├── schema.ts             # Table creation SQL
│   │   ├── migrations/
│   │   │   └── 001_initial.ts
│   │   ├── client.ts             # expo-sqlite instance singleton
│   │   └── repositories/
│   │       ├── deckRepository.ts
│   │       ├── cardRepository.ts
│   │       ├── sessionRepository.ts
│   │       ├── sessionCardRepository.ts
│   │       └── syncQueueRepository.ts
│   ├── stores/                   # Zustand stores
│   │   ├── deckStore.ts
│   │   ├── cardStore.ts
│   │   ├── sessionStore.ts
│   │   ├── userStore.ts
│   │   ├── settingsStore.ts
│   │   └── syncStore.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── useTheme.ts
│   │   ├── useDecks.ts
│   │   ├── useCards.ts
│   │   ├── useStudySession.ts
│   │   ├── useSM2.ts
│   │   ├── useXP.ts
│   │   ├── useStreak.ts
│   │   ├── useSync.ts
│   │   ├── useSearch.ts
│   │   └── useHaptics.ts
│   ├── api/                      # API client
│   │   ├── client.ts             # Typed fetch wrapper
│   │   ├── aiApi.ts              # AI generation endpoints
│   │   └── supabase.ts           # Supabase client init
│   ├── utils/                    # Pure utility functions
│   │   ├── sm2.ts                # SM-2 algorithm
│   │   ├── xp.ts                 # XP + level calculations
│   │   ├── streak.ts             # Streak logic
│   │   ├── pdf.ts                # PDF generation helpers
│   │   ├── fuzzyMatch.ts         # Typing mode comparison
│   │   ├── dateUtils.ts
│   │   └── formatters.ts
│   └── constants/
│       ├── levels.ts             # XP threshold table
│       ├── studyModes.ts
│       └── notifications.ts
├── assets/
│   ├── fonts/                    # Not needed — using expo-google-fonts
│   ├── icon.png                  # 1024x1024
│   ├── adaptive-icon.png         # Android adaptive
│   ├── splash.png                # 1284x2778
│   └── notification-icon.png    # 96x96 monochrome
├── .env                          # Local env vars (gitignored)
├── .env.example                  # Template (committed)
├── eas.json                      # EAS Build config
├── babel.config.js
├── metro.config.js
└── jest.config.js
```

### 1.4 ESLint + Prettier Configuration

```bash
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native \
  eslint-plugin-import eslint-config-prettier prettier
```

`.eslintrc.js`:
```javascript
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
      'newlines-between': 'always',
    }],
  },
  settings: { react: { version: 'detect' } },
};
```

`.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "bracketSameLine": false
}
```

### 1.5 EAS Build Configuration

`eas.json`:
```json
{
  "cli": { "version": ">= 10.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": { "simulator": true },
      "env": { "APP_ENV": "development" }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview",
      "env": { "APP_ENV": "preview" }
    },
    "production": {
      "autoIncrement": true,
      "channel": "production",
      "env": { "APP_ENV": "production" }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "YOUR_APP_STORE_CONNECT_ID",
        "appleTeamId": "YOUR_TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### 1.6 Environment Variables Strategy

`.env.example`:
```bash
# App
APP_ENV=development

# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI Proxy Backend
EXPO_PUBLIC_API_BASE_URL=https://your-proxy.railway.app

# Sentry
EXPO_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project

# PostHog
EXPO_PUBLIC_POSTHOG_KEY=your-posthog-key
```

`src/constants/env.ts`:
```typescript
import Constants from 'expo-constants';

// All env vars go through this file — never access process.env directly in components
export const ENV = {
  APP_ENV: (Constants.expoConfig?.extra?.APP_ENV ?? 'development') as 'development' | 'preview' | 'production',
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? '',
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  IS_DEV: process.env.EXPO_PUBLIC_APP_ENV === 'development',
} as const;
```

### 1.7 Git Branching Strategy

```
main          — production releases only. Protected. Requires PR + 1 review.
develop       — integration branch. All feature branches merge here.
feature/*     — individual features (e.g., feature/sm2-algorithm, feature/ai-generation)
fix/*         — bug fixes (e.g., fix/card-flip-android)
release/*     — release prep branches (e.g., release/1.0.0)
hotfix/*      — emergency production fixes that bypass develop
```

Commit message format: `type(scope): description`
Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`
Example: `feat(session): implement SM-2 algorithm with confidence rating`

---

## 2. Tech Stack Decisions

### Navigation: Expo Router v4 (file-based)

**Decision: Expo Router v4** over React Navigation.

Rationale: Expo Router wraps React Navigation but adds file-system routing (eliminating hand-wired route configs), typed routes via `expo/tsconfig.base`, deep linking automatically derived from folder structure, and URL-based navigation that mirrors web development patterns. The `typedRoutes` experiment gives compile-time route safety. For a team that will add screens iteratively across 3 phases, file-based routing reduces coordination overhead. React Navigation's manual `createNativeStackNavigator` configs become error-prone at 25+ screens.

### State Management: Zustand

**Decision: Zustand 5** over Redux Toolkit and Jotai.

Rationale: Zustand has the smallest boilerplate-to-power ratio. Redux Toolkit is excellent but overkill — its strength is normalized entity caching and complex middleware chains; this app's state is primarily local SQLite reads cached in memory, which Zustand handles with a simple `set` call. Jotai's atomic model is too granular — you end up with dozens of atoms and complex dependency graphs. Zustand slices map cleanly to domain entities (decks, cards, sessions, user, settings, sync) and integrate well with React Query-style loading patterns without requiring React Query itself.

### Local Database: expo-sqlite (not WatermelonDB)

**Decision: expo-sqlite** for Phase 1–2, evaluate WatermelonDB in Phase 3.

Rationale: expo-sqlite is a first-party Expo module with full New Architecture support in SDK 52 via the `SQLiteDatabase` API. Its async API eliminates the "main thread blocking" concern that historically made WatermelonDB appealing. WatermelonDB adds ~200KB to bundle size, requires a different query syntax, and its Expo integration has lagged SDK releases historically. For decks up to 1000 cards, expo-sqlite with proper indexing will meet the <100ms query target. WatermelonDB re-evaluation is a Phase 3 task if profiling reveals bottlenecks.

### Cloud Backend: Supabase

**Decision: Supabase** (PostgreSQL + Auth + Realtime).

Rationale: Supabase provides auth (email, Google, Apple), PostgreSQL (schema mirrors local SQLite), row-level security, and realtime subscriptions in a single managed service. Building this on raw AWS/Firebase would require separate auth, database, and sync layers. Supabase's JavaScript SDK (`@supabase/supabase-js`) works in React Native with minimal configuration. Auth tokens stored via `expo-secure-store`.

### AI Integration: Claude API via Node.js + Fastify Proxy

**Decision: Backend proxy** (never call Claude API directly from the client).

Rationale: API keys cannot be safely embedded in a mobile app (anyone with a jailbroken device can extract them). The proxy also enforces per-user rate limiting, logs usage for billing, validates AI response schemas before they reach the client, and allows prompt iteration without app releases.

### Styling: NativeWind v4

**Decision: NativeWind v4** (Tailwind CSS for React Native) over plain StyleSheet.

Rationale: NativeWind v4 compiles Tailwind classes to React Native StyleSheets at build time — there is no runtime class parsing overhead. Design tokens from BRANDING.md map naturally to a custom `tailwind.config.js`, giving a single source of truth for colors, spacing, and typography. The developer experience of `className="bg-primary text-h3"` is faster than writing `StyleSheet.create` objects for every component. NativeWind v4 (not v2/v3) supports the New Architecture and dark mode via the `dark:` prefix.

`tailwind.config.js`:
```javascript
const { lightColors, darkColors } = require('./src/theme/colors');

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: lightColors.primary,
        surface: lightColors.primarySurface,
        accent: lightColors.accent,
        'accent-strong': lightColors.accentStrong,
        'accent-subtle': lightColors.accentSubtle,
        success: lightColors.success,
        warning: lightColors.warning,
        error: lightColors.error,
        neutral: lightColors.neutral,
      },
      fontFamily: {
        sans: ['SpaceGrotesk_500Medium'],
        'sans-light': ['SpaceGrotesk_300Light'],
        'sans-bold': ['SpaceGrotesk_700Bold'],
        serif: ['SourceSerif4_400Regular'],
        'serif-semibold': ['SourceSerif4_600SemiBold'],
        mono: ['JetBrainsMono_400Regular'],
        'mono-bold': ['JetBrainsMono_700Bold'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
};
```

### Animations: React Native Reanimated 3 + Moti

**Decision: Reanimated 3** for performance-critical animations (card flip, XP bar), **Moti** for declarative component animations (skeleton shimmer, fade-ins, spring effects).

Rationale: Reanimated 3 runs animation worklets on the UI thread via JSI, achieving true 60fps independent of JS thread congestion. This is non-negotiable for the 3D card flip. Moti wraps Reanimated with a declarative API (similar to Framer Motion) that is significantly faster to write for simpler animations like the level-up modal entrance. Using both is idiomatic — Reanimated for worklets, Moti for declarative.

### PDF Generation: expo-print + expo-sharing

**Decision: expo-print** (HTML → PDF on-device) + **expo-sharing** for native share sheet.

Rationale: `react-native-html-to-pdf` requires native linking and has inconsistent maintenance. `expo-print` is a first-party module, managed workflow compatible, and renders an HTML string to PDF on-device using WebKit (iOS) and Chrome WebView (Android). Combined with `expo-sharing`, this covers all export targets: AirPrint, Android print service, Files app, share sheet. No server required.

### Audio: expo-av

**Decision: expo-av** for recording and playback.

Rationale: First-party Expo module. Handles microphone permission, recording to a temp file, and audio playback. The recorded file is uploaded to the backend proxy as a multipart form upload. No third-party dependency needed.

### Notifications: expo-notifications

**Decision: expo-notifications** (local scheduling only in Phases 1–2).

Rationale: Local notifications work fully offline, require no server infrastructure, and cover all PRD requirements (daily reminders, streak-at-risk alerts with due card counts). Push notification server infrastructure (FCM/APNS via Expo Push Service) is deferred to Phase 3 if needed.

### Icons: phosphor-react-native

**Decision: phosphor-react-native** over @expo/vector-icons.

Rationale: BRANDING.md explicitly recommends Phosphor for its duotone variant (the signature visual differentiator), 1200+ icon set, 6 weight variants, and active maintenance. @expo/vector-icons bundles multiple icon sets (increasing bundle size) and cannot produce duotone icons.

```bash
npm install phosphor-react-native
```

### Testing: Jest + RNTL + Maestro (E2E)

**Decision: Jest + React Native Testing Library** for unit/component tests, **Maestro** for E2E (over Detox).

Rationale: Maestro (by mobile.dev) has a dramatically simpler setup than Detox — no Xcode scheme configuration, no separate test runner process. Maestro uses a YAML-based flow definition that is readable by non-engineers. Detox is powerful but its configuration complexity burns 2–3 days of setup time per CI environment. Maestro achieves 90% of Detox's value in 20% of the setup time. For a 3-phase roadmap with limited E2E scope, Maestro is the correct trade-off.

---

## 3. Design Token Implementation

### 3.1 `src/theme/colors.ts`

```typescript
export const lightColors = {
  primary: '#1B2A4A',
  primarySurface: '#F7F8FB',
  primaryHover: '#142240',
  accent: '#3B82F6',
  accentStrong: '#2563EB',
  accentSubtle: '#EFF6FF',
  success: '#16A34A',
  successBg: '#F0FDF4',
  warning: '#CA8A04',
  warningBg: '#FEFCE8',
  error: '#DC2626',
  errorBg: '#FEF2F2',
  info: '#0284C7',
  infoBg: '#F0F9FF',
  confidence: {
    needsWork: '#DC2626',      // 1-3
    needsWorkBg: '#FEF2F2',
    developing: '#EA580C',     // 4-5
    developingBg: '#FFF7ED',
    solid: '#CA8A04',          // 6-7
    solidBg: '#FEFCE8',
    strong: '#16A34A',         // 8-9
    strongBg: '#F0FDF4',
    mastered: '#0D9488',       // 10
    masteredBg: '#F0FDFA',
  },
  difficulty: {
    easy: '#16A34A',
    easyBg: '#F0FDF4',
    medium: '#CA8A04',
    mediumBg: '#FEFCE8',
    hard: '#DC2626',
    hardBg: '#FEF2F2',
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
} as const;

export const darkColors = {
  primary: '#E8ECF2',
  primarySurface: '#0F1724',
  primaryHover: '#F0F3F8',
  accent: '#60A5FA',
  accentStrong: '#93BBFD',
  accentSubtle: '#1E3A5F',
  success: '#4ADE80',
  successBg: '#052E16',
  warning: '#FACC15',
  warningBg: '#422006',
  error: '#F87171',
  errorBg: '#450A0A',
  info: '#38BDF8',
  infoBg: '#0C2D48',
  confidence: {
    needsWork: '#F87171',
    needsWorkBg: '#450A0A',
    developing: '#FB923C',
    developingBg: '#431407',
    solid: '#FACC15',
    solidBg: '#422006',
    strong: '#4ADE80',
    strongBg: '#052E16',
    mastered: '#2DD4BF',
    masteredBg: '#042F2E',
  },
  difficulty: {
    easy: '#4ADE80',
    easyBg: '#052E16',
    medium: '#FACC15',
    mediumBg: '#422006',
    hard: '#F87171',
    hardBg: '#450A0A',
  },
  neutral: {
    50: '#020617',
    100: '#0F172A',
    200: '#1E293B',
    300: '#334155',
    400: '#475569',
    500: '#64748B',
    600: '#94A3B8',
    700: '#CBD5E1',
    800: '#E2E8F0',
    900: '#F1F5F9',
  },
} as const;

export type ColorScheme = typeof lightColors;
```

### 3.2 `src/theme/typography.ts`

```typescript
import { PixelRatio } from 'react-native';

const scale = (base: number): number => {
  const fontScale = PixelRatio.getFontScale();
  const clampedScale = Math.min(fontScale, 2.0);
  return Math.round(base * clampedScale);
};

export const typography = {
  display: {
    fontSize: scale(32),
    lineHeight: scale(38),
    letterSpacing: -0.5,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '700' as const,
  },
  h1: {
    fontSize: scale(26),
    lineHeight: scale(32),
    letterSpacing: -0.3,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: scale(22),
    lineHeight: scale(28),
    letterSpacing: -0.2,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: scale(18),
    lineHeight: scale(24),
    letterSpacing: 0,
    fontFamily: 'SpaceGrotesk_500Medium',
    fontWeight: '500' as const,
  },
  bodyLarge: {
    fontSize: scale(17),
    lineHeight: scale(26),
    letterSpacing: 0,
    fontFamily: 'SourceSerif4_400Regular',
    fontWeight: '400' as const,
  },
  body: {
    fontSize: scale(15),
    lineHeight: scale(23),
    letterSpacing: 0,
    fontFamily: 'SourceSerif4_400Regular',
    fontWeight: '400' as const,
  },
  bodyUI: {
    fontSize: scale(15),
    lineHeight: scale(20),
    letterSpacing: 0,
    fontFamily: 'SpaceGrotesk_500Medium',
    fontWeight: '500' as const,
  },
  caption: {
    fontSize: scale(13),
    lineHeight: scale(18),
    letterSpacing: 0.2,
    fontFamily: 'SpaceGrotesk_300Light',
    fontWeight: '300' as const,
  },
  label: {
    fontSize: scale(11),
    lineHeight: scale(14),
    letterSpacing: 0.5,
    fontFamily: 'SpaceGrotesk_500Medium',
    fontWeight: '500' as const,
  },
  mono: {
    fontSize: scale(14),
    lineHeight: scale(20),
    letterSpacing: 0,
    fontFamily: 'JetBrainsMono_400Regular',
    fontWeight: '400' as const,
  },
  monoLarge: {
    fontSize: scale(24),
    lineHeight: scale(30),
    letterSpacing: -0.5,
    fontFamily: 'JetBrainsMono_700Bold',
    fontWeight: '700' as const,
  },
} as const;

// Dark mode reduces heading weight by one step
export const darkTypographyOverrides = {
  h2: { fontFamily: 'SpaceGrotesk_500Medium', fontWeight: '500' as const },
  h3: { fontFamily: 'SpaceGrotesk_500Medium', fontWeight: '500' as const },
};

export type TypographyToken = keyof typeof typography;
```

### 3.3 `src/theme/spacing.ts`

```typescript
// 4px base grid — use ONLY these values
export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export type SpacingKey = keyof typeof spacing;
```

### 3.4 `src/theme/shadows.ts`

```typescript
import { Platform } from 'react-native';

// Light mode shadows
export const lightShadows = {
  elevation0: {},
  elevation1: Platform.select({
    ios: {
      shadowColor: '#0F1724',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
    },
    android: { elevation: 2 },
  }),
  elevation2: Platform.select({
    ios: {
      shadowColor: '#0F1724',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.10,
      shadowRadius: 8,
    },
    android: { elevation: 5 },
  }),
  elevation3: Platform.select({
    ios: {
      shadowColor: '#0F1724',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 24,
    },
    android: { elevation: 10 },
  }),
  elevation4: Platform.select({
    ios: {
      shadowColor: '#0F1724',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.18,
      shadowRadius: 48,
    },
    android: { elevation: 16 },
  }),
};

// Dark mode replaces shadows with borders + surface color elevation
export const darkShadows = {
  elevation0: { borderWidth: 1, borderColor: '#1E293B' },
  elevation1: { backgroundColor: '#0F172A', borderWidth: 1, borderColor: '#1E293B' },
  elevation2: { backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#334155' },
  elevation3: { backgroundColor: '#1E293B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  elevation4: { backgroundColor: '#334155' },
};
```

### 3.5 `src/theme/motion.ts`

```typescript
import { Easing } from 'react-native-reanimated';

export const motionDuration = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  celebration: 800,
} as const;

export const motionEasing = {
  instant: Easing.out(Easing.ease),
  fast: Easing.out(Easing.ease),
  normal: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  slow: Easing.bezier(0.16, 1, 0.3, 1.0),
  celebration: Easing.bezier(0.34, 1.56, 0.64, 1), // Spring overshoot
} as const;

export const cardFlipConfig = {
  duration: motionDuration.normal,
  easing: motionEasing.normal,
  PERSPECTIVE: 1200,
};
```

### 3.6 `src/theme/theme.ts` + `useTheme` Hook

```typescript
// src/theme/theme.ts
import { lightColors, darkColors, type ColorScheme } from './colors';
import { typography, darkTypographyOverrides } from './typography';
import { spacing } from './spacing';
import { lightShadows, darkShadows } from './shadows';
import { motionDuration, motionEasing } from './motion';

export type Theme = {
  colors: ColorScheme;
  typography: typeof typography;
  spacing: typeof spacing;
  shadows: typeof lightShadows;
  motion: { duration: typeof motionDuration; easing: typeof motionEasing };
  isDark: boolean;
};

export const createTheme = (isDark: boolean): Theme => ({
  colors: isDark ? darkColors : lightColors,
  typography: isDark
    ? { ...typography, ...darkTypographyOverrides }
    : typography,
  spacing,
  shadows: isDark ? darkShadows : lightShadows,
  motion: { duration: motionDuration, easing: motionEasing },
  isDark,
});
```

```typescript
// src/hooks/useTheme.ts
import { useColorScheme } from 'react-native';
import { useSettingsStore } from '@stores/settingsStore';
import { createTheme, type Theme } from '@theme/theme';

export const useTheme = (): Theme => {
  const systemScheme = useColorScheme();
  const { themePreference } = useSettingsStore();

  const isDark =
    themePreference === 'dark' ||
    (themePreference === 'system' && systemScheme === 'dark');

  return createTheme(isDark);
};
```

---

## 4. Navigation Architecture

### 4.1 Root Layout (`app/_layout.tsx`)

```typescript
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
  SourceSerif4_400Regular,
  SourceSerif4_600SemiBold,
} from '@expo-google-fonts/source-serif-4';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import * as SplashScreen from 'expo-splash-screen';
import { initDatabase } from '@db/client';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    SourceSerif4_400Regular,
    SourceSerif4_600SemiBold,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });

  useEffect(() => {
    void initDatabase();
  }, []);

  useEffect(() => {
    if (fontsLoaded) void SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="session" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="decks" />
      <Stack.Screen name="cards" />
      <Stack.Screen name="search" />
      <Stack.Screen name="modals/deck-create" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modals/ai-generate" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modals/card-create" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modals/settings" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modals/level-up" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
    </Stack>
  );
}
```

### 4.2 Tab Navigator (`app/(tabs)/_layout.tsx`)

```typescript
import { Tabs } from 'expo-router';
import { House, BookOpen, ClockCounterClockwise, ChartBar, User } from 'phosphor-react-native';
import { TabBar } from '@components/navigation/TabBar';
import { useTheme } from '@hooks/useTheme';

export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.neutral[400],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', tabBarIcon: ({ color, size }) => <House color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="study"
        options={{ title: 'Study', tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: 'History', tabBarIcon: ({ color, size }) => <ClockCounterClockwise color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="analytics"
        options={{ title: 'Analytics', tabBarIcon: ({ color, size }) => <ChartBar color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tabs>
  );
}
```

### 4.3 Auth Guard (`app/index.tsx`)

```typescript
import { Redirect } from 'expo-router';
import { useUserStore } from '@stores/userStore';

export default function Index() {
  const { isAuthenticated, hasCompletedOnboarding } = useUserStore();

  if (!hasCompletedOnboarding) return <Redirect href="/onboarding" />;
  return <Redirect href="/(tabs)/home" />;
}
```

### 4.4 Route Map (Complete)

| Route | Screen | Presentation |
|---|---|---|
| `/` | Auth redirect | — |
| `/onboarding` | Onboarding screen 1 | Stack |
| `/onboarding/decks` | Onboarding screen 2 | Stack push |
| `/onboarding/ai` | Onboarding screen 3 | Stack push |
| `/onboarding/gamification` | Onboarding screen 4 | Stack push |
| `/auth/sign-in` | Sign in | Stack |
| `/auth/sign-up` | Sign up | Stack push |
| `/auth/forgot-password` | Password reset | Stack push |
| `/(tabs)/home` | Home dashboard | Tab |
| `/(tabs)/study` | Study entry | Tab |
| `/(tabs)/history` | History list | Tab |
| `/(tabs)/analytics` | Analytics | Tab |
| `/(tabs)/profile` | Profile | Tab |
| `/decks/[id]` | Deck detail | Stack push |
| `/decks/[id]/edit` | Edit deck | Stack push |
| `/decks/[id]/analytics` | Deck analytics | Stack push |
| `/cards/[id]` | Card detail | Stack push |
| `/cards/[id]/edit` | Card edit | Stack push |
| `/session/[deckId]/setup` | Session setup | Stack push |
| `/session/[deckId]/study` | Study session | Stack push |
| `/session/[deckId]/summary` | Session summary | Stack (fade) |
| `/quiz/[deckId]/setup` | Quiz setup | Stack push |
| `/quiz/[deckId]/session` | Quiz session | Stack push |
| `/quiz/[deckId]/summary` | Quiz summary | Stack (fade) |
| `/history/[sessionId]` | Session detail | Stack push |
| `/search` | Global search | Stack push |
| `/pdf-preview/[deckId]` | PDF preview | Stack push |
| `/modals/deck-create` | Create deck | Modal sheet |
| `/modals/ai-generate` | AI generation | Modal sheet |
| `/modals/card-create` | Create card | Modal sheet |
| `/modals/settings` | Settings | Modal sheet |
| `/modals/level-up` | Level-up celebration | Full-screen modal |

### 4.5 Deep Linking

Deep links are derived automatically from Expo Router's file structure. Custom scheme: `recall://`.

Additional URL scheme entries in `app.json`:
```json
"intentFilters": [
  {
    "action": "VIEW",
    "data": [{ "scheme": "recall" }],
    "category": ["BROWSABLE", "DEFAULT"]
  }
]
```

Example deep links:
- `recall://decks/abc123` — Opens deck detail
- `recall://session/abc123/study` — Starts study session directly
- `recall://onboarding` — Re-opens onboarding (from settings)

---

## 5. Data Architecture

### 5.1 Full SQLite Schema

```typescript
// src/db/schema.ts
export const SCHEMA_SQL = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- Decks table
CREATE TABLE IF NOT EXISTS decks (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL CHECK(length(name) BETWEEN 1 AND 100),
  description     TEXT DEFAULT '',
  tags            TEXT DEFAULT '[]',      -- JSON array of strings
  card_count      INTEGER DEFAULT 0,
  confidence_avg  REAL DEFAULT 0.0,       -- computed, cached for display
  created_at      TEXT NOT NULL,          -- ISO 8601
  updated_at      TEXT NOT NULL,
  synced_at       TEXT,                   -- NULL = not yet synced
  is_deleted      INTEGER DEFAULT 0       -- soft delete for sync
);

CREATE INDEX IF NOT EXISTS idx_decks_updated_at ON decks(updated_at);
CREATE INDEX IF NOT EXISTS idx_decks_is_deleted ON decks(is_deleted);

-- Cards table
CREATE TABLE IF NOT EXISTS cards (
  id                TEXT PRIMARY KEY,
  deck_id           TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  question          TEXT NOT NULL,
  answer            TEXT NOT NULL,
  why_important     TEXT DEFAULT '',
  simple_example    TEXT DEFAULT '',
  use_cases         TEXT DEFAULT '[]',    -- JSON array of 3 strings
  difficulty        TEXT DEFAULT 'medium' CHECK(difficulty IN ('easy','medium','hard')),
  confidence        REAL DEFAULT 0.0,     -- 0-10, updated by SM-2
  is_favorite       INTEGER DEFAULT 0,
  tags              TEXT DEFAULT '[]',    -- JSON array
  -- SM-2 fields
  sm2_interval      INTEGER DEFAULT 0,    -- days
  sm2_ease_factor   REAL DEFAULT 2.5,
  sm2_repetitions   INTEGER DEFAULT 0,
  next_review_date  TEXT,                 -- ISO 8601 date string
  -- Metadata
  created_at        TEXT NOT NULL,
  updated_at        TEXT NOT NULL,
  synced_at         TEXT,
  is_deleted        INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_cards_deck_id ON cards(deck_id);
CREATE INDEX IF NOT EXISTS idx_cards_next_review ON cards(next_review_date) WHERE is_deleted = 0;
CREATE INDEX IF NOT EXISTS idx_cards_deck_review ON cards(deck_id, next_review_date) WHERE is_deleted = 0;
CREATE INDEX IF NOT EXISTS idx_cards_favorite ON cards(deck_id, is_favorite) WHERE is_deleted = 0;
CREATE INDEX IF NOT EXISTS idx_cards_difficulty ON cards(deck_id, difficulty) WHERE is_deleted = 0;
CREATE INDEX IF NOT EXISTS idx_cards_updated_at ON cards(updated_at);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id              TEXT PRIMARY KEY,
  deck_id         TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  mode            TEXT NOT NULL CHECK(mode IN ('flip','multiple_choice','typing','voice','quiz')),
  started_at      TEXT NOT NULL,
  ended_at        TEXT,
  card_count      INTEGER DEFAULT 0,
  avg_confidence  REAL DEFAULT 0.0,
  xp_earned       INTEGER DEFAULT 0,
  duration_secs   INTEGER DEFAULT 0,
  is_quiz         INTEGER DEFAULT 0,      -- 1 = quiz mode (does not affect SM-2)
  synced_at       TEXT
);

CREATE INDEX IF NOT EXISTS idx_sessions_deck_id ON sessions(deck_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON sessions(started_at DESC);

-- Session cards (per-card result within a session)
CREATE TABLE IF NOT EXISTS session_cards (
  id              TEXT PRIMARY KEY,
  session_id      TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  card_id         TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  confidence_given INTEGER NOT NULL CHECK(confidence_given BETWEEN 1 AND 10),
  prev_confidence  REAL DEFAULT 0.0,
  time_spent_secs  INTEGER DEFAULT 0,
  reviewed_at      TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_session_cards_session ON session_cards(session_id);
CREATE INDEX IF NOT EXISTS idx_session_cards_card ON session_cards(card_id);

-- User profile (single row)
CREATE TABLE IF NOT EXISTS user_profile (
  id              TEXT PRIMARY KEY DEFAULT 'local',
  supabase_id     TEXT,
  email           TEXT,
  display_name    TEXT,
  total_xp        INTEGER DEFAULT 0,
  level           INTEGER DEFAULT 1,
  streak_count    INTEGER DEFAULT 0,
  last_study_date TEXT,                   -- ISO 8601 date (YYYY-MM-DD)
  streak_freeze_available INTEGER DEFAULT 0,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);

-- Settings (single row)
CREATE TABLE IF NOT EXISTS settings (
  id                      TEXT PRIMARY KEY DEFAULT 'local',
  theme_preference        TEXT DEFAULT 'system' CHECK(theme_preference IN ('light','dark','system')),
  notifications_enabled   INTEGER DEFAULT 1,
  reminder_times          TEXT DEFAULT '["09:00"]',  -- JSON array of HH:MM strings
  study_daily_limit       INTEGER DEFAULT 0,          -- 0 = unlimited
  has_completed_onboarding INTEGER DEFAULT 0,
  subscription_tier       TEXT DEFAULT 'guest' CHECK(subscription_tier IN ('guest','free','premium')),
  updated_at              TEXT NOT NULL
);

-- Sync queue (offline changes pending sync)
CREATE TABLE IF NOT EXISTS sync_queue (
  id              TEXT PRIMARY KEY,
  entity_type     TEXT NOT NULL CHECK(entity_type IN ('deck','card','session','user_profile')),
  entity_id       TEXT NOT NULL,
  operation       TEXT NOT NULL CHECK(operation IN ('create','update','delete')),
  payload         TEXT NOT NULL,          -- JSON of changed fields
  created_at      TEXT NOT NULL,
  retry_count     INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_sync_queue_created ON sync_queue(created_at ASC);
`;
```

### 5.2 Database Client (`src/db/client.ts`)

```typescript
import * as SQLite from 'expo-sqlite';
import { SCHEMA_SQL } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!db) throw new Error('Database not initialized. Call initDatabase() first.');
  return db;
};

export const initDatabase = async (): Promise<void> => {
  db = await SQLite.openDatabaseAsync('recall.db');
  await db.execAsync(SCHEMA_SQL);
};
```

### 5.3 Repository Pattern

Each repository wraps raw SQL into typed async functions. Example — `src/db/repositories/cardRepository.ts`:

```typescript
import { getDatabase } from '../client';
import type { Card } from '@types/card';
import { generateId } from '@utils/dateUtils';

export const cardRepository = {
  async findDueCards(deckId: string, limit = 100): Promise<Card[]> {
    const db = getDatabase();
    const today = new Date().toISOString().split('T')[0];
    return db.getAllAsync<Card>(
      `SELECT * FROM cards
       WHERE deck_id = ? AND is_deleted = 0
         AND (next_review_date IS NULL OR next_review_date <= ?)
       ORDER BY
         CASE WHEN next_review_date IS NULL THEN 0 ELSE 1 END,
         next_review_date ASC,
         confidence ASC
       LIMIT ?`,
      [deckId, today, limit]
    );
  },

  async findByDeck(deckId: string): Promise<Card[]> {
    const db = getDatabase();
    return db.getAllAsync<Card>(
      'SELECT * FROM cards WHERE deck_id = ? AND is_deleted = 0 ORDER BY created_at ASC',
      [deckId]
    );
  },

  async upsert(card: Card): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT OR REPLACE INTO cards
       (id, deck_id, question, answer, why_important, simple_example, use_cases,
        difficulty, confidence, is_favorite, tags, sm2_interval, sm2_ease_factor,
        sm2_repetitions, next_review_date, created_at, updated_at, is_deleted)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        card.id, card.deck_id, card.question, card.answer,
        card.why_important, card.simple_example,
        JSON.stringify(card.use_cases), card.difficulty,
        card.confidence, card.is_favorite ? 1 : 0,
        JSON.stringify(card.tags), card.sm2_interval,
        card.sm2_ease_factor, card.sm2_repetitions,
        card.next_review_date ?? null, card.created_at,
        card.updated_at, card.is_deleted ? 1 : 0,
      ]
    );
  },

  async updateSM2(cardId: string, update: {
    sm2_interval: number;
    sm2_ease_factor: number;
    sm2_repetitions: number;
    next_review_date: string;
    confidence: number;
    updated_at: string;
  }): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE cards SET
        sm2_interval = ?, sm2_ease_factor = ?, sm2_repetitions = ?,
        next_review_date = ?, confidence = ?, updated_at = ?
       WHERE id = ?`,
      [
        update.sm2_interval, update.sm2_ease_factor, update.sm2_repetitions,
        update.next_review_date, update.confidence, update.updated_at, cardId,
      ]
    );
  },

  async softDelete(cardId: string): Promise<void> {
    const db = getDatabase();
    const now = new Date().toISOString();
    await db.runAsync(
      'UPDATE cards SET is_deleted = 1, updated_at = ? WHERE id = ?',
      [now, cardId]
    );
  },

  async search(query: string): Promise<Array<Card & { deck_name: string }>> {
    const db = getDatabase();
    const like = `%${query}%`;
    return db.getAllAsync(
      `SELECT c.*, d.name AS deck_name FROM cards c
       JOIN decks d ON d.id = c.deck_id
       WHERE c.is_deleted = 0 AND d.is_deleted = 0
         AND (c.question LIKE ? OR c.answer LIKE ?
              OR c.why_important LIKE ? OR c.simple_example LIKE ?)
       LIMIT 100`,
      [like, like, like, like]
    );
  },
};
```

### 5.4 Zustand Store Slices

```typescript
// src/stores/deckStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Deck } from '@types/deck';
import { deckRepository } from '@db/repositories/deckRepository';

type DeckState = {
  decks: Deck[];
  isLoading: boolean;
  error: string | null;
  loadDecks: () => Promise<void>;
  createDeck: (data: Omit<Deck, 'id' | 'created_at' | 'updated_at'>) => Promise<Deck>;
  updateDeck: (id: string, data: Partial<Deck>) => Promise<void>;
  deleteDeck: (id: string) => Promise<void>;
  getDeckById: (id: string) => Deck | undefined;
};

export const useDeckStore = create<DeckState>()(
  immer((set, get) => ({
    decks: [],
    isLoading: false,
    error: null,

    loadDecks: async () => {
      set((s) => { s.isLoading = true; });
      try {
        const decks = await deckRepository.findAll();
        set((s) => { s.decks = decks; s.isLoading = false; });
      } catch (e) {
        set((s) => { s.error = String(e); s.isLoading = false; });
      }
    },

    createDeck: async (data) => {
      const deck = await deckRepository.create(data);
      set((s) => { s.decks.unshift(deck); });
      return deck;
    },

    updateDeck: async (id, data) => {
      await deckRepository.update(id, data);
      set((s) => {
        const idx = s.decks.findIndex((d) => d.id === id);
        if (idx !== -1) Object.assign(s.decks[idx]!, data);
      });
    },

    deleteDeck: async (id) => {
      await deckRepository.softDelete(id);
      set((s) => { s.decks = s.decks.filter((d) => d.id !== id); });
    },

    getDeckById: (id) => get().decks.find((d) => d.id === id),
  }))
);
```

```typescript
// src/stores/sessionStore.ts — tracks the in-progress study session
import { create } from 'zustand';
import type { Card } from '@types/card';
import type { StudyMode } from '@types/session';

type SessionCard = {
  card: Card;
  confidenceGiven?: number;
  timeSpentSecs?: number;
};

type SessionState = {
  deckId: string | null;
  mode: StudyMode | null;
  queue: SessionCard[];
  currentIndex: number;
  startedAt: Date | null;
  isComplete: boolean;
  // Actions
  startSession: (deckId: string, mode: StudyMode, cards: Card[]) => void;
  recordRating: (cardId: string, confidence: number, timeSecs: number) => void;
  advance: () => void;
  completeSession: () => void;
  resetSession: () => void;
  // Computed
  currentCard: () => SessionCard | null;
  totalXPEarned: () => number;
  avgConfidence: () => number;
};

export const useSessionStore = create<SessionState>()((set, get) => ({
  deckId: null,
  mode: null,
  queue: [],
  currentIndex: 0,
  startedAt: null,
  isComplete: false,

  startSession: (deckId, mode, cards) => set({
    deckId,
    mode,
    queue: cards.map((card) => ({ card })),
    currentIndex: 0,
    startedAt: new Date(),
    isComplete: false,
  }),

  recordRating: (cardId, confidence, timeSecs) =>
    set((s) => {
      const item = s.queue.find((q) => q.card.id === cardId);
      if (item) {
        item.confidenceGiven = confidence;
        item.timeSpentSecs = timeSecs;
      }
    }),

  advance: () =>
    set((s) => ({
      currentIndex: Math.min(s.currentIndex + 1, s.queue.length - 1),
    })),

  completeSession: () => set({ isComplete: true }),
  resetSession: () => set({ deckId: null, mode: null, queue: [], currentIndex: 0, startedAt: null, isComplete: false }),

  currentCard: () => {
    const s = get();
    return s.queue[s.currentIndex] ?? null;
  },

  totalXPEarned: () => {
    const s = get();
    const cards = s.queue.filter((q) => q.confidenceGiven !== undefined);
    let xp = 50 + cards.length * 5;
    xp += cards.filter((q) => (q.confidenceGiven ?? 0) >= 8).length * 2;
    return xp;
  },

  avgConfidence: () => {
    const s = get();
    const rated = s.queue.filter((q) => q.confidenceGiven !== undefined);
    if (rated.length === 0) return 0;
    return rated.reduce((sum, q) => sum + (q.confidenceGiven ?? 0), 0) / rated.length;
  },
}));
```

### 5.5 TypeScript Entity Types

```typescript
// src/types/card.ts
export type Difficulty = 'easy' | 'medium' | 'hard';
export type StudyMode = 'flip' | 'multiple_choice' | 'typing' | 'voice' | 'quiz';

export type Card = {
  id: string;
  deck_id: string;
  question: string;
  answer: string;
  why_important: string;
  simple_example: string;
  use_cases: string[];      // Stored as JSON in SQLite
  difficulty: Difficulty;
  confidence: number;       // 0-10
  is_favorite: boolean;
  tags: string[];
  sm2_interval: number;
  sm2_ease_factor: number;
  sm2_repetitions: number;
  next_review_date: string | null;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  is_deleted: boolean;
};

// src/types/deck.ts
export type Deck = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  card_count: number;
  confidence_avg: number;   // 0-10, cached
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  is_deleted: boolean;
};

// src/types/session.ts
export type Session = {
  id: string;
  deck_id: string;
  mode: StudyMode;
  started_at: string;
  ended_at: string | null;
  card_count: number;
  avg_confidence: number;
  xp_earned: number;
  duration_secs: number;
  is_quiz: boolean;
  synced_at: string | null;
};

export type SessionCard = {
  id: string;
  session_id: string;
  card_id: string;
  confidence_given: number;
  prev_confidence: number;
  time_spent_secs: number;
  reviewed_at: string;
};
```

### 5.6 Sync Queue Architecture

```typescript
// src/db/repositories/syncQueueRepository.ts
import { getDatabase } from '../client';
import { generateId } from '@utils/dateUtils';

export type SyncOperation = 'create' | 'update' | 'delete';
export type SyncEntityType = 'deck' | 'card' | 'session' | 'user_profile';

export const syncQueueRepository = {
  async enqueue(
    entityType: SyncEntityType,
    entityId: string,
    operation: SyncOperation,
    payload: Record<string, unknown>
  ): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT OR REPLACE INTO sync_queue (id, entity_type, entity_id, operation, payload, created_at)
       VALUES (?,?,?,?,?,?)`,
      [generateId(), entityType, entityId, operation, JSON.stringify(payload), new Date().toISOString()]
    );
  },

  async getPending(limit = 50): Promise<Array<{
    id: string;
    entity_type: SyncEntityType;
    entity_id: string;
    operation: SyncOperation;
    payload: Record<string, unknown>;
  }>> {
    const db = getDatabase();
    const rows = await db.getAllAsync<{
      id: string; entity_type: string; entity_id: string;
      operation: string; payload: string;
    }>(
      'SELECT * FROM sync_queue ORDER BY created_at ASC LIMIT ?',
      [limit]
    );
    return rows.map((r) => ({
      ...r,
      entity_type: r.entity_type as SyncEntityType,
      operation: r.operation as SyncOperation,
      payload: JSON.parse(r.payload) as Record<string, unknown>,
    }));
  },

  async markCompleted(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync('DELETE FROM sync_queue WHERE id = ?', [id]);
  },

  async incrementRetry(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      'UPDATE sync_queue SET retry_count = retry_count + 1 WHERE id = ?',
      [id]
    );
  },
};
```

Sync flow (in `src/stores/syncStore.ts`):
1. On any write (create/update/delete), call `syncQueueRepository.enqueue()` inside the repository.
2. `useSync` hook subscribes to `NetInfo.isConnected` from `@react-native-community/netinfo`.
3. When connectivity is restored, process the sync queue sequentially.
4. Supabase upsert uses `updated_at` for last-write-wins conflict resolution.
5. Failed items increment `retry_count`; items with `retry_count > 5` are logged and discarded.

### 5.7 Supabase Schema

The Supabase PostgreSQL schema mirrors SQLite exactly, with these additions:

```sql
-- Enable Row Level Security on all tables
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policy: users can only access their own data
CREATE POLICY "user_owns_deck" ON decks
  USING (auth.uid()::text = user_id);

-- Add user_id column to all tables (not needed in local SQLite)
ALTER TABLE decks ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE cards ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE sessions ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Indexes for sync queries
CREATE INDEX idx_decks_user_updated ON decks(user_id, updated_at);
CREATE INDEX idx_cards_user_updated ON cards(user_id, updated_at);
```
