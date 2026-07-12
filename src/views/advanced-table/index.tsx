import { useState, useMemo } from "react";
import { BuiPage, BuiTable, BuiToolbar } from "../../components/baseui";
import type { BuiTableColumn, BuiTableSortDescriptor } from "../../components/baseui";
import { useSetPageTitle } from "../../stores";
import { Chip, SearchField, Pagination, Modal, Input, TextField, Button, Label } from "@heroui/react";
import { Filter, Eye, EyeOff, Plus } from "lucide-react";
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

const statusColor: Record<string, "success" | "warning" | "default"> = { completed: "success", processing: "warning", pending: "default", cancelled: "default", refunded: "default" };
const statusLabel: Record<string, string> = { completed: "已完成", processing: "处理中", pending: "待处理", cancelled: "已取消", refunded: "已退款" };

/** 列名标签映射 / Column label lookup */
const COLUMN_LABEL: Record<string, string> = {
  amount: "金额",
  id: "订单号",
  product: "商品",
  customer: "客户",
  status: "状态",
  date: "日期",
  payment: "支付",
};

type SortKey = "id" | "product" | "customer" | "amount" | "status" | "date";
type SortDir = "asc" | "desc";

const AdvancedTableDemo = () => {
  useSetPageTitle("高级表格", "排序、筛选、导出、列显隐");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
 const [modalOpen, setModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: true, product: true, customer: true, amount: true, status: true, date: true,
  });
  const ROWS = 10;

  const toggleColumn = (key: string) => setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));

  const processed = useMemo(() => {
    let data = [...MOCK_ORDERS];
    if (search.trim()) { const q = search.toLowerCase(); data = data.filter(o => o.product.includes(q) || o.customer.includes(q) || o.id.includes(q)); }
    data.sort((a, b) => {
      let cmp: number;
      switch (sortKey) {
        case "amount": cmp = a.amount - b.amount; break;
        case "status": cmp = (statusLabel[a.status] || a.status).localeCompare(statusLabel[b.status] || b.status); break;
        default: cmp = String(a[sortKey] || "").localeCompare(String(b[sortKey] || ""));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [search, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / ROWS);
  const paginated = processed.slice((page - 1) * ROWS, page * ROWS);
  const totalAmount = processed.reduce((s, o) => s + o.amount, 0);

  const exportHeaders = ["订单号", "商品", "客户", "金额", "状态", "日期", "支付"];
  const exportRows = processed.map(o => [o.id, o.product, o.customer, "¥" + String(o.amount), statusLabel[o.status], o.date, o.payment]);

const columns = useMemo((): BuiTableColumn<Order>[] => [
    { key: "id", title: "订单号", isRowHeader: true, hidden: !visibleColumns.id, allowsSorting: true },
    { key: "product", title: "商品", hidden: !visibleColumns.product, allowsSorting: true },
    { key: "customer", title: "客户", hidden: !visibleColumns.customer, allowsSorting: true },
    { key: "amount", title: "金额", render: (o) => <span className="font-semibold text-foreground">{"¥" + o.amount.toLocaleString()}</span>, hidden: !visibleColumns.amount, allowsSorting: true },
    { key: "status", title: "状态", render: (o) => <Chip size="sm" variant="soft" color={statusColor[o.status]}>{statusLabel[o.status]}</Chip>, hidden: !visibleColumns.status, allowsSorting: true },
    { key: "date", title: "日期", hidden: !visibleColumns.date, allowsSorting: true },
  ], [visibleColumns]);

  const sortDescriptor = useMemo((): BuiTableSortDescriptor => ({
    column: sortKey,
    direction: sortDir === "asc" ? "ascending" : "descending",
  }), [sortKey, sortDir]);

  const handleSortChange = (desc: BuiTableSortDescriptor) => {
    setSortKey(desc.column as SortKey);
    setSortDir(desc.direction === "ascending" ? "asc" : "desc");
  };

  const pageStart = (page - 1) * ROWS + 1;
  const pageEnd = Math.min(page * ROWS, processed.length);

  const footer = <Pagination size="sm"><Pagination.Summary>{"第" + pageStart + "-" + pageEnd + " 条 / 共" + processed.length + " 条 / 总计 ¥" + totalAmount.toLocaleString()}</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous isDisabled={page === 1} onPress={() => setPage(Math.max(1, page - 1))}>上一页</Pagination.Previous></Pagination.Item>{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(Math.min(totalPages, page + 1))}>下一页</Pagination.Next></Pagination.Item></Pagination.Content></Pagination>;

  const openCreate = () => setModalOpen(true);
  const handleCreate = () => setModalOpen(false);

  return (<BuiPage className="h-full" contentClassName="flex min-h-0 flex-1 flex-col">
    <BuiToolbar
left={<>
<Button size="sm" variant="secondary" onPress={openCreate}><Plus size={16} />新建订单</Button>
<SuiDataExport headers={exportHeaders} rows={exportRows} filename={"orders-" + new Date().toISOString().split("T")[0]} label="导出数据" />
</>}
right={<>
<SearchField aria-label="搜索订单" value={search} onChange={(v) => { setSearch(v); setPage(1); }}><SearchField.Group><SearchField.SearchIcon /><SearchField.Input className="w-60" placeholder="搜索订单/商品/客户..." /><SearchField.ClearButton /></SearchField.Group></SearchField>
</>}
/>
    
    <div className="flex flex-wrap gap-1 ml-auto">{Object.keys(visibleColumns).map(k => <span key={k} onClick={() => toggleColumn(k)} className={"inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-all " + (visibleColumns[k] ? "bg-accent text-accent-foreground" : "bg-surface-tertiary text-foreground-500 hover:text-foreground")}>{visibleColumns[k] ? <Eye size={12} /> : <EyeOff size={12} />}{COLUMN_LABEL[k] || k}</span>)}</div>
    <div className="mb-2 flex items-center gap-2 text-xs text-foreground-400">
      <Filter size={14} />{"点击列标题切换排序 | 当前排序: " + (COLUMN_LABEL[sortKey] || sortKey) + " (" + (sortDir === "asc" ? "升序" : "降序") + ")"}
    </div>
<BuiTable data={paginated} columns={columns} getRowId={(o) => o.id} selectionMode="multiple" footer={footer} sortDescriptor={sortDescriptor} onSortChange={handleSortChange} />
    <Modal.Backdrop isOpen={modalOpen} onOpenChange={setModalOpen}><Modal.Container placement="auto"><Modal.Dialog aria-label="新建订单" className="sm:max-w-lg"><Modal.CloseTrigger /><Modal.Header><Modal.Heading>新建订单</Modal.Heading></Modal.Header><Modal.Body><div className="flex flex-col gap-4">
      <TextField className="w-full"><Label>名称</Label><Input placeholder="输入名称" /></TextField>
      <TextField className="w-full"><Label>描述</Label><Input placeholder="输入描述" /></TextField>
    </div></Modal.Body><Modal.Footer><Button slot="close" variant="secondary">取消</Button><Button onPress={handleCreate}>保存</Button></Modal.Footer></Modal.Dialog></Modal.Container></Modal.Backdrop>
  </BuiPage>);
};

export function Component() { return <AdvancedTableDemo />; }
