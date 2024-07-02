import axios from 'axios';
import { publicIp } from 'public-ip';
import { getToken } from 'utils';

const myIp = await publicIp();
const token = getToken();
const urlBack = process.env.REACT_APP_API_URL;

export const customApi = axios;

export const apiAuth = axios.create({
  baseURL: urlBack,
  headers: {
    'x-forwarded-for': myIp,
  }
});

const api = axios.create({
  baseURL: urlBack,
  headers: {
    'x-forwarded-for': myIp,
    'x-access-token': token,
  }
});

export default api;
