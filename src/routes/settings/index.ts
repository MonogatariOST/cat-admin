/**
 * Settings module route configuration / 设置模块路由配置
 * / 设置页面的路由配置
 */

import type { RouteObject } from "react-router";

/** Settings routes / 设置路由 */
const settingsRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () => import("../../views/settings/profile"),
  },
];

export { settingsRoutes };
