<route lang="json5">
{
  "name": "Webview",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script lang="ts" setup>
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
