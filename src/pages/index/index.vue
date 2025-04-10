<route lang="json5" type="home">
{
  "name": "Index",
  "style": {
    "navigationBarTitleText": "首页",
    "navigationStyle": "custom"
  },
  "meta": {
    "ignoreAuth": true
  }
}
</route>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/nav-bar.vue';
import TabBar from '@/components/tab-bar/tab-bar.vue';

const router = useRouter();
const title = ref('一个“功能”和“开发体验”优先的 uniapp 的模板');

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

function handleWebview() {
  const url = `https://www.baidu.com/s?wd=uniez-template&_t=${Date.now()}`;
  let title = '我是h5标题';

  // #ifdef MP-WEIXIN
  // 小程序使用h5的标题
  title = '加载中...';
  // #endif

  router.push({
    name: 'Webview',
    params: {
      title,
      url: encodeURIComponent(url),
    },
  });
}

onMounted(() => {
  // #ifdef H5
  // TODO: 预加载h5页面，h5可以预加载，记得删掉
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
  <view class="w-full">
    <NavBar left-text="" :left-arrow="false">
      首页
    </NavBar>
    <view class="flex flex-center flex-col">
      <wd-img class="logo" src="/static/logo.png" />
      <!-- 测试模板全局方法，鼠标移入可以显示其类型 -->
      {{ $formatDate(new Date().getTime()) }}
    </view>
    <view class="flex justify-center">
      <text class="title mt-4 text-primary font-500">
        {{ title }}
      </text>
    </view>

    <view class="mt-8 flex flex-col gap-4 px-4">
      <wd-button @click="toListPage">
        跳转分包页面
      </wd-button>

      <wd-button @click="router.push({ name: 'TestPage' })">
        跳转测试 component is 页面
      </wd-button>

      <wd-button @click="router.push({ name: 'Theme' })">
        跳转测试动态主题测试页面
      </wd-button>

      <wd-button @click="handleWebview">
        跳转测试webview页面
      </wd-button>
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
