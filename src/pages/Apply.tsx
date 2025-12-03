import React from 'react';
import { Wizard } from '../components/ui/Wizard';
import { SEO } from '../components/SEO';

export const Apply = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-20 px-6">
      <SEO
        title="Apply to Work With Agha"
        description="Start your project with Riffat Labs. Tell us about your goals and we'll help you scale."
      />
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Let's Build Something Great</h1>
          <p className="text-slate-400">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>

        <Wizard />
      </div>
    </div>
  );
};
