import { useEffect, RefObject } from 'react';

// Configuration from legacy script
const CFG = {
  DENSITY: 9000,
  MAX_PARTICLES: 320,
  COLOR: "rgba(0,168,107,0.4)",
  LINE_BASE: "rgba(0,168,107,",
  CONNECT: 7,
  FORCE_MOTION: false,
};

export const useParticles = (canvasRef: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Context setup
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // State variables
    let particles: Particle[] = [];
    let rafId: number;
    let lastSizeKey = "";
    let isHidden = false;

    // Reduced motion check
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches && !CFG.FORCE_MOTION;

    // Mouse state
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: (window.innerHeight / 100) * (window.innerWidth / 100),
    };

    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      s: number;

      constructor(x: number, y: number, dx: number, dy: number, s: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.s = s;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
        ctx.fillStyle = CFG.COLOR;
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        const dx = (mouse.x ?? -9999) - this.x;
        const dy = (mouse.y ?? -9999) - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius + this.s) {
          if ((mouse.x ?? 0) < this.x && this.x < canvas.width - this.s * 10)
            this.x += 5;
          if ((mouse.x ?? 0) > this.x && this.x > this.s * 10) this.x -= 5;
          if ((mouse.y ?? 0) < this.y && this.y < canvas.height - this.s * 10)
            this.y += 5;
          if ((mouse.y ?? 0) > this.y && this.y > this.s * 10) this.y -= 5;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const initParticles = () => {
      particles = []; // Clear array
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
    };

    const connect = () => {
      if (!ctx) return;
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
    };

    const frame = () => {
      if (!ctx || !canvas || isHidden) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) particles[i].update();
      connect();
      rafId = requestAnimationFrame(frame);
    };

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      if (isHidden) {
        cancelAnimationFrame(rafId);
      } else if (!reduced) {
        frame();
      }
    };

    const resizeCanvas = () => {
        if (!canvas) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        // avoid re-initting if size didn't change meaningfully
        const key = `${Math.round(w / 20)}x${Math.round(h / 20)}`;
        if (key !== lastSizeKey) {
          lastSizeKey = key;
          if (!reduced) initParticles();
        }
        mouse.radius = (h / 100) * (w / 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    const handleTouch = (e: TouchEvent) => {
        const t = e.touches[0];
        if (t) {
            mouse.x = t.clientX;
            mouse.y = t.clientY;
        }
    };

    const handleReducedMotion = (e: MediaQueryListEvent) => {
        reduced = e.matches && !CFG.FORCE_MOTION;
        if (reduced) {
             cancelAnimationFrame(rafId);
             ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
             initParticles();
             frame();
        }
    }

    // Initialize
    resizeCanvas();
    if (!reduced) {
        initParticles();
        frame();
    }

    // Event Listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('touchmove', handleTouch);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    mq.addEventListener('change', handleReducedMotion);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mq.removeEventListener('change', handleReducedMotion);
    };
  }, [canvasRef]);
};
