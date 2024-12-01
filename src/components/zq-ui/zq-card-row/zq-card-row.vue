<script lang="ts" setup>
/**
 * 卡片行组件
 * 用于通用展示卡片行
 */
withDefaults(defineProps<{
  title?: string
  desc?: string
  titleColor?: string
  mt?: number
  font500?: boolean
  descColor?: string
}>(), {
  title: '标题',
  desc: '描述',
  titleColor: '#333333',
  font500: false,
  descColor: '#666666',
  mt: 4,
});
</script>

<template>
  <view :class="`mt-${mt}`" class="flex items-center justify-between">
    <text :class="[font500 && 'font-500']" :style="{ color: titleColor }">
      {{ title }}
    </text>
    <slot name="desc">
      <text :style="{ color: descColor }">
        {{ desc }}
      </text>
    </slot>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
