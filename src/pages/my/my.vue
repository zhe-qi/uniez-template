<route lang="json5">
{
  "name": "My",
  "style": {
    "navigationBarTitleText": "我的",
    "navigationStyle": "custom"
  },
  "meta": {
    "ignoreAuth": true
  }
}
</route>

<script lang="ts" setup>
import TabBar from '@/components/tab-bar/tab-bar.vue';
</script>

<template>
  <view class="">
    <wd-navbar title="我的" safe-area-inset-top placeholder :fixed="true" />
    <view class="p-4">
      我的页面
    </view>
    <TabBar :index="1" />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
