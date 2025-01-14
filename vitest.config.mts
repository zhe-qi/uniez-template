import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  test: {
    globals: true, // This is needed by @testing-library to be cleaned up after each test
    environment: path.resolve(__dirname, './test/env/uniapp.ts'),
    environmentOptions: {
      uniapp: {
        domEnvironment: 'happy-dom',
      },
    },
    env: loadEnv('', process.cwd(), ''),
  },
});
