/**
 * Classroom API type definitions / 教室 API 类型定义
 */

/** Classroom data / 教室数据 */
export interface Classroom {
  id: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  hasProjector: boolean;
  hasAirConditioning: boolean;
  status: string;
}
