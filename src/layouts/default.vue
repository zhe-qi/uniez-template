<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { theme, themeVars } = storeToRefs(appStore);
</script>

<template>
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <slot />
  </wd-config-provider>
</template>
