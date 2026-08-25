# Animation Rules

Animation must communicate movement, hierarchy, progress, depth, transformation, or interaction.

## Master timeline
Use normalized scroll progress from 0 to 1.

0.00–0.05: black / system initialization
0.05–0.10: headlamp + rider reveal
0.10–0.20: acceleration
0.20–0.40: Rider / identity
0.40–0.55: Systems / technology
0.55–0.70: Garage / experience
0.70–0.95: Project Track
0.95–1.00: braking / finish / contact

## Motion language
Use inertia, damping, easing, camera interpolation, parallax and controlled velocity.

Never animate every element independently just because it can move.

## Stack
Use existing dependencies where appropriate:
- Three.js
- React Three Fiber
- Drei
- GSAP
- Framer Motion

Add Lenis only if smooth scrolling materially improves the experience.

## Reduced motion
Disable or substantially reduce cinematic motion when prefers-reduced-motion is enabled.
