export const initAnimatedBackground = () => {
    const el = document.getElementById("gradient-bg");
    if (!el) return () => { };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = media.matches;

    // Zinc-950 Theme Colors (RGB tuples)
    // Dark mode colors will be handled by CSS, this is for Light/Default mode or if we enable it
    const colors = [
        [247, 249, 252], // var(--background)
        [238, 243, 249], // var(--background-subtle)
        [242, 245, 252], // --surface-elevated
        [247, 249, 252], // var(--background)
    ];

    let step = 0;
    const idx = [0, 1, 2, 3];
    const speed = 0.0016;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const color = (a: number[], b: number[], t: number) => {
        return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;
    };

    const tick = () => {
        // Respect Dark Mode: let CSS gradient handle it
        if (document.body.classList.contains("theme-dark")) {
            el.style.background = "";
        } else {
            const c0a = colors[idx[0]];
            const c0b = colors[idx[1]];
            const c1a = colors[idx[2]];
            const c1b = colors[idx[3]];

            const cLeft = color(c0a, c0b, step);
            const cRight = color(c1a, c1b, 1 - step);
            el.style.background = `linear-gradient(90deg, ${cLeft}, ${cRight})`;
        }

        step += speed;
        if (step >= 1) {
            step %= 1;
            idx[0] = idx[1];
            idx[2] = idx[3];
            idx[1] = (idx[1] + 1 + Math.floor(Math.random() * (colors.length - 1))) % colors.length;
            idx[3] = (idx[3] + 1 + Math.floor(Math.random() * (colors.length - 1))) % colors.length;
        }
        raf = requestAnimationFrame(tick);
    };

    const animate = () => {
        if (raf) canceAnimationFrame(raf);
        if (!reduced) raf = requestAnimationFrame(tick);
    };

    // Start
    animate();

    const handleMediaChange = (e: MediaQueryListEvent) => {
        reduced = e.matches;
        if (reduced) {
            cancelAnimationFrame(raf);
            el.style.background = "";
        } else {
            animate();
        }
    };

    media.addEventListener("change", handleMediaChange);

    return () => {
        cancelAnimationFrame(raf);
        media.removeEventListener("change", handleMediaChange);
    };
};

// Shim for canceAnimationFrame typo in my thought, fixed in code: cancelAnimationFrame
function canceAnimationFrame(id: number) {
    cancelAnimationFrame(id);
}
