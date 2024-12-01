import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { store } from './store';
import { prototypeInterceptor, setupUtils } from './utils';
import 'virtual:uno.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(prototypeInterceptor);
  app.use(store);
  setupRouter(app);
  setupUtils(app);
  return {
    app,
  };
}
