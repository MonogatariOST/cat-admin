/**
 * Class API type definitions / 班级 API 类型定义
 */

/** Class data / 班级数据 */
export interface ClassItem {
  id: string;
  name: string;
  grade: string;
  major: string;
  headTeacher: string;
  studentCount: number;
  status: string;
}
