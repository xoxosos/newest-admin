import axios from 'axios'
import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError
} from './tools'
import { useUsers } from "@/stores/user";
type Fn = (data: FcResponse<any>) => unknown

interface IAnyObj {
  [index: string]: unknown
}

interface FcResponse<T> {
  errno: string
  errMsg: string
  data: T
}

/**
 * 请求拦截
 * todo 可增加loading
 * 我们需要两块内容，一是请求的调整 ，二是 配置用户标识
 */
axios.interceptors.request.use((config) => {

  if (!useUsers().token) return config
  config = handleChangeRequestHeader(config)
  config = handleConfigureAuth(config)
  console.log(config);
  return config
})
/**
 * 响应拦截
 * 当我们将所有的错误类型处理函数写完，在 axios 的拦截器中进行调用即可。
 * response.data 数据结构需要定好
 *
 */
axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data)
    handleAuthError(response.data.errno)
    handleGeneralError(response.data.errno, response.data.errmsg)
    return response
  },
  (err) => {
    console.log(err);
    handleNetworkError(err.response.status)
    Promise.reject(err.response)
  }
)

export const Get = <T,>(url: string, params: IAnyObj = {}, clearFn?: Fn): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        let res: FcResponse<T>
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>
        } else {
          res = result.data as FcResponse<T>
        }
        resolve([null, res as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })

export const Post = <T,>(url: string, data: IAnyObj, params: IAnyObj = {}): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}