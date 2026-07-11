/**
 * BuiToolbar - Reusable list page toolbar with left/right slot layout
 *
 * Wraps action buttons (left) and search/filters (right) into a consistent
 * justify-between layout. Supports reversing the two sides via the
 * `reverse` prop — change one prop across all pages to swap layout.
 *
 * Standard:
 *   [新建] [导出]          [搜索...] [状态▼]
 *
 * Reversed:
 *   [搜索...] [状态▼]     [新建] [导出]
 *
 * / 可复用的列表页工具栏组件，使用 justify-between 左操作右筛选布局。
 *   reverse prop 可一键反转左右两侧，无需改动每个页面。
 */

import type { ReactNode } from "react";

/** Props for BuiToolbar / BuiToolbar 属性接口 */
export interface BuiToolbarProps {
  /** Left slot: action buttons (新建, 导出, etc.) / 左侧插槽：操作按钮 */
  left?: ReactNode;
  /** Right slot: search/filter controls / 右侧插槽：搜索/筛选控件 */
  right?: ReactNode;
  /** Reverse the left/right layout / 反转布局 */
  reverse?: boolean;
  /** Additional className for the outer container / 外层容器额外类名 */
  className?: string;
}

/**
 * BuiToolbar - Standard list page toolbar / 标准列表页工具栏
 *
 * @example
 * <BuiToolbar
 *   left={<Button>新建</Button>}
 *   right={<><SearchField /><Select /></>}
 * />
 * <BuiToolbar reverse left={<SearchField />} right={<Button>新建</Button>} />
 */
const BuiToolbar = ({
  left,
  right,
  reverse = false,
  className = "",
}: BuiToolbarProps) => {
  const first = reverse ? right : left;
  const second = reverse ? left : right;

  return (
    <div
      className={
        "mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3 " +
        className
      }
    >
      {/* First group: default = actions (left) / 第一组：默认左操作 */}
      {first && <div className="flex items-end gap-3">{first}</div>}
      {/* Second group: default = filters (right) / 第二组：默认右筛选 */}
      {second && <div className="flex items-end gap-3">{second}</div>}
    </div>
  );
};

export { BuiToolbar };
