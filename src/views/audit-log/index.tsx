import { useState } from "react";
import { BuiPage, BuiToolbar } from "../../components/baseui";
import { useSetPageTitle } from "../../stores";
import { Select, ListBox, Chip, SearchField } from "@heroui/react";
import { SuiTimeline } from "../../components/serviceui";
import type { TimelineItem } from "../../components/serviceui";
import type { ActivityEntry } from "../../api/activity/types";
import { LogIn, LogOut, Plus, Pencil, Trash2, RefreshCw, AlertCircle } from "lucide-react";

const typeIcons: Record<string, typeof LogIn> = { login: LogIn, logout: LogOut, create: Plus, update: Pencil, delete: Trash2, other: AlertCircle };

const MOCK_ACTIVITIES: ActivityEntry[] = [
  { id: "ACT-001", type: "login", action: "用户登录", description: "用户 admin 登录系统", operator: "admin", module: "认证模块", timestamp: "2026-07-12 09:15:23" },
  { id: "ACT-002", type: "create", action: "新建订单", description: "创建订单 ORD-013（MacBook Air）", operator: "张三", module: "订单管理", timestamp: "2026-07-12 09:30:45" },
  { id: "ACT-003", type: "update", action: "更新订单", description: "修改订单 ORD-005 状态为「已取消」", operator: "李四", module: "订单管理", timestamp: "2026-07-12 09:42:11" },
  { id: "ACT-004", type: "logout", action: "用户登出", description: "用户 张三 退出系统", operator: "张三", module: "认证模块", timestamp: "2026-07-12 10:00:00" },
  { id: "ACT-005", type: "create", action: "新建用户", description: "创建新用户账号「王五」", operator: "admin", module: "用户管理", timestamp: "2026-07-12 10:15:33" },
  { id: "ACT-006", type: "delete", action: "删除商品", description: "删除商品「Magic Mouse」", operator: "赵六", module: "商品管理", timestamp: "2026-07-12 10:28:19" },
  { id: "ACT-007", type: "login", action: "用户登录", description: "用户 王五 初次登录系统", operator: "王五", module: "认证模块", timestamp: "2026-07-12 10:35:50" },
  { id: "ACT-008", type: "update", action: "修改权限", description: "为用户「王五」分配「商品管理」权限", operator: "admin", module: "权限管理", timestamp: "2026-07-12 10:45:02" },
  { id: "ACT-009", type: "create", action: "新建课程", description: "创建课程「React 高级实战」", operator: "孙八", module: "课程管理", timestamp: "2026-07-12 11:00:30" },
  { id: "ACT-010", type: "update", action: "更新公告", description: "修改系统公告「维护通知」内容", operator: "admin", module: "系统管理", timestamp: "2026-07-12 11:20:15" },
  { id: "ACT-011", type: "login", action: "用户登录", description: "用户 admin 登录系统", operator: "admin", module: "认证模块", timestamp: "2026-07-12 13:00:00" },
  { id: "ACT-012", type: "delete", action: "删除订单", description: "删除已取消订单 ORD-005", operator: "钱七", module: "订单管理", timestamp: "2026-07-12 13:15:44" },
  { id: "ACT-013", type: "other", action: "导出报表", description: "导出 2026-07 月度销售报表", operator: "张三", module: "报表中心", timestamp: "2026-07-12 14:00:22" },
  { id: "ACT-014", type: "logout", action: "用户登出", description: "用户 admin 退出系统", operator: "admin", module: "认证模块", timestamp: "2026-07-12 14:30:10" },
  { id: "ACT-015", type: "create", action: "新建教室", description: "创建教室「A-301」", operator: "周九", module: "教室管理", timestamp: "2026-07-12 15:00:00" },
];

const typeColors: Record<string, "accent" | "success" | "warning" | "danger" | "default"> = {
  login: "accent", logout: "default", create: "success", update: "accent", delete: "danger", other: "warning",
};

const AuditLog = () => {
  useSetPageTitle("审计日志", "系统操作记录与活动追踪");
  const [activities] = useState<ActivityEntry[]>(MOCK_ACTIVITIES);
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
<BuiToolbar
right={<>
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
      
</>}
/>
    <div className="mb-2 flex items-center gap-2 text-xs text-foreground-400"><RefreshCw size={14} />{"共 " + filtered.length + " 条记录"}</div>
    <div className="flex-1 overflow-y-auto rounded-xl bg-surface p-6">
      <SuiTimeline items={timelineItems} />
    </div>
    </BuiPage>);
};
export function Component() { return <AuditLog />; }
