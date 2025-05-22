import type { UtilityTypes } from '@/utils/utility';

declare global {
  type GlobalUtilityTypes = UtilityTypes;

  interface ParamsType<T = any> {
    [key: string]: T;
  }

  type GetEnumType<T> = T[keyof T];

  const ROUTES: [];
}
