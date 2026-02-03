import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@content": path.resolve(__dirname, "./src/content"),
    },
  },
  // FIX: Force root base for Vercel deployment
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // manualChunks: {
        //   vendor: ['react', 'react-dom', 'framer-motion', 'react-router-dom'],
        // },
      },
    },
    target: 'esnext',
  }
});
