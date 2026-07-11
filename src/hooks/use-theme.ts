/**
 * Theme management hook for dark/light mode switching / 深色/浅色模式切换 Hook
 * Persists user preference to localStorage and applies/removes the `dark` class on <html>.
 * Follows HeroUI v3 dark mode convention: both `class="dark"` and `data-theme="dark"` are set.
 * / 将用户偏好持久化到 localStorage，在 <html> 上切换 dark class 和 data-theme 属性，
 *   遵循 HeroUI v3 暗色模式规范。
 */

import { useState, useEffect, useCallback } from "react";

/** LocalStorage key for persisting theme preference / 持久化主题偏好的 localStorage 键名 */
const THEME_KEY = "hero-admin-theme";

/** Available theme values / 可用的主题值 */
type Theme = "light" | "dark";

/** Apply the given theme to the document root element / 将主题应用到文档根元素 */
const applyThemeToRoot = (theme: Theme): void => {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

/** Read initial theme from localStorage, falling back to system preference / 从 localStorage 读取主题，未设置时使用系统偏好 */
const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/**
 * useTheme - Dark/light mode toggle hook / 深色/浅色模式切换 Hook
 *
 * @returns {{ isDark: boolean, theme: Theme, toggle: () => void }}
 *   - isDark: Whether the current theme is dark / 当前是否为暗色模式
 *   - theme: Current theme value / 当前主题值
 *   - toggle: Switch between light and dark modes / 切换主题
 *
 * @example
 * const { isDark, toggle } = useTheme();
 * <button onClick={toggle}>{isDark ? <Sun /> : <Moon />}</button>
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Sync theme state with the DOM and localStorage / 将主题状态同步到 DOM 和 localStorage
  useEffect(() => {
    applyThemeToRoot(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Listen for system preference changes when user hasn't set a preference / 未设置偏好时监听系统主题变化
  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return; // User has explicit preference / 用户已明确设置偏好

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme: Theme = e.matches ? "dark" : "light";
      setTheme(newTheme);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  /** Toggle between light and dark modes / 切换深色/浅色模式 */
  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { isDark: theme === "dark", theme, toggle };
};
