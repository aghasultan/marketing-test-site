import React, { useEffect, useRef } from 'react';

interface NebulaBackgroundProps {
    className?: string; // Allow customization of container opacity/mix-blend
}

// Particle interface
interface Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
    alpha: number;
    targetAlpha: number;
}

const COLORS = [
    'rgba(59, 130, 246, 0.05)',  // Blue-500 very low opacity
    'rgba(16, 185, 129, 0.03)',   // Emerald-500 very low opacity
    'rgba(147, 51, 234, 0.03)',   // Purple-600 very low opacity
];

export const NebulaBackground: React.FC<NebulaBackgroundProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Check motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Responsive Canvas Sizing
        const resizeObserver = new ResizeObserver(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(); // Re-distribute on resize
        });
        resizeObserver.observe(document.body);

        const initParticles = () => {
            particlesRef.current = [];
            const particleCount = prefersReducedMotion ? 5 : 15; // Fewer particles if reduced motion to confuse less (though static)

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 400 + 200, // Very large soft blobs
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    vx: (Math.random() - 0.5) * 0.2, // Extremely slow drift
                    vy: (Math.random() - 0.5) * 0.2,
                    alpha: Math.random() * 0.5 + 0.2,
                    targetAlpha: Math.random() * 0.5 + 0.2
                });
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Use 'screen' or 'lighter' to blend colors nicely on dark background
            ctx.globalCompositeOperation = 'screen';

            particlesRef.current.forEach(p => {
                if (!prefersReducedMotion) {
                    p.x += p.vx;
                    p.y += p.vy;

                    // Screen wrapping for infinite drift
                    if (p.x < -p.radius) p.x = canvas.width + p.radius;
                    if (p.x > canvas.width + p.radius) p.x = -p.radius;
                    if (p.y < -p.radius) p.y = canvas.height + p.radius;
                    if (p.y > canvas.height + p.radius) p.y = -p.radius;
                }

                // Draw Gradient Orb
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, p.color); // Core color
                gradient.addColorStop(1, 'rgba(0,0,0,0)'); // Transparent edge

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        return () => {
            resizeObserver.disconnect();
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-0 pointer-events-none ${className}`}
            aria-hidden="true"
        />
    );
};
