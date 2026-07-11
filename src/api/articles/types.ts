/**
 * Article type definitions / 文章类型定义
 */

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverUrl: string;
  category: string;
  tags: string[];
  author: string;
  status: "draft" | "published" | "archived";
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  coverUrl: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
}
