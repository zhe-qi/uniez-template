/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<object, object, any>;
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
