# GSAP Animation Library - Complete Reference Guide

## Table of Contents
1. [Core Basics](#core-basics)
2. [Timelines](#timelines)
3. [Control Methods](#control-methods)
4. [Easing Functions](#easing-functions)
5. [ScrollTrigger](#scrolltrigger)
6. [Plugins](#plugins)
7. [Installation](#installation)
8. [Utility Methods](#utility-methods)
9. [Advanced Patterns](#advanced-patterns)
10. [Miscellaneous](#miscellaneous)

---

## Core Basics

### Tween Types

#### `gsap.to()` - Animate TO provided values
Animates elements from their current state to the specified values.

```javascript
gsap.to(".selector", {
  // Target: selector text, Array, or object
  x: 100,                    // any properties (not limited to CSS)
  backgroundColor: "red",    // camelCase
  duration: 1,               // seconds
  delay: 0.5,               // delay before animation starts
  ease: "power2.inOut",     // easing function
  stagger: 0.1,             // stagger start times between elements
  paused: true,             // default is false
  overwrite: "auto",        // default is false
  repeat: 2,                // number of repeats (-1 for infinite)
  repeatDelay: 1,           // seconds between repeats
  repeatRefresh: true,      // invalidates on each repeat
  yoyo: true,               // if true: A-B-A-B, if false: A-B-A-B
  yoyoEase: true,           // or specific ease like "power2"
  immediateRender: false,   // render immediately before animation starts
  
  // Callbacks
  onComplete: () => {
    console.log("finished");
  },
  // Other callbacks: onStart, onUpdate, onRepeat, onReverseComplete
});
```

#### `gsap.from()` - Animate FROM provided values
Animates elements from the specified values to their current state.

```javascript
gsap.from('.selector', { fromVars });
```

#### `gsap.fromTo()` - Define both start and end values
Full control over both initial and final states.

```javascript
gsap.fromTo('.selector', { fromVars }, { toVars });
// Special properties (duration, ease, etc.) go in toVars
```

#### `gsap.set()` - Set values immediately (no animation)
Instantly apply values without animation.

```javascript
gsap.set('.selector', { toVars });
```

## Timelines

Timelines allow you to sequence multiple tweens and control them as a group.

### Creating a Timeline

```javascript
let tl = gsap.timeline({
  delay: 0.5,
  paused: true,              // default is false
  repeat: 2,                 // number of repeats (-1 for infinite)
  repeatDelay: 1,            // seconds between repeats
  repeatRefresh: true,       // invalidates on each repeat
  yoyo: true,                // if true: A-B-A-B, if false: A-B-A-B
  
  defaults: {
    // All children inherit these defaults
    duration: 1,
    ease: 'none'
  },
  
  smoothChildTiming: true,   // smooths timing of child animations
  autoRemoveChildren: true,  // automatically removes completed children
  
  // Callbacks
  onComplete: () => {
    console.log("finished");
  },
  // Other callbacks: onStart, onUpdate, onRepeat, onReverseComplete
});
```

### Sequencing Multiple Tweens

Chain animations together using method chaining:

```javascript
tl.to('.selector', { duration: 1, x: 50, y: 0 })
  .to('#id', { autoAlpha: 0 })
  .to(elem, { duration: 1, backgroundColor: 'red' })
  .to([elem, elem2], { duration: 3, x: 100 });
```

### Position Parameters

Control when animations play within the timeline:

```javascript
tl.to(target, { toVars }, positionParameter);
```

#### Position Parameter Values

| Parameter | Description |
|-----------|-------------|
| `0.7` | Exactly 0.7 seconds into the timeline (absolute) |
| `'-=0.7'` | Overlap with previous by 0.7 sec |
| `'myLabel'` | Insert at "myLabel" position |
| `'myLabel+=0.2'` | 0.2 seconds after "myLabel" |
| `'<'` | Align with start of most recently-added child |
| `'<0.2'` | 0.2 seconds after the previous child starts |
| `'-=50%'` | Overlap by half of the inserting animation's duration |
| `'<25%'` | 25% into the previous animation (from its start) |


## Control Methods

Retain an animation reference to control it later:

```javascript
let anim = gsap.to(...); // or gsap.timeline(...);
```

### Playback Control

```javascript
anim.play()              // play forward
  .pause()              // pause animation
  .resume()             // resume (respects direction)
  .reverse()            // play in reverse
  .restart()            // restart from beginning
  .kill();              // immediately destroy animation
```

### Timing & Progress

```javascript
anim.timeScale(2)       // 2 = double speed, 0.5 = half speed
  .seek(1.5)            // jump to 1.5 seconds
  .progress(0.5)        // jump to halfway through
  .totalProgress(0.8);  // jump to 80% (includes repeats)
```

### Status & Information

```javascript
anim.isActive()         // true if currently animating
anim.duration()         // get/set duration
anim.totalDuration()    // includes repeats
```

### Callbacks & Events

```javascript
anim.eventCallback("onComplete", () => {
  console.log("Animation complete!");
});

anim.then()             // Promise support
```

### Other Useful Methods

```javascript
anim.invalidate()       // clear recorded start/end values
```

### Timeline-Specific Methods

```javascript
// Add label, tween, timeline, or callback at position
tl.add(thing, position)

// Call a function at a specific point
tl.call(func, params, position)

// Get an Array of the timeline's children
tl.getChildren()

// Empty the timeline
tl.clear()

// Animate playhead to a position linearly
tl.tweenTo(timeOrLabel, {vars})

// Animate playhead between two positions
tl.tweenFromTo(from, to, {vars})
```


## Easing Functions

See [GreenSock Ease Visualizer](https://greensock.com/ease-visualizer) for visual references.

### Core Eases

```javascript
ease: 'none'              // no ease (same as "linear")
```

#### Basic Core Eases

These can have `.in`, `.out`, and `.inOut` extensions:

```javascript
'power1'    // gentle easing
'power2'    // moderate easing (most common)
'power3'    // strong easing
'power4'    // very strong easing
'circ'      // circular easing
'expo'      // exponential easing
'sine'      // sinusoidal easing
```

**Example**: `"power2.inOut"` - ease in AND out with power2

#### Expressive Core Eases

```javascript
'elastic'   // elastic/springy effect
'back'      // overshoots/pulls back
'bounce'    // bouncing effect
'steps(n)'  // steps through n positions
```

### Plugin Eases

*Requires EasePack plugin*

```javascript
'rough'                   // rough/jagged easing
'slow'                    // slow start and end
'expoScale(1, 2)'        // exponential scaling
```

### Custom Eases

*Requires appropriate plugin*

```javascript
CustomEase                // create custom easing curves
CustomWiggle             // create wiggling animation eases
CustomBounce             // create custom bounce eases
```


## ScrollTrigger

Trigger animations based on scroll position.

```javascript
scrollTrigger: {
  trigger: ".selector",          // selector or element to watch
  start: "top center",           // [trigger] [scroller] positions
  end: "20px 80%",               // [trigger] [scroller] positions
  // or relative amount: "+=500"
  
  scrub: true,                   // or time (in seconds) to catch up
  pin: true,                     // or selector or element to pin
  markers: true,                 // only during development!
  
  toggleActions: "play pause resume reset",
  // other actions: complete, reverse, none
  
  toggleClass: "active",         // toggle class on trigger
  fastScrollEnd: true,           // or velocity number
  containerAnimation: tween,     // linear animation
  id: "my-id",
  anticipatePin: 1,              // may help avoid jump
  
  // Snapping configuration
  snap: {
    snapTo: 1 / 10,              // progress increment (or "labels", function, Array)
    duration: 0.5,               // duration to snap
    directional: true,           // snap direction-aware
    ease: "power3",              // easing for snap
    onComplete: callback,
    // other callbacks: onStart, onInterrupt
  },
  
  pinReparent: true,             // moves to documentElement during pin
  pinSpacing: false,             // removes spacing when pinned
  pinType: "transform",          // or "fixed"
  pinnedContainer: ".selector",  // container for pinned element
  preventOverlaps: true,         // or arbitrary string
  once: true,                    // trigger only once
  endTrigger: ".selector",       // separate end trigger
  horizontal: true,              // switches to horizontal scroll
  invalidateOnRefresh: true,     // clears start values on refresh
  refreshPriority: 1,            // influence refresh order
  
  // Callbacks
  onEnter: callback,
  // other callbacks: onLeave, onEnterBack, onLeaveBack, onUpdate,
  // onToggle, onRefresh, onRefreshInit, onScrubComplete
}
```


## Plugins

GSAP functionality can be extended with plugins.

### Registering Plugins

```javascript
// Import and register GSAP plugins (once before using them)
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);
```

### Available Plugins

| Plugin | Description |
|--------|-------------|
| `Draggable` | Make elements draggable |
| `DrawSVGPlugin` | Animate SVG drawing |
| `EaselPlugin` | EaselJS integration |
| `Flip` | Animate from one state to another |
| `GSDevTools` | Development tools |
| `InertiaPlugin` | Add inertia to animations |
| `MorphSVGPlugin` | Morph between SVG shapes |
| `MotionPathPlugin` | Animate along paths |
| `MotionPathHelper` | Helper for motion paths |
| `Observer` | Observe user interactions |
| `Physics2DPlugin` | 2D physics simulation |
| `PhysicsPropsPlugin` | Physics-based properties |
| `PixiPlugin` | Pixi.js integration |
| `ScrambleTextPlugin` | Scramble text animation |
| `ScrollToPlugin` | Smooth scroll animation |
| `ScrollTrigger` | Scroll-based animations |
| `ScrollSmoother` | Smooth scrolling |
| `SplitText` | Split text into characters/words/lines |
| `TextPlugin` | Animate text properties |


## Utility Methods

Utility methods accessible through `gsap.utils.foo()`

| Method | Description |
|--------|-------------|
| `checkPrefix()` | Get relevant browser prefix for property |
| `clamp()` | Clamp value to range |
| `distribute()` | Distribute value among array |
| `getUnit()` | Get unit of string value |
| `interpolate()` | Interpolate between values |
| `mapRange()` | Map one range to another |
| `normalize()` | Map a range to the 0-1 range |
| `pipe()` | Sequence function calls |
| `random()` | Generate a random value |
| `selector()` | Get a scoped selector function |
| `shuffle()` | Shuffle an array in-place |
| `snap()` | Snap a value to increment or array |
| `splitColor()` | Split color into RGB array |
| `toArray()` | Convert array-like thing to array |
| `unitize()` | Add specified unit to function results |
| `wrap()` | Place number in range, wrapping to start |
| `wrapYoyo()` | Place number in range, wrapping in reverse |


## Advanced Patterns

### Nesting Timelines

Build complex animations by nesting timelines:

```javascript
function scene1() {
  let tl = gsap.timeline();
  tl.to(...).to(...);  // build scene 1
  return tl;
}

function scene2() {
  let tl = gsap.timeline();
  tl.to(...).to(...);  // build scene 2
  return tl;
}

let master = gsap.timeline()
  .add(scene1())
  .add(scene2(), "-=0.5");  // overlap slightly
```

### Quick Setters

Faster way to repeatedly set a property than `.set()`:

```javascript
let setX = gsap.quickSetter("#id", "x", "px");

document.addEventListener("mousemove", e => {
  setX(e.clientX);
});
```

### Quick To

Use `quickTo()` for rapid animation updates:

```javascript
let xTo = gsap.quickTo("#id", "x", {
  duration: 0.4,
  ease: "power3"
});

document.addEventListener("mousemove", e => {
  xTo(e.pageX);
});
```

### Registering Custom Effects

Create reusable custom effects:

```javascript
gsap.registerEffect({
  name: "fade",
  effect: (targets, config) => {
    return gsap.to(targets, {
      duration: config.duration,
      opacity: 0
    });
  },
  defaults: { duration: 2 },
  extendTimeline: true
});

// Use it like this
gsap.effects.fade(".box");

// Or on timelines
tl.fade(".box", { duration: 3 });
```

### Ticker / Frame Updates

Add listeners to execute on every animation frame:

```javascript
gsap.ticker.add(myFunction);

function myFunction(time, deltaTime, frame) {
  // Executes on every tick after the core engine updates
  // time: elapsed time (in seconds)
  // deltaTime: milliseconds since last tick
  // frame: frame number
}

// Remove the listener later
gsap.ticker.remove(myFunction);
```

## Miscellaneous

### Getting Property Values

```javascript
gsap.getProperty("#id", "x");        // 20
gsap.getProperty("#id", "x", "px");  // "20px"
```

### Global Tween Defaults

Set GSAP's default animation settings globally:

```javascript
gsap.defaults({
  ease: "power2.in",
  duration: 1
});
```

### Configuration

Configure GSAP's non-tween-related settings:

```javascript
gsap.config({
  autoSleep: 60,              // auto-pause animations after 60 seconds
  force3D: false,             // disable 3D transforms
  nullTargetWarn: false,      // suppress null target warnings
  trialWarn: false,           // suppress trial version warnings
  units: {                    // set default units for properties
    left: "%",
    top: "%",
    rotation: "rad"
  }
});
```

---

## Quick Reference

### Most Common Patterns

```javascript
// Basic animation
gsap.to(".box", { duration: 1, x: 100, rotation: 360 });

// With callbacks
gsap.to(".box", {
  duration: 1,
  x: 100,
  onComplete: () => console.log("Done!")
});

// Timeline sequence
const tl = gsap.timeline();
tl.to(".box1", { duration: 1, x: 100 })
  .to(".box2", { duration: 1, x: 100 });

// Scroll trigger
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    markers: true
  },
  x: 500
});

// Repeating animation
gsap.to(".box", {
  duration: 1,
  x: 100,
  repeat: -1,
  yoyo: true
});
```

---

## Resources

- **Official Docs**: https://greensock.com/docs/
- **Ease Visualizer**: https://greensock.com/ease-visualizer/
- **Code Pen Examples**: https://codepen.io/GreenSock/
- **API Reference**: https://greensock.com/api/

---

*Last Updated: 2026 | GSAP Version: 3.x*