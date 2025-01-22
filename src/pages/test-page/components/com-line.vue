<script lang="ts" setup>
const props = defineProps<{
  desc: string;
}>();

const emit = defineEmits<{
  (e: 'clickCustomEvent', desc: string): void;
}>();

const appStore = useAppStore();
</script>

<template>
  <wd-button type="primary" @click="emit('clickCustomEvent', props.desc)">
    点击我测试外部自定义事件
  </wd-button>
</template>

<style lang="scss" scoped>
//
</style>
