/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-25 15:15:45
 * @Description: 用户相关api
 */
import { Get, Post } from '../server'

// const urlPix = 'http://127.0.0.1:4523/m1/2120640-0-2c46b26a'
const urlPix = '/api/user'

interface FcResponse<T> {
  code: string | number
  message: string
  data: T
  [key: string]: any
}

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

interface LoginProps {
  username: string
  password: string
}

function login<T extends { token: string }>({ username, password }: LoginProps): ApiResponse<T> {
  return Get<T>(urlPix + '/login', { username, password })
}
function registerUser<T extends { token: string }>(data: any): ApiResponse<T> {
  return Post<T>(urlPix + '/register', data)
}
export function getUserName(id: any): ApiResponse<string> {
  return Post('/getUserName', id)
}

export const userApi = {
  login,
  registerUser
}
