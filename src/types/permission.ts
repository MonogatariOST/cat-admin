/**
 * Permission and Role type definitions / 权限和角色类型定义
 */

/** Permission definition / 权限定义 */
export interface Permission {
  /** Unique identifier / 唯一标识 */
  id: string;
  /** Display name / 显示名称 */
  name: string;
  /** Module group this permission belongs to / 所属模块 */
  module: string;
  /** Description / 描述 */
  description: string;
}

/** Role definition / 角色定义 */
export interface Role {
  /** Unique identifier / 唯一标识 */
  id: string;
  /** Display name / 角色名称 */
  name: string;
  /** Description / 描述 */
  description: string;
  /** Permission IDs granted to this role / 授予的权限 ID 列表 */
  permissions: string[];
  /** Number of users with this role / 拥有该角色的用户数 */
  userCount: number;
}
