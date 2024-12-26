import uni from '@dcloudio/vite-plugin-uni';
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts';
/**
 * 分包优化、模块异步跨包调用、组件异步跨包引用
 * @see https://github.com/uni-ku/bundle-optimizer
 */
import Optimization from '@uni-ku/bundle-optimizer';

import AutoImport from 'unplugin-auto-import/vite';

import { plugins } from './config';

export async function getPlugins() {
  const unocss = await import('unocss/vite').then(i => i.default);

  return [
    uniLayouts(),
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
    Optimization({
      enable: {
        'optimization': true,
        'async-import': true,
        'async-component': true,
      },
      dts: {
        'async-import': {
          path: 'src/types/async-import.d.ts',
        },
        'async-component': {
          path: 'src/types/async-component.d.ts',
        },
      },
    }),
    ...plugins,
  ];
}
