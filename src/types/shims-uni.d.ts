/// <reference types='@dcloudio/types' />
import 'vue';

declare module '@vue/runtime-core' {
  type Hooks = App.AppInstance & Page.PageInstance;
  interface ComponentCustomProperties extends UtilityTypes {}
  interface ComponentCustomOptions extends Hooks {}
}
