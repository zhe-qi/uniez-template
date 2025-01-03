/* tslint:disable */
/* eslint-disable */
/**
 * My API Documentation - version v1
 *
 * API documentation with Hono and OpenAPI
 *
 * OpenAPI version: 3.1.0
 *
 *
 * NOTE: This file is auto generated by the alova's vscode plugin.
 *
 * https://alova.js.org/devtools/vscode
 *
 * **Do not edit the file manually.**
 */
import type { Alova, AlovaMethodCreateConfig, AlovaGenerics, Method } from 'alova';
import type { $$userConfigMap, alovaInstance } from '.';
import type apiDefinitions from './apiDefinitions';

type CollapsedAlova = typeof alovaInstance;
type UserMethodConfigMap = typeof $$userConfigMap;

type Alova2MethodConfig<Responded> =
  CollapsedAlova extends Alova<
    AlovaGenerics<
      any,
      any,
      infer RequestConfig,
      infer Response,
      infer ResponseHeader,
      infer L1Cache,
      infer L2Cache,
      infer SE
    >
  >
    ? Omit<
        AlovaMethodCreateConfig<
          AlovaGenerics<Responded, any, RequestConfig, Response, ResponseHeader, L1Cache, L2Cache, SE>,
          any,
          Responded
        >,
        'params'
      >
    : never;

// Extract the return type of transform function that define in $$userConfigMap, if it not exists, use the default type.
type ExtractUserDefinedTransformed<
  DefinitionKey extends keyof typeof apiDefinitions,
  Default
> = DefinitionKey extends keyof UserMethodConfigMap
  ? UserMethodConfigMap[DefinitionKey]['transform'] extends (...args: any[]) => any
    ? Awaited<ReturnType<UserMethodConfigMap[DefinitionKey]['transform']>>
    : Default
  : Default;
type Alova2Method<
  Responded,
  DefinitionKey extends keyof typeof apiDefinitions,
  CurrentConfig extends Alova2MethodConfig<any>
> =
  CollapsedAlova extends Alova<
    AlovaGenerics<
      any,
      any,
      infer RequestConfig,
      infer Response,
      infer ResponseHeader,
      infer L1Cache,
      infer L2Cache,
      infer SE
    >
  >
    ? Method<
        AlovaGenerics<
          CurrentConfig extends undefined
            ? ExtractUserDefinedTransformed<DefinitionKey, Responded>
            : CurrentConfig['transform'] extends (...args: any[]) => any
              ? Awaited<ReturnType<CurrentConfig['transform']>>
              : ExtractUserDefinedTransformed<DefinitionKey, Responded>,
          any,
          RequestConfig,
          Response,
          ResponseHeader,
          L1Cache,
          L2Cache,
          SE
        >
      >
    : never;

export type User = {
  /**
   * [required]
   */
  id: string;
  /**
   * [required]
   */
  name: string;
  /**
   * [required]
   */
  age: number;
  /**
   * [required]
   */
  role: string;
};
export type UserListResponse = {
  /**
   * [required]
   */
  total: number;
  /**
   * [required]
   */
  list: User[];
  /**
   * [required]
   */
  pageSize: number;
  /**
   * [required]
   */
  pageNo: number;
};
export type CreateUser = {
  /**
   * [required]
   */
  name: string;
  /**
   * [required]
   */
  age: number;
};
declare global {
  interface Apis {
    general: {
      /**
       * ---
       *
       * [GET]
       *
       * **path:** /api/users/list
       *
       * ---
       *
       * **Query Parameters**
       * ```ts
       * type QueryParameters = {
       *   // [required]
       *   pageSize: string
       *   // [required]
       *   pageNo: string
       * }
       * ```
       *
       * ---
       *
       * **Response**
       * ```ts
       * type Response = {
       *   // [required]
       *   total: number
       *   // [required]
       *   list: Array<{
       *     // [required]
       *     id: string
       *     // [required]
       *     name: string
       *     // [required]
       *     age: number
       *     // [required]
       *     role: string
       *   }>
       *   // [required]
       *   pageSize: number
       *   // [required]
       *   pageNo: number
       * }
       * ```
       */
      get_api_users_list<
        Config extends Alova2MethodConfig<UserListResponse> & {
          params: {
            /**
             * [required]
             */
            pageSize: string;
            /**
             * [required]
             */
            pageNo: string;
          };
        }
      >(
        config: Config
      ): Alova2Method<UserListResponse, 'general.get_api_users_list', Config>;
      /**
       * ---
       *
       * [GET]
       *
       * **path:** /api/users/{id}
       *
       * ---
       *
       * **Path Parameters**
       * ```ts
       * type PathParameters = {
       *   // [required]
       *   id: string
       * }
       * ```
       *
       * ---
       *
       * **Query Parameters**
       * ```ts
       * type QueryParameters = {
       *   role?: string
       * }
       * ```
       *
       * ---
       *
       * **Response**
       * ```ts
       * type Response = {
       *   // [required]
       *   id: string
       *   // [required]
       *   name: string
       *   // [required]
       *   age: number
       *   // [required]
       *   role: string
       * }
       * ```
       */
      get_api_users_id<
        Config extends Alova2MethodConfig<User> & {
          pathParams: {
            /**
             * [required]
             */
            id: string;
          };
          params: {
            role?: string;
          };
        }
      >(
        config: Config
      ): Alova2Method<User, 'general.get_api_users_id', Config>;
      /**
       * ---
       *
       * [POST]
       *
       * **path:** /api/users
       *
       * ---
       *
       * **RequestBody**
       * ```ts
       * type RequestBody = {
       *   // [required]
       *   name: string
       *   // [required]
       *   age: number
       * }
       * ```
       *
       * ---
       *
       * **Response**
       * ```ts
       * type Response = {
       *   // [required]
       *   id: string
       *   // [required]
       *   name: string
       *   // [required]
       *   age: number
       *   // [required]
       *   role: string
       * }
       * ```
       */
      post_api_users<
        Config extends Alova2MethodConfig<User> & {
          data: CreateUser;
        }
      >(
        config: Config
      ): Alova2Method<User, 'general.post_api_users', Config>;
    };
  }

  var Apis: Apis;
}
