/**
 * useAutoRows - Auto-adapt rows per page based on available container height
 * / 根据容器可用高度自动适应每页显示条数
 */

import { useRef, useState, useEffect } from 'react';

export interface UseAutoRowsOptions {
  /** Default rows per page used before first measurement / 首次测量前默认行数 */
  defaultRows?: number;
  /** Height per row in pixels / 每行高度（像素），用于计算可用行数 */
  rowHeight?: number;
  /** Height of table header section in pixels / 表格表头高度 */
  headerHeight?: number;
  /** Height of pagination footer in pixels / 分页栏高度 */
  footerHeight?: number;
  /** Minimum number of rows / 最少显示行数 */
  minRows?: number;
}

/**
 * Hook that uses ResizeObserver to track container height and calculates how many
 * table rows fit in the available space. Returns the container ref and dynamic rowsPerPage.
 * / 通过 ResizeObserver 监听容器高度变化，自动计算可用行数，返回 containerRef 和动态 rowsPerPage。
 */
export function useAutoRows(options: UseAutoRowsOptions = {}) {
  const {
    defaultRows = 10,
    rowHeight = 48,
    headerHeight = 42,
    footerHeight = 40,
    minRows = 3,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRows);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calculate = () => {
      const availableHeight = el.clientHeight;
      const usableHeight = availableHeight - headerHeight - footerHeight;
      const rows = Math.max(minRows, Math.floor(usableHeight / rowHeight));
      if (rows !== rowsPerPage) setRowsPerPage(rows);
    };

    calculate();

    const observer = new ResizeObserver(() => calculate());
    observer.observe(el);
    return () => observer.disconnect();
  }, [rowHeight, headerHeight, footerHeight, minRows, rowsPerPage]);

  return { rowsPerPage, containerRef };
}
