import type { UtilityTypes } from '@/utils/utility';

declare global {
  type GlobalUtilityTypes = UtilityTypes;

  interface ParamsType {
    [key: string]: any
  }

  const ROUTES: [];
}
