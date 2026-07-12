/**
 * Activity API module / 操作日志 API 模块
 * Currently uses mock data — replace API calls with real backend when available.
 * / 当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { ActivityEntry } from "./types";

const MOCK_ACTIVITIES: ActivityEntry[] = [
  {
    id: "act1",
    action: "登录系统",
    module: "认证",
    description: "用户 admin 登录系统",
    operator: "admin",
    timestamp: "2026-07-11 09:15:00",
    type: "login",
  },
  {
    id: "act2",
    action: "创建文章",
    module: "内容管理",
    description: "创建新文章「CatAdmin 模板项目介绍」",
    operator: "admin",
    timestamp: "2026-07-11 10:30:00",
    type: "create",
  },
  {
    id: "act3",
    action: "编辑用户",
    module: "用户管理",
    description: "修改用户「张三」的个人信息",
    operator: "admin",
    timestamp: "2026-07-11 11:00:00",
    type: "update",
  },
  {
    id: "act4",
    action: "删除角色",
    module: "角色管理",
    description: "删除角色「访客」",
    operator: "admin",
    timestamp: "2026-07-11 11:30:00",
    type: "delete",
  },
  {
    id: "act5",
    action: "发布文章",
    module: "内容管理",
    description: "发布文章「Tailwind CSS v4 新特性」",
    operator: "admin",
    timestamp: "2026-07-10 14:00:00",
    type: "update",
  },
  {
    id: "act6",
    action: "分配权限",
    module: "权限管理",
    description: "为角色「编辑者」分配「文章管理」权限",
    operator: "admin",
    timestamp: "2026-07-10 15:20:00",
    type: "update",
  },
  {
    id: "act7",
    action: "登录系统",
    module: "认证",
    description: "用户 admin 登录系统",
    operator: "admin",
    timestamp: "2026-07-10 09:00:00",
    type: "login",
  },
  {
    id: "act8",
    action: "更新系统设置",
    module: "系统管理",
    description: "修改系统名称和 Logo",
    operator: "admin",
    timestamp: "2026-07-09 16:45:00",
    type: "update",
  },
  {
    id: "act9",
    action: "创建课程",
    module: "教学管理",
    description: "创建课程「人工智能导论」",
    operator: "admin",
    timestamp: "2026-07-09 10:10:00",
    type: "create",
  },
  {
    id: "act10",
    action: "退出系统",
    module: "认证",
    description: "用户 admin 退出系统",
    operator: "admin",
    timestamp: "2026-07-08 18:00:00",
    type: "logout",
  },
  {
    id: "act11",
    action: "登录系统",
    module: "认证",
    description: "用户 admin 登录系统",
    operator: "admin",
    timestamp: "2026-07-08 09:30:00",
    type: "login",
  },
  {
    id: "act12",
    action: "导出报表",
    module: "报表",
    description: "导出「用户统计报表」CSV 文件",
    operator: "admin",
    timestamp: "2026-07-08 11:20:00",
    type: "other",
  },
];

export const activityApi = {
  async getAll(): Promise<ActivityEntry[]> {
    return [...MOCK_ACTIVITIES];
  },
};
