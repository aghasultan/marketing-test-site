/* ================================
   background.js – Animated Gradient (optional)
   Runs behind the particle canvas. Respects reduced motion.
   ================================ */
(() => {
  const el = document.getElementById('gradient-bg');
  if (!el) return;

  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = media.matches;

  const colors = [
    [255,255,255],
    [246,255,249],
    [236,253,245],
    [255,255,255]
  ];

  let step = 0;
  const idx = [0,1,2,3];
  const speed = 0.0016;
  let raf = null;

  media.addEventListener?.('change', e => {
    reduced = e.matches;
    if (reduced){ cancelAnimationFrame(raf); el.style.background='linear-gradient(90deg,#fff,#f6fff9)'; }
    else animate();
  });

  function lerp(a,b,t){return a+(b-a)*t}
  function color(a,b,t){
    return `rgb(${Math.round(lerp(a[0],b[0],t))},${Math.round(lerp(a[1],b[1],t))},${Math.round(lerp(a[2],b[2],t))})`;
  }

  function tick(){
    const c0a = colors[idx[0]], c0b = colors[idx[1]];
    const c1a = colors[idx[2]], c1b = colors[idx[3]];
    const cLeft  = color(c0a,c0b,step);
    const cRight = color(c1a,c1b,1-step);
    el.style.background = `linear-gradient(90deg, ${cLeft}, ${cRight})`;

    step += speed;
    if (step >= 1){
      step %= 1;
      idx[0] = idx[1]; idx[2] = idx[3];
      idx[1] = (idx[1] + 1 + Math.floor(Math.random()*(colors.length-1))) % colors.length;
      idx[3] = (idx[3] + 1 + Math.floor(Math.random()*(colors.length-1))) % colors.length;
    }
    raf = requestAnimationFrame(tick);
  }

  function animate(){
    cancelAnimationFrame(raf);
    if (!reduced) raf = requestAnimationFrame(tick);
  }

  animate();

  // Pause when tab hidden to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else animate();
  });
})();
