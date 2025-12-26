# Site Map & Component Reference

A comprehensive reference guide for The Secretest Santa project structure, component locations, and site organization.

## 📍 Site Structure

The site is a single-page application with the following sections (in order):

```
┌─────────────────────────────────────────────────────────┐
│  Hero Section                                           │
│  - Welcome message & CTAs                               │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Video Section (#story)                                 │
│  - YouTube embed & participant introduction             │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Algorithm Explainer (#algorithm)                       │
│  - Problem, Solution, Simplified Version               │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Secret Santa App (#app)                                │
│  - Interactive Secret Santa generator                   │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  FAQ Section (#faq)                                     │
│  - Frequently asked questions                           │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Credits Section (#credits)                             │
│  - Participant cards & attribution                      │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Footer                                                 │
│  - Privacy notice & links                               │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ File Structure

```
secretest-santa/
├── public/
│   └── favicon.svg                    # Site favicon
│
├── src/
│   ├── components/                    # All React & Astro components
│   │   ├── DarkModeToggle.tsx        # Theme toggle button (React)
│   │   ├── SnowEffect.tsx            # Falling snow particles (React)
│   │   ├── Hero.astro                # Hero section with CTAs
│   │   ├── VideoSection.astro        # YouTube video embed
│   │   ├── AlgorithmExplainer.astro  # Algorithm explanation
│   │   ├── SecretSantaApp.tsx        # Main app container (React)
│   │   ├── ParticipantList.tsx       # Participant management (React)
│   │   ├── ResultsDisplay.tsx        # Card flip reveal (React)
│   │   ├── ConfettiEffect.tsx        # Confetti animation (React)
│   │   ├── Credits.astro             # Credits section
│   │   ├── FAQ.astro                 # FAQ accordion
│   │   └── Footer.astro               # Site footer
│   │
│   ├── layouts/
│   │   └── Layout.astro               # Base HTML layout
│   │
│   ├── pages/
│   │   └── index.astro                # Main page (composes all sections)
│   │
│   ├── scripts/
│   │   ├── scroll-animations.ts       # Intersection Observer animations
│   │   └── secret-santa-algorithm.ts  # Core algorithm logic
│   │
│   └── styles/
│       ├── global.css                 # Global styles & theme variables
│       └── secret-santa-app.css      # App-specific styles
│
├── astro.config.mjs                   # Astro configuration
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
└── README.md                          # Project documentation
```

---

## 🧩 Component Reference

### Page Components

#### `src/pages/index.astro`
**Location**: Main entry point  
**Type**: Astro page  
**Purpose**: Composes all sections into a single page

**Contains**:
- Hero section
- Video section
- Algorithm explainer
- Secret Santa app (React island)
- FAQ section
- Credits section
- Footer
- Scroll animation script

**Client Directives**:
- `SnowEffect client:load` - Load immediately (background effect)
- `DarkModeToggle client:load` - Load immediately (top-right toggle)
- `SecretSantaApp client:visible` - Load when visible (below fold)

---

### Layout Components

#### `src/layouts/Layout.astro`
**Location**: Base HTML template  
**Type**: Astro layout  
**Purpose**: Provides HTML structure, meta tags, fonts

**Features**:
- Meta tags (Open Graph, Twitter Cards)
- Google Fonts preconnect
- Theme initialization script (prevents FOUC)
- Global CSS import

---

### Section Components

#### `src/components/Hero.astro`
**Location**: Top of page  
**Type**: Astro component (static)  
**Section ID**: `#hero`  
**Purpose**: Welcome section with main CTAs

**Content**:
- Title: "The Secretest Santa"
- Subtitle: "A mathematically bulletproof way to exchange gifts"
- Two CTAs:
  - "Create Your Secret Santa" → `#app`
  - "Learn How It Works" → `#story`

**Styling**: `src/components/Hero.astro` (scoped)

---

#### `src/components/VideoSection.astro`
**Location**: After Hero  
**Type**: Astro component (static)  
**Section ID**: `#story`  
**Purpose**: Embedded YouTube video and context

**Content**:
- YouTube embed (Tom 7's video)
- Participant introduction text
- Key participants mentioned

**File**: `src/components/VideoSection.astro`

---

#### `src/components/AlgorithmExplainer.astro`
**Location**: After Video Section  
**Type**: Astro component (static)  
**Section ID**: `#algorithm`  
**Purpose**: Explains the cryptographic algorithm

**Content**:
- The Problem
- The Solution (with collapsible details)
- Simplified Version explanation

**Features**:
- Collapsible `<details>` sections
- Progressive disclosure

**File**: `src/components/AlgorithmExplainer.astro`

---

#### `src/components/FAQ.astro`
**Location**: After Secret Santa App  
**Type**: Astro component (static)  
**Section ID**: `#faq`  
**Purpose**: Frequently asked questions

**Content**:
- 5 questions with collapsible answers
- Accordion-style UI

**File**: `src/components/FAQ.astro`

---

#### `src/components/Credits.astro`
**Location**: After FAQ  
**Type**: Astro component (static)  
**Section ID**: `#credits`  
**Purpose**: Attribution and participant cards

**Content**:
- Participant cards grid
- Links to original video
- Explanation of simplified vs full version

**File**: `src/components/Credits.astro`

---

#### `src/components/Footer.astro`
**Location**: Bottom of page  
**Type**: Astro component (static)  
**Purpose**: Footer with privacy notice

**Content**:
- Privacy statement
- Attribution links
- Open source notice

**File**: `src/components/Footer.astro`

---

### Interactive Components (React Islands)

#### `src/components/SecretSantaApp.tsx`
**Location**: Main app section  
**Type**: React component  
**Section ID**: `#app`  
**Hydration**: `client:visible`  
**Purpose**: Main container for Secret Santa functionality

**State Management**:
- Event data (name, organizer, date)
- Participants list
- Assignments (null until generated)
- Error handling

**Features**:
- LocalStorage persistence
- Setup form
- Participant management
- Assignment generation
- Results display

**Child Components**:
- `ParticipantList` - Manages participants
- `ResultsDisplay` - Shows card flip reveal

**File**: `src/components/SecretSantaApp.tsx`

---

#### `src/components/ParticipantList.tsx`
**Location**: Inside SecretSantaApp  
**Type**: React component  
**Purpose**: Add/remove/edit participants

**Features**:
- Dynamic participant list (3-20)
- Christmas icons per participant
- Inline name editing
- Shake animation on invalid remove
- Add participant form

**Props**:
- `participants`: Participant[]
- `onAdd`: (name: string) => void
- `onRemove`: (id: string) => void
- `onUpdate`: (id: string, name: string) => void

**File**: `src/components/ParticipantList.tsx`

---

#### `src/components/ResultsDisplay.tsx`
**Location**: Inside SecretSantaApp (shown after generation)  
**Type**: React component  
**Purpose**: Card flip reveal interface

**Features**:
- Responsive card grid (4/3/2/1 columns)
- 3D card flip animation
- Click-to-reveal functionality
- Progress tracking
- Confetti on reveal
- Copy results to clipboard
- "Reveal All" button

**Props**:
- `participants`: Participant[]
- `assignments`: Assignment[]
- `eventName`: string
- `onReset`: () => void

**File**: `src/components/ResultsDisplay.tsx`

---

#### `src/components/ConfettiEffect.tsx`
**Location**: Used by ResultsDisplay  
**Type**: React component  
**Purpose**: Confetti burst animation

**Features**:
- tsParticles integration
- Triggers on card reveal
- Respects reduced motion
- Auto-disables after 2 seconds

**Props**:
- `trigger?: number` - Increments to restart animation

**File**: `src/components/ConfettiEffect.tsx`

---

#### `src/components/DarkModeToggle.tsx`
**Location**: Fixed top-right  
**Type**: React component  
**Hydration**: `client:load`  
**Purpose**: Theme toggle button

**Features**:
- Toggles between light/dark themes
- LocalStorage persistence
- Defaults to light theme
- Moon/Sun icons

**File**: `src/components/DarkModeToggle.tsx`

---

#### `src/components/SnowEffect.tsx`
**Location**: Fixed background  
**Type**: React component  
**Hydration**: `client:load`  
**Purpose**: Falling snow particles

**Features**:
- tsParticles snow effect
- Respects reduced motion preference
- 80 particles (desktop)
- Subtle animation

**File**: `src/components/SnowEffect.tsx`

---

## 🎨 Styles

### `src/styles/global.css`
**Purpose**: Global styles and theme variables

**Contains**:
- Pico CSS import
- CSS custom properties (theme colors)
- Dark mode overrides
- Typography settings
- Utility classes
- Focus indicators
- Reduced motion support

**Variables**:
- `--color-burgundy`: #800020
- `--color-pine-green`: #01796f
- `--color-cream`: #fff8dc
- `--color-gold`: #daa520

---

### `src/styles/secret-santa-app.css`
**Purpose**: Styles specific to the Secret Santa app

**Contains**:
- Setup form styles
- Participant list styles
- Card flip animations
- Results display styles
- Button styles
- Responsive breakpoints

---

## 🔧 Scripts

### `src/scripts/secret-santa-algorithm.ts`
**Purpose**: Core Secret Santa algorithm logic

**Exports**:
- `generateAssignments()` - Main algorithm function
- `generateId()` - Unique ID generator
- Types: `Participant`, `Assignment`, `Exclusion`

**Algorithm**:
- Fisher-Yates shuffle
- Cyclic permutation
- Exclusion validation

---

### `src/scripts/scroll-animations.ts`
**Purpose**: Scroll-triggered fade-in animations

**Features**:
- Intersection Observer
- Respects reduced motion
- Adds `is-visible` class to `.fade-in` elements

**Note**: Currently inlined in `index.astro`

---

## 🎯 Navigation & Anchors

The site uses anchor links for smooth scrolling:

- `#hero` - Hero section (top)
- `#story` - Video section
- `#algorithm` - Algorithm explanation
- `#app` - Secret Santa app
- `#faq` - FAQ section
- `#credits` - Credits section

---

## 📱 Responsive Breakpoints

Styles use mobile-first approach:

- **Mobile**: < 640px (1 column cards)
- **Tablet**: 640px - 1023px (2-3 column cards)
- **Desktop**: ≥ 1024px (4 column cards)

---

## 🔄 Data Flow

### Secret Santa App Flow

```
User Input
    ↓
SecretSantaApp (state)
    ↓
ParticipantList (props)
    ↓
User adds/removes participants
    ↓
SecretSantaApp updates state
    ↓
LocalStorage saves
    ↓
User clicks "Draw Names!"
    ↓
generateAssignments() called
    ↓
Assignments stored in state
    ↓
ResultsDisplay shown
    ↓
User clicks cards to reveal
    ↓
ConfettiEffect triggers
```

---

## 🎭 Component Types

### Astro Components (Static)
- `Hero.astro`
- `VideoSection.astro`
- `AlgorithmExplainer.astro`
- `FAQ.astro`
- `Credits.astro`
- `Footer.astro`
- `Layout.astro`

**Use when**: Content is static, no interactivity needed

### React Components (Interactive)
- `SecretSantaApp.tsx`
- `ParticipantList.tsx`
- `ResultsDisplay.tsx`
- `ConfettiEffect.tsx`
- `DarkModeToggle.tsx`
- `SnowEffect.tsx`

**Use when**: Need interactivity, state management, or client-side logic

---

## 📦 Dependencies

### Core
- **Astro 5.x** - Framework
- **React 19.x** - Interactive islands
- **TypeScript** - Type safety

### Styling
- **Pico CSS** - Base styles
- **Custom CSS** - Theme & components

### Effects
- **tsParticles** - Snow & confetti
- **Anime.js** - (Available, not currently used)

---

## 🚀 Deployment Files

- `netlify.toml` - Netlify configuration
- `vercel.json` - Vercel configuration
- `.github/workflows/deploy.yml` - GitHub Pages workflow

---

## 📝 Quick Reference

**To add a new section**:
1. Create component in `src/components/`
2. Import in `src/pages/index.astro`
3. Add to main content
4. Add anchor ID if needed

**To modify theme colors**:
- Edit `src/styles/global.css` → `:root` variables

**To change algorithm**:
- Edit `src/scripts/secret-santa-algorithm.ts`

**To add new participant field**:
- Update `Participant` interface in `secret-santa-algorithm.ts`
- Update `ParticipantList.tsx` form
- Update `SecretSantaApp.tsx` state

---

## 🔍 Finding Components

**Looking for...**

- **Hero section** → `src/components/Hero.astro`
- **Video embed** → `src/components/VideoSection.astro`
- **Algorithm explanation** → `src/components/AlgorithmExplainer.astro`
- **Participant list** → `src/components/ParticipantList.tsx`
- **Card flip reveal** → `src/components/ResultsDisplay.tsx`
- **Theme toggle** → `src/components/DarkModeToggle.tsx`
- **Snow effect** → `src/components/SnowEffect.tsx`
- **Main app logic** → `src/components/SecretSantaApp.tsx`
- **Algorithm code** → `src/scripts/secret-santa-algorithm.ts`
- **Global styles** → `src/styles/global.css`
- **App styles** → `src/styles/secret-santa-app.css`

---

**Last Updated**: Phase 1.5 Complete  
**Version**: 1.0.0

