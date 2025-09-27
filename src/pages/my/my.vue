<script lang="ts" setup>
import NavBar from '@/components/nav-bar/nav-bar.vue';
import TabBar from '@/components/tab-bar/tab-bar.vue';

definePage({
  name: 'My',
  title: '我的',
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
  meta: {
    ignoreAuth: true,
  },
  tabBar: {
    index: 1,
  },
});
</script>

<template>
  <view class="">
    <NavBar left-text="" :left-arrow="false" safe-area-inset-top placeholder :fixed="true">
      我的
    </NavBar>
    <view class="p-4">
      我的页面
    </view>
    <TabBar :index="1" />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
