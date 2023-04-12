import { Get, Post } from '../server'

const urlPix = '/api/comment/'

interface FcResponse<T> {
  errno: string
  errMsg: string
  data: T

  [key: string]: any
}

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

function getAllComment<T>(param?: any): ApiResponse<any> {
  return Get<T>(`${urlPix}adminGetAllComment`, param)
}

function getUserToken(param: any): ApiResponse<any> {
  return Post('/api/admin/login', param)
}

function deleteComment<T>(param: { commentId: number }): ApiResponse<any> {
  return Get<T>(`${urlPix}deleteComment`, param)
}

export function approvalComment(data: any): ApiResponse<any> {
  return Post(`${urlPix}approvalComment`, data)
}

export const userApi = {
  getAllComment,
  approvalComment,
  getUserToken,
  deleteComment
}
