import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {

    // Background script disabled to enforce clean Dark Theme (Story 7-2)

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans antialiased text-foreground selection:bg-primary/20 relative">
            {/* Background Layers */}
            <div
                id="gradient-bg"
                aria-hidden="true"
                className="fixed inset-0 z-0 pointer-events-none bg-white dark:bg-zinc-950 transition-colors duration-300"
            />

            <Header />
            <main className="flex-1 w-full relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
}
