/**
 * useAuth — authentication hook / 认证 Hook
 * Wraps Jotai auth atoms and authApi into a convenient interface for login, logout, and auth state access.
 * / 封装 Jotai 认证原子和 authApi，提供登录、退出和认证状态访问的统一接口
 */

import { useAtom } from "jotai";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { tokenAtom, userAtom, isAuthenticatedAtom } from "../stores/auth";
import { authApi } from "../api/auth";

/** localStorage key for auth token / 认证令牌的 localStorage 键名 */
const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "auth_token";

/**
 * useAuth - Login, logout, and auth state / 登录、退出和认证状态
 */
const useAuth = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const navigate = useNavigate();

  /**
   * Login with username and password / 使用用户名和密码登录
   * On success, stores token in localStorage and navigates to dashboard.
   * / 成功后保存令牌到 localStorage 并跳转到仪表盘
   */
  const login = useCallback(
    async (username: string, password: string, remember = false) => {
      const response = await authApi.login({ username, password, remember });
      localStorage.setItem(TOKEN_KEY, response.token);
      setToken(response.token);
      setUser(response.user);
      navigate("/dashboard", { replace: true });
    },
    [setToken, setUser, navigate],
  );

  /**
   * Logout current user / 退出当前用户
   * Calls logout API, clears token from localStorage, resets atoms, and navigates to login.
   * / 调用退出接口，清除 localStorage 中的令牌，重置原子状态，跳转到登录页
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
      navigate("/login", { replace: true });
    }
  }, [setToken, setUser, navigate]);

  return { login, logout, user, token, isAuthenticated };
};

export { useAuth };
