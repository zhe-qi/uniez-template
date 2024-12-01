/// <reference types='@dcloudio/types' />
import 'vue';

declare module '@vue/runtime-core' {
  type Hooks = App.AppInstance & Page.PageInstance;
  interface ComponentCustomProperties extends UtilityTypes {}
  interface ComponentCustomOptions extends Hooks {}
}

// 为 template 标签添加类型定义
declare global {
  namespace JSX {
    interface IntrinsicElements {
      template: ParamsType
    }
  }
}
