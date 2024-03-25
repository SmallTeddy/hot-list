import axios, { AxiosInstance, AxiosResponse } from 'axios'
import type { BaseRequestConfig, BaseRequestInterceptors } from './type'

class BaseRequest {
  instance: AxiosInstance
  interceptors?: BaseRequestInterceptors
  constructor(config: BaseRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1. 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor as any,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log(config, '所有的实例都有的拦截器: 请求成功拦截')
        return config
      },
      (err) => {
        console.log(err, '所有的实例都有的拦截器: 请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        if (res.status !== 200) return res
        return res.data
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 响应失败拦截')
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  request<T>(config: BaseRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as any)
      }
      this.instance
        .request(config)
        .then((res: any) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          if (res.status !== 200) {
            resolve(res)
          }
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default BaseRequest
