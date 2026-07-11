/**
 * SuiEmptyState - Empty state placeholder / 空状态占位组件
 */
import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export interface SuiEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const SuiEmptyState = ({
  icon = <Inbox size={48} className="text-foreground-300" />,
  title, description, action, className = ""
}: SuiEmptyStateProps) => (
  <div className={"flex flex-col items-center justify-center py-16 text-center " + className}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-sm text-foreground-500">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);
