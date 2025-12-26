# The Secretest Santa 🎄

A warm, cozy Christmas-themed landing page that educates users about the cryptographic Secret Santa algorithm from Tom 7's video and provides a simplified, single-page experience for creating Secret Santa assignments.

**Inspired by:** [Tom 7's Secretest Santa 2025](https://www.youtube.com/watch?v=4pG8_bWpmaE)

## ✨ Features

- **Beautiful Christmas Theme**: Burgundy, pine green, cream, and gold color palette
- **Falling Snow Effect**: Subtle tsParticles animation
- **Dark Mode**: Toggle with localStorage persistence
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Privacy-First**: 100% client-side, no data sent to servers
- **Educational**: Explains cryptography concepts through storytelling

## 🚀 Tech Stack

- **Framework**: Astro 5.x
- **UI**: Pico CSS + Custom Christmas theme
- **Interactivity**: React islands
- **Effects**: tsParticles (snow), Anime.js (animations)
- **Typography**: Berkshire Swash, Merriweather, Dancing Script (Google Fonts)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build production site (with type checking)       |
| `npm run preview`         | Preview your build locally                       |
| `npm run lint`            | Run ESLint                                       |
| `npm run format`          | Format code with Prettier                        |

## 📁 Project Structure

```text
/
├── src/
│   ├── components/       # Astro & React components
│   │   ├── DarkModeToggle.tsx
│   │   ├── Hero.astro
│   │   ├── SnowEffect.tsx
│   │   ├── VideoSection.astro
│   │   ├── AlgorithmExplainer.astro
│   │   ├── SecretSantaApp.tsx
│   │   ├── ParticipantList.tsx
│   │   ├── ResultsDisplay.tsx
│   │   └── ConfettiEffect.tsx
│   ├── layouts/          # Page layouts
│   │   └── Layout.astro
│   ├── pages/            # Routes (index.astro)
│   ├── scripts/          # Utility scripts
│   │   ├── scroll-animations.ts
│   │   └── secret-santa-algorithm.ts
│   └── styles/           # Global CSS
│       ├── global.css
│       └── secret-santa-app.css
├── public/               # Static assets
└── package.json
```

## 🎯 Implementation Status

### ✅ Phase 1.1 Complete (Days 1-3)
- [x] Astro 5.x setup with TypeScript
- [x] Christmas theme with Pico CSS
- [x] Dark mode toggle
- [x] Snow effect (tsParticles)
- [x] Hero section with CTAs
- [x] Responsive layout

### ✅ Phase 1.2 Complete (Days 4-5)
- [x] Embed YouTube video
- [x] Write simplified algorithm explanation
- [x] Create collapsible sections
- [x] Add scroll animations with Intersection Observer
- [x] VideoSection component with participant info
- [x] AlgorithmExplainer component with details/summary

### ✅ Phase 1.3 Complete (Days 6-12)
- [x] Build interactive Secret Santa app
- [x] Participant management (add/remove, 3-20 participants)
- [x] Secret Santa algorithm implementation (Fisher-Yates shuffle)
- [x] Setup form (event name, organizer, date)
- [x] Card flip reveal animations (3D CSS transforms)
- [x] Confetti effects (tsParticles)
- [x] Copy results to clipboard
- [x] LocalStorage persistence
- [x] Responsive card grid layout

### ✅ Phase 1.4 Complete (Days 13-17)
- [x] Enhanced Credits section with participant cards
- [x] FAQ section with collapsible accordion
- [x] Footer with privacy notice and attribution
- [x] Visual polish and final touches
- [x] Code review and simplification (codebase is clean and straightforward)

### ✅ Phase 1.5 Complete (Days 18-21)
- [x] Enhanced meta tags for social sharing (Open Graph, Twitter)
- [x] Accessibility improvements (skip link, focus indicators, ARIA labels)
- [x] Performance optimizations (lazy loading, font optimization)
- [x] Deployment configuration (Netlify, Vercel, GitHub Pages)
- [x] Build optimization and bundle size checks

## 🚀 Deployment

This project can be deployed to any static hosting service. Configuration files are included for popular platforms:

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Netlify will auto-detect the `netlify.toml` configuration
4. Deploy!

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Astro and use `vercel.json`
4. Deploy!

**Or use Vercel CLI:**
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy on push to `main`

**Manual deployment:**
```bash
npm run build
# Copy dist/ contents to gh-pages branch
```

### Build Command

All platforms use:
```bash
npm run build
```

Output directory: `dist/`

## 📊 Performance

- **Bundle Size**: ~150KB total (gzipped)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 95+ (target)

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus indicators visible
- Reduced motion support
- Skip to main content link

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
