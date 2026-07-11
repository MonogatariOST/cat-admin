/**
 * Permission API module / 权限 API 模块
 * Currently uses mock data — replace API calls with real backend when available.
 * / 当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { Permission } from "../../types/permission";

/** Mock permission data / 模拟权限数据 */
const MOCK_PERMISSIONS: Permission[] = [
  { id: "user.read",     name: "查看用户",     module: "用户管理", description: "查看用户列表和基本信息" },
  { id: "user.write",    name: "编辑用户",     module: "用户管理", description: "编辑用户信息" },
  { id: "user.delete",   name: "删除用户",     module: "用户管理", description: "删除用户账号" },
  { id: "role.read",     name: "查看角色",     module: "角色管理", description: "查看角色列表和权限配置" },
  { id: "role.write",    name: "编辑角色",     module: "角色管理", description: "编辑角色信息和权限" },
  { id: "role.delete",   name: "删除角色",     module: "角色管理", description: "删除角色" },
  { id: "perm.read",     name: "查看权限",     module: "权限管理", description: "查看权限列表" },
  { id: "perm.write",    name: "编辑权限",     module: "权限管理", description: "编辑权限配置" },
  { id: "report.read",   name: "查看报表",     module: "报表管理", description: "查看数据报表" },
  { id: "report.write",  name: "导出报表",     module: "报表管理", description: "导出数据报表" },
  { id: "settings.read", name: "查看设置",     module: "系统设置", description: "查看系统设置" },
  { id: "settings.write",name: "编辑设置",     module: "系统设置", description: "编辑系统设置" },
  { id: "dashboard.read",name: "查看仪表盘",   module: "仪表盘",   description: "查看仪表盘数据" },
  { id: "admin",         name: "超级管理",     module: "管理员",   description: "超级管理员权限" },
];

/** Auto-increment counter for generating IDs / 自增 ID 计数器 */
let _nextId = MOCK_PERMISSIONS.length + 1;

/**
 * Create a new item / 创建新条目
 */
const create = (data: Omit<Permission, "id">): Permission => {
  const id = `p${_nextId++}`;
  const item: Permission = { ...data, id } as Permission;
  (MOCK_PERMISSIONS as Permission[]).push(item);
  return item;
};

/**
 * Update an existing item / 更新已有条目
 */
const update = (id: string, data: Partial<Permission>): Permission | null => {
  const index = MOCK_PERMISSIONS.findIndex((item) => item.id === id);
  if (index === -1) return null;
  (MOCK_PERMISSIONS as Permission[])[index] = { ...(MOCK_PERMISSIONS as Permission[])[index], ...data };
  return (MOCK_PERMISSIONS as Permission[])[index];
};

/**
 * Delete an item by ID / 按 ID 删除条目
 */
const delete_ = (id: string): boolean => {
  const index = MOCK_PERMISSIONS.findIndex((item) => item.id === id);
  if (index === -1) return false;
  (MOCK_PERMISSIONS as Permission[]).splice(index, 1);
  return true;
};

const getAllSync = () => MOCK_PERMISSIONS;
export const permissionsApi = { getAllSync, create, update, delete: delete_ };
