"use client";

/**
 * Login page / 登录页面
 * Provides username/password login form with validation, loading state, error display, and password visibility toggle.
 * / 提供用户名/密码登录表单，包含验证、加载状态、错误显示和密码可见性切换
 */

import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import {
  Card, Form, TextField, Label, InputGroup, Button, Checkbox, FieldError,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

/**
 * LoginPage - User login form / 用户登录表单
 */
const LoginPage = () => {
  const { login } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle form submission / 处理表单提交
   * Extracts username, password, and remember flag from form data, then calls login API.
   * / 从表单数据中提取用户名、密码和记住状态，然后调用登录接口
   */
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = (formData.get("username") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";
    const remember = formData.get("remember") === "on";

    try {
      await login(username, password, remember);
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <Card.Content>
        <h2 className="mb-6 text-lg font-semibold text-foreground">登录</h2>

        {/* Error alert / 错误提示 */}
        {error && (
          <div className="mb-4 rounded-lg bg-danger-50 p-3 text-sm text-danger">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username field / 用户名输入框 */}
          <TextField isRequired name="username">
            <Label>用户名</Label>
            <InputGroup>
              <InputGroup.Input placeholder="admin" />
            </InputGroup>
            <FieldError />
          </TextField>

          {/* Password field with visibility toggle / 密码输入框（含可见性切换） */}
          <TextField isRequired name="password" minLength={6}>
            <Label>密码</Label>
            <InputGroup>
              <InputGroup.Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="admin123"
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  aria-label={isPasswordVisible ? "隐藏密码" : "显示密码"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>

          {/* Remember me checkbox / 记住我复选框 */}
          <Checkbox name="remember" defaultSelected>
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              记住我
            </Checkbox.Content>
          </Checkbox>

          {/* Submit button / 登录按钮 */}
          <Button type="submit" isDisabled={isLoading} className="w-full">
            {isLoading ? "登录中..." : "登 录"}
          </Button>

          {/* Hint text with mock credentials / 提示信息，显示模拟凭据 */}
          <p className="text-center text-xs text-foreground-400">
            演示账号: admin / admin123
          </p>
        </Form>
      </Card.Content>
    </Card>
  );
};

export function Component() {
  return <LoginPage />;
}
