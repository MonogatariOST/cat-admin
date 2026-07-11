import { useState, useMemo } from "react";
import { BuiPage, BuiTable, BuiToolbar } from "../../components/baseui";
import type { BuiTableColumn } from "../../components/baseui";
import { useSetPageTitle } from "../../stores";
import { Button, Chip, SearchField, Pagination } from "@heroui/react";
import type { Key } from "@heroui/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { SuiEmptyState, SuiDataExport } from "../../components/serviceui";
import { articlesApi } from "../../api";
import type { Article, ArticleFormData } from "../../api/articles/types";
import { FormDialog } from "./form"; // Inline form dialog

const ArticleList = () => {
  useSetPageTitle("文章管理", "内容发布与管理");
  const [articles, setArticles] = useState<Article[]>(() => []);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const ROWS = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());

  // Load data
  useState(() => { articlesApi.getAll().then(data => { setArticles(data); setLoading(false); }); });

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(a => a.title.includes(q) || a.summary.includes(q) || a.category.includes(q));
  }, [articles, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ROWS);
  const paginated = filtered.slice((page - 1) * ROWS, page * ROWS);
  const pageStart = (page - 1) * ROWS + 1;
  const pageEnd = Math.min(page * ROWS, filtered.length);

  const refresh = () => articlesApi.getAll().then(setArticles);
  const handleSave = async (data: ArticleFormData) => {
    if (editing) await articlesApi.update(editing.id, data);
    else await articlesApi.create(data);
    setModalOpen(false); refresh();
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    await articlesApi.delete(deleteTarget.id);
    setDeleteTarget(null); refresh();
  };

  const statusColor: Record<string, "success" | "warning" | "default"> = { published: "success", draft: "warning", archived: "default" };
  const statusLabel: Record<string, string> = { published: "已发布", draft: "草稿", archived: "归档" };

  const exportHeaders = ["标题", "分类", "标签", "状态", "作者", "浏览量", "创建时间"];
  const exportRows = filtered.map(a => [a.title, a.category, a.tags.join(", "), statusLabel[a.status] || a.status, a.author, String(a.viewCount), a.createdAt]);

  const footer = <Pagination size="sm"><Pagination.Summary>{"第 " + pageStart + "-" + pageEnd + " 条，共 " + filtered.length + " 条"}</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous isDisabled={page === 1} onPress={() => setPage(Math.max(1, page - 1))}>上一页</Pagination.Previous></Pagination.Item>{Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => <Pagination.Item key={p}><Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(Math.min(totalPages, page + 1))}>下一页</Pagination.Next></Pagination.Item></Pagination.Content></Pagination>;

  const columns: BuiTableColumn<Article>[] = [
    { key: "title", title: "标题", isRowHeader: true, render: (a) => <div><p className="text-sm font-medium text-foreground">{a.title}</p><p className="text-xs text-foreground-400 truncate max-w-xs">{a.summary}</p></div> },
    { key: "category", title: "分类" },
    { key: "status", title: "状态", render: (a) => <Chip size="sm" variant="soft" color={statusColor[a.status] || "default"}>{statusLabel[a.status] || a.status}</Chip> },
    { key: "viewCount", title: "浏览量" },
    { key: "createdAt", title: "创建时间" },
    { key: "actions", title: "操作", render: (a) => <div className="flex gap-1"><Button size="sm" variant="ghost" isIconOnly aria-label={"编辑"} onPress={() => { setEditing(a); setModalOpen(true); }}><Pencil size={14} /></Button><Button size="sm" variant="ghost" isIconOnly aria-label={"删除"} onPress={() => setDeleteTarget(a)}><Trash2 size={14} className="text-danger" /></Button></div> },
  ];

  if (loading) return <BuiPage className="h-full"><SuiEmptyState title="加载中..." /></BuiPage>;

  return (<BuiPage className="h-full" contentClassName="flex min-h-0 flex-1 flex-col"><div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-4 shrink-0">
    {[{ label: "文章总数", value: String(articles.length) }, { label: "已发布", value: String(articles.filter(a => a.status === "published").length) }, { label: "草稿", value: String(articles.filter(a => a.status === "draft").length) }, { label: "总浏览量", value: String(articles.reduce((s, a) => s + a.viewCount, 0)) }].map(s => <div key={s.label} className="rounded-xl bg-surface p-4"><p className="text-sm text-foreground-500">{s.label}</p><p className="mt-1 text-2xl font-semibold text-foreground">{s.value}</p></div>)}
  </div><BuiToolbar
    left={<><Button size="sm" variant="secondary" onPress={() => { setEditing(null); setModalOpen(true); }}><Plus size={16} />{"新建文章"}</Button><SuiDataExport headers={exportHeaders} rows={exportRows} filename={"articles-" + new Date().toISOString().split("T")[0]} /></>}
    right={<SearchField aria-label="搜索文章" value={searchQuery} onChange={(v) => { setSearchQuery(v); setPage(1); }}><SearchField.Group><SearchField.SearchIcon /><SearchField.Input className="w-60" placeholder="搜索标题/分类..." /><SearchField.ClearButton /></SearchField.Group></SearchField>}
  />
  <BuiTable
        data={paginated}
        columns={columns}
        getRowId={(a) => a.id}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        footer={footer}
      />
  {modalOpen && <FormDialog article={editing} onClose={() => setModalOpen(false)} onSave={handleSave} />}
  {/* Delete confirmation */}
  {deleteTarget && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setDeleteTarget(null)}><div className="rounded-xl bg-surface p-6 shadow-lg max-w-sm" onClick={e => e.stopPropagation()}><h3 className="text-lg font-semibold text-foreground">{"确认删除"}</h3><p className="mt-2 text-sm text-foreground-500">{"确定要删除文章「" + deleteTarget.title + "」吗？此操作不可撤销。"}</p><div className="mt-4 flex justify-end gap-3"><Button variant="ghost" onPress={() => setDeleteTarget(null)}>{"取消"}</Button><Button variant="danger" onPress={handleDelete}>{"删除"}</Button></div></div></div>}
  </BuiPage>);
};
export function Component() { return <ArticleList />; }
