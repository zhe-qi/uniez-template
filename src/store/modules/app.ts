import type { ConfigProviderThemeVars } from 'wot-design-uni';
import { ThemeModeEnum } from '@/enums/appEnum';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('AppStore', () => {
  /** 组件库动态主题，持久化示例 */
  // const themeVars = ref<ConfigProviderThemeVars>(getCache('themeVars') ?? {});
  // // 持久化和模拟异步获取，10分钟过期，null 不过期，不传时间走 undefined 默认7天
  // watch(themeVars, (newVal) => {
  //   setCache('themeVars', newVal, 60 * 10);
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

  const theme = ref<ThemeModeEnum>(ThemeModeEnum.LIGHT);

  /**
   * 关于持久化，可以导入 getCache 和 setCache 函数,可以设置过期时间可以设置默认值
   *
   * 例如：
   * const theme = ref(getCache('theme') ?? {})
   *
   * 然后使用watch监听theme的修改同时使用setCache持久化
   * 当然也可以使用computed 的 get 和 set 方法
   */

  return {
    themeVars,
    theme,
  };
});
