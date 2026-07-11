/**
 * User route module / 用户路由模块
 * Aggregates all user-related route configurations.
 * / 聚合所有用户相关的路由配置
 */

/**
 * User route module / 用户路由模块
 * Aggregates all user-related route configurations.
 * Uses createElement to avoid JSX in .ts files.
 * / 聚合所有用户相关的路由配置，使用 createElement 避免在 .ts 文件中使用 JSX
 */

import type { RouteObject } from 'react-router';
import { createElement } from 'react';
import { SuspendedList, SuspendedDetail } from './fallback';

/** User route configuration / 用户路由配置 */
const userRoutes: RouteObject[] = [
  {
    index: true,
    element: createElement(SuspendedList),
  },
  {
    path: ':id',
    element: createElement(SuspendedDetail),
  },
];

export { userRoutes };
