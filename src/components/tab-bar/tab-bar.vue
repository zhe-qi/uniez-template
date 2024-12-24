<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    index: number
    placeholder?: boolean
  }>(),
  {
    index: 1,
    placeholder: true,
  },
);

const appStore = useAppStore();
const router = useRouter();

function handleChange(index: number) {
  if (index === props.index) { return; }
  let name = '';
  switch (index) {
  case 0: name = 'Index'; break;
  case 1: name = 'My'; break;
  }
  router.pushTab({ name });
}
</script>

<template>
  <uv-tabbar
    :active-color="appStore.themeVars['--primary']" inactive-color="#9ca3af" :value="index"
    :placeholder="placeholder" @change="handleChange"
  >
    <uv-tabbar-item text="首页">
      <template #active-icon>
        <view class="i-lucide-house text-primary" />
      </template>
      <template #inactive-icon>
        <view class="i-lucide-house text-gray" />
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="我的">
      <template #active-icon>
        <view class="i-lucide-user text-primary" />
      </template>
      <template #inactive-icon>
        <view class="i-lucide-user text-gray" />
      </template>
    </uv-tabbar-item>
  </uv-tabbar>
</template>

<style lang="scss" scoped>
//
</style>
