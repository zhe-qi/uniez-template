<script setup lang="ts">
import TabBar from '@/components/tab-bar/tab-bar.vue';

const router = useRouter();
const appStore = useAppStore();

const title = ref('Hello');

const proxy = getCurrentInstance()?.proxy;
// 如果需要等待全局逻辑执行完毕后，则必须等待 proxy?.$appLaunchedPromise，其他生命周期也是如此。
onLoad(async () => {
  // 在此处可以与全局逻辑并行执行哦。
  await proxy?.$appLaunchedPromise;
  // app中初始化加载逻辑执行完成
});

function toHello() {
  router.push({
    name: 'Hello',
  });
}
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    {{ $formatDate(new Date().getTime()) }}
    <view class="text-area">
      <text class="title text-red-500">
        {{ title }}
      </text>
    </view>

    <view class="mt-4 flex flex-col gap-4">
      <uv-button type="primary" :color="appStore.themeVars['--primary']" @click="toHello">
        跳转分包页面
      </uv-button>

      <uv-button type="primary" :color="appStore.themeVars['--primary']" @click="router.push({ name: 'Test' })">
        跳转测试 component is 页面
      </uv-button>

      <uv-button type="primary" :color="appStore.themeVars['--primary']" @click="router.push({ name: 'Theme' })">
        跳转测试动态主题测试页面
      </uv-button>
    </view>

    <TabBar :index="0" />
  </view>
</template>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}
</style>
