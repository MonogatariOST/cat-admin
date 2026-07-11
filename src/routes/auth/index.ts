/**
 * Auth module route configuration / 认证模块路由配置
 * Uses React.lazy for code-splitting on the login page.
 * / 使用 React.lazy 对登录页进行分包
 */

import type { RouteObject } from "react-router";

/** Auth routes: login page wrapped in Suspense / 认证路由：登录页面位于 Suspense 内 */
const authRoutes: RouteObject[] = [
  {
    path: "login",
    lazy: () => import("../../views/auth/login"),
  },
];

export { authRoutes };
