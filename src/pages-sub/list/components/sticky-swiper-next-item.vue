<script lang="ts" setup>
// Props 定义
const props = defineProps<{
  tabIndex: number;
  currentIndex: number;
}>();

// Emits 定义
const emit = defineEmits<{
  heightChanged: [height: number];
}>();

// proxy and resolvers
const proxy = getCurrentInstance()?.proxy;
const { promise, resolve } = Promise.withResolvers();

// 模拟数据
async function generateMockData(size: number) {
  if (props.currentIndex % 2 === 1) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }
  const res = Array.from({ length: size }, (_, index) => ({
    title: `标题${index}`,
    detail: `详情${index}`,
    id: Date.now() + index,
    // 在模板中可以访问到 @/static/logo.png，但是这里需要使用相对路径
    image: '/static/logo.png',
  }));
  await new Promise(resolve => setTimeout(resolve, 500));
  return res;
}
type ListItem = Awaited<ReturnType<typeof generateMockData>>[number];

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

onLoad(async () => {
  // 假如说还有其他的情况，在这里并行
  await proxy?.$appLaunchedPromise;
  // 假如说还有其他的情况，在这里执行

  // 然后对 queryList 进行放行
  resolve(void 0);
});

/** 走接口示例 */
// const { send: sendUserList } = useRequest(data => Apis.general.get_api_users_list(data), {
//   immediate: false,
// });

// 查询列表数据
async function queryList(_pageNo: number, pageSize: number) {
  // 可选等待应用启动完成如果依赖全局异步等待和onLoad等待
  await promise;

  try {
    const mockData = await generateMockData(pageSize);
    paging.value?.complete(mockData);

    /** 走接口示例, 掉不通，仅展示 */
    // const res = await sendUserList({
    //   pageNo,
    //   pageSize,
    // });
    // console.log(res);

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
  <view class="content bg-background">
    <z-paging
      ref="paging" v-model="dataList" use-page-scroll :scrollable="false" :hide-empty-view="hideEmptyView"
      :refresher-enabled="false" :auto="false" :auto-clean-list-when-reload="false" :style="{ width: '100%' }"
      auto-show-system-loading @query="queryList" @content-height-changed="contentHeightChanged"
    >
      <!-- box-white 来自于 unocss.config.mts，可以被后面的类名覆盖，例如自带的是p-4但是我改成了 p-2 -->
      <view
        v-for="(item, index) in dataList" :key="index"
        class="item-center box-white mt-4 flex flex justify-between p-2"
      >
        <view class="flex items-center gap-4">
          <image :src="item.image" mode="aspectFill" class="h-100 w-100" />
          <view>
            <view class="title">
              {{ item.title }}
            </view>
            <view class="mt-2 text-2xs">
              {{ item.detail }}
            </view>
          </view>
        </view>
        <view>
          <wd-button class="h-fit text-base">
            按钮
          </wd-button>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<style lang="postcss" scoped>
.content {
  @apply size-full;
}

.title {
  @apply font-500 text-primary;
}
</style>
