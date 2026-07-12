"use client";

import { useState, useMemo } from "react";
import type { Key } from "@heroui/react";
import { BuiPage, BuiTable, BuiToolbar } from "../../components/baseui"
import { useSetPageTitle } from "../../stores"
import type { BuiTableColumn } from "../../components/baseui";
import {
  Card, Chip, SearchField, Pagination, Button, Select, Label, ListBox, Modal, Input, TextField
} from "@heroui/react";
import { Eye, Plus } from "lucide-react";
import { classesApi } from "../../api/classes";

const STATUS_LABEL: Record<string, string> = { active: "在读", graduated: "已毕业" };
const STATUS_COLOR: Record<string, "success" | "default" | "warning"> = { active: "success", graduated: "default" };
const STATUS_KEYS = Object.keys(STATUS_LABEL);

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Key | null>(null);
  const [statusFilter, setStatusFilter] = useState<Key | null>(null);
    useSetPageTitle("班级管理", "管理所有班级信息");
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const ROWS_PER_PAGE = 10;

  const [classes, setClasses] = useState(() => classesApi.getAllSync());
  const grades = useMemo(() => [...new Set(classes.map((c) => c.grade))].sort(), [classes]);

  const filtered = useMemo(() => {
    return classes.filter((c) => {
      if (searchQuery.trim()) { const q = searchQuery.toLowerCase(); if (!c.name.includes(q) && !c.grade.includes(q) && !c.major.includes(q)) return false; }
      if (gradeFilter !== null && c.grade !== gradeFilter) return false;
      if (statusFilter !== null && c.status !== statusFilter) return false;
      return true;
    });
  }, [classes, searchQuery, gradeFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = useMemo(() => filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE), [page, filtered, ROWS_PER_PAGE]);
  const pageStart = (page - 1) * ROWS_PER_PAGE + 1;
  const pageEnd = Math.min(page * ROWS_PER_PAGE, filtered.length);
  const activeCount = useMemo(() => classes.filter((c) => c.status === "active").length, [classes]);
  const handleSearchChange = (v: string) => { setSearchQuery(v); setPage(1); };

  const footer = <Pagination size="sm"><Pagination.Summary>{"第 " + pageStart + "-" + pageEnd + " 条，共 " + filtered.length + " 条"}</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous isDisabled={page === 1} onPress={() => setPage(Math.max(1, page - 1))}>上一页</Pagination.Previous></Pagination.Item>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(Math.min(totalPages, page + 1))}>下一页</Pagination.Next></Pagination.Item></Pagination.Content></Pagination>;

  const columns: BuiTableColumn<typeof paginated[0]>[] = [{ key: "name", title: "班级名称", isRowHeader: true },{ key: "grade", title: "年级" },{ key: "major", title: "专业" },{ key: "headTeacher", title: "班主任" },{ key: "studentCount", title: "学生数", render: (c) => c.studentCount + "人" },{ key: "status", title: "状态", render: (c) => <Chip size="sm" variant="soft" color={STATUS_COLOR[c.status] || "default"}>{STATUS_LABEL[c.status] || c.status}</Chip> },{ key: "actions", title: "操作", render: (c) => <Button size="sm" variant="ghost" isIconOnly aria-label={"查看" + c.name}><Eye size={16} /></Button> }];

  const openCreate = () => setModalOpen(true);
  const handleCreate = () => {
    setModalOpen(false);
    classesApi.create();
    setClasses([...classesApi.getAllSync()]);
  };

  return (
    <BuiPage
      className="h-full"
      contentClassName="flex min-h-0 flex-1 flex-col"
    >
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3 shrink-0">
        {[
          { label: "班级总数", value: String(classes.length) },
          { label: "在读", value: String(activeCount) },
          { label: "已筛选", value: String(filtered.length) },
        ].map((s) => (
          <Card key={s.label} className="p-4"><Card.Content><p className="text-sm text-foreground-500">{s.label}</p><p className="mt-1 text-2xl font-semibold text-foreground">{s.value}</p></Card.Content></Card>
        ))}
      </div>
      <BuiToolbar
  left={<Button size="sm" variant="secondary" onPress={openCreate}><Plus size={16} />新建班级</Button>}
  right={<>
        <SearchField aria-label="搜索班级" value={searchQuery} onChange={handleSearchChange}>
          <SearchField.Group><SearchField.SearchIcon /><SearchField.Input className="w-60" placeholder="搜索班级名称、年级或专业..." /><SearchField.ClearButton /></SearchField.Group>
        </SearchField>
        <Select className="w-[140px]" aria-label="年级" placeholder="全部年级" value={gradeFilter} onChange={(k) => { setGradeFilter(k); setPage(1); }}>
          <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
          <Select.Popover><ListBox>{grades.map((g) => <ListBox.Item key={g} id={g} textValue={g}>{g + "级"}<ListBox.ItemIndicator /></ListBox.Item>)}</ListBox></Select.Popover>
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
      <Modal.Backdrop isOpen={modalOpen} onOpenChange={setModalOpen}><Modal.Container placement="auto"><Modal.Dialog aria-label="新建班级" className="sm:max-w-lg"><Modal.CloseTrigger /><Modal.Header><Modal.Heading>新建班级</Modal.Heading></Modal.Header><Modal.Body><div className="flex flex-col gap-4">
              <TextField className="w-full"><Label>班级名称</Label><Input /></TextField>
              <TextField className="w-full"><Label>年级</Label><Input /></TextField>
              <TextField className="w-full"><Label>班主任</Label><Input /></TextField>
      </div></Modal.Body><Modal.Footer><Button slot="close" variant="secondary">取消</Button><Button onPress={handleCreate}>保存</Button></Modal.Footer></Modal.Dialog></Modal.Container></Modal.Backdrop>
</BuiPage>
  );
};

export function Component() { return <ClassesList />; }
