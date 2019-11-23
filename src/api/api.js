import * as axios from 'axios';

const BASE_URL = 'https://social-network.samuraijs.com/api/1.0';
const AUTH = '/auth';
const AUTH_ME = AUTH + '/me';
const AUTH_LOGIN = AUTH + '/login';
const USERS = '/users';
const FOLLOW = '/follow';
const PROFILE = '/profile';
const PROFILE_STATUS = PROFILE + '/status';
const PROFILE_PHOTO = PROFILE + '/photo';

const API_KEY = '12978896-c3c3-47c8-a5ce-4cdffd884edb';

const instance = axios.create({
  withCredentials: true,
  headers: { 'API-KEY': API_KEY },
  baseURL: BASE_URL
});

const responseData = ({ data }) => data;

export const authAPI = {
  getCurrentUser: () => instance.get(AUTH_ME).then(responseData),

  login: (email, password, rememberMe, captcha) => (
    instance
      .post(AUTH_LOGIN, { email, password, rememberMe, captcha })
      .then(responseData)
  ),

  logout: () => instance.delete(AUTH_LOGIN).then(responseData)
};

export const usersAPI = {
  get: (count, page) => (
    instance.get(USERS, { params: { count, page } }).then(responseData)
  ),

  follow: (userId) => instance.post(`${FOLLOW}/${userId}`).then(responseData),

  unFollow: (userId) => (
    instance.delete(`${FOLLOW}/${userId}`).then(responseData)
  )
};

export const profileAPI = {
  get: (userId) => instance.get(`${PROFILE}/${userId}`).then(responseData),

  getStatus: (userId) => (
    instance.get(`${PROFILE_STATUS}/${userId}`).then(responseData)
  ),

  updateStatus: (status) => (
    instance.put(PROFILE_STATUS, { status }).then(responseData)
  ),

  updatePhoto: (image) => {
    const formData = new FormData();

    formData.append('image', image);

    return instance.put(PROFILE_PHOTO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseData);
  }
};