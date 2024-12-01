import uni from '@dcloudio/vite-plugin-uni';
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import AutoImport from 'unplugin-auto-import/vite';
import vitePluginDynamicComponent from './vite-plugin-dynamic-component';

export async function getPlugins() {
  const unocss = await import('unocss/vite').then(i => i.default);

  return [
    uniLayouts(),
    uni(),
    vitePluginDynamicComponent({
      components: {
        test: {
          desc: './components/com-desc.vue',
          line: './components/com-line.vue',
          title: './components/com-title.vue',
          test: '@/components/test-components/test-components.vue',
        },
      },
      debug: false,
    }),
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
  ];
}
