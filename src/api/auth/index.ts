/**
 * Auth API module / 认证 API 模块
 * Provides login, logout, and getCurrentUser functions.
 * Currently uses mock data — replace API calls with real backend when available.
 * / 提供登录、退出、获取当前用户功能；当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { LoginRequest, LoginResponse } from "./types";
import type { User } from "../../types/user";

/** Mock user data for development / 开发环境模拟用户数据 */
const MOCK_USER: User = {
  id: "1",
  username: "admin",
  email: "admin@example.com",
  role: "管理员",
  status: "active",
};

/** Simulate network delay for mock API / 模拟网络延迟 */
const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Login API / 登录接口
 * Mock credentials: admin / admin123
 * / 模拟凭据: admin / admin123
 */
const login = async (data: LoginRequest): Promise<LoginResponse> => {
  await delay();
  // Mock validation — replace with real API call / 模拟验证，接入后端时替换为真实请求
  if (data.username === "admin" && data.password === "admin123") {
    return {
      token: "mock_token_" + Date.now(),
      user: MOCK_USER,
    };
  }
  throw new Error("用户名或密码错误");
};

/**
 * Logout API / 退出登录接口
 */
const logout = async (): Promise<void> => {
  await delay(300);
  // Clear server-side session / 清除服务端会话
};

/**
 * Get current user info / 获取当前用户信息
 */
const getCurrentUser = async (): Promise<User> => {
  await delay(200);
  return MOCK_USER;
};

export const authApi = { login, logout, getCurrentUser };
