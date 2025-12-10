import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false, // Remove source maps (oculta código)
    minify: 'terser', // Minifica o código
    terserOptions: {
      compress: {
        drop_console: false, // MANTÉM console.log para debug
        drop_debugger: false // MANTÉM debugger
      },
      mangle: {
        keep_fnames: true // Mantém nomes de funções para stack traces
      }
    }
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
})
