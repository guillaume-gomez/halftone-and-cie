import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/halftone-and-cie/",
  plugins: [
    react(),
    checker({typescript: true}),
  ],
})
