/**
 * Auth API type definitions / 认证 API 类型定义
 */

import type { User } from "../../types/user";

/** Login request parameters / 登录请求参数 */
export interface LoginRequest {
  /** Username / 用户名 */
  username: string;
  /** Password / 密码 */
  password: string;
  /** Whether to remember login / 是否记住登录状态 */
  remember?: boolean;
}

/** Login response data / 登录响应数据 */
export interface LoginResponse {
  /** JWT or session token / JWT 或会话令牌 */
  token: string;
  /** Current user info / 当前用户信息 */
  user: User;
}
