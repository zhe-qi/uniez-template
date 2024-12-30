/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // eslint-disable-next-line ts/no-empty-object-type
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  /** 接口请求基础地址 */
  VITE_APP_BASEURL: string
  /** 应用标题 */
  VITE_APP_TITLE: string
  /** 继续添加您需要的环境变量类型提示 */
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
