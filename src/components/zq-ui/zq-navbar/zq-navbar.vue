<script lang="ts" setup>
/**
 * 导航栏组件
 */
withDefaults(defineProps<{
  title: string
  leftIcon?: boolean
  placeholder?: boolean
  fixed?: boolean
}>(), {
  title: '',
  leftIcon: true,
  placeholder: true,
  fixed: true,
});

function handleLeftClick() {
  uni.navigateBack({
    fail: () => {
      uni.switchTab({
        url: '/pages/index/index',
      });
    },
  });
}
</script>

<template>
  <uv-navbar :title="title" :fixed="fixed" :placeholder="placeholder" left-icon="" bg-color="transparent" v-bind="$attrs">
    <template #left>
      <slot name="left">
        <view v-if="leftIcon" class="i-lucide-chevron-left text-lg" @click="handleLeftClick" />
      </slot>
    </template>
    <template #center>
      <slot />
    </template>
    <template #right>
      <slot name="right" />
    </template>
  </uv-navbar>
</template>
