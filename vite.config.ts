// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: 3002,
    allowedHosts: ['webdigitalark.com', 'www.webdigitalark.com'],
  },
})
