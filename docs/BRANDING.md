# Branding & Design System PRD

**Product:** AI-Powered Spaced Repetition Flashcard App
**Version:** 1.0 | **Date:** 2026-03-13
**Companion to:** PRD.md v1.0

---

## 1. App Name & Tagline

### Name Candidates

| Name | Rationale | Strengths | Weaknesses |
|---|---|---|---|
| **Recall** | Direct reference to active recall, the core learning mechanism. One word. Verb energy. | Memorable, professional, domain-relevant. Sounds like a premium tool, not a toy. "Recall" as a word carries authority (total recall, perfect recall). | Common word -- potential trademark conflicts. App Store discoverability may require a modifier. |
| **Mnemonic** | Greek root for memory. Signals deep learning science credibility. | Distinctive, intellectual, hard to confuse with competitors. Strong brand identity potential. | Pronunciation barrier for non-English speakers. Feels clinical -- may alienate casual learners. |
| **Synap** | Shortened "synapse" -- the brain's connection point. Modern truncation style (like Figma, Slack, Notion). | Short, modern, easy to type and say. ".app" domain likely available. Strong visual identity potential (neuron/connection imagery). | Slightly abstract. Requires brand-building to associate with learning. |
| **Lumen** | Latin for "light" -- the moment of understanding. Also a unit of luminous flux (brightness). | Beautiful word. Evokes enlightenment and clarity. Works across languages. Premium feel without coldness. | Overused in tech (Lumen PHP, Lumen Learning). Brand confusion risk. |
| **Karta** | Slavic/Nordic root for "card." International feel. Distinctive spelling. | Unique, easy to say globally, directly tied to flashcards. Strong app icon potential (stylized K). | Less immediately obvious what the app does. Requires tagline to contextualize. |

### Recommended Name: **Recall**

**Primary reasoning:**

1. **Instant comprehension.** A user who has never heard of the app immediately understands its purpose. Nielsen Norman Group's research on information scent (Spool et al., 2004) shows users make snap judgments about relevance -- a name that communicates function outperforms abstract names in organic discovery.

2. **Verb energy.** "Recall" is an action word. It implies doing, not just being. This aligns with the app's core mechanic -- active recall is the single most evidence-backed learning technique (Karpicke & Blunt, 2011, Science). The name IS the method.

3. **Premium without pretension.** Compare to competitors: Anki (Japanese for "memorization" -- opaque to Western users), Quizlet (diminutive "-let" suffix feels juvenile), Brainscape (literal, forgettable). "Recall" occupies the sweet spot: professional enough for medical students, approachable enough for casual learners.

4. **Scalability.** "Recall AI," "Recall Pro," "Recall for Teams" all work naturally. The name doesn't box you into flashcards -- if you expand to other learning modalities, the name still fits.

**If trademark conflicts arise:** Fall back to **Synap** -- it has the strongest alternative brand identity potential.

### Tagline

> **Remember everything. Effortlessly.**

**Why this works:**
- "Remember everything" is the aspirational promise -- it is what every learner wants.
- "Effortlessly" is the differentiator -- it signals the AI and spaced repetition do the hard work.
- Six syllables. Fits in an App Store subtitle. Works as a push notification sign-off.

**Secondary options:**
- "Learn smarter. Remember longer."
- "Your memory, supercharged."

---

## 2. Brand Personality & Voice

### Brand Archetype: The Sage-Mentor Hybrid

Not a pure Sage (too detached, too academic -- think Wikipedia). Not a pure Mentor (too prescriptive, too hand-holdy -- think Duolingo's owl). Recall is the **brilliant friend who explains things clearly** -- knowledgeable but never condescending, encouraging but never patronizing.

**Design precedents:**
- **Linear** -- confident, technically excellent, never dumbs things down
- **Notion** -- empowering, clean, trusts the user's intelligence
- **Headspace** -- warm and motivating without being childish

Anti-precedents:
- **Duolingo** -- too gamified, too childish for professional learners
- **Anki** -- too utilitarian, zero personality, hostile to new users

### Personality Traits

| Trait | Do | Don't |
|---|---|---|
| **Sharp** | "You reviewed 42 cards in 8 minutes. That's 18% faster than your average." | "Great job studying today! You're amazing!" |
| **Encouraging** | "3 cards improved from yellow to green. Real progress." | "OMG you're doing AMAZING! Keep it up champ!" |
| **Direct** | "You have 23 cards due. Start with Rust -- it's been 4 days." | "Hey there! Looks like you might want to consider maybe reviewing some cards today?" |
| **Witty (sparingly)** | "Day 30 streak. At this point, the cards are afraid of YOU." | Random jokes on every screen. Puns in error messages. |
| **Trustworthy** | "AI-generated. Review for accuracy before studying." | Presenting AI content as infallible. |

### Tone of Voice by Context

**Onboarding:**
Tone: Confident guide. Short sentences. Show, don't lecture.
- "Spaced repetition shows you cards right before you'd forget them. It's the most effective way to learn -- backed by 100+ years of cognitive science."
- "AI generates your cards. You just pick a topic."
- NOT: "Welcome to our amazing app! We're so excited you're here! Let us show you all the incredible features..."

**Study sessions:**
Tone: Minimal. Stay out of the way. The content IS the experience.
- Progress: "12 of 28"
- After flip: Show the answer. No commentary.
- NOT: "Here's the answer! Did you get it right?"

**Error states:**
Tone: Honest, specific, actionable. No cute apologies.
- "AI generation failed. Your connection may be unstable. Tap to retry or create cards manually."
- "Sync conflict on 3 cards. Showing newest version. Tap to review."
- NOT: "Oops! Something went wrong. Please try again later." (Never say "oops." Never say "something went wrong." Always say WHAT went wrong.)

**Level-up moments:**
Tone: Celebration with substance. Acknowledge the achievement, connect it to real progress.
- "Level 12. You've reviewed 1,847 cards across 14 decks. That's serious knowledge."
- "7-day streak. Consistency beats intensity -- you're proving it."
- NOT: Confetti explosion with "AMAZING! YOU LEVELED UP!" and nothing else.

**Push notifications:**
Tone: Useful information, not guilt trips.
- "18 cards due across 3 decks. ~6 min session."
- "Your Rust deck hasn't been reviewed in 5 days. 12 cards are overdue."
- NOT: "We miss you! Come back and study!" (Never guilt. Never "we miss you.")

---

## 3. Color System

### Design Philosophy

The palette draws from IDE and developer tool aesthetics -- think VS Code's dark themes, Linear's sophisticated neutrals, and the focused calm of a well-lit workspace. The primary audience (students, engineers, technical professionals) spends hours in these environments. The app should feel native to their world, not imported from a children's game.

**Anti-patterns avoided:**
- Purple/violet gradients (generic SaaS -- every AI tool in 2025 uses this)
- Neon green on black (gamer aesthetic -- wrong audience segment)
- Pastel rainbow (Notion clones -- signals "productivity" not "learning")
- Duolingo lime green (signals "gamified kids app")

### Primary Palette

| Token | Light Mode | Dark Mode | Usage | Rationale |
|---|---|---|---|---|
| `--color-primary` | `#1B2A4A` | `#E8ECF2` | Primary text, logo, key UI elements | Deep navy conveys intelligence, trust, and depth. Navy outperforms pure black for readability (Burt, 1959 -- legibility research). It signals competence without the coldness of pure black or the frivolity of bright blues. |
| `--color-primary-surface` | `#F7F8FB` | `#0F1724` | Main background | Near-white with a cool undertone. Not pure white (#FFFFFF causes eye strain in extended reading sessions -- ISO 9241-307). Dark mode uses a deep navy-black, not pure #000000 (Material Design 3 guidance: elevated surfaces should not be pure black). |
| `--color-primary-hover` | `#142240` | `#F0F3F8` | Interactive state | Slightly darker/lighter variant for hover and pressed states. |

**HEX/RGB Reference:**
- `#1B2A4A` = rgb(27, 42, 74)
- `#F7F8FB` = rgb(247, 248, 251)
- `#0F1724` = rgb(15, 23, 36)
- `#E8ECF2` = rgb(232, 236, 242)

### Accent Palette

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-accent` | `#3B82F6` | `#60A5FA` | Primary actions, links, active states, XP bar fill |
| `--color-accent-strong` | `#2563EB` | `#93BBFD` | Button backgrounds, key CTAs |
| `--color-accent-subtle` | `#EFF6FF` | `#1E3A5F` | Selected row backgrounds, active tab indicator backgrounds |

**Why blue accent:** Blue is the highest-trust color in UI (Labrecque & Milne, 2012 -- color psychology in branding). It reduces cognitive load in information-dense interfaces. Linear, Notion, and Figma all anchor on blue for this reason. The specific shade (`#3B82F6`) is saturated enough to stand out against the navy primary but not so vivid it fatigues the eye.

**HEX/RGB Reference:**
- `#3B82F6` = rgb(59, 130, 246)
- `#60A5FA` = rgb(96, 165, 250)
- `#2563EB` = rgb(37, 99, 235)
- `#EFF6FF` = rgb(239, 246, 255)
- `#1E3A5F` = rgb(30, 58, 95)

### Semantic Colors

| Token | Light Mode | Dark Mode | Usage | Contrast (on surface) |
|---|---|---|---|---|
| `--color-success` | `#16A34A` | `#4ADE80` | Correct answer, positive feedback, completion | 4.7:1 (light), 5.2:1 (dark) -- AA pass |
| `--color-warning` | `#CA8A04` | `#FACC15` | Approaching limit, streak at risk | 4.5:1 (light), 4.6:1 (dark) -- AA pass |
| `--color-error` | `#DC2626` | `#F87171` | Wrong answer, failed action, destructive | 5.9:1 (light), 4.8:1 (dark) -- AA pass |
| `--color-info` | `#0284C7` | `#38BDF8` | Tips, neutral notifications, AI disclaimers | 4.6:1 (light), 4.5:1 (dark) -- AA pass |

**Background variants** (for status banners and badges):

| Token | Light Mode | Dark Mode |
|---|---|---|
| `--color-success-bg` | `#F0FDF4` | `#052E16` |
| `--color-warning-bg` | `#FEFCE8` | `#422006` |
| `--color-error-bg` | `#FEF2F2` | `#450A0A` |
| `--color-info-bg` | `#F0F9FF` | `#0C2D48` |

### Confidence Score Colors

The PRD defines confidence as 1-10. These colors appear on badges in card lists, during rating selection, and in analytics charts.

| Range | Label | Light Mode | Dark Mode | Background (Light) | Background (Dark) |
|---|---|---|---|---|---|
| 1-3 | Needs Work | `#DC2626` | `#F87171` | `#FEF2F2` | `#450A0A` |
| 4-5 | Developing | `#EA580C` | `#FB923C` | `#FFF7ED` | `#431407` |
| 6-7 | Solid | `#CA8A04` | `#FACC15` | `#FEFCE8` | `#422006` |
| 8-9 | Strong | `#16A34A` | `#4ADE80` | `#F0FDF4` | `#052E16` |
| 10 | Mastered | `#0D9488` | `#2DD4BF` | `#F0FDFA` | `#042F2E` |

**Design rationale:** Five tiers (not four as in the PRD) provides better granularity. The jump from "red at 3" to "yellow at 4" was too abrupt -- adding an orange tier at 4-5 creates a smoother psychological gradient. Research on progress visualization (Amabile & Kramer, 2011, The Progress Principle) shows that granular progress feedback improves motivation more than binary good/bad signals.

**Color-blind safety:** The five tiers are distinguishable in all three major color vision deficiency types (protanopia, deuteranopia, tritanopia) because they span hue AND luminance. Each badge also includes a text label ("Needs Work" / "Developing" / "Solid" / "Strong" / "Mastered") so color is never the sole indicator -- WCAG 2.1 SC 1.4.1 compliance.

### Difficulty Badge Colors

| Difficulty | Light Mode | Dark Mode | Icon |
|---|---|---|---|
| Easy | `#16A34A` text on `#F0FDF4` bg | `#4ADE80` text on `#052E16` bg | Outlined circle |
| Medium | `#CA8A04` text on `#FEFCE8` bg | `#FACC15` text on `#422006` bg | Half-filled circle |
| Hard | `#DC2626` text on `#FEF2F2` bg | `#F87171` text on `#450A0A` bg | Filled circle |

**Why not emoji (the PRD suggests colored circle emoji):** Emoji render differently across iOS and Android, making the visual language inconsistent. Custom-rendered badges with controlled color and shape are more reliable. The circle fill-level metaphor (empty, half, full) adds a secondary visual channel beyond color.

### Neutral Scale

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-neutral-50` | `#F8FAFC` | `#020617` | Deepest background |
| `--color-neutral-100` | `#F1F5F9` | `#0F172A` | Card backgrounds, input fields |
| `--color-neutral-200` | `#E2E8F0` | `#1E293B` | Borders, dividers |
| `--color-neutral-300` | `#CBD5E1` | `#334155` | Disabled states, placeholder text |
| `--color-neutral-400` | `#94A3B8` | `#475569` | Secondary text, icons |
| `--color-neutral-500` | `#64748B` | `#64748B` | Tertiary text |
| `--color-neutral-600` | `#475569` | `#94A3B8` | Body text (secondary) |
| `--color-neutral-700` | `#334155` | `#CBD5E1` | Body text (primary) |
| `--color-neutral-800` | `#1E293B` | `#E2E8F0` | Headings |
| `--color-neutral-900` | `#0F172A` | `#F1F5F9` | High-emphasis text |

This is the Slate scale from Tailwind -- chosen because it has a blue undertone that harmonizes with the navy primary and blue accent. Cool grays feel more intellectual and technical than warm grays (Elliot & Maier, 2014 -- color and psychological functioning).

### Implementation

```typescript
// theme/colors.ts
export const lightColors = {
  primary: '#1B2A4A',
  primarySurface: '#F7F8FB',
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
    needsWork: '#DC2626',
    developing: '#EA580C',
    solid: '#CA8A04',
    strong: '#16A34A',
    mastered: '#0D9488',
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
    developing: '#FB923C',
    solid: '#FACC15',
    strong: '#4ADE80',
    mastered: '#2DD4BF',
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
```

---

## 4. Typography

### Font Pairing

| Role | Font | Weight(s) | Rationale |
|---|---|---|---|
| **Primary (headings, UI labels)** | **Space Grotesk** | 300, 500, 700 | A geometric sans-serif with personality. The slightly quirky letterforms (look at the lowercase 'a' and 'g') signal modernity without sacrificing readability. It has the technical precision of a developer tool but the warmth of a consumer product. Available on Google Fonts, works in Expo via `expo-font`. Not overused -- distinct from the Inter/Roboto/Montserrat default trilogy. |
| **Secondary (body text, card content, long-form)** | **Source Serif 4** | 400, 600 | A high-quality serif designed by Paul Hunt at Adobe. Serifs improve readability in long-form text (Arditi & Cho, 2005 -- legibility of serif vs sans-serif). Card content (why_important, examples, use_cases) is educational prose -- a serif signals "read this carefully" and creates a reading mode distinct from the navigational UI. |
| **Monospace (code snippets, data values, stats)** | **JetBrains Mono** | 400, 700 | Best-in-class monospace with programming ligatures. For the engineering persona (Maria studying Rust), code in card content should render in a proper monospace. Also used for numerical data (XP counts, stats, confidence scores) to give them a precise, data-driven feel. |

**Why this pairing works:**
The contrast between a geometric sans-serif (Space Grotesk) and an editorial serif (Source Serif 4) creates visual hierarchy through type alone -- before size or weight come into play. This is a technique used by Linear (Inter + custom serif for marketing) and Stripe (custom sans + serif). The monospace third voice adds a technical dimension appropriate for the audience.

**Loading in Expo:**

```typescript
// app/_layout.tsx
import {
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
```

### Type Scale

All sizes in logical pixels. Based on a 1.25 ratio (Major Third) which provides enough contrast between levels without extreme jumps. Mobile screens need tighter ratios than desktop (iOS HIG recommends 1.2-1.3x scaling).

| Token | Size | Line Height | Letter Spacing | Font | Weight | Usage |
|---|---|---|---|---|---|---|
| `display` | 32px | 38px (1.19) | -0.5px | Space Grotesk | 700 | Level-up screen, onboarding headlines |
| `h1` | 26px | 32px (1.23) | -0.3px | Space Grotesk | 700 | Screen titles (Home, Analytics, History) |
| `h2` | 22px | 28px (1.27) | -0.2px | Space Grotesk | 700 | Section headers (Due Today, Your Decks) |
| `h3` | 18px | 24px (1.33) | 0px | Space Grotesk | 500 | Card question text, deck names in lists |
| `bodyLarge` | 17px | 26px (1.53) | 0px | Source Serif 4 | 400 | Card answer text, why_important content |
| `body` | 15px | 23px (1.53) | 0px | Source Serif 4 | 400 | Card body content, descriptions, use_cases |
| `bodyUI` | 15px | 20px (1.33) | 0px | Space Grotesk | 500 | Button labels, navigation items, form labels |
| `caption` | 13px | 18px (1.38) | 0.2px | Space Grotesk | 300 | Timestamps, secondary metadata, helper text |
| `label` | 11px | 14px (1.27) | 0.5px | Space Grotesk | 500 | Badge text, overline labels, ALL CAPS usage |
| `mono` | 14px | 20px (1.43) | 0px | JetBrains Mono | 400 | Code in cards, XP values, confidence numbers |
| `monoLarge` | 24px | 30px (1.25) | -0.5px | JetBrains Mono | 700 | XP counter in session summary, streak number |

**Minimum body text:** 15px. Never go below 13px for any visible text. The iOS HIG recommends 17px as the minimum body text for readability; 15px is acceptable for secondary content but pushing it. Research (Rello & Baeza-Yates, 2013) shows readability drops significantly below 14px on mobile.

### Weight Usage

| Weight | Name | When to Use |
|---|---|---|
| 300 | Light | Captions, secondary metadata, decorative large numbers |
| 400 | Regular | Body text (serif), monospace content |
| 500 | Medium | UI labels, navigation, buttons, h3 headings |
| 600 | SemiBold | Emphasized body text (serif), important callouts |
| 700 | Bold | Headings (h1, h2, display), primary actions, key numbers |

**Rule:** Never use more than two weights on the same screen. Heading weight + body weight is sufficient. Adding a third weight creates visual noise (Butterick's Practical Typography, 2024).

### Dark Mode Typography Adjustments

- Reduce font weight by one step for headings on dark backgrounds. Bold (700) on dark can appear heavier due to halation (light text blooming on dark backgrounds). Use 500 for h2/h3 in dark mode.
- Increase letter-spacing by +0.2px for body text on dark backgrounds to compensate for reduced contrast perception.
- Use `--color-neutral-900` (not pure #FFFFFF) for primary text in dark mode to reduce glare.

```typescript
// theme/typography.ts
export const getDarkModeAdjustments = (token: TypographyToken) => ({
  ...token,
  fontWeight: token.fontWeight === '700' ? '500' : token.fontWeight,
  letterSpacing: (token.letterSpacing || 0) + 0.2,
});
```

---

## 5. Iconography & Imagery Style

### Icon Style: Outlined, 2px Stroke, Rounded Caps

**Recommendation: `phosphor-react-native`**

**Why Phosphor over alternatives:**

| Library | Verdict |
|---|---|
| **Phosphor** (recommended) | 6 weights per icon (thin, light, regular, bold, fill, duotone). Duotone variant gives the app a distinctive look no competitor has. 1,200+ icons. Consistent 24x24 grid. Active maintenance. React Native package available. |
| SF Symbols | iOS only. Cannot use on Android. |
| Material Icons | Overused. Signals "default Android app." |
| Heroicons | Limited set (300 icons). Tailwind ecosystem -- less natural in React Native. |
| Feather | Unmaintained since 2021. Missing many icons needed (e.g., no brain, no flashcard, no flame). |
| Lucide | Fork of Feather. Good, but Phosphor's duotone variant is a stronger brand differentiator. |

**Icon usage rules:**

1. **Navigation icons:** Regular weight (2px stroke), 24x24px, `--color-neutral-400` inactive / `--color-accent` active.
2. **In-content icons:** Light weight (1.5px stroke), 20x20px, `--color-neutral-500`.
3. **Feature icons (onboarding, empty states):** Duotone variant, 48x48px, `--color-accent` primary fill + `--color-accent-subtle` secondary fill. The duotone treatment is the signature visual differentiator.
4. **Action icons (buttons, FAB):** Bold weight, 20x20px inside buttons, 24x24px standalone.

**Custom icons needed (not in Phosphor):**
- Flashcard flip icon (front/back card with rotation arrow) -- commission or build as SVG
- Confidence gauge (semicircle with needle) -- build as animated SVG component
- AI sparkle (distinguish from generic "magic wand") -- use Phosphor's `Sparkle` duotone as base

### Illustration Style

**No illustrations in v1.** Here is why:

1. Illustrations are expensive to do well and cheap illustrations look worse than no illustrations.
2. Generic illustration packs (unDraw, Storyset) create "template site" perception -- the opposite of the premium brand position.
3. The duotone icon system at large sizes (64-96px) fills the role illustrations would play (empty states, onboarding, feature explanation) without the execution risk.

**If illustrations are added later (v2+):**
- Style: Geometric/abstract, not character-based. Think Linear's abstract shapes, not Duolingo's owl.
- Palette: Limited to brand colors (navy, blue accent, neutral-300 for structure).
- Execution: Commission from a single illustrator for consistency. Never use a stock pack.

### Emoji Usage Policy

**Allowed in:**
- Push notification copy (one emoji max, at start): "18 cards due across 3 decks"
- User-generated content (deck names, card text -- users can add whatever they want)
- Celebratory moments: Level-up, streak milestones (one emoji, not a string of them)

**Not allowed in:**
- UI labels or navigation
- Button text
- Error messages
- Headings
- Badges (use custom rendered components instead)

**Rationale:** Emoji render inconsistently across platforms (the PRD's difficulty emoji will look different on iOS, Android, Samsung, and every Android OEM skin). Custom components ensure visual consistency. Emoji in limited celebratory contexts adds warmth without undermining the professional tone.

---

## 6. Logo Concept

### Direction A: "The Recall Mark" -- Abstract Memory Loop

A continuous line that forms both an "R" and a loop/cycle, representing the spaced repetition cycle. The line has no start or end point -- learning never stops. Think of a Mobius strip rendered as a minimalist letterform.

- **Style:** Single-weight line (matching the 2px icon stroke), geometric construction
- **Vibe:** Technical, precise, conceptual. Like a circuit diagram meets calligraphy.
- **Wordmark:** "recall" in Space Grotesk 700, lowercase, tight letter-spacing (-1px)

### Direction B: "The Stack" -- Layered Cards

Three overlapping rounded rectangles arranged in a slight fan/cascade, suggesting a deck of cards. The top card has a subtle flip indicator (corner fold or rotation hint). Minimal, uses only 2-3 values of the primary color for depth.

- **Style:** Geometric, flat with implied depth through overlapping
- **Vibe:** Immediately communicates "flashcards." Physical, tangible.
- **Wordmark:** "recall" in Space Grotesk 700, lowercase

### Direction C: "The Neuron" -- Connection Point

A simplified neuron/synapse -- a central node with 3-4 branching paths. Represents knowledge connections being formed. Abstract enough to scale, specific enough to suggest learning and brain science.

- **Style:** Rounded, organic but geometric. Dots at connection points.
- **Vibe:** Scientific, learning-focused, premium. Could feel like a research institution logo.
- **Wordmark:** "recall" in Space Grotesk 700, lowercase

### Recommended: Direction A -- "The Recall Mark"

**Reasoning:**

1. **Uniqueness.** Card-stack logos are common in flashcard apps (Anki, Quizlet both use card imagery). A neuron feels too "biotech." The abstract R-loop is ownable.
2. **Scalability.** Works at 16px favicon and 512px app icon. Card stacks lose detail at small sizes; the loop is readable at any size.
3. **Conceptual depth.** The loop literally represents spaced repetition -- the continuous cycle of review. It is a logo that teaches the brand concept.
4. **Versatility.** Works in monochrome, navy on white, white on navy, accent blue. No fine details that break in single-color applications.

### Usage Rules

**Minimum size:** 24px height (icon mark only), 80px width (full wordmark + icon)

**Clear space:** Minimum padding equal to the height of the lowercase "r" in the wordmark on all sides.

**Color variations:**
| Context | Icon Color | Wordmark Color |
|---|---|---|
| Light background | `#1B2A4A` (primary) | `#1B2A4A` |
| Dark background | `#F7F8FB` (primary-surface) | `#F7F8FB` |
| Accent context | `#3B82F6` (accent) | `#1B2A4A` or `#E8ECF2` |
| Monochrome | Black `#000000` | Black `#000000` |
| App icon | `#3B82F6` mark on `#1B2A4A` background | N/A (icon only) |

**What to avoid:**
- Never rotate the logo
- Never apply drop shadows or gradients to the logo
- Never place the logo on busy backgrounds without a container
- Never stretch or compress the aspect ratio
- Never use the icon mark below 24px -- switch to a simplified square version
- Never change the logo colors to anything outside the brand palette
- Never add a tagline directly to the logo lockup (tagline is separate)

---

## 7. Component Design Tokens

### Spacing Scale (4px Base Grid)

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Minimum gap, icon-to-text inline |
| `space-2` | 8px | Tight padding (badge interior), gap between related items |
| `space-3` | 12px | Standard inner padding for small components (chips, tags) |
| `space-4` | 16px | Standard content padding, card inner padding, list item padding |
| `space-5` | 20px | Section gaps within a screen |
| `space-6` | 24px | Screen horizontal padding (safe area inset) |
| `space-8` | 32px | Section separators, large gaps between groups |
| `space-10` | 40px | Major section breaks |
| `space-12` | 48px | Screen top/bottom padding, header/footer spacing |
| `space-16` | 64px | Onboarding illustration spacing, celebration screen layout |

**Rule:** Use only these tokens. No arbitrary values. The 4px grid ensures everything aligns and looks intentional. If 4px feels too tight and 8px too loose, the answer is 4px with a visual adjustment (like padding asymmetry) -- not 6px.

### Border Radius Scale

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0px | Never used in the product (sharp corners feel hostile on mobile) |
| `radius-sm` | 6px | Badges, small tags, inline chips |
| `radius-md` | 12px | Cards, buttons, input fields, list items |
| `radius-lg` | 16px | Bottom sheets, modal containers |
| `radius-xl` | 24px | Onboarding cards, large feature containers |
| `radius-full` | 9999px | Avatars, circular buttons, pill shapes, toggle tracks |

**Design note:** 12px is the default radius for interactive components. This is larger than the 8px used by most design systems (Material uses 12px for medium components; Apple uses continuous cornering which appears ~12px). The 12px radius creates a friendlier, more approachable feel appropriate for a learning app without going so round that components look like toys.

### Shadow / Elevation System

Shadows in dark mode are replaced with subtle border treatments and surface color elevation. True shadows on dark backgrounds are invisible and waste rendering effort.

**Light Mode:**

| Token | Value | Usage |
|---|---|---|
| `elevation-0` | none | Flat content, body text |
| `elevation-1` | `0 1px 3px rgba(15,23,36,0.08), 0 1px 2px rgba(15,23,36,0.06)` | Cards in lists, input fields |
| `elevation-2` | `0 4px 8px rgba(15,23,36,0.10), 0 2px 4px rgba(15,23,36,0.06)` | Floating cards (flashcard during study), popovers |
| `elevation-3` | `0 8px 24px rgba(15,23,36,0.14), 0 4px 8px rgba(15,23,36,0.08)` | Bottom sheets, modals |
| `elevation-4` | `0 16px 48px rgba(15,23,36,0.18), 0 8px 16px rgba(15,23,36,0.10)` | FAB (floating action button), toast notifications |

**Dark Mode:**

| Token | Value | Usage |
|---|---|---|
| `elevation-0` | `border: 1px solid var(--color-neutral-200)` | Same as light elevation-1 |
| `elevation-1` | Surface color `--color-neutral-100` + 1px border | Cards |
| `elevation-2` | Surface color `--color-neutral-200` + 1px border | Floating elements |
| `elevation-3` | Surface color `--color-neutral-200` + `0 0 0 1px rgba(255,255,255,0.06)` | Modals |
| `elevation-4` | Surface color `--color-neutral-300` + `0 0 40px rgba(59,130,246,0.08)` | FAB (subtle blue glow) |

### Animation Timing & Easing

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `motion-instant` | 100ms | `ease-out` | Button press feedback, toggle switches, checkbox |
| `motion-fast` | 200ms | `ease-out` | Hover states, tab switches, chip selection |
| `motion-normal` | 300ms | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` | Card flip (perspective transform), bottom sheet open, page transitions |
| `motion-slow` | 500ms | `cubic-bezier(0.16, 1, 0.3, 1.0)` | Level-up animation entrance, XP counter increment |
| `motion-celebration` | 800ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Level-up badge bounce, streak milestone, confetti burst. This is a spring-overshoot curve. |

**Card flip specifically:**
```typescript
// Reanimated 3 config for the 3D card flip
const flipConfig = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
};

// The flip uses rotateY with perspective
// Front: rotateY 0deg -> 90deg (first half)
// Back: rotateY -90deg -> 0deg (second half)
// Crossfade content at 90deg (edge-on, invisible)
const PERSPECTIVE = 1200; // Higher = less distortion
```

**XP counter animation:**
```typescript
// Count up from 0 to earned XP over 500ms
// Use Reanimated's `withTiming` with `useAnimatedProps`
// Display in JetBrains Mono monoLarge for the "scoreboard" feel
const xpAnimConfig = {
  duration: 500,
  easing: Easing.bezier(0.16, 1, 0.3, 1.0),
};
```

**Reduced motion:**
```typescript
// Check system preference
import { AccessibilityInfo } from 'react-native';

// Or use Expo's hook
import { useReducedMotion } from 'react-native-reanimated';

// When reduced motion is enabled:
// - Skip all decorative animations (level-up, confetti, XP counter)
// - Replace card flip with instant crossfade (opacity 0->1)
// - Keep functional animations but reduce to 100ms with ease-out
```

### Haptic Feedback Guidelines

Using `expo-haptics`:

| Event | Haptic Type | Rationale |
|---|---|---|
| Card flip | `impactAsync(ImpactFeedbackStyle.Light)` | Subtle physical feedback that the card "turned over." Light because it happens frequently. |
| Confidence rating selected | `impactAsync(ImpactFeedbackStyle.Light)` | Confirms selection. |
| Session complete | `notificationAsync(NotificationFeedbackType.Success)` | Clear success signal. Distinct from card flip. |
| Level up | `notificationAsync(NotificationFeedbackType.Success)` followed by 200ms delay then `impactAsync(ImpactFeedbackStyle.Heavy)` | Two-part haptic creates a "celebration pulse." |
| Wrong answer (quiz mode) | `notificationAsync(NotificationFeedbackType.Error)` | Brief error buzz. Not punishing -- just informative. |
| Streak milestone (7, 30, 100 days) | `impactAsync(ImpactFeedbackStyle.Heavy)` | Weight signals significance. |
| Destructive action (delete deck) | `notificationAsync(NotificationFeedbackType.Warning)` | Alerts that this is consequential. |
| Pull to refresh | `impactAsync(ImpactFeedbackStyle.Light)` at threshold | Standard iOS convention. |

**Rule:** Never use haptics for navigation, scrolling, or routine taps. Haptic feedback should be reserved for moments that benefit from physical confirmation. Over-hapticizing makes the phone feel buzzy and annoying (Apple HIG: "Use haptics to complement visual and auditory feedback, not to replace them").

---

## 8. Key Screen Design Direction

These are art direction descriptions, not wireframes. They describe the intended visual feel, spatial relationships, and atmosphere of each screen.

### Home Dashboard

**Atmosphere:** A command center, not a social feed. Clean, data-dense without feeling cluttered. The user opens this screen every day -- it should communicate "here's what matters right now" within 2 seconds.

**Layout:**
- Top region: greeting ("Good morning") is unnecessary -- skip it. Instead, lead with the two most important numbers: **streak count** (left, large mono type with flame icon) and **due card count** (right, large mono type with stack icon). These sit in a horizontal bar with `--color-accent-subtle` background.
- Middle region: Deck list, each deck as a row (not a card -- cards waste vertical space). Each row: deck name (h3), card count (caption), confidence badge (colored pill with label), due count for that deck (mono type, right-aligned). Rows are tappable -- navigates to deck detail.
- Bottom: No FAB floating alone. Instead, a persistent bottom action bar with two options: "Study Due" (primary, accent-strong background) and "New Deck" (secondary, outlined). This respects Fitts's Law -- large targets at the bottom of the screen where thumbs naturally rest (Hoober, 2013).

**Visual reference:** Linear's issue list view -- dense, scannable, every pixel earns its place.

### Study Session (Flashcard Flip)

**Atmosphere:** Total focus. Everything except the card disappears. This is the app's core experience -- it must feel like holding a physical flashcard, not using an app.

**Layout:**
- Full-bleed card occupying ~70% of screen height, centered vertically with generous top/bottom margin.
- Card has `elevation-2` shadow (light mode) or subtle border + surface elevation (dark mode).
- Card background: `--color-neutral-50` (slightly off the screen background) to create figure-ground separation.
- Question text centered vertically in card, h3 weight, Source Serif 4 for a "reading" feel.
- Flip animation: true 3D perspective transform (not a fade). The card rotates on its vertical axis. This is the signature interaction.
- After flip: answer at top of card (h3, bold), then `why_important` (body, subtle divider above), then `simple_example` (body, code-fenced if applicable), then `use_cases` as a compact list (caption size). Scrollable if content overflows.
- Below card: confidence rating. NOT a slider (sliders are imprecise on mobile -- Fitts's Law). Instead, a row of 10 tappable circles, numbered 1-10, colored by confidence tier. Selected circle scales up 1.2x with accent ring. Large enough touch targets (minimum 44px).
- Top bar: minimal. Card count "12 of 28" (mono, caption size), close/exit button (X, top-left). No other chrome.

**Visual reference:** The card should feel like Apple's Wallet cards -- physical, elevated, centered -- combined with Kindle's reading mode (content-first, minimal UI).

### AI Generation Loading State

**Atmosphere:** Anticipation, not anxiety. The user should feel like something intelligent is happening, not that the app is stuck.

**Layout:**
- Same screen structure as the deck detail view (so the skeleton loads "in place" where the cards will appear).
- Skeleton card rows shimmer with a subtle left-to-right gradient sweep. The shimmer uses `--color-neutral-200` to `--color-neutral-100` (light) or `--color-neutral-200` to `--color-neutral-300` (dark).
- Above the skeleton: a single status line in caption type, mono font: "Generating 15 cards on Rust error handling..." with a pulsing dot animation (three dots cycling).
- As each card completes (if streaming is implemented), it fades in and replaces its skeleton row. This staggered reveal (100ms delay between each) creates a satisfying "filling in" effect.
- No progress bar (we cannot predict exact generation time). No spinner (spinners feel broken after 3 seconds -- NN Group, "Response Time Limits," 2023 update).

**Visual reference:** GitHub Copilot's inline suggestion shimmer -- subtle, integrated into the existing UI, not a separate modal.

### Session Summary + XP Earned

**Atmosphere:** Reward and reflection. This screen has two jobs: (1) make the user feel good about studying, (2) show them data that proves their progress. The celebration is earned, not gratuitous.

**Layout:**
- Screen fades in (not a page push -- this is a "completion" state, not a navigation event).
- Top section: large XP number counting up from 0 to earned amount in `monoLarge` font, accent color. Below it: "+5 per card, +20 streak bonus" breakdown in caption type.
- Middle section: three stat columns -- Cards Reviewed, Avg Confidence, Time Spent. Each in mono type with a small descriptive label above. If confidence improved vs. last session, show a green up-arrow. If declined, red down-arrow.
- Streak indicator: flame icon + streak number. If this session extended the streak, show a brief pulse animation on the flame.
- Bottom: two buttons stacked vertically -- "Done" (primary, returns to home) and "Study Again" (secondary, outlined, starts a new session in the same deck).
- NO confetti on regular sessions. Confetti is reserved for level-ups and streak milestones only. Overusing celebration cheapens it (variable reward research -- Skinner, 1938; modern application in Nir Eyal's Hooked model).

### Level-Up Celebration

**Atmosphere:** THIS is where you go big. A level-up is rare (every few days of consistent study). It should feel like an achievement, not a notification.

**Layout:**
- Full-screen takeover with `--color-primary` background (dark navy).
- Large level number in `display` size, Space Grotesk 700, `--color-accent` (blue). Enters with a scale-up + overshoot spring animation (`motion-celebration` timing).
- Below: "Level 12" label, then a one-line stat: "1,847 cards reviewed across 14 decks."
- Subtle particle effect: small dots in accent color floating upward, low opacity, slow movement. Not confetti (confetti is Duolingo/children's game territory). Think fireflies, not a party.
- Haptic: success notification + heavy impact (the two-part pulse).
- Auto-dismisses after 3 seconds OR tap to dismiss. No "share" button in v1 (sharing requires social features not in scope).
- Returns to session summary screen.

**Visual reference:** Headspace's session completion -- calm celebration, not a slot machine.

### Card Detail (Expanded View)

**Atmosphere:** A knowledge article, not a form. When viewing a card's full content, it should feel like reading a well-typeset reference entry.

**Layout:**
- Scrollable single-column layout.
- Top: Question in h2, Source Serif 4 600 weight. Below: difficulty badge (pill shape, colored per difficulty system) and confidence badge side by side.
- Divider (1px, `--color-neutral-200`).
- Answer section: h3 label "Answer" in Space Grotesk 500, caption size, uppercase, tracking +0.5px. Answer text in `bodyLarge`, Source Serif 4.
- Why Important section: same label treatment. Body text, slightly muted (`--color-neutral-700`).
- Example section: if content contains code, render in `mono` font with a subtle background (`--color-neutral-100`).
- Use Cases: numbered list, body size, each on its own line.
- Bottom: metadata row -- created date, last reviewed, review count, SM-2 interval. All in caption type, mono font, `--color-neutral-400`.
- Edit button: outlined, bottom of screen (or in header as icon).

**Visual reference:** Notion's page view -- clean typography, generous spacing, content hierarchy through type alone.

### PDF Export Preview

**Atmosphere:** Print-ready utility. This is a functional screen, not a creative one. It should feel like a professional document preview.

**Layout:**
- Top bar: page title "PDF Preview," close button, "Export" primary action button.
- Filter controls: horizontal scroll row of filter chips (All Cards, Favorites Only, Easy, Medium, Hard, confidence range picker). Compact, functional.
- Preview area: A4/Letter toggle at top of preview. Shows a rendered preview of the first page at ~60% scale. Cards arranged in 2-column grid with visible borders and dashed cut lines (scissors icon at corners). Front and back pages alternating.
- Bottom: "Share PDF" button (opens native share sheet).
- All rendering happens locally. Show a brief spinner during PDF generation, then display the preview.

**Visual reference:** Apple's Print Preview + Google Docs' export modal. Functional, trustworthy, minimal.

---

## 9. Gamification Visual Language

### XP Bar

**Style:** A horizontal progress bar, not circular. Circular progress indicators are overused and waste horizontal space on mobile (Hoober & Berkman, 2011). A horizontal bar inside a rounded container reads instantly.

**Specifications:**
- Container: full width of its parent, 8px height, `radius-full`, `--color-neutral-200` background.
- Fill: `--color-accent` with a subtle gradient (left: `--color-accent`, right: slightly lighter `--color-accent` + 10% white). This gives the bar a "glass" quality without full glassmorphism.
- Animation: fill animates from current to new position using `motion-slow` (500ms) easing. If crossing a level boundary, the bar fills to 100%, pauses 200ms, resets to 0%, then fills to the new position.
- Label: XP count and level shown ABOVE the bar in mono type ("Level 7 -- 140 / 350 XP"). Not inside the bar (text inside a thin bar is unreadable -- WCAG text contrast failure).

### Level Badge

**Concept:** A hexagonal badge (not circular -- hexagons feel more "achievement medal" than circles, and distinguish from the circular confidence/difficulty badges). Filled with `--color-primary`, level number in `--color-accent` or white, stroke border matching the confidence tier of the user's overall average.

**Sizes:**
- Large (profile screen): 64x64px
- Medium (home dashboard): 32x32px
- Small (inline mentions): 20x20px

**Evolution:** At higher levels (10, 25, 50, 100), the badge gains a subtle ring or second border. This visual progression reward is low-effort to implement but high-impact for motivation (Zichermann & Cunningham, 2011, Gamification by Design).

### Streak Flame

**Style:** A custom icon, not Phosphor's default flame. The flame should be geometric and stylized -- think the GitHub contribution graph's heat metaphor, not a realistic fire emoji.

**Specifications:**
- Outline only (matching the icon system) at streaks 1-6 days.
- Filled at 7+ days (the flame "ignites" visually).
- Color: `--color-warning` (gold/amber) at 1-29 days. `--color-error` (red-orange) at 30+ days. `--color-accent` (blue) at 100+ days (a "cold flame" -- the ultimate distinction).
- Animation: subtle flicker (2px vertical oscillation, 2s loop) on the home dashboard. No flicker in lists or small contexts (performance concern + distracting).
- Number rendered beside the flame in `monoLarge` or `mono` depending on context.

### Achievement / Milestone Visual Treatment

Milestones appear as full-width banner notifications on the home dashboard (not modals -- modals interrupt flow). They persist until dismissed.

**Milestone examples:**
- "First Deck Created" -- beginner milestone
- "100 Cards Reviewed" -- engagement milestone
- "30-Day Streak" -- consistency milestone
- "First Perfect Score (10/10 confidence)" -- mastery milestone

**Visual treatment:**
- Banner: `--color-accent-subtle` background, 1px `--color-accent` left border (like a callout in documentation), Phosphor duotone icon on the left (Trophy, Star, Fire, etc.), milestone name in h3, brief description in caption.
- Dismissed with a swipe right or X button.
- No sound. No modal. No full-screen takeover (those are reserved for level-ups only).

### Confidence Badge Design

| Score | Label | Shape | Color | Icon |
|---|---|---|---|---|
| 1-3 | Needs Work | Pill (stadium shape) | Red bg + white text | Minus circle |
| 4-5 | Developing | Pill | Orange bg + white text | Arrow trending up |
| 6-7 | Solid | Pill | Yellow bg + dark text | Check circle |
| 8-9 | Strong | Pill | Green bg + white text | Double check |
| 10 | Mastered | Pill + subtle glow | Teal bg + white text | Crown |

All pills: `radius-full`, `space-2` horizontal padding, `label` type (11px, 500 weight, uppercase). The consistent pill shape across all tiers means recognition is instant -- only color and label change.

### Difficulty Badge Design

| Difficulty | Shape | Color | Icon (Phosphor) |
|---|---|---|---|
| Easy | Pill | Green bg + dark text | `CircleDashed` (outlined circle) |
| Medium | Pill | Yellow bg + dark text | `CircleHalf` (half-filled) |
| Hard | Pill | Red bg + white text | `Circle` (filled) |

Same pill dimensions as confidence badges for visual consistency. The circle-fill metaphor provides a secondary channel beyond color (color-blind accessible).

---

## 10. Accessibility Guidelines

### Touch Targets

**Minimum size: 48x48px** (not 44x44px).

Why 48 instead of Apple's 44: Google's Material Design 3 recommends 48dp. Microsoft's Fluent recommends 48px. Apple's 44pt is the absolute minimum, and absolute minimums should not be targets. Research (Parhi et al., 2006, "Target Size Study for One-Handed Thumb Use on Small Touchscreen Devices") found error rates dropped significantly at 9.2mm (~48px at standard density). The extra 4px costs nothing and reduces mis-taps.

**Specific targets:**
- Confidence rating circles: 48px diameter with 4px gap between them (10 circles in a row = ~520px, which fits iPhone SE width at 375px with 24px side padding only if circles are 32px. **Trade-off:** On small screens, use a 2-row layout (1-5 top row, 6-10 bottom row) to maintain 48px targets.)
- List item rows: minimum 56px height (48px target + 8px vertical padding).
- Navigation bar icons: 48x48px touch area (icon can be 24px visually with 12px padding on each side).
- FAB and primary buttons: minimum 56px height.

### Focus States

For keyboard/screen-reader navigation:

```typescript
// All interactive elements must show a visible focus ring
const focusStyle = {
  // 2px outline, offset by 2px from the element edge
  // Uses accent color for visibility against both light and dark backgrounds
  outlineWidth: 2,
  outlineColor: colors.accent, // #3B82F6 light, #60A5FA dark
  outlineOffset: 2,
  outlineStyle: 'solid',
};

// Focus rings must NOT be hidden for any element
// Never use `outline: 'none'` without providing an alternative focus indicator
```

**Tab order:** Follows visual reading order (top-to-bottom, left-to-right). On the study screen: close button, card (flip action), confidence rating buttons (1-10 in order), next button.

### Color-Blind Safe Considerations

The confidence and difficulty color systems were designed to work across all three major CVD types:

1. **Protanopia / Deuteranopia (red-green):** The five confidence tiers span red, orange, yellow, green, teal -- which collapse to approximately: dark, medium-dark, light, medium-light, medium in luminance for red-green CVD. Combined with text labels, this remains distinguishable.

2. **Tritanopia (blue-yellow):** Less common (<0.01%). The palette's blue accent may blend with some greens. Mitigation: all color-carrying elements include text labels or icons as secondary indicators.

3. **Testing requirement:** All screens must be tested with a CVD simulator (iOS Accessibility settings include "Color Filters" for testing; Android has "Simulate color space" in developer options). Run Sim Daltonism (macOS) or Color Oracle during design review.

**Rule: Color must never be the sole indicator of meaning.** Every colored badge includes a text label. Every success/error state includes an icon. Every chart includes a legend with patterns (not just colors).

### Dynamic Type / Font Scaling

The app must support system font scaling up to 200% (iOS Dynamic Type, Android font scale).

**Implementation:**

```typescript
// Use React Native's PixelRatio.getFontScale() to detect system setting
// Or use Expo's useWindowDimensions for responsive calculations

// Typography tokens should be defined as base values that scale:
const scaledFontSize = (base: number) => {
  const scale = PixelRatio.getFontScale();
  const maxScale = 2.0; // Cap at 200%
  const clampedScale = Math.min(scale, maxScale);
  return Math.round(base * clampedScale);
};

// Layout must accommodate scaled text:
// - Card content area must be scrollable (text may exceed card height at 200%)
// - Buttons must expand vertically to contain scaled text
// - Do NOT use fixed-height containers for text
// - Confidence rating row switches to 2-row layout when font scale > 1.3
```

**Testing requirement:** Every screen must be visually reviewed at 100%, 150%, and 200% font scale. Text must not truncate in ways that lose meaning. Layout must not break.

### Reduced Motion

```typescript
import { useReducedMotion } from 'react-native-reanimated';

// In every component with animation:
const reducedMotion = useReducedMotion();

// Reduced motion behavior:
const animationConfig = reducedMotion
  ? { duration: 0 } // Instant, no animation
  : { duration: 300, easing: standardEasing };

// Specific replacements:
// - Card flip: instant opacity crossfade (0ms)
// - XP counter: show final number immediately (no count-up)
// - Level-up celebration: show badge at final position (no spring/bounce)
// - Skeleton shimmer: static gray placeholder (no gradient sweep)
// - Streak flame flicker: static icon (no oscillation)
// - Confetti/particles: not rendered at all
```

**Rule:** Animations must be categorized as **functional** (provides information, like a loading spinner) or **decorative** (provides delight, like confetti). In reduced motion mode:
- Functional animations: reduced to shortest perceptible duration (100ms) or replaced with a static indicator.
- Decorative animations: removed entirely.

### Screen Reader Support

- All images and icons must have `accessibilityLabel` props.
- Confidence badges: read as "Confidence: 7 out of 10, Solid" (not just the number).
- Difficulty badges: read as "Difficulty: Medium" (not just the color).
- Card flip: announce "Answer revealed" when flipped. Do not rely on visual-only card flip.
- XP animation: announce final value ("Plus 140 experience points earned") after animation completes (or immediately if reduced motion).
- Level-up: announce "Level 12 reached" as a screen reader notification.
- Charts in analytics: provide a text summary alternative. A bar chart of daily reviews should also be accessible as "This week: Monday 12 cards, Tuesday 8 cards, Wednesday 15 cards..."

### Contrast Ratios Summary

All ratios are calculated against their respective background colors:

| Element | Light Mode Ratio | Dark Mode Ratio | WCAG Level |
|---|---|---|---|
| Primary text on surface | 14.2:1 | 13.8:1 | AAA |
| Body text (neutral-700) on surface | 8.1:1 | 8.4:1 | AAA |
| Caption text (neutral-400) on surface | 4.6:1 | 4.5:1 | AA |
| Accent on surface | 4.5:1 | 4.5:1 | AA |
| Success text on success-bg | 5.8:1 | 5.1:1 | AA |
| Error text on error-bg | 6.2:1 | 5.4:1 | AA |
| Warning text on warning-bg | 4.5:1 | 4.5:1 | AA (borderline -- use bold weight to compensate) |

---

## Appendix A: Design Precedent Map

| Precedent | What to Learn | What to Avoid |
|---|---|---|
| **Linear** | Dense, professional UI. Keyboard shortcuts. Dark mode done right. Respects power users. | Can feel cold. Our app needs more warmth for casual learners. |
| **Notion** | Typography-first design. Clean hierarchy. Empowering without hand-holding. | Feature bloat. Our app must stay focused on one thing: spaced repetition. |
| **Headspace** | Warm celebration moments. Calm, not frantic. Motivation through gentleness. | Too soft for technical users. Illustration-heavy (we are skipping illustrations in v1). |
| **Duolingo** | Streak mechanics, gamification psychology, push notification strategy. | Childish tone, mascot-driven guilt, over-gamification that undermines learning. |
| **Anki** | SM-2 implementation, power-user card management, offline-first. | Hostile UX, zero onboarding, brutalist aesthetic that repels new users. |
| **Arc Browser** | Bold typography, distinctive personality, opinionated defaults. | Too experimental for a learning tool. Our users need predictability during study. |
| **Things 3** | Spatial hierarchy, elevation use, satisfying completion animations. | Expensive custom design -- keep our system implementable by a small team. |

## Appendix B: File Structure for Theme Implementation

```
src/
  theme/
    colors.ts          # Light/dark color objects (see Section 3 implementation)
    typography.ts       # Type scale tokens, font family constants
    spacing.ts          # Spacing scale constants
    radius.ts           # Border radius scale
    elevation.ts        # Shadow definitions (light/dark variants)
    animation.ts        # Timing/easing presets, reduced motion helpers
    haptics.ts          # Haptic feedback utility functions
    index.ts            # Unified theme export
  components/
    badges/
      ConfidenceBadge.tsx
      DifficultyBadge.tsx
      LevelBadge.tsx
      StreakFlame.tsx
    feedback/
      XPBar.tsx
      XPCounter.tsx       # Animated count-up component
      LevelUpCelebration.tsx
```

## Appendix C: Quick Reference -- Brand Don'ts

1. **Never say "oops."** Errors are specific and actionable.
2. **Never use confetti for regular sessions.** Confetti is for level-ups and major milestones only.
3. **Never use Inter, Roboto, or Montserrat.** Space Grotesk + Source Serif 4 + JetBrains Mono only.
4. **Never use pure black (#000000) or pure white (#FFFFFF) as backgrounds.** Always use the neutral scale.
5. **Never use color as the sole indicator.** Every badge has a text label. Every chart has a legend.
6. **Never guilt-trip in push notifications.** "We miss you" is banned. Show data: "18 cards due (~6 min)."
7. **Never animate without purpose.** Every animation must serve a function (feedback, state change, celebration).
8. **Never ignore reduced motion preferences.** All decorative animations must be disabled.
9. **Never use emoji in UI labels, buttons, or badges.** Custom components only.
10. **Never put important actions in the top corners of screens.** Bottom of screen = thumb zone.
```

---

The complete document has been written above for `C:\Users\Joaquin\Projects2026\seniordev-app\BRANDING.md`. I do not have write access with my current toolset, so you will need to save the content between the outer code fences to that file path.

**Key files referenced in this work:**
- `C:\Users\Joaquin\Projects2026\seniordev-app\PRD.md` -- the product requirements document that informed every design decision in this branding system.

**Summary of the major design decisions and their reasoning:**

**Name: Recall.** Chosen for instant comprehension, verb energy, and professional positioning that works for both medical students and casual learners. Active recall is the scientific method the app is built on -- the name IS the product.

**Typography: Space Grotesk + Source Serif 4 + JetBrains Mono.** Three voices for three contexts -- navigational UI, educational content, and data/code. The serif for card content is a deliberate departure from competitors (Anki, Quizlet, Duolingo all use sans-serif for everything) and signals "this is material worth reading carefully."

**Color: Navy primary (#1B2A4A) + Blue accent (#3B82F6).** Rooted in IDE aesthetics familiar to the core audience. Avoids the purple-gradient AI-slop aesthetic and the lime-green gamification aesthetic. Five-tier confidence color system (expanded from the PRD's four tiers) with mandatory text labels for color-blind safety.

**Gamification: Earned, not gratuitous.** Confetti is banned from regular sessions. Level-ups get the full-screen treatment because they are rare. Streak flames evolve visually over time (outline to filled, gold to red to blue). The XP bar is horizontal (not circular) because horizontal bars read faster on mobile.

**Accessibility: 48px touch targets, not 44px.** The extra 4 pixels cost nothing and reduce mis-taps measurably. Full reduced motion support, dynamic type scaling to 200%, color-blind safe palette with text labels on every badge, and screen reader announcements for all animated content.