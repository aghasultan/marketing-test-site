import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
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
    base: mode === 'production' ? '/marketing-test-site/' : '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    }
  };
});
