/* ==========================================================
   script.js — Canvas particles, reveal-on-scroll, mobile nav
   Best-in-class optimized version
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Remove fallback class for JS-enabled browsers
  document.body.classList.remove('no-js');

  /* ---------------- CONFIG ---------------- */
  const CONFIG = {
    DENSITY: 9000,                // Lower = more particles
    MAX_PARTICLES: 350,
    PARTICLE_COLOR: 'rgba(0,168,107,0.4)',
    LINE_COLOR_BASE: 'rgba(0,168,107,', // Alpha appended dynamically
    CONNECT_FACTOR: 7,
    REDUCED_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  /* ---------------- CANVAS SETUP ---------------- */
  const canvas = document.getElementById('interactive-bg');
  const ctx = canvas.getContext('2d');
  const mouse = {
    x: null,
    y: null,
    radius: (window.innerHeight / 100) * (window.innerWidth / 100)
  };
  let particles = [];

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (!CONFIG.REDUCED_MOTION) initParticles();
  };

  class Particle {
    constructor(x, y, dx, dy, size) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.PARTICLE_COLOR;
      ctx.fill();
    }

    update() {
      if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
      if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

      // Interaction with mouse/touch
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 5;
        if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5;
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 5;
        if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5;
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }

  const initParticles = () => {
    particles = [];
    const count = Math.min(
      CONFIG.MAX_PARTICLES,
      (canvas.width * canvas.height) / CONFIG.DENSITY
    );
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 1;
      particles.push(
        new Particle(
          Math.random() * (canvas.width - size * 2) + size * 2,
          Math.random() * (canvas.height - size * 2) + size * 2,
          (Math.random() * 0.4) - 0.2,
          (Math.random() * 0.4) - 0.2,
          size
        )
      );
    }
  };

  const connectParticles = () => {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < (canvas.width / CONFIG.CONNECT_FACTOR) * (canvas.height / CONFIG.CONNECT_FACTOR)) {
          ctx.strokeStyle = CONFIG.LINE_COLOR_BASE + (1 - distSq / 20000) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    connectParticles();
    requestAnimationFrame(animate);
  };

  /* ---------------- REVEAL ON SCROLL ---------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------------- MOBILE NAV ---------------- */
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const nav = document.getElementById('navbar');

  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('active');
  });

  /* ---------------- MOUSE / TOUCH TRACKING ---------------- */
  window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
  }, { passive: true });

  /* ---------------- INIT ---------------- */
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  if (!CONFIG.REDUCED_MOTION) {
    animate();
  }
});
