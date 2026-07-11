/**
 * BuiTable - Table component wrapping HeroUI Table
 *
 * / BuiTable - 封装 HeroUI Table 的表格组件
 */

import type { Key, Selection, SortDescriptor } from "@heroui/react";
import { Table } from "@heroui/react";
import type { ReactNode } from "react";

export interface BuiTableColumn<T> {
  key: string;
  title: string;
  width?: number;
  isRowHeader?: boolean;
  className?: string;
  render?: (item: T) => ReactNode;
  renderHeader?: () => ReactNode;
  allowsSorting?: boolean;
  hidden?: boolean;
}

export interface BuiTableSortDescriptor {
  column: string;
  direction: "ascending" | "descending";
}

export interface BuiTableProps<T> {
  data: T[];
  columns: BuiTableColumn<T>[];
  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: Set<Key>;
  onSelectionChange?: (keys: Set<Key>) => void;
  footer?: ReactNode;
  emptyContent?: ReactNode;
  className?: string;
  ariaLabel?: string;
  getRowId: (item: T) => Key;
  sortDescriptor?: BuiTableSortDescriptor;
  onSortChange?: (descriptor: BuiTableSortDescriptor) => void;
}

export function BuiTable<T>({
  data, columns, selectionMode = "none", selectedKeys, onSelectionChange,
  footer, emptyContent = "暂无数据", className = "", ariaLabel = "表格",
  getRowId, sortDescriptor, onSortChange,
}: BuiTableProps<T>) {
  const visibleColumns = columns.filter(c => !c.hidden);
  const hasSelection = selectionMode !== "none";
  const totalColumns = visibleColumns.length + (hasSelection ? 1 : 0);

  return (
    <div className={"flex min-h-0 flex-1 flex-col " + className}>
      <Table className="flex min-h-0 flex-1 flex-col">
        <Table.ScrollContainer className="flex-1 min-h-0">
          <Table.Content
          aria-label={ariaLabel}
          selectionMode={selectionMode}
          selectedKeys={selectedKeys as Selection}
          onSelectionChange={(keys) => {
            onSelectionChange?.(keys === "all" ? new Set(data.map(getRowId)) : keys);
          }}
          sortDescriptor={sortDescriptor as SortDescriptor}
          onSortChange={(desc) => onSortChange?.(desc as BuiTableSortDescriptor)}
        >
            <Table.Header className="shrink-0 top-0 z-10 bg-surface-secondary">
              {visibleColumns.map(function (col) {
                return (
                  <Table.Column
                    key={col.key}
                    isRowHeader={col.isRowHeader}
                    allowsSorting={col.allowsSorting}
                    className={col.className}
                    width={col.width}
                  >
                    {col.renderHeader ? col.renderHeader() : col.title}
                  </Table.Column>
                );
              })}
            </Table.Header>

            <Table.Body className="flex-1 min-h-0 overflow-y-scroll">
              {data.length > 0
                ? data.map(function (item) {
                    const id = getRowId(item);
                    return (
                      <Table.Row key={id} id={id}>
                        {visibleColumns.map(function (col) {
                          return (
                            <Table.Cell key={col.key} className={col.className}>
                              {col.render
                                ? col.render(item)
                                : String((item as Record<string, unknown>)[col.key] || "")}
                            </Table.Cell>
                          );
                        })}
                      </Table.Row>
                    );
                  })
                : (
                  <Table.Row>
                    <Table.Cell
                      colSpan={totalColumns}
                      className="py-8 text-center text-foreground-400"
                    >
                      {emptyContent}
                    </Table.Cell>
                  </Table.Row>
                )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {footer && (
          <Table.Footer className="shrink-0">{footer}</Table.Footer>
        )}
      </Table>
    </div>
  );
}