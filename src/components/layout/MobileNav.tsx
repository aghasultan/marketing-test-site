import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function MobileNav() {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    className="md:hidden text-zinc-100 p-2"
                    aria-label="Open menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-zinc-950/90 backdrop-blur-xl border-l border-white/10 p-0"
            >
                <SheetHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
                    <SheetTitle className="text-xl font-bold text-zinc-100">
                        Riffat Labs
                    </SheetTitle>
                    {/* Close button is automatically added by SheetContent, but we can customize or rely on default */}
                </SheetHeader>

                <div className="flex flex-col p-4 gap-4 mt-4">
                    {NAV_LINKS.map((link) => (
                        <SheetClose key={link.href} asChild>
                            <a
                                href={link.href}
                                className="text-lg text-zinc-400 hover:text-zinc-100 py-3 border-b border-white/5 transition-colors"
                            >
                                {link.label}
                            </a>
                        </SheetClose>
                    ))}
                    <div className="mt-4">
                        <SheetClose asChild>
                            <Button
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white text-lg py-6"
                            >
                                Apply
                            </Button>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
