import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Add a proxy for Firebase connections
    proxy: {
      '/.well-known/firebase': {
        target: 'https://rosebelt-consultants-global.firebaseio.com',
        changeOrigin: true,
        secure: true
      },
      '/v0': {
        target: 'https://rosebelt-consultants-global.firebaseio.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
