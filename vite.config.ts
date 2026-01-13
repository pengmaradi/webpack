import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const PROJECT_ROOT = __dirname;
// 项目根目录
const projectRoot = process.cwd()

// 多入口
const ENTRY = {
    app: resolve(PROJECT_ROOT, 'assets/app.ts'),
    input: resolve(PROJECT_ROOT, 'assets/index.html'),
    // print: resolve(PROJECT_ROOT, 'assets/styles/print.pcss'),
    // debug: resolve(PROJECT_ROOT, 'assets/styles/debug.pcss'),
    // pdf: resolve(PROJECT_ROOT, 'assets/styles/pdf.pcss'),
    // rte: resolve(PROJECT_ROOT, 'assets/styles/rte.pcss'),
};

// 输出目录（你的原配置）
const OUTPUT = resolve(PROJECT_ROOT, 'public/');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    define: {
      'import.meta.env.VITE_NEWS_API_KEY': JSON.stringify(env.VITE_NEWS_API_KEY),
    },
    root: resolve(PROJECT_ROOT, 'assets'),
    base: '/',
    server: {
      host: '0.0.0.0',
      port: 8989,
      open: true,
      cors: true,
    },

    publicDir: false,

    build: {
      manifest: true,
      outDir: resolve(PROJECT_ROOT, OUTPUT),
      sourcemap: true,
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

    // 路径别名配置
    resolve: {
      alias: {
        '@': resolve(projectRoot, 'assets'),
        '@styles': resolve(projectRoot, 'assets/styles'),
        '@images': resolve(projectRoot, 'assets/images'),
        '@fonts': resolve(projectRoot, 'assets/fonts'),
        '@icons': resolve(projectRoot, 'assets/icons'),
      }
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
        ],
      }),
    ],
  };
});
