/**
 * Settings API module / 设置 API 模块
 * Provides updateProfile and changePassword functions.
 * Currently uses mock data — replace API calls with real backend when available.
 * / 提供更新个人资料和修改密码功能；当前使用模拟数据
 */

import type { UpdateProfileRequest, ChangePasswordRequest } from "./types";

/** Simulate network delay / 模拟网络延迟 */
const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Update user profile / 更新用户个人资料
 */
const updateProfile = async (data: UpdateProfileRequest): Promise<void> => {
  await delay();
  // Mock validation / 模拟验证
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error("邮箱格式不正确");
  }
};

/**
 * Change password / 修改密码
 */
const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  await delay();
  // Mock validation / 模拟验证
  if (data.currentPassword !== "admin123") {
    throw new Error("当前密码不正确");
  }
  if (data.newPassword.length < 6) {
    throw new Error("新密码至少需要 6 个字符");
  }
  if (data.newPassword === data.currentPassword) {
    throw new Error("新密码不能与当前密码相同");
  }
};

export const settingsApi = { updateProfile, changePassword };
