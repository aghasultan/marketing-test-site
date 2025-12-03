import React, { useRef } from 'react';
import { useParticles } from '../../hooks/useParticles';

export const InteractiveBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      id="interactive-bg"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      style={{ background: 'transparent' }}
    />
  );
};
