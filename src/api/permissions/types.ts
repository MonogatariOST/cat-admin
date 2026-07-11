/**
 * Permission API type definitions / 权限 API 类型定义
 */

import type { Permission } from "../../types/permission";

/** Permission list query parameters / 权限列表查询参数 */
export interface PermissionListParams {
  /** Filter by module / 按模块筛选 */
  module?: string;
  /** Search keyword / 搜索关键词 */
  keyword?: string;
}

/** Permission list response / 权限列表响应 */
export interface PermissionListResponse {
  permissions: Permission[];
  total: number;
}
