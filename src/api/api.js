import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5200/api',
});

export default api;
