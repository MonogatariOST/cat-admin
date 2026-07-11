/**
 * Course API type definitions / 课程 API 类型定义
 */

/** Course data / 课程数据 */
export interface Course {
  id: string;
  name: string;
  teacherName: string;
  teacherId: string;
  hours: number;
  credits: number;
  semester: string;
  studentCount: number;
  maxStudents: number;
  status: string;
}
