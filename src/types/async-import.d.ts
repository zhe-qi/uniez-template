/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by @uni-ku/bundle-optimizer
export {}

interface ModuleMap {
  [path: string]: any
}

declare global {
  function AsyncImport<T extends keyof ModuleMap>(arg: T): Promise<ModuleMap[T]>
}