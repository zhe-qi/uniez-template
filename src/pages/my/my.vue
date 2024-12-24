<script lang="ts" setup>
import TabBar from '@/components/tab-bar/tab-bar.vue';

const appStore = useAppStore();
</script>

<template>
  <view class="">
    <zq-navbar :bg="appStore.themeVars['--color-bg']" :left-icon="false">
      我的
    </zq-navbar>
    <view class="p-4">
      我的页面
    </view>
    <TabBar :index="1" />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
