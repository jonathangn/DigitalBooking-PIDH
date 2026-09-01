import axios from 'axios';
import { getToken, logout } from './auth';
import { normalizeError, ApiError } from '../api/client';

const Api = import.meta.env.VITE_API_URL || '/api/';

const axiosClient = axios.create({
  baseURL: Api,
  timeout: 10000,
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
    const normalized = normalizeError(error);
    if (normalized.status === 401) {
      logout();
    }
    return Promise.reject(normalized instanceof ApiError ? normalized : error);
  }
);

export default axiosClient;
export { Api };
