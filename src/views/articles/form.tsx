import { useState } from "react";
import { Modal, Button, Input, TextField, Label, Select, ListBox } from "@heroui/react";
import { SuiFileUpload, SuiRichText } from "../../components/serviceui";
import type { Article, ArticleFormData } from "../../api/articles/types";

export interface FormDialogProps {
  article: Article | null;
  onClose: () => void;
  onSave: (data: ArticleFormData) => void;
}

const CATEGORIES = ["技术", "教程", "公告", "业界"];
const TAG_OPTIONS = ["React", "HeroUI", "TypeScript", "CSS", "Tailwind", "JavaScript", "Node.js", "Hooks", "更新"];

export const FormDialog = ({ article, onClose, onSave }: FormDialogProps) => {
  const [title, setTitle] = useState(article?.title || "");
  const [summary, setSummary] = useState(article?.summary || "");
  const [content, setContent] = useState(article?.content || "");
  const [category, setCategory] = useState(article?.category || "");
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [status, setStatus] = useState<"draft" | "published">(article?.status === "published" ? "published" : "draft");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "请输入标题";
    if (!summary.trim()) errs.summary = "请输入摘要";
    if (!category) errs.category = "请选择分类";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleTagToggle = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ title, summary, content, coverUrl: "", category, tags, status });
  };

  return (<Modal.Backdrop isOpen onOpenChange={onClose}><Modal.Container><Modal.Dialog aria-label={article ? "编辑文章" : "新建文章"} className="sm:max-w-3xl"><Modal.CloseTrigger /><Modal.Header><Modal.Heading>{article ? "编辑文章" : "新建文章"}</Modal.Heading></Modal.Header><Modal.Body><div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
    <TextField isRequired><Label>{"标题"}</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="输入文章标题" /></TextField>
    {errors.title && <p className="text-xs text-danger">{errors.title}</p>}
    <TextField isRequired><Label>{"摘要"}</Label><Input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="输入文章摘要" /></TextField>
    {errors.summary && <p className="text-xs text-danger">{errors.summary}</p>}
    <div className="grid grid-cols-2 gap-4">
      <Select name="category" value={category} onChange={(value) => { setCategory(value as string); }}><Label>{"分类"}</Label><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger><Select.Popover><ListBox>{CATEGORIES.map(c => <ListBox.Item key={c} id={c} textValue={c}>{c}</ListBox.Item>)}</ListBox></Select.Popover></Select>
      <Select name="status" value={status} onChange={(value) => { setStatus(value as "draft" | "published"); }}><Label>{"状态"}</Label><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger><Select.Popover><ListBox><ListBox.Item id="draft" textValue="草稿">{"草稿"}</ListBox.Item><ListBox.Item id="published" textValue="已发布">{"已发布"}</ListBox.Item></ListBox></Select.Popover></Select>
    </div>
    <div><Label>{"标签"}</Label><div className="mt-1 flex flex-wrap gap-1.5">{TAG_OPTIONS.map(t => <button key={t} onClick={() => handleTagToggle(t)} className={"inline-flex cursor-pointer items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all " + (tags.includes(t) ? "bg-accent text-accent-foreground" : "bg-surface-tertiary text-foreground-500 hover:text-foreground")}>{t}</button>)}</div></div>
    <div><Label>{"封面图片"}</Label><SuiFileUpload accept="image/*" maxFiles={1} maxSize={5*1024*1024} description="支持 JPG/PNG/WebP，最大 5MB" /></div>
    <div><Label>{"文章内容"}</Label><SuiRichText value={content} onChange={setContent} minHeight={300} /></div>
  </div></Modal.Body><Modal.Footer><Button slot="close" variant="ghost">{"取消"}</Button><Button onPress={handleSave}>{article ? "保存" : "创建"}</Button></Modal.Footer></Modal.Dialog></Modal.Container></Modal.Backdrop>);
};
