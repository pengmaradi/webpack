import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const PROJECT_ROOT = __dirname;


// 多入口
const ENTRY = {
    app: resolve(PROJECT_ROOT, 'assets/app.ts'),
    // print: resolve(PROJECT_ROOT, 'assets/styles/print.pcss'),
    // debug: resolve(PROJECT_ROOT, 'assets/styles/debug.pcss'),
    // pdf: resolve(PROJECT_ROOT, 'assets/styles/pdf.pcss'),
    // rte: resolve(PROJECT_ROOT, 'assets/styles/rte.pcss'),
};

// 输出目录（你的原配置）
const OUTPUT = resolve(PROJECT_ROOT, 'public/');

export default defineConfig(({ mode }) => {

  return {
    root: resolve(PROJECT_ROOT, 'assets'),
    server: {
      host: '0.0.0.0',
      port: 8989,
    },

    base: '/',
    publicDir: false,

    build: {
      manifest: true,
      outDir: resolve(PROJECT_ROOT, OUTPUT),
      emptyOutDir: true,
      copyPublicDir: false,

      rollupOptions: {
        input: ENTRY,
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      },
    },

    css: {
      devSourcemap: true,
    },

    plugins: [
      viteStaticCopy({
        targets: [
          { src: 'fonts/*', dest: 'fonts/' },
          { src: 'icons/*', dest: 'Icons/' },
          { src: 'images/*', dest: 'images/' },
          // try htmx
          //{src: resolve(__dirname, 'node_modules/htmx.org/dist/htmx.min.js'), dest: 'js/'},
        ],
      }),
    ],
  };
});
