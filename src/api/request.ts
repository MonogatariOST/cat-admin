/**
 * Axios HTTP request instance / Axios HTTP 请求实例
 * Configures base URL, timeout, and request/response interceptors for token injection and error handling.
 * / 配置 baseURL、超时时间、请求/响应拦截器，用于令牌注入和错误处理
 */

import axios from "axios";

/** localStorage key for auth token / 认证令牌的 localStorage 键名 */
const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "auth_token";

/**
 * Axios instance with default configuration / 带默认配置的 Axios 实例
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach token to every request / 请求拦截器: 自动附带认证令牌
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle 401 unauthorized / 响应拦截器: 处理 401 未授权
request.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract business error message from response data / 从响应数据中提取业务错误信息
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    if (error.response?.status === 401) {
      // Clear stale token and redirect to login / 清除过期令牌并跳转到登录页
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export { request };
