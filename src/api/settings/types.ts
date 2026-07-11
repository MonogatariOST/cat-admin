/**
 * Settings API type definitions / 设置 API 类型定义
 */

/** Update profile request / 更新个人信息请求参数 */
export interface UpdateProfileRequest {
  /** Display name / 显示名称 */
  displayName?: string;
  /** Email / 邮箱 */
  email?: string;
}

/** Change password request / 修改密码请求参数 */
export interface ChangePasswordRequest {
  /** Current password / 当前密码 */
  currentPassword: string;
  /** New password / 新密码 */
  newPassword: string;
}

/** Update profile response / 更新个人信息响应 */
export interface UpdateProfileResponse {
  success: boolean;
  message: string;
}
