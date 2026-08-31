/* --------------------------------------------------------------------------
 * Bulletproof 4-Layer Spotify Zero Auto-Scroll Lock
 * Prevents third-party Spotify iFrame embeds from jumping/scrolling the page.
 * -------------------------------------------------------------------------- */
(function blockSpotifyAutoScroll() {
  const nativeScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (options) {
    if (this.tagName === 'IFRAME' ||
      this.closest('.spotify-card-inline') ||
      this.closest('.spotify-player-drawer') ||
      this.id === 'spotify-inline-iframe' ||
      this.id === 'spotify-drawer-iframe') {
      return; // Block Spotify auto-scroll
    }
    return nativeScrollIntoView.apply(this, arguments);
  };

  const nativeIFrameFocus = HTMLIFrameElement.prototype.focus;
  HTMLIFrameElement.prototype.focus = function () {
    if (this.closest && (this.closest('.spotify-card-inline') || this.closest('.spotify-player-drawer')) ||
      this.id === 'spotify-inline-iframe' || this.id === 'spotify-drawer-iframe') {
      return; // Block Spotify auto-focus jump
    }
    return nativeIFrameFocus.apply(this, arguments);
  };

  window.addEventListener('message', function (e) {
    if (e.origin && e.origin.includes('spotify.com')) {
      const currentScrollY = window.scrollY || window.pageYOffset;
      requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - currentScrollY) > 2) {
          window.scrollTo({ top: currentScrollY, left: 0, behavior: 'instant' });
        }
      });
    }
  }, true);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
   * Cinematic Cyber Preloader Controller
   * -------------------------------------------------------------------------- */
  (function initCyberPreloader() {
    const preloader = document.getElementById('cyber-preloader');
    const fill = document.getElementById('preloader-bar-fill');
    const percentTxt = document.getElementById('preloader-percent');
    const statusTxt = document.getElementById('preloader-status-text');

    if (!preloader || !fill || !percentTxt) return;

    let progress = 0;
    const statusMessages = [
      "INITIALIZING ENGINE & NEURAL PIPELINES...",
      "LOADING AI SPECS & FASTAPI PIPELINES...",
      "GPU GRAPHICS COMPOSITOR ONLINE...",
      "SYSTEM IGNITION READY!"
    ];

    const timer = setInterval(() => {
      progress += Math.floor(Math.random() * 14) + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);

        if (statusTxt) statusTxt.textContent = statusMessages[3];
        if (fill) fill.style.width = '100%';
        if (percentTxt) percentTxt.textContent = '100%';

        setTimeout(() => {
          preloader.classList.add('loaded');
          document.body.classList.add('preloader-done');
        }, 300);
      } else {
        if (fill) fill.style.width = `${progress}%`;
        if (percentTxt) percentTxt.textContent = `${progress}%`;

        const msgIdx = Math.min(Math.floor((progress / 100) * (statusMessages.length - 1)), statusMessages.length - 2);
        if (statusTxt) statusTxt.textContent = statusMessages[msgIdx];
      }
    }, 50);

    window.addEventListener('load', () => {
      progress = 100;
    });
  })();

  /* --------------------------------------------------------------------------
   * Adaptive Performance Monitor & Low-Power Auto-Scaler
   * -------------------------------------------------------------------------- */

  (function initPerformanceMonitor() {
    let frameCount = 0;
    let lastTime = performance.now();
    let isLowPower = false;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ('ontouchstart' in window);
    if (isMobile) {
      document.body.classList.add('low-power-mode');
      window.isLowPowerMode = true;
    }

    function checkFPS(now) {
      frameCount++;
      const elapsed = now - lastTime;

      if (elapsed >= 2000) {
        const fps = (frameCount * 1000) / elapsed;
        if (fps < 45 && !isLowPower) {
          isLowPower = true;
          window.isLowPowerMode = true;
          document.body.classList.add('low-power-mode');
          console.warn(`[PERF] Low frame rate detected (${fps.toFixed(1)} FPS). Activated Low-Power Performance Mode.`);
        }
        frameCount = 0;
        lastTime = now;
      }

      requestAnimationFrame(checkFPS);
    }
    requestAnimationFrame(checkFPS);
  })();


  /* --------------------------------------------------------------------------
   * ASCII Cyber Banner Telemetry (from animation-skill)
   * -------------------------------------------------------------------------- */
  console.log(
    `%c
 ██╗   ██╗██████╗ ████████╗██╗  ██╗██████╗ ████████╗██╗  ██╗
 ╚██╗ ██╔╝██╔══██╗╚══██╔══╝██║  ██║██╔══██╗╚══██╔══╝██║  ██║
  ╚████╔╝ ███████║   ██║   ███████║██████╔╝   ██║   ███████║
   ╚██╔╝  ██╔══██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══██║
    ██║   ██║  ██║   ██║   ██║  ██║██║  ██║   ██║   ██║  ██║
    ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
 YATHARTH NAGPAL // AI SYSTEMS ENGINEER & FULL-STACK ARCHITECT
`,
    "color: #00F0FF; font-weight: bold; font-family: monospace;"
  );
  console.log("%c[OK] AI ENGINE ONLINE | [OK] CONTINENTAL GT 650 TELEMETRY LOADED", "color: #FFE600; font-weight: bold;");

  /* --------------------------------------------------------------------------
   * 0. Gaming Combo Counter System
   * -------------------------------------------------------------------------- */
  let comboCount = 1;
  const comboCounterBadge = document.getElementById('combo-counter');


  function incrementCombo() {
    comboCount++;
    if (comboCounterBadge) {
      comboCounterBadge.textContent = `COMBO x${comboCount}`;
      comboCounterBadge.classList.add('pulse');
      setTimeout(() => comboCounterBadge.classList.remove('pulse'), 200);
    }
  }

  /* --------------------------------------------------------------------------
   * 1. Custom Neon Crosshair Target Cursor (INT-#2 Target Lock)
   * -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let cursorFrameId = null;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    if (!cursorFrameId) {
      cursorFrameId = requestAnimationFrame(renderCursor);
    }
  }, { passive: true });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;

    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }

    if (Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1) {
      cursorFrameId = null;
      return;
    }

    cursorFrameId = requestAnimationFrame(renderCursor);
  }
  cursorFrameId = requestAnimationFrame(renderCursor);

  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .garage-tab-btn, .filmstrip-slide, .tilt-3d-card, .gear-btn, .xray-btn, .v-ctrl-btn, .sp-btn');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing?.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing?.classList.remove('active'));
  });

  /* --------------------------------------------------------------------------
   * 2. Spotify Biker Radio Player Drawer & Controls
   * -------------------------------------------------------------------------- */
  const spotifyToggleBtn = document.getElementById('spotify-toggle-btn');
  const spotifyDrawer = document.getElementById('spotify-player-drawer');
  const spotifyCloseBtn = document.getElementById('spotify-close-btn');
  const spPlayBtn = document.getElementById('sp-play');
  const spNextBtn = document.getElementById('sp-next');
  const spPrevBtn = document.getElementById('sp-prev');
  const spotifyTrackTitle = document.getElementById('spotify-track-title');
  const spCardTitle = document.getElementById('sp-card-title');

  const tracksList = [
    "ASPHALT NIGHTDRIFT // BIKER SYNTH",
    "NEURAL SPEEDWAY // CYBER RUN",
    "BABY DRIVER DRIFT // RETRO ACTION",
    "TURBO IGNITION // V8 HARD ROCK"
  ];
  let currentTrackIdx = 0;
  let isSpotifyPlaying = true;

  if (spotifyToggleBtn && spotifyDrawer) {
    spotifyToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      spotifyDrawer.classList.toggle('active');
      playRacingShift();
      incrementCombo();
    });
  }

  if (spotifyCloseBtn && spotifyDrawer) {
    spotifyCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      spotifyDrawer.classList.remove('active');
    });
  }

  function updateTrackDisplay(idx) {
    const title = tracksList[idx];
    if (spotifyTrackTitle) spotifyTrackTitle.textContent = title;
    if (spCardTitle) spCardTitle.textContent = title.split(' // ')[0];
  }

  if (spNextBtn) {
    spNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentTrackIdx = (currentTrackIdx + 1) % tracksList.length;
      updateTrackDisplay(currentTrackIdx);
      playRacingShift();
      incrementCombo();
    });
  }

  if (spPrevBtn) {
    spPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentTrackIdx = (currentTrackIdx - 1 + tracksList.length) % tracksList.length;
      updateTrackDisplay(currentTrackIdx);
      playRacingShift();
      incrementCombo();
    });
  }

  if (spPlayBtn) {
    spPlayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isSpotifyPlaying = !isSpotifyPlaying;
      spPlayBtn.textContent = isSpotifyPlaying ? '⏸ PAUSE' : '▶ PLAY';
      playV8RacingRev(120, 600, 1.2);
      incrementCombo();
    });
  }

  /* --------------------------------------------------------------------------
   * 3. Cyber Resume Modal Controls
   * -------------------------------------------------------------------------- */
  const resumeOpenBtn = document.getElementById('resume-open-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeClose = document.getElementById('resume-close');
  const resumeBackdrop = document.getElementById('resume-backdrop');

  function openResumeModal() {
    if (resumeModal) resumeModal.classList.add('active');
    playRacingShift();
    incrementCombo();
  }

  function closeResumeModal() {
    if (resumeModal) resumeModal.classList.remove('active');
  }

  if (resumeOpenBtn) resumeOpenBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (resumeClose) resumeClose.addEventListener('click', closeResumeModal);
  if (resumeBackdrop) resumeBackdrop.addEventListener('click', closeResumeModal);

  /* --------------------------------------------------------------------------
   * 4. Letterbox Cinema Scope Toggle (CAM-#4 Cinema Scope 2.39:1)
   * -------------------------------------------------------------------------- */
  const letterboxToggleBtn = document.getElementById('letterbox-toggle-btn');
  if (letterboxToggleBtn) {
    letterboxToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('cinema-scope-active');
      playRacingShift();
      incrementCombo();
    });
  }

  /* --------------------------------------------------------------------------
   * 5. High-Performance Per-Element 3D Tilt Card & Hero Parallax
   * -------------------------------------------------------------------------- */
  const heroParallaxImg = document.getElementById('hero-parallax-img');
  let isScrolling = false;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { isScrolling = false; }, 150);
  }, { passive: true });

  if (heroParallaxImg) {
    window.addEventListener('mousemove', (e) => {
      if (isScrolling) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      heroParallaxImg.style.transform = `scale(1.06) translate(${dx * -12}px, ${dy * -12}px)`;
    }, { passive: true });
  }

  // Attach listeners ONLY to individual tilt cards on hover
  document.querySelectorAll('.tilt-3d-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (isScrolling) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    });
  });


  /* --------------------------------------------------------------------------
   * 6. Real-Time Audio Spectrum & Exhaust Flame Particles
   * -------------------------------------------------------------------------- */
  const waveCanvas = document.getElementById('audio-wave-canvas');
  const waveCtx = waveCanvas?.getContext('2d');
  let visualizerIntensity = 0.1;

  function renderAudioVisualizer() {
    if (!waveCtx || !waveCanvas) return;

    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    const bars = 32;
    const barWidth = waveCanvas.width / bars;

    for (let i = 0; i < bars; i++) {
      const freq = Math.sin(Date.now() * 0.008 + i * 0.2) * 0.5 + 0.5;
      const height = Math.max(4, freq * waveCanvas.height * visualizerIntensity);

      const grad = waveCtx.createLinearGradient(0, waveCanvas.height, 0, 0);
      grad.addColorStop(0, '#FFE600');
      grad.addColorStop(1, '#FF1E43');

      waveCtx.fillStyle = grad;
      waveCtx.fillRect(i * barWidth + 1, waveCanvas.height - height, barWidth - 2, height);
    }

    if (visualizerIntensity > 0.1) {
      visualizerIntensity *= 0.95;
    }

    requestAnimationFrame(renderAudioVisualizer);
  }
  if (waveCanvas) renderAudioVisualizer();

  // Particle Engine for Exhaust Sparks
  const particleCanvas = document.getElementById('exhaust-particles-canvas');
  const particleCtx = particleCanvas?.getContext('2d');
  const particles = [];

  function triggerExhaustSparks(amount = 25) {
    if (!particleCanvas) return;
    for (let i = 0; i < amount; i++) {
      particles.push({
        x: particleCanvas.width - 20,
        y: particleCanvas.height / 2 + (Math.random() * 16 - 8),
        vx: -(Math.random() * 6 + 4),
        vy: Math.random() * 4 - 2,
        size: Math.random() * 4 + 2,
        life: 1.0,
        color: Math.random() > 0.5 ? '#FF1E43' : '#FFE600'
      });
    }
  }

  function renderExhaustParticles() {
    if (!particleCtx || !particleCanvas) return;
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.04;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      particleCtx.fillStyle = p.color;
      particleCtx.globalAlpha = p.life;
      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      particleCtx.fill();
    }
    particleCtx.globalAlpha = 1.0;
    requestAnimationFrame(renderExhaustParticles);
  }
  if (particleCanvas) renderExhaustParticles();

  function triggerVisualizerPulse(intensity = 0.9) {
    visualizerIntensity = intensity;
    triggerExhaustSparks(30);
    document.body.classList.add('engine-vibrating');
    setTimeout(() => {
      document.body.classList.remove('engine-vibrating');
    }, 450);
  }

  /* --------------------------------------------------------------------------
   * 7. Animated 60FPS Gaming Motion Video Clip Stream Canvas
   * -------------------------------------------------------------------------- */
  const videoCanvas = document.getElementById('gaming-motion-video-canvas');
  const videoCtx = videoCanvas?.getContext('2d');
  let currentClipMode = 'asphalt';
  let clipTime = 0;

  function renderGamingVideoCanvas() {
    if (!videoCtx || !videoCanvas) return;

    const w = videoCanvas.width;
    const h = videoCanvas.height;
    videoCtx.clearRect(0, 0, w, h);

    clipTime += 0.04;

    if (currentClipMode === 'asphalt') {
      videoCtx.fillStyle = '#08090C';
      videoCtx.fillRect(0, 0, w, h);

      const horizonY = h * 0.4;
      videoCtx.strokeStyle = '#FFE600';
      videoCtx.lineWidth = 2;
      videoCtx.beginPath();
      videoCtx.moveTo(0, horizonY);
      videoCtx.lineTo(w, horizonY);
      videoCtx.stroke();

      const cx = w / 2;
      videoCtx.strokeStyle = 'rgba(255, 230, 0, 0.25)';
      for (let x = -w; x <= w * 2; x += 60) {
        videoCtx.beginPath();
        videoCtx.moveTo(cx, horizonY);
        videoCtx.lineTo(x, h);
        videoCtx.stroke();
      }

      const speed = (clipTime * 180) % 40;
      videoCtx.strokeStyle = 'rgba(255, 30, 67, 0.5)';
      for (let y = horizonY; y < h; y += 15) {
        const offsetY = (y + speed) % (h - horizonY);
        videoCtx.beginPath();
        videoCtx.moveTo(0, horizonY + offsetY);
        videoCtx.lineTo(w, horizonY + offsetY);
        videoCtx.stroke();
      }

      const bikeX = cx + Math.sin(clipTime * 2) * 40;
      videoCtx.fillStyle = '#FFE600';
      videoCtx.beginPath();
      videoCtx.arc(bikeX - 25, h - 50, 16, 0, Math.PI * 2);
      videoCtx.arc(bikeX + 25, h - 50, 16, 0, Math.PI * 2);
      videoCtx.fill();

      videoCtx.fillStyle = '#FF1E43';
      videoCtx.beginPath();
      videoCtx.arc(bikeX, h - 65, 8 + Math.sin(clipTime * 10) * 4, 0, Math.PI * 2);
      videoCtx.fill();

    } else if (currentClipMode === 'neural') {
      videoCtx.fillStyle = '#050B14';
      videoCtx.fillRect(0, 0, w, h);

      const nodes = 18;
      videoCtx.fillStyle = '#00E5FF';
      videoCtx.strokeStyle = 'rgba(0, 229, 255, 0.3)';

      for (let i = 0; i < nodes; i++) {
        const nx = (Math.sin(clipTime + i) * 0.4 + 0.5) * w;
        const ny = (Math.cos(clipTime * 1.2 + i * 2) * 0.4 + 0.5) * h;

        videoCtx.beginPath();
        videoCtx.arc(nx, ny, 6, 0, Math.PI * 2);
        videoCtx.fill();

        for (let j = i + 1; j < nodes; j++) {
          const nx2 = (Math.sin(clipTime + j) * 0.4 + 0.5) * w;
          const ny2 = (Math.cos(clipTime * 1.2 + j * 2) * 0.4 + 0.5) * h;
          const dist = Math.hypot(nx2 - nx, ny2 - ny);
          if (dist < 180) {
            videoCtx.beginPath();
            videoCtx.moveTo(nx, ny);
            videoCtx.lineTo(nx2, ny2);
            videoCtx.stroke();
          }
        }
      }

    } else if (currentClipMode === 'exhaust') {
      videoCtx.fillStyle = '#100305';
      videoCtx.fillRect(0, 0, w, h);

      for (let i = 0; i < 40; i++) {
        const px = w * 0.3 + (Math.sin(clipTime * 4 + i) * 20) + (i * 12);
        const py = h * 0.5 + (Math.cos(clipTime * 8 + i) * (i * 3));
        const rad = Math.max(2, 28 - i * 0.6);

        videoCtx.fillStyle = i % 2 === 0 ? '#FF1E43' : '#FFE600';
        videoCtx.beginPath();
        videoCtx.arc(px, py, rad, 0, Math.PI * 2);
        videoCtx.fill();
      }
    }

    requestAnimationFrame(renderGamingVideoCanvas);
  }
  if (videoCanvas) renderGamingVideoCanvas();

  const pressStartBtn = document.getElementById('press-start-btn');
  const videoPlayPulse = document.getElementById('video-play-pulse');
  const vCtrlBtns = document.querySelectorAll('.v-ctrl-btn');

  if (pressStartBtn) {
    pressStartBtn.addEventListener('click', () => {
      if (videoPlayPulse) videoPlayPulse.style.opacity = '0';
      if (videoPlayPulse) videoPlayPulse.style.pointerEvents = 'none';
      playV8RacingRev(110, 580, 1.0);
      incrementCombo();
    });
  }

  vCtrlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vCtrlBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentClipMode = btn.getAttribute('data-clip');
      playRacingShift();
      incrementCombo();

      if (videoPlayPulse) videoPlayPulse.style.opacity = '0';
      if (videoPlayPulse) videoPlayPulse.style.pointerEvents = 'none';
    });
  });

  /* --------------------------------------------------------------------------
   * 8. High-Octane Racing Sound FX Synthesizer & Auto-Play Ambient Background Music
   * -------------------------------------------------------------------------- */
  let audioCtx = null;
  let isAudioMuted = true;
  let isBackgroundMusicStarted = false;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  /* --------------------------------------------------------------------------
   * 8. High-Octane Biker Synthwave Background Music Song Engine (Disabled)
   * -------------------------------------------------------------------------- */
  let bgmOsc = null;
  let bgmGain = null;
  let bgmInterval = null;
  let isBgmPlaying = false;

  function startBikerSynthwaveSong() {
    return;
  }

  function stopBikerSynthwaveSong() {
    isBgmPlaying = false;
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  }





  function playV8RacingRev(startFreq = 90, peakFreq = 520, duration = 0.9) {
    triggerVisualizerPulse(1.0);
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc2.frequency.setValueAtTime(startFreq * 1.5, ctx.currentTime);

      osc1.frequency.exponentialRampToValueAtTime(peakFreq, ctx.currentTime + duration * 0.4);
      osc2.frequency.exponentialRampToValueAtTime(peakFreq * 1.2, ctx.currentTime + duration * 0.4);

      osc1.frequency.exponentialRampToValueAtTime(startFreq * 1.1, ctx.currentTime + duration);
      osc2.frequency.exponentialRampToValueAtTime(startFreq * 1.3, ctx.currentTime + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + duration);
      osc2.stop(ctx.currentTime + duration);
    } catch (e) { }
  }

  function playTurboBlowOff() {
    triggerVisualizerPulse(0.8);
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      // White noise simulation for turbo psssh
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) { }
  }

  function playTireScreech() {
    triggerVisualizerPulse(0.7);
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(2200, ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(1500, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) { }
  }

  function playRacingShift() {
    triggerVisualizerPulse(0.5);
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) { }
  }

  const soundMasterBtn = document.getElementById('sound-master-btn');
  const soundStatusText = soundMasterBtn?.querySelector('.sound-status-text');
  /* --------------------------------------------------------------------------
   * 8. Spotify Auto-Play Trigger & Multi-Event BGM Audio Unlocker
   * -------------------------------------------------------------------------- */
  const drawerIframe = document.getElementById('spotify-drawer-iframe');
  const inlineIframe = document.getElementById('spotify-inline-iframe');
  const inlineEq = document.getElementById('sp-inline-eq');

  function unlockAndPlaySpotifyBgm() {
    const iframes = [drawerIframe, inlineIframe];
    iframes.forEach(iframe => {
      if (iframe) {
        // Enforce autoplay=1 in iframe src
        let src = iframe.src;
        if (!src.includes('autoplay=1')) {
          iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
        }
        if (iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage({ command: 'play' }, '*');
            iframe.contentWindow.postMessage({ type: 'start' }, '*');
          } catch (e) { }
        }
      }
    });

    if (typeof startBikerSynthwaveSong === 'function') {
      startBikerSynthwaveSong();
    }
  }

  // Multi-event listener: Triggers Spotify autoplay immediately on page load, cursor move, touch, or scroll
  const autoPlayGestures = ['DOMContentLoaded', 'load', 'mousemove', 'pointermove', 'pointerdown', 'scroll', 'keydown', 'touchstart'];
  autoPlayGestures.forEach(evt => {
    window.addEventListener(evt, () => {
      unlockAndPlaySpotifyBgm();
    }, { once: true, passive: true });
  });

  // Backup sweep timers
  setTimeout(unlockAndPlaySpotifyBgm, 300);
  setTimeout(unlockAndPlaySpotifyBgm, 1000);

  function setSpotifyAudioMuted(muted) {
    const playState = muted ? 'paused' : 'running';
    if (inlineEq) inlineEq.style.animationPlayState = playState;
    document.querySelectorAll('.spotify-equalizer span').forEach(el => {
      el.style.animationPlayState = playState;
    });

    if (!muted) {
      unlockAndPlaySpotifyBgm();
    }
  }



  if (soundMasterBtn) {
    soundMasterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isAudioMuted = !isAudioMuted;
      if (isAudioMuted) {
        soundMasterBtn.style.opacity = '0.5';
        if (soundStatusText) soundStatusText.textContent = '🔇 UNMUTE SOUND';
        setSpotifyAudioMuted(true);
        if (audioCtx && audioCtx.state === 'running') {
          audioCtx.suspend();
        }
      } else {
        soundMasterBtn.style.opacity = '1.0';
        if (soundStatusText) soundStatusText.textContent = '🔊 MUTE SOUND';
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        setSpotifyAudioMuted(false);
        playV8RacingRev(100, 420, 0.6);
      }
    });
  }






  /* --------------------------------------------------------------------------
   * 9. Interactive Manual Gear Shifter & Keyboard Bindings
   * -------------------------------------------------------------------------- */
  const gearBtns = document.querySelectorAll('.gear-btn');
  const speedometerVal = document.getElementById('speedometer-value');
  const gearIndicator = document.getElementById('gear-indicator');
  const tachoFill = document.getElementById('tacho-fill');
  const rpmVal = document.getElementById('rpm-val');

  const gearSpeedMap = {
    'N': { speed: 0, rpm: '1,200 RPM', fill: '15%' },
    '1': { speed: 65, rpm: '4,500 RPM', fill: '35%' },
    '2': { speed: 120, rpm: '6,200 RPM', fill: '55%' },
    '3': { speed: 175, rpm: '7,800 RPM', fill: '70%' },
    '4': { speed: 220, rpm: '9,100 RPM', fill: '82%' },
    '5': { speed: 265, rpm: '11,400 RPM', fill: '92%' },
    '6': { speed: 295, rpm: '13,800 RPM', fill: '100%' }
  };

  let currentGearKey = '1';

  function setGear(gearKey) {
    const data = gearSpeedMap[gearKey];
    if (!data) return;

    currentGearKey = gearKey;
    playRacingShift();
    triggerExhaustSparks(35);
    incrementCombo();

    gearBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-gear') === gearKey);
    });

    if (gearIndicator) gearIndicator.textContent = gearKey === 'N' ? 'NEUTRAL' : `GEAR ${gearKey}`;
    if (speedometerVal) speedometerVal.textContent = String(data.speed).padStart(3, '0');
    if (tachoFill) tachoFill.style.width = data.fill;
    if (rpmVal) rpmVal.textContent = data.rpm;

    playV8RacingRev(100 + parseInt(gearKey === 'N' ? 0 : gearKey) * 40, 320 + parseInt(gearKey === 'N' ? 0 : gearKey) * 55, 0.6);
  }

  gearBtns.forEach(btn => {
    btn.addEventListener('click', () => setGear(btn.getAttribute('data-gear')));
  });

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    const key = e.key;
    if (['1', '2', '3', '4', '5', '6'].includes(key)) {
      setGear(key);
    } else if (key === '0' || key.toLowerCase() === 'n') {
      setGear('N');
    } else if (key === 'ArrowUp') {
      const gears = ['N', '1', '2', '3', '4', '5', '6'];
      const idx = gears.indexOf(currentGearKey);
      if (idx < gears.length - 1) setGear(gears[idx + 1]);
    } else if (key === 'ArrowDown') {
      const gears = ['N', '1', '2', '3', '4', '5', '6'];
      const idx = gears.indexOf(currentGearKey);
      if (idx > 0) setGear(gears[idx - 1]);
    }
  });

  /* --------------------------------------------------------------------------
   * 10. Hero Ignition Rev Button
   * -------------------------------------------------------------------------- */
  const ignitionRevBtn = document.getElementById('ignition-rev-btn');
  if (ignitionRevBtn) {
    ignitionRevBtn.addEventListener('click', () => {
      playV8RacingRev(100, 650, 1.2);
      playTurboBlowOff();
      setGear('4');
    });
  }

  /* --------------------------------------------------------------------------
   * 11. AI Projects Garage Switcher & 3D Viewport Filters
   * -------------------------------------------------------------------------- */
  const projectData = {
    medai: {
      code: "P01",
      title: "MedAI Pro",
      year: "Jul 2025 – Nov 2025",
      badge: "HEALTHCARE AI & DEEP LEARNING",
      desc: "A multi-modal medical diagnostics platform integrating 5 independent diagnostic modules across brain MRI, chest X-ray, retinal scan, skin lesion, and ICU sepsis datasets.",
      img: "assets/images/redline_1200.png",
      power: "~89% PEAK",
      speed: "42ms FASTAPI",
      torque: "ResNet50 + VGG16 + XGBoost",
      weight: "Grad-CAM Heatmaps",
      techs: ["Python", "PyTorch", "TensorFlow", "FastAPI", "OpenCV", "Docker", "React.js"],
      repo: "https://github.com/Yatharthnagpal/MedAIPro-AI-Diagnostics",
      demo: "https://github.com/Yatharthnagpal/MedAIPro-AI-Diagnostics"
    },
    legalai: {
      code: "P02",
      title: "LegalAI Assistant",
      year: "Jan 2026 – May 2026",
      badge: "LEGAL INTELLIGENCE & NLP",
      desc: "An AI-powered legal intelligence system with 29 contract analysis and drafting features for risk detection, compliance validation, and Indian legal framework generation.",
      img: "assets/images/dark_matter.png",
      power: "29 ACTIVE FEATS",
      speed: "< 1.2s PARSING",
      torque: "Fine-Tuned Legal-BERT",
      weight: "Vector RAG + OCR",
      techs: ["Python", "Legal-BERT", "NLP", "FastAPI", "React.js", "OCR", "pdfplumber"],
      repo: "https://github.com/Yatharthnagpal/LegalAI",
      demo: "https://github.com/Yatharthnagpal/LegalAI"
    },
    gnn: {
      code: "P03",
      title: "GNN Subsidy Fraud Detector",
      year: "Nov 2025 – Mar 2026",
      badge: "GRAPH NEURAL NETWORKS & ML",
      desc: "Specialized Graph Neural Network (GCN / GraphSAGE) framework to detect collusive fraud rings and illegal claims across agricultural subsidy distribution networks.",
      img: "assets/images/stunt.png",
      power: "+24% PRECISION",
      speed: "GraphSAGE ENGINE",
      torque: "PyTorch Geometric",
      weight: "Multi-Relational Graph",
      techs: ["Python", "PyTorch Geometric", "GNN / GCN", "NetworkX", "Scikit-learn"],
      repo: "https://github.com/Yatharthnagpal/Fraud-Detection-on-Agriculture-Subsidy-using-GNN",
      demo: "https://github.com/Yatharthnagpal/Fraud-Detection-on-Agriculture-Subsidy-using-GNN"
    },
    ecom: {
      code: "P04",
      title: "EcomGuard Fraud Analytics",
      year: "Feb 2026 – May 2026",
      badge: "FINANCIAL AI & RISK SCORING",
      desc: "Automated machine learning engine analyzing daily order transactions, purchasing velocity spikes, and assigning real-time fraud probability scores.",
      img: "assets/images/hero.png",
      power: "REAL-TIME SCORING",
      speed: "XGBoost ENGINE",
      torque: "Random Forest Ensemble",
      weight: "Velocity & Geo Flags",
      techs: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Plotly"],
      repo: "https://github.com/Yatharthnagpal/EcomGuard-E-commerce-Insights-Fraud-Detection",
      demo: "https://github.com/Yatharthnagpal/EcomGuard-E-commerce-Insights-Fraud-Detection"
    },
    cyber: {
      code: "P05",
      title: "FBI Cyber Most Wanted Scraper",
      year: "Sep 2025 – Dec 2025",
      badge: "CYBER THREAT INTELLIGENCE",
      desc: "Automated multi-threaded threat intelligence scraper collecting cybercriminal metadata from FBI Cyber Most Wanted for automated risk profiling.",
      img: "assets/images/rider.png",
      power: "MULTI-THREADED",
      speed: "Playwright DOM",
      torque: "BeautifulSoup4 HTML",
      weight: "Structured JSON/CSV",
      techs: ["Python", "Playwright", "BeautifulSoup", "Pandas", "JSON / CSV"],
      repo: "https://github.com/Yatharthnagpal/Cyber-Most-Wanted",
      demo: "https://github.com/Yatharthnagpal/Cyber-Most-Wanted"
    },
    supportbot: {
      code: "P06",
      title: "AI Customer Support Bot",
      year: "Aug 2025 – Oct 2025",
      badge: "CONVERSATIONAL AI & RAG",
      desc: "Automated conversational support agent leveraging NLP intent recognition and RAG document embeddings to resolve complex user queries with contextual synthesis.",
      img: "assets/images/dark_matter.png",
      power: "99.9% UPTIME",
      speed: "VECTOR RAG SEARCH",
      torque: "LangChain Embeddings",
      weight: "FastAPI Pipeline",
      techs: ["Python", "NLP", "FastAPI", "LangChain", "React.js"],
      repo: "https://github.com/Yatharthnagpal/AI-support-BOT",
      demo: "https://github.com/Yatharthnagpal/AI-support-BOT"
    }
  };


  const garageTabs = document.querySelectorAll('.garage-tab-btn');
  const bikeDisplayImg = document.getElementById('bike-display-img');
  const bikeBadgeTxt = document.getElementById('bike-badge-txt');
  const bikeDisplayTitle = document.getElementById('bike-display-title');
  const bikeDisplayYear = document.getElementById('bike-display-year');
  const bikeDisplayDesc = document.getElementById('bike-display-desc');
  const specPower = document.getElementById('spec-power');
  const specSpeed = document.getElementById('spec-speed');
  const specTorque = document.getElementById('spec-torque');
  const specWeight = document.getElementById('spec-weight');
  const specTechPills = document.getElementById('spec-tech-pills');
  const projectRepoBtn = document.getElementById('project-repo-btn');
  const playExhaustBtn = document.getElementById('play-exhaust-sound');
  const xrayBtns = document.querySelectorAll('.xray-btn');

  let activeBikeKey = 'medai';

  garageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      garageTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const bikeKey = tab.getAttribute('data-bike');
      activeBikeKey = bikeKey;
      const data = projectData[bikeKey];
      incrementCombo();

      if (data) {
        bikeDisplayImg.style.transform = 'scale(0.8) rotateY(30deg)';
        bikeDisplayImg.style.opacity = '0.2';

        setTimeout(() => {
          bikeDisplayImg.src = data.img;
          bikeBadgeTxt.textContent = data.badge;
          bikeDisplayTitle.innerHTML = `<span class="project-code-gold">${data.code}</span> <span class="project-name-white">${data.title}</span>`;
          bikeDisplayYear.textContent = data.year;

          bikeDisplayDesc.textContent = data.desc;
          specPower.textContent = data.power;
          specSpeed.textContent = data.speed;
          specTorque.textContent = data.torque;
          specWeight.textContent = data.weight;

          if (projectRepoBtn) projectRepoBtn.href = data.repo;
          if (playExhaustBtn) playExhaustBtn.href = data.demo || data.repo;


          if (specTechPills) {
            specTechPills.innerHTML = data.techs.map(t => `<span class="feat-pill">${t}</span>`).join('');
          }

          bikeDisplayImg.style.transform = 'scale(1) rotateY(0deg)';
          bikeDisplayImg.style.opacity = '1';
        }, 200);

        playV8RacingRev(100, 480, 0.8);
      }
    });
  });

  xrayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      xrayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.getAttribute('data-filter');
      bikeDisplayImg.className = 'bike-main-img machine-3d-target';

      if (filterType === 'thermal') bikeDisplayImg.classList.add('filter-thermal');
      if (filterType === 'wireframe') bikeDisplayImg.classList.add('filter-wireframe');
      if (filterType === 'neural') bikeDisplayImg.classList.add('filter-neural');

      playRacingShift();
      incrementCombo();
    });
  });

  if (playExhaustBtn) {
    playExhaustBtn.addEventListener('click', () => {
      playV8RacingRev(110, 580, 1.0);
      playTurboBlowOff();
      incrementCombo();
    });
  }

  /* --------------------------------------------------------------------------
   * 12. Soundboard Racing Buttons
   * -------------------------------------------------------------------------- */
  document.getElementById('sb-rev-1')?.addEventListener('click', () => { playV8RacingRev(90, 560, 1.1); incrementCombo(); });
  document.getElementById('sb-rev-2')?.addEventListener('click', () => { playTurboBlowOff(); incrementCombo(); });
  document.getElementById('sb-horn')?.addEventListener('click', () => { playTireScreech(); incrementCombo(); });
  document.getElementById('sb-shift')?.addEventListener('click', () => { playRacingShift(); incrementCombo(); });

  /* --------------------------------------------------------------------------
   * 13. Interactive 3D Lean Angle Simulator
   * -------------------------------------------------------------------------- */
  const leanRangeInput = document.getElementById('lean-range-input');
  const leanBikeGraphic = document.getElementById('lean-bike-graphic');
  const simAngleNum = document.getElementById('sim-angle-num');

  if (leanRangeInput && leanBikeGraphic) {
    leanRangeInput.addEventListener('input', (e) => {
      const angle = e.target.value;
      simAngleNum.textContent = `${angle > 0 ? '+' : ''}${angle}°`;
      leanBikeGraphic.style.transform = `perspective(600px) rotateY(${angle * 0.4}deg) rotateZ(${angle}deg)`;
    });
  }

  /* --------------------------------------------------------------------------
   * 14. Track Telemetry Counter Animation on Scroll
   * -------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------
   * 14. Track Telemetry Counter Animation (IntersectionObserver)
   * -------------------------------------------------------------------------- */
  const counterCards = document.querySelectorAll('.counter-number');
  const telemetrySection = document.getElementById('scene-telemetry');
  let hasAnimatedCounters = false;

  if (telemetrySection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedCounters) {
          hasAnimatedCounters = true;
          counterCards.forEach(card => {
            const target = parseInt(card.getAttribute('data-target'), 10);
            let count = 0;
            const step = Math.ceil(target / 45);
            const timer = setInterval(() => {
              count += step;
              if (count >= target) {
                count = target;
                clearInterval(timer);
              }
              card.textContent = count.toLocaleString();
            }, 30);
          });
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });

    counterObserver.observe(telemetrySection);
  }


  /* --------------------------------------------------------------------------
   * 15. Director's Viewfinder Lightbox Modal
   * -------------------------------------------------------------------------- */
  const filmstripSlides = document.querySelectorAll('.filmstrip-slide');
  const filmLightbox = document.getElementById('film-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSub = document.getElementById('lightbox-sub');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const zoomBtns = document.querySelectorAll('.zoom-btn');
  const slomoBtn = document.getElementById('slomo-btn');

  filmstripSlides.forEach(slide => {
    slide.addEventListener('click', () => {
      const imgSrc = slide.getAttribute('data-img');
      const title = slide.getAttribute('data-title');
      const sub = slide.getAttribute('data-sub');

      if (lightboxImg) {
        lightboxImg.src = imgSrc;
        lightboxImg.style.transform = 'scale(1)';
      }
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxSub) lightboxSub.textContent = sub;

      zoomBtns.forEach(b => b.classList.remove('active'));
      zoomBtns[0]?.classList.add('active');

      filmLightbox.classList.add('active');
      playRacingShift();
      incrementCombo();
    });
  });

  zoomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      zoomBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const zoomFactor = btn.getAttribute('data-zoom');
      if (lightboxImg) {
        lightboxImg.style.transform = `scale(${zoomFactor})`;
      }
      playRacingShift();
      incrementCombo();
    });
  });

  if (slomoBtn) {
    slomoBtn.addEventListener('click', () => {
      slomoBtn.classList.toggle('active');
      playRacingShift();
      incrementCombo();
    });
  }

  function closeLightbox() {
    if (filmLightbox) filmLightbox.classList.remove('active');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  /* --------------------------------------------------------------------------
   * 16. Dispatch Transmission Form Submission
   * -------------------------------------------------------------------------- */
  const dispatchForm = document.getElementById('dispatch-form');
  const formStatus = document.getElementById('form-status');

  if (dispatchForm) {
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playV8RacingRev(100, 480, 0.8);
      incrementCombo();

      if (formStatus) {
        formStatus.textContent = '⚡ DISPATCH TRANSMITTED! Message dispatched to Yatharth Nagpal (nagpalyatharth99@gmail.com).';
        dispatchForm.reset();
        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 17. Scroll Snap Entrance Animation Observer
   * -------------------------------------------------------------------------- */
  const entranceElements = document.querySelectorAll('[data-entrance]');
  const observerOptions = { threshold: 0.15 };

  const entranceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('entered');
      }
    });
  }, observerOptions);

  entranceElements.forEach(el => entranceObserver.observe(el));

  /* --------------------------------------------------------------------------
   * 18. Interactive 3D Neural Particle Canvas Hero Background
   * -------------------------------------------------------------------------- */
  (function initHeroInteractiveParticleCanvas() {
    const canvas = document.getElementById('hero-particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resizeCanvas() {
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let canvasRect = null;
    function updateCanvasRect() {
      if (canvas) canvasRect = canvas.getBoundingClientRect();
    }
    updateCanvasRect();
    window.addEventListener('resize', updateCanvasRect, { passive: true });
    if (canvas.parentElement) canvas.parentElement.addEventListener('mouseenter', updateCanvasRect, { passive: true });

    let mouse = { x: width / 2, y: height / 2, active: false };
    window.addEventListener('mousemove', (e) => {
      if (!canvasRect) updateCanvasRect();
      mouse.x = e.clientX - canvasRect.left;
      mouse.y = e.clientY - canvasRect.top;
      mouse.active = true;
    }, { passive: true });
    window.addEventListener('mouseleave', () => { mouse.active = false; });

    const particleCount = (window.isLowPowerMode || /Mobi|Android/i.test(navigator.userAgent)) ? 40 : 110;
    const particles = [];
    const colors = ['#00F0FF', '#FF1E43', '#FFE600', '#FFFFFF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.4,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }

    let isCanvasVisible = true;
    let animFrameId = null;

    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const wasVisible = isCanvasVisible;
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible && !wasVisible && !animFrameId) {
          animFrameId = requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0 });
    canvasObserver.observe(canvas);

    function animate() {
      if (!isCanvasVisible) {
        animFrameId = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes & update physics
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Cursor attraction / repulsion gravity force
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.6;
            p.vx += (dx / dist) * force * 0.15;
            p.vy += (dy / dist) * force * 0.15;
          }
        }

        // Apply friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.pulseAngle += p.pulseSpeed;
        const currentAlpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.2;

        // Draw node dot (Optimized: removed expensive shadowBlur per frame)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.fill();

        // Draw connections between nearby nodes
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.25;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw interactive cursor laser strands
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = '#00F0FF';
            ctx.globalAlpha = (1 - dist / 140) * 0.4;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animFrameId = requestAnimationFrame(animate);
    }

    animFrameId = requestAnimationFrame(animate);
  })();


});

