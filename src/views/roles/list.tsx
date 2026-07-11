"use client";
import { useState, useMemo } from "react";
import { BuiPage, BuiTable } from "../../components/baseui";
import { useSetPageTitle } from "../../stores"
import type { Key } from "@heroui/react"
import type { BuiTableColumn } from "../../components/baseui";
import type { Role } from "../../types/permission";
import {
  Card, Chip, SearchField, Pagination, Button
, Modal, Input, TextField, Label, AlertDialog } from "@heroui/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { rolesApi } from "../../api/roles";


const RolesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
    useSetPageTitle("角色管理", "管理用户角色及其权限分配");
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(/* @__PURE__ */new Set());
  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const roles = useMemo(() => rolesApi.getAllSync(), []);
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return roles;
    const q = searchQuery.toLowerCase();
    return roles.filter((r) => r.name.includes(q) || r.description.includes(q));
  }, [roles, searchQuery]);
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = useMemo(() => filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE), [page, filtered, ROWS_PER_PAGE]);
  const pageStart = (page - 1) * ROWS_PER_PAGE + 1;
  const pageEnd = Math.min(page * ROWS_PER_PAGE, filtered.length);
  const totalUsers = useMemo(() => roles.reduce((s, r) => s + r.userCount, 0), [roles]);
  // Form dialog state / 表单弹窗状态
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Role | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const openCreate = () => { setEditingItem(null); setFormData({ name: "", description: "" }); setModalOpen(true); };
  const openEdit = (item: Role) => { setEditingItem(item); setFormData({ name: item.name, description: item.description }); setModalOpen(true); };
  const confirmDelete = (item: Role) => { setDeleteTarget(item); };
  const handleDelete = () => { if (deleteTarget) { rolesApi.delete(deleteTarget.id); setDeleteTarget(null); } };
  const handleSave = () => {
    if (editingItem) { rolesApi.update(editingItem.id, formData); }
    else { rolesApi.create({ ...formData, permissions: [] as string[], userCount: 0 }); }
    setModalOpen(false);
  };
  const handleSearchChange = (v: string) => { setSearchQuery(v); setPage(1); };


  const footer = <Pagination size="sm"><Pagination.Summary>{"第 " + pageStart + "-" + pageEnd + " 条，共 " + filtered.length + " 条"}</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous isDisabled={page === 1} onPress={() => setPage(Math.max(1, page - 1))}><Pagination.PreviousIcon /> Prev</Pagination.Previous></Pagination.Item>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(Math.min(totalPages, page + 1))}>Next <Pagination.NextIcon /></Pagination.Next></Pagination.Item></Pagination.Content></Pagination>;

  const columns: BuiTableColumn<typeof paginated[0]>[] = [{ key: "name", title: "角色名称", isRowHeader: true },{ key: "description", title: "描述" },{ key: "userCount", title: "用户数", render: (r) => <Chip size="sm" variant="soft" color={r.userCount > 0 ? "accent" : "default"}>{r.userCount + " 人"}</Chip> },{ key: "permissions", title: "权限", render: (r) => <div className="flex flex-wrap gap-1">{r.permissions.slice(0, 3).map((p) => <Chip key={p} size="sm" variant="soft">{p}</Chip>)}{r.permissions.length > 3 && <Chip size="sm" variant="soft" color="accent">{"+" + (r.permissions.length - 3)}</Chip>}</div> },{ key: "actions", title: "操作", render: (r) => <><Button size="sm" variant="ghost" isIconOnly aria-label={"编辑" + r.name} onPress={() => openEdit(r)}><Pencil size={16} /></Button><Button size="sm" variant="ghost" isIconOnly aria-label={"删除" + r.name} onPress={() => confirmDelete(r)}><Trash2 size={16} className="text-danger" /></Button></> }];

  return (
    <BuiPage
      className="h-full"
      contentClassName="flex min-h-0 flex-1 flex-col"
    >
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3 shrink-0">
        {[
          { label: "角色总数", value: String(roles.length) },
          { label: "涉及用户", value: String(totalUsers) },
          { label: "已筛选", value: String(filtered.length) },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <Card.Content>
              <p className="text-sm text-foreground-500">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{s.value}</p>
            </Card.Content>
          </Card>
        ))}
      </div>
      <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
    <div className="flex items-end gap-3">
    <Button size="sm" variant="secondary" onPress={() => openCreate()} ><Plus size={16} />新建角色</Button>
    </div>
    <div className="flex items-end gap-3">
    <SearchField aria-label="搜索角色" value={searchQuery} onChange={handleSearchChange}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-60" placeholder="搜索角色名称或描述..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
    </div>
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
    <Modal.Backdrop isOpen={modalOpen} onOpenChange={setModalOpen}><Modal.Container placement="auto"><Modal.Dialog aria-label={editingItem ? "编辑角色" : "新建角色"} className="sm:max-w-lg"><Modal.CloseTrigger /><Modal.Header><Modal.Heading>{editingItem ? "编辑角色" : "新建角色"}</Modal.Heading></Modal.Header><Modal.Body><div className="flex flex-col gap-4">
        <TextField className="w-full"><Label>角色名称</Label><Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="输入角色名称" /></TextField>
        <TextField className="w-full"><Label>描述</Label><Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="输入角色描述" /></TextField>
      </div></Modal.Body><Modal.Footer><Button slot="close" variant="secondary">取消</Button><Button onPress={handleSave}>保存</Button></Modal.Footer></Modal.Dialog></Modal.Container></Modal.Backdrop>
      <AlertDialog.Backdrop isOpen={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}><AlertDialog.Container><AlertDialog.Dialog className="sm:max-w-[400px]"><AlertDialog.CloseTrigger /><AlertDialog.Header><AlertDialog.Icon status="danger" /><AlertDialog.Heading>确认删除</AlertDialog.Heading></AlertDialog.Header><AlertDialog.Body><p>确定要删除角色 "{deleteTarget?.name}" 吗？此操作不可撤销。</p></AlertDialog.Body><AlertDialog.Footer><Button slot="close" variant="tertiary">取消</Button><Button slot="close" variant="danger" onPress={handleDelete}>删除</Button></AlertDialog.Footer></AlertDialog.Dialog></AlertDialog.Container></AlertDialog.Backdrop>
    </BuiPage>
  );
};

export function Component() { return <RolesList />; }
