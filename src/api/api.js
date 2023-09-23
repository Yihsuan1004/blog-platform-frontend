import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5200/api',
});

const EXCLUDED_URLS = ['/auth/login', '/auth/register'];


// 使用請求攔截器(interceptor)為每個請求添加 token
api.interceptors.request.use((config) => {

  if (!EXCLUDED_URLS.includes(config.url)) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user && user.data && user.data.token;

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
  }

  return config;
  
}, (error) => {
  return Promise.reject(error);
});

export default api;
