import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NebulaBackground } from '@/components/ui/NebulaBackground';
import { SEO } from '@/components/seo/Head';
import { useToast } from '@/hooks/use-toast';

const SERVICES = [
    { id: 'meta', label: 'Meta Ads', desc: 'Facebook & Instagram' },
    { id: 'google', label: 'Google Ads', desc: 'Search & Display' },
    { id: 'tiktok', label: 'TikTok Ads', desc: 'Short-Form Video' },
    { id: 'seo', label: 'SEO', desc: 'Organic Growth' },
    { id: 'full-stack', label: 'Full-Stack Growth', desc: 'All Channels' },
];

const BUDGET_RANGES = [
    'Under $5,000/mo',
    '$5,000 – $15,000/mo',
    '$15,000 – $50,000/mo',
    '$50,000 – $100,000/mo',
    '$100,000+/mo',
];

interface FormData {
    fullName: string;
    email: string;
    company: string;
    budget: string;
    services: string[];
    message: string;
}

const initialForm: FormData = {
    fullName: '',
    email: '',
    company: '',
    budget: '',
    services: [],
    message: '',
};

export const Contact = () => {
    const [form, setForm] = useState<FormData>(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const toggleService = (id: string) => {
        setForm(prev => ({
            ...prev,
            services: prev.services.includes(id)
                ? prev.services.filter(s => s !== id)
                : [...prev.services, id],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.fullName || !form.email || !form.services.length) {
            toast({
                title: 'Missing fields',
                description: 'Please fill in your name, email, and select at least one service.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        // TODO: Replace with your actual webhook/API endpoint
        // Example: await fetch('https://your-n8n-webhook.com/contact', { method: 'POST', body: JSON.stringify(form) })
        console.log('📩 Lead form submission:', form);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <>
            <SEO
                title="Get in Touch | RR Labs"
                description="Ready to scale your paid media? Tell us about your business and we'll create a custom growth plan for your Meta, Google, or TikTok ad campaigns."
            />
            <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
                <NebulaBackground />

                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="relative z-10 w-full max-w-lg text-center space-y-6"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center"
                            >
                                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                            </motion.div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                We've Got Your Brief!
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-md mx-auto">
                                Our growth team will review your details and reach out within <strong className="text-foreground">24 hours</strong> with a custom strategy.
                            </p>
                            <Button
                                onClick={() => { setIsSubmitted(false); setForm(initialForm); }}
                                variant="outline"
                                className="mt-4"
                            >
                                Submit Another Inquiry
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="relative z-10 w-full max-w-2xl"
                        >
                            {/* Header */}
                            <div className="text-center mb-8 space-y-3">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                    <Sparkles className="w-4 h-4" />
                                    Let's Build Something Great
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                                    Get in <span className="text-primary">Touch</span>
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                                    Tell us about your business and the channels you want to dominate. We'll craft a growth plan tailored to you.
                                </p>
                            </div>

                            {/* Form Card */}
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white/90 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6"
                            >
                                {/* Name + Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Full Name <span className="text-red-500">*</span></label>
                                        <Input
                                            placeholder="Sultan Nasser"
                                            value={form.fullName}
                                            onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                                            className="h-12 bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Work Email <span className="text-red-500">*</span></label>
                                        <Input
                                            type="email"
                                            placeholder="you@company.com"
                                            value={form.email}
                                            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                                            className="h-12 bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                                        />
                                    </div>
                                </div>

                                {/* Company + Budget Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Company / Brand</label>
                                        <Input
                                            placeholder="Acme Corp"
                                            value={form.company}
                                            onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
                                            className="h-12 bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Monthly Ad Budget</label>
                                        <select
                                            value={form.budget}
                                            onChange={e => setForm(prev => ({ ...prev, budget: e.target.value }))}
                                            className="w-full h-12 px-3 rounded-md bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="" className="bg-white dark:bg-zinc-900">Select range...</option>
                                            {BUDGET_RANGES.map(range => (
                                                <option key={range} value={range} className="bg-white dark:bg-zinc-900">{range}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Services Selection */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-foreground">Services Interested In <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {SERVICES.map(service => {
                                            const selected = form.services.includes(service.id);
                                            return (
                                                <button
                                                    type="button"
                                                    key={service.id}
                                                    onClick={() => toggleService(service.id)}
                                                    className={`p-3 rounded-xl text-left transition-all border ${selected
                                                        ? 'bg-primary/10 border-primary/50 text-primary ring-1 ring-primary/30'
                                                        : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-foreground hover:border-primary/30'
                                                        }`}
                                                >
                                                    <div className="font-medium text-sm">{service.label}</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5">{service.desc}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Tell Us About Your Goals</label>
                                    <textarea
                                        placeholder="What are you looking to achieve? Any specific KPIs, challenges, or timelines?"
                                        value={form.message}
                                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                                        rows={4}
                                        className="w-full px-3 py-3 rounded-md bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="w-full h-14 text-lg font-bold group"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                    ) : (
                                        <>
                                            Send My Brief
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">
                                    No spam, no obligation. We'll review your brief and respond within 24 hours.
                                </p>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
