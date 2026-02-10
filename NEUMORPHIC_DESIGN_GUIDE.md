# Neumorphic Design System Guide

## Branch Management

### Current Setup
- **Main Branch**: `main` - Your current working version (safe)
- **Neumorphic Branch**: `design/neumorphic` - New design experiments (active now)

### Git Workflow

#### Switch Between Branches
```bash
# Switch to main (current design)
git checkout main

# Switch to neumorphic (new design)
git checkout design/neumorphic
```

#### Save Your Work
```bash
# On neumorphic branch
git add .
git commit -m "Update neumorphic design"
git push origin design/neumorphic
```

#### Deploy Neumorphic to Preview
```bash
# Push to see on Netlify preview
git push origin design/neumorphic
```
Netlify will create a preview URL like: `design-neumorphic--yoursite.netlify.app`

#### Merge to Main (when ready)
```bash
git checkout main
git merge design/neumorphic
git push origin main
```

## Neumorphic Design Principles

### What is Neumorphism?
Neumorphism (New + Skeuomorphism) creates soft, extruded plastic-looking UI elements that appear to emerge from or sink into the background.

### Key Characteristics

1. **Soft Shadows**
   - Light shadow on top-left (simulates light source)
   - Dark shadow on bottom-right (simulates depth)
   - Multiple shadows for depth effect

2. **Subtle Colors**
   - Background and elements use similar colors
   - Low contrast between elements and background
   - Soft, muted color palette

3. **Rounded Corners**
   - All elements have border-radius
   - Typically 15-30px for cards
   - Creates soft, friendly appearance

4. **Minimal Borders**
   - No hard borders
   - Shadows define edges
   - Seamless integration with background

### Neumorphic Color Palette

```css
/* Light Theme */
--neuro-bg: #e0e5ec;
--neuro-shadow-light: #ffffff;
--neuro-shadow-dark: #a3b1c6;
--neuro-text: #4a5568;
--neuro-primary: #667eea;

/* Dark Theme */
--neuro-bg-dark: #2d3748;
--neuro-shadow-light-dark: #3d4a5c;
--neuro-shadow-dark-dark: #1a202c;
--neuro-text-dark: #e2e8f0;
```

### Neumorphic Shadows

```css
/* Raised/Convex (buttons, cards) */
box-shadow: 
  8px 8px 16px var(--neuro-shadow-dark),
  -8px -8px 16px var(--neuro-shadow-light);

/* Pressed/Concave (inputs, active states) */
box-shadow: 
  inset 8px 8px 16px var(--neuro-shadow-dark),
  inset -8px -8px 16px var(--neuro-shadow-light);

/* Flat (subtle elevation) */
box-shadow: 
  4px 4px 8px var(--neuro-shadow-dark),
  -4px -4px 8px var(--neuro-shadow-light);
```

## Implementation Plan

### Phase 1: Foundation
- [ ] Update color variables in `index.css`
- [ ] Create neumorphic utility classes
- [ ] Update base background colors

### Phase 2: Components
- [ ] Navigation bar
- [ ] Buttons (primary, secondary, outline)
- [ ] Cards (tool cards, utility cards)
- [ ] Input fields
- [ ] Modals/Dialogs

### Phase 3: Pages
- [ ] Home page
- [ ] Tools page
- [ ] Utilities page
- [ ] Pricing page
- [ ] Resources page
- [ ] Detail pages

### Phase 4: Polish
- [ ] Hover states
- [ ] Active states
- [ ] Transitions
- [ ] Accessibility (ensure sufficient contrast)

## Neumorphic Components Examples

### Button
```tsx
<button className="neuro-button">
  Click Me
</button>

// CSS
.neuro-button {
  background: var(--neuro-bg);
  border-radius: 20px;
  padding: 12px 24px;
  box-shadow: 
    8px 8px 16px var(--neuro-shadow-dark),
    -8px -8px 16px var(--neuro-shadow-light);
  transition: all 0.3s ease;
}

.neuro-button:hover {
  box-shadow: 
    12px 12px 24px var(--neuro-shadow-dark),
    -12px -12px 24px var(--neuro-shadow-light);
}

.neuro-button:active {
  box-shadow: 
    inset 4px 4px 8px var(--neuro-shadow-dark),
    inset -4px -4px 8px var(--neuro-shadow-light);
}
```

### Card
```tsx
<div className="neuro-card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

// CSS
.neuro-card {
  background: var(--neuro-bg);
  border-radius: 25px;
  padding: 24px;
  box-shadow: 
    10px 10px 20px var(--neuro-shadow-dark),
    -10px -10px 20px var(--neuro-shadow-light);
}
```

### Input
```tsx
<input className="neuro-input" placeholder="Enter text" />

// CSS
.neuro-input {
  background: var(--neuro-bg);
  border: none;
  border-radius: 15px;
  padding: 12px 16px;
  box-shadow: 
    inset 6px 6px 12px var(--neuro-shadow-dark),
    inset -6px -6px 12px var(--neuro-shadow-light);
}
```

## Best Practices

### DO ✅
- Use consistent shadow values across similar elements
- Maintain sufficient color contrast for accessibility
- Use subtle animations for state changes
- Keep backgrounds and elements in similar color families
- Test in both light and dark modes

### DON'T ❌
- Use neumorphism on small elements (hard to see)
- Create too much depth (looks cluttered)
- Use high contrast colors (breaks the effect)
- Overuse the effect (use selectively)
- Forget about accessibility (ensure text is readable)

## Accessibility Considerations

1. **Contrast Ratios**
   - Ensure text meets WCAG AA standards (4.5:1 for normal text)
   - Use darker text colors if needed
   - Test with contrast checkers

2. **Focus States**
   - Add visible focus indicators
   - Use color + shadow changes for focus

3. **Touch Targets**
   - Maintain minimum 44x44px touch targets
   - Ensure buttons are easily tappable

## Testing Checklist

- [ ] Test on different screen sizes
- [ ] Test in light and dark modes
- [ ] Check color contrast ratios
- [ ] Verify hover/active states work
- [ ] Test keyboard navigation
- [ ] Check screen reader compatibility
- [ ] Test on different browsers

## Resources

- [Neumorphism.io](https://neumorphism.io/) - Shadow generator
- [Neumorphic Design Guide](https://www.figma.com/community/file/824103021314787654)
- [CSS Neumorphism Examples](https://codepen.io/tag/neumorphism)

## Deployment Strategy

### Preview Deployment
1. Push to `design/neumorphic` branch
2. Netlify creates preview URL automatically
3. Share preview with team/clients for feedback

### Production Deployment
1. Test thoroughly on preview
2. Get approval
3. Merge to `main` branch
4. Netlify deploys to production

### Rollback Plan
If issues arise:
```bash
git checkout main
git push origin main --force
```

## Next Steps

1. ✅ Create branch (DONE)
2. Update color system in `index.css`
3. Create neumorphic component styles
4. Update Navigation component
5. Update one page as proof of concept
6. Review and iterate
7. Apply to remaining pages
8. Test and deploy
