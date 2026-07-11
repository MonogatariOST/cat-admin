/**
 * Teacher API module / 老师 API 模块
 * / 当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { Teacher } from "./types";

/** Mock teacher data / 模拟老师数据 */
const MOCK_TEACHERS: Teacher[] = [
  { id: "t1", name: "张明", email: "zhangming@school.edu", phone: "13800001111", department: "计算机科学与技术学院", title: "教授", status: "active" },
  { id: "t2", name: "李华", email: "lihua@school.edu", phone: "13800002222", department: "计算机科学与技术学院", title: "副教授", status: "active" },
  { id: "t3", name: "王芳", email: "wangfang@school.edu", phone: "13800003333", department: "数学与统计学院", title: "教授", status: "active" },
  { id: "t4", name: "赵强", email: "zhaoqiang@school.edu", phone: "13800004444", department: "外国语学院", title: "讲师", status: "active" },
  { id: "t5", name: "陈静", email: "chenjing@school.edu", phone: "13800005555", department: "计算机科学与技术学院", title: "讲师", status: "inactive" },
  { id: "t6", name: "刘伟", email: "liuwei@school.edu", phone: "13800006666", department: "数学与统计学院", title: "副教授", status: "active" },
  { id: "t7", name: "孙丽", email: "sunli@school.edu", phone: "13800007777", department: "外国语学院", title: "教授", status: "active" },
  { id: "t8", name: "周杰", email: "zhoujie@school.edu", phone: "13800008888", department: "计算机科学与技术学院", title: "讲师", status: "active" },
];
/** Auto-increment counter for generating IDs / 自增 ID 计数器 */
let _nextId = MOCK_TEACHERS.length + 1;

/**
 * Create a new item / 创建新条目
 */
const create = (data: Omit<Teacher, "id">): Teacher => {
  const id = `t${_nextId++}`;
  const item: Teacher = { ...data, id } as Teacher;
  (MOCK_TEACHERS as Teacher[]).push(item);
  return item;
};

/**
 * Update an existing item / 更新已有条目
 */
const update = (id: string, data: Partial<Teacher>): Teacher | null => {
  const index = MOCK_TEACHERS.findIndex((item) => item.id === id);
  if (index === -1) return null;
  (MOCK_TEACHERS as Teacher[])[index] = { ...(MOCK_TEACHERS as Teacher[])[index], ...data };
  return (MOCK_TEACHERS as Teacher[])[index];
};

/**
 * Delete an item by ID / 按 ID 删除条目
 */
const delete_ = (id: string): boolean => {
  const index = MOCK_TEACHERS.findIndex((item) => item.id === id);
  if (index === -1) return false;
  (MOCK_TEACHERS as Teacher[]).splice(index, 1);
  return true;
};

const getAllSync = () => MOCK_TEACHERS;
export const teachersApi = { getAllSync, create, update, delete: delete_ };
