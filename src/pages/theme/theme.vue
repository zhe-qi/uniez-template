<route lang="json5">
{
  "name": "Theme",
  "style": {
    "navigationBarTitleText": "动态主题",
    "navigationStyle": "custom"
  },
  "meta": {
    "ignoreAuth": true
  }
}
</route>

<script lang="ts" setup>
import NavBar from '@/components/nav-bar/nav-bar.vue';

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
  <view class="w-full">
    <NavBar>
      动态主题
    </NavBar>
    <view class="mt-4 flex flex-col gap-4 px-4">
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
  </view>
</template>

<style lang="postcss" scoped>
.title {
  @apply text-24px font-500 text-[var(--wot-color-theme)];
}
</style>
