import React from 'react';
import { WizardProvider } from '@/features/wizard/context/WizardContext';
import { WizardStepRenderer } from '@/features/wizard/components/WizardStepRenderer';
import { NebulaBackground } from '@/components/ui/NebulaBackground';
import { SEO } from '@/components/seo/Head';

export const Apply = () => {
  return (
    <WizardProvider>
      <SEO
        title="Qualify for Growth | RR Labs"
        description="Check if you qualify for our dedicated growth program or partner network. Takes less than 60 seconds."
      />
      <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
        <NebulaBackground />
        <div className="relative z-10 w-full max-w-2xl bg-white/90 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl">
          <WizardStepRenderer />
        </div>
      </div>
    </WizardProvider>
  );
};
