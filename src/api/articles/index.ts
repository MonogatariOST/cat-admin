/**
 * Articles API module / 文章 API 模块
 * Currently uses mock data — replace API calls with real backend when available.
 * / 当前使用模拟数据，接入真实后端时可替换 API 调用
 */

import type { Article, ArticleFormData } from "./types";

const MOCK_ARTICLES: Article[] = [
  {
    id: "a1",
    title: "CatAdmin 模板项目介绍",
    summary: "详细介绍 CatAdmin 后台管理模板的功能和使用方法",
    content:
      "<h2>CatAdmin 模板介绍</h2><p>这是一套基于 React + HeroUI 的后台管理模板。</p><p>包含完整的权限管理、数据表格、表单验证等功能。</p>",
    coverUrl: "",
    category: "技术",
    tags: ["React", "HeroUI"],
    author: "Admin",
    status: "published",
    viewCount: 1280,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-10",
  },
  {
    id: "a2",
    title: "如何使用 React 现代 Hooks",
    summary: "深入了解 useState、useEffect、useCallback 等 Hook 的最佳实践",
    content:
      "<h3>React Hooks 最佳实践</h3><p>React Hooks 是 React 16.8 引入的特性...</p>",
    coverUrl: "",
    category: "教程",
    tags: ["React", "Hooks"],
    author: "Admin",
    status: "published",
    viewCount: 856,
    createdAt: "2026-06-05",
    updatedAt: "2026-06-12",
  },
  {
    id: "a3",
    title: "Tailwind CSS v4 新特性",
    summary: "探索 Tailwind CSS v4 带来的重要更新和改进",
    content:
      "<h2>Tailwind CSS v4</h2><p>CSS-first configuration, new engine...</p>",
    coverUrl: "",
    category: "技术",
    tags: ["CSS", "Tailwind"],
    author: "Admin",
    status: "draft",
    viewCount: 0,
    createdAt: "2026-06-15",
    updatedAt: "2026-06-15",
  },
  {
    id: "a4",
    title: "系统更新公告 2026 Q2",
    summary: "第二季度系统更新内容汇总",
    content:
      "<h2>Q2 更新日志</h2><ul><li>新增数据导出功能</li><li>优化表格性能</li><li>修复已知问题</li></ul>",
    coverUrl: "",
    category: "公告",
    tags: ["更新"],
    author: "Admin",
    status: "published",
    viewCount: 2340,
    createdAt: "2026-06-20",
    updatedAt: "2026-06-22",
  },
];

let nextId = 5;

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const articlesApi = {
  async getAll(): Promise<Article[]> {
    await delay();
    return [...MOCK_ARTICLES];
  },
  async getById(id: string): Promise<Article | undefined> {
    await delay();
    return MOCK_ARTICLES.find((a) => a.id === id);
  },
  async create(data: ArticleFormData): Promise<Article> {
    await delay();
    const now = new Date().toISOString().split("T")[0];
    const article: Article = {
      ...data,
      id: "a" + nextId++,
      author: "Admin",
      viewCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    MOCK_ARTICLES.unshift(article);
    return article;
  },
  async update(
    id: string,
    data: Partial<ArticleFormData>,
  ): Promise<Article | undefined> {
    await delay();
    const idx = MOCK_ARTICLES.findIndex((a) => a.id === id);
    if (idx === -1) return undefined;
    MOCK_ARTICLES[idx] = {
      ...MOCK_ARTICLES[idx],
      ...data,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    return MOCK_ARTICLES[idx];
  },
  async delete(id: string): Promise<boolean> {
    await delay();
    const idx = MOCK_ARTICLES.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    MOCK_ARTICLES.splice(idx, 1);
    return true;
  },
};
