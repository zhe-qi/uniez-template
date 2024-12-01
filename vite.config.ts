import path from 'node:path';
import TransformPages from 'uni-read-pages-vite';
import { defineConfig, loadEnv } from 'vite';
import { getPlugins } from './plugins';

// https://vitejs.dev/config/
export default async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const plugins = await getPlugins();
  return defineConfig({
    publicDir: './public',
    plugins,
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
      },
    },
    define: {
      '__UNI_PLATFORM__': JSON.stringify(process.env.UNI_PLATFORM),
      'ROUTES': new TransformPages().routes,
      'import.meta.env': env,
    },
  });
};
