<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';

// 获取代理对象
const proxy = getCurrentInstance()?.proxy;

// 获取appStore
const appStore = useAppStore();

onLaunch(async () => {
  // #ifdef H5
  const { MODE } = import.meta.env;
  // 可以继续增加条件，比如嵌套在 小程序、app 内的情况，当前仅校验是否h5的开发环境
  if (MODE === 'development') {
    const Vconsole = await import('vconsole').then(res => res.default);
    void new Vconsole();
  }
  // #endif

  // 调用初始化全局异步等待
  await appStore.initGlobalAsync();
  // 通知页面加载完成
  proxy?.$resolveAppLaunched();
});
</script>

<style lang="scss">
/** 给内置 button 上色 */
button[type='primary'] {
  background-color: var(--primary);
}

button[type='primary']:hover {
  background-color: var(--primary-hover);
}

/* 隐藏 scroll-view 的滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

/* #ifdef H5 */
:global(.uni-tabbar) {
  visibility: hidden;
}
/* #endif */
</style>
