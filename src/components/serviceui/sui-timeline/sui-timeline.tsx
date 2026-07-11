/**
 * SuiTimeline - Activity timeline component / 活动时间线组件
 */
import type { ReactNode } from "react";

export interface TimelineItem {
  id: string;
  icon?: ReactNode;
  title: string;
  description?: string;
  timestamp: string;
  color?: "accent" | "success" | "warning" | "danger" | "default";
}

export interface SuiTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const colorMap = {
  accent: "bg-accent ring-accent/20",
  success: "bg-success ring-success/20",
  warning: "bg-warning ring-warning/20",
  danger: "bg-danger ring-danger/20",
  default: "bg-foreground-300 ring-foreground-300/20",
};

export const SuiTimeline = ({ items, className = "" }: SuiTimelineProps) => (
  <div className={"relative " + className}>
    {items.length === 0 ? (
      <p className="py-8 text-center text-sm text-foreground-400">{"暂无活动记录"}</p>
    ) : (
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Timeline line */}
            {i < items.length - 1 && <div className="absolute left-[15px] top-7 h-full w-px bg-border" />}
            {/* Icon / Dot */}
            <div className={"relative z-10 flex size-[30px] shrink-0 items-center justify-center rounded-full ring-4 " + (colorMap[item.color || "default"])}>
              {item.icon || <div className="size-2 rounded-full bg-white" />}
            </div>
            {/* Content */}
            <div className="flex-1 pt-0.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <span className="shrink-0 text-xs text-foreground-400">{item.timestamp}</span>
              </div>
              {item.description && <p className="mt-0.5 text-xs text-foreground-500">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
