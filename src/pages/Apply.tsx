import React from 'react';
import { ApplyWizard } from '@/features/apply-wizard';
import { NebulaBackground } from '@/components/ui/NebulaBackground';
import { SEO } from '@/components/seo/Head';

export const Apply = () => {
  return (
    <>
      <SEO
        title="Qualify for Growth | RR Labs"
        description="Check if you qualify for our dedicated growth program or partner network. Takes less than 60 seconds."
      />
      <div className="min-h-screen relative overflow-hidden">
        <NebulaBackground />
        <div className="relative z-10 w-full h-full">
          <ApplyWizard />
        </div>
      </div>
    </>
  );
};
