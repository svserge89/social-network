import axios from 'axios';

import {ResponseData} from './types';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  withCredentials: true,
  headers: {'API-KEY': API_KEY},
  baseURL: BASE_URL
});

export const responseData = <T>({data}: ResponseData<T>) => data;

export default instance;
