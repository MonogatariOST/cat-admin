"use client";

/**
 * Profile page / 个人信息页面
 * Displays user profile information and WeChat QR code.
 * / 展示用户个人信息和微信二维码
 */

import { useAuth } from "../../hooks/use-auth";
import { BuiPage } from "../../components/baseui"
import { useSetPageTitle } from "../../stores"
import {
  Card, Avatar, Chip,
} from "@heroui/react";
import { Smartphone } from "lucide-react";
import wechatQrCode from "../../assets/wechat-qrcode.jpg";

/**
 * Profile page with personal info and WeChat QR code / 个人信息页面
 */
const ProfilePage = () => {
  useSetPageTitle("个人信息", "查看和管理你的个人资料");
  const { user } = useAuth();

  return (
    <BuiPage >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile info card / 个人信息卡片 */}
        <Card className="p-6">
          <Card.Content>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              {/* Avatar / 头像 */}
              <Avatar size="lg" color="accent">
                <Avatar.Fallback className="text-xl">
                  {(user?.displayName ?? user?.username ?? "U").charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar>

              {/* Basic info / 基本信息 */}
              <div className="flex flex-col items-center gap-1 sm:items-start">
                <h3 className="text-lg font-semibold text-foreground">
                  {user?.displayName || user?.username || "Admin"}
                </h3>
                <p className="text-sm text-foreground-500">{user?.email || "admin@example.com"}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Chip size="sm" variant="soft" color="accent">{user?.role || "管理员"}</Chip>
                  <Chip size="sm" variant="soft" color={user?.status === "active" ? "success" : "default"}>
                    {user?.status === "active" ? "正常" : "停用"}
                  </Chip>
                </div>
              </div>
            </div>

            {/* Detail fields / 详细字段 */}
            <div className="mt-6 space-y-3 border-t border-border pt-4">
              {[
                { label: "用户名", value: user?.username || "admin" },
                { label: "邮箱", value: user?.email || "admin@example.com" },
                { label: "角色", value: user?.role || "管理员" },
                { label: "账号状态", value: user?.status === "active" ? "正常" : "停用" },
                { label: "账号 ID", value: user?.id || "1" },
                { label: "创建时间", value: user?.createdAt || "2026-01-01" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-foreground-500">{item.label}</span>
                  <span className="text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* WeChat QR code card / 微信二维码卡片 */}
        <Card className="p-6">
          <Card.Content>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <Smartphone size={20} className="text-success" />
                <h3 className="text-base font-semibold text-foreground">微信二维码</h3>
              </div>
              <p className="text-sm text-foreground-500">扫一扫二维码添加微信</p>

              {/* QR code display / 二维码展示 */}
              <div className="rounded-xl border-4 border-white bg-white p-2 shadow-md">
                <img src={wechatQrCode} alt="微信二维码" className="h-48 w-auto object-contain" />
              </div>

              <p className="text-xs text-foreground-400">
                请使用微信扫描上方二维码添加联系人
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </BuiPage>
  );
};

export function Component() { return <ProfilePage />; }
