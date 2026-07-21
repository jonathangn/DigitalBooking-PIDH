import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://backend:8080',
        changeOrigin: true,
      },
    },
    allowedHosts: ['pf-digitalbooking.indhub.co']
  },
  base: './',
  build: {
    outDir: 'build',
  },
});