import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Link } from "react-router-dom";

export function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:bg-white/5" aria-label="Open menu" data-testid="mobile-menu-button">
                    <Menu className="w-6 h-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md glass border-l border-white/10 p-0" data-testid="mobile-menu-content">
                <SheetHeader className="p-6 border-b border-white/10 text-left">
                    <SheetTitle className="text-xl font-bold font-sans text-foreground">
                        Riffat Labs
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col p-6 gap-4">
                    {NAV_LINKS.map((link) => (
                        <SheetClose key={link.href} asChild>
                            <Link
                                to={link.href}
                                className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
                            >
                                {link.label}
                            </Link>
                        </SheetClose>
                    ))}
                    <div className="mt-6">
                        <SheetClose asChild>
                            <Link to="/apply">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 shadow-glow">
                                    Start Audit
                                </Button>
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
