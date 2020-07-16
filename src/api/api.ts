import axios from 'axios';

import {
  FollowResponse,
  GetCurrentUserResponse,
  GetFollowedResponse,
  GetProfileResponse,
  GetStatusResponse,
  GetUsersResponse,
  LoginResponse,
  LogoutResponse,
  ResponseData,
  UnFollowResponse,
  UpdatePhotoResponse,
  UpdateProfileResponse,
  UpdateStatusResponse,
  UsersRequestParams
} from './types';
import {Profile} from '../models/types';
import {Relation} from '../reducers/users/types';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH = '/auth';
const AUTH_ME = AUTH + '/me';
const AUTH_LOGIN = AUTH + '/login';
const USERS = '/users';
const FOLLOW = '/follow';
const PROFILE = '/profile';
const PROFILE_STATUS = PROFILE + '/status';
const PROFILE_PHOTO = PROFILE + '/photo';
const CAPTCHA = '/security/get-captcha-url';

const API_KEY = process.env.REACT_APP_API_KEY;

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
  get: (count: number, page: number, relation: Relation = Relation.ALL, filter: string = '') => {
    const params: UsersRequestParams = {count, page};

    switch (relation) {
      case Relation.FRIENDS:
        params.friend = true;
        break;
      case Relation.NOT_FRIENDS:
        params.friend = false;
        break;
    }

    if (filter) params.term = filter;

    return instance.get<GetUsersResponse>(USERS, {params}).then(responseData);
  }
};

export const followAPI = {
  get: (userId: number) => instance.get<GetFollowedResponse>(`${FOLLOW}/${userId}`).then(responseData),

  follow: (userId: number) => instance.post<FollowResponse>(`${FOLLOW}/${userId}`).then(responseData),

  unFollow: (userId: number) => instance.delete<UnFollowResponse>(`${FOLLOW}/${userId}`).then(responseData)
};

export const profileAPI = {
  get: (userId: number) => instance.get<GetProfileResponse>(`${PROFILE}/${userId}`).then(responseData),

  update: (profile: Profile) => instance.put<UpdateProfileResponse>(PROFILE, profile).then(responseData),

  getStatus: (userId: number) => instance.get<GetStatusResponse>(`${PROFILE_STATUS}/${userId}`).then(responseData),

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
