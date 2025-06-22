import axios, { AxiosError, AxiosResponse } from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://103.163.24.72";
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined. Check your environment variables.");
}
const request = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login if needed
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // You might want to redirect to login page here
      console.warn('Authentication failed. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export const get = async (path: string, options = {}) => {
  try {
    const response: AxiosResponse = await request.get(path, options);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error retrieving data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
    // throw new Error("Error retrieving notifications");
  }
};

export const deleteData = async (path: string, options = {}) => {
  try {
    const response: AxiosResponse = await request.delete(path, options);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error deleting data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const put = async (path: string, data: any, options = {}) => {
  try {
    const response: AxiosResponse = await request.put(path, data, options);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = async (path: string, data: any = {}, options = {}) => {
  try {
    console.log('🌐 Making POST request:');
    console.log('Path:', path);
    console.log('Data:', data);
    console.log('Options:', options);

    const response: AxiosResponse = await request.post(path, data, options);

    console.log('🎯 POST Response received:');
    console.log('Status:', response.status);
    console.log('StatusText:', response.statusText);
    console.log('Headers:', response.headers);
    console.log('Data:', response.data);

    return response;
  } catch (error) {
    console.error("🚨 POST Request failed:");
    if (error instanceof AxiosError) {
      console.error("Axios Error:", error.message);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      console.error("Request config:", error.config);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// PATCH
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patch = async (path: string, data: any = {}, config = {}) => {
  try {
    const response: AxiosResponse = await request.patch(path, data, config);
    return response.data;
  } catch (error) {
    handleError("patching", error);
    throw error;
  }
};
// Common error handler
function handleError(action: string, error: unknown) {
  if (error instanceof AxiosError) {
    console.error(`Error ${action} data:`, error.message);
  } else {
    console.error(`Unexpected error ${action} data:`, error);
  }
}

export default request;
