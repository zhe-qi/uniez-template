<route lang="json5">
{
  "name": "List",
  "style": {
    "navigationBarTitleText": "",
    "navigationStyle": "custom",
  },
  "meta": {
    "ignoreAuth": true
  }
}
</route>

<script lang="ts" setup>
import type { SwiperOnAnimationfinishEvent, SwiperOnTransitionEvent } from '@uni-helper/uni-app-types';
import StickySwiperNextItem from './components/sticky-swiper-next-item.vue';

const appStore = useAppStore();

// 获取路由参数 示例
const route = useRoute();
const title = ref('你好');
onLoad((options) => {
  if (options?.title) {
    title.value = options?.title;
    console.log(route.params, options, route.params?.title === options.title);
  }
});

const swiperHeight = ref(0);
const tabList = ref(['测试1', '测试2', '测试3', '测试4']);
const current = ref(0);
const pagePaging = ref<ZPagingRef>();
const tabs = ref();
const swiperList = ref<InstanceType<typeof StickySwiperNextItem>[]>([]);

// tabs通知swiper切换
function tabsChange(index: number) {
  setCurrent(index);
}

// 下拉刷新时，通知当前显示的列表进行reload操作
function onRefresh() {
  swiperList.value[current.value]?.reload(() => {
    // 当当前显示的列表刷新结束，结束当前页面的刷新状态
    pagePaging.value?.endRefresh();
  });
}

// 当滚动到底部时，通知当前显示的列表加载更多
function scrolltolower() {
  swiperList.value[current.value].doLoadMore();
}

// swiper滑动中
function swiperTransition(e: SwiperOnTransitionEvent) {
  tabs.value.setDx(e.detail.dx);
}

// swiper滑动结束
function swiperAnimationfinish(e: SwiperOnAnimationfinishEvent) {
  setCurrent(e.detail.current);
  tabs.value.unlockDx();
}

// 设置swiper的高度
function heightChanged(height: number) {
  if (height === 0) {
    // 默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
    height = uni.getSystemInfoSync().windowHeight - rpx2px(80);
  }
  swiperHeight.value = height;
}

function setCurrent(newCurrent: number) {
  if (newCurrent !== current.value) {
    // 切换tab时，将上一个tab的数据清空
    swiperList.value[current.value]?.clear();
  }
  current.value = newCurrent;
}

// rpx => px，兼容鸿蒙
function rpx2px(rpx: number) {
  // #ifdef APP-HARMONY
  const screenWidth = uni.getSystemInfoSync().screenWidth;
  return (screenWidth * Number.parseFloat(rpx.toString())) / 750;
  // #endif
  // #ifndef APP-HARMONY
  return uni.upx2px(rpx);
  // #endif
}

function handleClickLeft() {
  uni.navigateBack({
    fail: () => {
      uni.reLaunch({
        url: '/pages/index/index',
      });
    },
  });
}
</script>

<template>
  <view class="h-full">
    <z-paging ref="pagePaging" refresher-only @on-refresh="onRefresh" @scrolltolower="scrolltolower">
      <template #top>
        <wd-navbar
          title="列表" left-text="返回" safe-area-inset-top left-arrow placeholder :fixed="true"
          @click-left="handleClickLeft"
        />
      </template>
      <view class="banner-view h-250 flex-center">
        <view class="flex flex-col">
          <text>下方tab滚动时可吸附在顶部，可左右滑动列表</text>
          <text>模拟数据加载，150ms后加载完成</text>
        </view>
      </view>
      <view>
        <!-- 小程序中直接修改组件style为position: sticky;无效，需要在组件外层套一层view -->
        <view class="sticky top-0 z-100">
          <z-tabs
            ref="tabs" :current="current" :list="tabList" :active-color="appStore.themeVars.colorTheme"
            @change="tabsChange"
          />
        </view>
        <swiper
          class="swiper" :style="[{ height: `${swiperHeight}px` }]" :current="current"
          @transition="swiperTransition" @animationfinish="swiperAnimationfinish"
        >
          <swiper-item v-for="(item, index) in tabList" :key="index" class="swiper-item">
            <!-- 这里的sticky-swiper-next-item为demo中为演示用定义的组件，列表及分页代码在sticky-swiper-next-item组件内 -->
            <!-- 请注意，sticky-swiper-next-item非z-paging内置组件，在自己的项目中必须自己创建，若未创建则会报组件不存在的错误 -->
            <StickySwiperNextItem
              ref="swiperList" :tab-index="index" :current-index="current"
              @height-changed="heightChanged"
            />
          </swiper-item>
        </swiper>
      </view>
      <template #bottom>
        <!-- bottom 可以放置例如tabbar -->
      </template>
    </z-paging>
  </view>
</template>

<style lang="scss" scoped>
.banner-view {
  // 演示css变量用法
  background-color: var(--wot-color-theme);
  color: white;
}

.swiper {
  height: 1000px;
}
</style>
