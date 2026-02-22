import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import matter from 'gray-matter';

function markdownPlugin(): Plugin {
  return {
    name: 'markdown-plugin',
    enforce: 'pre',
    transform(code, id) {
      const cleanId = id.split('?')[0];
      if (cleanId.endsWith('.md')) {
        const { data, content } = matter(code);
        return {
          code: `export default { frontmatter: ${JSON.stringify(data)}, content: ${JSON.stringify(content)} };`,
          map: null
        };
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), markdownPlugin()],
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
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react', 'react-router-dom'],
          markdown: ['gray-matter', 'zod']
        },
      },
    },
    target: 'esnext',
  },
});
