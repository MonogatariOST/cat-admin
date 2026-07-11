"use client";

import { useState, useMemo } from "react";
import type { Key } from "@heroui/react";
import { BuiPage, BuiTable } from "../../components/baseui"
import { useSetPageTitle } from "../../stores"
import type { BuiTableColumn } from "../../components/baseui";
import {
  Card, Chip, SearchField, Pagination, Button, Select, Label, ListBox
} from "@heroui/react";
import { Eye } from "lucide-react";
import { teachersApi } from "../../api/teachers";

const STATUS_LABEL: Record<string, string> = { active: "在职", inactive: "离职" };
const STATUS_COLOR: Record<string, "success" | "default" | "warning"> = { active: "success", inactive: "default" };

const TeachersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState<Key | null>(null);
  const [statusFilter, setStatusFilter] = useState<Key | null>(null);
    useSetPageTitle("教师管理", "管理所有教师信息");
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const teachers = useMemo(() => teachersApi.getAllSync(), []);
  const departments = useMemo(() => [...new Set(teachers.map((t) => t.department))], [teachers]);

  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      if (searchQuery.trim()) { const q = searchQuery.toLowerCase(); if (!t.name.includes(q) && !t.email.includes(q) && !t.department.includes(q)) return false; }
      if (deptFilter !== null && t.department !== deptFilter) return false;
      if (statusFilter !== null && t.status !== statusFilter) return false;
      return true;
    });
  }, [teachers, searchQuery, deptFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = useMemo(() => filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE), [page, filtered, ROWS_PER_PAGE]);
  const pageStart = (page - 1) * ROWS_PER_PAGE + 1;
  const pageEnd = Math.min(page * ROWS_PER_PAGE, filtered.length);
  const activeCount = useMemo(() => teachers.filter((t) => t.status === "active").length, [teachers]);
  const handleSearchChange = (v: string) => { setSearchQuery(v); setPage(1); };


  const footer = <Pagination size="sm"><Pagination.Summary>{"第 " + pageStart + "-" + pageEnd + " 条，共 " + filtered.length + " 条"}</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous isDisabled={page === 1} onPress={() => setPage(Math.max(1, page - 1))}><Pagination.PreviousIcon /> Prev</Pagination.Previous></Pagination.Item>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(Math.min(totalPages, page + 1))}>Next <Pagination.NextIcon /></Pagination.Next></Pagination.Item></Pagination.Content></Pagination>;

  const columns: BuiTableColumn<typeof paginated[0]>[] = [{ key: "name", title: "姓名", isRowHeader: true },{ key: "employeeId", title: "工号" },{ key: "department", title: "部门" },{ key: "title", title: "职称" },{ key: "courses", title: "课程数" },{ key: "status", title: "状态", render: (t) => <Chip size="sm" variant="soft" color={STATUS_COLOR[t.status] || "default"}>{STATUS_LABEL[t.status] || t.status}</Chip> },{ key: "actions", title: "操作", render: (t) => <Button size="sm" variant="ghost" isIconOnly aria-label={"查看" + t.name}><Eye size={16} /></Button> }];

  return (
    <BuiPage
      className="h-full"
      contentClassName="flex min-h-0 flex-1 flex-col"
    >
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3 shrink-0">
        {[
          { label: "老师总数", value: String(teachers.length) },
          { label: "在职", value: String(activeCount) },
          { label: "已筛选", value: String(filtered.length) },
        ].map((s) => (
          <Card key={s.label} className="p-4"><Card.Content><p className="text-sm text-foreground-500">{s.label}</p><p className="mt-1 text-2xl font-semibold text-foreground">{s.value}</p></Card.Content></Card>
        ))}
      </div>
      <div className="mb-4 flex shrink-0 flex-wrap items-end gap-3">
        <SearchField aria-label="搜索老师" value={searchQuery} onChange={handleSearchChange}>
          <SearchField.Group><SearchField.SearchIcon /><SearchField.Input className="w-[200px]" placeholder="搜索姓名、邮箱或院系..." /><SearchField.ClearButton /></SearchField.Group>
        </SearchField>
        <Select className="w-40" aria-label="院系" placeholder="全部院系" value={deptFilter} onChange={(k) => { setDeptFilter(k); setPage(1); }}>
          <Label>院系</Label><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
          <Select.Popover><ListBox>{departments.map((d) => <ListBox.Item key={d} id={d} textValue={d}>{d}<ListBox.ItemIndicator /></ListBox.Item>)}</ListBox></Select.Popover>
        </Select>
        <Select className="w-[140px]" aria-label="状态" placeholder="全部状态" value={statusFilter} onChange={(k) => { setStatusFilter(k); setPage(1); }}>
          <Label>状态</Label><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
          <Select.Popover><ListBox><ListBox.Item key="active" id="active" textValue="在职">在职<ListBox.ItemIndicator /></ListBox.Item><ListBox.Item key="inactive" id="inactive" textValue="离职">离职<ListBox.ItemIndicator /></ListBox.Item></ListBox></Select.Popover>
        </Select>
      </div>
      <BuiTable
        data={paginated}
        columns={columns}
        getRowId={(p) => p.id}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        footer={footer}
      />
    </BuiPage>
  );
};

export function Component() { return <TeachersList />; }
