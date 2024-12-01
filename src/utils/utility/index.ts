import type { App } from 'vue';
import dayjs from 'dayjs';

/**
 * 初始化并注册全局工具函数。
 *
 * 注意：注册这些全局方法后，请在 `./types` 目录下的相应 `.d.ts` 文件中添加它们的类型声明。
 *
 * @param app - Vue 应用实例。
 */
export function setupUtils(app: App) {
  app.config.globalProperties.$appLaunchedPromise = new Promise((resolve) => {
    app.config.globalProperties.$resolveAppLaunched = resolve;
  });

  app.config.globalProperties.$formatDate = (
    date: string | number | Date,
    format = 'YYYY-MM-DD HH:mm:ss',
  ) => {
    return dayjs(date).format(format);
  };
}

export * from './prototype';
