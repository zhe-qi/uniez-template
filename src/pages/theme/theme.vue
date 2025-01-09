<route lang="json5">
{
  "name": "Theme",
  "style": {
    "navigationBarTitleText": "动态主题"
  },
  "meta": {
    "ignoreAuth": true
  }
}
</route>

<script lang="ts" setup>
const appStore = useAppStore();

const colors = {
  green: 'green',
  red: 'red',
};

function handleClickTheme(color: string) {
  appStore.themeVars.colorTheme = color;
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
    <wd-button type="primary" @click="handleClickTheme(colors.green)">
      点击我测试动态主题
    </wd-button>

    <view class="title">
      我是红色主题
    </view>
    <wd-button type="primary" @click="handleClickTheme(colors.red)">
      点击我测试动态主题
    </wd-button>
  </view>
</template>

<style lang="scss" scoped>
.title {
  font-size: 24rpx;
  font-weight: 500;
  color: var(--wot-color-theme);
}
</style>
