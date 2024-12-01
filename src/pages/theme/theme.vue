<script lang="ts" setup>
const appStore = useAppStore();

function handleClickTheme(color: string) {
  appStore.themeVars['--primary'] = color;
}
</script>

<template>
  <view class="flex flex-col gap-4 p-4">
    <view class="text-primary font-500">
      以下均是动态主题：
    </view>

    <view class="title">
      我是绿色主题
    </view>
    <uv-button type="primary" :color="appStore.themeVars['--primary']" @click="handleClickTheme('green')">
      点击我测试动态主题
    </uv-button>

    <view class="text-red-500">
      我是红色主题
    </view>
    <uv-button type="primary" :color="appStore.themeVars['--primary']" @click="handleClickTheme('red')">
      点击我测试动态主题
    </uv-button>
  </view>
</template>

<style lang="scss" scoped>
.title {
  font-size: 24rpx;
  font-weight: 500;
  color: var(--primary);
}
</style>
