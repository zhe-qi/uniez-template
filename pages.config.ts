import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  preloadRule: {
    'pages-sub/list/list': {
      network: 'all',
      packages: ['pages-sub'],
    },
  },
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-app',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
  },
  tabBar: {
    custom: true,
    color: '#999',
    selectedColor: '#000',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/my/my',
        text: '我的',
      },
    ],
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
      '^z-tabs': '@zxlee/z-tabs/components/z-tabs/z-tabs.vue',
    },
  },
});
