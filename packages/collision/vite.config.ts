import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/square3-collision/index.ts'),
      formats: ['es'],
      fileName: 'square3-collision',
    },
  },
  esbuild: {
    target: 'es2022',
  },
  plugins: [dts({ include: 'src/square3-collision', rollupTypes: true })],
});
