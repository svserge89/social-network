import {Photos, Profile, User} from '../models/types';

export type ResponseData<T> = {
  data: T
}

type DefaultResponse = {
  resultCode: number
  messages: string[]
}

type DefaultResponseWithEmptyData = DefaultResponse & {
  data: {}
}

export type GetCurrentUserResponse = DefaultResponse & {
  data: {
    id: number
    email: string
    login: string
  }
}

export type LoginResponse = DefaultResponse & {
  data: {
    userId: number
  }
}

export type LogoutResponse = DefaultResponseWithEmptyData

export type GetUsersResponse = {
  items: User[]
  totalCount: number
  error: string | null
}

export type FollowUserResponse = DefaultResponseWithEmptyData

export type UnFollowUserResponse = DefaultResponseWithEmptyData

export type GetProfileResponse = Profile

export type UpdateProfileResponse = DefaultResponseWithEmptyData

export type GetStatusResponse = string

export type UpdateStatusResponse = DefaultResponseWithEmptyData

export type UpdatePhotoResponse = DefaultResponse & {
  data: {
    photos: Photos
  }
}