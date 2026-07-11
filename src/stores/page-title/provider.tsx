/**
 * PageTitleProvider - Page title context provider component
 *
 * Place this at the layout level so all pages within can set the title.
 * / 页面标题上下文提供者组件，放在布局层使内部所有页面都能设置标题
 */

import { useMemo, useState, type ReactNode } from "react";
import { PageTitleCtx, type PageTitleState } from "./context";

/**
 * Provider for page title context / 页面标题上下文提供者
 */
export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<PageTitleState>({ title: "" });
  const ctxValue = useMemo(() => ({ value, setValue }), [value]);
  return (
    <PageTitleCtx.Provider value={ctxValue}>
      {children}
    </PageTitleCtx.Provider>
  );
}
