<script lang="ts" setup>
import TabBar from '@/components/tab-bar/tab-bar.vue';
import StickySwiperNextItem from './components/sticky-swiper-next-item.vue';

const appStore = useAppStore();

const swiperHeight = ref(0);
const tabList = ref(['测试1', '测试2', '测试3', '测试4']);
const current = ref(0);
const pagePaging = ref();
const tabs = ref();
const swiperList = ref([]);

// tabs通知swiper切换
function tabsChange(index: number) {
  setCurrent(index);
}

// 下拉刷新时，通知当前显示的列表进行reload操作
function onRefresh() {
  swiperList.value[current.value].reload(() => {
    // 当当前显示的列表刷新结束，结束当前页面的刷新状态
    pagePaging.value.endRefresh();
  });
}

// 当滚动到底部时，通知当前显示的列表加载更多
function scrolltolower() {
  swiperList.value[current.value].doLoadMore();
}

// swiper滑动中
function swiperTransition(e: any) {
  tabs.value.setDx(e.detail.dx);
}

// swiper滑动结束
function swiperAnimationfinish(e: any) {
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
    swiperList.value[current.value].clear();
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
</script>

<template>
  <view class="content">
    <z-paging ref="pagePaging" refresher-only @on-refresh="onRefresh" @scrolltolower="scrolltolower">
      <template #top>
        <zq-navbar :left-icon="false">
          你好
        </zq-navbar>
      </template>
      <view class="banner-view h-250">
        <view class="flex flex-col">
          <text>下方tab滚动时可吸附在顶部，可左右滑动列表</text>
          <text>模拟数据加载，150ms后加载完成</text>
        </view>
      </view>
      <view>
        <!-- 小程序中直接修改组件style为position: sticky;无效，需要在组件外层套一层view -->
        <view style="z-index: 100;position: sticky;top :0;">
          <!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
          <z-tabs ref="tabs" :current="current" :list="tabList" :active-color="appStore.themeVars['--primary']" @change="tabsChange" />
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
        <TabBar :index="1" />
      </template>
    </z-paging>
  </view>
</template>

<style lang="scss" scoped>
.banner-view {
  background-color: var(--primary);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.paging-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.swiper {
  height: 1000px;
}
</style>
