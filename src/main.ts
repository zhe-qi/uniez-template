import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { store } from './store';
import { prototypeInterceptor, setupUtils } from './utils';

/** alova main */
import './api';

import 'virtual:uno.css';

export function createApp() {
  const app = createSSRApp(App);

  app.use(store);
  app.use(prototypeInterceptor);

  setupUtils(app);
  setupRouter(app);

  return { app };
}
