import axios from 'axios';
import { getToken, logout } from './auth';

const Api = import.meta.env.VITE_API_URL || '/api/';

const axiosClient = axios.create({
  baseURL: Api,
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
export { Api };
