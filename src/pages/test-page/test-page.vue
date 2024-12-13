<script lang="ts" setup>
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
  <view class="flex flex-col gap-4 p-4">
    <view class="text-primary font-500">
      以下均是动态组件：
    </view>

    <template v-for="item in components" :key="item">
      <component :is="item" cementing="test" :desc="item" @click-custom-event="handleClickCustomEvent">
        <view>{{ item }}</view>
      </component>
    </template>
  </view>
</template>

<style lang="scss" scoped>
</style>
