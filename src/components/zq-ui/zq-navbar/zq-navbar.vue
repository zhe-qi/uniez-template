<script lang="ts" setup>
/**
 * 导航栏组件
 */
withDefaults(defineProps<{
  title: string
  leftIcon?: boolean
  placeholder?: boolean
  fixed?: boolean
  bg?: string
}>(), {
  title: '',
  leftIcon: true,
  placeholder: true,
  fixed: true,
  bg: 'transparent',
});

const router = useRouter();

function handleLeftClick() {
  uni.navigateBack({
    fail: () => {
      router.pushTab({
        name: 'Index',
      });
    },
  });
}
</script>

<template>
  <uv-navbar :fixed="fixed" :placeholder="placeholder" left-icon="" :bg-color="bg" v-bind="$attrs">
    <template #left>
      <slot name="left">
        <view v-if="leftIcon" class="i-lucide-chevron-left text-xl" @click="handleLeftClick" />
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
