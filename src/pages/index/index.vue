<script setup lang="ts">
import TabBar from '@/components/tab-bar/tab-bar.vue';

const { VITE_APP_TITLE } = import.meta.env;

const router = useRouter();
const appStore = useAppStore();

const title = ref(VITE_APP_TITLE);

const proxy = getCurrentInstance()?.proxy;
// 如果需要等待全局逻辑执行完毕后，则必须等待 proxy?.$appLaunchedPromise，其他生命周期也是如此
onLoad(async () => {
  // 在此处可以与全局逻辑并行执行
  await proxy?.$appLaunchedPromise;
  // app中初始化加载逻辑执行完成
});

function toListPage() {
  router.push({
    name: 'List',
    params: {
      title: 'List',
    },
  });
}

onMounted(() => {
  // #ifdef H5
  // 预加载h5页面，h5可以预加载，记得删掉
  uni.preloadPage({
    url: '/pages-sub/list/list',
  });
  uni.preloadPage({
    url: '/pages/test-page/test-page',
  });
  uni.preloadPage({
    url: '/pages/theme/theme',
  });
  // #endif
});
</script>

<template>
  <view class="flex-center flex-col">
    <image class="logo" src="/static/logo.png" />
    <!-- 测试模板全局方法，鼠标移入可以显示其类型 -->
    {{ $formatDate(new Date().getTime()) }}
    <view class="flex justify-center">
      <text class="title mt-4 text-primary font-500">
        {{ title }}
      </text>
    </view>

    <view class="mt-8 flex flex-col gap-4">
      <uv-button type="primary" :color="appStore.themeVars['--primary']" @click="toListPage">
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

<!-- 关于为什么使用 postcss 而不是scss，因为 scss 使用 @apply 爆警告，如果你能做到无视警告，请使用scss -->
<style lang="postcss" scoped>
.logo {
  @apply mb-10 mx-auto h-200 w-200 mt-[200rpx];
}
</style>
