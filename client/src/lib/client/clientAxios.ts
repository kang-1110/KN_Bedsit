import axios from 'axios';
import { getCookie } from '$lib/utils/cookie';
import { PUBLIC_APP_API_URL } from '$env/static/public';
import { STORAGES } from '$lib/constants/storage';

const clientAxios = axios.create({
  baseURL: PUBLIC_APP_API_URL ?? 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

clientAxios.interceptors.request.use((config) => {
  const token = getCookie(STORAGES.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (token) {
//       prom.resolve(token);
//     } else {
//       prom.reject(error);
//     }
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async function (error) {
//     if (error?.response?.status === API_STATUS.UNAUTHORIZED) {
//       if (error?.response?.data?.path === '/api/public/v1/auth/refresh-token') {
//         return clearCookieLogout();
//       }
//       const originalRequest = error.config;

//       const refreshToken = getCookie(STORAGES.REFRESH_TOKEN);
//       if (!refreshToken) {
//         return clearCookieLogout();
//       }
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers['Authorization'] = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => {
//             Promise.reject(err);
//           });
//       }

//       isRefreshing = true;
//       try {
//         const response = await tokenApi.refreshToken(refreshToken);
//         const data: ApiResponse<LoginResponse> = response.data;
//         setCookieLogin(
//           data?.results?.object?.access_token,
//           data?.results?.object?.refresh_token,
//           data?.results?.object?.user,
//         );

//         processQueue(null, data.results.object.access_token);
//         // originalRequest.headers['Authorization'] = `Bearer ${data.results.object.access_token}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         clearCookieLogout();
//         window.location.href = ROUTE.LOGIN;
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   },
// );

export default clientAxios;
