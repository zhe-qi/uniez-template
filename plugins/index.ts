import uni from '@dcloudio/vite-plugin-uni';
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import uniManifest from '@uni-helper/vite-plugin-uni-manifest';
import uniPages from '@uni-helper/vite-plugin-uni-pages';
/**
 * 分包优化、模块异步跨包调用、组件异步跨包引用
 * @see https://github.com/uni-ku/bundle-optimizer
 */
import Optimization from '@uni-ku/bundle-optimizer';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';

import { plugins, subPackages } from './config';

export async function getPlugins() {
  const unocss = await import('unocss/vite').then(i => i.default);

  // h5通常都需要支持更低级的手机和浏览器，但是会增加打包体积和时间，所以自己权衡，默认开启
  const legacyPlugin = process.env.UNI_PLATFORM === 'h5'
    ? legacy({
      targets: ['defaults', 'not IE 11'],
    })
    : null;

  return [
    uniLayouts(),
    uniManifest(),
    uniPages({
      exclude: ['**/components/**/**.*'],
      routeBlockLang: 'json5',
      dts: 'src/types/uni-pages.d.ts',
      subPackages,
    }),
    uni(),
    unocss(),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        {
          'uni-mini-router': ['useRouter', 'useRoute'],
        },
        {
          'alova/client': ['useRequest'],
        },
      ],
      dts: 'src/types/auto-import.d.ts',
      dirs: ['src/hooks', 'src/store/modules'],
      vueTemplate: true,
    }),
    // Optimization 插件需要 page.json 文件，故应在 UniPages 插件之后执行
    Optimization({
      enable: {
        'optimization': true,
        'async-import': true,
        'async-component': true,
      },
      dts: {
        base: 'src/types',
      },
      logger: false,
    }),
    ...(legacyPlugin ? [legacyPlugin] : []),
    ...plugins,
  ];
}
