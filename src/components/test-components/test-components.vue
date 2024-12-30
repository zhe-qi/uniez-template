<script lang="ts">
// 微信小程序组件中使用样式穿透要加这个
export default {
  options: {
    styleIsolation: 'shared',
  },
};
</script>

<script lang="ts" setup>
// 这里写组件的逻辑
</script>

<template>
  <view>
    <wd-text type="primary" text="我是测试动态组件的全局组件" />
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-text) {
  font-weight: 500;
}
</style>
