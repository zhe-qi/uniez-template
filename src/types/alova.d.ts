// eslint-disable-next-line unused-imports/no-unused-imports
import type { UniappConfig } from '@alova/adapter-uniapp';
// eslint-disable-next-line unused-imports/no-unused-imports
import type { AlovaGenerics, AlovaMethodCreateConfig } from 'alova';

declare module 'alova' {
  interface MethodRequestConfig {
    /**
     * 是否忽略全局错误提示
     * @default false
     */
    ignoreError?: boolean;
  }
}
