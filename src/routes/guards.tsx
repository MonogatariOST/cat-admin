/**
 * Route guards / 路由守卫
 * Authentication and permission guards for route protection.
 * / 认证和权限守卫，用于路由保护
 */

import { useAtomValue } from "jotai";
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { isAuthenticatedAtom } from "../stores/auth";

/**
 * RequireAuth - Route guard that redirects unauthenticated users / 路由认证守卫，未认证用户重定向到登录页
 *
 * TODO: Replace with actual auth check / 替换为实际认证检查逻辑
 */
/**
 * RequireAuth - Route guard that redirects unauthenticated users to /login / 路由认证守卫，未认证用户跳转到登录页
 * Reads authentication status from Jotai isAuthenticatedAtom.
 * / 从 Jotai isAuthenticatedAtom 读取认证状态
 */
const RequireAuth = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, preserving the intended destination / 重定向到登录页，保留目标地址
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export { RequireAuth };
