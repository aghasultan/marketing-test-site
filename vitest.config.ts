import { defineConfig } from 'vitest/config';
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
    test: {
        exclude: [
            'tests/**',           // Playwright e2e tests (use @playwright/test)
            'node_modules/**',
        ],
    },
});
