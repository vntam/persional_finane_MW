import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config stays tiny so teammates can extend with aliases/plugins later.
export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: Number(process.env.FRONTEND_PORT) || 5173
  }
}));
