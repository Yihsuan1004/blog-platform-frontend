import axios from 'axios';


const api = axios.create({
  baseURL: `${process.env.API_URL || 'http://localhost:5200'}/api`
})

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

// 使用響應攔截器(interceptor)來處理 401 錯誤
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('user');
    alert(error.response.message);
    // 重新導向到登入頁面
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
