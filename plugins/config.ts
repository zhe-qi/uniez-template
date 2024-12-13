import type { Plugin } from 'vite';
import vitePluginDynamicComponent from './vite-plugin-dynamic-component';
// import OSS from 'ali-oss';
// import cdnUploadPlugin from './vite-plugin-cdn-upload';

const dynamicComponent = vitePluginDynamicComponent({
  components: {
    test: {
      desc: './components/com-desc.vue',
      line: './components/com-line.vue',
      title: './components/com-title.vue',
      test: '@/components/test-components/test-components.vue',
    },
  },
  debug: false,
});

/**
 * upload-assets-to-cdn
 * @see https://github.com/rookie-luochao/upload-assets-to-cdn
 */
// eslint-disable-next-line prefer-const
let cdnUpload: Plugin | null = null;

// 上传到阿里云OSS
// cdnUpload = new OSS({
//   region: 'oss-cn-shanghai',
//   bucket: 'my-pic-lib',
//   accessKeyId: process.env.OSS_KEY_ID,
//   accessKeySecret: process.env.OSS_KEY_SECRET,
// })
//  const cdnUploadPlugin = cdnUploadPlugin({
//   enable: process.env.NODE_ENV === 'production',
//   type: 'oss',
//   client: ossClient, // 传入已创建的 OSS 实例
//   prefix: 'project-xxxx',
//   include: [/\.(png|jpe?g|gif|svg|webp)$/],
//   isCompress: true,
//   isCache: true,
// })

// cdnUpload = cdnUploadPlugin({
//   enable: process.env.NODE_ENV === 'production',
//   type: 'http',
//   url: 'https://api.example.com/upload',
//   formData: {
//     systemCode: 'SYSTEM',
//     belongCode: 'CODE',
//   },
//   headers: {
//     Authorization: 'Bearer token',
//   },
//   responseHandler: response => response.data.remoteAddress,
//   isCompress: true,
// });

// 配置完成后的 vite 插件, 后续可选的或者重配置的插件都会排列在这里
export const plugins = [cdnUpload, dynamicComponent];
