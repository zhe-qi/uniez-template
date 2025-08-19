import type { ConfigProviderThemeVars } from 'wot-design-uni';
import { defineStore } from 'pinia';
import { ThemeModeEnum } from '@/enums/appEnum';

export const useAppStore = defineStore('AppStore', () => {
  /** 组件库动态主题，持久化示例 */
  // const themeVars = ref<ConfigProviderThemeVars>(getCache('themeVars') ?? {});
  // watch(themeVars, (newVal) => {
  //   setCache('themeVars', newVal, 60 * 10);
  //   themeVars.value = newVal;
  // });
  // function getThemeVars() {
  //   return new Promise<ConfigProviderThemeVars>((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         colorTheme: '#0957DE',
  //       });
  //     });
  //   });
  // }
  // getThemeVars().then((res) => {
  //   themeVars.value = res;
  // });

  const themeVars = ref<ConfigProviderThemeVars>({ colorTheme: '#0957DE' });

  const theme = ref<GetEnumType<typeof ThemeModeEnum>>(ThemeModeEnum.LIGHT);

  /** 初始化全局异步等待 */
  const initGlobalAsync = async () => {
    // 数组里可以放入您想要在页面加载之前需要执行的一些逻辑。
    // 例如：初始化全局参数、初始化字典等操作，不影响ui和页面加载，除非刻意等待。

    // 在并行执行的方法之前执行的逻辑
    // ...

    // 并行执行的所有方法
    await Promise.all([
      // 初始化全局参数
      // 初始化字典
      // 并行执行的方法
    ]);
    // 在并行执行的方法之后执行的逻辑
    // ...
  };

  return {
    themeVars,
    theme,
    initGlobalAsync,
  };
});
