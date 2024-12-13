import uni from '@dcloudio/vite-plugin-uni';
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts';
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
    ...plugins,
  ];
}
