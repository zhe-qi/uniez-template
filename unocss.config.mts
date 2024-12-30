import transformerDirectives from '@unocss/transformer-directives';
/**
 * unocss defineConfig
 * @link unocss: https://github.com/unocss/unocss
 * @type {import('unocss').UserConfig}
 */
import { defineConfig, presetIcons } from 'unocss';
import presetWeapp from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify(),
    presetIcons(),
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      /** 基础盒子样式，可修改可覆盖 */
      'box-white': 'mx-4 p-4 rounded-md bg-white shadow',
      /** 基础边框样式，如果要加边框必须要加这个，否则边框无效 */
      'border-base': 'border border-solid',
      /** 用于调试，框出元素 */
      'border-test': 'border-t border-solid border-red-500',
    },
  ],
  rules: [
    [
      'p-safe',
      {
        padding:
        'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
  theme: {
    colors: {
      primary: 'var(--wot-color-theme,#0957DE)',
      /** 可以继续添加颜色变量 */
    },
    fontSize: {
      'mini': ['18rpx', '26rpx'],
      '2xs': ['20rpx', '28rpx'],
      '3xs': ['18rpx', '26rpx'],
    },
  },
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
});
