/**
 * Activity log type definitions / 操作日志类型定义
 */

export interface ActivityEntry {
  id: string;
  action: string;
  module: string;
  description: string;
  operator: string;
  timestamp: string;
  type: "create" | "update" | "delete" | "login" | "logout" | "other";
}
