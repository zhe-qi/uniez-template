import 'uni-mini-router';

declare module 'uni-mini-router' {
  interface Route {
    meta?: {
      ignoreAuth?: boolean
    }
  }
}
