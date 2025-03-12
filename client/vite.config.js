import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: './env',
  plugins: [react()],
  server: {
    port: 5173, // Vite will still run on 5173
    proxy: {
      "/graphql": "http://localhost:5001", // Redirect GraphQL requests
    },
  },
});
