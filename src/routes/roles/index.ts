/**
 * Role module route configuration / 角色模块路由配置
 * / 角色管理页面的路由配置
 */

import type { RouteObject } from "react-router";

const rolesRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () => import("../../views/roles/list"),
  },
];

export { rolesRoutes };
