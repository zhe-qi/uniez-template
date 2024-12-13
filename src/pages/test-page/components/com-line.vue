<script lang="ts" setup>
const props = defineProps<{
  desc: string
}>();

const emit = defineEmits<{
  (e: 'clickCustomEvent', desc: string): void
}>();

const appStore = useAppStore();
</script>

<template>
  <uv-button type="primary" :color="appStore.themeVars['--primary']" @click="emit('clickCustomEvent', props.desc)">
    点击我测试外部自定义事件
  </uv-button>
</template>

<style lang="scss" scoped>
//
</style>
