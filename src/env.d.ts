/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<object, object, any>;
  export default component;
}

interface ImportMetaEnv {
  // vite 环境变量
  VITE_APP_BASEURL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
