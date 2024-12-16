import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';

/**
 * 这个文件应该是自动生成的，demo.ts提供一个参考作用
 * 实际开发如果需要根据 swagger openapi 规范自动生成api，那么这个时候 demo.ts 文件仅供参考
 * 实际开发请根据自动生成的api 下的 index 文件 按照 demo.ts 的写法，根据你自己实际业务需求
 * 对api下的index.ts进行更改，实际使用请参考alova文档
 * 以后会考虑降低alova的接入成本，尽量做到开箱即用
 * 请参考文档，并引入 api 的入口文件 至 main.ts 文件中
 * @see https://alova.js.org/zh-CN/tutorial/getting-started/extension-integration
 */

const ContentType = {
  'Content-Type': ContentTypeEnum.JSON,
  'Accept': 'application/json, text/plain, */*',
};

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  ...AdapterUniapp(),
  timeout: 30000,
  beforeRequest: (method) => {
    method.config.headers = {
      ...method.config.headers,
      ...ContentType,
      Authorization: `Bearer ${''}`,
    };
  },
  responded: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const { config } = method;
      const { requestType } = config;
      const {
        statusCode,
        data: rawData,
        errMsg,
      } = response as UniNamespace.RequestSuccessCallbackResult;
      if (statusCode === ResultEnum.SUCCESS) {
        if (requestType) { return response; }

        const { statusCode: code, errors } = rawData as ParamsType;
        if (code === ResultEnum.SUCCESS) { return rawData; }

        // @ts-expect-error ignore
        !config.ignoreError
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

export default alovaInstance;
