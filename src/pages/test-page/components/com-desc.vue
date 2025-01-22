<script lang="ts" setup>
defineProps<{
  desc: string;
}>();
</script>

<template>
  <view>
    <view class="text-zinc-400">
      测试属性功能：{{ desc }}
      <text>{{ desc }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
