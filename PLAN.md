# Secretest Santa - Phase 1 Implementation Plan

## Executive Summary
Build a warm, cozy Christmas-themed static landing page that educates users about the cryptographic Secret Santa algorithm from Tom 7's video and provides a simplified, single-page experience for creating Secret Santa assignments.

### Quick Overview
- **Project Name**: "The Secretest Santa" (with attribution to Tom 7)
- **Tech Stack**: Astro + React islands + Pico CSS + tsParticles
- **Timeline**: 3-4 weeks (21 days) for fully polished version
- **Primary Feature**: Live in-person card-flip reveal experience
- **Content Approach**: Simple, story-based explanation with video context

### Key User Experience
1. **Hero**: Warm welcome with immediate CTA to create Secret Santa
2. **Story**: Embedded video + simplified algorithm explanation
3. **App**: Add participants → Draw names → Flip cards to reveal (with confetti!)
4. **Credits**: Honor Tom 7, Katie Steckles, Matt Parker, and all participants
5. **Theme**: Christmas colors (burgundy, pine green, cream, gold) with subtle falling snow

### What Makes This Special
- **Educational**: Teaches cryptography concepts through storytelling
- **Interactive**: Beautiful card-flip animations for live group reveals
- **Accessible**: Simple language, fully responsive, WCAG compliant
- **Privacy-First**: 100% client-side, no data sent to servers
- **Attribution**: Clear credit to original creators and video

---

## Technical Stack

### Framework: **Astro** (Chosen for optimal static generation with interactive islands)
- Zero JS by default, progressive enhancement
- Perfect Lighthouse scores
- Component-based architecture
- Easy deployment to any static host

### Styling & Theme
- **Base**: Pico CSS (semantic, minimal framework)
- **Colors**:
  - Burgundy (#800020) - Primary actions
  - Pine Green (#01796F) - Secondary elements
  - Cream (#FFF8DC) - Backgrounds
  - Gold (#DAA520) - Accents and highlights
- **Typography**:
  - Headers: Berkshire Swash or Playfair Display
  - Body: Merriweather
  - Accents: Dancing Script
- **Icons**: Material Design Icons via Iconify

### Effects & Interactions
- **Snow effect**: tsParticles (lightweight, configurable)
- **Animations**: Anime.js for interactive elements + CSS keyframes
- **Particles**: Subtle falling snow, sparkles on hover
- **Dark mode**: Toggle with localStorage persistence

---

## Page Structure & User Flow

### Section 1: Hero / Introduction
**Purpose**: Warm welcome with immediate context

**Content**:
- Main headline: "The Secretest Santa" with festive subtitle
- Brief hook: "A mathematically bulletproof way to exchange gifts"
- Prominent CTA: "Create Your Secret Santa" (scroll to app)
- Secondary CTA: "Learn How It Works" (scroll to explanation)
- Subtle animated snow effect
- Christmas-themed illustration or video thumbnail

**Technical Notes**:
- Intersection Observer for scroll-triggered animations
- Parallax background effect (optional, subtle)

---

### Section 2: The Story (Video Context)
**Purpose**: Connect to the video and build trust through attribution

**Content**:
- Embedded YouTube video (https://www.youtube.com/watch?v=4pG8_bWpmaE)
- Brief intro: "Inspired by Tom 7's brilliant solution to Matt Parker's 'unhackable' Secret Santa"
- Key participants mentioned: Katie Steckles (founder), Matt Parker, Tom 7, Sophie, Yan Misali
- Link to full transcript/summary

**Visual Design**:
- Card-based layout with video embed
- Participant avatars in a circle (representing the cycle)
- Festive card design with subtle shadows

---

### Section 3: The Algorithm Explained (Simplified)
**Purpose**: Demystify the cryptography in accessible terms

**Content Structure**:

#### 3.1 The Problem
- Traditional Secret Santa: Someone knows everything (the organizer)
- Last year's flaw: "Cycle surgery" attack (explain simply)
- The goal: No single person can control or know all assignments

#### 3.2 The Solution (Simplified & Story-Based)
Present as a story, not technical steps:

**"The Magic Hat That Even the Organizer Can't Peek Into"**

Imagine a Secret Santa where even the person running it can't control who gets whom. That's what mathematician Tom 7 figured out for a group of YouTube math nerds.

**The Core Idea:**
- Everyone creates a special "anonymous number" using math
- These numbers get shuffled around in a way nobody can track
- Then they're sorted by size (which is random)
- Your position in the sorted list determines who your Santa is
- You can send messages that only your Santa can read

**Why It Works:**
The system uses math that's easy to calculate one way (like multiplying huge numbers) but impossible to reverse (like un-mixing paint colors). Even with the world's fastest computers, you couldn't cheat the system.

**The Real Story:**
In the video, Matt Parker tried to "cheat" by making the smallest possible number. Someone else figured out who their Santa was by finding a typo in the list. The math was perfect—humans were the weak link!

**Want to try the full cryptographic version?** Visit [tom7.org/santa](http://tom7.org/santa)

**Or just create a Secret Santa right now** with our simplified version below! It's perfect for families and small groups. ⬇️

**Visual Aids**:
- Interactive diagram showing the cycle
- Animated flow of encryption/decryption
- Color-coded roles (You, Your Santa, Your Recipient)
- Timeline visualization of phases

**Technical Implementation**:
- Collapsible sections for "Learn More" details
- Tooltip definitions for terms like "encryption", "discrete log"
- Progressive disclosure (basic → advanced)

---

### Section 4: The Interactive App
**Purpose**: Allow users to create a Secret Santa RIGHT NOW

#### UX Flow Design (Inspired by Party Game Research)

**State 1: Setup Mode**
- Title: "Create Your Secret Santa"
- Organizer name input (optional, just for fun)
- Event name: "Smith Family Christmas 2025"
- Date picker (optional)

**State 2: Add Participants**
- Dynamic row-based entry
- Minimum: 3 participants
- Maximum: 20 participants (reasonable for client-side)
- Fields per participant:
  - Name (required)
  - Email (optional for phase 1, since it's static)
- Add/Remove buttons with smooth animations
- Participant counter: "5 participants added"

**Visual Design**:
- Card-based participant list
- Numbered rows (1. Alice, 2. Bob, etc.)
- Christmas icon next to each name (Santa hat, ornament, etc.)
- "+" button floats at bottom (FAB style)
- Gentle shake animation if trying to delete below minimum

**State 3: Rules & Exclusions (Optional)**
- Collapsible "Advanced Options"
- Exclusion rules: "Alice can't get Bob"
- Visual pairing interface (drag-and-drop or checkboxes)
- Budget suggestion field

**State 4: Generate Assignments**
- Big festive "Draw Names!" button
- Loading animation (spinning ornament, countdown)
- Confetti/celebration effect on completion

**State 5: Results Display** (Live In-Person Mode)
- **Primary Mode**: Live group reveal for in-person gatherings
  - Display all participants as face-down "cards"
  - Click each participant's card to flip and reveal their assignment
  - 3D card flip animation (rotateY transform)
  - Confetti burst on each reveal
  - Progress indicator: "3 of 10 revealed"
  - "Reveal All" button (with confirmation) for quick display

- **Secondary Option**: Individual links (stretch goal)
  - "Send Private Links" button generates unique URLs
  - Each person can check on their own device
  - Useful for mixed in-person/remote groups

**State 6: Share & Save**
- Download assignments as PDF
- Copy all links as list
- Email option (mailto links in phase 1)
- "Create Another" button

#### Technical Implementation Details

**Data Structure**:
```javascript
{
  eventName: string,
  date: Date,
  participants: [
    { id: string, name: string, email: string }
  ],
  exclusions: [
    { from: string, to: string }
  ],
  assignments: [
    { santa: string, recipient: string }
  ],
  sessionId: string (for URL state)
}
```

**Algorithm (Simplified for Phase 1)**:
- Shuffle participants array (Fisher-Yates)
- Create cyclic permutation (person[i] gives to person[i+1])
- Validate against exclusions
- Regenerate if validation fails
- Use crypto.getRandomValues() for secure randomness

**State Management**:
- Local storage for persistence
- URL hash for sharing results (#session=abc123)
- No server required (fully client-side)

**Animations**:
- Button hover: Scale + glow effect
- Name entry: Fade in from top
- Draw animation: Spinning wheel or shuffling cards
- Reveal: Card flip (rotateY transform)
- Confetti: tsParticles burst

**Responsive Design**:
- Mobile: Single column, bottom-sheet style
- Tablet: Two columns for participant list
- Desktop: Centered card (max-width 800px)

---

### Section 5: Credits & Attribution
**Purpose**: Honor the creators and build trust

**Content**:
- "Created with inspiration from Tom 7's Secretest Santa 2025"
- Link to original video
- Participant list with links:
  - Tom 7 (suckerpinch) - Algorithm designer
  - Katie Steckles - Tradition founder
  - Matt Parker (Stand-up Maths) - Original challenge
  - Sophie (Chair)
  - Yan Misali (Best Hack winner)
  - Matt Godbolt, Peter Rowlet, Jeff Marshall, Sam Hartburn, Matt Scroggs, Ben Sparks
- Link to tom7.org/santa for full technical details
- "This simplified version uses browser-based randomness instead of full ElGamal encryption"
- Open source notice (if applicable)
- Privacy statement: "All data stays in your browser. Nothing is sent to any server."

**Visual Design**:
- Circular avatar layout (like the Secret Santa cycle)
- Hover effects revealing person's role
- Festive "Thank You" heading

---

### Section 6: FAQ / Learn More
**Purpose**: Answer common questions and provide depth

**Questions**:
1. How is this different from other Secret Santa websites?
   - Explain the cryptographic inspiration
   - Note this is simplified for ease of use

2. Is it really secure?
   - Explain client-side processing
   - Note: For maximum security, use Tom 7's full implementation

3. What if someone wants to cheat?
   - Explain the trust model
   - Reference Matt Parker's "grind" and Yan's "OpSec hack"

4. Can I use this for my family/office?
   - Yes! Works for any group size
   - Privacy-first design

5. What about the full cryptographic version?
   - Link to Phase 2 (coming soon)
   - Link to Tom 7's tool

---

## Component Architecture (Astro)

### File Structure
```
src/
├── layouts/
│   └── Layout.astro (Base layout with head, fonts, global styles)
├── components/
│   ├── Hero.astro (Section 1)
│   ├── VideoSection.astro (Section 2)
│   ├── AlgorithmExplainer.astro (Section 3)
│   │   ├── ProblemCard.astro
│   │   ├── SolutionSteps.astro
│   │   └── SecurityExplainer.astro
│   ├── SecretSantaApp.astro (Section 4 container)
│   │   ├── SetupForm.tsx (React island for interactivity)
│   │   ├── ParticipantList.tsx
│   │   ├── ExclusionManager.tsx
│   │   ├── AssignmentGenerator.tsx
│   │   └── ResultsDisplay.tsx
│   ├── Credits.astro (Section 5)
│   ├── FAQ.astro (Section 6)
│   ├── SnowEffect.astro (Background effect)
│   └── DarkModeToggle.tsx (React island)
├── styles/
│   ├── global.css (Pico CSS overrides, theme variables)
│   ├── christmas-theme.css (Festive colors, animations)
│   └── animations.css (Keyframes, transitions)
├── scripts/
│   ├── secret-santa-algorithm.ts (Core logic)
│   └── snowfall.ts (Particle initialization)
└── pages/
    └── index.astro (Main page composition)
```

### Interactive Islands (Using React)
- **SetupForm**: Participant management (client:load)
- **AssignmentGenerator**: Algorithm execution (client:idle)
- **ResultsDisplay**: Reveal animations (client:visible)
- **DarkModeToggle**: Theme switcher (client:load)

---

## Animation & Interaction Details

### Snow Effect
- **Library**: tsParticles
- **Settings**:
  - Particle count: 50-100 (depending on viewport)
  - Speed: Slow drift
  - Opacity: 0.3-0.8 (subtle)
  - Size: 2-6px
  - Reduced motion: Respect prefers-reduced-motion

### Scroll Animations
- **Trigger**: Intersection Observer
- **Effects**:
  - Fade in + slide up for sections
  - Stagger for participant list items
  - Scale for buttons on hover

### Button Interactions
- **Primary CTA**:
  - Hover: Scale 1.05, glow effect
  - Active: Scale 0.95
  - Sparkle particle burst on click
- **Add Participant**:
  - Ripple effect
  - New row slides in from top
- **Draw Names**:
  - Disabled state while processing
  - Loading spinner (Christmas ornament)
  - Pulse animation

### Reveal Animations (Detailed Card Flip Design)

#### Card Design Specifications
- **Dimensions**: 200x300px (portrait), responsive scaling
- **Front Face**:
  - Participant name (24px, Berkshire Swash)
  - Christmas icon (Santa hat, gift, ornament) - randomized per card
  - Gradient background (cream to light gold)
  - Border: 2px solid gold with subtle glow
  - Shadow: 0 4px 6px rgba(0,0,0,0.1)
- **Back Face**:
  - "🎁 [Recipient Name] is your Secret Santa!"
  - Larger text (18px body, 28px name)
  - Festive background (pine green with snowflake pattern)
  - Same border and shadow as front

#### Flip Animation Mechanics
- **Trigger**: Click anywhere on card
- **Transform**: rotateY(0deg) → rotateY(180deg)
- **Duration**: 600ms
- **Easing**: cubic-bezier(0.4, 0.0, 0.2, 1) (Material Design standard)
- **Perspective**: 1000px (parent container)
- **Backface visibility**: hidden (prevents see-through during flip)
- **Z-index management**: Ensure flipping card appears above neighbors

#### Hover States
- **Unrevealed cards**:
  - Scale: 1.05
  - Cursor: pointer
  - Glow effect: box-shadow increase
  - Transition: 200ms ease
- **Revealed cards**:
  - Cursor: default
  - Opacity: 0.8 (visually de-emphasized)
  - No scale on hover

#### Grid Layout
- **Desktop (>1024px)**: 4 cards per row
- **Tablet (768-1023px)**: 3 cards per row
- **Mobile (640-767px)**: 2 cards per row
- **Small mobile (<640px)**: 1 card per row
- **Gap**: 24px between cards
- **Container**: Centered, max-width 1200px

#### Confetti Burst
- **Trigger**: Simultaneous with card flip (at 300ms - halfway point)
- **Origin**: Center of card
- **Particle count**: 40-60 particles
- **Colors**: #C41E3A (red), #0F5132 (green), #FFD700 (gold)
- **Shapes**: Mixed (circle, square, triangle)
- **Velocity**: Radial burst with gravity
- **Duration**: 2 seconds total
- **Library**: tsParticles with confetti preset

#### Progress Tracking
- **Display**: "X of Y revealed" below grid
- **Update**: Real-time on each flip
- **Completion**: Special message when all revealed
- **Reset button**: Appears after all revealed

---

## Accessibility Considerations

### WCAG Compliance
- Color contrast: Minimum 4.5:1 for text
- Keyboard navigation: Tab order, focus indicators
- Screen reader: ARIA labels, semantic HTML
- Reduced motion: Respect prefers-reduced-motion media query

### Features
- Skip to main content link
- Alt text for all images
- Form labels properly associated
- Error messages announced to screen readers
- Focus trap in modals

---

## Performance Optimization

### Critical Path
1. Load HTML + critical CSS (inline)
2. Load fonts (font-display: swap)
3. Hydrate interactive components (defer)
4. Initialize snow effect (requestIdleCallback)

### Bundle Size Targets
- Initial HTML: < 50KB
- Critical CSS: < 20KB
- JavaScript (total): < 100KB
- Fonts: Subset to used characters
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

### Techniques
- Code splitting (Astro automatic)
- Image optimization (Astro Image)
- Lazy loading for below-fold content
- Service worker for offline (optional)

---

## Content Writing Guidelines

### Tone & Voice
- Warm and welcoming (like explaining to family)
- Technically accurate but accessible
- Playful but not childish
- Christmas spirit without being overwhelming

### Simplification Rules
- Avoid jargon unless explaining it
- Use analogies ("like putting names in a magic hat")
- Break complex ideas into bullet points
- Provide "Learn More" links for depth
- Use active voice
- Short paragraphs (2-3 sentences max)

### Example Rewrites
❌ "The ElGamal cryptosystem utilizes the computational intractability of the discrete logarithm problem in a finite cyclic group."

✅ "The algorithm uses special math where it's easy to calculate a number, but impossible to work backwards—even for the fastest computers."

---

## Development Phases

### Phase 1.1: Foundation (Week 1)
- Set up Astro project
- Install dependencies (Pico CSS, tsParticles, Anime.js)
- Configure Tailwind (optional) or stick with Pico
- Create base layout and global styles
- Implement dark mode toggle
- Set up Christmas theme variables

**Deliverable**: Empty page with theme, snow effect, dark mode

### Phase 1.2: Content Sections (Week 1-2)
- Build Hero section with CTA
- Add VideoSection with YouTube embed
- Create AlgorithmExplainer with collapsible sections
- Write simplified explanations
- Add visual diagrams (can use Excalidraw or similar)
- Implement scroll animations

**Deliverable**: Static informational page

### Phase 1.3: Interactive App (Week 2-3)
- Build SetupForm component
- Implement ParticipantList with add/remove
- Create secret-santa-algorithm.ts
- Implement AssignmentGenerator
- Build ResultsDisplay with reveal options
- Add share functionality (copy links, QR codes)
- Implement confetti effects

**Deliverable**: Working Secret Santa generator

### Phase 1.4: Credits & Polish (Week 3)
- Add Credits section with avatars
- Create FAQ section
- Add footer with privacy notice
- Implement all hover effects
- Polish animations
- Cross-browser testing

**Deliverable**: Complete landing page

### Phase 1.5: Optimization & Deployment (Week 4)
- Lighthouse audit and optimization
- Accessibility testing
- Responsive design testing (mobile, tablet, desktop)
- Add meta tags for social sharing
- Deploy to Netlify/Vercel/GitHub Pages
- Set up custom domain (optional)

**Deliverable**: Live production site

---

## Testing Checklist

### Functional Testing
- [ ] Secret Santa algorithm produces valid cycles
- [ ] Exclusion rules properly enforced
- [ ] All participants assigned exactly once
- [ ] Copy link functionality works
- [ ] Dark mode persists across sessions
- [ ] Form validation prevents invalid states

### Visual Testing
- [ ] Snow effect performs smoothly
- [ ] Animations respect reduced motion
- [ ] Colors pass contrast checks
- [ ] Typography scales properly
- [ ] Mobile layout works on small screens
- [ ] Tablet layout uses space efficiently
- [ ] Desktop layout centers properly

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (iOS and macOS)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly (NVDA, VoiceOver)
- [ ] Focus indicators visible
- [ ] Color not sole indicator of meaning
- [ ] Zoom to 200% works

---

## Deployment Strategy

### Hosting Options (All Free Tier Available)
1. **Netlify** (Recommended)
   - Auto-deploy from Git
   - Custom domains
   - HTTPS by default
   - Form handling (future)

2. **Vercel**
   - Similar to Netlify
   - Excellent Astro support
   - Edge functions (future)

3. **GitHub Pages**
   - Free for public repos
   - Custom domain support
   - GitHub Actions for CI/CD

4. **Cloudflare Pages**
   - Fast global CDN
   - Free tier generous
   - Workers for future expansion

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

### Environment Variables (None needed for Phase 1)

---

## Future Enhancements (Phase 2 Preview)

### Distributed Cryptographic Version
- Full ElGamal implementation
- Multi-round shuffle with session keys
- Public key generation and exchange
- Encrypted messaging system
- "Chair" role with verification

### Features to Add
- Email delivery system (backend required)
- Wishlist management
- Anonymous chat
- PWA support
- Multi-language support

---

## Key Differences: Phase 1 vs Full Cryptographic System

| Feature | Phase 1 (Simplified) | Full System (Video) |
|---------|---------------------|---------------------|
| **Randomness** | Browser crypto.getRandomValues() | ElGamal with large primes |
| **Privacy** | Client-side only | Public key cryptography |
| **Assignment** | Direct shuffle | Encrypted shuffle + reveal |
| **Trust Model** | Trust the device | Distributed, no single authority |
| **Exclusions** | Built-in validation | Not supported (cycle requirement) |
| **Scalability** | 3-20 participants | Unlimited (video had 13) |
| **Messaging** | External (email/SMS) | Encrypted in-system |
| **Complexity** | Simple, user-friendly | Mathematically rigorous |

---

## Success Metrics

### User Experience
- Time to create Secret Santa: < 2 minutes
- Zero confusion about next steps
- "This is beautiful" reactions
- Shares on social media

### Technical
- Lighthouse score: 95+ across all categories
- Bundle size: < 150KB total
- First paint: < 1s
- No console errors

### Engagement
- Average time on page: > 3 minutes
- Scroll depth: > 80% reach Section 3
- App usage: > 60% create assignments
- Return visits: Dark mode preference saved

---

## User Preferences (Confirmed)

1. **Branding**: ✅ Keep "Secretest Santa" with clear attribution to Tom 7
2. **Reveal Method**: ✅ Live in-person reveal (click to flip cards one by one)
3. **Technical Depth**: ✅ Simple and accessible (link to video for details)
4. **Timeline**: ✅ Full polished version in 3-4 weeks

## Open Questions (Lower Priority)

1. **Video embedding**: Full embed or just thumbnail with link?
2. **Participant avatars**: Generate random (dicebear.com) or use initials?
3. **QR codes**: Include in Phase 1 or defer to Phase 2?
4. **PDF generation**: Client-side with jsPDF or just printable HTML?
5. **Analytics**: Google Analytics, Plausible, or none?
6. **Domain**: Will you register a custom domain or use free hosting subdomain?

---

## Recommended Tools & Libraries

### Core
- Astro 5.x
- React 18.x (for islands)
- TypeScript
- Pico CSS

### Effects
- tsParticles (snow, confetti)
- Anime.js (animations)

### Utilities
- date-fns (date handling)
- nanoid (ID generation)
- qr-code-generator (if QR codes)
- jsPDF (if PDF export)

### Development
- Prettier (formatting)
- ESLint (linting)
- TypeScript (type safety)
- Vitest (testing, optional)

---

## Estimated Timeline

**Total: 3-4 weeks** (assuming 10-15 hours/week)

- Week 1: Setup + Foundation + Static Content (60%)
- Week 2: Interactive App (70%)
- Week 3: Polish + Credits + FAQ (90%)
- Week 4: Testing + Optimization + Deployment (100%)

**MVP (Minimal Viable Product)**: 2 weeks
- Basic theme + Hero + Simplified App
- No fancy animations
- Skip FAQ and detailed explanations
- Deploy and iterate

---

## Implementation Order (Detailed)

### Sprint 1: Foundation (Days 1-5)
**Goal**: Working environment with theme

1. **Day 1**: Project setup
   - `npm create astro@latest` with TypeScript
   - Install dependencies: Pico CSS, tsParticles, Anime.js
   - Set up Git, .gitignore, basic README
   - Configure ESLint, Prettier

2. **Day 2**: Base theme and layout
   - Create Layout.astro with HTML structure
   - Set up Christmas color variables
   - Implement dark mode toggle with localStorage
   - Add Google Fonts (Berkshire Swash, Merriweather)

3. **Day 3**: Snow effect and hero
   - Integrate tsParticles for snow
   - Build Hero section with CTA buttons
   - Add scroll-to-section smooth scrolling
   - Test responsive layout

4. **Day 4**: Video and story section
   - Embed YouTube video
   - Write simplified story copy
   - Create VideoSection component
   - Add participant avatars (simple circles with initials)

5. **Day 5**: Algorithm explainer section
   - Write "Magic Hat" copy
   - Create collapsible "Learn More" sections
   - Add visual diagram (can use Excalidraw SVG)
   - Implement scroll animations

**Deliverable**: Static informational page with theme

### Sprint 2: Core App (Days 6-12)
**Goal**: Working Secret Santa generator

6. **Day 6**: Setup form UI
   - Build ParticipantList React component
   - Add/remove participants with animations
   - Input validation (minimum 3)
   - Event name and date inputs

7. **Day 7**: Algorithm implementation
   - Write secret-santa-algorithm.ts
   - Implement Fisher-Yates shuffle
   - Create cyclic assignment (i → i+1)
   - Add exclusion rule validation
   - Unit tests for algorithm

8. **Day 8**: Generate button and states
   - "Draw Names!" button with loading state
   - Spinning ornament animation
   - Handle edge cases (duplicate names, etc.)
   - Store results in component state

9. **Day 9**: Card flip UI
   - Create Card component
   - Implement 3D flip with CSS
   - Grid layout (responsive)
   - Card states (unrevealed, revealed)

10. **Day 10**: Reveal interactions
    - Click handler for card flip
    - Confetti burst on reveal
    - Progress indicator
    - "Reveal All" button with confirmation

11. **Day 11**: Polish app UX
    - Add micro-interactions (hover effects)
    - Improve animations (stagger, timing)
    - Error handling and edge cases
    - Loading states

12. **Day 12**: Integration and testing
    - Connect all app components
    - Test full flow start to finish
    - Fix bugs
    - Mobile testing

**Deliverable**: Working interactive Secret Santa app

### Sprint 3: Content & Credits (Days 13-17)
**Goal**: Complete informational content

13. **Day 13**: Credits section
    - List all video participants
    - Add avatars or icons
    - Link to their channels/websites
    - Circular layout showing the "cycle"

14. **Day 14**: FAQ section
    - Write 5-7 common questions
    - Collapsible accordion UI
    - Link to video and Tom 7's site
    - Privacy and security explanations

15. **Day 15**: Footer and metadata
    - Footer with attribution
    - Social meta tags (Open Graph, Twitter)
    - Favicon and app icons
    - Privacy statement

16. **Day 16**: Content polish
    - Proofread all copy
    - Check tone consistency
    - Verify all links work
    - Add alt text to images

17. **Day 17**: Visual polish
    - Adjust spacing and rhythm
    - Fine-tune colors
    - Add subtle hover effects
    - Ensure visual hierarchy

**Deliverable**: Complete content with credits

### Sprint 4: Polish & Deploy (Days 18-21)
**Goal**: Production-ready site

18. **Day 18**: Performance optimization
    - Lighthouse audit (aim for 95+)
    - Optimize images
    - Minimize bundle size
    - Add loading="lazy" to images

19. **Day 19**: Accessibility audit
    - Keyboard navigation testing
    - Screen reader testing (VoiceOver/NVDA)
    - Color contrast checks
    - ARIA labels where needed
    - Focus indicators

20. **Day 20**: Cross-browser testing
    - Test on Chrome, Firefox, Safari
    - Mobile browsers (iOS Safari, Chrome Android)
    - Fix any browser-specific issues
    - Test dark mode on all browsers

21. **Day 21**: Deployment
    - Create Netlify/Vercel account
    - Connect GitHub repo
    - Configure build settings
    - Deploy to production
    - Test live site
    - Share with stakeholders

**Deliverable**: Live production site

## Next Steps

1. ✅ **User preferences confirmed**
2. **Set up project repository** (create GitHub repo)
3. **Initialize Astro project** with chosen config
4. **Begin Sprint 1** following implementation order above

---

## Resources & References

### Video & Original Work
- Tom 7's Video: https://www.youtube.com/watch?v=4pG8_bWpmaE
- Tom 7's Tool: http://tom7.org/santa

### Technical Documentation
- Astro Docs: https://docs.astro.build
- tsParticles: https://particles.js.org
- Anime.js: https://animejs.com
- Pico CSS: https://picocss.com

### Design Inspiration
- Bedimcode Christmas Website: github.com/bedimcode/responsive-christmas-website
- Material Design: material.io
- Coolors: coolors.co

### UX Research
- Secret Santa apps: Elfster, DrawNames
- Party games: Skribbl.io, Jackbox
- Landing pages: Product Hunt, Dribbble

---

## Final Notes

This plan prioritizes **user experience** and **accessibility** while honoring the mathematical brilliance of Tom 7's work. Phase 1 makes the concept accessible to families and small groups, while laying groundwork for the fully distributed cryptographic version in Phase 2.

The key is balancing **festive warmth** with **technical accuracy**—making users feel cozy while respecting the intelligence of those who understand the underlying cryptography.
  