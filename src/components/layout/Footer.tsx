import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/lib/constants";
import { Github, Twitter, Linkedin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const { toast } = useToast();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setStatus("idle");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error("Failed to subscribe");

            setStatus("success");
            setEmail("");
            toast({
                title: "Subscribed!",
                description: "You've been added to the newsletter.",
            });
        } catch (error) {
            setStatus("error");
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="w-full border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950/40 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        <Link to="/" className="font-bold text-xl font-sans tracking-tight text-foreground">
                            RR <span className="text-primary">Labs</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            Building high-performance automation for the verify-first era.
                            We help brands scale with data-driven paid media and conversion optimization.
                        </p>

                        {/* Newsletter Form */}
                        <div className="mt-4">
                            <h4 className="font-semibold text-sm text-foreground mb-2">Join the Newsletter</h4>
                            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-9 bg-white dark:bg-zinc-900"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading || status === "success"}
                                />
                                <Button size="sm" type="submit" disabled={isLoading || status === "success"}>
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : status === "success" ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    ) : (
                                        "Subscribe"
                                    )}
                                </Button>
                            </form>
                            {status === "success" && (
                                <p className="text-xs text-green-600 dark:text-green-500 mt-2 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Thanks for subscribing!
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-xs text-red-600 dark:text-red-500 mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> Failed to subscribe.
                                </p>
                            )}
                        </div>
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

                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} RR Labs. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
