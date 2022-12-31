import { ElMessage } from 'element-plus'
import router from '@/router'
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
  config['xxx'] = 'xxx'
  // config.headers.token = window.sessionStorage.getItem('token')
  return config
}
/**
 * 配置用户标识
 * @param config
 */
export const handleConfigureAuth = (config: any) => {
  config.headers['Authorization'] = sessionStorage.getItem('token')  || ''
  // config.header['token'] = localStorage.getItem('token') || token || ''
  return config
}
/**
 * 响应拦截 网络错误处理
 * @param errStatus
 */
export const handleNetworkError = (errStatus: number) => {
  let errMessage = '未知错误'
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errMessage = '错误的请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `其他连接错误 --${errStatus}`
    }
  } else {
    errMessage = `无法连接到服务器！`
  }
  ElMessage({
    showClose: true,
    message: errMessage,
    type: 'error'
  })
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
    ElMessage({
      showClose: true,
      message: authErrMap[errno],
      type: 'error'
    })
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
    ElMessage({
      showClose: true,
      message: errMsg,
      type: 'error'
    })
    return false
  }

  return true
}
