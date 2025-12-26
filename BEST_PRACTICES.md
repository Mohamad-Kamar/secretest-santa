# Best Practices for The Secretest Santa

This document outlines the specific best practices we follow for this project. **Focus: Simplicity.**

---

## Core Principles

### 1. Simple Over Clever

**DO:**
- Write straightforward code
- Use standard patterns
- Prefer readability over cleverness

**DON'T:**
- Over-engineer solutions
- Add abstractions prematurely
- Use fancy patterns for simple problems

**Example:**
```typescript
// ✅ Simple and clear
const greeting = name ? `Hello, ${name}!` : 'Hello!';

// ❌ Unnecessarily complex
const greeting = (name => name ? `Hello, ${name}!` : 'Hello!')(name);
```

### 2. Static Over Dynamic

**DO:**
- Keep components static (Astro) unless they need interactivity
- Use `client:*` directives sparingly
- Prefer server-side rendering

**DON'T:**
- Make everything a React component
- Add JavaScript when HTML/CSS works
- Use `client:load` for everything

**Example:**
```astro
<!-- ✅ Static component (faster) -->
<Hero />

<!-- ❌ Unnecessary React island -->
<Hero client:load />

<!-- ✅ Only interactive parts are islands -->
<Hero>
  <DarkModeToggle client:idle />
</Hero>
```

### 3. CSS Over JavaScript

**DO:**
- Use CSS animations and transitions
- Style with CSS custom properties
- Leverage Pico CSS semantic styling

**DON'T:**
- Animate with JavaScript when CSS works
- Inline styles everywhere
- Fight against Pico CSS defaults

**Example:**
```css
/* ✅ CSS animation (performant) */
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

```javascript
// ❌ JavaScript animation (unnecessary)
element.style.opacity = '0';
setTimeout(() => {
  element.style.transition = 'opacity 0.6s';
  element.style.opacity = '1';
}, 10);
```

---

## File Organization

### Directory Structure

```
src/
├── components/          # All components (Astro & React)
│   ├── *.astro         # Static components
│   └── *.tsx           # Interactive islands
├── layouts/            # Page templates
│   └── Layout.astro    # Base layout
├── pages/              # Routes
│   └── index.astro     # Homepage
└── styles/             # Global styles
    └── global.css      # Theme + overrides
```

**Rules:**
- One component per file
- Name files in PascalCase
- Group related components in subdirectories only when needed
- Keep it flat until complexity demands nesting

### Naming Conventions

**Files:**
- Components: `PascalCase.astro` or `PascalCase.tsx`
- Styles: `kebab-case.css`
- Utilities: `camelCase.ts`

**Variables:**
- `camelCase` for variables and functions
- `PascalCase` for components and types
- `UPPER_SNAKE_CASE` for constants

**CSS:**
- Classes: `kebab-case` or BEM
- Variables: `--kebab-case`
- Avoid overly specific selectors

---

## Component Guidelines

### Astro Components

**Keep them simple:**
```astro
---
// Minimal frontmatter
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<section>
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</section>

<style>
  /* Scoped styles only */
  section {
    padding: 2rem;
  }
</style>
```

**Rules:**
- Keep frontmatter minimal
- Use TypeScript interfaces for props
- Provide sensible defaults
- Scoped styles by default
- Global styles only in `global.css`

### React Islands

**Minimal by design:**
```tsx
// ✅ Simple React island
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Rules:**
- One responsibility per component
- Keep state local
- Use standard hooks (useState, useEffect)
- No Redux/Zustand unless absolutely necessary
- Prefer lifting state up over prop drilling

**When to use React vs Astro:**
- **Astro**: Static content, layouts, presentational components
- **React**: Forms, toggles, interactive widgets, complex state

---

## Styling Guidelines

### CSS Architecture

**Layers (in order):**
1. Pico CSS base
2. CSS variables (theme)
3. Global styles (typography, layout)
4. Component styles (scoped)
5. Utility classes (minimal)

**In `global.css`:**
```css
/* 1. Import base */
@import '@picocss/pico/css/pico.min.css';

/* 2. CSS variables */
:root {
  --color-primary: #800020;
}

/* 3. Global styles */
body {
  font-family: var(--font-family-body);
}

/* 4. Utilities (minimal) */
.text-center {
  text-align: center;
}
```

**In components:**
```astro
<style>
  /* Only styles for this component */
  .hero-title {
    color: var(--color-burgundy);
  }
</style>
```

### CSS Custom Properties

**Define once, use everywhere:**
```css
:root {
  /* Colors */
  --color-burgundy: #800020;
  --color-pine-green: #01796f;

  /* Spacing */
  --spacing-section: 4rem;
  --spacing-card: 2rem;

  /* Transitions */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Use in components:**
```css
.button {
  background: var(--color-burgundy);
  transition: var(--transition-smooth);
}
```

**Benefits:**
- Consistent values
- Easy theme changes
- Single source of truth

### Responsive Design

**Mobile-first:**
```css
/* Base styles (mobile) */
.hero {
  padding: 2rem;
}

/* Tablet */
@media (min-width: 768px) {
  .hero {
    padding: 3rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero {
    padding: 4rem;
  }
}
```

**Use clamp() for fluid typography:**
```css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

---

## Performance

### Hydration Strategy

**Prioritize wisely:**
```astro
<!-- Critical: Load immediately -->
<Modal client:load />

<!-- Important but not urgent: Load after page load -->
<DarkModeToggle client:idle />

<!-- Below the fold: Load when visible -->
<ImageCarousel client:visible />

<!-- Mobile only -->
<MobileMenu client:media="(max-width: 768px)" />
```

**Decision tree:**
1. Does it need JavaScript? **No** → Use Astro component
2. Is it critical? **Yes** → `client:load`
3. Is it visible immediately? **Yes** → `client:idle`
4. Is it below the fold? **Yes** → `client:visible`
5. Is it conditional? **Yes** → `client:media`

### Bundle Size

**Check before adding dependencies:**
```bash
# See package size
npm info <package-name> --size
```

**Current dependencies (keep minimal):**
- Astro: Framework (necessary)
- React: Islands (necessary for interactivity)
- Pico CSS: ~10KB (necessary for styling)
- tsParticles: ~50KB (justified for snow effect)
- Anime.js: ~24KB (future animations)

**Before adding new packages, ask:**
1. Can I do this with vanilla JS?
2. Can I do this with CSS?
3. Is there a smaller alternative?
4. Will I use >50% of the package features?

### Images (Future)

```astro
<!-- ✅ Optimized -->
<img
  src="/image.webp"
  alt="Description"
  loading="lazy"
  width="800"
  height="600"
/>

<!-- ✅ Better: Use Astro's Image component -->
<Image
  src={import('./image.jpg')}
  alt="Description"
  loading="lazy"
/>
```

---

## Accessibility

### Semantic HTML First

```html
<!-- ✅ Semantic -->
<nav>
  <ul>
    <li><a href="#story">Story</a></li>
  </ul>
</nav>

<!-- ❌ Non-semantic -->
<div class="nav">
  <div class="list">
    <div class="item"><span onclick="navigate()">Story</span></div>
  </div>
</div>
```

### ARIA When Needed

**Only add ARIA when semantic HTML isn't enough:**
```html
<!-- ✅ Semantic HTML (no ARIA needed) -->
<button>Click me</button>

<!-- ✅ ARIA for custom widget -->
<div role="button" tabindex="0" aria-label="Close">×</div>

<!-- ❌ Redundant ARIA -->
<button role="button" aria-label="Button">Click me</button>
```

### Always Include

```html
<!-- Alt text for images -->
<img src="/santa.png" alt="Santa Claus waving" />

<!-- Label for inputs -->
<label for="name">Name:</label>
<input id="name" type="text" />

<!-- Skip link -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### Reduced Motion

**Always respect:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**In JavaScript:**
```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Disable animations
}
```

---

## TypeScript

### Use Types, Keep Them Simple

```typescript
// ✅ Simple and clear
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// ❌ Overly complex
type ButtonProps = {
  text: string;
  onClick: () => void;
} & (
  | { variant: 'primary'; primary: true }
  | { variant: 'secondary'; primary?: never }
);
```

### Prefer Interfaces Over Types

```typescript
// ✅ Use interface for objects
interface User {
  name: string;
  email: string;
}

// ✅ Use type for unions/primitives
type Theme = 'light' | 'dark';
type ID = string | number;
```

### Let TypeScript Infer When Obvious

```typescript
// ✅ Inference is clear
const count = 0;  // TypeScript knows it's number
const name = 'Alice';  // TypeScript knows it's string

// ✅ Explicit when needed
const data: User[] = [];  // Empty array needs type
```

---

## Git Workflow

### Commit Often, Push Less

**Good commits:**
- Small, focused changes
- One logical change per commit
- Clear commit messages

**Commit message format:**
```
<type>: <subject>

<body (optional)>

🎄 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructure
- `perf`: Performance
- `test`: Tests
- `chore`: Tooling

**Examples:**
```bash
git commit -m "feat: Add video section with YouTube embed"
git commit -m "fix: Snow effect not showing on mobile"
git commit -m "docs: Update README with deployment instructions"
```

### Branch Strategy

**For this project:**
- `main` - Always deployable
- Work directly on `main` for small changes
- Create feature branches for larger features

---

## Testing

### Manual Testing Checklist

**Before committing:**
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Responsive on mobile
- [ ] Dark mode works
- [ ] Keyboard navigation works
- [ ] No console errors

**Before deploying:**
- [ ] Run `npm run build` successfully
- [ ] Run `npm run preview` and test
- [ ] Check Lighthouse score (aim for 95+)
- [ ] Test with slow 3G
- [ ] Test with JavaScript disabled

### Automated Testing (Future)

**Keep it simple:**
- Unit tests for algorithms (Secret Santa logic)
- No need for component tests (visual testing is faster)
- E2E tests only for critical flows

---

## Code Review Checklist

### Before Committing

**Ask yourself:**
- [ ] Is this the simplest solution?
- [ ] Did I remove commented code?
- [ ] Did I remove console.logs?
- [ ] Are variable names clear?
- [ ] Did I add types where needed?
- [ ] Does it follow our conventions?

### Code Smells to Avoid

**Too complex:**
```typescript
// ❌ Hard to understand
const result = data?.items?.filter(i => i.active)?.map(i => ({
  ...i,
  name: i.name?.trim() || 'Unknown'
}))?.sort((a, b) => a.name.localeCompare(b.name)) || [];

// ✅ Clear and simple
const activeItems = data?.items?.filter(item => item.active) || [];
const namedItems = activeItems.map(item => ({
  ...item,
  name: item.name?.trim() || 'Unknown'
}));
const sortedItems = namedItems.sort((a, b) =>
  a.name.localeCompare(b.name)
);
```

**Too clever:**
```typescript
// ❌ Clever but unclear
const greet = n => `Hello${n ? `, ${n}` : ''}!`;

// ✅ Clear intent
function greet(name?: string): string {
  return name ? `Hello, ${name}!` : 'Hello!';
}
```

**Too DRY:**
```typescript
// ❌ Premature abstraction
function processData<T>(data: T[], fn: (item: T) => boolean): T[] {
  return data.filter(fn);
}

const activeUsers = processData(users, u => u.active);
const validItems = processData(items, i => i.valid);

// ✅ Just use filter directly
const activeUsers = users.filter(u => u.active);
const validItems = items.filter(i => i.valid);
```

**Rule of Three:**
- First time: Write it
- Second time: Note the duplication
- Third time: Consider abstracting

---

## Common Pitfalls

### Astro-Specific

**❌ Using browser APIs in frontmatter:**
```astro
---
// This runs on the server!
const theme = localStorage.getItem('theme'); // ❌ localStorage is undefined
---
```

**✅ Use client-side script:**
```astro
<script>
  // This runs in the browser
  const theme = localStorage.getItem('theme');
</script>
```

**❌ Forgetting client directive:**
```astro
<!-- Won't be interactive! -->
<InteractiveComponent />

<!-- ✅ Needs client directive -->
<InteractiveComponent client:load />
```

### React-Specific

**❌ Mutating state directly:**
```tsx
const [items, setItems] = useState([]);
items.push(newItem); // ❌ Mutating state
```

**✅ Create new array:**
```tsx
const [items, setItems] = useState([]);
setItems([...items, newItem]); // ✅ New array
```

### CSS-Specific

**❌ Fighting Pico CSS:**
```css
/* Don't override everything */
button {
  all: unset;
  /* Rebuild from scratch */
}
```

**✅ Extend Pico CSS:**
```css
/* Work with Pico CSS */
button {
  background: var(--color-burgundy);
  /* Pico handles the rest */
}
```

---

## Summary: The Simplicity Checklist

Before adding anything, ask:

### Code
- [ ] Can I do this without a library?
- [ ] Can I use CSS instead of JavaScript?
- [ ] Can I use an Astro component instead of React?
- [ ] Is this the simplest solution?
- [ ] Will I understand this in 6 months?

### Dependencies
- [ ] Do I really need this package?
- [ ] Is there a lighter alternative?
- [ ] Will I use most of its features?
- [ ] What's the bundle size impact?

### Features
- [ ] Does the user need this?
- [ ] Can it wait for v2?
- [ ] Am I over-engineering?
- [ ] Is the MVP good enough?

---

## Remember

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
> — Antoine de Saint-Exupéry

**Keep it simple. Keep it fast. Keep it maintainable.**
