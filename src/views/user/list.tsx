/**
 * User List page / 用户列表页面
 * Displays users in a table with search, multi-select, filtering, permissions display, and pagination.
 * / 用户表格，支持搜索、多选、角色/状态筛选、权限展示和分页
 */

import { useState, useMemo } from "react";
import type { Key } from "@heroui/react";
import { Modal, Input, TextField, Label, AlertDialog } from "@heroui/react";
import { BuiPage, BuiTable } from "../../components/baseui"
import { useSetPageTitle } from "../../stores"
import type { BuiTableColumn } from "../../components/baseui";
import {
  Card,
  Button,
  Chip,
  SearchField,
  Pagination,
  ListBox,
  Select
} from "@heroui/react";
import { Plus, Pencil, Trash2 } from "lucide-react";

/** MockUser interface / 用户数据结构 */
interface MockUser { id: number; name: string; email: string; role: string; status: string; permissions: string[]; }

/** Mock user data with permissions / 含权限的模拟用户数据 */
let ALL_USERS = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
    permissions: ["user.read", "user.write", "admin"],
    status: "活跃"
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    role: "编辑",
    permissions: ["user.read", "user.write"],
    status: "活跃"
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    role: "编辑",
    permissions: ["user.read"],
    status: "停用"
  },
  {
    id: 4,
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "成员",
    permissions: ["user.read"],
    status: "活跃"
  },
  {
    id: 5,
    name: "钱七",
    email: "qianqi@example.com",
    role: "成员",
    permissions: ["user.read"],
    status: "活跃"
  },
  {
    id: 6,
    name: "孙八",
    email: "sunba@example.com",
    role: "成员",
    permissions: ["user.read"],
    status: "停用"
  },
  {
    id: 7,
    name: "周九",
    email: "zhoujiu@example.com",
    role: "管理员",
    permissions: ["user.read", "user.write", "admin"],
    status: "活跃"
  },
  {
    id: 8,
    name: "吴十",
    email: "wushi@example.com",
    role: "编辑",
    permissions: ["user.read", "user.write", "report.read"],
    status: "活跃"
  },
  {
    id: 9,
    name: "郑一",
    email: "zhengyi@example.com",
    role: "编辑",
    permissions: ["user.read", "report.read"],
    status: "活跃"
  },
  {
    id: 10,
    name: "冯二",
    email: "fenger@example.com",
    role: "成员",
    permissions: ["user.read"],
    status: "活跃"
  },
  {
    id: 11,
    name: "陈三",
    email: "chensan@example.com",
    role: "管理员",
    permissions: ["user.read", "user.write", "admin"],
    status: "活跃"
  },
  {
    id: 12,
    name: "褚四",
    email: "chusi@example.com",
    role: "成员",
    permissions: ["user.read"],
    status: "停用"
  },
  {
    id: 13,
    name: "卫五",
    email: "weiwu@example.com",
    role: "编辑",
    permissions: ["user.read", "user.write"],
    status: "活跃"
  },
  {
    id: 14,
    name: "蒋六",
    email: "jiangliu@example.com",
    role: "成员",
    permissions: ["user.read"],
    status: "活跃"
  },
  {
    id: 15,
    name: "沈七",
    email: "shenqi@example.com",
    role: "成员",
    permissions: ["user.read", "report.read"],
    status: "活跃"
  },
];


/**
 * UserList - User management list page with search, selection, permissions, and pagination
 * / 用户管理列表页，支持搜索、多选、权限展示和分页
 */
const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
    useSetPageTitle("用户管理", "管理所有用户");
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const [roleFilter, setRoleFilter] = useState<Key | null>(null);
  const [statusFilter, setStatusFilter] = useState<Key | null>(null);

  // Extract unique roles and statuses / 获取所有唯一角色和状态
  const uniqueRoles = useMemo(
    () => [...new Set(ALL_USERS.map((u) => u.role))],
    [],
  );
  const uniqueStatuses = useMemo(
    () => [...new Set(ALL_USERS.map((u) => u.status))],
    [],
  );

  // Filter users by search query, role, and status / 按搜索关键词、角色和状态过滤用户
  const filteredUsers = useMemo(() => {
    return ALL_USERS.filter((u) => {
      // Keyword search / 关键词搜索
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!u.name.includes(q) && !u.email.includes(q)) return false;
      }
      // Role filter / 角色筛选
      if (roleFilter !== null && u.role !== roleFilter) return false;
      // Status filter / 状态筛选
      if (statusFilter !== null && u.status !== statusFilter) return false;
      return true;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  // Reset to page 1 when any filter changes / 任何筛选条件变化时重置到第一页
  // Form dialog state / 表单弹窗状态
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MockUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MockUser | null>(null);
  const emptyForm = { name: "", email: "", role: "", status: "活跃", permissions: [] as string[] };
  const [formData, setFormData] = useState(emptyForm);

  const openCreate = () => { setEditingItem(null); setFormData(emptyForm); setModalOpen(true); };
  const openEdit = (item: MockUser) => { setEditingItem(item); setFormData({ name: item.name, email: item.email, role: item.role, status: item.status, permissions: item.permissions }); setModalOpen(true); };
  const confirmDelete = (item: MockUser) => { setDeleteTarget(item); };
  const handleDelete = () => { if (deleteTarget) { ALL_USERS = ALL_USERS.filter((u) => u.id !== deleteTarget.id); setDeleteTarget(null); } };
  const handleSave = () => {
    if (editingItem) { const idx = editingItem ? ALL_USERS.findIndex((u) => u.id === editingItem.id) : -1; if (idx >= 0) ALL_USERS[idx] = { ...ALL_USERS[idx], ...formData }; }
    else { const newId = Math.max(...ALL_USERS.map((u) => u.id)) + 1; ALL_USERS = [...ALL_USERS, { id: newId, ...formData }]; }
    setModalOpen(false); setPage(1);
  };
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };
  const handleRoleChange = (key: Key | null) => {
    setRoleFilter(key);
    setPage(1);
  };
  const handleStatusChange = (key: Key | null) => {
    setStatusFilter(key);
    setPage(1);
  };

  // Pagination / 分页
  const totalPages = Math.ceil(filteredUsers.length / ROWS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredUsers.slice(start, start + ROWS_PER_PAGE);
  }, [page, filteredUsers, ROWS_PER_PAGE]);
  const pageStart = (page - 1) * ROWS_PER_PAGE + 1;
  const pageEnd = Math.min(page * ROWS_PER_PAGE, filteredUsers.length);


  const footer = <Pagination size="sm"><Pagination.Summary>{"第 " + pageStart + "-" + pageEnd + " 条，共 " + filteredUsers.length + " 条"}</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous isDisabled={page === 1} onPress={() => setPage(Math.max(1, page - 1))}><Pagination.PreviousIcon /> Prev</Pagination.Previous></Pagination.Item>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(Math.min(totalPages, page + 1))}>Next <Pagination.NextIcon /></Pagination.Next></Pagination.Item></Pagination.Content></Pagination>;

  const columns: BuiTableColumn<typeof paginatedUsers[0]>[] = [{ key: "name", title: "姓名", isRowHeader: true },{ key: "email", title: "邮箱" },{ key: "role", title: "角色" },{ key: "permissions", title: "权限", render: (u) => <div className="flex flex-wrap gap-1">{u.permissions.map((p) => <Chip key={p} size="sm" variant="soft">{p}</Chip>)}</div> },{ key: "status", title: "状态", render: (u) => <Chip size="sm" variant="soft" color={u.status === "活跃" ? "success" : "default"}>{u.status}</Chip> },{ key: "actions", title: "操作", render: (item) => <><Button size="sm" variant="ghost" isIconOnly aria-label={"编辑"} onPress={() => openEdit(item)}><Pencil size={16} /></Button><Button size="sm" variant="ghost" isIconOnly aria-label={"删除"} onPress={() => confirmDelete(item)}><Trash2 size={16} className="text-danger" /></Button></> }];

  return (
    <BuiPage
      className="h-full"
      contentClassName="flex min-h-0 flex-1 flex-col"
    >
      {/* Summary stats / 统计摘要 */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3 shrink-0">
        {[
          { label: "总数", value: "2,847" },
          { label: "活跃", value: "2,103" },
          { label: "本周新增", value: "89" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <Card.Content>
              <p className="text-sm text-foreground-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground font-price">
                {stat.value}
              </p>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Filter bar: keyword search + role & status dropdowns / 筛选栏：关键词搜索 + 角色与状态下拉 */}
      <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
    <div className="flex items-end gap-3">
        <Button size="sm" variant="secondary" onPress={() => openCreate()} ><Plus size={16} />新建用户</Button>
    </div>
    <div className="flex items-end gap-3">
        <SearchField
          aria-label="搜索用户"
          value={searchQuery}
          onChange={handleSearchChange}
        >
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              className="w-60"
              placeholder="搜索用户名或邮箱..."
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        {/* Role filter / 角色筛选 */}
        <Select
          className="w-40"
          aria-label="角色"
          placeholder="全部角色"
          value={roleFilter}
          onChange={handleRoleChange}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {uniqueRoles.map((role) => (
                <ListBox.Item key={role} id={role} textValue={role}>
                  {role}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Status filter / 状态筛选 */}
        <Select
          className="w-40"
          aria-label="状态"
          placeholder="全部状态"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {uniqueStatuses.map((status) => (
                <ListBox.Item key={status} id={status} textValue={status}>
                  {status}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
    </div>
      </div>
      <BuiTable
        data={paginatedUsers}
        columns={columns}
        getRowId={(p) => p.id}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        footer={footer}
      />
          {/* Create/Edit modal */}
      <Modal.Backdrop isOpen={modalOpen} onOpenChange={setModalOpen}><Modal.Container placement="auto"><Modal.Dialog aria-label={editingItem ? "编辑用户" : "新建用户"} className="sm:max-w-lg"><Modal.CloseTrigger /><Modal.Header><Modal.Heading>{editingItem ? "编辑用户" : "新建用户"}</Modal.Heading></Modal.Header><Modal.Body><div className="flex flex-col gap-4">
        <TextField className="w-full"><Label>姓名</Label><Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="输入姓名" /></TextField>
        <TextField className="w-full"><Label>邮箱</Label><Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="输入邮箱" /></TextField>
        <div className="flex gap-4">
          <TextField className="flex-1"><Label>角色</Label><Input value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="管理员/编辑/成员" /></TextField>
          <TextField className="flex-1"><Label>状态</Label><Input value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} placeholder="活跃/停用" /></TextField>
        </div>
      </div></Modal.Body><Modal.Footer><Button slot="close" variant="secondary">取消</Button><Button onPress={handleSave}>保存</Button></Modal.Footer></Modal.Dialog></Modal.Container></Modal.Backdrop>

      {/* Delete confirmation */}
      <AlertDialog.Backdrop isOpen={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}><AlertDialog.Container><AlertDialog.Dialog className="sm:max-w-[400px]"><AlertDialog.CloseTrigger /><AlertDialog.Header><AlertDialog.Icon status="danger" /><AlertDialog.Heading>确认删除</AlertDialog.Heading></AlertDialog.Header><AlertDialog.Body><p>确定要删除用户 "{deleteTarget?.name}" 吗？此操作不可撤销。</p></AlertDialog.Body><AlertDialog.Footer><Button slot="close" variant="tertiary">取消</Button><Button slot="close" variant="danger" onPress={handleDelete}>删除</Button></AlertDialog.Footer></AlertDialog.Dialog></AlertDialog.Container></AlertDialog.Backdrop>
    </BuiPage>
  );
};

export default UserList;
