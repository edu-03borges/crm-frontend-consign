import axios from 'axios';

export const customApi = axios;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
