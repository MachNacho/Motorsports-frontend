import axios, { AxiosError, type AxiosResponse } from "axios";

const BASE_URL = "https://localhost:7016";

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
// Inject Authorization token (if present) before every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const api = {
  get: async <T>(url: string): Promise<T> => {
    const { data }: AxiosResponse<T> = await apiClient.get(url);
    return data;
  },
  post: async <T>(url: string, body?: unknown): Promise<T> => {
    const { data }: AxiosResponse<T> = await apiClient.post(url, body);
    return data;
  },
  put: async <T>(url: string, body?: unknown): Promise<T> => {
    const { data }: AxiosResponse<T> = await apiClient.put(url, body);
    return data;
  },
  delete: async <T>(url: string): Promise<T> => {
    const { data }: AxiosResponse<T> = await apiClient.delete(url);
    return data;
  },
};


// Response Interceptor
// Handle common errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          console.warn("Unauthorized — token might be invalid or expired");
          localStorage.removeItem("token");
          window.location.href = "/login"; // optional redirect
          break;
        case 403:
          console.error("Forbidden — you don't have permission");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error, please try again later");
          break;
        default:
          console.error("Unexpected error occurred");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
