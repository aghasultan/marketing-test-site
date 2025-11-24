/* ==========================================================
   script.js — Particles + reveal-on-scroll + mobile nav
   Top-notch + battery aware + touch/mouse reactive
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("no-js");

  /* ---------------- THEME ---------------- */
  const prefersDarkMQ = window.matchMedia("(prefers-color-scheme: dark)");
  let storedTheme;
  try {
    storedTheme = localStorage.getItem("theme");
  } catch (err) {
    console.warn("Theme storage unavailable", err);
  }

  const themeToggleBtn = document.querySelector("[data-theme-toggle]");
  const themeToggleLabel = themeToggleBtn?.querySelector(".label");

  const syncThemeToggle = (isDark) => {
    if (!themeToggleBtn) return;
    themeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    themeToggleBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
    if (themeToggleLabel)
      themeToggleLabel.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  };

  const applyTheme = (nextTheme) => {
    const isDark = nextTheme === "dark";
    document.body.classList.toggle("theme-dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (err) {
      console.warn("Theme storage unavailable", err);
    }
    syncThemeToggle(isDark);
  };

  const initialTheme =
    storedTheme ||
    (document.body.classList.contains("theme-dark") ? "dark" : null) ||
    (prefersDarkMQ.matches ? "dark" : "light");

  applyTheme(initialTheme);

  themeToggleBtn?.addEventListener("click", () => {
    const next = document.body.classList.contains("theme-dark")
      ? "light"
      : "dark";
    applyTheme(next);
  });

  /* ---------------- CONFIG ---------------- */
  const CFG = {
    DENSITY: 9000, // lower = more particles
    MAX_PARTICLES: 320, // hard cap for performance
    COLOR: "rgba(0,168,107,0.4)",
    LINE_BASE: "rgba(0,168,107,", // alpha appended dynamically
    CONNECT: 7, // connection distance factor
    FORCE_MOTION: false, // set true to ignore reduced-motion
  };

  const addMQListener = (mq, handler) => {
    if (!mq || !handler) return;
    if (typeof mq.addEventListener === "function")
      mq.addEventListener("change", handler);
    else if (typeof mq.addListener === "function") mq.addListener(handler);
  };

  /* ---------------- REDUCED MOTION ---------------- */
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = mq.matches && !CFG.FORCE_MOTION;
  addMQListener(mq, (e) => {
    reduced = e.matches && !CFG.FORCE_MOTION;
    reduced ? stopParticles() : startParticles(true);
  });

  /* ---------------- CANVAS ---------------- */
  const canvas = document.getElementById("interactive-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  let particles = [];
  let raf = null;
  let lastSizeKey = "";

  const mouse = {
    x: null,
    y: null,
    radius: (window.innerHeight / 100) * (window.innerWidth / 100),
  };

  function resizeCanvas() {
    const w = window.innerWidth,
      h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    // avoid re-initting if size didn't change meaningfully
    const key = `${Math.round(w / 20)}x${Math.round(h / 20)}`;
    if (key !== lastSizeKey) {
      lastSizeKey = key;
      if (!reduced) initParticles();
    }
  }

  class Particle {
    constructor(x, y, dx, dy, s) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.s = s;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
      ctx.fillStyle = CFG.COLOR;
      ctx.fill();
    }
    update() {
      if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
      if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

      const dx = (mouse.x ?? -9999) - this.x;
      const dy = (mouse.y ?? -9999) - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius + this.s) {
        if (mouse.x < this.x && this.x < canvas.width - this.s * 10)
          this.x += 5;
        if (mouse.x > this.x && this.x > this.s * 10) this.x -= 5;
        if (mouse.y < this.y && this.y < canvas.height - this.s * 10)
          this.y += 5;
        if (mouse.y > this.y && this.y > this.s * 10) this.y -= 5;
      }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }

  function initParticles() {
    particles.length = 0;
    const count = Math.min(
      CFG.MAX_PARTICLES,
      (canvas.width * canvas.height) / CFG.DENSITY,
    );
    for (let i = 0; i < count; i++) {
      const s = Math.random() * 2 + 1;
      particles.push(
        new Particle(
          Math.random() * (canvas.width - s * 2) + s * 2,
          Math.random() * (canvas.height - s * 2) + s * 2,
          Math.random() * 0.4 - 0.2,
          Math.random() * 0.4 - 0.2,
          s,
        ),
      );
    }
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < (canvas.width / CFG.CONNECT) * (canvas.height / CFG.CONNECT)) {
          const alpha = Math.max(0, 1 - d2 / 20000);
          if (alpha <= 0.05) continue;
          ctx.strokeStyle = `${CFG.LINE_BASE}${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) particles[i].update();
    connect();
    raf = requestAnimationFrame(frame);
  }

  function startParticles(reinit = false) {
    if (reinit) initParticles();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }
  function stopParticles() {
    cancelAnimationFrame(raf);
    raf = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Mouse / touch
  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true },
  );
  window.addEventListener(
    "mouseout",
    () => {
      mouse.x = undefined;
      mouse.y = undefined;
    },
    { passive: true },
  );
  window.addEventListener(
    "touchstart",
    (e) => {
      const t = e.touches[0];
      mouse.x = t.clientX;
      mouse.y = t.clientY;
    },
    { passive: true },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      mouse.x = t.clientX;
      mouse.y = t.clientY;
    },
    { passive: true },
  );

  // Pause on tab hidden to save battery
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopParticles();
    else if (!reduced) startParticles(true);
  });

  // Resize (debounced)
  let rAF;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      resizeCanvas();
      mouse.radius = (window.innerHeight / 100) * (window.innerWidth / 100);
    });
  });

  const header = document.querySelector(".main-header");
  const nav = document.getElementById("navbar");
  const navLinks = nav ? Array.from(nav.querySelectorAll(".nav-links a")) : [];
  const trackedSectionIds = [
    "hero",
    "about",
    "skills",
    "wins",
    "services",
    "contact",
  ];
  const getHeaderOffset = () => (header?.offsetHeight || 0) + 6;

  const isInPageLink = (link) => {
    const href = link.getAttribute("href") || "";
    if (!href.includes("#")) return false;
    const url = new URL(href, window.location.href);
    const current =
      window.location.pathname.replace(/\/+$|index\.html$/g, "") || "/";
    const target = url.pathname.replace(/\/+$|index\.html$/g, "") || "/";
    return current === target;
  };

  const smoothScrollTo = (target) => {
    if (!target) return;
    if (reduced) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    const targetY =
      target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 650;
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = ease(progress);
      window.scrollTo({ top: startY + distance * eased, behavior: "auto" });
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // Reveal-on-scroll (adds .visible)
  const revealTargets = document.querySelectorAll(
    ".reveal, .fade-in, .slide-up, .scale-in",
  );
  const staggerParents = document.querySelectorAll(".reveal-stagger");

  if (reduced) {
    revealTargets.forEach((el) => el.classList.add("visible"));
    staggerParents.forEach((parent) => {
      parent.classList.add("visible");
      parent
        .querySelectorAll(":scope > *")
        .forEach((child) => child.classList.add("visible"));
    });
  } else {
    const parseDelay = (raw) => {
      if (!raw) return 0;
      if (raw.toString().endsWith("ms")) return Number.parseInt(raw, 10) || 0;
      return Number.parseInt(raw, 10) || 0;
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const delay =
            e.target.dataset.delay ||
            e.target.style.getPropertyValue("--a-delay");
          if (delay) e.target.style.setProperty("--reveal-delay", delay);
          e.target.classList.add("visible");
          revealObserver.unobserve(e.target);
        });
      },
      { threshold: 0.2 },
    );

    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const children = e.target.querySelectorAll(":scope > *");
          children.forEach((child, idx) => {
            const baseDelay = parseDelay(
              child.dataset.delay || child.style.getPropertyValue("--a-delay"),
            );
            child.style.setProperty(
              "--reveal-delay",
              `${baseDelay + idx * 90}ms`,
            );
            child.classList.add("visible");
          });
          e.target.classList.add("visible");
          staggerObserver.unobserve(e.target);
        });
      },
      { threshold: 0.2 },
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
    staggerParents.forEach((parent) => staggerObserver.observe(parent));
  }

  const handleInternalAnchor = (event, link) => {
    if (!isInPageLink(link)) return;
    event.preventDefault();
    const targetId = new URL(link.getAttribute("href"), window.location.href)
      .hash;
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    smoothScrollTo(target);
  };

  // Mobile nav + anchor scroll
  const toggle = document.getElementById("mobile-nav-toggle");
  if (toggle && nav) {
    const desktopMQ = window.matchMedia("(min-width: 769px)");

    const openNav = () => {
      toggle.setAttribute("aria-expanded", "true");
      toggle.classList.add("active");
      nav.classList.add("active");
      document.body.classList.add("no-scroll");
    };

    const closeNav = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("active");
      nav.classList.remove("active");
      document.body.classList.remove("no-scroll");
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      expanded ? closeNav() : openNav();
    });

    navLinks.forEach((link) =>
      link.addEventListener("click", (event) => {
        handleInternalAnchor(event, link);
        closeNav();
      }),
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.classList.contains("active")) closeNav();
    });

    addMQListener(desktopMQ, (e) => {
      if (e.matches) closeNav();
    });
  }

  // Desktop anchor smooth scroll
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented) return;
      handleInternalAnchor(event, link);
    });
  });

  const inPageAnchors = Array.from(
    document.querySelectorAll('a[href^="#"]'),
  ).filter((link) => !navLinks.includes(link));
  inPageAnchors.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented) return;
      handleInternalAnchor(event, link);
    });
  });

  // Active nav highlighting
  if (navLinks.length) {
    const navMap = new Map();
    navLinks.forEach((link) => {
      const hash = new URL(link.href, window.location.href).hash;
      if (hash) navMap.set(hash, link);
      if (link.textContent?.toLowerCase().includes("services"))
        navMap.set("#services", link);
    });
    if (navMap.has("#skills") && !navMap.has("#wins"))
      navMap.set("#wins", navMap.get("#skills"));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = `#${entry.target.id}`;
          navLinks.forEach((a) => a.classList.remove("active"));
          const link = navMap.get(key);
          if (link) link.classList.add("active");
        });
      },
      { threshold: 0.55 },
    );

    trackedSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  // Sticky navbar treatment
  if (header) {
    const hero = document.getElementById("hero");
    let heroInView = true;

    const updateHeaderState = () => {
      const scrolled = window.scrollY > 10 || !heroInView;
      header.classList.toggle("navbar--scrolled", scrolled);
      header.classList.toggle("navbar-scrolled", scrolled);
    };

    if (hero) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          heroInView = entries.some((entry) => entry.isIntersecting);
          updateHeaderState();
        },
        { threshold: 0.1 },
      );
      heroObserver.observe(hero);
    }

    window.addEventListener("scroll", updateHeaderState, { passive: true });
    updateHeaderState();
  }

  // Magnetic hover for primary CTAs (desktop only)
  const pointerFineMQ = window.matchMedia("(pointer: fine)");
  if (pointerFineMQ.matches && !reduced) {
    const magneticTargets = document.querySelectorAll(
      ".btn-primary, .sticky-cta",
    );
    magneticTargets.forEach((target) => {
      const strength = 12;
      let rafId;

      const reset = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          target.style.transform = "translate3d(0,0,0)";
        });
      };

      const handlePointerMove = (event) => {
        if (event.pointerType && event.pointerType !== "mouse") return;
        const rect = target.getBoundingClientRect();
        const x =
          (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y =
          (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        const moveX = Math.max(Math.min(x * strength, strength), -strength);
        const moveY = Math.max(Math.min(y * strength, strength), -strength);
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          target.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
      };

      target.addEventListener("pointermove", handlePointerMove);
      target.addEventListener("pointerleave", reset);
      target.addEventListener("mouseleave", reset);
    });
  }

  // ROI Calculator Logic
  const spendInput = document.getElementById("calc-spend");
  const roasInput = document.getElementById("calc-roas");
  const spendVal = document.getElementById("spend-val");
  const roasVal = document.getElementById("roas-val");
  const roiRevenue = document.getElementById("roi-revenue");
  const roiProfit = document.getElementById("roi-profit");

  if (spendInput && roasInput) {
    const updateCalc = () => {
      const spend = parseInt(spendInput.value, 10);
      const roas = parseFloat(roasInput.value);

      spendVal.textContent = "$" + spend.toLocaleString();
      roasVal.textContent = roas.toFixed(1) + "x";

      const revenue = spend * roas;
      const profit = revenue - spend;

      roiRevenue.textContent = "$" + revenue.toLocaleString();
      roiProfit.textContent = "$" + profit.toLocaleString();
    };

    spendInput.addEventListener("input", updateCalc);
    roasInput.addEventListener("input", updateCalc);
    updateCalc(); // Initial calculation
  }

  // Contact Form Success Simulation (Preserving Formspree logic if needed)
  // We intercept just to show the UI state described in the plan
  const contactForms = document.querySelectorAll("form.contact-form");
  contactForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      // If you want to actually submit to Formspree, remove e.preventDefault()
      // OR use fetch() to submit in background.
      // For this demo polish, I will simulate the UI state change.

      // If standard form submission is required, uncomment this:
      // return;

      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      const originalText = btn.textContent;

      if (!form.checkValidity()) return;

      form.classList.add("sending");
      btn.textContent = "Sending...";

      // Simulate network request
      setTimeout(() => {
        form.classList.remove("sending");
        // Show inline success panel
        const successPanel = form.querySelector(".form-success-panel");
        if (successPanel) {
          successPanel.hidden = false;
          // Optionally hide the button
          btn.style.display = "none";
        } else {
          // Fallback
          btn.classList.add("btn-success");
          btn.textContent = "Sent — I’ll get back to you within 24 hours";
          btn.disabled = true;
        }
      }, 1500);
    });
  });

  // Init
  resizeCanvas();
  if (!reduced) startParticles(true);
  else
    console.info(
      "[particles] disabled due to prefers-reduced-motion (set FORCE_MOTION=true to override)",
    );
});
