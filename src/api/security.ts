import instance, {responseData} from './base';
import {GetCaptchaResponse} from './types';

const CAPTCHA = '/security/get-captcha-url';

const securityAPI = {
  getCaptcha: () => instance.get<GetCaptchaResponse>(`${CAPTCHA}`).then(responseData)
};

export default securityAPI;
