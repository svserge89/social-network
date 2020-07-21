import {Photos, Profile, User} from '../models/types';
import {CaptchaResultCode, ResultCode} from '../utils/response-codes';

export type ResponseData<T> = {
  data: T
}

export type UsersRequestParams = {
  count: number
  page: number
  term?: string
  friend?: boolean
}

type LoginResultCode = ResultCode | CaptchaResultCode

type DefaultResponse<T> = {
  resultCode: T
  messages: string[]
}

type DefaultResponseWithEmptyData = DefaultResponse<ResultCode> & {
  data?: {}
}

export type GetCurrentUserResponse = DefaultResponse<ResultCode> & {
  data?: {
    id: number
    email: string
    login: string
  }
}

export type GetCaptchaResponse = {
  url: string
}

export type LoginResponse = DefaultResponse<LoginResultCode> & {
  data?: {
    userId: number
  }
}

export type LogoutResponse = DefaultResponseWithEmptyData

export type GetUsersResponse = {
  items: User[]
  totalCount: number
  error: string | null
}

export type GetFollowedResponse = boolean

export type FollowResponse = DefaultResponseWithEmptyData

export type UnFollowResponse = DefaultResponseWithEmptyData

export type GetProfileResponse = Profile

export type UpdateProfileResponse = DefaultResponseWithEmptyData

export type GetStatusResponse = string

export type UpdateStatusResponse = DefaultResponseWithEmptyData

export type UpdatePhotoResponse = DefaultResponse<ResultCode> & {
  data?: {
    photos: Photos
  }
}
