import type { Router } from 'uni-mini-router/lib/interfaces';

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router);
  createAfterEachGuard(router);
}

function createBeforeEachGuard(router: Router) {
  router.beforeEach((to, _, next) => {
    // 如果忽略了需要登录
    if (to.meta?.ignoreAuth) {
      next();
      return;
    }

    next();
  });
}

function createAfterEachGuard(router: Router) {
  router.afterEach((_to) => {
    // console.log('afterEach', to);
  });
}
