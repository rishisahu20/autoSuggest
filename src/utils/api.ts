import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      config.headers[
        'Authorization'
      ] = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
      config.headers['Content-Type'] = 'application/json';
    }
    console.log('Request:', config);
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response:', response);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('Response error:', error.response);
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error(`Error: ${error.response.status}`);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
