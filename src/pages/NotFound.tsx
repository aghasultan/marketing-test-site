import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@components/SEO';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
      <SEO
        title="Page Not Found | Agha Sultan Naseer"
        description="The page you are looking for does not exist."
      />

      <div className="fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-shadow-glow">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-200">
          Page Not Found
        </h2>
        <p className="text-slate-400 text-lg max-w-md mx-auto mb-10 slide-up" style={{ '--a-delay': '100ms' } as React.CSSProperties}>
          The page you are looking for might have been moved, deleted, or possibly never existed.
        </p>

        <Link
          to="/"
          className="btn btn-primary hover-glow inline-flex items-center gap-2 px-8 py-3"
        >
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
