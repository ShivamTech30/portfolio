import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://ShivamTech30.github.io/",
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});