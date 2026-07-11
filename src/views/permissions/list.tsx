"use client";

import { useState, useMemo } from "react";
import type { Key } from "@heroui/react";
import { BuiPage, BuiTable } from "../../components/baseui"
import { useSetPageTitle } from "../../stores"
import type { BuiTableColumn } from "../../components/baseui";
import {
  Card, SearchField, Select, Label, ListBox
} from "@heroui/react";
import { permissionsApi } from "../../api/permissions";

const PermissionsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState<Key | null>(null);
    useSetPageTitle("权限管理", "管理系统中所有权限项");
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  
  const { permissions, modules } = useMemo(() => {
    const all = permissionsApi.getAllSync();
    const mods = [...new Set(all.map((p) => p.module))];
    return { permissions: all, modules: mods };
  }, []);

  const filtered = useMemo(() => {
    return permissions.filter((p) => {
      if (moduleFilter !== null && p.module !== moduleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!p.name.includes(q) && !p.id.includes(q) && !p.module.includes(q)) return false;
      }
      return true;
    });
  }, [permissions, searchQuery, moduleFilter]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((p) => {
      const g = map.get(p.module) || [];
      g.push(p);
      map.set(p.module, g);
    });
    return map;
  }, [filtered]);


  const columns: BuiTableColumn<typeof filtered[0]>[] = [{ key: "id", title: "权限标识", render: (p) => <code className="rounded bg-surface-tertiary px-1.5 py-0.5 text-xs text-foreground-500 font-mono">{p.id}</code> },{ key: "name", title: "权限名称", isRowHeader: true },{ key: "description", title: "描述" }];

  return (
    <BuiPage
      className="h-full"
      contentClassName="flex min-h-0 flex-1 flex-col"
    >
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3 shrink-0">
        {[
          { label: "权限总数", value: String(permissions.length) },
          { label: "模块数", value: String(modules.length) },
          { label: "已筛选", value: String(filtered.length) },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <Card.Content>
              <p className="text-sm text-foreground-500">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{s.value}</p>
            </Card.Content>
          </Card>
        ))}
      </div>
      <div className="mb-4 flex shrink-0 flex-wrap items-end gap-3">
        <SearchField aria-label="搜索权限" value={searchQuery} onChange={(v: string) => { setSearchQuery(v); setModuleFilter(null); }}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-60" placeholder="搜索权限名称或标识..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <Select className="w-40" aria-label="模块" placeholder="全部模块" value={moduleFilter} onChange={setModuleFilter}>
          <Label>模块</Label>
          <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
          <Select.Popover><ListBox>{modules.map((m) => <ListBox.Item key={m} id={m} textValue={m}>{m}<ListBox.ItemIndicator /></ListBox.Item>)}</ListBox></Select.Popover>
        </Select>
      </div>
      <div className="flex flex-col gap-6">
        {Array.from(grouped.entries()).map(([mod, filtered]) => (
          <Card key={mod} className="p-4">
            <Card.Content>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{mod}</h3>
      <BuiTable
        data={filtered}
        columns={columns}
        getRowId={(p) => p.id}
        emptyContent="该模块下无匹配权限"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      />
            </Card.Content>
          </Card>
        ))}
      </div>
    </BuiPage>
  );
};

export function Component() { return <PermissionsList />; }
