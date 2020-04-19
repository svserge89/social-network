import axios from 'axios';

import {
  FollowUserResponse,
  GetCurrentUserResponse,
  GetProfileResponse,
  GetStatusResponse,
  GetUsersResponse,
  LoginResponse,
  LogoutResponse,
  ResponseData,
  UnFollowUserResponse,
  UpdatePhotoResponse,
  UpdateProfileResponse,
  UpdateStatusResponse
} from './types';
import {Profile} from '../models/types';

const BASE_URL = 'https://social-network.samuraijs.com/api/1.0';
const AUTH = '/auth';
const AUTH_ME = AUTH + '/me';
const AUTH_LOGIN = AUTH + '/login';
const USERS = '/users';
const FOLLOW = '/follow';
const PROFILE = '/profile';
const PROFILE_STATUS = PROFILE + '/status';
const PROFILE_PHOTO = PROFILE + '/photo';
const CAPTCHA = '/security/get-captcha-url';

const API_KEY = '12978896-c3c3-47c8-a5ce-4cdffd884edb';

const instance = axios.create({
  withCredentials: true,
  headers: {'API-KEY': API_KEY},
  baseURL: BASE_URL
});

const responseData = <T>({data}: ResponseData<T>) => data;

export const authAPI = {
  getCurrentUser: () => instance.get<GetCurrentUserResponse>(AUTH_ME).then(responseData),

  login: (email: string, password: string, rememberMe: boolean, captcha?: string | null) => (
    instance.post<LoginResponse>(AUTH_LOGIN, {email, password, rememberMe, captcha})
      .then(responseData)
  ),

  logout: () => instance.delete<LogoutResponse>(AUTH_LOGIN).then(responseData)
};

export const usersAPI = {
  get: (count: number, page: number) => instance.get<GetUsersResponse>(USERS, {
    params: {
      count,
      page
    }
  }).then(responseData),

  follow: (userId: number) => instance.post<FollowUserResponse>(`${FOLLOW}/${userId}`)
    .then(responseData),

  unFollow: (userId: number) => instance.delete<UnFollowUserResponse>(`${FOLLOW}/${userId}`)
    .then(responseData)
};

export const profileAPI = {
  get: (userId: number) => instance.get<GetProfileResponse>(`${PROFILE}/${userId}`)
    .then(responseData),

  update: (profile: Profile) => instance.put<UpdateProfileResponse>(PROFILE, profile)
    .then(responseData),

  getStatus: (userId: number) => instance.get<GetStatusResponse>(`${PROFILE_STATUS}/${userId}`)
    .then(responseData),

  updateStatus: (status: string) => instance.put<UpdateStatusResponse>(PROFILE_STATUS, {status})
    .then(responseData),

  updatePhoto: (image: File) => {
    const formData = new FormData();

    formData.append('image', image);

    return instance.put<UpdatePhotoResponse>(
      PROFILE_PHOTO,
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}}
    ).then(responseData);
  }
};

export const securityAPI = {
  getCaptcha: () => instance.get(`${CAPTCHA}`).then(responseData)
};
