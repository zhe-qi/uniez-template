import { defineStore } from 'pinia';

export const useAppStore = defineStore('AppStore', () => {
  /** 全局动态主题 */
  const themeVars = ref({
    '--primary': '#0957DE',
    '--info': '#697387',
    '--text-color': '#333333',
    '--color-bg': '#f9f9f9',
  });
  return {
    themeVars,
  };
});
