# Walkthrough — 4-Layer Bulletproof Spotify Zero Auto-Scroll Lock

We have implemented a **4-layer bulletproof auto-scroll lock** to completely prevent Spotify iFrame embeds from jumping or auto-scrolling the webpage when tracks change or initialize.

---

## 🔒 4-Layer Zero Auto-Scroll Protection

1. **Layer 1 (`Element.prototype.scrollIntoView` Override)**:
   - Overrides `scrollIntoView` globally; if called on any `IFRAME` or inside `.spotify-card-inline` / `.spotify-player-drawer`, the call is silently intercepted and ignored.

2. **Layer 2 (`HTMLIFrameElement.prototype.focus` Override)**:
   - Overrides `focus` on iframe elements to block focus-triggered page jumps.

3. **Layer 3 (`postMessage` Event Scroll Snap Lock)**:
   - Captures `window.scrollY` on Spotify postMessage events. If any position shift occurs, locks position back instantly with `window.scrollTo({ top: currentScrollY, behavior: 'instant' })`.

4. **Layer 4 (`tabindex="-1"` Attribute)**:
   - Enforces `tabindex="-1"` on all Spotify iframe embeds to prevent keyboard navigation focus jumps.

---

## 📁 Updated Code Files
- [script.js](file:///c:/Users/Yatharth%20nagpal/Desktop/cinematic-ui-master/script.js)
- [walkthrough.md](file:///c:/Users/Yatharth%20nagpal/Desktop/cinematic-ui-master/walkthrough.md)

---

## 🌐 Live Web Server
Local server running live at `http://localhost:8080`.
