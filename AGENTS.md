<!-- PROJECT-INFO-START -->
## 项目信息 (Project Info)

### 技术栈 (Tech Stack)

- **框架**: React 19 + TypeScript 6
- **构建工具**: Vite 8
- **UI 组件库**: HeroUI v3 (`@heroui/react` + `@heroui/styles`)
- **图标库**: Lucide (lucide-react), Heroicons (@heroicons/react), Gravity UI Icons (@gravity-ui/icons)
- **样式方案**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **包管理器**: pnpm
- **路由库**: react-router (v8)
- **代码规范**: ESLint 10 (flat config), `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **语言环境**: 浏览器端 (ESM)

### 目录结构 (Directory Structure)

```
hero-admin/
├── src/
│   ├── assets/         # 静态资源（图片、svg 等）
│   ├── App.tsx         # 根组件
│   ├── App.css
│   ├── main.tsx        # 入口文件
│   ├── main.css
│   └── index.css
├── public/             # 公共静态资源
├── .agents/            # 代理技能与配置
├── .heroui-docs/       # HeroUI 文档缓存
├── eslint.config.js    # ESLint 扁平化配置
├── vite.config.ts      # Vite 构建配置
├── tsconfig.json       # TypeScript 基础配置
├── tsconfig.app.json   # TypeScript 应用配置
├── tsconfig.node.json  # TypeScript Node 配置
├── index.html          # HTML 入口
└── package.json
```

新增功能性组件/页面时，应在 `src/` 下创建对应目录，保持层级扁平。
<!-- PROJECT-INFO-END -->

<!-- BACKUP-RULES-START -->
## 备份规则 (Backup Rules)

每次对文件进行修改之前，必须执行以下备份流程：

1. 检查项目根目录下是否存在 `_backups` 文件夹，如果不存在则创建
2. 获取当前日期，格式为 `YYYYMMDD`（例如 `20260709`），作为日期文件夹名
3. 获取当前时间，格式为 `HHmmss`（例如 `200000` 代表 20:00:00），作为时间文件夹名
4. 在 `_backups/YYYYMMDD/HHmmss/` 下创建与原始文件相同的目录层级
5. 将本次要修改的所有文件复制到备份目录中对应的位置

备份路径示例：`_backups/20260709/200000/src/components/Button.tsx`

注意：备份应在修改文件之前完成，确保备份的是修改前的原始内容。
<!-- BACKUP-RULES-END -->

<!-- ESLINT-RULES-START -->
## ESLint 规范规则 (ESLint Rules)

本项目使用 ESLint 进行代码规范检查，所有代码修改必须遵守以下规则：

1. 每次对文件进行修改时，修改后的代码必须符合 ESLint 规范
2. 严禁使用 `eslint-disable` 或 `eslint-disable-next-line` 等注释来绕过检查
3. 在每次对话结束前，必须运行 ESLint 检查验证所有修改过的文件是否通过
4. 如果 ESLint 检查未通过，必须修复代码直到完全通过，不得通过禁用规则来掩盖问题
<!-- ESLINT-RULES-END -->

<!-- HEROUI-USAGE-RULES-START -->
## HeroUI 复用规则 (HeroUI Reuse Rules)

严禁重复实现 HeroUI 已提供的功能，必须优先使用 HeroUI 组件，具体规则如下：

1. **优先使用 HeroUI**：所有 UI 功能应优先使用 `@heroui/react` 提供的组件实现，包括但不限于 Button、Input、Select、Modal、Table、Form、Dropdown、Toast 等
2. **不得重复造轮子**：如果 HeroUI 已有现成组件，严禁自行编写样式或功能替代方案
3. **自定义业务组件**：经验证 HeroUI 确实无法满足需求时，才实现自定义业务组件，且必须放在 `src/components/` 目录下
4. **serviceui 结构**：在 `src/components/serviceui/` 下创建自定义业务组件，以 `sui-xxx` 命名组件文件夹（例如 `sui-data-table`、`sui-chart-panel`），遵循以下结构：
   ```
   src/components/serviceui/
   ├── index.ts                    # 导出所有 serviceui 组件
   ├── sui-data-table/
   │   ├── index.ts                # 导出当前组件
   │   └── SuiDataTable.tsx
   ├── sui-chart-panel/
   │   ├── index.ts
   │   └── SuiChartPanel.tsx
   └── ...
   ```
5. **入口导出**：`src/components/serviceui/index.ts` 统一导出所有组件（`export { SuiDataTable } from './sui-data-table'`），每个组件文件夹内的 `index.ts` 负责导出该组件（`export { SuiDataTable } from './SuiDataTable'`）
7. **组件命名**：以 Sui 作为组件前缀（如 `SuiDataTable`、`SuiChartPanel`），文件夹名与组件名对应
<!-- HEROUI-USAGE-RULES-END -->

<!-- BASEUI-RULES-START -->


> **组织结构**：`src/components/` 目录下不再包含 `index.ts`。
> BaseUI 组件通过 `src/components/baseui/index.ts` 导出，ServiceUI 组件通过 `src/components/serviceui/index.ts` 导出。
> 各视图文件直接从对应目录导入所需组件（如 `import { BuiPage } from "../../components/baseui"`）。
## 基础 UI 组件复用规则 (Base UI Reuse Rules)

在 HEROUI 组件之上封装一层基础 UI 组件（BaseUI），提供更便利的 API 和默认行为，避免在每个页面重复编写相同的组合逻辑。具体规则如下：

1. **封装原则**：当多个页面重复使用同一 HEROUI 组件的组合模式（例如 Table + ScrollContainer + 固定表头布局）时，应封装为 BaseUI 组件，放在 src/components/baseui/ 目录下
2. **目录结构**：在 src/components/baseui/ 下创建组件文件夹，以 ui-xxx 命名（kebab-case）
   `
   src/components/baseui/
   +-- index.ts
   +-- bui-table/
   |   +-- index.ts
   |   +-- bui-table.tsx
   +-- ...
   `
3. **组件命名**：以 Bui 作为组件前缀（如 BuiTable），文件夹名与组件名对应
4. **Props 类型**：Props 类型统一使用 interface 声明，命名格式为 BuiXxxProps，声明在组件文件顶部
5. **泛型支持**：BaseUI 组件应支持泛型（如 BuiTable<T>），不绑定具体数据类型
6. **入口导出**：src/components/baseui/index.ts 统一导出所有组件（export { BuiTable } from ./bui-table），每个组件文件夹内的 index.ts 负责导出该组件（export { BuiTable } from ./bui-table）
7. **不可混用**：BaseUI 组件应只封装一层 HEROUI 组件，不包含业务逻辑。带有业务逻辑的组件应放在 serviceui 目录下
<!-- BASEUI-RULES-END -->


<!-- COMPONENT-RULES-START -->
## 组件设计规则 (Component Design Rules)

规范 React 组件的定义方式、Props 声明和结构模式，具体规则如下：

1. **Props 类型**：Props 类型统一使用 `interface` 声明（不使用 `type`），命名格式为组件名 + `Props`（示例：`UserCardProps`），声明在组件文件顶部
2. **ForwardRef**：需要对外暴露 DOM 引用的组件（如表单输入、Modal、Tooltip 包装）使用 `forwardRef` 包裹，并同时导出对应的 Ref 类型
3. **Children 类型**：`children` 统一使用 `React.ReactNode` 类型，仅在需约束子元素数量或类型时使用更具体的类型
4. **职责单一**：每个组件只负责一个功能域；单文件超过 300 行或关注点超过 3 个时，应拆分为更小的子组件
5. **渲染优化**：频繁重渲染的场景（列表项、实时数据面板）使用 `React.memo` 包裹纯展示组件，回调使用 `useCallback` 或 `useMemo` 稳定引用
6. **默认 Props**：使用默认解构值（`const Card = ({ title = "默认标题", size = "md" }: CardProps) => ...`），不依赖 `defaultProps`
7. **自定义 Hook**：涉及数据获取、表单逻辑、浏览器 API 等可复用逻辑优先抽取为自定义 Hook（放在 `src/hooks/` 目录下），保持组件代码简洁
<!-- COMPONENT-RULES-END -->

<!-- TYPESCRIPT-RULES-START -->
## TypeScript 类型约定 (TypeScript Conventions)

规范 TypeScript 类型定义的组织方式和使用习惯，具体规则如下：

1. **类型文件位置**：所有共享类型定义集中放在 `src/types/` 目录下，按模块拆分为独立文件
   ```
   src/types/
   ├── index.ts              # 全局共享类型导出入口
   ├── user.ts               # 用户模块类型
   ├── api.ts                # API 通用类型（分页、请求/响应包装等）
   ├── common.ts             # 通用类型工具
   └── ...
   ```
2. **Props 类型就近声明**：组件 Props 类型就近声明在组件文件中（命名 `XxxProps`），仅在多个组件间共享时才提取到 `src/types/`
3. **interface 与 type 的选择**：
   - `interface` 用于描述对象结构，支持扩展（`extends`）
   - `type` 用于联合类型（`|`）、交叉类型（`&`）、工具类型（`Pick`、`Omit` 等）、元组、基本类型别名
4. **命名规范**：
   - 接口：`PascalCase`，无 `I` 前缀（示例：`UserProfile`、`ApiResponse`）
   - 类型别名：`PascalCase`（示例：`UserRole`、`Nullable<T>`）
   - 枚举：`PascalCase`，枚举值使用 `PascalCase`（示例：`Role.Admin`）
   - Props 类型：组件名 + `Props` 后缀（示例：`UserCardProps`）
   - API 请求/响应：`XxxRequest` / `XxxResponse`
5. **严格模式**：禁用 `any` 类型，无法确定类型时使用 `unknown` 并配合类型守卫收窄
6. **泛型命名**：泛型参数使用大写单字母（`T`、`U`、`V`）或有含义的大写驼峰（`TData`、`TResponse`）
7. **类型导出**：类型定义使用 `export` 关键字直接导出，禁止在单独的文件底部统一导出
<!-- TYPESCRIPT-RULES-END -->

<!-- NAMING-RULES-START -->
## 命名规范 (Naming Conventions)

所有目录名和文件名统一使用 `kebab-case`，具体规则如下：

1. **目录命名**：所有目录统一使用 `kebab-case`（示例：`user-profile/`、`data-table/`、`service-ui/`），保持小写 + 连字符风格
2. **文件命名**：所有文件基础名（不含扩展名）统一使用 `kebab-case`，扩展名保持原有格式：
   - 组件文件：`user-card.tsx`、`dashboard-panel.tsx`（组件内部导出名仍为 PascalCase：`UserCard`、`DashboardPanel`）
   - Hook 文件：`use-auth.ts`、`use-pagination.ts`（Hook 内部导出名仍为 useXxx：`useAuth`、`usePagination`）
   - 工具函数文件：`format-date.ts`、`parse-url.ts`（内部导出名仍为 camelCase：`formatDate`、`parseUrl`）
   - 类型定义文件：`user.ts`、`api.ts`
   - API 模块文件：`request.ts`、`user-api.ts`
3. **内部导出名不受影响**：文件内部的导出标识符仍遵循各自的语言/框架惯例（React 组件用 PascalCase、Hook 用 `useXxx`、工具函数用 camelCase），仅文件系统层面的名称统一为 `kebab-case`
4. **常量与枚举**：全局常量使用 `UPPER_SNAKE_CASE`（示例：`MAX_RETRY_COUNT`、`API_BASE_URL`），模块级常量使用 `camelCase`
5. **CSS 类名**：使用 kebab-case（Tailwind 风格自动适配）
<!-- NAMING-RULES-END -->

<!-- CODE-SPLITTING-RULES-START -->
## 代码拆分规则 (Code Splitting Rules)

严禁将所有代码堆入同一个文件中，必须合理拆分文件并进行分包，具体规则如下：

1. **按功能/领域拆分**：每个组件、页面、hook、工具函数均应独立成文件，文件名与导出内容对应（如 `useAuth.ts` 导出 `useAuth`）
2. **单文件职责单一**：一个文件只做一件事。组件文件只包含组件定义和该组件专用的小型辅助逻辑；通用工具函数、类型定义、常量、API 调用等应分别抽取到独立目录
3. **分包策略**：使用 Vite 的路由懒加载（`React.lazy` + `import()`）按页面分包，避免首屏加载全量代码
4. **目录层级扁平**：`src/` 下按业务模块创建子目录（如 `src/components/`、`src/pages/`、`src/hooks/`、`src/utils/`、`src/api/`、`src/types/` 等），每个模块目录下按文件拆分，不嵌套超过 3 层
5. **公共模块提取**：多个组件共享的代码（类型、常量、工具函数、API 封装）必须提取到公共目录下复用，禁止复制粘贴
<!-- CODE-SPLITTING-RULES-END -->

<!-- API-RULES-START -->
## API 请求规则 (API Request Rules)

使用 axios 封装 HTTP 请求层，统一管理请求、响应和错误处理，具体规则如下：

1. **请求封装**：在 `src/api/` 下创建一个 `request.ts`（或 `http.ts`）作为 axios 实例封装，统一配置 baseURL、超时时间、请求/响应拦截器
2. **模块化组织**：`src/api/` 下按业务模块创建子目录，每个模块目录内包含一个 `index.ts` 作为该模块的 API 入口，如果模块复杂可额外拆分文件
   ```
   src/api/
   ├── request.ts              # axios 实例封装
   ├── user/
   │   └── index.ts            # 用户模块 API
   ├── dashboard/
   │   ├── index.ts            # 看板模块 API 入口
   │   └── charts.ts           # 图表相关 API（可选拆分）
   └── ...
   ```
3. **错误处理**：axios 实例的响应拦截器中统一处理业务错误，默认从 `response.data.message` 中读取错误信息，并支持在实例化时通过参数自定义消息字段名（如 `errorMessageField: 'message'`）
4. **Loading 状态**：数据加载过程中使用 HeroUI 的 `<Skeleton>` 组件展示骨架屏，替代传统的 loading spinner；每个列表/详情区域应有对应的骨架屏组件
5. **请求/响应类型**：每个 API 模块文件应定义对应的请求参数类型和响应数据类型，导出给组件使用
<!-- API-RULES-END -->

<!-- STATE-RULES-START -->
## 全局状态管理规则 (State Management Rules)

使用 Jotai 管理全局状态，按模块组织状态文件，具体规则如下：

1. **状态目录结构**：所有全局状态文件集中放在 `src/stores/` 目录下，按业务模块创建对应的子目录
   ```
   src/stores/
   ├── index.ts              # 全局状态导出入口
   ├── auth/
   │   └── index.ts          # 认证状态（用户信息、Token 等）
   ├── theme/
   │   └── index.ts          # 主题状态（暗黑模式、主题色等）
   └── sidebar/
       └── index.ts          # 侧边栏状态（展开/折叠）
   ```
2. **Atom 命名**：使用 `camelCase` + `Atom` 后缀（示例：`userAtom`、`themeAtom`、`isSidebarOpenAtom`），导出时直接导出原子值
3. **派生状态**：使用 `atom(get => ...)` 或 `atom((get, set) => ...)` 定义派生状态，将计算逻辑集中在 stores 层，避免在组件中重复推导
4. **读写分离**：只读原子和可写原子分开定义；修改共享状态的逻辑封装在 stores 模块中（导出自定义修改函数），不在组件中直接调用 `useSetAtom` 写入复杂状态
5. **异步状态**：使用 `atomWithQuery`（配合 TanStack Query）或 `loadable` 处理异步数据
6. **模块导出**：每个模块文件夹的 `index.ts` 导出该模块所有原子和操作函数，`src/stores/index.ts` 汇总导出所有模块
<!-- STATE-RULES-END -->

<!-- ROUTING-RULES-START -->
## 路由组织规则 (Routing Organization Rules)

使用 `react-router` 管理路由，按模块分组组织，支持路由守卫和懒加载，具体规则如下：

1. **路由目录结构**：所有路由配置集中放在 `src/routes/` 目录下，按模块分文件夹组织：
   ```
   src/routes/
   ├── index.ts                    # 主路由汇总，定义路由守卫和顶层路由布局
   ├── guards.ts                   # 路由守卫（认证、权限等）
   ├── dashboard/
   │   ├── index.ts                # 看板模块路由汇总
   │   ├── overview.tsx            # 概览页路由（懒加载组件）
   │   └── analytics.tsx           # 分析页路由
   ├── user/
   │   ├── index.ts                # 用户模块路由汇总
   │   ├── list.tsx                # 用户列表页路由
   │   └── detail.tsx              # 用户详情页路由（含嵌套子路由）
   └── ...
   ```
2. **模块路由汇总**：每个模块文件夹的 `index.ts` 导出该模块下的所有路由配置（`RouteObject` 数组），支持嵌套路由在模块内通过子文件进一步拆分
3. **主路由汇总**：`src/routes/index.ts` 汇总所有模块路由，配置路由守卫、布局组件包裹、404 页面等全局逻辑——更换项目时只需替换此文件和模块文件夹即可复用整体路由架构
4. **路由守卫**：守卫逻辑集中写在 `guards.ts` 中，具备通用性——通过高阶组件或组件封装（`RequireAuth`、`RequirePermission`）实现，可在主路由汇总的 `loader` 或组件级守卫中调用
5. **通用性要求**：路由架构应与项目业务解耦，做到新项目只需复制 `src/routes/` 并替换模块文件和守卫接入点即可使用
6. **懒加载**：每个页面使用 `React.lazy(() => import('./xxx'))` 实现按需加载，配合 `<Suspense>` 展示骨架屏
<!-- ROUTING-RULES-END -->

<!-- LAYOUT-PAGE-RULES-START -->
## Layout 与 Page 封装规则 (Layout & Page Component Rules)

为保证页面视觉一致性，必须封装 Layout 和 Page 组件配合使用：

1. **Layout 封装**：在 `src/layouts/` 下定义布局组件（如 `MainLayout`、`AuthLayout`），统一管理导航栏、侧边栏、页脚、内容区容器等公共结构
2. **Page 封装**：在封装 Layout 时，建议同步封装一个 `Page` 组件（可放在 `src/components/` 或每个 Layout 目录下），作为页面级内容容器，统一管理以下页面公共逻辑：
   - 页面标题 `title`
   - 页面内边距 `padding`
   - 页面最大宽度 `maxWidth`
   - 面包屑 `breadcrumbs`
3. **使用方式**：每个页面路由组件按 `Page` 组件包裹具体内容，保持每个页面的间距、标题层级、布局行为一致
4. **层级关系**：`Layout > Page > 页面具体内容`，Layout 负责整体框架，Page 负责内容区域内的一致性
<!-- LAYOUT-PAGE-RULES-END -->


<!-- TOOLBAR-LAYOUT-RULES-START -->
## 工具栏布局规则 (Toolbar Layout Rules)

在后台管理系统的列表页中，操作按钮（新建、导出、批量删除等）和筛选条件（搜索框、下拉菜单等）的布局遵循以下规则：

1. **标准布局：左操作右筛选** — 操作按钮排在左侧，筛选条件排在右侧，使用 `justify-between` 撑开两组内容。具体布局如下：
   ```
   [新建] [导出] [批量删除]          [搜索...] [状态筛选] [日期筛选]
   ```

2. **左侧放操作按钮的理由**：
   - **阅读顺序**：用户从左到右阅读，优先看到最重要的操作（新建、新增等核心行为）
   - **层级关系**：操作按钮是对数据的"行为"，优先级高于"筛选"，放在左侧更突出
   - **Fitts 定律**：左边缘是屏幕的自然起始点，用户容易快速定位

3. **右侧放筛选条件的理由**：
   - **辅助性质**：筛选是"缩小范围"的辅助功能，不是主操作，放在右侧不抢占视觉焦点
   - **与内容对齐**：表格/列表的列头通常也有筛选图标在右侧，上下呼应，视觉流自然
   - **搜索习惯**：用户习惯在右上角找搜索框，符合多数网站的设计惯例

4. **可互换的例外场景**：当页面的核心场景是以搜索/筛选为主（如日志查看器、数据分析报表），可以交换布局：
   ```
   [搜索框] [时间范围] [状态筛选]          [新建] [导出]
   ```
   此时筛选是用户的主要操作，新建反而变成次要功能。

5. **通用判断原则**：
   - 高频 > 低频：更常用的功能放左边
   - 主要 > 辅助：核心操作放左边，辅助功能放右边
   - 新建/创建类操作永远在最左：这是几乎所有后台系统的默认约定

6. **实现方式**：使用 BaseUI 的 `BuiToolbar` 组件封装工具栏布局，所有列表页统一使用该组件，修改布局只需改组件本身：

   **标准布局（左操作右筛选）**：
   ```tsx
   import { BuiToolbar } from "../../components/baseui";

   <BuiToolbar
     left={<Button>新建</Button>}
     right={<><SearchField /><Select /></>}
   />
   ```

   **反转布局（左筛选右操作）**——改 `reverse` 即可，无需动页面：
   ```tsx
   <BuiToolbar
     reverse
     left={<SearchField />}
     right={<Button>新建</Button>}
   />
   ```

   组件位于 `src/components/baseui/bui-toolbar/`，接受 `left`、`right`、`reverse`、`className` 四个 prop。
   `reverse` 为 `true` 时交换左右两组的位置，无需改动每个页面的调用代码即可整体切换布局方向。
<!-- TOOLBAR-LAYOUT-RULES-END -->
<!-- ICON-RULES-START -->
## 图标使用规则 (Icon Usage Rules)

必须从 `lucide-react`、`@heroicons/react` 或 `@gravity-ui/icons` 图标库中挑选合适的图标，严禁自绘 SVG 图标替代，具体规则如下：

1. **有 HeroUI 示例时优先 Lucide**：若当前组件在 HeroUI 文档中存在使用示例且示例中使用了图标，应优先使用 `lucide-react`（与 HeroUI 官方示例保持一致）
2. **无 HeroUI 示例时选 Heroicons 或 Gravity UI**：若 HeroUI 文档无此组件示例或不涉及图标，可根据需要选用 `@heroicons/react` 或 `@gravity-ui/icons`
3. **同一区域风格统一**：同一视觉区域或同一组件集合内（如侧边导航栏、同一表格的操作列、同一表单的按钮组），必须且只能使用同一个图标库的图标，严禁混用不同图标库造成风格不一致
4. **禁止自绘图标**：严禁手动编写 SVG 路径或使用内联 SVG 作为功能图标（三个图标库均不包含的极特殊场景除外）
5. **引入方式**：使用 Tree-shakable 的命名导入方式，例如：
   - `import { Search } from "lucide-react"`
   - `import { AcademicCapIcon } from "@heroicons/react/24/outline"`
   - `import { Gear } from "@gravity-ui/icons"`
6. **命名规范**：
   - Lucide：PascalCase（如 `Search`、`Menu`、`X`），确保与 `lucide-react` 的导出名完全一致
   - Heroicons：PascalCase + `Icon` 后缀（如 `MagnifyingGlassIcon`、`UserCircleIcon`），确保与 `@heroicons/react` 的导出名完全一致
   - Gravity UI Icons：PascalCase（如 `Gear`、`ArrowRight`），确保与 `@gravity-ui/icons` 的导出名完全一致
<!-- ICON-RULES-END -->

<!-- COMMENT-RULES-START -->
## 代码注释规则 (Code Comment Rules)

所有编写或更新的代码必须包含详尽注释，遵循以下规则：

1. **注释必须详尽**：每个函数、组件、关键逻辑块、复杂表达式、类型定义、API 调用、状态管理流程等都必须添加注释，说明其作用、参数含义、返回值、注意事项
2. **双语注释**：注释必须同时包含中文（用户当前使用的语言）和英语，二者缺一不可，格式为 `中文 / English`
    **注意**：此规则仅适用于代码注释（文件头部注释、函数说明、行内逻辑解释等），不适用于用户界面文本（页面标题、按钮文字、导航标签、提示信息等）。UI 文本应使用简体中文，无需附加英文翻译。
3. **特殊例外**：如果用户使用的语言本身就是英语，则注释只需要英语
4. **英语是通用语言**：英语作为国际通用技术语言，添加英语注释是为了确保来自全世界的程序员都能理解和共同维护代码
5. **注释位置**：函数/组件定义上方使用块注释（`/** ... */`），关键逻辑行使用行内注释（`// ...`），文件顶部应包含文件功能说明
6. **内容要求**：注释应解释"为什么这么做"而非"做了什么"，后者通过代码本身即可表达。遇到复杂算法、非直观的业务规则、工作区变通方案时，必须附上完整背景说明
<!-- COMMENT-RULES-END -->

<!-- ENCODING-TOOLS-RULES-START -->
## 文件编码与修改工具规则 (File Encoding & Modification Tool Rules)

为保证文件编码一致性和避免编码损坏，必须遵守以下规则：

1. **强制 UTF-8 编码**：项目中所有源文件（.ts、.tsx、.css、.json、.md、.html 等）必须使用 UTF-8 编码（无 BOM），严禁使用 GBK、GB2312、Latin-1、UTF-8 with BOM 等其他编码
2. **禁止使用 PowerShell 修改文件**：PowerShell 在处理 UTF-8 文件时存在编码问题（默认编码不一致、BOM 重复写入、@ 符号解析冲突等），严禁使用 PowerShell 直接读写项目源代码文件
3. **推荐使用 Node.js 或 Python 修改文件**：文件修改操作应优先使用以下方式：
   - Node.js `fs.readFileSync` / `fs.writeFileSync`（指定 `utf-8` 编码，无 BOM）
   - Python `pathlib.Path.read_text('utf-8')` / `write_text('utf-8')`
4. **避免混用不同系统的换行符**：修改文件时保持文件原有的换行符风格（LF 或 CRLF），不应随意混用或转换
<!-- ENCODING-TOOLS-RULES-END -->
<!-- TEMP-FILES-RULES-START -->
## 临时文件规则 (Temporary Files Rules)

规范临时文件的创建和清理流程，具体规则如下：

1. **统一存放位置**：所有临时文件（如调试脚本、临时测试文件等）必须创建在项目根目录下的 `_temps/` 文件夹中，严禁在 `src/`、`public/` 等源码目录中创建临时文件
2. **对话结束前清理**：每轮对话结束前，必须清理 `_temps/` 目录下所有文件，确保不留下任何临时文件
3. **命名规范**：临时文件名应具有描述性，便于识别用途（例如 `fix-detail-page.mjs`），避免使用无意义的名称
4. **.gitignore**：`_temps/` 目录已添加到 `.gitignore` 中，避免临时文件被提交到版本控制
<!-- TEMP-FILES-RULES-END -->


<!-- ENV-RULES-START -->
## 环境变量规则 (Environment Variables Rules)

规范环境变量的命名、组织和使用方式，具体规则如下：

1. **Vite 前缀**：所有前端环境变量必须使用 `VITE_` 前缀（Vite 强制要求，非 `VITE_` 前缀变量不会被注入到客户端代码）
2. **命名风格**：使用 `UPPER_SNAKE_CASE`，按分组有序排列（示例：`VITE_API_BASE_URL`、`VITE_API_TIMEOUT`、`VITE_APP_TITLE`）
3. **变量分组**：
   - `VITE_API_*`：API 相关（baseURL、超时时间、接口前缀）
   - `VITE_APP_*`：应用配置（站点名称、版本号、默认语言）
   - `VITE_AUTH_*`：认证相关（Token Key、登录页路径）
4. **环境文件**：使用 Vite 标准环境文件体系
   - `.env`：所有环境共享的默认变量
   - `.env.development`：开发环境
   - `.env.production`：生产环境
   - `.env.local`：本地覆盖（不提交到 Git，`.gitignore` 中已忽略）
5. **类型声明**：在 `src/types/env.d.ts` 中扩展 `ImportMetaEnv` 接口，确保所有环境变量有完整的 TypeScript 类型提示
6. **默认值**：在解构赋值时提供默认值，避免因环境变量缺失导致运行时错误
7. **敏感信息**：API 密钥等敏感信息放在 `.env.local` 中，禁止提交到 Git
<!-- ENV-RULES-END -->

<!-- ERROR-BOUNDARY-RULES-START -->
## 错误边界规则 (Error Boundary Rules)

使用 Error Boundary 捕获组件渲染层的异常，防止单个组件崩溃影响整个页面，具体规则如下：

1. **封装通用组件**：在 `src/components/` 下封装一个通用 `ErrorBoundary` 组件，支持自定义 fallback UI 和错误回调
2. **放置层级**：在路由级别和独立面板模块级别分别放置 Error Boundary——每个路由页面由 Error Boundary 包裹，模块内的独立面板也可单独包裹
3. **Fallback UI**：使用 HeroUI 的 `<Alert>` 组件作为默认降级 UI，展示错误提示和"重试"按钮；通过自定义 fallback prop 支持按场景覆盖
4. **错误回调**：Error Boundary 捕获错误后，通过回调将错误信息（错误名、消息、组件栈）传递出去用于上报，但不阻塞用户操作
5. **边界范围**：仅捕获渲染阶段的同步异常和生命周期错误，不捕获事件处理、异步代码和 SSR 中的错误
<!-- ERROR-BOUNDARY-RULES-END -->

确保所有 UI 组件具备良好的可访问性，遵循无障碍设计原则，具体规则如下：

1. **无标签则必加 aria-label / aria-labelledby**：任何交互式元素（按钮、图标按钮、输入框、链接等）如果没有可见文字标签，则必须添加 `aria-label` 或 `aria-labelledby` 属性，确保屏幕阅读器能够识别其用途
2. **SearchField 必须带 aria-label**：`<SearchField>` 组件必须始终包含 `aria-label` 属性（如 `aria-label="搜索用户"`），因为搜索框通常没有可见标签
3. **Select 必须关联标签**：`<Select>` 组件必须包含 `<Label>` 子组件，或在组件上直接设置 `aria-label` 属性（如 `aria-label="状态筛选"`），不可省略
4. **Modal / Drawer 必须带 aria-label**：`<Modal.Dialog>` 和 `<Drawer.Dialog>` 组件必须设置 `aria-label` 属性（如 `aria-label="新建用户"`），确保屏幕阅读器能识别弹窗用途
5. **表单控件关联标签**：所有表单控件（Input、Select、Textarea 等）必须关联对应的 `<label>` 元素，或使用 HeroUI 组件的 `label` prop 自动生成关联标签
6. **语义化结构**：优先使用语义化 HTML 元素（`<button>`、`<nav>`、`<main>`、`<aside>` 等），减少纯 `<div>` / `<span>` 构建的交互组件
7. **焦点管理**：Modal、Drawer、Dropdown 等弹出层组件打开时需自动聚焦到可聚焦元素（关闭按钮、确认按钮等），关闭时需将焦点归还到触发元素
8. **键盘导航**：所有交互元素必须支持键盘操作（Tab 导航、Enter/Space 激活、Escape 关闭等），HeroUI 组件默认支持无需额外处理
9. **颜色对比度**：文本与背景颜色对比度需符合 WCAG 2.1 AA 标准（常规文本 ≥ 4.5:1，大文本 ≥ 3:1），使用 HeroUI 默认颜色系统可保证基本对比度
10. **视觉状态反馈**：所有可交互元素需提供视觉提示（hover、focus、active、disabled 状态），HeroUI 组件默认包含这些状态样式
11. **图片替代文本**：所有 `<img>` 元素必须有 `alt` 属性，装饰性图片使用 `alt=""`（空 alt），信息性图片需提供有意义的描述文本
<!-- ACCESSIBILITY-RULES-END -->

<!-- TESTING-RULES-START -->
## 测试规则 (Testing Rules)

使用 Vitest + React Testing Library 编写测试，确保代码质量和可维护性，具体规则如下：

1. **测试框架**：使用 Vitest（与 Vite 生态一致）作为测试运行器，配合 `@testing-library/react` 进行组件测试，配合 `@testing-library/user-event` 模拟用户交互
2. **测试文件位置**：测试文件与源码文件相邻放置，命名为 `*.test.ts` 或 `*.test.tsx`
   ```
   src/
   ├── utils/
   │   ├── formatDate.ts
   │   └── formatDate.test.ts
   ├── api/
   │   └── user/
   │       ├── index.ts
   │       └── index.test.ts
   └── components/
       └── UserCard/
           ├── UserCard.tsx
           └── UserCard.test.tsx
   ```
3. **测试范围**：
   - 工具函数：必须覆盖核心逻辑的单元测试（正常输入、边界值、异常输入）
   - API 层：Mock axios 请求，验证请求参数和响应处理
   - 组件：覆盖渲染、用户交互、状态变化，避免测试实现细节
   - Hook：通过 `renderHook` 测试自定义 Hook 的逻辑
4. **测试内容要求**：
   - 工具函数测试：验证输入输出，包含正常路径和错误路径
   - 组件测试：验证渲染结果、用户交互后的状态变化、异步数据加载完成后的 UI
   - 避免测试内部实现细节（如 state 值或私有方法），只测外部行为
5. **Mock 策略**：外部依赖（API 请求、浏览器 API）使用 `vi.mock` 或 MSW 模拟，保持测试的确定性和独立性
6. **覆盖率**：核心模块（工具函数、API 层）的行覆盖率不低于 80%
<!-- TESTING-RULES-END -->

<!-- GIT-RULES-START -->
## Git 提交规范 (Git Commit Conventions)

统一 Git 提交消息、分支命名和协作流程，确保提交历史清晰可追溯，具体规则如下：

1. **提交消息格式**：使用 Conventional Commits 规范，格式为 `<type>(<scope>): <description>`
   - `feat`：新功能（示例：`feat(user): add user profile page`）
   - `fix`：Bug 修复（示例：`fix(api): handle 401 token expiry`）
   - `refactor`：重构（示例：`refactor(auth): extract useAuth hook`）
   - `chore`：工程配置变更（示例：`chore(deps): upgrade heroui to v3.2`）
   - `docs`：文档变更（示例：`docs: update api request rules`）
   - `style`：样式变更（示例：`style(sidebar): adjust spacing`）
   - `test`：测试相关（示例：`test(utils): add formatDate unit tests`）
2. **分支命名**：与提交类型对应，格式为 `<type>/<short-description>`
   - `feat/user-profile`、`fix/token-refresh`、`refactor/auth-hook`、`chore/upgrade-heroui`
3. **原子化提交**：一个 commit 只做一件事。不同功能、不同模块的变更应分多次提交，不混入同一个 commit
4. **Rebase 策略**：功能分支在合入主分支前执行 `git rebase main`，保持线性历史，避免产生合并节点
5. **不提交产物**：构建产物（`dist/`、`build/`）、编辑器配置（`.vscode/` 等）、操作系统文件（`Thumbs.db`、`.DS_Store`）必须写在 `.gitignore` 中，禁止强制提交
6. **提交前检查**：提交前确保代码通过 ESLint 检查（所有修改文件无 lint 错误）和类型检查（`tsc --noEmit`）
<!-- GIT-RULES-END -->

<!-- HEROUI-REACT-AGENTS-MD-START -->
llms-full.txt: https://heroui.com/react/llms-full.txt||
[HeroUI React v3 Docs Index]|root: ./.heroui-docs/react|STOP. What you remember about HeroUI React v3 is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: heroui agents-md --react --output AGENTS.md|.:{components\(buttons)\button-group.mdx,components\(buttons)\button.mdx,components\(buttons)\close-button.mdx,components\(buttons)\toggle-button-group.mdx,components\(buttons)\toggle-button.mdx,components\(collections)\dropdown.mdx,components\(collections)\list-box.mdx,components\(collections)\tag-group.mdx,components\(colors)\color-area.mdx,components\(colors)\color-field.mdx,components\(colors)\color-picker.mdx,components\(colors)\color-slider.mdx,components\(colors)\color-swatch-picker.mdx,components\(colors)\color-swatch.mdx,components\(controls)\slider.mdx,components\(controls)\switch.mdx,components\(data-display)\badge.mdx,components\(data-display)\chip.mdx,components\(data-display)\table.mdx,components\(date-and-time)\calendar.mdx,components\(date-and-time)\date-field.mdx,components\(date-and-time)\date-picker.mdx,components\(date-and-time)\date-range-picker.mdx,components\(date-and-time)\range-calendar.mdx,components\(date-and-time)\time-field.mdx,components\(feedback)\alert.mdx,components\(feedback)\meter.mdx,components\(feedback)\progress-bar.mdx,components\(feedback)\progress-circle.mdx,components\(feedback)\skeleton.mdx,components\(feedback)\spinner.mdx,components\(forms)\checkbox-group.mdx,components\(forms)\checkbox.mdx,components\(forms)\description.mdx,components\(forms)\error-message.mdx,components\(forms)\field-error.mdx,components\(forms)\fieldset.mdx,components\(forms)\form.mdx,components\(forms)\input-group.mdx,components\(forms)\input-otp.mdx,components\(forms)\input.mdx,components\(forms)\label.mdx,components\(forms)\number-field.mdx,components\(forms)\radio-group.mdx,components\(forms)\search-field.mdx,components\(forms)\text-area.mdx,components\(forms)\text-field.mdx,components\(layout)\card.mdx,components\(layout)\separator.mdx,components\(layout)\surface.mdx,components\(layout)\toolbar.mdx,components\(media)\avatar.mdx,components\(navigation)\accordion.mdx,components\(navigation)\breadcrumbs.mdx,components\(navigation)\disclosure-group.mdx,components\(navigation)\disclosure.mdx,components\(navigation)\link.mdx,components\(navigation)\pagination.mdx,components\(navigation)\tabs.mdx,components\(overlays)\alert-dialog.mdx,components\(overlays)\drawer.mdx,components\(overlays)\modal.mdx,components\(overlays)\popover.mdx,components\(overlays)\toast.mdx,components\(overlays)\tooltip.mdx,components\(pickers)\autocomplete.mdx,components\(pickers)\combo-box.mdx,components\(pickers)\select.mdx,components\(typography)\kbd.mdx,components\(typography)\typography.mdx,components\(utilities)\scroll-shadow.mdx,components\index.mdx,getting-started\(handbook)\animation.mdx,getting-started\(handbook)\colors.mdx,getting-started\(handbook)\composition.mdx,getting-started\(handbook)\dark-mode.mdx,getting-started\(handbook)\styling.mdx,getting-started\(handbook)\theming.mdx,getting-started\(overview)\cli.mdx,getting-started\(overview)\design-principles.mdx,getting-started\(overview)\frameworks.mdx,getting-started\(overview)\quick-start.mdx,getting-started\(ui-for-agents)\agent-skills.mdx,getting-started\(ui-for-agents)\agents-md.mdx,getting-started\(ui-for-agents)\llms-txt.mdx,getting-started\(ui-for-agents)\mcp-server.mdx,getting-started\index.mdx,releases\index.mdx,releases\v3-0-0-alpha-32.mdx,releases\v3-0-0-alpha-33.mdx,releases\v3-0-0-alpha-34.mdx,releases\v3-0-0-alpha-35.mdx,releases\v3-0-0-beta-1.mdx,releases\v3-0-0-beta-2.mdx,releases\v3-0-0-beta-3.mdx,releases\v3-0-0-beta-4.mdx,releases\v3-0-0-beta-6.mdx,releases\v3-0-0-beta-7.mdx,releases\v3-0-0-beta-8.mdx,releases\v3-0-0-rc-1.mdx,releases\v3-0-0.mdx,releases\v3-0-2.mdx,releases\v3-0-3.mdx,releases\v3-0-4.mdx,releases\v3-0-5.mdx,releases\v3-1-0.mdx,releases\v3-2-0.mdx,releases\v3-2-1.mdx,releases\v3-2-2.mdx}|demos/.:{cn\accordion\basic.tsx,cn\accordion\controlled.tsx,cn\accordion\custom-indicator.tsx,cn\accordion\custom-render-function.tsx,cn\accordion\custom-styles.tsx,cn\accordion\disabled.tsx,cn\accordion\faq.tsx,cn\accordion\multiple.tsx,cn\accordion\surface.tsx,cn\accordion\without-separator.tsx,cn\alert-dialog\backdrop-variants.tsx,cn\alert-dialog\close-methods.tsx,cn\alert-dialog\controlled.tsx,cn\alert-dialog\custom-animations.tsx,cn\alert-dialog\custom-backdrop.tsx,cn\alert-dialog\custom-icon.tsx,cn\alert-dialog\custom-portal.tsx,cn\alert-dialog\custom-trigger.tsx,cn\alert-dialog\default.tsx,cn\alert-dialog\dismiss-behavior.tsx,cn\alert-dialog\placements.tsx,cn\alert-dialog\sizes.tsx,cn\alert-dialog\statuses.tsx,cn\alert-dialog\with-close-button.tsx,cn\alert\basic.tsx,cn\autocomplete\allows-empty-collection.tsx,cn\autocomplete\asynchronous-filtering.tsx,cn\autocomplete\controlled-open-state.tsx,cn\autocomplete\controlled.tsx,cn\autocomplete\custom-indicator.tsx,cn\autocomplete\default.tsx,cn\autocomplete\disabled.tsx,cn\autocomplete\email-recipients.tsx,cn\autocomplete\full-width.tsx,cn\autocomplete\location-search.tsx,cn\autocomplete\multiple-select.tsx,cn\autocomplete\required.tsx,cn\autocomplete\single-select.tsx,cn\autocomplete\tag-group-selection.tsx,cn\autocomplete\user-selection-multiple.tsx,cn\autocomplete\user-selection.tsx,cn\autocomplete\variants.tsx,cn\autocomplete\virtualization.tsx,cn\autocomplete\with-description.tsx,cn\autocomplete\with-disabled-options.tsx,cn\autocomplete\with-sections.tsx,cn\avatar\basic.tsx,cn\avatar\colors.tsx,cn\avatar\custom-styles.tsx,cn\avatar\fallback.tsx,cn\avatar\group.tsx,cn\avatar\sizes.tsx,cn\avatar\variants.tsx,cn\badge\basic.tsx,cn\badge\colors.tsx,cn\badge\dot.tsx,cn\badge\placements.tsx,cn\badge\sizes.tsx,cn\badge\variants.tsx,cn\badge\with-content.tsx,cn\breadcrumbs\basic.tsx,cn\breadcrumbs\custom-render-function.tsx,cn\breadcrumbs\custom-separator.tsx,cn\breadcrumbs\disabled.tsx,cn\breadcrumbs\level-2.tsx,cn\breadcrumbs\level-3.tsx,cn\button-group\basic.tsx,cn\button-group\disabled.tsx,cn\button-group\full-width.tsx,cn\button-group\orientation.tsx,cn\button-group\sizes.tsx,cn\button-group\variants.tsx,cn\button-group\with-icons.tsx,cn\button-group\without-separator.tsx,cn\button\basic.tsx,cn\button\custom-render-function.tsx,cn\button\custom-variants.tsx,cn\button\disabled.tsx,cn\button\full-width.tsx,cn\button\icon-only.tsx,cn\button\loading-state.tsx,cn\button\loading.tsx,cn\button\outline-variant.tsx,cn\button\ripple-effect.tsx,cn\button\sizes.tsx,cn\button\social.tsx,cn\button\variants.tsx,cn\button\with-icons.tsx,cn\calendar\basic.tsx,cn\calendar\booking-calendar.tsx,cn\calendar\controlled.tsx,cn\calendar\custom-icons.tsx,cn\calendar\custom-styles.tsx,cn\calendar\day-view.tsx,cn\calendar\default-value.tsx,cn\calendar\disabled.tsx,cn\calendar\focused-value.tsx,cn\calendar\international-calendar.tsx,cn\calendar\min-max-dates.tsx,cn\calendar\multiple-months.tsx,cn\calendar\multiple-selection.tsx,cn\calendar\read-only.tsx,cn\calendar\unavailable-dates.tsx,cn\calendar\week-view.tsx,cn\calendar\weeks-in-month.tsx,cn\calendar\with-indicators.tsx,cn\calendar\year-picker.tsx,cn\card\default.tsx,cn\card\horizontal.tsx,cn\card\variants.tsx,cn\card\with-avatar.tsx,cn\card\with-form.tsx,cn\card\with-images.tsx,cn\checkbox-group\basic.tsx,cn\checkbox-group\controlled.tsx,cn\checkbox-group\custom-render-function.tsx,cn\checkbox-group\disabled.tsx,cn\checkbox-group\features-and-addons.tsx,cn\checkbox-group\indeterminate.tsx,cn\checkbox-group\on-surface.tsx,cn\checkbox-group\validation.tsx,cn\checkbox-group\with-custom-indicator.tsx,cn\checkbox\basic.tsx,cn\checkbox\controlled.tsx,cn\checkbox\custom-indicator.tsx,cn\checkbox\custom-render-function.tsx,cn\checkbox\custom-styles.tsx,cn\checkbox\default-selected.tsx,cn\checkbox\disabled.tsx,cn\checkbox\external-label.tsx,cn\checkbox\form.tsx,cn\checkbox\full-rounded.tsx,cn\checkbox\indeterminate.tsx,cn\checkbox\invalid.tsx,cn\checkbox\render-props.tsx,cn\checkbox\variants.tsx,cn\checkbox\with-description.tsx,cn\chip\basic.tsx,cn\chip\statuses.tsx,cn\chip\variants.tsx,cn\chip\vibrant-palette.tsx,cn\chip\with-icon.tsx,cn\close-button\default.tsx,cn\close-button\interactive.tsx,cn\close-button\variants.tsx,cn\close-button\with-custom-icon.tsx,cn\color-area\basic.tsx,cn\color-area\controlled.tsx,cn\color-area\custom-render-function.tsx,cn\color-area\disabled.tsx,cn\color-area\space-and-channels.tsx,cn\color-area\with-dots.tsx,cn\color-field\basic.tsx,cn\color-field\channel-editing.tsx,cn\color-field\controlled.tsx,cn\color-field\custom-render-function.tsx,cn\color-field\disabled.tsx,cn\color-field\form-example.tsx,cn\color-field\full-width.tsx,cn\color-field\invalid.tsx,cn\color-field\on-surface.tsx,cn\color-field\required.tsx,cn\color-field\variants.tsx,cn\color-field\with-description.tsx,cn\color-picker\basic.tsx,cn\color-picker\controlled.tsx,cn\color-picker\with-fields.tsx,cn\color-picker\with-sliders.tsx,cn\color-picker\with-swatches.tsx,cn\color-slider\alpha-channel.tsx,cn\color-slider\basic.tsx,cn\color-slider\channels.tsx,cn\color-slider\controlled.tsx,cn\color-slider\custom-render-function.tsx,cn\color-slider\disabled.tsx,cn\color-slider\rgb-channels.tsx,cn\color-slider\vertical.tsx,cn\color-swatch-picker\basic.tsx,cn\color-swatch-picker\controlled.tsx,cn\color-swatch-picker\custom-indicator.tsx,cn\color-swatch-picker\custom-render-function.tsx,cn\color-swatch-picker\default-value.tsx,cn\color-swatch-picker\disabled.tsx,cn\color-swatch-picker\sizes.tsx,cn\color-swatch-picker\stack-layout.tsx,cn\color-swatch-picker\variants.tsx,cn\color-swatch\accessibility.tsx,cn\color-swatch\basic.tsx,cn\color-swatch\custom-render-function.tsx,cn\color-swatch\custom-styles.tsx,cn\color-swatch\shapes.tsx,cn\color-swatch\sizes.tsx,cn\color-swatch\transparency.tsx,cn\combo-box\allows-custom-value.tsx,cn\combo-box\asynchronous-loading.tsx,cn\combo-box\controlled-input-value.tsx,cn\combo-box\controlled.tsx,cn\combo-box\custom-filtering.tsx,cn\combo-box\custom-indicator.tsx,cn\combo-box\custom-render-function.tsx,cn\combo-box\custom-value.tsx,cn\combo-box\default-selected-key.tsx,cn\combo-box\default.tsx,cn\combo-box\disabled.tsx,cn\combo-box\full-width.tsx,cn\combo-box\menu-trigger.tsx,cn\combo-box\on-surface.tsx,cn\combo-box\required.tsx,cn\combo-box\with-description.tsx,cn\combo-box\with-disabled-options.tsx,cn\combo-box\with-sections.tsx,cn\date-field\basic.tsx,cn\date-field\controlled.tsx,cn\date-field\custom-render-function.tsx,cn\date-field\disabled.tsx,cn\date-field\form-example.tsx,cn\date-field\full-width.tsx,cn\date-field\granularity.tsx,cn\date-field\invalid.tsx,cn\date-field\on-surface.tsx,cn\date-field\required.tsx,cn\date-field\variants.tsx,cn\date-field\with-description.tsx,cn\date-field\with-prefix-and-suffix.tsx,cn\date-field\with-prefix-icon.tsx,cn\date-field\with-suffix-icon.tsx,cn\date-field\with-validation.tsx,cn\date-picker\basic.tsx,cn\date-picker\controlled.tsx,cn\date-picker\custom-render-function.tsx,cn\date-picker\disabled.tsx,cn\date-picker\form-example.tsx,cn\date-picker\format-options-no-ssr.tsx,cn\date-picker\format-options.tsx,cn\date-picker\international-calendar.tsx,cn\date-picker\with-custom-indicator.tsx,cn\date-picker\with-validation.tsx,cn\date-range-picker\basic.tsx,cn\date-range-picker\controlled.tsx,cn\date-range-picker\custom-render-function.tsx,cn\date-range-picker\disabled.tsx,cn\date-range-picker\form-example.tsx,cn\date-range-picker\format-options-no-ssr.tsx,cn\date-range-picker\format-options.tsx,cn\date-range-picker\input-container.tsx,cn\date-range-picker\international-calendar.tsx,cn\date-range-picker\with-custom-indicator.tsx,cn\date-range-picker\with-validation.tsx,cn\description\basic.tsx,cn\disclosure-group\basic.tsx,cn\disclosure-group\controlled.tsx,cn\disclosure\basic.tsx,cn\disclosure\custom-render-function.tsx,cn\drawer\backdrop-variants.tsx,cn\drawer\basic.tsx,cn\drawer\controlled.tsx,cn\drawer\navigation.tsx,cn\drawer\non-dismissable.tsx,cn\drawer\placements.tsx,cn\drawer\scrollable-content.tsx,cn\drawer\with-form.tsx,cn\dropdown\controlled-open-state.tsx,cn\dropdown\controlled.tsx,cn\dropdown\custom-trigger.tsx,cn\dropdown\default.tsx,cn\dropdown\long-press-trigger.tsx,cn\dropdown\single-with-custom-indicator.tsx,cn\dropdown\with-custom-submenu-indicator.tsx,cn\dropdown\with-descriptions.tsx,cn\dropdown\with-disabled-items.tsx,cn\dropdown\with-icons.tsx,cn\dropdown\with-keyboard-shortcuts.tsx,cn\dropdown\with-multiple-selection.tsx,cn\dropdown\with-section-level-selection.tsx,cn\dropdown\with-sections.tsx,cn\dropdown\with-single-selection.tsx,cn\dropdown\with-submenus.tsx,cn\error-message\basic.tsx,cn\error-message\with-tag-group.tsx,cn\field-error\basic.tsx,cn\fieldset\basic.tsx,cn\fieldset\on-surface.tsx,cn\form\basic.tsx,cn\form\custom-render-function.tsx,cn\input-group\default.tsx,cn\input-group\disabled.tsx,cn\input-group\full-width.tsx,cn\input-group\invalid.tsx,cn\input-group\on-surface.tsx,cn\input-group\password-with-toggle.tsx,cn\input-group\required.tsx,cn\input-group\variants.tsx,cn\input-group\with-badge-suffix.tsx,cn\input-group\with-copy-suffix.tsx,cn\input-group\with-icon-prefix-and-copy-suffix.tsx,cn\input-group\with-icon-prefix-and-text-suffix.tsx,cn\input-group\with-keyboard-shortcut.tsx,cn\input-group\with-loading-suffix.tsx,cn\input-group\with-prefix-and-suffix.tsx,cn\input-group\with-prefix-icon.tsx,cn\input-group\with-suffix-icon.tsx,cn\input-group\with-text-prefix.tsx,cn\input-group\with-text-suffix.tsx,cn\input-group\with-textarea.tsx,cn\input-otp\basic.tsx,cn\input-otp\controlled.tsx,cn\input-otp\disabled.tsx,cn\input-otp\form-example.tsx,cn\input-otp\four-digits.tsx,cn\input-otp\on-complete.tsx,cn\input-otp\on-surface.tsx,cn\input-otp\variants.tsx,cn\input-otp\with-pattern.tsx,cn\input-otp\with-validation.tsx,cn\input\basic.tsx,cn\input\controlled.tsx,cn\input\full-width.tsx,cn\input\on-surface.tsx,cn\input\types.tsx,cn\input\variants.tsx,cn\kbd\basic.tsx,cn\kbd\inline.tsx,cn\kbd\instructional.tsx,cn\kbd\navigation.tsx,cn\kbd\special.tsx,cn\kbd\variants.tsx,cn\label\basic.tsx,cn\link\basic.tsx,cn\link\custom-icon.tsx,cn\link\custom-render-function.tsx,cn\link\icon-placement.tsx,cn\link\underline-and-offset.tsx,cn\link\underline-offset.tsx,cn\link\underline-variants.tsx,cn\list-box\controlled.tsx,cn\list-box\custom-check-icon.tsx,cn\list-box\custom-render-function.tsx,cn\list-box\default.tsx,cn\list-box\multi-select.tsx,cn\list-box\scrollbar-modes.tsx,cn\list-box\virtualization.tsx,cn\list-box\with-disabled-items.tsx,cn\list-box\with-sections.tsx,cn\meter\basic.tsx,cn\meter\colors.tsx,cn\meter\custom-value.tsx,cn\meter\sizes.tsx,cn\meter\without-label.tsx,cn\modal\backdrop-variants.tsx,cn\modal\close-methods.tsx,cn\modal\controlled.tsx,cn\modal\custom-animations.tsx,cn\modal\custom-backdrop.tsx,cn\modal\custom-portal.tsx,cn\modal\custom-trigger.tsx,cn\modal\default.tsx,cn\modal\dismiss-behavior.tsx,cn\modal\placements.tsx,cn\modal\scroll-comparison.tsx,cn\modal\sizes.tsx,cn\modal\with-form.tsx,cn\number-field\basic.tsx,cn\number-field\controlled.tsx,cn\number-field\custom-icons.tsx,cn\number-field\custom-render-function.tsx,cn\number-field\disabled.tsx,cn\number-field\form-example.tsx,cn\number-field\full-width.tsx,cn\number-field\on-surface.tsx,cn\number-field\required.tsx,cn\number-field\validation.tsx,cn\number-field\variants.tsx,cn\number-field\with-chevrons.tsx,cn\number-field\with-description.tsx,cn\number-field\with-format-options.tsx,cn\number-field\with-step.tsx,cn\number-field\with-validation.tsx,cn\pagination\basic.tsx,cn\pagination\controlled.tsx,cn\pagination\custom-icons.tsx,cn\pagination\disabled.tsx,cn\pagination\simple-prev-next.tsx,cn\pagination\sizes.tsx,cn\pagination\with-ellipsis.tsx,cn\pagination\with-summary.tsx,cn\popover\basic.tsx,cn\popover\custom-render-function.tsx,cn\popover\interactive.tsx,cn\popover\placement.tsx,cn\popover\with-arrow.tsx,cn\progress-bar\basic.tsx,cn\progress-bar\colors.tsx,cn\progress-bar\custom-value.tsx,cn\progress-bar\indeterminate.tsx,cn\progress-bar\sizes.tsx,cn\progress-bar\without-label.tsx,cn\progress-circle\basic.tsx,cn\progress-circle\colors.tsx,cn\progress-circle\custom-svg.tsx,cn\progress-circle\indeterminate.tsx,cn\progress-circle\sizes.tsx,cn\progress-circle\with-label.tsx,cn\radio-group\basic.tsx,cn\radio-group\controlled.tsx,cn\radio-group\custom-indicator.tsx,cn\radio-group\custom-render-function.tsx,cn\radio-group\delivery-and-payment.tsx,cn\radio-group\disabled.tsx,cn\radio-group\horizontal.tsx,cn\radio-group\on-surface.tsx,cn\radio-group\uncontrolled.tsx,cn\radio-group\validation.tsx,cn\radio-group\variants.tsx,cn\range-calendar\allows-non-contiguous-ranges.tsx,cn\range-calendar\anchor-unavailable-dates.tsx,cn\range-calendar\basic.tsx,cn\range-calendar\booking-calendar.tsx,cn\range-calendar\controlled.tsx,cn\range-calendar\day-view.tsx,cn\range-calendar\default-value.tsx,cn\range-calendar\disabled.tsx,cn\range-calendar\focused-value.tsx,cn\range-calendar\international-calendar.tsx,cn\range-calendar\invalid.tsx,cn\range-calendar\min-max-dates.tsx,cn\range-calendar\multiple-months.tsx,cn\range-calendar\read-only.tsx,cn\range-calendar\three-months.tsx,cn\range-calendar\unavailable-dates.tsx,cn\range-calendar\week-view.tsx,cn\range-calendar\weeks-in-month.tsx,cn\range-calendar\with-indicators.tsx,cn\range-calendar\year-picker.tsx,cn\scroll-shadow\custom-size.tsx,cn\scroll-shadow\default.tsx,cn\scroll-shadow\hide-scroll-bar.tsx,cn\scroll-shadow\orientation.tsx,cn\scroll-shadow\visibility-change.tsx,cn\scroll-shadow\with-card.tsx,cn\search-field\basic.tsx,cn\search-field\controlled.tsx,cn\search-field\custom-icons.tsx,cn\search-field\custom-render-function.tsx,cn\search-field\disabled.tsx,cn\search-field\form-example.tsx,cn\search-field\full-width.tsx,cn\search-field\on-surface.tsx,cn\search-field\required.tsx,cn\search-field\validation.tsx,cn\search-field\variants.tsx,cn\search-field\with-description.tsx,cn\search-field\with-keyboard-shortcut.tsx,cn\search-field\with-validation.tsx,cn\select\asynchronous-loading.tsx,cn\select\controlled-multiple.tsx,cn\select\controlled-open-state.tsx,cn\select\controlled.tsx,cn\select\custom-indicator.tsx,cn\select\custom-render-function.tsx,cn\select\custom-value-multiple.tsx,cn\select\custom-value.tsx,cn\select\default.tsx,cn\select\disabled.tsx,cn\select\full-width.tsx,cn\select\multiple-select.tsx,cn\select\on-surface.tsx,cn\select\required.tsx,cn\select\variants.tsx,cn\select\with-description.tsx,cn\select\with-disabled-options.tsx,cn\select\with-sections.tsx,cn\separator\basic.tsx,cn\separator\custom-render-function.tsx,cn\separator\manual-variant-override.tsx,cn\separator\variants.tsx,cn\separator\vertical.tsx,cn\separator\with-content.tsx,cn\separator\with-surface.tsx,cn\skeleton\animation-types.tsx,cn\skeleton\basic.tsx,cn\skeleton\card.tsx,cn\skeleton\grid.tsx,cn\skeleton\list.tsx,cn\skeleton\single-shimmer.tsx,cn\skeleton\text-content.tsx,cn\skeleton\user-profile.tsx,cn\slider\custom-render-function.tsx,cn\slider\default.tsx,cn\slider\disabled.tsx,cn\slider\range.tsx,cn\slider\vertical.tsx,cn\spinner\basic.tsx,cn\spinner\colors.tsx,cn\spinner\sizes.tsx,cn\surface\variants.tsx,cn\switch\basic.tsx,cn\switch\controlled.tsx,cn\switch\custom-render-function.tsx,cn\switch\custom-styles.tsx,cn\switch\default-selected.tsx,cn\switch\disabled.tsx,cn\switch\form.tsx,cn\switch\group-horizontal.tsx,cn\switch\group.tsx,cn\switch\label-position.tsx,cn\switch\render-props.tsx,cn\switch\sizes.tsx,cn\switch\with-description.tsx,cn\switch\with-icons.tsx,cn\switch\without-label.tsx,cn\table\async-loading.tsx,cn\table\basic.tsx,cn\table\column-resizing.tsx,cn\table\custom-cells.tsx,cn\table\empty-state.tsx,cn\table\expandable-rows.tsx,cn\table\pagination.tsx,cn\table\secondary-variant.tsx,cn\table\selection.tsx,cn\table\sorting.tsx,cn\table\tanstack-table.tsx,cn\table\virtualization.tsx,cn\tabs\basic.tsx,cn\tabs\custom-render-function.tsx,cn\tabs\custom-styles.tsx,cn\tabs\disabled.tsx,cn\tabs\overflow.tsx,cn\tabs\secondary-vertical.tsx,cn\tabs\secondary.tsx,cn\tabs\vertical.tsx,cn\tabs\with-separator.tsx,cn\tag-group\basic.tsx,cn\tag-group\controlled.tsx,cn\tag-group\custom-render-function.tsx,cn\tag-group\disabled.tsx,cn\tag-group\selection-modes.tsx,cn\tag-group\sizes.tsx,cn\tag-group\variants.tsx,cn\tag-group\with-error-message.tsx,cn\tag-group\with-list-data.tsx,cn\tag-group\with-prefix.tsx,cn\tag-group\with-remove-button.tsx,cn\textarea\basic.tsx,cn\textarea\controlled.tsx,cn\textarea\full-width.tsx,cn\textarea\on-surface.tsx,cn\textarea\rows.tsx,cn\textarea\variants.tsx,cn\textfield\basic.tsx,cn\textfield\controlled.tsx,cn\textfield\custom-render-function.tsx,cn\textfield\disabled.tsx,cn\textfield\full-width.tsx,cn\textfield\input-types.tsx,cn\textfield\on-surface.tsx,cn\textfield\required.tsx,cn\textfield\textarea.tsx,cn\textfield\validation.tsx,cn\textfield\with-description.tsx,cn\textfield\with-error.tsx,cn\time-field\basic.tsx,cn\time-field\controlled.tsx,cn\time-field\custom-render-function.tsx,cn\time-field\disabled.tsx,cn\time-field\form-example.tsx,cn\time-field\full-width.tsx,cn\time-field\invalid.tsx,cn\time-field\on-surface.tsx,cn\time-field\required.tsx,cn\time-field\with-description.tsx,cn\time-field\with-prefix-and-suffix.tsx,cn\time-field\with-prefix-icon.tsx,cn\time-field\with-suffix-icon.tsx,cn\time-field\with-validation.tsx,cn\toast\callbacks.tsx,cn\toast\custom-indicator.tsx,cn\toast\custom-queue.tsx,cn\toast\custom-toast.tsx,cn\toast\default.tsx,cn\toast\placements.tsx,cn\toast\promise.tsx,cn\toast\simple.tsx,cn\toast\variants.tsx,cn\toggle-button-group\attached.tsx,cn\toggle-button-group\basic.tsx,cn\toggle-button-group\controlled.tsx,cn\toggle-button-group\disabled.tsx,cn\toggle-button-group\full-width.tsx,cn\toggle-button-group\orientation.tsx,cn\toggle-button-group\selection-mode.tsx,cn\toggle-button-group\sizes.tsx,cn\toggle-button-group\without-separator.tsx,cn\toggle-button\basic.tsx,cn\toggle-button\controlled.tsx,cn\toggle-button\disabled.tsx,cn\toggle-button\icon-only.tsx,cn\toggle-button\sizes.tsx,cn\toggle-button\variants.tsx,cn\toolbar\basic.tsx,cn\toolbar\custom-styles.tsx,cn\toolbar\vertical.tsx,cn\toolbar\with-button-group.tsx,cn\tooltip\basic.tsx,cn\tooltip\custom-render-function.tsx,cn\tooltip\custom-trigger.tsx,cn\tooltip\placement.tsx,cn\tooltip\with-arrow.tsx,cn\typography\default.tsx,cn\typography\primitives.tsx,cn\typography\prose.tsx,cn\typography\render-props.tsx,cn\typography\typography-scale.tsx,en\accordion\basic.tsx,en\accordion\controlled.tsx,en\accordion\custom-indicator.tsx,en\accordion\custom-render-function.tsx,en\accordion\custom-styles.tsx,en\accordion\disabled.tsx,en\accordion\faq.tsx,en\accordion\multiple.tsx,en\accordion\surface.tsx,en\accordion\without-separator.tsx,en\alert-dialog\backdrop-variants.tsx,en\alert-dialog\close-methods.tsx,en\alert-dialog\controlled.tsx,en\alert-dialog\custom-animations.tsx,en\alert-dialog\custom-backdrop.tsx,en\alert-dialog\custom-icon.tsx,en\alert-dialog\custom-portal.tsx,en\alert-dialog\custom-trigger.tsx,en\alert-dialog\default.tsx,en\alert-dialog\dismiss-behavior.tsx,en\alert-dialog\placements.tsx,en\alert-dialog\sizes.tsx,en\alert-dialog\statuses.tsx,en\alert-dialog\with-close-button.tsx,en\alert\basic.tsx,en\autocomplete\allows-empty-collection.tsx,en\autocomplete\asynchronous-filtering.tsx,en\autocomplete\controlled-open-state.tsx,en\autocomplete\controlled.tsx,en\autocomplete\custom-indicator.tsx,en\autocomplete\default.tsx,en\autocomplete\disabled.tsx,en\autocomplete\email-recipients.tsx,en\autocomplete\full-width.tsx,en\autocomplete\location-search.tsx,en\autocomplete\multiple-select.tsx,en\autocomplete\required.tsx,en\autocomplete\single-select.tsx,en\autocomplete\tag-group-selection.tsx,en\autocomplete\user-selection-multiple.tsx,en\autocomplete\user-selection.tsx,en\autocomplete\variants.tsx,en\autocomplete\virtualization.tsx,en\autocomplete\with-description.tsx,en\autocomplete\with-disabled-options.tsx,en\autocomplete\with-sections.tsx,en\avatar\basic.tsx,en\avatar\colors.tsx,en\avatar\custom-styles.tsx,en\avatar\fallback.tsx,en\avatar\group.tsx,en\avatar\sizes.tsx,en\avatar\variants.tsx,en\badge\basic.tsx,en\badge\colors.tsx,en\badge\dot.tsx,en\badge\placements.tsx,en\badge\sizes.tsx,en\badge\variants.tsx,en\badge\with-content.tsx,en\breadcrumbs\basic.tsx,en\breadcrumbs\custom-render-function.tsx,en\breadcrumbs\custom-separator.tsx,en\breadcrumbs\disabled.tsx,en\breadcrumbs\level-2.tsx,en\breadcrumbs\level-3.tsx,en\button-group\basic.tsx,en\button-group\disabled.tsx,en\button-group\full-width.tsx,en\button-group\orientation.tsx,en\button-group\sizes.tsx,en\button-group\variants.tsx,en\button-group\with-icons.tsx,en\button-group\without-separator.tsx,en\button\basic.tsx,en\button\custom-render-function.tsx,en\button\custom-variants.tsx,en\button\disabled.tsx,en\button\full-width.tsx,en\button\icon-only.tsx,en\button\loading-state.tsx,en\button\loading.tsx,en\button\outline-variant.tsx,en\button\ripple-effect.tsx,en\button\sizes.tsx,en\button\social.tsx,en\button\variants.tsx,en\button\with-icons.tsx,en\calendar\basic.tsx,en\calendar\booking-calendar.tsx,en\calendar\controlled.tsx,en\calendar\custom-icons.tsx,en\calendar\custom-styles.tsx,en\calendar\day-view.tsx,en\calendar\default-value.tsx,en\calendar\disabled.tsx,en\calendar\focused-value.tsx,en\calendar\international-calendar.tsx,en\calendar\min-max-dates.tsx,en\calendar\multiple-months.tsx,en\calendar\multiple-selection.tsx,en\calendar\read-only.tsx,en\calendar\unavailable-dates.tsx,en\calendar\week-view.tsx,en\calendar\weeks-in-month.tsx,en\calendar\with-indicators.tsx,en\calendar\year-picker.tsx,en\card\default.tsx,en\card\horizontal.tsx,en\card\variants.tsx,en\card\with-avatar.tsx,en\card\with-form.tsx,en\card\with-images.tsx,en\checkbox-group\basic.tsx,en\checkbox-group\controlled.tsx,en\checkbox-group\custom-render-function.tsx,en\checkbox-group\disabled.tsx,en\checkbox-group\features-and-addons.tsx,en\checkbox-group\indeterminate.tsx,en\checkbox-group\on-surface.tsx,en\checkbox-group\validation.tsx,en\checkbox-group\with-custom-indicator.tsx,en\checkbox\basic.tsx,en\checkbox\controlled.tsx,en\checkbox\custom-indicator.tsx,en\checkbox\custom-render-function.tsx,en\checkbox\custom-styles.tsx,en\checkbox\default-selected.tsx,en\checkbox\disabled.tsx,en\checkbox\external-label.tsx,en\checkbox\form.tsx,en\checkbox\full-rounded.tsx,en\checkbox\indeterminate.tsx,en\checkbox\invalid.tsx,en\checkbox\render-props.tsx,en\checkbox\variants.tsx,en\checkbox\with-description.tsx,en\chip\basic.tsx,en\chip\statuses.tsx,en\chip\variants.tsx,en\chip\vibrant-palette.tsx,en\chip\with-icon.tsx,en\close-button\default.tsx,en\close-button\interactive.tsx,en\close-button\variants.tsx,en\close-button\with-custom-icon.tsx,en\color-area\basic.tsx,en\color-area\controlled.tsx,en\color-area\custom-render-function.tsx,en\color-area\disabled.tsx,en\color-area\space-and-channels.tsx,en\color-area\with-dots.tsx,en\color-field\basic.tsx,en\color-field\channel-editing.tsx,en\color-field\controlled.tsx,en\color-field\custom-render-function.tsx,en\color-field\disabled.tsx,en\color-field\form-example.tsx,en\color-field\full-width.tsx,en\color-field\invalid.tsx,en\color-field\on-surface.tsx,en\color-field\required.tsx,en\color-field\variants.tsx,en\color-field\with-description.tsx,en\color-picker\basic.tsx,en\color-picker\controlled.tsx,en\color-picker\with-fields.tsx,en\color-picker\with-sliders.tsx,en\color-picker\with-swatches.tsx,en\color-slider\alpha-channel.tsx,en\color-slider\basic.tsx,en\color-slider\channels.tsx,en\color-slider\controlled.tsx,en\color-slider\custom-render-function.tsx,en\color-slider\disabled.tsx,en\color-slider\rgb-channels.tsx,en\color-slider\vertical.tsx,en\color-swatch-picker\basic.tsx,en\color-swatch-picker\controlled.tsx,en\color-swatch-picker\custom-indicator.tsx,en\color-swatch-picker\custom-render-function.tsx,en\color-swatch-picker\default-value.tsx,en\color-swatch-picker\disabled.tsx,en\color-swatch-picker\sizes.tsx,en\color-swatch-picker\stack-layout.tsx,en\color-swatch-picker\variants.tsx,en\color-swatch\accessibility.tsx,en\color-swatch\basic.tsx,en\color-swatch\custom-render-function.tsx,en\color-swatch\custom-styles.tsx,en\color-swatch\shapes.tsx,en\color-swatch\sizes.tsx,en\color-swatch\transparency.tsx,en\combo-box\allows-custom-value.tsx,en\combo-box\asynchronous-loading.tsx,en\combo-box\controlled-input-value.tsx,en\combo-box\controlled.tsx,en\combo-box\custom-filtering.tsx,en\combo-box\custom-indicator.tsx,en\combo-box\custom-render-function.tsx,en\combo-box\custom-value.tsx,en\combo-box\default-selected-key.tsx,en\combo-box\default.tsx,en\combo-box\disabled.tsx,en\combo-box\full-width.tsx,en\combo-box\menu-trigger.tsx,en\combo-box\on-surface.tsx,en\combo-box\required.tsx,en\combo-box\with-description.tsx,en\combo-box\with-disabled-options.tsx,en\combo-box\with-sections.tsx,en\date-field\basic.tsx,en\date-field\controlled.tsx,en\date-field\custom-render-function.tsx,en\date-field\disabled.tsx,en\date-field\form-example.tsx,en\date-field\full-width.tsx,en\date-field\granularity.tsx,en\date-field\invalid.tsx,en\date-field\on-surface.tsx,en\date-field\required.tsx,en\date-field\variants.tsx,en\date-field\with-description.tsx,en\date-field\with-prefix-and-suffix.tsx,en\date-field\with-prefix-icon.tsx,en\date-field\with-suffix-icon.tsx,en\date-field\with-validation.tsx,en\date-picker\basic.tsx,en\date-picker\controlled.tsx,en\date-picker\custom-render-function.tsx,en\date-picker\disabled.tsx,en\date-picker\form-example.tsx,en\date-picker\format-options-no-ssr.tsx,en\date-picker\format-options.tsx,en\date-picker\international-calendar.tsx,en\date-picker\with-custom-indicator.tsx,en\date-picker\with-validation.tsx,en\date-range-picker\basic.tsx,en\date-range-picker\controlled.tsx,en\date-range-picker\custom-render-function.tsx,en\date-range-picker\disabled.tsx,en\date-range-picker\form-example.tsx,en\date-range-picker\format-options-no-ssr.tsx,en\date-range-picker\format-options.tsx,en\date-range-picker\input-container.tsx,en\date-range-picker\international-calendar.tsx,en\date-range-picker\with-custom-indicator.tsx,en\date-range-picker\with-validation.tsx,en\description\basic.tsx,en\disclosure-group\basic.tsx,en\disclosure-group\controlled.tsx,en\disclosure\basic.tsx,en\disclosure\custom-render-function.tsx,en\drawer\backdrop-variants.tsx,en\drawer\basic.tsx,en\drawer\controlled.tsx,en\drawer\navigation.tsx,en\drawer\non-dismissable.tsx,en\drawer\placements.tsx,en\drawer\scrollable-content.tsx,en\drawer\with-form.tsx,en\dropdown\controlled-open-state.tsx,en\dropdown\controlled.tsx,en\dropdown\custom-trigger.tsx,en\dropdown\default.tsx,en\dropdown\long-press-trigger.tsx,en\dropdown\single-with-custom-indicator.tsx,en\dropdown\with-custom-submenu-indicator.tsx,en\dropdown\with-descriptions.tsx,en\dropdown\with-disabled-items.tsx,en\dropdown\with-icons.tsx,en\dropdown\with-keyboard-shortcuts.tsx,en\dropdown\with-multiple-selection.tsx,en\dropdown\with-section-level-selection.tsx,en\dropdown\with-sections.tsx,en\dropdown\with-single-selection.tsx,en\dropdown\with-submenus.tsx,en\error-message\basic.tsx,en\error-message\with-tag-group.tsx,en\field-error\basic.tsx,en\fieldset\basic.tsx,en\fieldset\on-surface.tsx,en\form\basic.tsx,en\form\custom-render-function.tsx,en\input-group\default.tsx,en\input-group\disabled.tsx,en\input-group\full-width.tsx,en\input-group\invalid.tsx,en\input-group\on-surface.tsx,en\input-group\password-with-toggle.tsx,en\input-group\required.tsx,en\input-group\variants.tsx,en\input-group\with-badge-suffix.tsx,en\input-group\with-copy-suffix.tsx,en\input-group\with-icon-prefix-and-copy-suffix.tsx,en\input-group\with-icon-prefix-and-text-suffix.tsx,en\input-group\with-keyboard-shortcut.tsx,en\input-group\with-loading-suffix.tsx,en\input-group\with-prefix-and-suffix.tsx,en\input-group\with-prefix-icon.tsx,en\input-group\with-suffix-icon.tsx,en\input-group\with-text-prefix.tsx,en\input-group\with-text-suffix.tsx,en\input-group\with-textarea.tsx,en\input-otp\basic.tsx,en\input-otp\controlled.tsx,en\input-otp\disabled.tsx,en\input-otp\form-example.tsx,en\input-otp\four-digits.tsx,en\input-otp\on-complete.tsx,en\input-otp\on-surface.tsx,en\input-otp\variants.tsx,en\input-otp\with-pattern.tsx,en\input-otp\with-validation.tsx,en\input\basic.tsx,en\input\controlled.tsx,en\input\full-width.tsx,en\input\on-surface.tsx,en\input\types.tsx,en\input\variants.tsx,en\kbd\basic.tsx,en\kbd\inline.tsx,en\kbd\instructional.tsx,en\kbd\navigation.tsx,en\kbd\special.tsx,en\kbd\variants.tsx,en\label\basic.tsx,en\link\basic.tsx,en\link\custom-icon.tsx,en\link\custom-render-function.tsx,en\link\icon-placement.tsx,en\link\underline-and-offset.tsx,en\link\underline-offset.tsx,en\link\underline-variants.tsx,en\list-box\controlled.tsx,en\list-box\custom-check-icon.tsx,en\list-box\custom-render-function.tsx,en\list-box\default.tsx,en\list-box\multi-select.tsx,en\list-box\scrollbar-modes.tsx,en\list-box\virtualization.tsx,en\list-box\with-disabled-items.tsx,en\list-box\with-sections.tsx,en\meter\basic.tsx,en\meter\colors.tsx,en\meter\custom-value.tsx,en\meter\sizes.tsx,en\meter\without-label.tsx,en\modal\backdrop-variants.tsx,en\modal\close-methods.tsx,en\modal\controlled.tsx,en\modal\custom-animations.tsx,en\modal\custom-backdrop.tsx,en\modal\custom-portal.tsx,en\modal\custom-trigger.tsx,en\modal\default.tsx,en\modal\dismiss-behavior.tsx,en\modal\placements.tsx,en\modal\scroll-comparison.tsx,en\modal\sizes.tsx,en\modal\with-form.tsx,en\number-field\basic.tsx,en\number-field\controlled.tsx,en\number-field\custom-icons.tsx,en\number-field\custom-render-function.tsx,en\number-field\disabled.tsx,en\number-field\form-example.tsx,en\number-field\full-width.tsx,en\number-field\on-surface.tsx,en\number-field\required.tsx,en\number-field\validation.tsx,en\number-field\variants.tsx,en\number-field\with-chevrons.tsx,en\number-field\with-description.tsx,en\number-field\with-format-options.tsx,en\number-field\with-step.tsx,en\number-field\with-validation.tsx,en\pagination\basic.tsx,en\pagination\controlled.tsx,en\pagination\custom-icons.tsx,en\pagination\disabled.tsx,en\pagination\simple-prev-next.tsx,en\pagination\sizes.tsx,en\pagination\with-ellipsis.tsx,en\pagination\with-summary.tsx,en\popover\basic.tsx,en\popover\custom-render-function.tsx,en\popover\interactive.tsx,en\popover\placement.tsx,en\popover\with-arrow.tsx,en\progress-bar\basic.tsx,en\progress-bar\colors.tsx,en\progress-bar\custom-value.tsx,en\progress-bar\indeterminate.tsx,en\progress-bar\sizes.tsx,en\progress-bar\without-label.tsx,en\progress-circle\basic.tsx,en\progress-circle\colors.tsx,en\progress-circle\custom-svg.tsx,en\progress-circle\indeterminate.tsx,en\progress-circle\sizes.tsx,en\progress-circle\with-label.tsx,en\radio-group\basic.tsx,en\radio-group\controlled.tsx,en\radio-group\custom-indicator.tsx,en\radio-group\custom-render-function.tsx,en\radio-group\delivery-and-payment.tsx,en\radio-group\disabled.tsx,en\radio-group\horizontal.tsx,en\radio-group\on-surface.tsx,en\radio-group\uncontrolled.tsx,en\radio-group\validation.tsx,en\radio-group\variants.tsx,en\range-calendar\allows-non-contiguous-ranges.tsx,en\range-calendar\anchor-unavailable-dates.tsx,en\range-calendar\basic.tsx,en\range-calendar\booking-calendar.tsx,en\range-calendar\controlled.tsx,en\range-calendar\day-view.tsx,en\range-calendar\default-value.tsx,en\range-calendar\disabled.tsx,en\range-calendar\focused-value.tsx,en\range-calendar\international-calendar.tsx,en\range-calendar\invalid.tsx,en\range-calendar\min-max-dates.tsx,en\range-calendar\multiple-months.tsx,en\range-calendar\read-only.tsx,en\range-calendar\three-months.tsx,en\range-calendar\unavailable-dates.tsx,en\range-calendar\week-view.tsx,en\range-calendar\weeks-in-month.tsx,en\range-calendar\with-indicators.tsx,en\range-calendar\year-picker.tsx,en\scroll-shadow\custom-size.tsx,en\scroll-shadow\default.tsx,en\scroll-shadow\hide-scroll-bar.tsx,en\scroll-shadow\orientation.tsx,en\scroll-shadow\visibility-change.tsx,en\scroll-shadow\with-card.tsx,en\search-field\basic.tsx,en\search-field\controlled.tsx,en\search-field\custom-icons.tsx,en\search-field\custom-render-function.tsx,en\search-field\disabled.tsx,en\search-field\form-example.tsx,en\search-field\full-width.tsx,en\search-field\on-surface.tsx,en\search-field\required.tsx,en\search-field\validation.tsx,en\search-field\variants.tsx,en\search-field\with-description.tsx,en\search-field\with-keyboard-shortcut.tsx,en\search-field\with-validation.tsx,en\select\asynchronous-loading.tsx,en\select\controlled-multiple.tsx,en\select\controlled-open-state.tsx,en\select\controlled.tsx,en\select\custom-indicator.tsx,en\select\custom-render-function.tsx,en\select\custom-value-multiple.tsx,en\select\custom-value.tsx,en\select\default.tsx,en\select\disabled.tsx,en\select\full-width.tsx,en\select\multiple-select.tsx,en\select\on-surface.tsx,en\select\required.tsx,en\select\variants.tsx,en\select\with-description.tsx,en\select\with-disabled-options.tsx,en\select\with-sections.tsx,en\separator\basic.tsx,en\separator\custom-render-function.tsx,en\separator\manual-variant-override.tsx,en\separator\variants.tsx,en\separator\vertical.tsx,en\separator\with-content.tsx,en\separator\with-surface.tsx,en\skeleton\animation-types.tsx,en\skeleton\basic.tsx,en\skeleton\card.tsx,en\skeleton\grid.tsx,en\skeleton\list.tsx,en\skeleton\single-shimmer.tsx,en\skeleton\text-content.tsx,en\skeleton\user-profile.tsx,en\slider\custom-render-function.tsx,en\slider\default.tsx,en\slider\disabled.tsx,en\slider\range.tsx,en\slider\vertical.tsx,en\spinner\basic.tsx,en\spinner\colors.tsx,en\spinner\sizes.tsx,en\surface\variants.tsx,en\switch\basic.tsx,en\switch\controlled.tsx,en\switch\custom-render-function.tsx,en\switch\custom-styles.tsx,en\switch\default-selected.tsx,en\switch\disabled.tsx,en\switch\form.tsx,en\switch\group-horizontal.tsx,en\switch\group.tsx,en\switch\label-position.tsx,en\switch\render-props.tsx,en\switch\sizes.tsx,en\switch\with-description.tsx,en\switch\with-icons.tsx,en\switch\without-label.tsx,en\table\async-loading.tsx,en\table\basic.tsx,en\table\column-resizing.tsx,en\table\custom-cells.tsx,en\table\empty-state.tsx,en\table\expandable-rows.tsx,en\table\pagination.tsx,en\table\secondary-variant.tsx,en\table\selection.tsx,en\table\sorting.tsx,en\table\tanstack-table.tsx,en\table\virtualization.tsx,en\tabs\basic.tsx,en\tabs\custom-render-function.tsx,en\tabs\custom-styles.tsx,en\tabs\disabled.tsx,en\tabs\overflow.tsx,en\tabs\secondary-vertical.tsx,en\tabs\secondary.tsx,en\tabs\vertical.tsx,en\tabs\with-separator.tsx,en\tag-group\basic.tsx,en\tag-group\controlled.tsx,en\tag-group\custom-render-function.tsx,en\tag-group\disabled.tsx,en\tag-group\selection-modes.tsx,en\tag-group\sizes.tsx,en\tag-group\variants.tsx,en\tag-group\with-error-message.tsx,en\tag-group\with-list-data.tsx,en\tag-group\with-prefix.tsx,en\tag-group\with-remove-button.tsx,en\textarea\basic.tsx,en\textarea\controlled.tsx,en\textarea\full-width.tsx,en\textarea\on-surface.tsx,en\textarea\rows.tsx,en\textarea\variants.tsx,en\textfield\basic.tsx,en\textfield\controlled.tsx,en\textfield\custom-render-function.tsx,en\textfield\disabled.tsx,en\textfield\full-width.tsx,en\textfield\input-types.tsx,en\textfield\on-surface.tsx,en\textfield\required.tsx,en\textfield\textarea.tsx,en\textfield\validation.tsx,en\textfield\with-description.tsx,en\textfield\with-error.tsx,en\time-field\basic.tsx,en\time-field\controlled.tsx,en\time-field\custom-render-function.tsx,en\time-field\disabled.tsx,en\time-field\form-example.tsx,en\time-field\full-width.tsx,en\time-field\invalid.tsx,en\time-field\on-surface.tsx,en\time-field\required.tsx,en\time-field\with-description.tsx,en\time-field\with-prefix-and-suffix.tsx,en\time-field\with-prefix-icon.tsx,en\time-field\with-suffix-icon.tsx,en\time-field\with-validation.tsx,en\toast\callbacks.tsx,en\toast\custom-indicator.tsx,en\toast\custom-queue.tsx,en\toast\custom-toast.tsx,en\toast\default.tsx,en\toast\placements.tsx,en\toast\promise.tsx,en\toast\simple.tsx,en\toast\variants.tsx,en\toggle-button-group\attached.tsx,en\toggle-button-group\basic.tsx,en\toggle-button-group\controlled.tsx,en\toggle-button-group\disabled.tsx,en\toggle-button-group\full-width.tsx,en\toggle-button-group\orientation.tsx,en\toggle-button-group\selection-mode.tsx,en\toggle-button-group\sizes.tsx,en\toggle-button-group\without-separator.tsx,en\toggle-button\basic.tsx,en\toggle-button\controlled.tsx,en\toggle-button\disabled.tsx,en\toggle-button\icon-only.tsx,en\toggle-button\sizes.tsx,en\toggle-button\variants.tsx,en\toolbar\basic.tsx,en\toolbar\custom-styles.tsx,en\toolbar\vertical.tsx,en\toolbar\with-button-group.tsx,en\tooltip\basic.tsx,en\tooltip\custom-render-function.tsx,en\tooltip\custom-trigger.tsx,en\tooltip\placement.tsx,en\tooltip\with-arrow.tsx,en\typography\default.tsx,en\typography\primitives.tsx,en\typography\prose.tsx,en\typography\render-props.tsx,en\typography\typography-scale.tsx}
<!-- HEROUI-REACT-AGENTS-MD-END -->

<!-- CONFIG-RULES-START -->
## 配置文件保护规则 (Configuration File Protection Rules)

严禁修改以下项目配置文件和依赖管理，具体规则如下：

1. **禁止修改的配置文件**：以下文件未经用户明确许可不得修改：
   - `eslint.config.js` — ESLint 规范配置
   - `vite.config.ts` — Vite 构建配置
   - `tsconfig.json`、`tsconfig.app.json`、`tsconfig.node.json` — TypeScript 配置
   - `AGENTS.md` — 代理规则文件
   - `package.json` — 项目依赖和脚本配置
   - `.gitignore` — Git 忽略规则

2. **依赖管理规则**：
   - 严禁 AI 主动执行 `npm install`、`pnpm install`、`yarn add` 等安装依赖的命令
   - 严禁 AI 修改 `package.json` 中的 `dependencies` 或 `devDependencies`
   - 严禁 AI 直接修改 `node_modules` 目录下的任何文件
   - 如果实现某个功能需要安装新的依赖包，AI 应向用户说明需要哪些依赖及其用途，由用户自行决定是否安装

3. **例外情况**：仅在用户明确要求修改这些文件或安装依赖时，才允许执行相关操作

4. **修复规则**：如果 ESLint 规则配置（`eslint.config.js`）导致检查失败，应通过修复源代码来解决问题，不得修改 ESLint 配置本身
<!-- CONFIG-RULES-END -->
