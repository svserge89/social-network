import instance, {responseData} from './base';

const CAPTCHA = '/security/get-captcha-url';

const securityAPI = {
  getCaptcha: () => instance.get(`${CAPTCHA}`).then(responseData)
};

export default securityAPI;
