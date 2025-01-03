import type { PromiseReject, PromiseResolve, PromiseWithResolvers } from './types';

export const prototypeInterceptor = {
  install() {
    // 解决低版本手机不识别 array.at() 导致运行报错的问题
    if (typeof Array.prototype.at !== 'function') {
      // eslint-disable-next-line no-extend-native
      Array.prototype.at = function (index: number) {
        if (index < 0) { return this[this.length + index]; }
        if (index >= this.length) { return undefined; }
        return this[index];
      };
    }

    // 添加 Promise.withResolvers polyfill
    if (typeof Promise.withResolvers !== 'function') {
      Promise.withResolvers = function<T>(): PromiseWithResolvers<T> {
        let resolve!: PromiseResolve<T>;
        let reject!: PromiseReject;
        const promise = new Promise<T>((res, rej) => {
          resolve = res;
          reject = rej;
        });
        return { promise, resolve, reject };
      };
    }
  },
};
