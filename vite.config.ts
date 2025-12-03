import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer(),
        ],
      },
    },
    // Fallback to '/' if VITE_BASE_PATH is not set (e.g., Vercel)
    base: process.env.VITE_BASE_PATH || '/',
    define: {
      '__APP_BASE_PATH__': JSON.stringify(process.env.VITE_BASE_PATH || '/')
    }
  }
})
