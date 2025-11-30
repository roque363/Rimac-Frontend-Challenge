import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: 'https://roque363.github.io/Rimac-Frontend-Challenge',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@root/styles/variables" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, 'src'),
    },
  },
});
