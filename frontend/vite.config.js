import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    cors: {
      origin: true
    },
  },

  plugins: [react()], 
})
