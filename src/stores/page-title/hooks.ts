/**
 * Page title hooks / 页面标题 Hook
 *
 * usePageTitle: read the current page title from context
 * useSetPageTitle: set the page title from within a page component
 * / usePageTitle: 从上下文读取当前页面标题
 *   useSetPageTitle: 在页面组件中设置页面标题
 */

import { useContext, useEffect } from "react";
import { PageTitleCtx } from "./context";

/**
 * Consumer hook to read the current page title / 读取当前页面标题的消费者 hook
 */
export function usePageTitle() {
  return useContext(PageTitleCtx).value;
}

/**
 * Hook to set the page title from within a page component / 在页面组件中设置页面标题的 hook
 */
export function useSetPageTitle(title: string, description?: string) {
  const { setValue } = useContext(PageTitleCtx);
  useEffect(() => {
    setValue({ title, description });
  }, [title, description, setValue]);
}
