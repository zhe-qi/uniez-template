<route lang="json5">
{
  "name": "Webview",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script lang="ts" setup>
/**
 * 1. webview 的标题栏部分在小程序是不允许自定义的,可以通过跳转过来传递title的形式
 * 2. 要想实现 webview 和 h5 通信，需要通过动态改变 webview 的 src 来实现，实现重载后
 * 可以选择性添加随机值强刷h5页面。
 *
 * @example
 * const router = useRouter();
 * router.push({
 *   name: 'Webview',
 *   params: {
 *     title: '我是标题',
 *     url: encodeURIComponent(`https://www.baidu.com`),
 *   },
 * });
 */
import type { WebViewOnMessageEvent } from '@uni-helper/uni-app-types';

const url = ref();
onLoad((op) => {
  if (op?.title) {
    uni.setNavigationBarTitle({
      title: op.title,
    });
  }
  if (op?.url || op?.src) {
    url.value = decodeURIComponent(op?.url || op?.src);
  }
});

function handleMessage(e: WebViewOnMessageEvent) {
  uni.showModal({
    content: JSON.stringify(e.detail),
    showCancel: false,
  });
}
</script>

<template>
  <view class="">
    <web-view :src="url" @message="handleMessage" />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
