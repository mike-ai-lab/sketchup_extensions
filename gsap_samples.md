### GSAP's ScrollTrigger plugin creates powerful scroll-driven animations with minimal code by pinning elements, scrubbing animations based on scroll position, and triggering animations upon entering the viewport. Key implementations include pinning sections, pinning, scrubbing, and pinning. 


### Basic GSAP ScrollTrigger Example
- This code animates a box (scales and rotates) when it enters the viewport and scrubs the animation based on scroll speed. 

```javascript
// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// Animation
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box", // Element that triggers the animation
    start: "top center", // When the top of the box hits the center of the viewport
    end: "bottom 100px", // When the bottom of the box hits 100px from the top
    scrub: true, // Smoothly link animation to scroll
    markers: true // Helpful for debugging, remove in production
  },
  scale: 1.5,
  rotation: 360
});
```

### Common Scroll Effects
- Pinning Section (Sticky):

```javascript
gsap.to(".panel", {
  scrollTrigger: {
    trigger: ".panel",
    start: "top top",
    pin: true, // Pins the element in place
    scrub: true
  }
});
```


### Horizontal Scroll (Using ScrollTrigger):

```javascript
let sections = gsap.utils.toArray(".panel");
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
});
```

### Horizontal Scroll (Using ScrollTrigger):

```javascript
gsap.from(".fade-item", {
  scrollTrigger: ".fade-item",
  opacity: 0,
  y: 50,
  duration: 1
});
```

### Required Setup
**Ensure you include GSAP and the ScrollTrigger plugin in your HTML:**

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```
