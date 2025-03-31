import type { Router } from 'uni-mini-router/lib/interfaces';

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router);
  createAfterEachGuard(router);
}

function createBeforeEachGuard(router: Router) {
  router.beforeEach((to, _, next) => {
    // 如果忽略了需要登录，类型需要定义在 types/uni-mini-router.d.ts 中，然后可以在route块中使用
    if (to.meta?.ignoreAuth) {
      next();
      return;
    }
    // 如果需要登录，在此写登录拦截逻辑
    console.log('需要登录');
    next();
  });
}

function createAfterEachGuard(router: Router) {
  router.afterEach((_to) => {
    // console.log('afterEach', to);
  });
}
