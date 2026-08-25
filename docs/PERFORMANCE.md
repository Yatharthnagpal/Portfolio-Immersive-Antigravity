# Performance Requirements

## Desktop target
Aim for a smooth cinematic experience on modern desktop hardware.

## Mobile
Prefer stable interaction over visual density.

## Techniques
- lazy-load heavy scenes
- adaptive DPR
- instanced particles
- compressed GLB/GLTF
- compressed textures
- avoid unnecessary dynamic lights
- limit post-processing
- reduce particle counts
- scene activation by viewport/progress
- dispose unused geometries/materials/textures

## Quality tiers

### High
Full 3D, particles, environment detail.

### Medium
Reduced particles, fewer lights, simpler environment.

### Low
2.5D / simplified scene.

### Reduced motion
Minimal animation.

## Monitoring
Check FPS, long tasks, memory, GPU load where available, JS bundle size, image/texture sizes and hydration/runtime errors.
