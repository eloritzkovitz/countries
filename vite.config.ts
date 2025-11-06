import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@constants': path.resolve(__dirname, 'src/shared/constants'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@features': path.resolve(__dirname, 'src/features'), 
      '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@services': path.resolve(__dirname, 'src/shared/services'),
      '@types': path.resolve(__dirname, 'src/shared/types'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
    },
  },
})
