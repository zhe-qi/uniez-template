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
    <!-- 我是动态主题之css变量（包含unocss）css js都能用 -->
    <view class="text-primary font-500">
      以下均是动态组件：
    </view>
    <!-- 循环渲染动态组件目前必须叫cmp，这个item，后续考虑一下动态，后续考虑生成ts支持一下ts，现在没时间 -->
    <template v-for="cmp in components" :key="cmp">
      <component :is="cmp" cementing="test" :desc="cmp" @click-custom-event="handleClickCustomEvent">
        <view>{{ cmp }}</view>
      </component>
    </template>
  </view>
</template>

<style lang="scss" scoped>
</style>
