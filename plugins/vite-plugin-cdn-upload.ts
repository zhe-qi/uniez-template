import type { Plugin } from 'vite';
import uploadAssetsToCdn from 'upload-assets-to-cdn';

// 声明 OSS 客户端的类型，避免直接依赖 ali-oss
interface OSSClient {
  put: (path: string, file: any) => Promise<{ url: string }>
}

interface OssConfig {
  type: 'oss'
  client: OSSClient
  prefix?: string
}

interface HttpConfig {
  type: 'http'
  url: string
  formData?: Record<string, any>
  headers?: Record<string, any>
  responseHandler?: (response: any) => string
}

interface CommonConfig {
  enable?: boolean
  exclude?: string[]
  include?: string[]
  isCompress?: boolean
  isCache?: boolean
  isDeleteOriginAsset?: boolean
  compressOptions?: Record<string, any>
}

type CdnUploadConfig = CommonConfig & (OssConfig | HttpConfig);

export default function cdnUploadPlugin(options: CdnUploadConfig): Plugin {
  let isBuild = false;

  return {
    name: 'vite-plugin-cdn-upload',

    configResolved(config) {
      isBuild = config.command === 'build';
    },

    async closeBundle() {
      if (!isBuild || !options.enable) { return; }

      const uploadConfig = {
        isCompress: options.isCompress ?? true,
        isCache: options.isCache ?? true,
        isDeleteOriginAsset: options.isDeleteOriginAsset ?? false,
        compressOptions: options.compressOptions,
        exclude: options.exclude,

        async upload({ fileSource, fileName, fileType }) {
          if (options.type === 'oss') {
            const result = await options.client.put(
              `${options.prefix || ''}/${fileName}`,
              fileSource,
            );
            return { url: result.url };
          } else {
            const formData = new FormData();
            Object.entries(options.formData || {}).forEach(([key, value]) => {
              formData.append(key, value);
            });

            formData.append('file', new Blob([fileSource], { type: fileType }), fileName);

            const response = await fetch(options.url, {
              method: 'POST',
              headers: options.headers,
              body: formData,
            });

            const data = await response.json();
            if (options.responseHandler) {
              return { url: options.responseHandler(data) };
            }
            return { url: data?.data?.url || '' };
          }
        },
      };

      await uploadAssetsToCdn(uploadConfig);
    },
  };
}
