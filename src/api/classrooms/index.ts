/**
 * Classroom API module / 教室 API 模块
 * / 当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { Classroom } from "./types";

const MOCK_CLASSROOMS: Classroom[] = [
  { id: "r1", name: "A101", building: "教学楼A", floor: 1, capacity: 80, hasProjector: true, hasAirConditioning: true, status: "available" },
  { id: "r2", name: "A102", building: "教学楼A", floor: 1, capacity: 60, hasProjector: true, hasAirConditioning: true, status: "available" },
  { id: "r3", name: "B201", building: "教学楼B", floor: 2, capacity: 120, hasProjector: true, hasAirConditioning: true, status: "available" },
  { id: "r4", name: "B202", building: "教学楼B", floor: 2, capacity: 100, hasProjector: false, hasAirConditioning: true, status: "maintenance" },
  { id: "r5", name: "C301", building: "实验楼C", floor: 3, capacity: 40, hasProjector: true, hasAirConditioning: true, status: "available" },
  { id: "r6", name: "C302", building: "实验楼C", floor: 3, capacity: 30, hasProjector: true, hasAirConditioning: false, status: "available" },
  { id: "r7", name: "D101", building: "图书馆D", floor: 1, capacity: 200, hasProjector: true, hasAirConditioning: true, status: "available" },
  { id: "r8", name: "A201", building: "教学楼A", floor: 2, capacity: 80, hasProjector: false, hasAirConditioning: true, status: "maintenance" },
];
/** Auto-increment counter for generating IDs / 自增 ID 计数器 */
let _nextId = MOCK_CLASSROOMS.length + 1;

/**
 * Create a new item / 创建新条目
 */
const create = (data: Omit<Classroom, "id">): Classroom => {
  const id = `rm${_nextId++}`;
  const item: Classroom = { ...data, id } as Classroom;
  (MOCK_CLASSROOMS as Classroom[]).push(item);
  return item;
};

/**
 * Update an existing item / 更新已有条目
 */
const update = (id: string, data: Partial<Classroom>): Classroom | null => {
  const index = MOCK_CLASSROOMS.findIndex((item) => item.id === id);
  if (index === -1) return null;
  (MOCK_CLASSROOMS as Classroom[])[index] = { ...(MOCK_CLASSROOMS as Classroom[])[index], ...data };
  return (MOCK_CLASSROOMS as Classroom[])[index];
};

/**
 * Delete an item by ID / 按 ID 删除条目
 */
const delete_ = (id: string): boolean => {
  const index = MOCK_CLASSROOMS.findIndex((item) => item.id === id);
  if (index === -1) return false;
  (MOCK_CLASSROOMS as Classroom[]).splice(index, 1);
  return true;
};

const getAllSync = () => MOCK_CLASSROOMS;
export const classroomsApi = { getAllSync, create, update, delete: delete_ };
