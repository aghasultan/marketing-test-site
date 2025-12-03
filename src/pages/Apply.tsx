import React from 'react';
import { Wizard } from '../components/ui/Wizard';
import { SEO } from '../components/SEO';

export const Apply = () => {
  return (
    <>
      <SEO
        title="Apply for Strategy | Agha Sultan Naseer"
        description="Book a strategy call to scale your ad spend."
      />
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <Wizard />
      </div>
    </>
  );
};
