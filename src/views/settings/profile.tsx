"use client";

/**
 * Account settings page / 账号设置页面
 * Provides forms for updating personal information and changing password.
 * / 提供更新个人资料和修改密码的表单
 */

import { useState } from "react";
import { useSetAtom } from "jotai";
import { useAuth } from "../../hooks/use-auth";
import { userAtom } from "../../stores/auth";
import { settingsApi } from "../../api/settings";
import { BuiPage } from "../../components/baseui"
import { useSetPageTitle } from "../../stores"
import {
  Card, Form, TextField, Label, InputGroup, Button, FieldError,
} from "@heroui/react";

/**
 * SettingsPage - Account settings with profile and password sections / 账号设置页面
 */
const SettingsPage = () => {
  useSetPageTitle("账号设置", "管理你的账号信息和密码");
  const { user } = useAuth();
  const setUser = useSetAtom(userAtom);

  // Profile form state / 个人资料表单状态
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password form state / 密码表单状态
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * Handle profile form submission / 处理个人资料表单提交
   */
  const handleProfileSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(false);
    setIsProfileLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const displayName = (formData.get("displayName") as string) ?? "";
      const email = (formData.get("email") as string) ?? "";

      await settingsApi.updateProfile({ displayName, email });

      // Update user info in Jotai store / 更新 Jotai store 中的用户信息
      if (user) {
        setUser({ ...user, displayName, email });
      }

      setProfileSuccess(true);
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "保存失败，请重试");
    } finally {
      setIsProfileLoading(false);
    }
  };

  /**
   * Handle password change form submission / 处理修改密码表单提交
   */
  const handlePasswordSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    // Client-side confirm password check / 客户端确认密码校验
    if (passwordValue !== confirmPassword) {
      setPasswordError("两次输入的密码不一致");
      return;
    }

    setIsPasswordLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const currentPassword = (formData.get("currentPassword") as string) ?? "";
      const newPassword = (formData.get("newPassword") as string) ?? "";

      await settingsApi.changePassword({ currentPassword, newPassword });

      setPasswordValue("");
      setConfirmPassword("");
      setPasswordSuccess(true);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "修改密码失败，请重试");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <BuiPage >
      <div className="flex flex-col gap-6">
        {/* Profile section / 个人资料 */}
        <Card className="p-6">
          <Card.Content>
            <h3 className="mb-4 text-base font-semibold text-foreground">个人信息</h3>

            {profileError && (
              <div className="mb-4 rounded-lg bg-danger-50 p-3 text-sm text-danger">
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div className="mb-4 rounded-lg bg-success-50 p-3 text-sm text-success">
                个人资料已更新
              </div>
            )}

            <Form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              {/* Display name / 显示名称 */}
              <TextField
                name="displayName"
                defaultValue={user?.displayName ?? ""}
              >
                <Label>显示名称</Label>
                <InputGroup>
                  <InputGroup.Input placeholder="你的显示名称" />
                </InputGroup>
              </TextField>

              {/* Email / 邮箱 */}
              <TextField
                isRequired
                name="email"
                type="email"
                defaultValue={user?.email ?? ""}
              >
                <Label>邮箱</Label>
                <InputGroup>
                  <InputGroup.Input placeholder="your@email.com" />
                </InputGroup>
                <FieldError />
              </TextField>

              <Button
                type="submit"
                isDisabled={isProfileLoading}
                className="self-start"
              >
                {isProfileLoading ? "保存中..." : "保存修改"}
              </Button>
            </Form>
          </Card.Content>
        </Card>

        {/* Password section / 修改密码 */}
        <Card className="p-6">
          <Card.Content>
            <h3 className="mb-4 text-base font-semibold text-foreground">修改密码</h3>

            {passwordError && (
              <div className="mb-4 rounded-lg bg-danger-50 p-3 text-sm text-danger">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-4 rounded-lg bg-success-50 p-3 text-sm text-success">
                密码已修改
              </div>
            )}

            <Form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              {/* Current password / 当前密码 */}
              <TextField isRequired name="currentPassword" minLength={6}>
                <Label>当前密码</Label>
                <InputGroup>
                  <InputGroup.Input
                    type="password"
                    placeholder="输入当前密码"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* New password / 新密码 */}
              <TextField isRequired name="newPassword" minLength={6} value={passwordValue} onChange={setPasswordValue}>
                <Label>新密码</Label>
                <InputGroup>
                  <InputGroup.Input
                    type="password"
                    placeholder="输入新密码"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Confirm new password / 确认新密码 */}
              <TextField isRequired name="confirmPassword" minLength={6} value={confirmPassword} onChange={setConfirmPassword}>
                <Label>确认新密码</Label>
                <InputGroup>
                  <InputGroup.Input
                    type="password"
                    placeholder="再次输入新密码"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              <Button
                type="submit"
                isDisabled={isPasswordLoading}
                className="self-start"
              >
                {isPasswordLoading ? "修改中..." : "修改密码"}
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </BuiPage>
  );
};

export function Component() {
  return <SettingsPage />;
}
