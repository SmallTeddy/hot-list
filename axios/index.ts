import BaseRequest from './service'
import { BaseRequestConfig } from './type'

const baseRequest = new BaseRequest({
  baseURL: '/',
  timeout: 5000,
  interceptors: {
    requestInterceptor: (config: BaseRequestConfig) => {
      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      const errRes = err.response
      if (errRes) {
        return {
          status: errRes.status,
          message: errRes.data.message
        }
      }
      return err
    }
  }
})

export default baseRequest

