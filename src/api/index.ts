import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';
import { isEqual } from 'radashi';
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import { getCache } from '@/utils';
import { createApis, withConfigType } from './createApis';

/**
 * 自动生成请使用 alova.config.ts 文件 执行 npx alova gen -f 命令
 * 需要更好的体验可以使用 alova vscode 插件
 * 全局默认get缓存已关闭，请根据需要自行开启，或者按需开启
 * token 默认从 getCache 中获取，请根据需要自行修改，登录完成后设置 token 可以使用 setCache 请注意缓存时间
 * 接口返回数据结构需要按照你们自己的项目后端结构来，这里只是示例
 * 请求示例参考 src/pages-sub/list/components/sticky-swiper-next-item.vue
 * @see https://alova.js.org/zh-CN/tutorial/getting-started/extension-integration
 */

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  ...AdapterUniapp(),
  timeout: 30000,
  cacheFor: null,
  beforeRequest: (method) => {
    Object.assign(method.config.headers, {
      'Content-Type': ContentTypeEnum.JSON,
      'Accept': 'application/json, text/plain, */*',
      'Authorization': `Bearer ${getCache('token')}`,
    });
  },
  responded: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const { requestType } = method.config;
      const {
        statusCode,
        data: rawData,
        errMsg,
      } = response as UniNamespace.RequestSuccessCallbackResult;

      /** TODO: 根据项目后端结构来，状态码 和 错误信息 */
      if (isEqual(statusCode, ResultEnum.SUCCESS)) {
        if (requestType) { return response; }

        const { statusCode: code, errors } = rawData as ParamsType;
        if (isEqual(code, ResultEnum.SUCCESS)) { return rawData; }

        !method.config.ignoreError
        && uni.showToast({
          title: JSON.stringify(errors),
          icon: 'none',
        });

        throw new Error(errors);
      }

      /** http 请求错误 */
      throw new Error(`请求错误[${statusCode}]：${errMsg}`);
    },

    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     */
    onError: (err) => {
      throw new Error(`请求错误：${err}`);
    },
  },
});

export const $$userConfigMap = withConfigType({});

const Apis = createApis(alovaInstance, $$userConfigMap);

export default Apis;
