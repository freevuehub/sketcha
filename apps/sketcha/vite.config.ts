import path from 'path'
import { defineConfig } from 'vite'
import { version } from './package.json'

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {},
})
