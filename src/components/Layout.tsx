import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { InteractiveBg } from './ui/InteractiveBg';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <InteractiveBg />
      <div id="gradient-bg" aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(120deg, var(--background-subtle), var(--background), var(--background-subtle))',
        opacity: 1
      }}></div>

      <Header />
      <main className="content-wrapper" id="main">
        {children}
      </main>
      <Footer />
    </>
  );
};
