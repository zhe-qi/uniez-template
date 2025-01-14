import type { Environment } from 'vitest/environments';
import uni from '@dcloudio/uni-h5';
import { Window } from 'happy-dom';
import { populateGlobal } from 'vitest/environments';

export default <Environment>({
  name: 'uniapp',
  transformMode: 'web',
  async setup(global, environmentOptions) {
    // 创建 happy-dom 窗口实例
    const window = new Window({
      url: 'http://localhost:5173',
    }) as any;

    // 注入 uni 对象
    window.uni = uni;

    // 注入基础配置
    window.__uniConfig = {
      networkTimeout: {
        request: 60000,
      },
    };

    // 填充全局对象
    const { keys, originals } = populateGlobal(global, window, {
      bindFunctions: true,
    });

    return {
      teardown() {
        keys.forEach(key => delete global[key]);
        originals.forEach((v, k) => (global[k] = v));
        window.happyDOM?.cancelAsync();
      },
    };
  },
});
