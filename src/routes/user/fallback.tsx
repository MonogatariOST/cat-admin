/**
 * User route fallback components / 用户路由回退组件
 * Skeleton loading states and Suspense wrappers for lazy-loaded user pages.
 * / 骨架加载状态和懒加载用户页面的 Suspense 包装
 */

import { lazy, Suspense, type ReactNode } from 'react';

/** Lazy-loaded user pages / 懒加载的用户页面 */
const List = lazy(() => import('../../views/user/list'));
const Detail = lazy(() => import('../../views/user/detail'));

/**
 * UserFallback - Loading skeleton for user pages / 用户页面加载骨架屏
 */
const UserFallback = (): ReactNode => (
  <div className="p-8">
    <div className="mb-6 h-8 w-48 animate-pulse rounded bg-foreground-200" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-lg bg-surface" />
      ))}
    </div>
    <div className="mt-6 h-64 animate-pulse rounded-lg bg-surface" />
  </div>
);

/**
 * Suspense wrappers for lazy user pages / 懒加载用户页面的 Suspense 包装
 */
const SuspendedList = (): ReactNode => (
  <Suspense fallback={<UserFallback />}>
    <List />
  </Suspense>
);

const SuspendedDetail = (): ReactNode => (
  <Suspense fallback={<UserFallback />}>
    <Detail />
  </Suspense>
);

export { UserFallback, SuspendedList, SuspendedDetail };
