<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';

// 获取代理对象
const proxy = getCurrentInstance()?.proxy;
onLaunch(async () => {
  // 数组里可以放入您想要在页面加载之前需要执行的一些逻辑哦。
  // 例如：初始化全局参数、初始化字典等操作，不影响ui和页面加载，除非刻意等待。
  await Promise.all([
    // 初始化全局参数
    // 初始化字典
  ]);

  // 通知页面加载完成
  proxy?.$resolveAppLaunched();
});
</script>

<style lang="scss">
button[type='primary'] {
  background-color: var(--primary);
}

button[type='primary']:hover {
  background-color: var(--primary-hover);
}

/* 隐藏scroll-view的滚动条 */
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
