import React from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/lib/constants";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-zinc-950/40 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="font-bold text-xl font-sans tracking-tight text-foreground">
                            Riffat <span className="text-primary">Labs</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Building high-performance automation for the verify-first era.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-sm text-foreground">Product</h4>
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-sm text-foreground">Resources</h4>
                        <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Blog
                        </Link>
                        <Link to="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Documentation
                        </Link>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-sm text-foreground">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Github">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 md:mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Riffat Labs. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
