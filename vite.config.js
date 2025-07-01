import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  },
  // 👇 handle react-router-dom routing fallback
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // 👇 most important
  base: '/',
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf.worker.entry'],
  },
})
