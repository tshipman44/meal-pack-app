// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// No longer need to import dsv

export default defineConfig({
  plugins: [react()], // Remove dsv() from here
})