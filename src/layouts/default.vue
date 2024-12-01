<script lang="ts" setup>
const appStore = useAppStore();
</script>

<template>
  <view class="h-full w-full" :style="appStore.themeVars">
    <slot />
  </view>
</template>
