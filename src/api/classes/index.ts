/**
 * Class API module / 班级 API 模块
 * / 当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { ClassItem } from "./types";

const MOCK_CLASSES: ClassItem[] = [
  { id: "cl1", name: "计算机科学与技术2101班", grade: "2021", major: "计算机科学与技术", headTeacher: "张明", studentCount: 45, status: "active" },
  { id: "cl2", name: "计算机科学与技术2102班", grade: "2021", major: "计算机科学与技术", headTeacher: "李华", studentCount: 42, status: "active" },
  { id: "cl3", name: "软件工程2101班", grade: "2021", major: "软件工程", headTeacher: "周杰", studentCount: 40, status: "active" },
  { id: "cl4", name: "数学与应用数学2101班", grade: "2021", major: "数学与应用数学", headTeacher: "王芳", studentCount: 35, status: "active" },
  { id: "cl5", name: "英语2101班", grade: "2021", major: "英语", headTeacher: "孙丽", studentCount: 30, status: "active" },
  { id: "cl6", name: "计算机科学与技术2201班", grade: "2022", major: "计算机科学与技术", headTeacher: "赵强", studentCount: 48, status: "active" },
  { id: "cl7", name: "软件工程2201班", grade: "2022", major: "软件工程", headTeacher: "刘伟", studentCount: 38, status: "active" },
  { id: "cl8", name: "计算机科学与技术2001班", grade: "2020", major: "计算机科学与技术", headTeacher: "陈静", studentCount: 50, status: "graduated" },
];
/** Auto-increment counter for generating IDs / 自增 ID 计数器 */
let _nextId = MOCK_CLASSES.length + 1;

/**
 * Create a new item / 创建新条目
 */
const create = (data: Omit<ClassItem, "id">): ClassItem => {
  const id = `cl${_nextId++}`;
  const item: ClassItem = { ...data, id } as ClassItem;
  (MOCK_CLASSES as ClassItem[]).push(item);
  return item;
};

/**
 * Update an existing item / 更新已有条目
 */
const update = (id: string, data: Partial<ClassItem>): ClassItem | null => {
  const index = MOCK_CLASSES.findIndex((item) => item.id === id);
  if (index === -1) return null;
  (MOCK_CLASSES as ClassItem[])[index] = { ...(MOCK_CLASSES as ClassItem[])[index], ...data };
  return (MOCK_CLASSES as ClassItem[])[index];
};

/**
 * Delete an item by ID / 按 ID 删除条目
 */
const delete_ = (id: string): boolean => {
  const index = MOCK_CLASSES.findIndex((item) => item.id === id);
  if (index === -1) return false;
  (MOCK_CLASSES as ClassItem[]).splice(index, 1);
  return true;
};

const getAllSync = () => MOCK_CLASSES;
export const classesApi = { getAllSync, create, update, delete: delete_ };
