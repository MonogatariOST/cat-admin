/** Generic API response wrapper / 通用 API 响应包装 */
export interface ApiResponse<T = unknown> {
  /** Business status code / 业务状态码 */
  code: number;
  /** Response message / 响应消息 */
  message: string;
  /** Response payload / 响应数据 */
  data: T;
}

/** Paginated data wrapper / 分页数据包装 */
export interface PaginatedData<T> {
  /** Data list / 数据列表 */
  list: T[];
  /** Total record count / 总记录数 */
  total: number;
  /** Current page number / 当前页码 */
  page: number;
  /** Page size / 每页条数 */
  pageSize: number;
}
