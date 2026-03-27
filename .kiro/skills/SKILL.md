---
inclusion: always
name: Frontend Scroll Diagnostics
description: Diagnose and fix scrolling glitches, inconsistencies, and GSAP scroll behavior issues across React/frontend web pages
keywords: scroll, scrolling, GSAP, ScrollTrigger, Framer Motion, useScroll, scroll-snap, body overflow, scroll restoration, scroll glitch, scroll behavior, scroll container, scroll lock
---

# Frontend Scroll Diagnostics Skill

A comprehensive skill for identifying and fixing scrolling issues in modern React applications, with special attention to GSAP ScrollTrigger, Framer Motion, scroll snap, and cross-page scroll consistency.

## When to Apply This Skill

Apply this skill when diagnosing scrolling issues in React/frontend applications, particularly when:

- User reports scrolling glitches between pages or routes
- Different pages have inconsistent scroll behavior
- GSAP ScrollTrigger animations cause scroll problems
- Page jumps unexpectedly during navigation
- Scroll snap points don't align correctly
- Body overflow is being set incorrectly across routes
- ScrollTrigger instances aren't cleaning up properly
- Framer Motion's useScroll hooks conflict with other scroll logic
- Custom scroll containers interfere with normal page scrolling

## Problem Categories

This skill addresses:

1. **Cross-page scroll inconsistencies** - Different overflow behaviors across routes
2. **GSAP ScrollTrigger conflicts** - Animations not cleaning up on unmount
3. **Scroll restoration issues** - Page jumping on navigation or back button
4. **Body scroll lock conflicts** - Pages fighting for scroll control
5. **Scroll snap glitches** - Snap points not aligning correctly
6. **Framer Motion scroll conflicts** - useScroll hooks conflicting with other scroll logic

## Diagnostic Approach

### Step 1: Map the Scroll Architecture

Identify how scrolling is handled across the application by examining:

**Global Scroll Configuration**
Check global CSS files (index.css, App.css, globals.css) for scroll-affecting rules:

```css
/* Red flags to look for: */
body {
  overflow: hidden; /* Global body lock */
  height: 100vh;    /* Fixed height on body */
}

html {
  scroll-behavior: smooth; /* Can conflict with GSAP */
}
```

**Page-Specific Scroll Patterns**

Identify which pattern each page uses:

- **Pattern A: Native Body Scroll** - Default browser scroll behavior (most pages)
- **Pattern B: Fixed Container with Internal Scroll** - Custom scroll container with body locked
- **Pattern C: GSAP ScrollTrigger with Body Scroll** - Animations driven by window scroll position

### Step 2: Identify Common Root Causes

#### Root Cause A: Body Overflow Not Restored on Route Change

**Symptoms:**
- Navigating from Tools page → Home page leaves body locked
- Some pages scrollable, others aren't
- Scrollbar disappears/reappears unexpectedly

**Diagnosis:**
```typescript
// Tools.tsx (or similar fixed-scroll page)
useEffect(() => {
  document.body.style.overflow = 'hidden';
  
  // ❌ PROBLEM: No cleanup function
  // When user navigates away, body stays locked
}, []);
```

**Fix:**
```typescript
useEffect(() => {
  const originalOverflow = document.body.style.overflow;
  const originalHeight = document.body.style.height;
  
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  
  return () => {
    // ✅ CRITICAL: Restore original styles
    document.body.style.overflow = originalOverflow;
    document.body.style.height = originalHeight;
  };
}, []);
```

#### Root Cause B: ScrollTrigger Not Cleaning Up

**Symptoms:**
- Scroll feels janky after visiting a page with GSAP
- Console errors about missing triggers
- Animations trigger on wrong pages

**Diagnosis:**
```typescript
// Home.tsx uses GSAP ScrollTrigger
useEffect(() => {
  gsap.to('.hero-title', { /* ... */ });
  
  // ❌ PROBLEM: ScrollTrigger instances not killed
  // They keep running even after unmount
}, []);
```

**Fix:**
```typescript
useEffect(() => {
  const loadGSAP = async () => {
    // ... setup GSAP ...
    
    gsap.to('.hero-title', {
      scrollTrigger: { /* ... */ }
    });
  };
  
  loadGSAP();
  
  return () => {
    // ✅ Kill all ScrollTrigger instances
    window.ScrollTrigger?.getAll()?.forEach((trigger: any) => trigger.kill());
  };
}, []);
```

#### Root Cause C: Router Scroll Restoration Conflicts

**Symptoms:**
- Page jumps to top when it shouldn't
- Hash links don't work
- Scroll position lost on back button

**Diagnosis:**
```typescript
// App.tsx router setup
useEffect(() => {
  window.scrollTo(0, 0); // ❌ Always scrolls to top, even with hash
}, [location]);
```

**Fix:**
```typescript
useEffect(() => {
  // Only scroll to top if there's no hash
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  } else {
    // Handle hash scroll with timeout for DOM load
    setTimeout(() => {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}, [location]);
```

#### Root Cause D: Framer Motion useScroll Container Mismatch

**Symptoms:**
- Scroll progress not tracking correctly
- Animations out of sync with scroll
- Last slide "jumps" or doesn't fully animate

**Diagnosis:**
```typescript
// Tools.tsx - using both scroll snap AND Framer Motion
const { scrollYProgress } = useScroll({
  container: scrollContainerRef,
});

// Problem: Progress calculation doesn't account for snap alignment
const x = useTransform(progress, [0, 1], ["0%", `-${(totalSlides - 1) * 100}%`]);
```

**Fix:**
```typescript
// For the last module, clamp the transform to prevent overscroll
const contentAlign = useTransform(
  progress,
  [
    midToPrev, 
    actualSnapPoint, 
    index === totalSlides - 1 ? 1.0 : midToNext  // ✅ Clamp at 1.0
  ],
  [
    30, 
    0, 
    index === totalSlides - 1 ? 0 : -30  // ✅ Stay at 0
  ]
);
```

#### Root Cause E: Scroll Snap Section Height Mismatch

**Symptoms:**
- Snap points don't align correctly
- Last section feels "off"
- Can't scroll to the very bottom

**Diagnosis:**
```typescript
// Total scroll height calculation
<div className="h-[500vh]"> {/* 5 sections × 100vh */}
  {/* But actual snap sections might not add up correctly */}
</div>
```

**Fix:**
```typescript
// Ensure total height matches snap sections exactly
const totalSections = EXTENSIONS.length; // 5
<div className="h-[500vh]"> {/* 5 × 100vh = 500vh ✅ */}
  <div className="absolute top-0 left-0 w-full h-full">
    {EXTENSIONS.map((tool) => (
      <div key={`snap-${tool.id}`} className="snap-section h-screen" />
    ))}
  </div>
</div>
```

### Step 3: Apply Systematic Debugging Workflow

Follow this checklist when diagnosing scroll issues:

**Phase 1: Map Current Scroll States**
- Read all page components to identify scroll patterns
- Look for `document.body.style.overflow` modifications
- Find `useScroll` hooks from Framer Motion
- Locate `ScrollTrigger.create()` calls from GSAP
- Check for `className="h-screen fixed"` patterns
- Identify `overflow-y-scroll`, `overflow-hidden` usage
- Find `scroll-snap-type` CSS declarations

**Phase 2: Trace Navigation Flow**
- Check App.tsx or router configuration
- Verify scroll restoration logic handles:
  - Normal navigation
  - Hash navigation (#section-id)
  - Back/forward button
  - Initial page load

**Phase 3: Test Cross-Page Transitions**
- Map the flow between pages with different scroll patterns
- Verify body.style.overflow state changes
- Check ScrollTrigger instance lifecycle
- Confirm scrollTo(0,0) is called appropriately

**Phase 4: Verify Cleanup Functions**
- Every useEffect that touches scroll behavior MUST have cleanup
- Ensure original state is saved before modification
- Confirm restoration happens in return function

## Fix Pattern Library

Use these proven patterns when implementing fixes:

#### Pattern 1: Scroll Lock with Restore
```typescript
useEffect(() => {
  // Save original values
  const originalOverflow = document.body.style.overflow;
  const originalHeight = document.body.style.height;
  
  // Apply lock
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  
  // Restore on unmount
  return () => {
    document.body.style.overflow = originalOverflow;
    document.body.style.height = originalHeight;
  };
}, []);
```

#### Pattern 2: GSAP ScrollTrigger Lifecycle
```typescript
useEffect(() => {
  const loadGSAP = async () => {
    // Load GSAP dynamically
    if (!window.gsap) {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Create animations
    gsap.to('.element', {
      scrollTrigger: {
        trigger: '.section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 200
    });
  };

  loadGSAP();

  // Kill all triggers on unmount
  return () => {
    window.ScrollTrigger?.getAll()?.forEach((trigger: any) => trigger.kill());
  };
}, []);
```

#### Pattern 3: Smart Router Scroll Restoration
```typescript
const [location] = useLocation();

useEffect(() => {
  // Don't interfere with hash navigation
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  } else {
    // Scroll to hash target after DOM renders
    setTimeout(() => {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}, [location]);
```

#### Pattern 4: Scroll Snap Container Setup
```typescript
// CSS
const styles = `
  .snap-container {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;
    width: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .snap-container::-webkit-scrollbar {
    display: none;
  }
  .snap-section {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    height: 100vh;
    width: 100%;
  }
`;

// Component
<div className="h-screen w-full fixed inset-0">
  <div ref={scrollContainerRef} className="snap-container">
    <div className="h-[500vh]"> {/* Total height = sections × 100vh */}
      {/* Visual layer (sticky) */}
      <div className="sticky top-0 h-screen">
        {/* Animated content */}
      </div>
      
      {/* Snap sections (absolute, stacked) */}
      <div className="absolute top-0 left-0 w-full h-full">
        {items.map((item) => (
          <div key={item.id} className="snap-section" />
        ))}
      </div>
    </div>
  </div>
</div>
```

## Testing & Verification Strategy

After applying fixes, systematically test these scenarios:

### Navigation Flow Tests
1. **Home → Tools → Home**
   - Verify Home page scrolls normally after visiting Tools
   - Check body.style.overflow is restored
   - Confirm GSAP animations work on second Home visit

2. **Tools → Pricing → Back to Tools**
   - Verify Tools scroll container still works
   - Check snap behavior is consistent
   - Ensure no scroll jump on navigation

3. **Direct URL Access**
   - Load Tools page directly
   - Load Home page directly
   - Verify each page initializes scroll correctly

### Scroll State Tests
```typescript
// Add temporary debugging
useEffect(() => {
  console.log('Page mounted:', {
    bodyOverflow: document.body.style.overflow,
    bodyHeight: document.body.style.height,
    scrollTriggers: window.ScrollTrigger?.getAll()?.length || 0
  });

  return () => {
    console.log('Page unmounting, cleaning up...');
  };
}, []);
```

### Browser DevTools Checks
1. Open Elements panel → Computed styles
2. Inspect `<body>` element
3. Navigate between pages
4. Watch for `overflow` and `height` style changes
5. Verify they reset correctly

## Common CSS Conflicts

Watch for these problematic CSS patterns:

```css
/* ❌ Global body locks can cause issues */
body {
  overflow: hidden !important; /* Overrides everything */
  height: 100vh; /* Prevents content flow */
}

/* ❌ Conflicting scroll behaviors */
html {
  scroll-behavior: smooth; /* Can conflict with GSAP scrub */
}

/* ✅ Better approach - use data attributes */
body[data-scroll-locked="true"] {
  overflow: hidden;
  height: 100vh;
}

/* Then in React: */
document.body.dataset.scrollLocked = 'true';
```

## Advanced Debugging Techniques

### Visual Progress Debugging
```typescript
// Add visual progress indicator
const [debugProgress, setDebugProgress] = useState(0);

useEffect(() => {
  const unsubscribe = smoothProgress.on('change', (v) => {
    setDebugProgress(v);
    console.log('Scroll progress:', v);
  });
  return () => unsubscribe();
}, [smoothProgress]);

// Render progress bar
<div className="fixed top-0 left-0 w-full h-1 bg-red-500 z-[9999]">
  <div 
    className="h-full bg-green-500" 
    style={{ width: `${debugProgress * 100}%` }} 
  />
</div>
```

### ScrollTrigger State Inspection
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    const triggers = window.ScrollTrigger?.getAll() || [];
    console.log('Active ScrollTriggers:', triggers.length, triggers);
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

## Implementation Checklist

Use this checklist when diagnosing and fixing scroll issues:

**Initial Diagnosis**
- [ ] Check for body.style.overflow modifications without cleanup
- [ ] Verify ScrollTrigger.kill() is called on unmount
- [ ] Ensure scroll restoration logic handles hash navigation
- [ ] Confirm total scroll height matches snap section count
- [ ] Look for conflicting scroll-behavior CSS

**Testing**
- [ ] Test navigation flow between all page pairs
- [ ] Verify cleanup functions exist for all scroll effects
- [ ] Check for !important CSS rules overriding JavaScript
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Verify mobile scroll behavior (touch vs. mouse wheel)

**Code Quality**
- [ ] All useEffect hooks with scroll modifications have cleanup
- [ ] Original scroll state is saved before modification
- [ ] GSAP ScrollTrigger instances are properly killed
- [ ] Router scroll restoration handles edge cases
- [ ] No global CSS rules conflict with page-specific scroll

## Communication Guidelines

When explaining scroll fixes to users:

1. **Identify the issue clearly**: "I found X issues affecting scroll behavior"
2. **Explain root cause**: Use plain language to describe why it's happening
3. **Show before/after code**: Demonstrate the problematic pattern and the fix
4. **Explain the solution**: Describe why the fix resolves the issue
5. **Provide testing steps**: Give clear instructions for verification

**Example explanation:**
> "The Tools page locks body scroll to create its custom scroll container, but wasn't restoring the original scroll behavior on navigation. When you go from Tools → Home, the body stays locked and Home can't scroll. I've added a cleanup function that saves the original overflow style and restores it on unmount, ensuring each page gets a fresh slate."

## File Location Reference

Typical locations to check in React applications:

```
/src
├── App.tsx              ← Router scroll restoration
├── index.css            ← Global scroll CSS rules
├── pages/
│   ├── Home.tsx         ← GSAP ScrollTrigger usage
│   ├── Tools.tsx        ← Custom scroll container
│   ├── Pricing.tsx      ← Standard body scroll
│   └── [Other].tsx      ← Check all page components
└── components/
    └── Header.tsx       ← May handle scroll locking for mobile menus
```

## Key Principles

1. **Always restore original scroll state on unmount** - This is the #1 cause of scroll issues
2. **Kill ScrollTrigger instances** - Prevents memory leaks and cross-page conflicts
3. **Handle hash navigation separately** - Don't scroll to top when hash is present
4. **Test cross-page flows** - Individual pages may work, but transitions can break
5. **Focus on cleanup, not setup** - Most scroll issues are about missing cleanup functions

Scrolling problems are almost always about what happens when a component unmounts, not when it mounts.
