import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface BaseRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface BaseRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: BaseRequestInterceptors<T>
  loading?: boolean | string
  noToken?: boolean
}
