import React from 'react';
import { Header } from './layout/Header';
import { Footer } from './Footer';
import { InteractiveBg } from './ui/InteractiveBg';

interface LayoutProps {
  children: React.ReactNode;
}

import { initAnimatedBackground } from './ui/AnimatedBackground';
import { useEffect, useRef } from 'react';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = initAnimatedBackground(bgRef.current);
    return cleanup;
  }, []);

  return (
    <>
      <InteractiveBg />
      <div
        ref={bgRef}
        id="gradient-bg"
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(120deg,var(--background-subtle),var(--background),var(--background-subtle))]"
      />

      <Header />
      <main className="content-wrapper pt-16" id="main">
        {children}
      </main>
      <Footer />
    </>
  );
};
