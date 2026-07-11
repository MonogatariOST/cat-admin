# CatAdmin

[Readme in Chinese](README.zh-CN.md)

> A modern admin dashboard built with React 19, HeroUI v3 and Tailwind CSS v4.
> 基于 React 19 + HeroUI v3 的现代化后台管理系统。

CatAdmin is a full-featured admin panel template with role management, content management,
data visualization, and more. Ready for SaaS backends, enterprise internal tools, or learning projects.

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | React 19 + TypeScript 6 |
| Build tool | Vite 8 |
| UI library | HeroUI v3 (@heroui/react + @heroui/styles) |
| Styling | Tailwind CSS v4 (@tailwindcss/vite) |
| Routing | react-router v8 |
| State management | Jotai |
| HTTP client | axios |
| Charts | @visx (group, shape, scale, curve) |
| Icons | Lucide, Heroicons, Gravity UI Icons |
| Font | @fontsource/noto-sans-sc (self-hosted) |
| Linting | ESLint 10 + typescript-eslint |
| Package manager | pnpm |

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Install & Run

```bash
pnpm install
pnpm dev
```

The dev server starts at [http://localhost:5173](http://localhost:5173).

### Build & Lint

```bash
pnpm build    # TypeScript check + Vite build
pnpm lint     # ESLint full check
pnpm preview  # Preview production build
```

### Demo Login

The project includes a mock login API for development:

| Username | Password |
|----------|----------|
| admin | admin123 |

## Project Structure

```
cat-admin/
+-- _backups/               Pre-edit file backups (auto-generated)
+-- public/                 Public static assets
+-- src/
|   +-- api/                HTTP request layer
|   |   +-- request.ts      axios instance & interceptors
|   |   +-- index.ts        Barrel export
|   |   +-- {module}/       Business modules (auth, user, articles, etc.)
|   +-- assets/             Static assets (images, fonts)
|   +-- components/
|   |   +-- baseui/         Base UI components
|   |   |   +-- bui-table/         Table (sorting, multi-select)
|   |   |   +-- bui-page/          Page container
|   |   |   +-- bui-toolbar/       List toolbar (actions left, filters right)
|   |   |   +-- bui-error-boundary/ Error boundary
|   |   +-- serviceui/      Business UI components
|   |       +-- sui-file-upload/   Drag-and-drop upload
|   |       +-- sui-rich-text/     Rich text editor
|   |       +-- sui-steps/         Step indicator
|   |       +-- sui-timeline/      Timeline
|   |       +-- sui-data-export/   Data export
|   +-- hooks/              Custom React hooks
|   |   +-- use-auth.ts     Authentication
|   |   +-- use-theme.ts    Dark mode
|   |   +-- use-auto-rows.ts Auto row height
|   +-- layouts/            Layout components
|   |   +-- main-layout.tsx Main layout (sidebar + header + content)
|   |   +-- auth-layout.tsx Auth pages layout
|   +-- routes/             Route configuration
|   |   +-- index.ts        Route aggregation
|   |   +-- guards.tsx      Route guards (RequireAuth)
|   |   +-- route-elements.tsx Error pages (404, 403, 500)
|   |   +-- {module}/       Module routes (dashboard, user, articles, etc.)
|   +-- stores/             Jotai global state
|   |   +-- auth/           User info, token
|   |   +-- page-title/     Page title context
|   +-- types/              TypeScript type definitions
|   +-- views/              Page components (organized by module)
|   |   +-- dashboard/      Overview + Analytics
|   |   +-- user/           User list + Detail
|   |   +-- articles/       Article management
|   |   +-- roles/          Role management
|   |   +-- permissions/    Permission management
|   |   +-- classes/        Class management
|   |   +-- classrooms/     Classroom management
|   |   +-- courses/        Course management
|   |   +-- teachers/       Teacher management
|   |   +-- audit-log/      Audit log
|   |   +-- kanban/         Task kanban board
|   |   +-- forms/          Form examples
|   |   +-- advanced-table/ Advanced table demo
|   |   +-- profile/        User profile
|   |   +-- settings/       Account settings
|   |   +-- errors/         403 / 404 / 500 pages
|   +-- App.tsx             Root component
|   +-- main.tsx            Entry point
|   +-- main.css            Global styles
|   +-- index.css           Tailwind directives
|   +-- theme.css           HeroUI CSS variable theme
+-- .env                    Environment variables
+-- .env.development
+-- .env.production
+-- eslint.config.js        ESLint flat config
+-- vite.config.ts          Vite config
+-- tsconfig.json           TypeScript base config
+-- tsconfig.app.json       TypeScript app config
+-- tsconfig.node.json      TypeScript Node config
+-- index.html              HTML entry
+-- AGENTS.md               Codex agent rules
+-- package.json
+-- pnpm-lock.yaml
```

## Features

### Completed

- **Authentication** - Jotai token management, mock login API, route guard
- **Dashboard** - Overview with Visx bar chart + Analytics page
- **User Management** - List with search, filter, multi-select, pagination; detail and edit modal
- **Article Management** - Rich text editing, tag management, data export
- **Roles & Permissions** - Role CRUD, permission tree display
- **Teaching Management** - Courses, teachers, classes, classrooms CRUD
- **Audit Log** - Timeline view with type filtering
- **Task Kanban** - Drag-and-drop cards
- **Forms** - Basic form with validation, advanced form examples
- **Advanced Table** - Column visibility toggle, sorting, data export
- **Error Pages** - 403, 404, 500
- **User Profile** - Avatar, QR code
- **Dark Mode** - Theme toggle, persisted to localStorage
- **Responsive** - Desktop sidebar + mobile drawer

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | API base URL | /api |
| VITE_API_TIMEOUT | Request timeout (ms) | 10000 |
| VITE_APP_TITLE | App display name | CatAdmin |
| VITE_AUTH_TOKEN_KEY | Token localStorage key | auth_token |

## Development Notes

This project uses AGENTS.md to define code conventions and Codex agent behavior rules,
including naming conventions (kebab-case), component design principles, directory structure,
backup rules, and more.

> Config files (eslint.config.js, vite.config.ts, tsconfig*.json, package.json) should
> not be modified unless explicitly requested by the user.
