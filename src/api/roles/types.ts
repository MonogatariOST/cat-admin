/**
 * Role API type definitions / 角色 API 类型定义
 */

import type { Role } from "../../types/permission";

/** Role list query parameters / 角色列表查询参数 */
export interface RoleListParams {
  /** Search keyword / 搜索关键词 */
  keyword?: string;
}

/** Role list response / 角色列表响应 */
export interface RoleListResponse {
  roles: Role[];
  total: number;
}
