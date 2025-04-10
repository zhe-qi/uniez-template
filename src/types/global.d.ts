import type { UtilityTypes } from '@/utils/utility';

declare global {
  type GlobalUtilityTypes = UtilityTypes;

  interface ParamsType {
    [key: string]: any;
  }

  type GetEnumType<T> = T[keyof T];

  const ROUTES: [];
}
