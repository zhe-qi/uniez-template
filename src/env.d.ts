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
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
