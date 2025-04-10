export const ResultEnum = {
  SUCCESS: 200,
} as const;

export const ContentTypeEnum = {
  JSON: 'application/json;charset=UTF-8',
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA: 'multipart/form-data;charset=UTF-8',
} as const;
