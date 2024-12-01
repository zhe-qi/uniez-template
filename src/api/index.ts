import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';
import vueHook from 'alova/vue';

const ContentType = {
  'Content-Type': ContentTypeEnum.JSON,
  'Accept': 'application/json, text/plain, */*',
};

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  statesHook: vueHook,
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

        const { statusCode: code, errors } = rawData as any;
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
