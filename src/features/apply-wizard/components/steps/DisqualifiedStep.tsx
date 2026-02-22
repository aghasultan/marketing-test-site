import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/button';
import { useWizard } from '../../context/WizardContext';
import { FileText, ArrowLeft, ExternalLink } from 'lucide-react';

export const DisqualifiedStep: React.FC = () => {
    const { dispatch } = useWizard();

    const handleDownload = () => {
        import('jspdf').then(({ default: jsPDF }) => {
            const doc = new jsPDF();

            // Set font styles
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(22);
            doc.setTextColor(30, 41, 59); // zinc-800

            // Title
            doc.text('Growth Roadmap: 0 to $1M ARR', 20, 30);

            // Subtitle
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(14);
            doc.setTextColor(100, 116, 139); // slate-500
            doc.text('Strategic Foundation Checklist by RR Labs', 20, 40);

            // Separator
            doc.setDrawColor(226, 232, 240); // slate-200
            doc.line(20, 45, 190, 45);

            // Body text
            doc.setFontSize(12);
            doc.setTextColor(51, 65, 85); // slate-700

            const lines = [
                "Based on your current stage (sub-$1M ARR), your immediate focus should be:",
                "",
                "1. Founder-led Sales: Ensure product-market fit before pouring money",
                "   into paid acquisition.",
                "",
                "2. Organic Content & SEO: Build authority and capture high-intent",
                "   demand without relying solely on ad spend.",
                "",
                "3. Optimize Funnel: Fix drop-offs, improve conversion rates,",
                "   and maximize LTV before scaling traffic.",
                "",
                "4. Financial Modeling: Understand exactly what you can afford to pay",
                "   to acquire a customer (CAC target).",
                "",
                "When you hit the $1M milestone, return for our enterprise scaling framework."
            ];

            doc.text(lines, 20, 60);

            // Footer
            doc.setFontSize(10);
            doc.setTextColor(148, 163, 184); // slate-400
            doc.text('rr-labs.com/growth - Strict Qualification Framework', 20, 280);

            doc.save('RR_Labs_Growth_Roadmap.pdf');
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-8"
        >
            <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8" />
            </div>

            <div className="space-y-4 max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-white">Let's build your foundation first.</h2>
                <p className="text-zinc-400 leading-relaxed">
                    Based on your metrics, you are currently below our $1M ARR threshold.
                    Our scaling frameworks are designed for high-volume environments where
                    fractional efficiency gains yield massive returns.
                </p>
                <p className="text-zinc-400 leading-relaxed pt-2">
                    Instead of taking your money for a service you don't need yet, we've
                    compiled a <span className="text-white font-medium">Growth Roadmap</span> tailored to help you hit that milestone.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                <Button
                    variant="default"
                    className="flex items-center justify-center gap-2"
                    onClick={handleDownload}
                >
                    <FileText className="w-4 h-4" />
                    Download Growth Roadmap
                </Button>

                <a
                    href="https://partner-network.example.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex"
                >
                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                        View Partner Network
                        <ExternalLink className="w-4 h-4 text-zinc-500" />
                    </Button>
                </a>
            </div>

            <div className="pt-12">
                <button
                    onClick={() => dispatch({ type: 'PREV_STEP' })}
                    className="text-sm text-zinc-500 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go back and edit metrics
                </button>
            </div>
        </motion.div>
    );
};
