<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    index: number
    placeholder?: boolean
  }>(),
  {
    index: 0,
    placeholder: true,
  },
);

const router = useRouter();

function handleChange({ value }: { value: number }) {
  if (value === props.index) { return; }
  let name = '';
  switch (value) {
      case 0: name = 'Index'; break;
      case 1: name = 'My'; break;
  }
  router.pushTab({ name });
}
</script>

<template>
  <wd-tabbar
    :model-value="index" inactive-color="#9ca3af" :placeholder="placeholder" safe-area-inset-bottom fixed
    @change="handleChange"
  >
    <wd-tabbar-item title="首页">
      <template #icon>
        <view :class="[index === 0 ? 'i-lucide-house text-primary' : 'i-lucide-house text-gray']" />
      </template>
    </wd-tabbar-item>
    <wd-tabbar-item title="我的">
      <template #icon>
        <view :class="[index === 1 ? 'i-lucide-user text-primary' : 'i-lucide-user text-gray']" />
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>

<style lang="scss" scoped>
//
</style>
