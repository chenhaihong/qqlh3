import { AxiosRequestConfig, AxiosResponse } from "axios";

declare module 'axios' {
  // 定制业务相关的网络请求响应格式， T 是具体的接口返回类型数据
  export interface CustomedResponseData<T = any> {
    success: boolean; // 请求是否成功
    code?: number; // 详细代码
    message?: string; // 该次请求的提示消息
    data?: T; // 返回的数据
    [string]: any; // 拓展其他可能的数据
  }
  // 定制业务相关的 axios 响应体
  export type CustomedAxiosResponse<T = any> = [
    Error | null,
    T
  ]
  // 定制业务相关的 axios 拦截管理器
  export interface AxiosInterceptorManager<V = any> {
    // 定制业务相关的 use 方法
    use(
      onFulfilled?: (value: V) => V | Promise<V> | [Error | null, any],
      onRejected?: (error: any) => any,
    ): number;
  }

  // 定制业务相关的 axios 实例
  export interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<CustomedAxiosResponse<any>>;
    (url: string, config?: AxiosRequestConfig): Promise<CustomedAxiosResponse<any>>;
    defaults: AxiosRequestConfig;
    interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>;
      response: AxiosInterceptorManager<AxiosResponse>;
    };
    getUri(config?: AxiosRequestConfig): string;
    request<T = any, R = CustomedAxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
    get<T = any, R = CustomedAxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = any, R = CustomedAxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    head<T = any, R = CustomedAxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    options<T = any, R = CustomedAxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = CustomedAxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = CustomedAxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    patch<T = any, R = CustomedAxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  }
}