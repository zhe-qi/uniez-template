import { defineStore } from 'pinia';

export const useAppStore = defineStore('AppStore', () => {
  /** 全局动态主题 */
  const themeVars = ref({
    '--primary': '#0957DE',
    '--primary-hover': '#818cf8',
    '--info': '#697387',
    '--text-color': '#333333',
    '--color-bg': '#f9f9f9',
  });

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
  };
});
