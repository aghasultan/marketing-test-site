import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/seo/Head';

import { Button } from '@/components/ui/button';
import { NebulaBackground } from '@/components/ui/NebulaBackground';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative z-10 overflow-hidden">
      <SEO
        title="Page Not Found | RR Labs"
        description="The page you are looking for does not exist."
      />
      <NebulaBackground />

      <div className="fade-in relative z-20">
        <h1 className="text-5xl md:text-9xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 dark:from-white to-zinc-400 dark:to-zinc-500">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-zinc-700 dark:text-zinc-200">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
          The page you are looking for might have been moved, deleted, or possibly never existed.
        </p>

        <Link to="/">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-glow">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
