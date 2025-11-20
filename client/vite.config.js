import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',  // e.g., import from '@pages/Collection'
      'components': '/src/components',
      'common': '/src/components/common',
      'context': '/src/context',
      'pages': '/src/pages',
      'ui': '/src/ui',
      'api': '/src/api',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy backend calls to avoid CORS (optional but recommended)
    },
  },
});