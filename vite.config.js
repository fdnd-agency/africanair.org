import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: {
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true
      }
    })
  ],
  optimizeDeps: {
    exclude: ['maplibre-gl']
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100
    }
  }
});