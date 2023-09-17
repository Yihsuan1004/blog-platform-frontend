import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5200/api',
});

// 使用請求攔截器(interceptor)為每個請求添加 token
api.interceptors.request.use((config) => {
  if (config.url !== '/auth/login') {
    const token = JSON.parse(localStorage.getItem('user')).data.token;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
      console.log('config',config);

    }
  }

  return config;
  
}, (error) => {
  return Promise.reject(error);
});

export default api;
