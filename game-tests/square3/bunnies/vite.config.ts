import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: false,
  },
  esbuild: {
    target: 'es2022',
  },
});
