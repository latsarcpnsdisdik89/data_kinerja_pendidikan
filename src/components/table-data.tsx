'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowData,
  ColumnDef,
} from '@tanstack/react-table';
import { Person } from '@/types/table-type';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    rowSpan?: number;
  }
}

export default function TableData({
  columns,
  data,
}: {
  columns: ColumnDef<Person, any>[];
  data: Person[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <div className="mt-4 overflow-x-auto rounded-box border border-base-content/5 bg-base-100 min-h-[400px]">
      <table
        className="table tabl-lg"
        style={{
          width: table.getCenterTotalSize(),
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnRelativeDepth = header.depth - header.column.depth;
                if (columnRelativeDepth > 1) {
                  return null;
                }

                let rowSpan = 1;
                if (header.isPlaceholder) {
                  const leafs = header.getLeafHeaders();
                  rowSpan = leafs[leafs.length - 1].depth - header.depth;
                }

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={rowSpan}
                    className={`${
                      header.column.id === 'indikator'
                        ? 'static shadow-none md:sticky md:left-0 md:bg-white md:text-start md:z-[1] md:shadow-[inset_-4px_0_8px_-4px_oklch(92.9%_0.013_255.508)]'
                        : ''
                    }`}
                    style={{
                      width: `${header.column.getSize()}px`,
                      textAlign: 'center',
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`${
                    cell.column.id === 'indikator'
                      ? 'static shadow-none md:sticky md:left-0 md:bg-white md:text-start md:z-[1] md:shadow-[inset_-4px_0_8px_-4px_oklch(92.9%_0.013_255.508)]'
                      : 'text-center'
                  }`}
                  style={{
                    width: `${cell.column.getSize()}px`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
