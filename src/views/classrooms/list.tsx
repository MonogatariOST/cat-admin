"use client";

import { useState, useMemo } from "react";
import type { Key } from "@heroui/react";
import { BuiPage, BuiTable, BuiToolbar } from "../../components/baseui"
import { useSetPageTitle } from "../../stores"
import type { BuiTableColumn } from "../../components/baseui";
import {
  Card, Chip, SearchField, Pagination, Button, Select, Label, ListBox, Modal, Input, TextField
} from "@heroui/react";
import { Check, X, Eye, Plus } from "lucide-react";
import { classroomsApi } from "../../api/classrooms";

const STATUS_LABEL: Record<string, string> = { available: "可用", maintenance: "维护中" };
const STATUS_COLOR: Record<string, "success" | "default" | "warning"> = { available: "success", maintenance: "warning" };
const STATUS_KEYS = Object.keys(STATUS_LABEL);

const ClassroomsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [buildingFilter, setBuildingFilter] = useState<Key | null>(null);
  const [statusFilter, setStatusFilter] = useState<Key | null>(null);
    useSetPageTitle("教室管理", "管理所有教室资源");
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const ROWS_PER_PAGE = 10;

  const [rooms, setRooms] = useState(() => classroomsApi.getAllSync());
  const buildings = useMemo(() => [...new Set(rooms.map((r) => r.building))], [rooms]);

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      if (searchQuery.trim()) { const q = searchQuery.toLowerCase(); if (!r.name.includes(q) && !r.building.includes(q)) return false; }
      if (buildingFilter !== null && r.building !== buildingFilter) return false;
      if (statusFilter !== null && r.status !== statusFilter) return false;
      return true;
    });
  }, [rooms, searchQuery, buildingFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = useMemo(() => filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE), [page, filtered, ROWS_PER_PAGE]);
  const pageStart = (page - 1) * ROWS_PER_PAGE + 1;
  const pageEnd = Math.min(page * ROWS_PER_PAGE, filtered.length);
  const availableCount = useMemo(() => rooms.filter((r) => r.status === "available").length, [rooms]);
  const handleSearchChange = (v: string) => { setSearchQuery(v); setPage(1); };

  const footer = <Pagination size="sm"><Pagination.Summary>{"第 " + pageStart + "-" + pageEnd + " 条，共 " + filtered.length + " 条"}</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous isDisabled={page === 1} onPress={() => setPage(Math.max(1, page - 1))}>上一页</Pagination.Previous></Pagination.Item>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(Math.min(totalPages, page + 1))}>下一页</Pagination.Next></Pagination.Item></Pagination.Content></Pagination>;

  const columns: BuiTableColumn<typeof paginated[0]>[] = [{ key: "name", title: "名称", isRowHeader: true },{ key: "building", title: "所在楼栋" },{ key: "floor", title: "楼层", render: (r) => r.floor + "F" },{ key: "capacity", title: "容量", render: (r) => r.capacity + "人" },{ key: "hasProjector", title: "投影", render: (r) => r.hasProjector ? <Check size={16} className="text-success" /> : <X size={16} className="text-danger" /> },{ key: "hasAirConditioning", title: "空调", render: (r) => r.hasAirConditioning ? <Check size={16} className="text-success" /> : <X size={16} className="text-danger" /> },{ key: "status", title: "状态", render: (r) => <Chip size="sm" variant="soft" color={STATUS_COLOR[r.status] || "default"}>{STATUS_LABEL[r.status] || r.status}</Chip> },{ key: "actions", title: "操作", render: (r) => <Button size="sm" variant="ghost" isIconOnly aria-label={"查看" + r.name}><Eye size={16} /></Button> }];

  const openCreate = () => setModalOpen(true);
  const handleCreate = () => {
    setModalOpen(false);
    classroomsApi.create();
    setRooms([...classroomsApi.getAllSync()]);
  };

  return (
    <BuiPage
      className="h-full"
      contentClassName="flex min-h-0 flex-1 flex-col"
    >
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3 shrink-0">
        {[
          { label: "教室总数", value: String(rooms.length) },
          { label: "可用", value: String(availableCount) },
          { label: "已筛选", value: String(filtered.length) },
        ].map((s) => (
          <Card key={s.label} className="p-4"><Card.Content><p className="text-sm text-foreground-500">{s.label}</p><p className="mt-1 text-2xl font-semibold text-foreground">{s.value}</p></Card.Content></Card>
        ))}
      </div>
      <BuiToolbar
  left={<Button size="sm" variant="secondary" onPress={openCreate}><Plus size={16} />新建教室</Button>}
  right={<>
        <SearchField aria-label="搜索教室" value={searchQuery} onChange={handleSearchChange}>
          <SearchField.Group><SearchField.SearchIcon /><SearchField.Input className="w-60" placeholder="搜索教室名称或所在楼栋..." /><SearchField.ClearButton /></SearchField.Group>
        </SearchField>
        <Select className="w-40" aria-label="楼栋" placeholder="全部楼栋" value={buildingFilter} onChange={(k) => { setBuildingFilter(k); setPage(1); }}>
          <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
          <Select.Popover><ListBox>{buildings.map((b) => <ListBox.Item key={b} id={b} textValue={b}>{b}<ListBox.ItemIndicator /></ListBox.Item>)}</ListBox></Select.Popover>
        </Select>
        <Select className="w-[140px]" aria-label="状态" placeholder="全部状态" value={statusFilter} onChange={(k) => { setStatusFilter(k); setPage(1); }}>
          <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
          <Select.Popover><ListBox>{STATUS_KEYS.map((k) => <ListBox.Item key={k} id={k} textValue={STATUS_LABEL[k]}>{STATUS_LABEL[k]}<ListBox.ItemIndicator /></ListBox.Item>)}</ListBox></Select.Popover>
        </Select>
      </>}
/>
      <BuiTable
        data={paginated}
        columns={columns}
        getRowId={(p) => p.id}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        footer={footer}
      />
    
      {/* Create modal / 新建弹窗 */}
      <Modal.Backdrop isOpen={modalOpen} onOpenChange={setModalOpen}><Modal.Container placement="auto"><Modal.Dialog aria-label="新建教室" className="sm:max-w-lg"><Modal.CloseTrigger /><Modal.Header><Modal.Heading>新建教室</Modal.Heading></Modal.Header><Modal.Body><div className="flex flex-col gap-4">
              <TextField className="w-full"><Label>教室名称</Label><Input /></TextField>
              <TextField className="w-full"><Label>楼栋</Label><Input /></TextField>
              <TextField className="w-full"><Label>楼层</Label><Input type="number" /></TextField>
              <TextField className="w-full"><Label>容量</Label><Input type="number" /></TextField>
      </div></Modal.Body><Modal.Footer><Button slot="close" variant="secondary">取消</Button><Button onPress={handleCreate}>保存</Button></Modal.Footer></Modal.Dialog></Modal.Container></Modal.Backdrop>
</BuiPage>
  );
};

export function Component() { return <ClassroomsList />; }
