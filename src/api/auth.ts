import instance, {responseData} from './base';
import {GetCurrentUserResponse, LoginResponse, LogoutResponse} from './types';

const AUTH = '/auth';
const AUTH_ME = AUTH + '/me';
const AUTH_LOGIN = AUTH + '/login';

const authAPI = {
  getCurrentUser: () => instance.get<GetCurrentUserResponse>(AUTH_ME).then(responseData),

  login: (email: string, password: string, rememberMe: boolean, captcha?: string | null) => (
    instance.post<LoginResponse>(AUTH_LOGIN, {email, password, rememberMe, captcha})
      .then(responseData)
  ),

  logout: () => instance.delete<LogoutResponse>(AUTH_LOGIN).then(responseData)
};

export default authAPI;
