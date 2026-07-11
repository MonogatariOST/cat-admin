/**
 * Main application layout / 主应用布局
 * Provides a sidebar navigation, fixed header, and content outlet.
 * Responsive: sidebar is fixed on desktop, drawer on mobile.
 * / 提供侧边栏导航、固定顶部栏和内容出口；桌面端侧边栏固定显示，移动端以抽屉形式展示
 */

import { useState, useCallback, type ReactNode, type Key } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { Button, Avatar, Drawer, Accordion, Dropdown, Label } from '@heroui/react';
import { ChevronLeft, ChevronDown, Menu, Search, Settings, LogOut, Sun, Moon, Table, List, History, Kanban, FilePlus } from 'lucide-react';
import { Squares2X2Icon as Squares2X2Outline, ChartBarSquareIcon as ChartBarSquareOutline, UsersIcon as UsersOutline, ShieldCheckIcon as ShieldCheckOutline, Cog6ToothIcon as Cog6ToothOutline, BookOpenIcon as BookOpenOutline, UserGroupIcon as UserGroupOutline, BuildingOffice2Icon as BuildingOffice2Outline, RectangleStackIcon as RectangleStackOutline, DocumentTextIcon as DocumentTextOutline, ExclamationTriangleIcon as ExclamationOutline, MagnifyingGlassIcon as MagnifyingGlassOutline, LockClosedIcon as LockClosedOutline } from '@heroicons/react/24/outline';
import { Squares2X2Icon as Squares2X2Solid, ChartBarSquareIcon as ChartBarSquareSolid, UsersIcon as UsersSolid, ShieldCheckIcon as ShieldCheckSolid, Cog6ToothIcon as Cog6ToothSolid, BookOpenIcon as BookOpenSolid, UserGroupIcon as UserGroupSolid, BuildingOffice2Icon as BuildingOffice2Solid, RectangleStackIcon as RectangleStackSolid, DocumentTextIcon as DocumentTextSolid, ExclamationTriangleIcon as ExclamationSolid, MagnifyingGlassIcon as MagnifyingGlassSolid, LockClosedIcon as LockClosedSolid } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/use-theme';
import { useAuth } from '../hooks/use-auth';
import { SuiLine } from '../components/serviceui';
import { usePageTitle } from '../stores';

/**
 * Navigation item definition / 导航项定义
 */
interface NavItem {
  /** Display label / 显示标签 */
  label: string;
  /** Route path / 路由路径 */
  path: string;
  /** Icon renderer - returns outline when inactive, solid when active / 图标渲染函数，未选中时 outline，选中时 solid */
  icon: (isActive: boolean) => ReactNode;
}

/**
 * Navigation group definition / 导航分组定义
 */
interface NavGroup {
  /** Group title / 分组标题 */
  title: string;
  /** Navigation items / 导航项列表 */
  items: NavItem[];
}

/** Sidebar navigation configuration / 侧边栏导航配置 */
const navGroups: NavGroup[] = [
  {
    title: '看板',
    items: [
      { label: '概览', path: '/dashboard', icon: (active) => active ? <Squares2X2Solid className="size-5" /> : <Squares2X2Outline className="size-5" /> },
      { label: '分析', path: '/dashboard/analytics', icon: (active) => active ? <ChartBarSquareSolid className="size-5" /> : <ChartBarSquareOutline className="size-5" /> },
    ],
  },
  {
    title: '教学管理',
    items: [
      { label: '课程管理', path: '/courses', icon: (active) => active ? <BookOpenSolid className="size-5" /> : <BookOpenOutline className="size-5" /> },
      { label: '老师管理', path: '/teachers', icon: (active) => active ? <UserGroupSolid className="size-5" /> : <UserGroupOutline className="size-5" /> },
      { label: '班级管理', path: '/classes', icon: (active) => active ? <RectangleStackSolid className="size-5" /> : <RectangleStackOutline className="size-5" /> },
      { label: '教室管理', path: '/classrooms', icon: (active) => active ? <BuildingOffice2Solid className="size-5" /> : <BuildingOffice2Outline className="size-5" /> },
    ],
  },
  {
    title: '用户管理',
    items: [
      { label: '用户列表', path: '/users', icon: (active) => active ? <UsersSolid className="size-5" /> : <UsersOutline className="size-5" /> },
    ],
  },
  {
    title: '内容管理',
    items: [
      { label: '文章管理', path: '/articles', icon: (active) => active ? <FilePlus className="size-5 text-accent" /> : <FilePlus className="size-5 text-foreground-400" /> },
    ],
  },
  {
    title: '高级功能',
    items: [
      { label: '高级表格', path: '/advanced-table', icon: (active) => active ? <Table className="size-5 text-accent" /> : <Table className="size-5 text-foreground-400" /> },
      { label: '高级表单', path: '/forms/advanced', icon: (active) => active ? <List className="size-5 text-accent" /> : <List className="size-5 text-foreground-400" /> },
      { label: '任务看板', path: '/kanban', icon: (active) => active ? <Kanban className="size-5 text-accent" /> : <Kanban className="size-5 text-foreground-400" /> },
      { label: '审计日志', path: '/audit-log', icon: (active) => active ? <History className="size-5 text-accent" /> : <History className="size-5 text-foreground-400" /> },
    ],
  },
  {
    title: '\u793a\u4f8b',
    items: [
      { label: '\u8868\u5355\u793a\u8303', path: '/forms', icon: (active) => active ? <DocumentTextSolid className="size-5" /> : <DocumentTextOutline className="size-5" /> },
      { label: '404 \u9875\u9762', path: '/error/404', icon: (active) => active ? <MagnifyingGlassSolid className="size-5" /> : <MagnifyingGlassOutline className="size-5" /> },
      { label: '403 \u9875\u9762', path: '/error/403', icon: (active) => active ? <LockClosedSolid className="size-5" /> : <LockClosedOutline className="size-5" /> },
      { label: '500 \u9875\u9762', path: '/error/500', icon: (active) => active ? <ExclamationSolid className="size-5" /> : <ExclamationOutline className="size-5" /> },
    ],
  },
  {
    title: '\u7cfb\u7edf\u7ba1\u7406',
    items: [
      { label: '角色管理', path: '/roles', icon: (active) => active ? <ShieldCheckSolid className="size-5" /> : <ShieldCheckOutline className="size-5" /> },
      { label: '权限管理', path: '/permissions', icon: (active) => active ? <LockClosedSolid className="size-5" /> : <LockClosedOutline className="size-5" /> },
      { label: '账号设置', path: '/settings', icon: (active) => active ? <Cog6ToothSolid className="size-5" /> : <Cog6ToothOutline className="size-5" /> },
    ],
  },
];

/**
 * Collapsible navigation section using Accordion / 使用折叠面板的可折叠导航区域
 */
const SidebarNav = ({ onNavClick }: { onNavClick?: () => void }) => {
  return (
    <Accordion
      defaultExpandedKeys={['dashboard']}
      hideSeparator
      className="px-0"
    >
      {navGroups.map((group) => {
        const groupKey = group.title === '系统管理' ? 'system' : (group.items[0]?.path?.split('/')[1] ?? group.title);
        return (
          <Accordion.Item key={groupKey} id={groupKey}>
            <Accordion.Heading>
              <Accordion.Trigger className="flex items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider text-foreground-400 hover:bg-surface-tertiary rounded-lg">
                <span>{group.title}</span>
                <Accordion.Indicator className="ml-auto">
                  <ChevronDown size={14} />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="flex flex-col gap-1 pt-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    onClick={onNavClick}
                    className={({ isActive: active }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-accent/10 text-accent'
                          : 'text-foreground-500 hover:bg-surface-secondary hover:text-foreground'
                      }`
                    }
                  >
                    {({ isActive: active }) => (
                      <>
                        {item.icon(active)}
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
/**
 * Sidebar content - shared between desktop sidebar and mobile drawer / 侧边栏内容 - 桌面端和移动端共享
 */
const SidebarContent = ({ onNavClick }: { onNavClick?: () => void }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Logo area / Logo 区域 */}
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground text-sm font-bold">
          H
        </div>
        <span className="text-lg font-semibold text-foreground">HeroAdmin</span>
      </div>

      <SuiLine />

      {/* Navigation / 导航区域 */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <SidebarNav onNavClick={onNavClick} />
      </nav>

      <SuiLine />

      {/* User section / 底部用户区域 — click to view profile / 点击进入个人信息页 */}
      <NavLink to="/profile" onClick={onNavClick} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary rounded-lg transition-colors">
        <Avatar size="sm" color="accent">
          <Avatar.Fallback>A</Avatar.Fallback>
        </Avatar>
        <div className="flex-1 truncate">
          <p className="text-sm font-medium text-foreground">Admin</p>
          <p className="text-xs text-foreground-400">admin@example.com</p>
        </div>
      </NavLink>
    </div>
  );
};

/**
 * MainLayout - Primary application layout with sidebar and header / 主应用布局
 */
const MainLayout = () => {
  const { title, description } = usePageTitle();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, []);

  // Theme toggle / 主题切换
  const { isDark, toggle: toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar / 桌面端侧边栏 */}
      <aside
        className={`hidden bg-surface lg:flex lg:flex-col overflow-hidden transition-all duration-200 ${
          isSidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
        }`}
      >
        <div className={`flex-1 overflow-hidden ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
          <SidebarContent />
        </div>
        {isSidebarCollapsed && (
          <div className="flex h-full flex-col items-center justify-center overflow-y-auto">
            <div className="mb-4 flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground text-sm font-bold">
              H
            </div>
            {navGroups.flatMap((g) => g.items).map((item) => (
              <NavLink
                key={item.path}
                aria-label={item.label}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive: active }) =>
                  `flex items-center justify-center p-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground-500 hover:text-foreground'
                  }`
                }
              >
                {({ isActive: active }) => item.icon(active)}
              </NavLink>
            ))}
          </div>
        )}
      </aside>

      {/* Vertical divider between sidebar and content / 侧边栏与内容区之间的垂直分隔线 */}
      <SuiLine orientation="vertical" className="hidden lg:block" />

      {/* Mobile drawer / 移动端抽屉式侧边栏 */}
      <Drawer.Backdrop
        isOpen={isMobileDrawerOpen}
        onOpenChange={setIsMobileDrawerOpen}
        className="lg:hidden"
      >
        <Drawer.Content placement="left" className="w-72">
          <Drawer.Dialog aria-label="导航菜单">
            <SidebarContent onNavClick={closeMobileDrawer} />
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>

      {/* Main area / 主区域 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header / 顶部栏 */}
        <header className="flex flex-col bg-surface">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
           {/* Mobile menu toggle / 移动端菜单按钮 */}
          <Button
            variant="ghost"
            isIconOnly
            className="lg:hidden"
            onPress={() => setIsMobileDrawerOpen(true)}
            aria-label="打开导航菜单"
          >
            <Menu size={20} />
          </Button>

          {/* Desktop sidebar toggle / 桌面端侧边栏折叠按钮 */}
          <Button
            variant="ghost"
            isIconOnly
            className="hidden lg:flex"
            onPress={toggleSidebar}
            aria-label={isSidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'}
          >
            <ChevronLeft
              size={20}
              className={`transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`}
            />
          </Button>

          {/* Page title / 页面标题 */}
          {title && (
            <div className="hidden sm:flex flex-col mr-4">
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              {description && <p className="text-xs text-foreground-500">{description}</p>}
            </div>
          )}

          {/* Search bar / 搜索栏 */}
          <div className="hidden sm:flex relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400" />
            <input
              aria-label="搜索"
              type="text"
              placeholder="搜索..."
              className="w-full rounded-lg border border-border bg-surface-tertiary py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-foreground-400 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
            />
          </div>

         <div className="flex-1" />

          {/* Theme toggle / 主题切换按钮 */}
          <Button
            variant="ghost"
            isIconOnly
            onPress={toggleTheme}
            aria-label={isDark ? '切换至浅色模式' : '切换至深色模式'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* User avatar dropdown menu / 用户头像下拉菜单 */}
          <Dropdown>
            <Dropdown.Trigger aria-label="用户菜单" className="rounded-full">
              <Avatar size="sm" color="accent">
                <Avatar.Fallback>A</Avatar.Fallback>
              </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover placement="bottom end">
              {/* User info header - placed outside Dropdown.Menu per HeroUI custom trigger pattern / 用户信息头，参考 HeroUI custom trigger demo 放在 Menu 外部 */}
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <Avatar size="sm" color="accent">
                    <Avatar.Fallback>A</Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm leading-5 font-medium text-foreground">Admin</p>
                    <p className="text-xs leading-none text-muted">admin@example.com</p>
                  </div>
                </div>
              </div>
              <Dropdown.Menu
                aria-label="用户菜单"
                onAction={(key: Key) => {
                  if (key === 'logout') {
                    logout();
                  } else if (key === 'settings') {
                    navigate('/settings');
                  }
                }}
              >
                <Dropdown.Item id="settings" textValue="账号设置">
                  <Settings className="size-4 shrink-0 text-muted" />
                  <Label>账号设置</Label>
                </Dropdown.Item>
                <Dropdown.Item id="logout" textValue="退出登录" variant="danger">
                  <LogOut className="size-4 shrink-0 text-danger" />
                  <Label>退出登录</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
        <SuiLine />
        </header>

        {/* Page content / 页面内容 */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { MainLayout };


