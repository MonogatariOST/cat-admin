/**
 * Dashboard route fallback components / 看板路由回退组件
 * Skeleton loading states and Suspense wrappers for lazy-loaded dashboard pages.
 * / 骨架加载状态和懒加载看板页面的 Suspense 包装
 */

import { lazy, Suspense, type ReactNode } from 'react';

/** Lazy-loaded dashboard pages / 懒加载的看板页面 */
const Overview = lazy(() => import('../../views/dashboard/overview'));
const Analytics = lazy(() => import('../../views/dashboard/analytics'));

/** Array of fallback skeleton heights / 骨架屏高度列表 */
const fallbackHeights = [28, 20];

/**
 * DashboardFallback - Loading skeleton for dashboard pages / 看板页面加载骨架屏
 */
const DashboardFallback = (): ReactNode => (
  <div className="p-8">
    <div
      className={`mb-6 h-${fallbackHeights[0]} w-48 animate-pulse rounded bg-foreground-200`}
    />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-lg bg-surface" />
      ))}
    </div>
  </div>
);

/**
 * Suspense wrappers for lazy dashboard pages / 懒加载看板页面的 Suspense 包装
 */
const SuspendedOverview = (): ReactNode => (
  <Suspense fallback={<DashboardFallback />}>
    <Overview />
  </Suspense>
);

const SuspendedAnalytics = (): ReactNode => (
  <Suspense fallback={<DashboardFallback />}>
    <Analytics />
  </Suspense>
);

export { DashboardFallback, SuspendedOverview, SuspendedAnalytics };
