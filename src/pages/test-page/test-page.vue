<route lang="json5">
{
  "name": "TestPage",
  "style": {
    "navigationBarTitleText": "测试页面",
    "navigationStyle": "custom"
  },
  "meta": {
    "ignoreAuth": true
  }
}
</route>

<script lang="ts" setup>
import NavBar from '@/components/nav-bar/nav-bar.vue';

const components = [
  'desc',
  'line',
  'title',
  'test',
];

function handleClickCustomEvent(desc: string) {
  console.log('触发动态组件自定义事件', desc);
}
</script>

<template>
  <view class="">
    <NavBar>
      测试动态组件页面
    </NavBar>

    <view class="px-4">
      <view class="mt-4 text-primary font-500">
        以下均是动态组件：
      </view>

      <view class="flex flex-col gap-4">
        <template v-for="item in components" :key="item">
          <component :is="item" cementing="test" :desc="item" @click-custom-event="handleClickCustomEvent">
            <view>{{ item }}</view>
          </component>
        </template>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
</style>
