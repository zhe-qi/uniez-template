export interface EncryptionParams {
  key: string;
  iv: string;
  cbc?: boolean;
}

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  hasEncrypt: boolean;
  timeout?: number | null;
}
