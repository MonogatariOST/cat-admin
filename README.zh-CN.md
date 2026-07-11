# CatAdmin

> 基于 React 19 + HeroUI v3 的现代化后台管理系统。

CatAdmin 是一套功能完整的后台管理界面，包含权限管理、内容管理、数据可视化等模块，
适合作为 SaaS 后台、企业内部管理系统或学习项目的起点。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 19 + TypeScript 6 |
| 构建工具 | Vite 8 |
| UI 组件库 | HeroUI v3 (@heroui/react + @heroui/styles) |
| 样式方案 | Tailwind CSS v4 (@tailwindcss/vite) |
| 路由 | react-router v8 |
| 状态管理 | Jotai |
| HTTP 客户端 | axios |
| 图表 | @visx (group, shape, scale, curve) |
| 图标 | Lucide, Heroicons, Gravity UI Icons |
| 字体 | @fontsource/noto-sans-sc (自托管) |
| 代码规范 | ESLint 10 + typescript-eslint |
| 包管理器 | pnpm |

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm >= 9

### 安装与启动

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在 [http://localhost:5173](http://localhost:5173)。

### 构建与检查

```bash
pnpm build    # TypeScript 检查 + Vite 构建
pnpm lint     # ESLint 全量检查
pnpm preview  # 预览构建产物
```

### 登录凭证

开发环境提供模拟登录接口，默认账号：

| 用户名 | 密码 |
|--------|------|
| admin | admin123 |

## 项目结构

```
cat-admin/
+-- _backups/               修改前自动备份（自动生成）
+-- public/                 公共静态资源
+-- src/
|   +-- api/                HTTP 请求层
|   |   +-- request.ts      axios 实例与拦截器
|   |   +-- index.ts        统一导出入口
|   |   +-- {module}/       业务模块（auth, user, articles 等）
|   +-- assets/             静态资源（图片、字体）
|   +-- components/
|   |   +-- baseui/         基础 UI 组件
|   |   |   +-- bui-table/          表格（排序、多选）
|   |   |   +-- bui-page/          页面容器
|   |   |   +-- bui-toolbar/       列表工具栏（左操作右筛选）
|   |   |   +-- bui-error-boundary/ 错误边界
|   |   +-- serviceui/      业务 UI 组件
|   |       +-- sui-file-upload/    拖拽上传
|   |       +-- sui-rich-text/      富文本编辑器
|   |       +-- sui-steps/          步骤条
|   |       +-- sui-timeline/       时间线
|   |       +-- sui-data-export/    数据导出
|   +-- hooks/              自定义 Hook
|   |   +-- use-auth.ts     认证
|   |   +-- use-theme.ts    暗黑模式
|   |   +-- use-auto-rows.ts 自动行高
|   +-- layouts/            布局组件
|   |   +-- main-layout.tsx 主布局（侧边栏 + 顶部栏 + 内容区）
|   |   +-- auth-layout.tsx 登录/注册布局
|   +-- routes/             路由配置
|   |   +-- index.ts        路由汇总
|   |   +-- guards.tsx      路由守卫
|   |   +-- route-elements.tsx 错误页（404, 403, 500）
|   |   +-- {module}/       模块路由（dashboard, user, articles 等）
|   +-- stores/             Jotai 全局状态
|   |   +-- auth/           用户信息、Token
|   |   +-- page-title/     页面标题上下文
|   +-- types/              TypeScript 类型定义
|   +-- views/              页面组件（按模块分目录）
|   |   +-- dashboard/      概览 + 分析
|   |   +-- user/           用户列表 + 详情
|   |   +-- articles/       文章管理
|   |   +-- roles/          角色管理
|   |   +-- permissions/    权限管理
|   |   +-- classes/        班级管理
|   |   +-- classrooms/     教室管理
|   |   +-- courses/        课程管理
|   |   +-- teachers/       老师管理
|   |   +-- audit-log/      审计日志
|   |   +-- kanban/         任务看板
|   |   +-- forms/          表单示例
|   |   +-- advanced-table/ 高级表格
|   |   +-- profile/        个人信息
|   |   +-- settings/       账号设置
|   |   +-- errors/         403 / 404 / 500 页面
|   +-- App.tsx             根组件
|   +-- main.tsx            入口文件
|   +-- main.css            全局样式
|   +-- index.css           Tailwind 指令
|   +-- theme.css           HeroUI CSS 变量主题
+-- .env                    环境变量
+-- .env.development
+-- .env.production
+-- eslint.config.js        ESLint 配置
+-- vite.config.ts          Vite 配置
+-- tsconfig.json           TypeScript 基础配置
+-- tsconfig.app.json       TypeScript 应用配置
+-- tsconfig.node.json      TypeScript Node 配置
+-- index.html              HTML 入口
+-- AGENTS.md               Codex 代理规则
+-- package.json
+-- pnpm-lock.yaml
```

## 功能模块

### 已完成

- **登录认证** - Jotai 管理 Token，模拟登录接口，路由守卫保护
- **仪表盘** - 概览页（Visx 柱状图）+ 分析页
- **用户管理** - 列表（搜索、筛选、多选、分页）+ 详情弹窗
- **文章管理** - 富文本编辑、标签管理、数据导出
- **角色与权限** - 角色 CRUD、权限树展示
- **教学管理** - 课程、老师、班级、教室的列表管理
- **审计日志** - 时间线展示、类型筛选
- **任务看板** - 可拖拽卡片
- **表单示例** - 基础表单（验证）+ 高级表单
- **高级表格** - 列显隐切换、排序、数据导出
- **错误页面** - 403、404、500
- **个人信息** - 头像、微信二维码
- **暗黑模式** - 主题切换，持久化到 localStorage
- **响应式** - 桌面侧边栏 + 移动端抽屉

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| VITE_API_BASE_URL | API 基础地址 | /api |
| VITE_API_TIMEOUT | 请求超时 (ms) | 10000 |
| VITE_APP_TITLE | 应用显示名称 | CatAdmin |
| VITE_AUTH_TOKEN_KEY | Token 存储键名 | auth_token |

## 开发说明

本项目通过 AGENTS.md 文件定义代码规范和 Codex 代理行为准则，
包括命名规范（kebab-case）、组件设计原则、目录结构、备份规则等。

> 配置文件（eslint.config.js、vite.config.ts、tsconfig*.json、package.json）
> 未经用户明确许可不得修改。
