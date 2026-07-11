/**
 * Auth state management with Jotai / 认证状态管理
 * Provides token, user, and derived isAuthenticated atoms.
 * / 提供令牌、用户信息和派生认证状态原子
 */

import { atom } from "jotai";
import type { User } from "../../types/user";

/** localStorage key for auth token / 认证令牌的 localStorage 键名 */
const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "auth_token";

/**
 * Token atom — initialized from localStorage for session persistence across refreshes / 令牌原子，从 localStorage 初始化以实现刷新后持久化
 */
const tokenAtom = atom<string | null>(
  localStorage.getItem(TOKEN_KEY),
);

/**
 * User info atom — null when not logged in / 用户信息原子，未登录时为 null
 */
const userAtom = atom<User | null>(null);

/**
 * Derived authentication status atom / 派生认证状态原子
 * Returns true when a valid token exists.
 * / 存在有效令牌时返回 true
 */
const isAuthenticatedAtom = atom<boolean>((get) => !!get(tokenAtom));

export { tokenAtom, userAtom, isAuthenticatedAtom };
