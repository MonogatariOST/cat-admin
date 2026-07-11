/**
 * Course API module / 课程 API 模块
 * / 当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { Course } from "./types";

/** Mock course data / 模拟课程数据 */
const MOCK_COURSES: Course[] = [
  { id: "c1", name: "高等数学", teacherName: "王芳", teacherId: "t3", hours: 64, credits: 4, semester: "2026-2027-1", studentCount: 120, maxStudents: 150, status: "active" },
  { id: "c2", name: "线性代数", teacherName: "刘伟", teacherId: "t6", hours: 48, credits: 3, semester: "2026-2027-1", studentCount: 90, maxStudents: 120, status: "active" },
  { id: "c3", name: "数据结构", teacherName: "张明", teacherId: "t1", hours: 56, credits: 4, semester: "2026-2027-1", studentCount: 80, maxStudents: 100, status: "active" },
  { id: "c4", name: "操作系统", teacherName: "李华", teacherId: "t2", hours: 48, credits: 3, semester: "2026-2027-1", studentCount: 75, maxStudents: 100, status: "active" },
  { id: "c5", name: "数据库原理", teacherName: "周杰", teacherId: "t8", hours: 48, credits: 3, semester: "2026-2027-1", studentCount: 60, maxStudents: 80, status: "active" },
  { id: "c6", name: "大学英语", teacherName: "孙丽", teacherId: "t7", hours: 64, credits: 4, semester: "2026-2027-1", studentCount: 200, maxStudents: 250, status: "active" },
  { id: "c7", name: "计算机网络", teacherName: "张明", teacherId: "t1", hours: 40, credits: 2.5, semester: "2026-2027-1", studentCount: 65, maxStudents: 80, status: "active" },
  { id: "c8", name: "软件工程", teacherName: "赵强", teacherId: "t4", hours: 40, credits: 2.5, semester: "2026-2027-2", studentCount: 0, maxStudents: 100, status: "upcoming" },
  { id: "c9", name: "概率论与数理统计", teacherName: "王芳", teacherId: "t3", hours: 48, credits: 3, semester: "2026-2027-2", studentCount: 0, maxStudents: 120, status: "upcoming" },
  { id: "c10", name: "编译原理", teacherName: "陈静", teacherId: "t5", hours: 48, credits: 3, semester: "2025-2026-2", studentCount: 55, maxStudents: 80, status: "ended" },
];
/** Auto-increment counter for generating IDs / 自增 ID 计数器 */
let _nextId = MOCK_COURSES.length + 1;

/**
 * Create a new item / 创建新条目
 */
const create = (data: Omit<Course, "id">): Course => {
  const id = `co${_nextId++}`;
  const item: Course = { ...data, id } as Course;
  (MOCK_COURSES as Course[]).push(item);
  return item;
};

/**
 * Update an existing item / 更新已有条目
 */
const update = (id: string, data: Partial<Course>): Course | null => {
  const index = MOCK_COURSES.findIndex((item) => item.id === id);
  if (index === -1) return null;
  (MOCK_COURSES as Course[])[index] = { ...(MOCK_COURSES as Course[])[index], ...data };
  return (MOCK_COURSES as Course[])[index];
};

/**
 * Delete an item by ID / 按 ID 删除条目
 */
const delete_ = (id: string): boolean => {
  const index = MOCK_COURSES.findIndex((item) => item.id === id);
  if (index === -1) return false;
  (MOCK_COURSES as Course[]).splice(index, 1);
  return true;
};

const getAllSync = () => MOCK_COURSES;
export const coursesApi = { getAllSync, create, update, delete: delete_ };
