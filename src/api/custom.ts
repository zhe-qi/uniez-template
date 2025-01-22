/**
 * 当前文件为自定义api示例，如果需要自定义api，请参考此文件
 *
 * 关于 PromiseLike 类型，因为要求必须 .then 或者 await 这个 PromiseLike 类型予以警告
 *
 * ! 注意：get请求 通过第二个参数 config 的 params 传递参数，post 请求第二个参数是 data，第三个才是 config，请参考类型
 * 关于 ignoreError，这个是自定义的全局错误弹窗，你可以从黑名单模式改为白名单模式，至于为什么需要忽略类型
 * 首先不常用，其次显示忽略是想让开发者明白你在干什么，并添加忽略原因
 *
 * 下面两个接口掉不通仅供参考
 */

import { alovaInstance } from '@/api';

type ApiAppSysAuthLoginPost = {
  data: {
    code: string;
    appId: string;
  };
};
type ApiAppSysAuthLoginPostResponse = {
  data: {
    token: string;
  };
};
export function apiAppSysAuthLoginPost(data: ApiAppSysAuthLoginPost):
PromiseLike<ApiAppSysAuthLoginPostResponse> {
  return alovaInstance.Post('/api/login', data);
}

type ApiAppSysAuthUserinfoGet = {
  data: {
    id: string;
  };
};
type ApiAppSysAuthUserinfoGetResponse = {
  data: {
    name: string;
  };
};
export function apiAppSysAuthUserinfoGet(data: ApiAppSysAuthUserinfoGet): PromiseLike<ApiAppSysAuthUserinfoGetResponse> {
  return alovaInstance.Get('/api/userinfo', {
    params: data,
    // @ts-expect-error 忽略全局异常错误弹窗
    ignoreError: true,
  });
}
