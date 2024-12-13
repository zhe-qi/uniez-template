<script lang="ts" setup>
import { storeToRefs } from 'pinia';

// Props 定义
const props = defineProps({
  tabIndex: {
    type: Number as PropType<number>,
    default: 0,
  },
  currentIndex: {
    type: Number as PropType<number>,
    default: 0,
  },
});
// Emits 定义
const emit = defineEmits(['heightChanged']);
const appStore = useAppStore();
const { themeVars } = storeToRefs(appStore);

// 定义类型
interface ListItem {
  title: string
  detail: string
}

// Refs
const paging = ref<ZPagingRef>();
const dataList = ref<ListItem[]>([]);
const hideEmptyView = ref(true);
const completeFunc = ref<(() => void) | null>(null);

// 监听当前索引变化
watch(
  () => props.currentIndex,
  (newVal) => {
    if (newVal === props.tabIndex) {
      // 懒加载，当滑动到当前的item时，才去加载
      nextTick(() => {
        setTimeout(() => {
          paging.value?.reload();
        }, 100);
      });
    }
  },
  { immediate: true },
);

function generateMockData(size: number) {
  return Array.from({ length: size }, (_, index) => ({
    title: `标题${index}`,
    detail: `详情${index}`,
    id: Date.now() + index,
  }));
}

// 查询列表数据
async function queryList(_pageNo: number, pageSize: number) {
  try {
    const mockData = generateMockData(pageSize);
    await new Promise(resolve => setTimeout(resolve, 150));

    paging.value?.complete(mockData);
    hideEmptyView.value = false;
    if (completeFunc.value) {
      completeFunc.value();
    }
  } catch (error) {
    paging.value?.complete(false);
    if (completeFunc.value) {
      completeFunc.value();
    }
  }
}

// 重新加载
function reload(completeFn: () => void) {
  completeFunc.value = completeFn;
  paging.value?.reload();
}

// 内容高度变化处理
function contentHeightChanged(height: number) {
  const finalHeight = dataList.value.length ? height : 0;
  const minHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(80);
  emit('heightChanged', Math.max(finalHeight, minHeight));
}

// 加载更多
function doLoadMore() {
  paging.value?.doLoadMore();
}

// 清除数据
function clear() {
  paging.value?.clear();
  hideEmptyView.value = true;
}

// 暴露方法给父组件
defineExpose({
  reload,
  doLoadMore,
  clear,
});
</script>

<template>
  <view class="content">
    <z-paging
      ref="paging" v-model="dataList" use-page-scroll :scrollable="false" :hide-empty-view="hideEmptyView"
      :refresher-enabled="false" :auto="false" :auto-clean-list-when-reload="false"
      :style="{ width: '100%', backgroundColor: themeVars['--color-bg'] }" @query="queryList"
      @content-height-changed="contentHeightChanged"
    >
      <!-- box-white 来自于 unocss.config.mts，可以被后面的类名覆盖，例如自带的是p-4但是我改成了 p-2 -->
      <view v-for="(item, index) in dataList" :key="index" class="box-white mt-4 p-2">
        <view class="title">
          {{ item.title }}
        </view>
        <view class="mt-2 text-2xs">
          {{ item.detail }}
        </view>
      </view>
    </z-paging>
  </view>
</template>

<style lang="postcss" scoped>
.content {
  height: 100%;
  width: 100%;
}

.title {
  @apply font-500 text-primary;
}
</style>
