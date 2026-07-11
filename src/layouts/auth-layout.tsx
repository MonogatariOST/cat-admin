/**
 * Auth layout / 认证布局
 * Centered layout for login/register pages with minimal chrome.
 * / 登录/注册页面的居中布局，无侧边栏和导航
 */

import { Outlet } from 'react-router';

/**
 * AuthLayout - Minimal centered layout for authentication pages / 认证页面简约居中布局
 */
const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo / 品牌标识 */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground text-xl font-bold">
            H
          </div>
          <h1 className="text-xl font-semibold text-foreground">HeroAdmin</h1>
        </div>

        {/* Auth content slot / 认证内容插槽 */}
        <Outlet />
      </div>
    </div>
  );
};

export { AuthLayout };
