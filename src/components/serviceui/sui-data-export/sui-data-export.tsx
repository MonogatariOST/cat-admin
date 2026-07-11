/**
 * SuiDataExport - CSV/JSON data export utility / 数据导出组件
 * Generates downloadable CSV files from table data.
 * / 基于表格数据生成可下载的 CSV 文件
 */
import { Download } from "lucide-react";
import { Button, Dropdown } from "@heroui/react";
import type { Key } from "@heroui/react";

export interface SuiDataExportProps {
  headers: string[];
  rows: string[][];
  filename?: string;
  label?: string;
  variant?: "ghost";
  size?: "sm" | "md";
}

const exportCSV = (headers: string[], rows: string[][], filename: string) => {
  const escape = (v: string) => "“" + v.replace(/"/g, "””") + "“";
  const csv = [headers.map(escape).join(","), ...rows.map(r => r.map(escape).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename + ".csv"; a.click();
  URL.revokeObjectURL(url);
};

const exportJSON = (headers: string[], rows: string[][], filename: string) => {
  const data = rows.map(r => Object.fromEntries(headers.map((h, i) => [h, r[i]])));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename + ".json"; a.click();
  URL.revokeObjectURL(url);
};

export const SuiDataExport = ({ headers, rows, filename = "export", label = "导出", variant = "ghost", size = "sm" }: SuiDataExportProps) => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button variant={variant} size={size}><Download size={16} />{label}</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover placement="bottom end">
      <Dropdown.Menu aria-label="导出格式" onAction={(key: Key) => {
        if (key === "csv") exportCSV(headers, rows, filename);
        if (key === "json") exportJSON(headers, rows, filename);
      }}>
        <Dropdown.Item id="csv" textValue="CSV">{"导出为 CSV (.csv)"}</Dropdown.Item>
        <Dropdown.Item id="json" textValue="JSON">{"导出为 JSON (.json)"}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
);
