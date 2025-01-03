import type { App } from 'vue';
import { formatDate } from './utils';

/**
 * 初始化并注册全局工具函数
 * @param app - Vue 应用实例
 */
export function setupUtils(app: App) {
  // 应用启动Promise
  const appLaunchedPromise = new Promise<void>((resolve) => {
    app.config.globalProperties.$resolveAppLaunched = resolve;
  });
  app.config.globalProperties.$appLaunchedPromise = appLaunchedPromise;

  // 注册日期格式化函数
  app.config.globalProperties.$formatDate = formatDate;
}

export * from './prototype';
export type { UtilityTypes } from './types';
