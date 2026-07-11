import { useState } from "react";
import { BuiPage } from "../../components/baseui";
import { useSetPageTitle } from "../../stores";
import { Select, ListBox, Chip, SearchField } from "@heroui/react";
import { SuiTimeline } from "../../components/serviceui";
import type { TimelineItem } from "../../components/serviceui";
import type { ActivityEntry } from "../../api/activity/types";
import { LogIn, LogOut, Plus, Pencil, Trash2, RefreshCw, AlertCircle } from "lucide-react";

const typeIcons: Record<string, typeof LogIn> = { login: LogIn, logout: LogOut, create: Plus, update: Pencil, delete: Trash2, other: AlertCircle };
const typeColors: Record<string, "accent" | "success" | "warning" | "danger" | "default"> = {
  login: "accent", logout: "default", create: "success", update: "accent", delete: "danger", other: "warning",
};

const AuditLog = () => {
  useSetPageTitle("审计日志", "系统操作记录与活动追踪");
  const [activities] = useState<ActivityEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = activities.filter(a => {
    if (filter !== "all" && a.type !== filter) return false;
    if (search.trim() && !a.description.includes(search) && !a.operator.includes(search)) return false;
    return true;
  });

  const timelineItems: TimelineItem[] = filtered.map(a => ({
    id: a.id,
    icon: (() => { const Icon = typeIcons[a.type] || AlertCircle; return <Icon size={14} className="text-white" />; })(),
    title: a.action,
    description: a.description + " — " + a.module,
    timestamp: a.timestamp,
    color: typeColors[a.type] || "default",
  }));

  return (<BuiPage className="h-full" contentClassName="flex min-h-0 flex-1 flex-col">
    <div className="mb-4 flex shrink-0 flex-wrap items-end gap-3">
      <Select aria-label="类型筛选" className="w-36" value={filter} onChange={(value) => setFilter(value as string)}>
        <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
        <Select.Popover><ListBox>
          <ListBox.Item id="all" textValue="全部">{"全部类型"}</ListBox.Item>
          <ListBox.Item id="create" textValue="创建"><Chip size="sm" variant="soft" color="success">{"创建"}</Chip></ListBox.Item>
          <ListBox.Item id="update" textValue="更新"><Chip size="sm" variant="soft" color="accent">{"更新"}</Chip></ListBox.Item>
          <ListBox.Item id="delete" textValue="删除"><Chip size="sm" variant="soft" color="danger">{"删除"}</Chip></ListBox.Item>
          <ListBox.Item id="login" textValue="登录"><Chip size="sm" variant="soft" color="accent">{"登录"}</Chip></ListBox.Item>
          <ListBox.Item id="logout" textValue="退出"><Chip size="sm" variant="soft" color="default">{"退出"}</Chip></ListBox.Item>
        </ListBox></Select.Popover>
      </Select>
      <SearchField aria-label="搜索日志" value={search} onChange={setSearch}>
        <SearchField.Group><SearchField.SearchIcon /><SearchField.Input className="w-60" placeholder="搜索操作描述或操作人..." /><SearchField.ClearButton /></SearchField.Group>
      </SearchField>
      <div className="ml-auto flex items-center gap-2 text-xs text-foreground-400"><RefreshCw size={14} />{"共 " + filtered.length + " 条记录"}</div>
    </div>
    <div className="flex-1 overflow-y-auto rounded-xl bg-surface p-6">
      <SuiTimeline items={timelineItems} />
    </div>
  </BuiPage>);
};
export function Component() { return <AuditLog />; }
