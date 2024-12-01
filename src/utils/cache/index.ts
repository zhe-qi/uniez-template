import type { CreateStorageParams } from './types';
import { createStorage } from './storageCache';

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export const cacheCipher = {
  key: 'eO0{gD1_c#0@oA3:',
  iv: 'cD0#gC@$hE1$eA9!',
};

const options: Partial<CreateStorageParams> = {
  prefixKey: '',
  key: cacheCipher.key,
  iv: cacheCipher.iv,
  hasEncrypt: import.meta.env.MODE === 'production',
  timeout: DEFAULT_CACHE_TIME,
};

export const storage = createStorage(options);

export function setCache(
  key: string,
  value: any,
  expire?: number | null,
): void {
  storage.set(key, value, expire);
}

export function getCache<T = any>(key: string): T {
  return storage.get<T>(key);
}

export function removeCache(key: string): void {
  return storage.remove(key);
}

export function clearCache(): void {
  return storage.clear();
}
