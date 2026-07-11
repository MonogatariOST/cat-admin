/**
 * Route element components / 路由元素组件
 * JSX-based components used in the route configuration.
 * Separated into .tsx to avoid JSX-in-.ts parsing issues.
 * / 路由配置中使用的 JSX 组件，拆分到 .tsx 文件中以避免在 .ts 文件中使用 JSX 的解析问题
 */

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { MainLayout } from "../layouts";
import { RequireAuth } from "./guards";
import { PageTitleProvider } from "../stores";
import { Button } from "@heroui/react";
import { AlertTriangle, RefreshCw, Home, ChevronDown, SearchX } from "lucide-react";

/**
 * AuthenticatedLayout - Wraps MainLayout inside RequireAuth guard / 认证守卫包裹主布局
 */
const AuthenticatedLayout = (): ReactNode => (
  <RequireAuth>
    <PageTitleProvider>
      <MainLayout />
    </PageTitleProvider>
  </RequireAuth>
);

/**
 * NotFoundPage - 404 fallback page / 404 回退页面
 */
const NotFoundPage = (): ReactNode => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <SearchX size={64} className="text-danger" />
        <h1 className="mt-4 text-lg font-semibold text-foreground">404 - \u9875\u9762\u672a\u627e\u5230</h1>
        <p className="mt-1 text-sm text-foreground-500">\u8bbf\u95ee\u7684\u9875\u9762\u4e0d\u5b58\u5728\u6216\u5df2\u88ab\u79fb\u9664</p>
        <Button variant="primary" className="mt-4" onPress={() => navigate("/dashboard")}>
          <Home size={16} />\u8fd4\u56de\u9996\u9875
        </Button>
      </div>
    </div>
  );
};

/**
 * ErrorPage - Route-level error boundary page / 路由级错误边界页面
 * Displayed when a route loader/component throws an error.
 * / 当路由 loader/组件抛出错误时显示的页面
 */
const ErrorPage = (): ReactNode => {
  const error = useRouteError();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message ?? error.statusText;
  } else if (error instanceof Error) {
    title = error.name || "Error";
    message = error.message;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Large error icon / 大型错误图标 */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-danger/10">
          <AlertTriangle size={40} className="text-danger" />
        </div>

        {/* Status code badge / 状态码标签 */}
        {statusCode && (
          <span className="mb-3 inline-flex items-center rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger">
            {statusCode}
          </span>
        )}

        {/* Title / 错误标题 */}
        <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>

        {/* Message / 错误描述 */}
        <p className="mb-8 text-sm text-foreground-500">{message}</p>

        {/* Action buttons / 操作按钮 */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="secondary"
            
            onPress={() => navigate("/")}
          >
            <Home size={16} />
            Go Home
          </Button>
          <Button
            variant="ghost"
            
            onPress={() => window.location.reload()}
          >
            <RefreshCw size={16} />
            Reload
          </Button>
        </div>

        {/* Error details toggle / 错误详情切换 */}
        {error instanceof Error && error.stack && (
          <div className="mt-6 w-full">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1 text-xs text-foreground-400 hover:text-foreground transition-colors"
            >
              <ChevronDown
                size={14}
                className={"transition-transform " + (showDetails ? "rotate-180" : "")}
              />
              {showDetails ? "Hide" : "Show"} error details
            </button>
            {showDetails && (
              <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-surface-tertiary p-4 text-left text-xs text-foreground-500 font-mono whitespace-pre-wrap">
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { AuthenticatedLayout, NotFoundPage, ErrorPage };