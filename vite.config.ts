import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

const PROJECT_ROOT = __dirname;
const OUTPUT = resolve(PROJECT_ROOT, 'public/build'); // change to your output folder
const ASSETS = 'assets'; // change to your assets folder

const ENTRY = {
  index: resolve(PROJECT_ROOT,  'index.html'),
  //app: resolve(PROJECT_ROOT,  `${ASSETS}/main.tsx`),
  // backend: resolve(PROJECT_ROOT,  `${ASSETS}/backend.ts`),
  // debug: resolve(PROJECT_ROOT,  `${ASSETS}/styles/debug.pcss`),
  // rte: resolve(PROJECT_ROOT,  `${ASSETS}/styles/rte.pcss`),
};


export default defineConfig({
  plugins: [tailwindcss()],

  server: {
    host: true,
    port: 8181,
    open: '/',
  },

  base: '/',
  publicDir: false,

  build: {
    manifest: true,
    outDir: resolve(PROJECT_ROOT, OUTPUT),
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: true,

    rollupOptions: {
      input: ENTRY,
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
  },

  css: {
    devSourcemap: true,
  },

  resolve: {
    alias: {
      '@': resolve(PROJECT_ROOT, ASSETS),
    },
  },
});
