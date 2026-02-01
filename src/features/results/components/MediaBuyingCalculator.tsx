
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight } from 'lucide-react';

export const MediaBuyingCalculator = () => {
    // Inputs (State)
    const [spend, setSpend] = useState([10000]);
    const [cpm, setCpm] = useState([25]);      // $25 CPM
    const [ctr, setCtr] = useState([1.5]);     // 1.5% CTR
    const [cv, setCv] = useState([2.0]);       // 2.0% Conversion Rate
    const [aov, setAov] = useState([150]);     // $150 AOV

    // Derived Metrics
    // Impressions = Spend / (CPM / 1000)
    const impressions = spend[0] / (cpm[0] / 1000);

    // Clicks = Impressions * (CTR / 100)
    const clicks = impressions * (ctr[0] / 100);

    // Conversions = Clicks * (CV / 100)
    const conversions = clicks * (cv[0] / 100);

    // Revenue = Conversions * AOV
    const revenue = conversions * aov[0];

    // ROAS = Revenue / Spend
    const roas = revenue / spend[0];

    return (
        <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md">
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-primary" />
                            Projection Engine
                        </h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Adjust the levers of growth to see your potential revenue.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Monthly Spend */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-300">Monthly Ad Spend</span>
                            <span className="text-white font-mono">${spend[0].toLocaleString()}</span>
                        </div>
                        <Slider
                            value={spend}
                            min={1000}
                            max={100000}
                            step={1000}
                            onValueChange={setSpend}
                            className="py-2"
                        />
                    </div>

                    {/* CPM */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-300">CPM (Cost per 1k views)</span>
                            <span className="text-white font-mono">${cpm[0].toFixed(2)}</span>
                        </div>
                        <Slider
                            value={cpm}
                            min={5}
                            max={100}
                            step={1}
                            onValueChange={setCpm}
                            className="py-2"
                        />
                    </div>

                    {/* CTR */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-300">Click-Through Rate (CTR)</span>
                            <span className="text-white font-mono">{ctr[0].toFixed(1)}%</span>
                        </div>
                        <Slider
                            value={ctr}
                            min={0.1}
                            max={5.0}
                            step={0.1}
                            onValueChange={setCtr}
                            className="py-2"
                        />
                    </div>

                    {/* Funnel Conversion Rate */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-300">Funnel Conversion Rate</span>
                            <span className="text-white font-mono">{cv[0].toFixed(1)}%</span>
                        </div>
                        <Slider
                            value={cv}
                            min={0.1}
                            max={10.0}
                            step={0.1}
                            onValueChange={setCv}
                            className="py-2"
                        />
                    </div>

                    {/* AOV */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-300">Average Order Value (AOV)</span>
                            <span className="text-white font-mono">${aov[0].toFixed(0)}</span>
                        </div>
                        <Slider
                            value={aov}
                            min={20}
                            max={2000}
                            step={10}
                            onValueChange={setAov}
                            className="py-2"
                        />
                    </div>
                </div>
            </div>

            {/* Results Panel */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-zinc-900/80 backdrop-blur-md p-8 flex flex-col justify-between">

                {/* Visual Background Graph/Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/40 blur-[80px] rounded-full" />
                </div>

                <div>
                    <h3 className="text-lg font-bold text-primary mb-6 uppercase tracking-wider text-xs">Projected Monthly Outcome</h3>

                    <div className="space-y-6">
                        <div>
                            <span className="text-zinc-500 text-sm block mb-1">Projected Revenue</span>
                            <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                                ${Math.round(revenue).toLocaleString()}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                            <div>
                                <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Target ROAS</span>
                                <span className={`text-2xl font-mono font-bold ${roas < 1 ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {roas.toFixed(2)}x
                                </span>
                            </div>
                            <div>
                                <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Conversions</span>
                                <span className="text-2xl font-mono font-bold text-white">
                                    {Math.round(conversions).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                                <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Traffic (Clicks)</span>
                                <span className="text-lg font-mono text-zinc-300">
                                    {Math.round(clicks).toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Impressions</span>
                                <span className="text-lg font-mono text-zinc-300">
                                    {(impressions > 1000000) ? (impressions / 1000000).toFixed(1) + 'M' : Math.round(impressions).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <Button
                        className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
                        onClick={() => window.dispatchEvent(new Event('open-wizard'))}
                    >
                        Book Strategy Call <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-zinc-500 text-xs text-center mt-3">
                        Inputs based on industry benchmarks. Apply to get a custom forecast.
                    </p>
                </div>
            </div>
        </div>
    );
};
