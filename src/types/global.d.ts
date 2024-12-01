export {};

declare global {
  interface UtilityTypes {
    /** 用于在页面加载完成后执行的 Promise */
    $appLaunchedPromise: Promise<void>
    /** 用于放行 */
    $resolveAppLaunched: () => void
    /** 用于格式化日期时间 */
    $formatDate: (date: string | number | Date, format?: string) => string
  }

  interface ParamsType {
    [key: string]: any
  }

  const ROUTES: [];
}
