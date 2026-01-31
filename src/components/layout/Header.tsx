import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { MobileNav } from "./MobileNav";
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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled && "bg-zinc-950/90 backdrop-blur-md border-white/10"
            )}
        >
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="font-bold text-xl text-zinc-100">
                    Riffat Labs
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}

                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Apply
                    </Button>
                </div>

                {/* Mobile Nav Trigger */}
                <MobileNav />
            </nav>
        </header>
    );
}
