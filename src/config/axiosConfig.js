import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000', // Set your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // You can modify the request config before sending it
    // For example, add an authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  error => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
