/**
 * Permission module route configuration / 权限模块路由配置
 * / 权限管理页面的路由配置
 */

import type { RouteObject } from "react-router";

const permissionsRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () => import("../../views/permissions/list"),
  },
];

export { permissionsRoutes };
