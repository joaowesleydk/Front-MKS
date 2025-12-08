import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('react-icons')) {
              return 'icons';
            }
            if (id.includes('swiper') || id.includes('toast')) {
              return 'ui-libs';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})
