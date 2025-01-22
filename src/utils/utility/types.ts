import type { formatDate } from './utils';

// 导出全局属性类型
export type UtilityTypes = {
  $formatDate: typeof formatDate;

  /** 应用启动完成的Promise对象，可用于等待应用初始化完成 */
  $appLaunchedPromise: Promise<void>;
  /** 用于解决应用启动Promise的函数，在应用初始化完成时调用 */
  $resolveAppLaunched: (value: void | PromiseLike<void>) => void;
};

export type PromiseResolve<T> = (value: T | PromiseLike<T>) => void;
export type PromiseReject = (reason?: any) => void;

export interface PromiseWithResolvers<T> {
  promise: Promise<T>;
  resolve: PromiseResolve<T>;
  reject: PromiseReject;
}
