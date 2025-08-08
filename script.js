/* ==========================================================
   script.js — Particles + reveal-on-scroll + mobile nav
   Top-notch + battery aware + touch/mouse reactive
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js');

  /* ---------------- CONFIG ---------------- */
  const CFG = {
    DENSITY: 9000,            // lower = more particles
    MAX_PARTICLES: 320,       // hard cap for performance
    COLOR: 'rgba(0,168,107,0.4)',
    LINE_BASE: 'rgba(0,168,107,', // alpha appended dynamically
    CONNECT: 7,               // connection distance factor
    FORCE_MOTION: false       // set true to ignore reduced-motion
  };

  /* ---------------- REDUCED MOTION ---------------- */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = mq.matches && !CFG.FORCE_MOTION;
  mq.addEventListener?.('change', e => {
    reduced = e.matches && !CFG.FORCE_MOTION;
    reduced ? stopParticles() : startParticles(true);
  });

  /* ---------------- CANVAS ---------------- */
  const canvas = document.getElementById('interactive-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let particles = [];
  let raf = null;
  let lastSizeKey = '';

  const mouse = {
    x: null, y: null,
    radius: (window.innerHeight/100) * (window.innerWidth/100)
  };

  function resizeCanvas(){
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    // avoid re-initting if size didn't change meaningfully
    const key = `${Math.round(w/20)}x${Math.round(h/20)}`;
    if (key !== lastSizeKey){ lastSizeKey = key; if (!reduced) initParticles(); }
  }

  class Particle {
    constructor(x,y,dx,dy,s){ this.x=x; this.y=y; this.dx=dx; this.dy=dy; this.s=s; }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.s,0,Math.PI*2);
      ctx.fillStyle = CFG.COLOR; ctx.fill();
    }
    update(){
      if (this.x > canvas.width || this.x < 0)  this.dx = -this.dx;
      if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

      const dx = (mouse.x ?? -9999) - this.x;
      const dy = (mouse.y ?? -9999) - this.y;
      const dist = Math.hypot(dx,dy);
      if (dist < mouse.radius + this.s){
        if (mouse.x < this.x && this.x < canvas.width - this.s * 10) this.x += 5;
        if (mouse.x > this.x && this.x > this.s * 10)              this.x -= 5;
        if (mouse.y < this.y && this.y < canvas.height - this.s*10) this.y += 5;
        if (mouse.y > this.y && this.y > this.s * 10)               this.y -= 5;
      }
      this.x += this.dx; this.y += this.dy; this.draw();
    }
  }

  function initParticles(){
    particles.length = 0;
    const count = Math.min(CFG.MAX_PARTICLES, (canvas.width * canvas.height) / CFG.DENSITY);
    for (let i=0;i<count;i++){
      const s = Math.random()*2 + 1;
      particles.push(new Particle(
        Math.random() * (canvas.width - s*2) + s*2,
        Math.random() * (canvas.height - s*2) + s*2,
        (Math.random()*0.4) - 0.2,
        (Math.random()*0.4) - 0.2,
        s
      ));
    }
  }

  function connect(){
    for (let a=0;a<particles.length;a++){
      for (let b=a;b<particles.length;b++){
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const d2 = dx*dx + dy*dy;
        if (d2 < (canvas.width/CFG.CONNECT) * (canvas.height/CFG.CONNECT)){
          ctx.strokeStyle = CFG.LINE_BASE + (1 - d2/20000) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x,particles[a].y);
          ctx.lineTo(particles[b].x,particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function frame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i=0;i<particles.length;i++) particles[i].update();
    connect();
    raf = requestAnimationFrame(frame);
  }

  function startParticles(reinit=false){
    if (reinit) initParticles();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }
  function stopParticles(){
    cancelAnimationFrame(raf);
    raf = null;
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  // Mouse / touch
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive:true });
  window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; }, { passive:true });
  window.addEventListener('touchstart', e => {
    const t = e.touches[0]; mouse.x = t.clientX; mouse.y = t.clientY;
  }, { passive:true });
  window.addEventListener('touchmove', e => {
    const t = e.touches[0]; mouse.x = t.clientX; mouse.y = t.clientY;
  }, { passive:true });

  // Pause on tab hidden to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopParticles(); else if (!reduced) startParticles(true);
  });

  // Resize (debounced)
  let rAF;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      resizeCanvas();
      mouse.radius = (window.innerHeight/100) * (window.innerWidth/100);
    });
  });

  // Reveal-on-scroll (adds .visible)
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if (e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.2});
  document.querySelectorAll('.reveal, .fade-in, .slide-up, .scale-in').forEach(el=>io.observe(el));

  // Mobile nav
  const toggle = document.getElementById('mobile-nav-toggle');
  const nav = document.getElementById('navbar');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('no-scroll', !expanded);
    });
  }

  // Init
  resizeCanvas();
  if (!reduced) startParticles(true);
  else console.info('[particles] disabled due to prefers-reduced-motion (set FORCE_MOTION=true to override)');
});
