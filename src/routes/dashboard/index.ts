/**
 * Dashboard route module / 看板路由模块
 * Aggregates all dashboard-related route configurations.
 * / 聚合所有看板相关的路由配置
 */

/** @file Route config for dashboard module / 看板模块路由配置 */
// (JSX components live in fallback.tsx to satisfy eslint .ts vs .tsx parsing rules)

/**
 * Dashboard route module / 看板路由模块
 * Aggregates all dashboard-related route configurations.
 * Uses createElement to avoid JSX in .ts files.
 * / 聚合所有看板相关的路由配置，使用 createElement 避免在 .ts 文件中使用 JSX
 */

import type { RouteObject } from 'react-router';
import { createElement } from 'react';
import type { ReactNode } from 'react';
import { SuspendedOverview, SuspendedAnalytics } from './fallback';

/** Typed element helper / 类型安全的元素创建辅助函数 */
const el = (comp: () => ReactNode) => createElement(comp as React.ComponentType);

/** Dashboard route configuration / 看板路由配置 */
const dashboardRoutes: RouteObject[] = [
  { index: true, element: el(SuspendedOverview) },
  { path: 'analytics', element: el(SuspendedAnalytics) },
];

export { dashboardRoutes };
