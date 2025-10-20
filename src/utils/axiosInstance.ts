import axios, { type AxiosError } from 'axios';

const BASE_URL =
  import.meta.env.VITE_PUBLIC_API_URL || 'https://rimac-front-end-challenge.netlify.app/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

// Global error handling
const handleError = (error: AxiosError) => {
  const { response, request, message } = error;
  if (response) {
    const { status, config, data } = response;
    console.error(
      `[Error ${status}] ${config?.method?.toUpperCase()} ${config?.baseURL}${config?.url}`,
      data
    );
  } else if (request) {
    console.error('[No response received]', request);
  } else {
    console.error('[Error configuring request]', message);
  }
};

export default axiosInstance;
