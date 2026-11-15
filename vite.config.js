import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Cho phép mở trực tiếp file dist/index.html không cần web server
  plugins: [
    tailwindcss(),
    react()
  ],
})
