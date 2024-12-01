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
      'box-white': 'mx-4 p-4 rounded-md bg-white shadow',
      'br-if': 'border border-solid border-#ddd',
      'br-ts': 'border-t border-solid border-red',
    },
  ],
  rules: [
    ['border-b-i', { 'border-bottom': '1px solid #ddd' }],
    ['bg-t', { 'background-color': 'transparent !important' }],
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
      primary: 'var(--primary,#0957DE)',
      info: 'var(--info)',
      background: 'var(--color-bg)',
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
