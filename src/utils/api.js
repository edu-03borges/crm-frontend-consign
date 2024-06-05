import axios from 'axios';

export const customApi = axios;

const api = axios.create({
  baseURL: 'http://localhost:3333' // process.env.VITE_APP_API_URL
});

export default api;
