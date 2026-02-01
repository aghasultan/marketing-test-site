import React, { useEffect, useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { InteractiveBg } from "@/components/ui/InteractiveBg";
import { initAnimatedBackground } from "@/components/ui/AnimatedBackground";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize animated background if needed (or move to Hero component later)
        // For now, keeping it to maintain existing behavior if any, but properly imported.
        // Wait, initAnimatedBackground is from the old file.
        // Let's check if it's compatible.
        if (typeof initAnimatedBackground === 'function') {
            const cleanup = initAnimatedBackground(bgRef.current);
            return cleanup;
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans antialiased text-foreground selection:bg-primary/20 relative">
            {/* Background Layers */}
            <InteractiveBg />
            <div
                ref={bgRef}
                id="gradient-bg"
                aria-hidden="true"
                className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(120deg,hsl(var(--background)),hsl(var(--background)),hsl(var(--background)))] opacity-50"
            />

            <Header />
            <main className="flex-1 w-full relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
}
