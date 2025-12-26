# Technology Learnings & Documentation

This document contains key learnings from researching and implementing with Astro 5.x, React, tsParticles, Pico CSS, and related technologies.

---

## Astro 5.x

### Core Concepts

**Islands Architecture**
- Astro ships zero JavaScript by default
- Components are static HTML unless you add a `client:*` directive
- This is the key to Astro's performance: only hydrate what needs interactivity

**Server-First**
- Astro renders everything on the server by default
- Only sends HTML to the browser
- JavaScript is opt-in via client directives

### Client Directives (Hydration Strategies)

```astro
<!-- High priority - loads immediately -->
<Component client:load />

<!-- Medium priority - loads after page load -->
<Component client:idle />
<Component client:idle={{timeout: 500}} />

<!-- Low priority - loads when visible -->
<Component client:visible />
<Component client:visible={{rootMargin: "200px"}} />

<!-- Only when media query matches -->
<Component client:media="(max-width: 768px)" />

<!-- Skip server rendering entirely -->
<Component client:only="react" />
```

**When to use each:**
- `client:load` - Critical interactive elements (modals, forms you see immediately)
- `client:idle` - Important but not urgent (analytics, chat widgets, our dark mode toggle)
- `client:visible` - Below-the-fold content (carousels, heavy components, our future card flip animations)
- `client:media` - Mobile-only or desktop-only features
- `client:only` - Components that break during SSR

### Performance Optimizations

**Prefetching**
```javascript
// Enable in astro.config.mjs
export default defineConfig({
  prefetch: true
});

// Then use in links
<a href="/about" data-astro-prefetch>About</a>
<a href="/page" data-astro-prefetch="viewport">Page</a>
```

**Strategies:**
- `hover` (default) - Prefetch on hover/focus
- `tap` - Load just before clicking
- `viewport` - Load when entering viewport
- `load` - Load all links after page load

**Smart features:**
- Auto-detects slow connections and data saver mode
- Falls back to `tap` to conserve bandwidth
- Skips during rapid scrolling

**View Transitions (renamed from ViewTransitions)**
```astro
---
import { ClientRouter } from 'astro:transitions';
---
<head>
  <ClientRouter />
</head>
```

Benefits:
- SPA-like navigation without full page reloads
- Built-in animations (fade, slide, none)
- Respects `prefers-reduced-motion` automatically
- Accessibility with route announcements

### CSS & Styling

**Scoped by default:**
```astro
<style>
  h1 { color: blue; } /* Only affects this component */
</style>
```

**Global styles:**
```astro
<style is:global>
  body { font-family: sans-serif; }
</style>
```

**Dynamic CSS variables:**
```astro
---
const color = 'blue';
---
<style define:vars={{ color }}>
  h1 { color: var(--color); }
</style>
```

**Optimization:**
- Stylesheets < 4kB are inlined automatically
- Larger files linked externally for caching
- Configure via `assetsInlineLimit`

### Scripts

**Standard approach (bundled):**
```astro
<script>
  // Automatically bundled and transformed
  // TypeScript supported
  // Deduplicated if repeated
</script>
```

**Inline (no processing):**
```astro
<script is:inline>
  // Renders exactly as written
  // Use for theme initialization
</script>
```

### TypeScript

**Setup:**
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

**Type checking:**
```bash
astro check
```

Add to build: `"build": "astro check && astro build"`

### Breaking Changes from Astro 4.x

- **Vite 6.0** - Major dependency upgrade
- **ViewTransitions → ClientRouter** - Same functionality, renamed
- **Removed**: `Astro.glob()` - Use `import.meta.glob()` instead
- **CSRF Protection** - Enabled by default (`security.checkOrigin: true`)
- **Scripts** - No longer hoisted; render where declared
- **Hybrid mode** - Merged into `'static'` mode

---

## React 19.x (with Astro)

### Integration

**Automatic setup:**
```bash
npx astro add react
```

**Manual setup:**
```bash
npm install @astrojs/react react react-dom @types/react @types/react-dom
```

### Best Practices with Astro

**Keep it minimal:**
- Only use React for truly interactive components
- Don't wrap entire pages in React
- Use Astro components for static content

**State management:**
- Use local state (`useState`) for component-specific data
- Avoid heavy state libraries unless necessary
- Remember: Each island is isolated by default

**Passing data:**
- Pass server data via props
- Use `data-*` attributes for simple values
- Serialize complex data as JSON

### Hooks in Islands

**Works normally:**
```tsx
const [count, setCount] = useState(0);
useEffect(() => { /* ... */ }, []);
```

**Important:**
- Each island instance is independent
- No shared state between islands by default
- Use localStorage or URL params for cross-island communication

### Hydration & DOM Manipulation Issues

**The Problem:**
React hydration requires the server-rendered HTML to match exactly what React expects on the client. External scripts that modify the DOM before React hydrates can cause mismatches.

**Common Pitfalls:**

1. **CSS Classes Added by External Scripts:**
   ```tsx
   // ❌ BAD: External script adds 'is-visible' class before React hydrates
   // Server HTML: <div class="fade-in">
   // Client HTML: <div class="fade-in is-visible"> (script modified it)
   // React Error: Hydration mismatch!
   ```

2. **CSS Hiding Content Until JS Runs:**
   ```css
   /* If .fade-in starts as opacity: 0, React components won't be visible */
   .fade-in {
     opacity: 0;
   }
   .fade-in.is-visible {
     opacity: 1;
   }
   ```

3. **Scroll Animation Scripts:**
   ```javascript
   // ❌ BAD: Script modifies React component elements
   document.querySelectorAll('.fade-in').forEach(el => {
     el.classList.add('is-visible'); // Breaks React hydration!
   });
   ```

**Solutions:**

1. **Exclude React Islands from External Scripts:**
   ```javascript
   // ✅ GOOD: Skip React-controlled elements
   document.querySelectorAll('.fade-in').forEach(el => {
     if (!el.closest('#app')) { // Skip React island
       el.classList.add('is-visible');
     }
   });
   ```

2. **Handle Visibility in React Components:**
   ```tsx
   // ✅ GOOD: React manages its own visibility
   useEffect(() => {
     const appSection = document.getElementById('app');
     if (appSection) {
       const fadeInElements = appSection.querySelectorAll('.fade-in');
       fadeInElements.forEach((el) => {
         requestAnimationFrame(() => {
           el.classList.add('is-visible');
         });
       });
     }
   }, []);
   ```

3. **Use `client:load` for Critical Components:**
   ```astro
   <!-- ✅ GOOD: Hydrates immediately, avoids visibility delays -->
   <ReactComponent client:load />
   
   <!-- ⚠️ CAUTION: May cause blank sections if visibility depends on scripts -->
   <ReactComponent client:visible />
   ```

4. **Avoid CSS That Hides Until JS:**
   ```css
   /* ⚠️ CAUTION: Can cause blank sections */
   .fade-in {
     opacity: 0; /* Hidden until script adds .is-visible */
   }
   
   /* ✅ BETTER: Start visible, fade in if JS available */
   .fade-in {
     opacity: 1; /* Visible by default */
     transition: opacity 0.6s;
   }
   ```

**Best Practices:**
- Keep React islands isolated from external DOM manipulation scripts
- Use `useEffect` to handle visibility/animations within React components
- Prefer `client:load` for components that must be visible immediately
- Test hydration by checking browser console for React warnings
- Use `requestAnimationFrame` when modifying DOM after React mount

---

## tsParticles

### Core Concepts

**Packages:**
- `@tsparticles/engine` - Core engine
- `@tsparticles/slim` - Lightweight preset (recommended)
- `@tsparticles/react` - React wrapper

**Why slim?**
- Smaller bundle size (~50% smaller than full)
- Includes most common features
- Perfect for snow, confetti, basic effects

### Implementation

**Setup:**
```tsx
import { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleEffect() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options = useMemo(() => ({
    // Configuration
  }), []);

  return <Particles options={options} />;
}
```

### Performance Tips

**Particle Count:**
- Desktop: 50-100 particles (good balance)
- Mobile: 30-50 particles (better performance)
- Tablets: 40-70 particles

**FPS Limit:**
- Set `fpsLimit: 60` (default is unlimited)
- Consider `fpsLimit: 30` for very low-end devices

**Density:**
- Enable `density: true` for responsive particle count
- Automatically adjusts based on screen size

**Reduce Duplicates:**
- Set `reduceDuplicates: true`
- Improves performance by reusing particle properties

**Detect Retina:**
- `detectRetina: true` for better quality on high-DPI screens
- Minimal performance impact

### Common Patterns

**Snow Effect:**
```javascript
{
  particles: {
    move: {
      direction: 'bottom',
      speed: 1,
      straight: false,
    },
    wobble: {
      enable: true,
      distance: 10,
      speed: 5,
    },
    opacity: { min: 0.3, max: 0.8 },
    size: { min: 2, max: 6 },
  }
}
```

**Confetti Burst:**
```javascript
{
  particles: {
    move: {
      direction: 'none',
      speed: 5,
      outModes: 'destroy',
    },
    shape: { type: ['circle', 'square', 'triangle'] },
    gravity: { enable: true, acceleration: 9.81 },
  }
}
```

### Accessibility

**Always respect reduced motion:**
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const options = {
  particles: {
    number: { value: prefersReducedMotion ? 0 : 80 },
  }
};
```

---

## Pico CSS

### Philosophy

**Semantic HTML:**
- No utility classes required
- Style native HTML elements
- Automatic dark mode support

**Minimal approach:**
- One CSS file (~10KB gzipped)
- Classless by default
- Optional class system available

### Usage

**Import:**
```css
@import '@picocss/pico/css/pico.min.css';
```

**Structure:**
```html
<main class="container">
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>
```

### Key Classes

**Container:**
- `.container` - Responsive max-width container
- Centers content, adds padding

**Grid:**
- Use native CSS Grid
- Pico styles grid elements automatically

**Forms:**
- All form elements styled by default
- Add `aria-invalid` for error states
- Button groups work automatically

### Dark Mode

**Automatic:**
```html
<html data-theme="light">  <!-- or "dark" -->
```

**Toggle:**
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

### Customization

**CSS Variables:**
```css
:root {
  --primary: #your-color;
  --background-color: #your-bg;
}
```

**Override styles:**
```css
/* After Pico import */
button {
  /* Your custom styles */
}
```

---

## Google Fonts

### Performance Best Practices

**Preconnect:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Font Display:**
- Use `&display=swap` in URL
- Prevents invisible text (FOIT)
- Shows fallback until font loads

**Optimal Loading:**
```html
<link
  href="https://fonts.googleapis.com/css2?family=Font+Name:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

**Limit Weights:**
- Only load weights you actually use
- Each weight adds ~20-50KB
- 400 (normal) and 700 (bold) usually sufficient

**Subsetting:**
- Use `&text=` parameter for specific characters
- Dramatically reduces file size
- Example: `&text=ABCD1234` for limited character set

### Font Pairing

**Our choices:**
- **Berkshire Swash** - Decorative display font (headings only)
- **Merriweather** - Readable serif (body text)
- **Dancing Script** - Script font (accents/special elements)

**Why this works:**
- Contrast in style (display, serif, script)
- All have warmth suitable for Christmas theme
- Good readability for Merriweather as body font

---

## CSS Best Practices

### Performance

**Critical CSS:**
- Inline critical CSS in `<head>`
- Load non-critical styles async
- Astro does this automatically for small files

**Minimize Specificity:**
```css
/* Good */
.button { }

/* Avoid */
div.container > ul li.item a.button { }
```

**Use CSS Custom Properties:**
```css
:root {
  --spacing: 1rem;
}

.element {
  padding: var(--spacing);
}
```

### Organization

**Structure:**
1. CSS reset/normalize (Pico CSS)
2. CSS variables
3. Base styles (html, body)
4. Layout
5. Components
6. Utilities

**Naming:**
- BEM: `.block__element--modifier`
- Or semantic: `.hero-title`, `.card-primary`
- Stay consistent

### Animations

**Performance:**
- Only animate `transform` and `opacity`
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly

**Respect User Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ESLint & Prettier

### ESLint (Flat Config - ESLint 9+)

**Setup:**
```javascript
// eslint.config.js
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // Your custom rules
    },
  },
];
```

**Run:**
```bash
npm run lint
```

### Prettier

**Setup:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": { "parser": "astro" }
    }
  ]
}
```

**Run:**
```bash
npm run format
```

### Integration

**VS Code:**
- Install ESLint extension
- Install Prettier extension
- Install Astro extension
- Enable format on save

**Pre-commit hooks (optional):**
```bash
npm install --save-dev husky lint-staged
npx husky install
```

---

## Browser APIs

### LocalStorage

**Best practices:**
```javascript
// Set
localStorage.setItem('key', 'value');

// Get with fallback
const value = localStorage.getItem('key') || 'default';

// Remove
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

**Error handling:**
```javascript
try {
  localStorage.setItem('key', 'value');
} catch (e) {
  // Storage full or disabled
  console.warn('Storage unavailable', e);
}
```

**Storage limits:**
- ~5-10MB per domain
- Varies by browser
- Synchronous (blocks main thread)

### Prefer SessionStorage for temporary data

```javascript
sessionStorage.setItem('key', 'value'); // Cleared when tab closes
```

### Crypto API (for Secret Santa)

**Generate random values:**
```javascript
const array = new Uint32Array(10);
crypto.getRandomValues(array);
```

**Why crypto over Math.random():**
- Cryptographically secure
- Unpredictable
- Not seeded from time
- Required for security-sensitive operations

---

## Git Best Practices

### Commit Messages

**Format:**
```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, no logic change)
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build/tooling changes

**Examples:**
```
feat: Add dark mode toggle with localStorage

Implements a React island component that persists theme
preference across sessions.

🎄 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Branching

**For this project:**
- `main` - Stable, deployable code
- Feature branches: `feature/video-section`
- Bug fixes: `fix/snow-effect-mobile`

---

## Performance Checklist

### Images
- [ ] Use WebP format where possible
- [ ] Provide multiple sizes (responsive images)
- [ ] Add `loading="lazy"` for below-fold images
- [ ] Use Astro's `<Image />` component

### JavaScript
- [ ] Only load what's needed
- [ ] Use code splitting
- [ ] Defer non-critical scripts
- [ ] Minimize bundle size

### CSS
- [ ] Inline critical CSS
- [ ] Remove unused styles
- [ ] Minimize animations
- [ ] Use CSS custom properties

### Fonts
- [ ] Preconnect to font providers
- [ ] Use `font-display: swap`
- [ ] Limit font weights
- [ ] Consider variable fonts

### Testing
- [ ] Lighthouse audit (aim for 95+)
- [ ] Test on slow 3G
- [ ] Test on mobile devices
- [ ] Check bundle sizes

---

## Accessibility Checklist

### WCAG Compliance
- [ ] Color contrast ≥ 4.5:1 (text)
- [ ] Color contrast ≥ 3:1 (UI components)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Form labels properly associated

### Semantic HTML
- [ ] Use proper heading hierarchy
- [ ] Use `<nav>`, `<main>`, `<article>`, etc.
- [ ] Use `<button>` for actions
- [ ] Use `<a>` for navigation

### ARIA
- [ ] Add `aria-label` where needed
- [ ] Use `aria-hidden="true"` for decorative elements
- [ ] Add `role` attributes when semantic HTML isn't enough
- [ ] Announce dynamic content with `aria-live`

### Reduced Motion
- [ ] Respect `prefers-reduced-motion`
- [ ] Provide non-animated alternatives
- [ ] Test with motion disabled

### Screen Readers
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Test with NVDA (Windows)
- [ ] Ensure all content is readable
- [ ] Navigation makes sense

---

## Key Takeaways

### What Makes This Stack Fast

1. **Astro's Islands** - Only JavaScript where needed
2. **Pico CSS** - Minimal, semantic CSS
3. **tsParticles Slim** - Lightweight effects library
4. **Static Generation** - Pre-rendered HTML
5. **Smart Prefetching** - Pages load before click

### What Makes This Stack Simple

1. **Astro's DX** - Intuitive component model
2. **Pico's Approach** - Style native HTML
3. **TypeScript** - Catch errors early
4. **React Islands** - Familiar for interactivity
5. **Minimal Config** - Works out of the box

### What Makes This Stack Maintainable

1. **Scoped Styles** - No CSS conflicts
2. **Type Safety** - TypeScript throughout
3. **Component Structure** - Clear separation
4. **ESLint/Prettier** - Consistent code
5. **Git Workflow** - Clear history

---

## Resources

### Official Documentation
- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [tsParticles](https://particles.js.org)
- [Pico CSS](https://picocss.com)

### Tools
- [Can I Use](https://caniuse.com) - Browser support
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audits
- [WebPageTest](https://www.webpagetest.org) - Real-world testing
- [Bundle Phobia](https://bundlephobia.com) - Package size analysis

### Communities
- [Astro Discord](https://astro.build/chat)
- [React Community](https://react.dev/community)
