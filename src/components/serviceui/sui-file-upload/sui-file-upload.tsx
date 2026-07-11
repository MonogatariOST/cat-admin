/**
 * SuiFileUpload - Drag & drop file upload with preview / 拖拽文件上传组件
 */
import { useState, useRef, useCallback, type ReactNode, type DragEvent } from "react";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";


export interface SuiFileUploadProps {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  maxFiles?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  description?: string;
  className?: string;
  fileIcons?: Record<string, ReactNode>;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const getFileTypeIcon = (name: string): ReactNode => {
  const ext = name.split(".").pop()?.toLowerCase();
  if (["jpg","jpeg","png","gif","webp","svg"].includes(ext || "")) return <ImageIcon size={20} className="text-accent" />;
  return <File size={20} className="text-foreground-400" />;
};

export const SuiFileUpload = ({
  accept, maxSize = 10 * 1024 * 1024, multiple = false, maxFiles = 10,
  value: externalFiles, onChange, description, className = ""
}: SuiFileUploadProps) => {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const files = externalFiles ?? internalFiles;

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const arr = Array.from(newFiles).filter(f => f.size <= maxSize);
    const update = multiple ? [...files, ...arr].slice(0, maxFiles) : [arr[0]];
    if (onChange) onChange(update);
    else setInternalFiles(update);
  }, [files, maxSize, maxFiles, multiple, onChange]);

  const removeFile = useCallback((index: number) => {
    const updated = files.filter((_, i) => i !== index);
    if (onChange) onChange(updated);
    else setInternalFiles(updated);
  }, [files, onChange]);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  return (
    <div className={"flex flex-col gap-3 " + className}>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={"flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 transition-colors " + (
          dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/50 hover:bg-surface-secondary"
        )}
      >
        <Upload size={32} className={dragOver ? "text-accent" : "text-foreground-300"} />
        <p className="text-sm font-medium text-foreground">{"拖拽文件到此处，或点击选择"}</p>
        {description && <p className="text-xs text-foreground-400">{description}</p>}
        <p className="text-xs text-foreground-400">{"支持格式: " + (accept || "所有文件") + " | 最大 " + formatSize(maxSize)}</p>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden"
          onChange={(e) => { if (e.target.files?.length) { addFiles(e.target.files); e.target.value = ""; } }} />
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((f, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-full bg-surface-tertiary pl-2 pr-1 py-1 text-xs">
              {getFileTypeIcon(f.name)}
              <span className="max-w-[120px] truncate text-foreground">{f.name}</span>
              <span className="text-foreground-400">({formatSize(f.size)})</span>
              <button onClick={() => removeFile(i)} className="hover:text-danger transition-colors p-0.5" aria-label={"删除 " + f.name}><X size={14} /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
