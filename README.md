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
│   │   └── AlgorithmExplainer.astro
│   ├── layouts/          # Page layouts
│   │   └── Layout.astro
│   ├── pages/            # Routes (index.astro)
│   ├── scripts/          # Utility scripts
│   │   └── scroll-animations.ts
│   └── styles/           # Global CSS
│       └── global.css
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

### 🚧 Next Steps (Phase 1.3)
- [ ] Build interactive Secret Santa app
- [ ] Participant management (add/remove)
- [ ] Secret Santa algorithm implementation
- [ ] Card flip reveal animations
- [ ] Confetti effects

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
