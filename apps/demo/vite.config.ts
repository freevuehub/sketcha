import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080,
    open: './index.html',
    host: '0.0.0.0',
  },
})
