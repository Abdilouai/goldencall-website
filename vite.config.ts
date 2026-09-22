import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      // Exclude API files from client bundle so Rollup doesn't try to compile backend code
      external: [/\/api\/.*/],
      output: {
        // Keep the framework in its own chunk: it barely changes between
        // deploys, so returning visitors keep it cached instead of
        // re-downloading it with every content update.
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});