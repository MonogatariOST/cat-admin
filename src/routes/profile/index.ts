/**
 * Profile module route configuration / 个人信息路由配置
 */

import type { RouteObject } from "react-router";

const profileRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () => import("../../views/profile"),
  },
];

export { profileRoutes };
