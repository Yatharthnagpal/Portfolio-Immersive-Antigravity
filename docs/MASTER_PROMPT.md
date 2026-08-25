# MASTER ANTIGRAVITY PROMPT

You are the lead creative engineer, senior UI/UX designer, 3D web developer, motion designer and performance engineer.

You are working inside an existing Next.js portfolio.

DO NOT blindly rebuild it. First audit the current architecture, content, dependencies, routes, components, styling, 3D implementation and existing interactions.

## Mission

Transform the portfolio into:

**RIDE THE SYSTEM**

An interactive cinematic motorcycle journey through Yatharth Nagpal's engineering career.

The primary motorcycle should be an ORIGINAL modern-classic roadster inspired by the proportions and visual design language of a Hunter 350.

Do not copy Royal Enfield branding, logos, badges, proprietary assets, or an exact production model.

## Visual direction

Premium roadster + cinematic automotive film + AI systems HUD + dark editorial design.

Palette:
- near-black
- graphite
- forest green
- metallic green
- warm white
- restrained lime highlights

Avoid generic cyberpunk.

## Rider identity

The rider represents Yatharth personally.

Helmet = mask / framing device.

Yatharth's real face should be subtly visible behind or through the visor.

Use an owner-provided reference photograph.
Do not invent a face.
Do not replace the identity.
Do not distort facial proportions.
Do not expose the original reference publicly unless intentionally required.

Preferred reference:
`assets/rider/yatharth-face-reference.jpg`

## Experience

Scroll controls the journey.

0%: stationary bike
5%: initialization
10%: headlamp / engine
20%: acceleration
30%: Rider
45%: Systems
60%: Garage
70%: Projects
95%: final road
100%: braking / contact

## Camera states
CAMERA_HERO
CAMERA_LOW
CAMERA_FRONT
CAMERA_SIDE
CAMERA_REAR
CAMERA_CHASE
CAMERA_OVERHEAD
CAMERA_PROJECT
CAMERA_FINAL

Interpolate smoothly.

## Parallax
Background slow.
Environment medium.
Road linked to scroll.
Bike primary.
Foreground fast.
HUD independent.

## Project worlds

MedAI Pro:
medical/neural environment.

LegalAI:
document intelligence / RAG environment.

GNN Fraud Detection:
3D entity graph with dynamic suspicious clusters.

EcomGuard:
fast transaction stream and risk scoring environment.

Only use projects and facts already present in the portfolio.

## Animation
Use Three.js / React Three Fiber / Drei / GSAP / Framer Motion where appropriate.

Every animation needs a purpose.

Avoid excessive particles, constant spinning, generic AI blobs, or animation for decoration alone.

## Mobile
Do not merely scale down desktop.
Create mobile-specific performance and camera behavior, reduced 3D, simpler camera movement, fewer particles, adaptive DPR and a 2.5D fallback if necessary.

## Accessibility
Respect prefers-reduced-motion.
Important content must remain accessible without 3D.

## Process

PHASE 1 — audit
PHASE 2 — architecture plan
PHASE 3 — asset plan
PHASE 4 — motorcycle prototype
PHASE 5 — scroll/camera system
PHASE 6 — identity/rider
PHASE 7 — sections
PHASE 8 — project worlds
PHASE 9 — mobile
PHASE 10 — performance
PHASE 11 — accessibility
PHASE 12 — visual QA

After every phase: build/test/inspect/fix.

## Git restriction

DO NOT:
- create branches
- create PRs
- merge
- push

Everything remains local until the owner explicitly approves the final result.

Start with an AUDIT and implementation plan only. Do not modify code during the audit phase.
