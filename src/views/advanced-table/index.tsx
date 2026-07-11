import { useState, useMemo } from "react";
import { BuiPage, BuiTable } from "../../components/baseui";
import type { BuiTableColumn } from "../../components/baseui";
import { useSetPageTitle } from "../../stores";
import { Chip, Select, ListBox, SearchField, Pagination } from "@heroui/react";
import type { Key } from "@heroui/react";
import { Filter, Eye, EyeOff } from "lucide-react";
import { SuiDataExport } from "../../components/serviceui";

interface Order {
  id: string; product: string; customer: string; amount: number; status: string; date: string; payment: string;
}

const MOCK_ORDERS: Order[] = [
  { id: "ORD-001", product: "MacBook Pro 14", customer: "张三", amount: 14999, status: "completed", date: "2026-07-01", payment: "支付宝" },
  { id: "ORD-002", product: "iPhone 15 Pro", customer: "李四", amount: 8999, status: "processing", date: "2026-07-02", payment: "微信" },
  { id: "ORD-003", product: "AirPods Pro", customer: "王五", amount: 1999, status: "pending", date: "2026-07-03", payment: "银行卡" },
  { id: "ORD-004", product: "iPad Air", customer: "赵六", amount: 5999, status: "completed", date: "2026-07-04", payment: "支付宝" },
  { id: "ORD-005", product: "Apple Watch", customer: "钱七", amount: 3299, status: "cancelled", date: "2026-07-05", payment: "微信" },
  { id: "ORD-006", product: "iMac 24", customer: "孙八", amount: 10999, status: "processing", date: "2026-07-06", payment: "银行卡" },
  { id: "ORD-007", product: "Mac Mini", customer: "周九", amount: 4999, status: "completed", date: "2026-07-07", payment: "支付宝" },
  { id: "ORD-008", product: "Studio Display", customer: "吴十", amount: 11499, status: "pending", date: "2026-07-08", payment: "微信" },
  { id: "ORD-009", product: "Magic Keyboard", customer: "郑一", amount: 1049, status: "completed", date: "2026-07-09", payment: "银行卡" },
  { id: "ORD-010", product: "MacBook Air", customer: "陈二", amount: 9499, status: "processing", date: "2026-07-10", payment: "支付宝" },
  { id: "ORD-011", product: "AirPods Max", customer: "林三", amount: 4399, status: "completed", date: "2026-07-11", payment: "微信" },
  { id: "ORD-012", product: "HomePod mini", customer: "黄四", amount: 749, status: "completed", date: "2026-07-12", payment: "支付宝" },
];

type SortKey = "id" | "product" | "customer" | "amount" | "date";
type SortDir = "asc" | "desc";

const statusColor: Record<string, "success" | "warning" | "danger" | "accent"> = {
  completed: "success", processing: "accent", pending: "warning", cancelled: "danger",
};
const statusLabel: Record<string, string> = {
  completed: "已完成", processing: "处理中", pending: "待处理", cancelled: "已取消",
};

const AdvancedTableDemo = () => {
  useSetPageTitle("高级表格", "排序、筛选、导出、列显隐");
  const [search, setSearch] = useState("");
  const [sortKey] = useState<SortKey>("id");
  const [sortDir] = useState<SortDir>("asc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const ROWS = 8;
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: true, product: true, customer: true, amount: true, status: true, date: true, payment: true,
  });

  const toggleColumn = (key: string) => setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));


  const processed = useMemo(() => {
    let data = [...MOCK_ORDERS];
    if (search.trim()) { const q = search.toLowerCase(); data = data.filter(o => o.product.includes(q) || o.customer.includes(q) || o.id.includes(q)); }
    if (statusFilter !== "all") data = data.filter(o => o.status === statusFilter);
    data.sort((a, b) => { const va = a[sortKey]; const vb = b[sortKey]; if (typeof va === "number" && typeof vb === "number") return sortDir === "asc" ? va - vb : vb - va; return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va)); });
    return data;
  }, [search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / ROWS);
  const paginated = processed.slice((page - 1) * ROWS, page * ROWS);
  const pageStart = (page - 1) * ROWS + 1;
  const pageEnd = Math.min(page * ROWS, processed.length);
  const totalAmount = useMemo(() => processed.reduce((s, o) => s + o.amount, 0), [processed]);

  const columns: BuiTableColumn<Order>[] = [
    { key: "id", title: "订单号", isRowHeader: true,  },
    { key: "product", title: "商品",  },
    { key: "customer", title: "客户",  },
    { key: "amount", title: "金额", render: (o) => <span className="font-semibold text-foreground">{"¥" + o.amount.toLocaleString()}</span>,  },
    { key: "status", title: "状态", render: (o) => <Chip size="sm" variant="soft" color={statusColor[o.status]}>{statusLabel[o.status]}</Chip>,  },
    { key: "date", title: "日期",  },
    { key: "payment", title: "支付方式",  },
  ];

  const exportHeaders = ["订单号", "商品", "客户", "金额", "状态", "日期", "支付方式"];
  const exportRows = processed.map(o => [o.id, o.product, o.customer, "¥" + o.amount.toLocaleString(), statusLabel[o.status], o.date, o.payment]);

  const footer = <Pagination size="sm"><Pagination.Summary>{"第 " + pageStart + "-" + pageEnd + " 条 / 共 " + processed.length + " 条 / 总额 ¥" + totalAmount.toLocaleString()}</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous isDisabled={page === 1} onPress={() => setPage(Math.max(1, page - 1))}>上一页</Pagination.Previous></Pagination.Item>{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(Math.min(totalPages, page + 1))}>下一页</Pagination.Next></Pagination.Item></Pagination.Content></Pagination>;

  return (<BuiPage className="h-full" contentClassName="flex min-h-0 flex-1 flex-col">
    <div className="mb-4 flex shrink-0 flex-wrap items-end gap-3">
      <SearchField aria-label="搜索订单" value={search} onChange={(v) => { setSearch(v); setPage(1); }}><SearchField.Group><SearchField.SearchIcon /><SearchField.Input className="w-[200px]" placeholder="搜索订单/商品/客户..." /><SearchField.ClearButton /></SearchField.Group></SearchField>
      <Select aria-label="状态筛选" className="w-36" value={statusFilter} onChange={(value) => { setStatusFilter(value as string); setPage(1); }}><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger><Select.Popover><ListBox><ListBox.Item id="all" textValue="全部">{"全部状态"}</ListBox.Item>{Object.entries(statusLabel).map(([k, v]) => <ListBox.Item key={k} id={k} textValue={v}>{v}</ListBox.Item>)}</ListBox></Select.Popover></Select>
      <SuiDataExport headers={exportHeaders} rows={exportRows} filename={"orders-" + new Date().toISOString().split("T")[0]} label="导出数据" />
      {/* Column visibility toggles */}
      <div className="flex flex-wrap gap-1 ml-auto">{Object.keys(visibleColumns).map(k => <span key={k} onClick={() => toggleColumn(k)} className={"inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-all " + (visibleColumns[k] ? "bg-accent text-accent-foreground" : "bg-surface-tertiary text-foreground-500 hover:text-foreground")}>{visibleColumns[k] ? <Eye size={12} /> : <EyeOff size={12} />}{k === "amount" ? "金额" : k === "id" ? "订单号" : k === "product" ? "商品" : k === "customer" ? "客户" : k === "status" ? "状态" : k === "date" ? "日期" : "支付"}</span>)}</div>
    </div>
    <div className="mb-2 flex items-center gap-2 text-xs text-foreground-400">
      <Filter size={14} />{"点击列标题切换排序 | 当前排序: " + (sortKey === "amount" ? "金额" : sortKey) + " (" + (sortDir === "asc" ? "升序" : "降序") + ")"}
    </div>
    <BuiTable
        data={paginated}
        columns={columns}
        getRowId={(o) => o.id}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        footer={footer}
      />
  </BuiPage>);
};
export function Component() { return <AdvancedTableDemo />; }
