import { Get,Post } from "../server"
const urlPix = 'http://127.0.0.1:4523/m1/2120640-0-2c46b26a'

interface FcResponse<T> {
  errno: string
  errMsg: string
  data: T
}

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

function getUserInfo<T extends { id: string; name: string; }>(id?:any): ApiResponse<T> {
  return Get<T>(urlPix+'/getToken' )
}
function getUserToken<T extends { token: string }>(id?:any): ApiResponse<T> {
  return Get<T>(urlPix+'/getToken' )
}
export function getUserName(id:any) {
  return Post(urlPix,id)
}

export const userApi = {
  getUserInfo,
  getUserToken
}