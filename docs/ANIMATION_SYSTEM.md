# Animation System

## Master variable
`scrollProgress` normalized 0 → 1.

All major motion should derive from this timeline.

## Bike
- position
- lean
- wheel rotation
- suspension micro-motion
- headlamp intensity
- body reflections

## Camera
Use interpolated target states with damping.

## Road
Move road markings based on progress and velocity. Use speed-dependent blur carefully.

## Environment
Use depth groups: background / environment / road / bike / foreground / HUD.

## HUD
Sector changes based on progress. Speed is derived from progress/velocity. Route indicator follows active section.

## Project transitions
Use environment morphs rather than hard cuts.

## Motion quality
Prefer cubic easing, spring/damping, velocity-based interpolation and subtle inertia.

Avoid linear everything, sudden teleports, excessive camera shake and constant rotation.

## Reduced motion
Freeze or simplify camera and bike movement. Fade content normally. Keep navigation and project information fully usable.
