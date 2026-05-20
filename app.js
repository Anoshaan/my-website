/* =========================================================
   ANOSHAAN — motion engine (multi-page)
   ========================================================= */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = ('ontouchstart' in window) || (matchMedia('(hover: none)').matches);

  /* ========== PAGE TRANSITION ========== */
  // Curtain element — inserted if missing
  let curtain = $('.page-curtain');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    document.body.appendChild(curtain);
  }
  // Reveal on load
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.body.classList.add('pt-ready'));
  });

  function isInternalLink(a) {
    if (!a || !a.href) return false;
    if (a.target && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    if (a.getAttribute('href')?.startsWith('#')) return false;
    if (a.getAttribute('href')?.startsWith('mailto:')) return false;
    if (a.getAttribute('href')?.startsWith('tel:')) return false;
    try {
      const url = new URL(a.href);
      return url.origin === window.location.origin && url.pathname !== window.location.pathname;
    } catch { return false; }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || !isInternalLink(a)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const href = a.href;
    document.body.classList.add('pt-leaving');
    document.body.classList.remove('pt-ready');
    setTimeout(() => { window.location.href = href; }, 420);
  });

  window.addEventListener('pageshow', (e) => {
    // Restore on bfcache hits
    if (e.persisted) {
      document.body.classList.remove('pt-leaving');
      document.body.classList.add('pt-ready');
    }
  });

  // ===== state =====
  const state = {
    accent: '#cfd9ff',
    motionIntensity: 'full',
    cursorMode: 'custom',
    heroReveal: 'blur',
  };
  Object.assign(state, window.__TWEAK_DEFAULTS || {});
  try {
    const saved = localStorage.getItem('anoshaan-tweaks');
    if (saved) {
      Object.assign(state, JSON.parse(saved));
    }
  } catch (e) {}

  function applyAccent(v) { document.documentElement.style.setProperty('--accent', v); }
  function applyMotion(v) { document.body.setAttribute('data-motion', v); }
  function applyCursor(v) { document.body.setAttribute('data-cursor', v); }
  function applyHeroReveal(v) { document.body.setAttribute('data-hero-reveal', v); }
  applyAccent(state.accent);
  applyMotion(state.motionIntensity);
  applyCursor(state.cursorMode);
  applyHeroReveal(state.heroReveal);
  window.__anoshaanApply = { applyAccent, applyMotion, applyCursor, applyHeroReveal };

  /* ========== NAV — active page state ========== */
  const page = document.body.dataset.page || 'home';
  const navLinks = $$('.nav-link');
  navLinks.forEach((l) => l.classList.toggle('is-active', l.dataset.nav === page));

  // nav scroll behavior — V3-style: hide on scroll down, show on scroll up
  const nav = $('#nav');
  let lastScroll = 0;
  function updateNavBg() {
    if (!nav) return;
    const currentY = window.scrollY;
    if (currentY > 20) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');

    if (currentY < 10) {
      nav.classList.remove('is-hidden');
    } else if (currentY > lastScroll) {
      nav.classList.add('is-hidden');
    } else {
      nav.classList.remove('is-hidden');
    }
    lastScroll = currentY;
  }
  window.addEventListener('scroll', updateNavBg, { passive: true });
  updateNavBg();

  /* ========== CUSTOM CURSOR ========== */
  const cursor = $('#cursor');
  if (cursor && !isTouch) {
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let rx = cx, ry = cy;
    let dx = cx, dy = cy;
    window.addEventListener('pointermove', (e) => { cx = e.clientX; cy = e.clientY; }, { passive: true });
    window.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    window.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    function tick() {
      dx = lerp(dx, cx, 0.45);
      dy = lerp(dy, cy, 0.45);
      rx = lerp(rx, cx, 0.18);
      ry = lerp(ry, cy, 0.18);
      const dot = cursor.querySelector('.cursor-dot');
      const ring = cursor.querySelector('.cursor-ring');
      if (dot) dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${cursor.classList.contains('is-down') ? 0.7 : 1})`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    $$('a, button, [data-magnetic], [data-magnetic-soft], [data-tilt], [data-project]').forEach((el) => {
      el.addEventListener('pointerenter', () => {
        cursor.classList.add('is-hover');
      });
      el.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-hover');
      });
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  /* ========== HERO GLOW PARALLAX ========== */
  const radialGlow = $('.hero-glow-radial');
  const layeredGlow = $('.hero-glow-layered');
  if (radialGlow || layeredGlow) {
    if (window.gsap) {
      window.addEventListener('pointermove', (e) => {
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 40;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 40;
        gsap.to(".hero-glow-radial", {
          x: xOffset * 0.7,
          y: yOffset * 0.7,
          duration: 1.5,
          ease: "power2.out"
        });
        gsap.to(".hero-glow-layered", {
          x: -xOffset * 1.1,
          y: -yOffset * 1.1,
          duration: 2.2,
          ease: "power2.out"
        });
      }, { passive: true });
    } else {
      let glowX1 = 0, glowY1 = 0, glowX2 = 0, glowY2 = 0;
      let targetGlowX1 = 0, targetGlowY1 = 0, targetGlowX2 = 0, targetGlowY2 = 0;

      window.addEventListener('pointermove', (e) => {
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 40;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 40;
        targetGlowX1 = xOffset * 0.7;
        targetGlowY1 = yOffset * 0.7;
        targetGlowX2 = -xOffset * 1.1;
        targetGlowY2 = -yOffset * 1.1;
      }, { passive: true });

      function glowTick() {
        glowX1 = lerp(glowX1, targetGlowX1, 0.08);
        glowY1 = lerp(glowY1, targetGlowY1, 0.08);
        glowX2 = lerp(glowX2, targetGlowX2, 0.05);
        glowY2 = lerp(glowY2, targetGlowY2, 0.05);
        
        if (radialGlow) radialGlow.style.transform = `translate(${glowX1}px, ${glowY1}px)`;
        if (layeredGlow) {
          layeredGlow.style.transform = `translate(calc(-50% + ${glowX2}px), calc(-50% + ${glowY2}px))`;
        }
        requestAnimationFrame(glowTick);
      }
      requestAnimationFrame(glowTick);
    }
  }

  /* ========== MAGNETIC ========== */
  function bindMagnetic(el, strength = 0.35, range = 80) {
    let rect = null, raf = null;
    let tx = 0, ty = 0, cur = { x: 0, y: 0 };
    const arrow = el.querySelector('.btn-arrow');
    const onMove = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const ex = e.clientX - (rect.left + rect.width / 2);
      const ey = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(ex, ey);
      if (dist < range + rect.width / 2) { tx = ex * strength; ty = ey * strength; }
      else { tx = 0; ty = 0; }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cur.x = lerp(cur.x, tx, 0.18);
      cur.y = lerp(cur.y, ty, 0.18);
      el.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      if (arrow) {
        arrow.style.transform = `translate(${cur.x * 0.43}px, ${cur.y * 0.43}px)`;
      }
      if (Math.abs(cur.x - tx) > 0.05 || Math.abs(cur.y - ty) > 0.05) raf = requestAnimationFrame(loop);
      else {
        raf = null;
        if (arrow && tx === 0 && ty === 0) {
          arrow.style.transform = 'translate(0, 0)';
        }
      }
    };
    el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', () => { rect = null; tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
    window.addEventListener('resize', () => { rect = null; });
  }
  if (!reducedMotion && !isTouch) {
    if (window.gsap) {
      const magneticBtns = document.querySelectorAll(".magnetic-btn");
      magneticBtns.forEach((btn) => {
        const handleBtnMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const dx = e.clientX - btnX;
          const dy = e.clientY - btnY;
          gsap.to(btn, {
            x: dx * 0.35,
            y: dy * 0.35,
            scale: 1.03,
            duration: 0.35,
            ease: "power2.out"
          });
          const arrow = btn.querySelector(".btn-arrow");
          if (arrow) {
            gsap.to(arrow, {
              x: dx * 0.15,
              y: dy * 0.15,
              duration: 0.35,
              ease: "power2.out"
            });
          }
        };
        const handleBtnLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });
          const arrow = btn.querySelector(".btn-arrow");
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        };
        btn.addEventListener("mousemove", handleBtnMove);
        btn.addEventListener("mouseleave", handleBtnLeave);
      });
    }

    $$('[data-magnetic]').forEach((el) => {
      if (window.gsap && el.classList.contains('magnetic-btn')) return;
      bindMagnetic(el, 0.35, 80);
    });
    $$('[data-magnetic-soft]').forEach((el) => {
      if (window.gsap && el.classList.contains('magnetic-btn')) return;
      bindMagnetic(el, 0.18, 50);
    });
  }

  /* ========== 3D TILT ========== */
  function bindTilt(el) {
    let rect = null, raf = null;
    let tx = 0, ty = 0, cx2 = 0, cy2 = 0;
    const onMove = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      tx = (py - 0.5) * -8;
      ty = (px - 0.5) * 8;
      const glow = el.querySelector('.d-glow');
      if (glow) {
        glow.style.left = (px * 100) + '%';
        glow.style.top = (py * 100) + '%';
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx2 = lerp(cx2, tx, 0.15);
      cy2 = lerp(cy2, ty, 0.15);
      el.style.transform = `perspective(1000px) rotateX(${cx2}deg) rotateY(${cy2}deg) translateZ(0)`;
      if (Math.abs(cx2 - tx) > 0.05 || Math.abs(cy2 - ty) > 0.05) raf = requestAnimationFrame(loop);
      else raf = null;
    };
    el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', () => { tx = 0; ty = 0; rect = null; if (!raf) raf = requestAnimationFrame(loop); });
    window.addEventListener('resize', () => { rect = null; });
  }
  if (!reducedMotion && !isTouch) {
    $$('[data-tilt]').forEach(bindTilt);
  }

  /* ========== AUTO-STAGGER ==========
     Any [data-stagger] container distributes data-delay on its direct
     descendants that have [data-reveal]. Default step = 90ms; override
     with data-stagger="120" or data-stagger-base="200" for an offset. */
  $$('[data-stagger]').forEach((parent) => {
    const step = parseInt(parent.dataset.stagger, 10) || 90;
    const base = parseInt(parent.dataset.staggerBase || '0', 10);
    const targets = $$('[data-reveal]', parent).filter((el) => el.parentElement === parent || parent.contains(el));
    // Only assign if child doesn't have its own delay
    targets.forEach((el, i) => {
      if (!el.dataset.delay) {
        el.dataset.delay = String(base + i * step);
      }
    });
  });

  /* ========== SCROLL REVEAL ========== */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('in'), delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  $$('[data-reveal]').forEach((el) => {
    if (window.gsap && el.closest('.hero')) {
      el.classList.add('in');
      return;
    }
    revealObs.observe(el);
  });

  /* ========== SPLIT REVEAL ========== */
  $$('[data-split-reveal]').forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    text.split(/(\s+)/).forEach((part) => {
      if (/^\s+$/.test(part)) el.appendChild(document.createTextNode(' '));
      else if (part) {
        const span = document.createElement('span');
        span.className = 'split-word';
        const inner = document.createElement('span');
        inner.className = 'split-inner';
        inner.textContent = part;
        span.appendChild(inner);
        el.appendChild(span);
      }
    });
    $$('.split-inner', el).forEach((w, i) => { w.style.transitionDelay = (i * 40) + 'ms'; });
  });
  const splitObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        splitObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  $$('[data-split-reveal]').forEach((el) => splitObs.observe(el));

  /* ========== HERO TITLE REVEAL ========== */
  const heroTitle = $('#heroTitle');
  if (heroTitle) {
    if (window.gsap && window.SplitType) {
      const headlineSplit = new SplitType(heroTitle, {
        types: "chars,words",
        charClass: "inline-block"
      });
      heroTitle.classList.add('split-active');
      const customEase = "cubic-bezier(0.16, 1, 0.3, 1)";
      const tl = gsap.timeline({ defaults: { ease: customEase } });
      
      tl.fromTo(
        headlineSplit.chars,
        { opacity: 0, y: 35, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.015,
          duration: 1.2
        }
      )
      .fromTo(
        ".hero-sub",
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 },
        "-=0.8"
      )
      .fromTo(
        ".hero-cta-group",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
    } else {
      const words = $$('.word', heroTitle);
      words.forEach((w, i) => { w.style.transitionDelay = (180 + i * 110) + 'ms'; });
      requestAnimationFrame(() => requestAnimationFrame(() => heroTitle.classList.add('revealed')));
    }
  }

  /* ========== PROJECT MEDIA PARALLAX ========== */
  $$('[data-parallax-media], [data-case-media]').forEach((el) => {
    const inner = el.querySelector('.project-media-inner, .case-media-inner');
    if (!inner || reducedMotion) return;
    function tick() {
      const rect = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const offset = (rect.top + rect.height / 2) - center;
      const t = clamp(offset / window.innerHeight, -1, 1);
      inner.style.transform = `translateY(${t * -24}px)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  /* ========== STATS COUNT-UP ========== */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let frame = 0;
        const totalFrames = 36;
        const tick = () => {
          frame++;
          if (frame < totalFrames - 6) {
            el.textContent = Math.floor(Math.random() * 99) + suffix;
            requestAnimationFrame(tick);
          } else {
            el.textContent = target + suffix;
          }
        };
        tick();
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  $$('[data-count]').forEach((el) => countObs.observe(el));

  /* ========== PHILOSOPHY LINES ========== */
  const philoObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lines = $$('[data-philo]');
        lines.forEach((l, i) => { setTimeout(() => l.classList.add('in'), i * 320); });
        philoObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  const philoBlock = $('#philoLines');
  if (philoBlock) philoObs.observe(philoBlock);

  /* ========== PROCESS STEPPER ========== */
  const stepObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        stepObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  $$('.process-step').forEach((el) => stepObs.observe(el));

  /* ========== smooth-scroll anchors ========== */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const tgt = document.querySelector(id);
      if (!tgt) return;
      e.preventDefault();
      const top = tgt.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ========== MARQUEE — duplicate children for seamless loop ========== */
  $$('.marquee-track').forEach((track) => {
    const originals = Array.from(track.children);
    if (originals.length === 0) return;
    
    // Dynamically duplicate elements to ensure we fill screen width + room to scroll
    const viewportWidth = window.innerWidth;
    const cardWidth = 360; // Max card width clamp limit
    const minWidthNeeded = viewportWidth + cardWidth * 2;
    const originalWidth = originals.length * cardWidth;
    const repeats = Math.max(2, Math.ceil(minWidthNeeded / originalWidth));
    
    track.innerHTML = '';
    const masterList = [];
    for (let r = 0; r < repeats; r++) {
      originals.forEach((node) => {
        const item = node.cloneNode(true);
        masterList.push(item);
        track.appendChild(item);
      });
    }
    
    masterList.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });

  window.__anoshaan = { state };
})();
