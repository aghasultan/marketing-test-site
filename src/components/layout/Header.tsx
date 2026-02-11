import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const SCROLL_THRESHOLD = 10;

    useMotionValueEvent(scrollY, "change", (latest) => {
        const scrolled = latest > SCROLL_THRESHOLD;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    });

    return (
        <header
            className={cn(
                "sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent w-full",
                isScrolled && "glass border-white/10"
            )}
        >
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="font-bold text-xl font-sans tracking-tight text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    RR <span className="text-emerald-600 dark:text-emerald-500">Labs</span>
                </Link>

                {/* Desktop Nav */}
                <div className="flex max-md:hidden items-center gap-8" data-testid="desktop-nav">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium text-sm"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <ThemeToggle />
                    <Link to="/apply">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                            Start Audit
                        </Button>
                    </Link>
                </div>

                {/* Mobile Nav Trigger */}
                <div className="md:hidden">
                    <MobileNav />
                </div>
            </nav>
        </header>
    );
}
