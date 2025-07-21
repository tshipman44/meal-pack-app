import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dsv from '@rollup/plugin-dsv' // Use the rollup plugin


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
