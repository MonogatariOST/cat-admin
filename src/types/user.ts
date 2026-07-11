/** User profile / 用户信息 */
export interface User {
  id: string;
  username: string;
  email: string;
  /** Display name / 显示名称 */
  displayName?: string;
  /** User role / 用户角色 */
  role: string;
  /** Avatar URL / 头像地址 */
  avatar?: string;
  /** Account status / 账号状态 */
  status: string;
  /** Creation time / 创建时间 */
  createdAt?: string;
}
