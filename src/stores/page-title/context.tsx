/**
 * PageTitleContext - React context for page title state
 *
 * Context definition, separated from provider and hooks to satisfy
 * react-refresh/only-export-components rule.
 * / 页面标题上下文定义，与 provider 和 hooks 分离以满足 react-refresh 规则
 */

import { createContext } from "react";

/** Page title state / 页面标题状态 */
export interface PageTitleState {
  title: string;
  description?: string;
}

/** Context value structure / 上下文值结构 */
interface PageTitleContextValue {
  value: PageTitleState;
  setValue: (v: PageTitleState) => void;
}

export const PageTitleCtx = createContext<PageTitleContextValue>({
  value: { title: "" },
  setValue: () => {},
});
