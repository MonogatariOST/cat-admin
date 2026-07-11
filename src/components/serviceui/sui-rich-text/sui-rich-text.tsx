/**
 * SuiRichText - Lightweight text editor with markdown-style formatting / Markdown 风格编辑器
 * Uses a textarea with formatting toolbar. Avoids deprecated document.execCommand API.
 * / 使用带格式工具栏的文本域，避免使用已废弃的 document.execCommand API
 */
import { useRef, useCallback } from "react";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from "lucide-react";
import { Button } from "@heroui/react";

export interface SuiRichTextProps {
  value?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  minHeight?: number;
  className?: string;
}

const wrapSelection = (text: string, start: number, end: number, wrapper: string): string => {
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  const after = text.substring(end);
  return before + wrapper + selected + wrapper + after;
};

const insertAtCursor = (text: string, cursor: number, insertion: string): { text: string; cursor: number } => {
  const before = text.substring(0, cursor);
  const after = text.substring(cursor);
  return { text: before + insertion + after, cursor: cursor + insertion.length };
};

export const SuiRichText = ({ value = "", onChange, placeholder = "开始编辑...", minHeight = 250, className = "" }: SuiRichTextProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = useCallback((prefix: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newText = wrapSelection(value, start, end, prefix);
    if (onChange) onChange(newText);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + prefix.length, end + prefix.length); }, 0);
  }, [value, onChange]);

  const insertNewline = useCallback((prefix: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const cursor = ta.selectionStart;
    const result = insertAtCursor(value, cursor, "\n" + prefix + " ");
    if (onChange) onChange(result.text);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(result.cursor, result.cursor); }, 0);
  }, [value, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") { e.preventDefault(); applyFormat("  "); }
  }, [applyFormat]);

  return (
    <div className={"overflow-hidden rounded-xl border border-border focus-within:ring-1 focus-within:ring-accent/30 focus-within:border-accent " + className}>
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-surface-secondary px-2 py-1.5">
        <Button variant="ghost" size="sm" isIconOnly aria-label="粗体" onPress={() => applyFormat("**")}><Bold size={16} /></Button>
        <Button variant="ghost" size="sm" isIconOnly aria-label="斜体" onPress={() => applyFormat("*")}><Italic size={16} /></Button>
        <Button variant="ghost" size="sm" isIconOnly aria-label="标题" onPress={() => insertNewline("##")}><Heading1 size={16} /></Button>
        <Button variant="ghost" size="sm" isIconOnly aria-label="子标题" onPress={() => insertNewline("###")}><Heading2 size={16} /></Button>
        <Button variant="ghost" size="sm" isIconOnly aria-label="无序列表" onPress={() => insertNewline("-")}><List size={16} /></Button>
        <Button variant="ghost" size="sm" isIconOnly aria-label="有序列表" onPress={() => insertNewline("1.")}><ListOrdered size={16} /></Button>
      </div>
      <textarea ref={textareaRef} value={value} onChange={(e) => onChange?.(e.target.value)} onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full resize-none bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-400 outline-none"
        style={{ minHeight: minHeight + "px" }}
      />
    </div>
  );
};
