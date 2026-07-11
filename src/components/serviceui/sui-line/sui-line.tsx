/**
 * SuiLine - Custom separator/divider component supporting horizontal and vertical orientations.
 * HeroUI's built-in Separator only supports horizontal, so SuiLine fills the gap for vertical dividers.
 * / 自定义分隔线组件，支持水平和垂直方向。HeroUI 的 Separator 仅支持水平，SuiLine 补充垂直分隔场景。
 */


interface SuiLineProps {
  /** Orientation of the line / 分隔线方向 */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS classes / 附加 CSS 类名 */
  className?: string;
}

/**
 * SuiLine - A thin visual separator for layout use / 用于布局的细线分隔组件
 *
 * @example
 * <SuiLine /> // horizontal separator (full width)
 * <SuiLine orientation="vertical" /> // vertical separator (full height)
 */
const SuiLine = ({ orientation = "horizontal", className = "" }: SuiLineProps) => {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`w-px self-stretch bg-border ${className}`}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`h-px bg-border ${className}`}
    />
  );
};

export { SuiLine };
export type { SuiLineProps };
