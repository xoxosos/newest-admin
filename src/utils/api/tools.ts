/*
 * @Author: LinRenJie
 * @Date: 2023-01-13 18:12:53
 * @LastEditTime: 2023-02-23 14:05:21
 * @Description:
 * @FilePath: /admin/src/utils/api/tools.ts
 * @Email: xoxosos666@gmail.com
 */
import router from '@/router'
import { message } from 'ant-design-vue'

const logout = () => {
  sessionStorage.clear()
  return router.push('/login')
}
/**
 * 请求的调整 可以给请求头带上token等
 * config.headers.token / config.headers.Authorization
 * @param config
 */
export const handleChangeRequestHeader = (config: any) => {
  console.log(config)
  config['xxx'] = 'xxx'
  // api mock用
  // config.headers.apifoxToken = 'dROD5webTSINtKEixUxWWBYNnjoRsSXn'
  config.headers.token = window.sessionStorage.getItem('token')
  return config
}
/**
 * 配置用户标识
 * @param config
 */
export const handleConfigureAuth = (config: any) => {
  config.headers['Authorization'] = sessionStorage.getItem('token') || ''
  return config
}
/**
 * 响应拦截 网络错误处理
 * @param errStatus
 */
const errObj = new Map([
  [400, '错误的请求'],
  [401, '未授权，请重新登录'],
  [403, '拒绝访问'],
  [404, '请求错误,未找到该资源'],
  [405, '请求方法未允许'],
  [408, '请求超时'],
  [408, '服务器端出错'],
  [500, '错误的请求'],
  [501, '网络未实现'],
  [502, '网络错误'],
  [503, '服务不可用'],
  [504, '网络超时'],
  [505, 'http版本不支持该请求']
])
export const handleNetworkError = (errStatus: number) => {
  let errMessage = '未知错误'
  if (errStatus) {
    errMessage = errObj.get(errStatus) || `其他连接错误 --${errStatus}`
  } else {
    errMessage = `无法连接到服务器！`
  }
  message.error(errMessage)
}

/**
 * 响应拦截 授权错误处理
 * @param errno
 */
export const handleAuthError = (errno: string) => {
  const authErrMap: any = {
    '10031': '登录失效，需要重新登录', // token 失效
    '10032': '您太久没登录，请重新登录~', // token 过期
    '10033': '账户未绑定角色，请联系管理员绑定角色',
    '10034': '该用户未注册，请联系管理员注册用户',
    '10035': 'code 无法获取对应第三方平台用户',
    '10036': '该账户未关联员工，请联系管理员做关联',
    '10037': '账号已无效',
    '10038': '账号未找到'
  }

  if (authErrMap.hasOwnProperty(errno)) {
    message.error(authErrMap[errno])
    // message.error(authErrMap[errno])
    // 授权错误，登出账户
    logout()
    return false
  }

  return true
}
/**
 * 响应拦截 普通错误处理
 * @param errno
 * @param errMsg
 */
export const handleGeneralError = (errno: any, errMsg: any) => {
  if (errno) {
    message.error(errMsg)
    return false
  }

  return true
}
