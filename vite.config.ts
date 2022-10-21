import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "*": {
        target: "https://api-v2.ethvm.dev",
        changeOrigin: true,
        secure: false,
        rewrite: (d) => (d),
      },
    },
  },
  plugins: [react()]
})
