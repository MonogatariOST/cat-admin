/**
 * Role API module / 角色 API 模块
 * Currently uses mock data — replace API calls with real backend when available.
 * / 当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { Role } from "../../types/permission";
import type { RoleListParams, RoleListResponse } from "./types";

/** Mock role data / 模拟角色数据 */
const MOCK_ROLES: Role[] = [
  {
    id: "admin",
    name: "管理员",
    description: "拥有系统全部权限",
    permissions: ["user.read", "user.write", "user.delete", "role.read", "role.write", "role.delete", "perm.read", "perm.write", "report.read", "report.write", "settings.read", "settings.write", "dashboard.read", "admin"],
    userCount: 3,
  },
  {
    id: "editor",
    name: "编辑",
    description: "可管理用户和查看报表",
    permissions: ["user.read", "user.write", "role.read", "report.read", "report.write", "dashboard.read"],
    userCount: 8,
  },
  {
    id: "member",
    name: "成员",
    description: "基础访问权限",
    permissions: ["user.read", "dashboard.read"],
    userCount: 4,
  },
  {
    id: "guest",
    name: "访客",
    description: "仅可查看仪表盘",
    permissions: ["dashboard.read"],
    userCount: 0,
  },
];

/** Simulate network delay / 模拟网络延迟 */
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get role list / 获取角色列表
 */
const getRoles = async (params?: RoleListParams): Promise<RoleListResponse> => {
  await delay();
  let filtered = [...MOCK_ROLES];
  if (params?.keyword) {
    const q = params.keyword.toLowerCase();
    filtered = filtered.filter(
      (r) => r.name.includes(q) || r.description.includes(q),
    );
  }
  return { roles: filtered, total: filtered.length };
};

/** Auto-increment counter for generating IDs / 自增 ID 计数器 */
let _nextId = MOCK_ROLES.length + 1;

/**
 * Create a new item / 创建新条目
 */
const create = (data: Omit<Role, "id">): Role => {
  const id = `r${_nextId++}`;
  const item: Role = { ...data, id } as Role;
  (MOCK_ROLES as Role[]).push(item);
  return item;
};

/**
 * Update an existing item / 更新已有条目
 */
const update = (id: string, data: Partial<Role>): Role | null => {
  const index = MOCK_ROLES.findIndex((item) => item.id === id);
  if (index === -1) return null;
  (MOCK_ROLES as Role[])[index] = { ...(MOCK_ROLES as Role[])[index], ...data };
  return (MOCK_ROLES as Role[])[index];
};

/**
 * Delete an item by ID / 按 ID 删除条目
 */
const delete_ = (id: string): boolean => {
  const index = MOCK_ROLES.findIndex((item) => item.id === id);
  if (index === -1) return false;
  (MOCK_ROLES as Role[]).splice(index, 1);
  return true;
};

const getAllSync = () => MOCK_ROLES;
export const rolesApi = { getAllSync, create, update, delete: delete_, getRoles };
