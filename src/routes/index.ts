/**
 * Main route configuration / 主路由配置
 * Aggregates all module routes, applies guards, and defines the top-level layout.
 * Uses createElement to avoid JSX in .ts files.
 * / 聚合所有模块路由、应用守卫、定义顶层布局，使用 createElement 避免在 .ts 文件中使用 JSX
 */

import { createElement, lazy, type ComponentType } from 'react';
import type { RouteObject } from 'react-router';
import { createBrowserRouter, Navigate } from 'react-router';
import { AuthenticatedLayout, NotFoundPage, ErrorPage } from './route-elements';
import { dashboardRoutes } from './dashboard';
import { userRoutes } from './user';
import { settingsRoutes } from './settings';
import { teachersRoutes } from './teachers';
import { profileRoutes } from './profile';
import { coursesRoutes } from './courses';
import { classroomsRoutes } from './classrooms';
import { classesRoutes } from './classes';
import { permissionsRoutes } from './permissions';
import { rolesRoutes } from './roles';
import { formRoutes } from './forms';
import { routes as articlesRoutes } from './articles';
import { routes as advancedTableRoutes } from './advanced-table';
import { routes as auditLogRoutes } from './audit-log';
import { routes as kanbanRoutes } from './kanban';
import { AuthLayout } from '../layouts';
import { authRoutes } from './auth';

/** Empty HydrateFallback for client-only routing / 纯客户端路由的空 HydrateFallback */
const HydrateFallback: ComponentType = () => null;

/**
 * Top-level route tree / 顶层路由树
 *
 * Structure / 结构:
 * / → redirect to /dashboard
 * /dashboard → Dashboard Overview
 * /dashboard/analytics → Dashboard Analytics
* /login → Login page
* /settings → Account settings
* /permissions → Permission management
 * /classes → Class management
 * /classrooms → Classroom management
 * /courses → Course management
 * /teachers → Teacher management
 * /profile → Profile page
 * /roles → Role management
* /users → User List
 * /users/:id → User Detail
 * /articles → Article Management
 * /advanced-table → Advanced Table Demo
 * /audit-log → Audit Log
 * /kanban → Task Kanban Board
 * * → 404 fallback
 */
const routes: RouteObject[] = [
  // Public auth route (no guard, declared before catch-all routes) / 公开认证路由（无守卫，放在兜底路由之前）
  {
    element: createElement(AuthLayout),
    children: authRoutes,
  },
  {
    path: '/',
    HydrateFallback,
    element: createElement(AuthenticatedLayout),
    errorElement: createElement(ErrorPage),
    children: [
      {
        index: true,
        element: createElement(Navigate, { to: '/dashboard', replace: true }),
      },
      {
        path: 'dashboard',
        children: dashboardRoutes,
      },
      {
        path: 'users',
        children: userRoutes,
      },
      {
        path: 'settings',
        children: settingsRoutes,
      },
      {
        path: 'teachers',
        children: teachersRoutes,
      },
      {
        path: 'profile',
        children: profileRoutes,
      },
      {
        path: 'courses',
        children: coursesRoutes,
      },
      {
        path: 'classrooms',
        children: classroomsRoutes,
      },
      {
        path: 'classes',
        children: classesRoutes,
      },
      {
        path: 'permissions',
        children: permissionsRoutes,
      },
      {
        path: 'roles',
        children: rolesRoutes,
      },
      {
        path: 'forms',
        children: formRoutes,
      },
      {
        path: 'articles',
        children: articlesRoutes,
      },
      {
        path: 'advanced-table',
        children: advancedTableRoutes,
      },
      {
        path: 'audit-log',
        children: auditLogRoutes,
      },
      {
        path: 'kanban',
        children: kanbanRoutes,
      },
      {
        path: 'error',
        children: [
          { index: true, element: createElement(Navigate, { to: '/dashboard', replace: true }) },
          { path: '404', element: createElement(lazy(() => import('../views/errors/not-found'))) },
          { path: '403', element: createElement(lazy(() => import('../views/errors/forbidden'))) },
          { path: '500', element: createElement(lazy(() => import('../views/errors/server-error'))) },
        ],
      },
      {
        path: '*',
        element: createElement(NotFoundPage),
      },
    ],
  },
] as (RouteObject & { HydrateFallback: ComponentType })[];

/** Browser router instance / 浏览器路由实例 */
const router = createBrowserRouter(routes);

export { router, routes };
export type { RouteObject };
