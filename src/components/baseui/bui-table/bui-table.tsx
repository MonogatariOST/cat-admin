/**
 * BuiTable - Table component wrapping HeroUI Table
 *
 * A styled table with checkbox selection column, sortable column headers,
 * empty state, and footer slot. Does NOT rely on HeroUI's sorting/selection
 * props (HeroUI v3 Table is a pure styling wrapper around <div>).
 *
 * Sorting is handled internally via clickable column headers +
 * TableSortableColumnHeader for sort indicators. The consumer manages data
 * sorting via sortDescriptor + onSortChange callbacks.
 */
 
 import type { Key } from "@heroui/react";
 import { Checkbox, Table, TableSortableColumnHeader } from "@heroui/react";
 import type { ReactNode } from "react";
 
 export interface BuiTableColumn<T> {
   key: string;
   title: string;
   width?: number;
   isRowHeader?: boolean;
   className?: string;
   render?: (item: T) => ReactNode;
   renderHeader?: () => ReactNode;
   /** 是否允许排序 / Whether the column allows sorting */
   allowsSorting?: boolean;
   /** 是否隐藏该列 / Whether the column is hidden */
   hidden?: boolean;
 }
 
 export interface BuiTableSortDescriptor {
   column: string;
   direction: "ascending" | "descending";
 }
 
 export interface BuiTableProps<T> {
   data: T[];
   columns: BuiTableColumn<T>[];
   /** 是否显示多选框列 / Whether to show the checkbox column */
   selectionMode?: "none" | "multiple";
   footer?: ReactNode;
   emptyContent?: ReactNode;
   className?: string;
   ariaLabel?: string;
   getRowId: (item: T) => Key;
   sortDescriptor?: BuiTableSortDescriptor;
   onSortChange?: (descriptor: BuiTableSortDescriptor) => void;
 }
 
 /** Selection checkbox — rendered manually, HeroUI v3 Table has no built-in selection */
 const SelectionCheckbox = ({
   ariaLabel,
   variant,
 }: {
   ariaLabel: string;
   variant?: "primary" | "secondary";
 }) => (
   <Checkbox aria-label={ariaLabel} slot="selection" variant={variant}>
     <Checkbox.Content>
       <Checkbox.Control>
         <Checkbox.Indicator />
       </Checkbox.Control>
     </Checkbox.Content>
   </Checkbox>
 );
 
 export function BuiTable<T>({
   data, columns, selectionMode = "none",
   footer, emptyContent = "暂无数据", className = "", ariaLabel = "表格",
   getRowId, sortDescriptor, onSortChange,
 }: BuiTableProps<T>) {
   const visibleColumns = columns.filter(c => !c.hidden);
   const hasSelection = selectionMode === "multiple";
   const totalColumns = visibleColumns.length + (hasSelection ? 1 : 0);
 
   /** 处理列头点击切换排序 / Handle column header click to toggle sort */
   const handleHeaderClick = (colKey: string) => {
     if (!onSortChange) return;
     const isCurrentCol = sortDescriptor?.column === colKey;
     const newDir: "ascending" | "descending" =
       isCurrentCol && sortDescriptor!.direction === "ascending"
         ? "descending"
         : "ascending";
     onSortChange({ column: colKey, direction: newDir });
   };
 
   /** 获取当前列的排序方向 / Get sort direction for a column */
   const getSortDirection = (colKey: string) =>
     sortDescriptor?.column === colKey ? sortDescriptor.direction : undefined;
 
   return (
     <div className={"flex min-h-0 flex-1 flex-col " + className}>
       <Table className="flex min-h-0 flex-1 flex-col">
         <Table.ScrollContainer className="flex-1 min-h-0">
           <Table.Content aria-label={ariaLabel}>
             <Table.Header className="shrink-0 top-0 z-10 bg-surface-secondary">
               {hasSelection && (
                 <Table.Column className="w-10 pr-0">
                   <SelectionCheckbox ariaLabel="全选" />
                 </Table.Column>
               )}
               {visibleColumns.map((col) => (
                 <Table.Column
                   key={col.key}
                   isRowHeader={col.isRowHeader}
                   className={col.className}
                   width={col.width}
                 >
                   {col.renderHeader ? (
                     col.renderHeader()
                   ) : col.allowsSorting && onSortChange ? (
                     <button
                       type="button"
                       onClick={() => handleHeaderClick(col.key)}
                       className="inline-flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-inherit font-inherit outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                     >
                       <TableSortableColumnHeader
                         sortDirection={getSortDirection(col.key)}
                         showIndicator={sortDescriptor?.column === col.key}
                       >
                         {col.title}
                       </TableSortableColumnHeader>
                     </button>
                   ) : (
                     col.title
                   )}
                 </Table.Column>
               ))}
             </Table.Header>
 
             <Table.Body className="flex-1 min-h-0 overflow-y-scroll">
               {data.length > 0
                 ? data.map((item) => {
                     const id = getRowId(item);
                     return (
                       <Table.Row key={id} id={id}>
                         {hasSelection && (
                           <Table.Cell className="pr-0">
                             <SelectionCheckbox ariaLabel={String(id)} variant="secondary" />
                           </Table.Cell>
                         )}
                         {visibleColumns.map((col) => (
                           <Table.Cell key={col.key} className={col.className}>
                             {col.render
                               ? col.render(item)
                               : String((item as Record<string, unknown>)[col.key] || "")}
                           </Table.Cell>
                         ))}
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
 